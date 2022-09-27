package com.jagi.yeobo.service;

import com.jagi.yeobo.domain.Bag;
import com.jagi.yeobo.domain.repository.BagRepository;
import com.jagi.yeobo.dto.BagDetailDto;
import com.jagi.yeobo.dto.BagDto;
import com.jagi.yeobo.dto.BagSearchDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BagService {

    private final BagRepository bagRepository;

    @Transactional
    public void updateBag(long userId, BagDto bagDto){
        bagRepository.updateBag(userId, bagDto);
    }

    @Transactional
    public List<BagDto> searchBagList(long userId){
        return bagRepository.searchBagList(userId);
    }

    @Transactional
    public void likeBag(long userId, long bagId){
        bagRepository.likeBag(userId, bagId);
    }

    @Transactional
    public List<BagDto> searchLikeBagList(long userId){
        return bagRepository.searchLikeBagList(userId);
    }

    @Transactional
    public List<BagDto> searchPopularBagList(){
        return bagRepository.searchPopularBagList();
    }

    @Transactional
    public BagDetailDto searchDetailBag(long bagId){
        return bagRepository.searchDetailBag(bagId);
    }

    @Transactional
    public List<BagSearchDto> searchBagByName(String name, long userId){
        return bagRepository.searchBagByName(name, userId);
    }

    @Transactional
    public int deleteOneInBag(long bagId, long attractionId ){
        return bagRepository.deleteOneInBag(bagId, attractionId);
    }
}
