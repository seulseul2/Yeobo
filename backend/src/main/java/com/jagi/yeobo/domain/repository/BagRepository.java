package com.jagi.yeobo.domain.repository;

import com.jagi.yeobo.domain.*;
import com.jagi.yeobo.dto.AttractionDto;
import com.jagi.yeobo.dto.BagDetailDto;
import com.jagi.yeobo.dto.BagDto;
import com.jagi.yeobo.dto.BagSearchDto;
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
        List<Bag> bagList = em.createQuery("SELECT b FROM bag as b WHERE b.user_id = :userId", Bag.class)
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
        List<Pick> pickList = em.createQuery("SELECT p From pick as p WHERE p.user_id = :userId", Pick.class)
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

        TypedQuery<Bag> query = em.createQuery("SELECT b FROM bag as b ORDER BY b.like_cnt DESC", Bag.class);
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

        List<BagAttraction> bagAttractions = em.createQuery("SELECT a FROM BagAttraction as a WHERE a.bagId = :bagId", BagAttraction.class)
                .setParameter("bagId", bagId).getResultList();

        List<AttractionDto> list = new ArrayList<>();
        if(!list.isEmpty()){
           for(BagAttraction b : bagAttractions){
              Attraction at = em.createQuery("SELECT k FROM Attraction as k WHERE k.attractionId = :attractionId", Attraction.class)
                      .setParameter("attractionId", b.getAttractionId()).getSingleResult();
              AttractionDto attractionDto = new AttractionDto(at.getId(),at.getName());
              list.add(attractionDto);
           }
        }

        bagDetailDto.setAttraction(list);
        return bagDetailDto;
     }

//     public List<BagSearchDto> searchBagByName(String name, long userId){
//        List<Bag> bagList = em.createQuery("SELECT b FROM Bag as b WHERE b.name LIKE :name", Bag.class)
//                .setParameter("name", name)
//                .getResultList();
//
//         List<BagDto> likeDtoList = searchLikeBagList(userId);
//
//
//        List<BagSearchDto> bagDtoList = new ArrayList<>();
//         if(!bagList.isEmpty()){
//             for(Bag b : bagList){
//
//                 bagDtoList.add(new BagSearchDto(b.getName(), b.getMemo(), ));
//             }
//         }
//
//         return bagDtoList;
//     }



}
