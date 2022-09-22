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
import org.springframework.web.bind.annotation.*;

import java.nio.charset.Charset;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    /* 회원가입 */

    @ApiOperation(value = "회원정보를 얻어온다.",notes = "userId에 해당하는 회원 정보를 얻어온다.")
    @GetMapping("/api/user/{userId}")
    public ResponseEntity<?> searchUser(@PathVariable("userId") long userId){
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

    @ApiOperation(value = "회원의 닉네임 정보를 수정한다.",notes = "userId에 해당하는 회원 정보를 수정한다.(닉네임)")
    @PutMapping("/api/user/{userId}")
    public ResponseEntity<?> updateUserNick(@PathVariable("userId") long userId, @RequestParam String nick){
        Message message = new Message();
        HttpHeaders headers= new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
        try {
            int result = userService.updateUserNick(userId,nick);
            if(result==1){
                message.setStatus(StatusEnum.OK);
                message.setMessage("회원정보 수정 성공");
                return new ResponseEntity<>(message, headers, HttpStatus.OK);
            }else{
                message.setStatus(StatusEnum.BAD_REQUEST);
                message.setMessage("회원정보 수정 실패");
                return new ResponseEntity<>(message, headers, HttpStatus.OK);
            }

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
    @ApiOperation(value = "회원정보를 삭제한다.",notes = "userId에 해당하는 회원 정보를 삭제한다.")
    @DeleteMapping("/api/user/{userId}")
    public ResponseEntity<?> deleteUser(@PathVariable("userId") long userId){
        Message message = new Message();
        HttpHeaders headers= new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
        try {
            int result = userService.deleteUser(userId);
            if(result==1){
                message.setStatus(StatusEnum.OK);
                message.setMessage("회원정보 삭제 성공");
                return new ResponseEntity<>(message, headers, HttpStatus.OK);
            }else{
                message.setStatus(StatusEnum.BAD_REQUEST);
                message.setMessage("회원정보 삭제 실패");
                return new ResponseEntity<>(message, headers, HttpStatus.OK);
            }

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

    @ApiOperation(value = "닉네임으로 회원 리스트를 조회한다.",notes = "닉네임으로 회원들의 리스트를 조회한다.")
    @GetMapping("/api/user/search/{nickname}") // /{page}
    public ResponseEntity<?> searchUserByNick(@PathVariable("nickname") String nickname){
        Message message = new Message();
        HttpHeaders headers= new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
        try {
            List<UserDto> user = userService.searchByNick(nickname);
            message.setStatus(StatusEnum.OK);
            message.setMessage("닉네임 회원정보 조회 성공");
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
