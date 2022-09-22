package com.jagi.yeobo.controller;

import com.jagi.yeobo.domain.Bag;
import com.jagi.yeobo.dto.BagDto;
import com.jagi.yeobo.dto.Message;
import com.jagi.yeobo.dto.StatusEnum;
import com.jagi.yeobo.service.BagService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.Charset;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class BagController {

    private final BagService bagService;

    @PutMapping("api/bag/update/name/{bagId}")
    public ResponseEntity<?> updateBag(@PathVariable("userId") int userId, @RequestBody BagDto bagDto){
        Message message = new Message();
        HttpHeaders headers= new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        bagService.updateBag(userId, bagDto);
        message.setStatus(StatusEnum.OK);
        message.setMessage("보따리 수정 성공");

        return new ResponseEntity<>(message, headers, HttpStatus.OK);
    }

    @GetMapping("api/bag/list/{userId}")
    public ResponseEntity<?> searchBagList(@PathVariable("userId") int userId){
        Message message = new Message();
        HttpHeaders headers= new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        List<BagDto> bagDtoList = bagService.searchBagList(userId);

        message.setStatus(StatusEnum.OK);
        message.setMessage("보따리 리스트 조회 성공");
        message.setData(bagDtoList);

        return new ResponseEntity<>(message, headers, HttpStatus.OK);
    }

    @PostMapping("api/bag/like/{userId}/{bagId}")
    public ResponseEntity<?> likeBag(@PathVariable("userId") int userId, @PathVariable("bagId") int bagId){
        Message message = new Message();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        bagService.likeBag(userId, bagId);

        message.setStatus(StatusEnum.OK);
        message.setMessage("좋아요 성공");

        return new ResponseEntity<>(message, headers, HttpStatus.OK);
    }

    @GetMapping("api/bag/likelist/{userId}")
    public ResponseEntity<?> searchLikeBagList(@PathVariable("userId") int userId){
        Message message = new Message();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        List<BagDto> bagDtoList = bagService.searchLikeBagList(userId);
        message.setStatus(StatusEnum.OK);
        message.setMessage("좋아요한 보따리 리스트 조회 성공");
        message.setData(bagDtoList);

        return new ResponseEntity<>(message, headers, HttpStatus.OK);
    }

    @GetMapping("api/bag/list/popular")
    public ResponseEntity<?> searchPopularBagList(@PathVariable("bagId") int bagId){
        Message message = new Message();
        HttpHeaders headers= new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        List<BagDto> bagDtoList = bagService.searchPopularBagList();
        message.setStatus(StatusEnum.OK);
        message.setMessage("상위 4개 인기 보따리 리스트 조회 성공");
        message.setData(bagDtoList);

        return new ResponseEntity<>(message, headers, HttpStatus.OK);
    }


}
