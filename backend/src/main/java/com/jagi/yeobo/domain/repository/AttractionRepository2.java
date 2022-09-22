package com.jagi.yeobo.domain.repository;

import com.jagi.yeobo.domain.Attraction;
import com.jagi.yeobo.dto.ScoreDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class AttractionRepository2 {
    @PersistenceContext
    private final EntityManager em;

    private final AttractionRepository attractionRepository;


}
