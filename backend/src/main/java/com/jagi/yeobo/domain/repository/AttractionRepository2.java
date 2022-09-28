package com.jagi.yeobo.domain.repository;

import com.jagi.yeobo.domain.Attraction;
import com.jagi.yeobo.domain.Score;
import com.jagi.yeobo.domain.User;
import com.jagi.yeobo.dto.AttractionResponseDto;
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
    private final UserRepository userRepository;

    /* 여행지에 점수 매기기 */
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
            ScoreDto scoreSave = ScoreDto.builder()
                    .score(s.getScore())
                    .userId(s.getUserId().getId())
                    .attractionId(s.getAttractionId().getId())
                    .build();
            scoreDtoList.add(scoreSave);
        }
        return scoreDtoList;
    }

    /* 여행지 리스트 조회 */
    public List<AttractionResponseDto> searchAttractionList(String name,long userId){ // score 다시 가져오기
        String sql = "SELECT a.attraction_id,a.name,s.score FROM attraction a left join score s on s.user_id = :userId and a.attraction_id = s.attraction_id and a.name LIKE :name "+
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
                    .build();
            attractionList.add(attractionDto);
        }

        return attractionList;
    }
}
