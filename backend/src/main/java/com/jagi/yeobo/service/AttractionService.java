package com.jagi.yeobo.service;


import com.jagi.yeobo.domain.Attraction;
import com.jagi.yeobo.domain.Score;
import com.jagi.yeobo.domain.repository.AttractionRepository;
import com.jagi.yeobo.domain.repository.ScoreRepository;
import com.jagi.yeobo.dto.ScoreDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AttractionService {
    private final AttractionRepository attractionRepository;
    private final ScoreRepository scoreRepository;

    public Optional<Attraction> findById(Long id){
        return attractionRepository.findById(id);
    }

    public List<Attraction> findAllByName(String name){
        return attractionRepository.findAllByName(name);
    }

    public Score createScore(ScoreDto scoreDto){
        return scoreRepository.save(scoreDto);
    }
}
