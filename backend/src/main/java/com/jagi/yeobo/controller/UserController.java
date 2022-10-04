package com.jagi.yeobo.controller;

import com.jagi.yeobo.domain.User;
import com.jagi.yeobo.dto.*;
import com.jagi.yeobo.service.UserService;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.file.AccessDeniedException;
import java.util.List;

//@CrossOrigin(originPatterns = "https://localhost:3000, http://localhost:3000")
@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @ApiOperation(value = "회원가입",notes = "email과 password를 받아서 회원가입한다.")
    @PostMapping("/api/auth/user/signUp")
    public ResponseEntity<?> signUp(@RequestBody UserSaveDto userSaveDto){
        Message message = new Message();
        HttpHeaders headers= new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
        try {
            long id = userService.signUp(userSaveDto.toEntity());
            message.setStatus(StatusEnum.OK);
            message.setMessage("회원가입 성공");
            message.setData("userId: "+ id);
            return new ResponseEntity<>(message, headers, HttpStatus.OK);
        } catch (IllegalArgumentException | IllegalStateException e){
            e.printStackTrace();
            message.setStatus(StatusEnum.BAD_REQUEST);
            message.setMessage("가입 이메일이 중복됩니다.--추후 변경");
            return new ResponseEntity<>(message, headers, HttpStatus.BAD_REQUEST);
        } catch (Exception e){
            e.printStackTrace();
            message.setStatus(StatusEnum.INTERNAL_SERVER_ERROR);
            message.setMessage("서버 에러 발생");
            return new ResponseEntity<>(message, headers,  HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiOperation(value = "로그인 요청",notes = "email과 password로 로그인을 요청한다.")
    @PostMapping("/api/auth/user/login")
    public ResponseEntity<?> login(@RequestBody UserLoginRequestDto userLoginDto){
        Message message = new Message();
        HttpHeaders headers= new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
        try {
            UserLoginDto user = userService.login(userLoginDto);
            message.setStatus(StatusEnum.OK);
            message.setMessage("로그인 성공");
            message.setData(user);
            return new ResponseEntity<>(message, headers, HttpStatus.OK);
        } catch (IllegalArgumentException | IllegalStateException e){
            e.printStackTrace();
            message.setStatus(StatusEnum.BAD_REQUEST);
            message.setMessage("이메일 혹은 비밀번호가 맞지 않습니다.");
            return new ResponseEntity<>(message, headers, HttpStatus.BAD_REQUEST);
        } catch (Exception e){
            e.printStackTrace();
            message.setStatus(StatusEnum.INTERNAL_SERVER_ERROR);
            message.setMessage("서버 에러 발생");
            return new ResponseEntity<>(message, headers,  HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiOperation(value = "로그아웃을 요청한다.",notes = "로그아웃을 요청한다.") //리프레쉬토큰으로
    @GetMapping("/api/logout")
    public ResponseEntity<?> logout() { //@RequestHeader(value="REFRESH-TOKEN") String refreshToken
        Message message = new Message();
        HttpHeaders headers= new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
        try {
//            memberService.logoutMember(refreshToken);
            message.setStatus(StatusEnum.OK);
            message.setMessage("로그아웃 성공");
            return new ResponseEntity<>(message, headers, HttpStatus.OK);
        } catch (Exception e){
            message.setStatus(StatusEnum.BAD_REQUEST);
            message.setMessage("ACCESS TOKEN이 일치하지 않습니다.");
            return new ResponseEntity<>(message, headers, HttpStatus.BAD_REQUEST);
        }
    }

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
            List<UserResponseDto> user = userService.searchByNick(nickname);
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

    @ApiOperation(value = "사용자 프로필 사진 수정(저장) 요청" ,notes = "사용자의 프로필 사진을 수정 요청한다.")
    @ApiImplicitParams(
            {
                    @ApiImplicitParam(name = "file",value = "사용자 이미지 파일"),
                    @ApiImplicitParam(name = "userId",value = "사용자 userId"),
            })
    @PostMapping("/api/profile/{userId}")
    public ResponseEntity<?> updateProfileImg(@RequestParam("file") MultipartFile file, @PathVariable("userId") long userId) {
        Message message = new Message();
        HttpHeaders headers= new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        try {
            if (file != null) {
                String fileOriName = file.getOriginalFilename();
                String fileName = userId+"_"+fileOriName;
//                String savePath = System.getProperty("user.home") +"/upload";
                String savePath = System.getProperty("user.dir") +"/upload";

                if (!new File(savePath).exists()) {
                    try {
                        new File(savePath).mkdir();
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }
                String fileUrl = savePath +  File.separator + fileName;

                file.transferTo(new File(fileUrl));
                System.out.println(">>>>"+fileUrl);
                userService.saveFile(userId,fileUrl);
                return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
            } else {
                return new ResponseEntity<String>("CHECK FILE", HttpStatus.BAD_REQUEST);
            }
        } catch (IllegalStateException e){
            e.printStackTrace();
            return new ResponseEntity<String>("CHECK EMAIL", HttpStatus.BAD_REQUEST);
        } catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<String>("FAIL", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiOperation(value = "사용자 프로필 사진파일 요청" ,notes = "사용자의 프로필 사진파일을 요청한다.")
    @ApiImplicitParam(name = "userId",value = "사용자 userId",dataType = "long",paramType = "path")
    @GetMapping("/api/profile/{userId}")
    public ResponseEntity<?> getProfileImg(@PathVariable("userId") long userId) throws IOException {
        Message message = new Message();
        HttpHeaders headers= new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        String img = userService.getFile(userId);

        message.setStatus(StatusEnum.OK);
        message.setMessage("사용자의 프로필 사진 조회 성공");
        message.setData(img);

        return new ResponseEntity<>(message, headers, HttpStatus.OK);
    }

    @ApiOperation(value = "소셜로그인 - 멤버정보 요청",notes = "발급받은 accessToken으로 멤버정보를 요청한다.")
    @GetMapping("/api/social")
    public ResponseEntity<?> getMember(
            @RequestHeader(value="X-AUTH-TOKEN") String token) throws Exception {
        Message message = new Message();
        HttpHeaders headers= new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        message.setStatus(StatusEnum.OK);
        message.setMessage("access token으로 정보 불러오기 성공");
        message.setData(userService.getMember(token));
        return new ResponseEntity<>(message, headers, HttpStatus.OK);

    }

    @ApiOperation(value = "access token 재발급 요청",notes = "refresh 토큰으로 access 토큰을 재발급 신청한다.")
    @PostMapping(value = "/api/refresh")
    public ResponseEntity<?> refreshToken(
            @RequestHeader(value="X-AUTH-TOKEN") String token,
            @RequestHeader(value="REFRESH-TOKEN") String refreshToken ) {
        Message message = new Message();
        HttpHeaders headers= new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        try {
            message.setStatus(StatusEnum.OK);
            message.setMessage("ACCESS TOKEN 재발급 성공");
            message.setData(userService.refreshToken(token, refreshToken));
            return new ResponseEntity<>(message, headers, HttpStatus.OK);
        } catch (AccessDeniedException e){
            e.printStackTrace();
            message.setStatus(StatusEnum.UNAUTHORIZED);
            message.setMessage("REFRESH TOKEN이 일치하지 않습니다.");
            return new ResponseEntity<>(message, headers, HttpStatus.OK);
        } catch (IllegalStateException e){
            e.printStackTrace();
            return new ResponseEntity<String>("RE LOGIN", HttpStatus.PAYMENT_REQUIRED);
        } catch (Exception e){
            e.printStackTrace();
            message.setStatus(StatusEnum.INTERNAL_SERVER_ERROR);
            message.setMessage("서버 에러 발생");
            return new ResponseEntity<>(message, headers,  HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

}
