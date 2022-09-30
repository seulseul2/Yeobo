package com.jagi.yeobo.domain.repository;

import com.jagi.yeobo.domain.*;
import com.jagi.yeobo.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import java.util.ArrayList;
import java.util.List;

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
        findBag.updateBag(bagDto);
    }

    public List<BagDto> searchBagList(long userId){
        List<Bag> bagList = em.createQuery("SELECT b FROM Bag as b WHERE b.userId.id = :userId", Bag.class)
                .setParameter("userId", userId).getResultList();
        List<BagDto> bagDtoList = new ArrayList<>();

        if(!bagList.isEmpty()){
            for(Bag b : bagList){
                bagDtoList.add(new BagDto(b.getName(), b.getMemo()));
            }
        }
        return bagDtoList;
     }

    public void likeBag(long userId, long bagId){
        Bag findBag = em.find(Bag.class, bagId);

        int currentCnt = findBag.getLikeCnt();
        findBag.setLikeCnt(currentCnt+1);
        em.persist(findBag);

        Pick newPick = new Pick();
        User findUser = em.find(User.class, userId);
        newPick.setUserId(findUser);
        newPick.setBagId(findBag);
        em.persist(newPick);
    }

    public List<BagDto> searchLikeBagList(long userId){
        List<Pick> pickList = em.createQuery("SELECT p From Pick as p WHERE p.userId.id = :userId", Pick.class)
                .setParameter("userId", userId).getResultList();

        List<BagDto> bagDtoList = new ArrayList<>();
        if(!pickList.isEmpty()){
            for(Pick p : pickList){
                Bag b = em.find(Bag.class, p.getBagId());
                bagDtoList.add(new BagDto(b.getName(), b.getMemo()));
            }
        }

        return bagDtoList;
    }

    public List<BagDto> searchPopularBagList(){

        TypedQuery<Bag> query = em.createQuery("SELECT b FROM Bag as b ORDER BY b.like_cnt DESC", Bag.class);
        query.setMaxResults(4);
        List<Bag> bagList = query.getResultList();

        List<BagDto> bagDtoList = new ArrayList<>();

         if(!bagList.isEmpty()){
             for(Bag b : bagList){
                 bagDtoList.add(new BagDto(b.getName(), b.getMemo()));
             }
         }
         return bagDtoList;
     }

     public BagDetailDto searchDetailBag(long bagId){
        BagDetailDto bagDetailDto = new BagDetailDto();

        Bag findBag = em.find(Bag.class, bagId);
        bagDetailDto.setName(findBag.getName());
        bagDetailDto.setMemo(findBag.getMemo());

        List<BagAttraction> bagAttractions = em.createQuery("SELECT a FROM BagAttraction as a WHERE a.bagId.bag_id = :bagId", BagAttraction.class)
                .setParameter("bagId", bagId).getResultList();

        List<AttractionDto> list = new ArrayList<>();
        if(!list.isEmpty()){
           for(BagAttraction b : bagAttractions){
              Attraction at = em.createQuery("SELECT k FROM Attraction as k WHERE k.attraction_id = :attractionId", Attraction.class)
                      .setParameter("attractionId", b.getAttractionId()).getSingleResult();
              AttractionDto attractionDto = new AttractionDto(at.getId(),at.getName());
              list.add(attractionDto);
           }
        }

        bagDetailDto.setAttraction(list);
        return bagDetailDto;
     }

     public List<BagSearchDto> searchBagByName(String name, long userId){
//        List<Bag> bagList = em.createQuery("SELECT b FROM Bag as b WHERE b.name LIKE :name", Bag.class)
//                .setParameter("name", name)
//                .getResultList();

        String sql = "SELECT b FROM bag as b WHERE b.name LIKE :name "+
                 "ORDER BY CASE WHEN b.name = :name0 THEN 0" +
                 " WHEN b.name LIKE :name1 THEN 1 " +
                 " WHEN b.name LIKE :name2 THEN 2" +
                 " WHEN b.name LIKE :name3 THEN 3 " +
                 "ELSE 4 " +
                 "END";

         List<Bag> bagList = em.createNativeQuery(sql)
                 .setParameter("name","%"+name+"%")
                 .setParameter("name0",name)
                 .setParameter("name1",name+"%")
                 .setParameter("name2","%"+name+"%")
                 .setParameter("name3","%"+name)
                 .getResultList();

        List<Pick> pickList = em.createQuery("SELECT p From Pick as p WHERE p.userId.id = :userId", Pick.class)
                 .setParameter("userId", userId).getResultList();

        List<BagSearchDto> bagDtoList = new ArrayList<>();
         if(!bagList.isEmpty()){
             for(Bag b : bagList){
                 boolean check = false;
                for(Pick p : pickList){
                    if(b.getId() == p.getBagId().getId()) {
                        check = true;
                        break;
                    }
                }
                 bagDtoList.add(new BagSearchDto(b.getName(), b.getMemo(), check));
             }
         }

         return bagDtoList;
     }

     public int deleteOneInBag(long bagId, long attractionId){
        return em.createQuery("DELETE FROM BagAttraction as ba WHERE ba.id :bagId and ba.attractionId.id = :attractionId")
                .setParameter("bagId", bagId)
                .setParameter("attractionId", attractionId)
                .executeUpdate();
     }

     public int likeBagCancel(long userId, long bagId){
         return em.createQuery("DELETE FROM Pick as p WHERE p.userId.id = :userId and p.bagId.id = :bagId")
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
        for(long attId : attLists){
            Attraction findAtt = em.find(Attraction.class, attId);
            BagAttraction bagAttraction = new BagAttraction(findBag, findAtt);
            em.persist(bagAttraction);
        }
     }


}
