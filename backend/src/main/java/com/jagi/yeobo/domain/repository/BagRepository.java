package com.jagi.yeobo.domain.repository;

import com.jagi.yeobo.domain.*;
import com.jagi.yeobo.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import javax.persistence.*;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class BagRepository {

    @PersistenceContext
    private final EntityManager em;

    public Bag findByBag(long bagId){
        Bag findBag = em.find(Bag.class, bagId);
        return findBag;
    }

    public void updateBag(long bagId, BagDto bagDto){
        Bag findBag = findByBag(bagId);
        findBag.setName(bagDto.getName());
        findBag.setMemo(bagDto.getMemo());
        em.persist(findBag);
    }

    public List<BagDto> searchBagList(long userId){
        List<Bag> bagList = em.createQuery("SELECT b FROM Bag as b WHERE b.userId.id = :userId", Bag.class)
                .setParameter("userId", userId).getResultList();
        List<BagDto> bagDtoList = new ArrayList<>();

        if(!bagList.isEmpty()){
            for(Bag b : bagList){
                bagDtoList.add(new BagDto(b.getId(),b.getName(), b.getMemo(),b.getBagImage()));
            }
        }
        return bagDtoList;
     }

    public void likeBag(long userId, long bagId) {

        List<Pick> pickCheck = em.createQuery("select p from Pick p where p.userId.id = :userId and p.bagId.id = :bagId", Pick.class)
                .setParameter("userId", userId)
                .setParameter("bagId", bagId)
                .getResultList();
        if(pickCheck.size() == 0) {
            Bag findBag = em.find(Bag.class, bagId);

            int currentCnt = findBag.getLikeCnt();
            findBag.setLikeCnt(currentCnt + 1);
            em.persist(findBag);

            Pick newPick = new Pick();
            User findUser = em.find(User.class, userId);
            newPick.setUserId(findUser);
            newPick.setBagId(findBag);
            em.persist(newPick);
        }else{
            throw new DuplicateKeyException("데이터가 중복입니다.");
        }
    }

    public List<BagDto> searchLikeBagList(long userId){
        List<Pick> pickList = em.createQuery("SELECT p From Pick as p WHERE p.userId.id = :userId", Pick.class)
                .setParameter("userId", userId).getResultList();

        List<BagDto> bagDtoList = new ArrayList<>();
        if(!pickList.isEmpty()){
            for(Pick p : pickList){
                Bag b = em.find(Bag.class, p.getBagId().getId());
                bagDtoList.add(new BagDto(b.getId(),b.getName(), b.getMemo(),b.getBagImage()));
            }
        }

        return bagDtoList;
    }

    public List<PopularBagDto> searchPopularBagList(){

        TypedQuery<Bag> query = em.createQuery("SELECT b FROM Bag as b ORDER BY b.likeCnt DESC", Bag.class);
        query.setMaxResults(4);
        List<Bag> bagList = query.getResultList();

        List<PopularBagDto> bagDtoList = new ArrayList<>();

         if(!bagList.isEmpty()){
             for(Bag b : bagList){
                 User user = em.find(User.class, b.getUserId().getId());
                 bagDtoList.add(new PopularBagDto(b.getName(), b.getMemo(),b.getBagImage(), user.getNickname()));
             }
         }
         return bagDtoList;
     }


     public BagDetailDto searchDetailBag(long bagId, long userId){
        BagDetailDto bagDetailDto = new BagDetailDto();

        Bag findBag = em.find(Bag.class, bagId);
        bagDetailDto.setName(findBag.getName());
        bagDetailDto.setMemo(findBag.getMemo());

        List<Object[]> attractions = em.createQuery("select a.id,a.name,a.image from BagAttraction ba join Attraction a on ba.attractionId.id = a.id where ba.bagId.id = :bagId")
                .setParameter("bagId",bagId).getResultList();
//        List<BagAttraction> bagAttractions = em.createQuery("SELECT a FROM BagAttraction as a WHERE a.bagId.id = :bagId", BagAttraction.class)
//                .setParameter("bagId", bagId).getResultList();
//
        List<AttractionDto> list = new ArrayList<>();
        if(!attractions.isEmpty()){
            for (Object[] a : attractions){
                AttractionDto dto = AttractionDto.builder()
                        .id(Long.valueOf(String.valueOf(a[0])))
                        .name(String.valueOf(a[1]))
                        .img(String.valueOf(a[2]))
                        .build();
                list.add(dto);
            }
        }
//        if(!bagAttractions.isEmpty()){
//           for(BagAttraction b : bagAttractions){
//              Attraction at = em.createQuery("SELECT k FROM Attraction as k WHERE k.id = :attractionId", Attraction.class)
//                      .setParameter("attractionId", b.getAttractionId().getId()).getSingleResult();
//              AttractionDto attractionDto = new AttractionDto(at.getId(),at.getName(),at.getImage());
//              list.add(attractionDto);
//           }
//        }

        bagDetailDto.setAttraction(list);
         System.out.println("여기까지 되었니");

        List<Pick> pickId = em.createQuery("select p from Pick as p where p.userId.id = :userId and p.bagId.id = :bagId", Pick.class)
                .setParameter("userId", userId)
                .setParameter("bagId", bagId)
                .getResultList();
         System.out.println("여기는?");
        bagDetailDto.setPick(pickId.isEmpty()?false:true);
        return bagDetailDto;
     }

    public List<BagSearchDto> searchBagByName(String name, long userId){
        String sql = "SELECT b.bag_id,b.name,p.pick_id, b.bag_image FROM bag b left join pick p on p.user_id = :userId and b.bag_id = p.bag_id where b.name LIKE :name "+
                "ORDER BY CASE WHEN p.pick_id is not null THEN 0" +
                " WHEN b.name = :name0 THEN 1 " +
                " WHEN b.name LIKE :name1 THEN 2 " +
                " WHEN b.name LIKE :name2 THEN 3" +
                " WHEN b.name LIKE :name3 THEN 4 " +
                "ELSE 5 " +
                "END";
        List<Object[]> attractions = em.createNativeQuery(sql)
                .setParameter("userId",userId)
                .setParameter("name","%"+name+"%")
                .setParameter("name0",name)
                .setParameter("name1",name+"%")
                .setParameter("name2","%"+name+"%")
                .setParameter("name3","%"+name)
                .getResultList();

        List<BagSearchDto> bagList = new ArrayList<>();
        for (Object[] a:attractions) {

            BagSearchDto bagSearchDto = BagSearchDto.builder()
                    .bagId(Long.valueOf(String.valueOf(a[0])))
                    .name(String.valueOf(a[1]))
                    .check(Boolean.valueOf(String.valueOf(a[2]==null?false:true)))
                    .image(String.valueOf(a[3]))
                    .build();

            bagList.add(bagSearchDto);
        }

        return bagList;
    }

     public int deleteOneInBag(long bagId, long attractionId){
         List<BagAttraction> bagAttractionList = em.createQuery("select ba from BagAttraction as ba where ba.bagId.id = :bagId",BagAttraction.class)
                 .setParameter("bagId",bagId).getResultList();
        if(bagAttractionList.size()==1){ //보따리 길이가 1일 때 삭제될 이미지로인해 보따리이미지 업데이트 위해 보따리이미지 아예 삭제하기
            Bag bag = em.find(Bag.class,bagId);
            bag.setBagImage(null);
            em.persist(bag);
        }else{ //보따리 길이가 2이상일 때
            if(bagAttractionList.get(0).getAttractionId().getId() == attractionId){ //첫 번째에 저장된 여행지를 지운다면 2번째 이미지로 보따리이미지 변경
                Bag bag = em.find(Bag.class,bagId);
                bag.setBagImage(bagAttractionList.get(1).getAttractionId().getImage());
                em.persist(bag);
            }
        }

        return em.createQuery("DELETE FROM BagAttraction as ba WHERE ba.bagId.id = :bagId and ba.attractionId.id = :attractionId")
                .setParameter("bagId", bagId)
                .setParameter("attractionId", attractionId)
                .executeUpdate();
     }

     public int likeBagCancel(long userId, long bagId){

         Bag bag = em.find(Bag.class, bagId);
         int current = bag.getLikeCnt() - 1;
         bag.setLikeCnt(current);

         return  em.createQuery("DELETE FROM Pick as p WHERE p.userId.id = :userId and p.bagId.id = :bagId")
                 .setParameter("userId", userId)
                 .setParameter("bagId", bagId)
                 .executeUpdate();

     }

     public Bag createBag(long userId, BagResponseDto bagResponseDto){
        User findMember = em.find(User.class, userId);
        Bag bag = new Bag(findMember, bagResponseDto.getName(), bagResponseDto.getMemo());

        em.persist(bag);
        em.flush();
        return bag;
     }

     public void createAttractions(long bagId, BagResponseDto bagResponseDto){
        Bag findBag = em.find(Bag.class, bagId);

        List<Long> attLists = bagResponseDto.getAttractionId();
        for (int i = 0; i<attLists.size();i++){
            Attraction findAtt = em.find(Attraction.class, attLists.get(i));
            if(i==0){
                findBag.setBagImage(findAtt.getImage());
            }
            BagAttraction bagAttraction = new BagAttraction(findBag, findAtt);
            em.persist(bagAttraction);
        }
     }

     public void createOneAttInBag(long bagId, long attractionId){
        Bag findBag = em.find(Bag.class, bagId);
        Attraction findAtt = em.find(Attraction.class, attractionId);

        BagAttraction ba = new BagAttraction(findBag, findAtt);
        em.persist(ba);
        em.flush();
     }


}
