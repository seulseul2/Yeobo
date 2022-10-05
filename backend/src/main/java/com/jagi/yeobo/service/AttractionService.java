package com.jagi.yeobo.service;


import com.jagi.yeobo.domain.Attraction;
import com.jagi.yeobo.domain.Score;
import com.jagi.yeobo.domain.repository.AttractionRepository;
import com.jagi.yeobo.domain.repository.AttractionRepository2;
import com.jagi.yeobo.domain.repository.ScoreRepository;
import com.jagi.yeobo.dto.AttractionResponseDto;
import com.jagi.yeobo.dto.ScoreDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AttractionService {
    private final AttractionRepository attractionRepository;
    private final AttractionRepository2 attractionRepository2;
    private final ScoreRepository scoreRepository;

    @Transactional
    public Optional<Attraction> findById(Long id){
        return attractionRepository.findById(id);
    }

    @Transactional
    public List<AttractionResponseDto> findAllByName(String name, long userId, Pageable pageable){
        return attractionRepository2.searchAttractionList(name,userId, pageable);
//        return attractionRepository.findAllByName(name);
    }

    @Transactional
    public List<AttractionResponseDto> findAllByNameWithoutLogin(String name){
        return attractionRepository2.searchAttractionListWithoutLogin(name);
//        return attractionRepository.findAllByName(name);
    }

    @Transactional
    public Score createScore(ScoreDto scoreDto){
        return attractionRepository2.saveScore(scoreDto);
//        return scoreRepository.save(scoreDto);
    }
    @Transactional
    public List<ScoreDto> findAllScoreByUserId(long userId){
        return attractionRepository2.findAllByUserId(userId);
    }


}
