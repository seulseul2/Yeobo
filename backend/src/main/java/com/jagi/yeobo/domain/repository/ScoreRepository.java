package com.jagi.yeobo.domain.repository;

import com.jagi.yeobo.domain.Attraction;
import com.jagi.yeobo.domain.Score;
import com.jagi.yeobo.domain.User;
import com.jagi.yeobo.dto.ScoreDto;
import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ScoreRepository extends JpaRepository<Score,Long> {

    public Score save(ScoreDto scoreDto);

    @Override
    void delete(Score entity);

    public Score findByUserIdAndAttractionId(User userId, Attraction attractionId);

//    @Query(value = "select s from Score s where s.userId.id = value(:userId) and s.attractionId.id = value(:attractionId)")
//    public Score findByUserIdAndAttractionId(@Param("userId") long userId,@Param("attractionId") long attractionId);
//    List<Score> findAllByUserId(long userId);
}
