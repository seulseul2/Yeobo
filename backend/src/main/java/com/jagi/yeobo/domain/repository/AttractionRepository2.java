package com.jagi.yeobo.domain.repository;

import com.jagi.yeobo.domain.Attraction;
import com.jagi.yeobo.domain.Score;
import com.jagi.yeobo.domain.User;
import com.jagi.yeobo.dto.ScoreDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class AttractionRepository2 {
    @PersistenceContext
    private final EntityManager em;

    private final AttractionRepository attractionRepository;


    public Score saveScore(ScoreDto scoreDto){
        Score score = new Score();

        User user = em.find(User.class,scoreDto.getUserId());
        score.setUserId(user);

        Attraction attraction = em.find(Attraction.class,scoreDto.getAttractionId());
        score.setAttractionId(attraction);
        score.setScore(scoreDto.getScore());
        em.persist(score);

        return score;
    }


    /* 사용자 평점 매긴 여행지 리스트 찾기 */
    public List<ScoreDto> findAllByUserId(long userId){
        List<Score> scores = em.createQuery("SELECT s FROM Score as s WHERE s.userId.id = :userId",Score.class)
                .setParameter("userId",userId).getResultList();
        List<ScoreDto> scoreDtoList = new ArrayList<>();

        for (Score s:scores) {
//            System.out.println(s.);
            ScoreDto scoreSave = ScoreDto.builder()
                    .score(s.getScore())
                    .userId(s.getUserId().getId())
                    .attractionId(s.getAttractionId().getId())
                    .build();
            scoreDtoList.add(scoreSave);
        }
        return scoreDtoList;
    }


}
