package com.jagi.yeobo.domain.repository;

import com.jagi.yeobo.domain.Attraction;
import com.jagi.yeobo.domain.Score;
import com.jagi.yeobo.domain.User;
import com.jagi.yeobo.dto.AttractionResponseDto;
import com.jagi.yeobo.dto.ScoreDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.EntityNotFoundException;
import javax.persistence.PersistenceContext;
import java.util.ArrayList;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class AttractionRepository2 {
    @PersistenceContext
    private final EntityManager em;

    private final AttractionRepository attractionRepository;
    private final UserRepository userRepository;
    private final ScoreRepository scoreRepository;

    /* 여행지에 점수 매기기 */
    public Score saveScore(ScoreDto scoreDto){
        //attractionId와 userId에 대해 유효성검사를 하여 sql문을 두번이나 더 돌게 만드는게 맞는건지 고민.
        User user = em.find(User.class,scoreDto.getUserId());
        Attraction attraction = em.find(Attraction.class,scoreDto.getAttractionId());
        if(user == null) throw new EntityNotFoundException(scoreDto.getUserId()+"에 해당하는 사용자 정보가 없습니다");
        if(attraction == null) throw new EntityNotFoundException(scoreDto.getAttractionId()+"에 해당하는 여행지 정보가 없습니다");

        Score originScore = scoreRepository.findByUserIdAndAttractionId(user,attraction);

        if(originScore==null){
            System.out.println(">>>새로운 score");
            Score score = new Score();
            score.setUserId(user);
            score.setAttractionId(attraction);
            score.setScore(scoreDto.getScore());
            em.persist(score);

            Attraction a = em.find(Attraction.class,scoreDto.getAttractionId());// 평균 = 각점수합 / 개수
            a.setScore(Math.round(((a.getScore()==0?1:a.getScore()) * a.getCnt() + scoreDto.getScore())/(a.getCnt()+1)));
            a.setCnt(a.getCnt()+1);

            return score;
        }else{
            System.out.println(">>>기존 score");
            Score score = em.find(Score.class,originScore.getId());
            Attraction a = em.find(Attraction.class,scoreDto.getAttractionId());// 평균 = 각점수합 / 개수

            a.setScore(Math.round(((a.getScore()==0?1:a.getScore()) * a.getCnt() - score.getScore() + scoreDto.getScore())/(a.getCnt())));
            score.setScore(scoreDto.getScore());
            return score;
        }
    }


    /* 사용자 평점 매긴 여행지 리스트 찾기 */
    public List<ScoreDto> findAllByUserId(long userId){
        List<Score> scores = em.createQuery("SELECT s FROM Score as s WHERE s.userId.id = :userId",Score.class)
                .setParameter("userId",userId).getResultList();
        List<ScoreDto> scoreDtoList = new ArrayList<>();

        for (Score s:scores) {
            ScoreDto scoreSave = ScoreDto.builder()
                    .score(s.getScore())
                    .userId(s.getUserId().getId())
                    .attractionId(s.getAttractionId() !=null ? s.getAttractionId().getId():0)
                    .build();
            scoreDtoList.add(scoreSave);
        }
        return scoreDtoList;
    }

    /* 여행지 리스트 조회 */
    public List<AttractionResponseDto> searchAttractionList(String name, long userId){ // score 다시 가져오기
        String sql = "SELECT a.attraction_id,a.name,s.score,a.image FROM attraction a left join score s on s.user_id = :userId and a.attraction_id = s.attraction_id where a.name LIKE :name "+
                "ORDER BY CASE WHEN a.name = :name0 THEN 0" +
                " WHEN a.name LIKE :name1 THEN 1 " +
                " WHEN a.name LIKE :name2 THEN 2" +
                " WHEN a.name LIKE :name3 THEN 3 " +
                "ELSE 4 " +
                "END";
        List<Object[]> attractions = em.createNativeQuery(sql)
                .setParameter("userId",userId)
                .setParameter("name","%"+name+"%")
                .setParameter("name0",name)
                .setParameter("name1",name+"%")
                .setParameter("name2","%"+name+"%")
                .setParameter("name3","%"+name)
                .getResultList();

        List<AttractionResponseDto> attractionList = new ArrayList<>();
        for (Object[] a:attractions) {
            AttractionResponseDto attractionDto = AttractionResponseDto.builder()
                    .id(Long.valueOf(String.valueOf(a[0])))
                    .name(String.valueOf(a[1]))
                    .score(Double.valueOf(String.valueOf(a[2]==null?0:a[2]))) //null이면 0 넣어주기
                    .img(String.valueOf(a[3]))
                    .build();
            attractionList.add(attractionDto);
        }

        return attractionList;
    }



    /* 여행지 리스트 로그인 없이 조회 */
    public List<AttractionResponseDto> searchAttractionListWithoutLogin(String name){
        String sql = "SELECT a.attraction_id,a.name,a.image FROM attraction a where a.name LIKE :name "+
                "ORDER BY CASE WHEN a.name = :name0 THEN 0" +
                " WHEN a.name LIKE :name1 THEN 1 " +
                " WHEN a.name LIKE :name2 THEN 2" +
                " WHEN a.name LIKE :name3 THEN 3 " +
                "ELSE 4 " +
                "END";
        List<Object[]> attractions = em.createNativeQuery(sql)
                .setParameter("name","%"+name+"%")
                .setParameter("name0",name)
                .setParameter("name1",name+"%")
                .setParameter("name2","%"+name+"%")
                .setParameter("name3","%"+name)
                .getResultList();

        List<AttractionResponseDto> attractionList = new ArrayList<>();
        for (Object[] a:attractions) {
            AttractionResponseDto attractionDto = AttractionResponseDto.builder()
                    .id(Long.valueOf(String.valueOf(a[0])))
                    .name(String.valueOf(a[1]))
                    .img(String.valueOf(a[2]==null?"X":a[2]))
                    .build();
            attractionList.add(attractionDto);
        }

        return attractionList;
    }
}
