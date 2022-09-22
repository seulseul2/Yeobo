package com.jagi.yeobo.domain.repository;

import com.jagi.yeobo.domain.Score;
import com.jagi.yeobo.dto.ScoreDto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ScoreRepository extends JpaRepository<Score,Long> {

    public Score save(ScoreDto scoreDto);

    @Override
    void delete(Score entity);
}
