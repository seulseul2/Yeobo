package com.jagi.yeobo.service;

import com.jagi.yeobo.domain.repository.BagRepository;
import com.jagi.yeobo.dto.BagDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BagService {

    private final BagRepository bagRepository;

    @Transactional
    public void updateBag(int userId, BagDto bagDto){
        bagRepository.updateBag(userId, bagDto);
    }

    @Transactional
    public List<BagDto> searchBagList(int userId){
        return bagRepository.searchBagList(userId);
    }

//    @Transactional
//    public List<BagDto> searchPopularBagList(){
//        return bagRepository.serarchPopularBagList();
//    }

    @Transactional
    public void likeBag(int userId, int bagId){
        bagRepository.likeBag(userId, bagId);
    }

    @Transactional
    public List<BagDto> searchLikeBagList(int userId){
        return bagRepository.searchLikeBagList(userId);
    }
}
