package com.jagi.yeobo.controller;

import com.jagi.yeobo.domain.Attraction;
import com.jagi.yeobo.domain.Score;
import com.jagi.yeobo.dto.*;
import com.jagi.yeobo.service.AttractionService;
import com.jagi.yeobo.service.UserService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.Charset;
import java.util.List;
import java.util.Optional;

//@CrossOrigin(originPatterns = "https://localhost:3000, http://localhost:3000")
@RestController
@RequiredArgsConstructor
public class AttractionController {

    private final AttractionService attractionService;

    @ApiOperation(value = "여행지 id로 세부정보 조회",notes = "여행지의 세부 정보를 id로 조회한다.")
    @GetMapping("api/temp/attraction/detail/{attractionId}") // /{page}
    public ResponseEntity<?> searchAttractionById(@PathVariable("attractionId") Long  attractionId){
        Message message = new Message();
        HttpHeaders headers= new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
        try {

            Optional<Attraction> attraction = attractionService.findById(attractionId);
            message.setStatus(StatusEnum.OK);
            message.setMessage("여행지 세부 정보 조회 성공");
            message.setData(attraction);
            return new ResponseEntity<>(message, headers, HttpStatus.OK);
        } catch (IllegalArgumentException | IllegalStateException e){
            e.printStackTrace();
            message.setStatus(StatusEnum.BAD_REQUEST);
            message.setMessage("여행지 정보가 없습니다.");
            return new ResponseEntity<>(message, headers, HttpStatus.BAD_REQUEST);
        } catch (Exception e){
            e.printStackTrace();
            message.setStatus(StatusEnum.INTERNAL_SERVER_ERROR);
            message.setMessage("서버 에러 발생");
            return new ResponseEntity<>(message, headers,  HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @ApiOperation(value = "여행지 이름으로 리스트 조회",notes = "검색어를 포함하는 여행지 리스트를 조회한다.")
    @GetMapping("api/temp/user/attraction/search/{name}") // /{page}
    public ResponseEntity<?> searchAttractionListByName(@PathVariable("name") String name,@RequestParam("userId")long userId){
        Message message = new Message();
        HttpHeaders headers= new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
        try {
            List<AttractionResponseDto> attraction = attractionService.findAllByName(name,userId);
            if(!attraction.isEmpty()){
                message.setStatus(StatusEnum.OK);
                message.setMessage("여행지 세부 정보 조회 성공");
                message.setData(attraction);
                return new ResponseEntity<>(message, headers, HttpStatus.OK);
            }else{
                message.setStatus(StatusEnum.BAD_REQUEST);
                message.setMessage("여행지 정보가 없습니다.");
                return new ResponseEntity<>(message, headers, HttpStatus.BAD_REQUEST);
            }


        } catch (IllegalArgumentException | IllegalStateException e){
            e.printStackTrace();
            message.setStatus(StatusEnum.BAD_REQUEST);
            message.setMessage("여행지 정보 혹은 사용자 정보가 없습니다.");
            return new ResponseEntity<>(message, headers, HttpStatus.BAD_REQUEST);
        } catch (Exception e){
            e.printStackTrace();
            message.setStatus(StatusEnum.INTERNAL_SERVER_ERROR);
            message.setMessage("서버 에러 발생");
            return new ResponseEntity<>(message, headers,  HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    @ApiOperation(value = "사용자의 여행지 평가",notes = "사용자 userId로 여행지 각각에 대해 평가한 점수를 저장한다.")
    @PostMapping("api/temp/attraction/score")
    public ResponseEntity<?> createAttractionScore(@RequestBody ScoreDto scoreDto){
        Message message = new Message();
        HttpHeaders headers= new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
        try {
            Score score = attractionService.createScore(scoreDto);

            message.setStatus(StatusEnum.OK);
            message.setMessage("사용자의 여행지 평가 저장 성공");
            message.setData(score);
            return new ResponseEntity<>(message, headers, HttpStatus.OK);
        } catch (IllegalArgumentException | IllegalStateException e){
            e.printStackTrace();
            message.setStatus(StatusEnum.BAD_REQUEST);
            message.setMessage("여행지 정보 혹은 사용자 정보가 없습니다.");
            return new ResponseEntity<>(message, headers, HttpStatus.BAD_REQUEST);
        } catch (Exception e){
            e.printStackTrace();
            message.setStatus(StatusEnum.INTERNAL_SERVER_ERROR);
            message.setMessage("서버 에러 발생");
            return new ResponseEntity<>(message, headers,  HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiOperation(value = "사용자의 평점 매긴 여행지 리스트",notes = "사용자가 평점 매긴 여행지 리스트를 조회한다.")
    @GetMapping("api/attraction/scorelist/{userId}") // /{page}
    public ResponseEntity<?> searchAttractionListByUserScore(@PathVariable("userId") long userId){
        Message message = new Message();
        HttpHeaders headers= new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
        try {
            List<AttractionScoreDto> attraction = attractionService.findAllScoreByUserId(userId);
            if(!attraction.isEmpty()){
                message.setMessage("사용자가 평점 남긴 여행지 리스트 조회 성공");
            }else{
                message.setMessage("사용자가 평점 남긴 여행지 정보가 없습니다.");
            }
            message.setStatus(StatusEnum.OK);
            message.setData(attraction);
            return new ResponseEntity<>(message, headers, HttpStatus.OK);
        } catch (IllegalArgumentException | IllegalStateException e){
            e.printStackTrace();
            message.setStatus(StatusEnum.BAD_REQUEST);
            message.setMessage("여행지 정보 혹은 사용자 정보가 없습니다.");
            return new ResponseEntity<>(message, headers, HttpStatus.BAD_REQUEST);
        } catch (Exception e){
            e.printStackTrace();
            message.setStatus(StatusEnum.INTERNAL_SERVER_ERROR);
            message.setMessage("서버 에러 발생");
            return new ResponseEntity<>(message, headers,  HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiOperation(value = "여행지 이름으로 리스트 조회-로그인없이",notes = "검색어를 포함하는 여행지 리스트를 조회한다.")
    @GetMapping("api/temp/attraction/search/{name}") // /{page}
    public ResponseEntity<?> searchAttractionListByNameWithoutLogin(@PathVariable("name") String name){
        Message message = new Message();
        HttpHeaders headers= new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
        try {
            List<AttractionResponseDto> attraction = attractionService.findAllByNameWithoutLogin(name);
            if(!attraction.isEmpty()){
                message.setStatus(StatusEnum.OK);
                message.setMessage("여행지 세부 정보 조회 성공");
                message.setData(attraction);
                return new ResponseEntity<>(message, headers, HttpStatus.OK);
            }else{
                message.setStatus(StatusEnum.BAD_REQUEST);
                message.setMessage("여행지 정보가 없습니다.");
                return new ResponseEntity<>(message, headers, HttpStatus.BAD_REQUEST);
            }


        } catch (IllegalArgumentException | IllegalStateException e){
            e.printStackTrace();
            message.setStatus(StatusEnum.BAD_REQUEST);
            message.setMessage("여행지 정보 혹은 사용자 정보가 없습니다.");
            return new ResponseEntity<>(message, headers, HttpStatus.BAD_REQUEST);
        } catch (Exception e){
            e.printStackTrace();
            message.setStatus(StatusEnum.INTERNAL_SERVER_ERROR);
            message.setMessage("서버 에러 발생");
            return new ResponseEntity<>(message, headers,  HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
