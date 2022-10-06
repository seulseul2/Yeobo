package com.jagi.yeobo.service;

import com.jagi.yeobo.domain.Bag;
import com.jagi.yeobo.domain.repository.BagRepository;
import com.jagi.yeobo.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BagService {

    private final BagRepository bagRepository;

    @Transactional
    public void updateBag(long bagId, BagDto bagDto){
        bagRepository.updateBag(bagId, bagDto);
    }

    @Transactional
    public List<BagDto> searchBagList(long userId){
        return bagRepository.searchBagList(userId);
    }

    @Transactional
    public void likeBag(long userId, long bagId) {
        bagRepository.likeBag(userId, bagId);
    }

    @Transactional
    public List<BagDto> searchLikeBagList(long userId){
        return bagRepository.searchLikeBagList(userId);
    }

    @Transactional
    public List<PopularBagDto> searchPopularBagList(){
        return bagRepository.searchPopularBagList();
    }

    @Transactional
    public BagDetailDto searchDetailBag(long bagId,long userId){
        return bagRepository.searchDetailBag(bagId,userId);
    }

    @Transactional
    public List<BagSearchDto> searchBagByName(String name, long userId){
        return bagRepository.searchBagByName(name, userId);
    }

    @Transactional
    public int deleteOneInBag(long bagId, long attractionId ){
        return bagRepository.deleteOneInBag(bagId, attractionId);
    }

    @Transactional
    public int likeBagCancel(long userId, long bagId){
        return bagRepository.likeBagCancel(userId, bagId);
    }

    @Transactional
    public Bag createBag(long userId, BagResponseDto bagResponseDto){
        return bagRepository.createBag(userId, bagResponseDto);
    }

    @Transactional
    public void createAttractions(long bagId, BagResponseDto bagResponseDto){
        bagRepository.createAttractions(bagId, bagResponseDto);
    }

    @Transactional
    public void createOneAttInBag(long bagId, long attractionId){
        bagRepository.createOneAttInBag(bagId, attractionId);
    }
}
