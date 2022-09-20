package com.jagi.yeobo.controller;

import com.jagi.yeobo.dto.Message;
import com.jagi.yeobo.dto.StatusEnum;
import com.jagi.yeobo.dto.UserDto;
import com.jagi.yeobo.service.UserService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.nio.charset.Charset;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    /* 회원가입 */

    @ApiOperation(value = "회원정보를 얻어온다.",notes = "memberId로 해당하는 회원 정보를 얻어온다.")
    @GetMapping("/api/user/{userId}")
    public ResponseEntity<?> searchUser(@PathVariable("userId") int userId){
        Message message = new Message();
        HttpHeaders headers= new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
        try {
            UserDto user = userService.searchUser(userId);
            message.setStatus(StatusEnum.OK);
            message.setMessage("회원정보 불러오기 성공");
            message.setData(user);
            return new ResponseEntity<>(message, headers, HttpStatus.OK);
        } catch (IllegalArgumentException | IllegalStateException e){
            e.printStackTrace();
            message.setStatus(StatusEnum.BAD_REQUEST);
            message.setMessage("회원 정보가 없습니다.");
            return new ResponseEntity<>(message, headers, HttpStatus.BAD_REQUEST);
        } catch (Exception e){
            e.printStackTrace();
            message.setStatus(StatusEnum.INTERNAL_SERVER_ERROR);
            message.setMessage("서버 에러 발생");
            return new ResponseEntity<>(message, headers,  HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
