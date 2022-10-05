package com.jagi.yeobo.service;

import com.jagi.yeobo.config.security.JwtTokenProvider;
import com.jagi.yeobo.domain.User;
import com.jagi.yeobo.domain.repository.UserRepository;
import com.jagi.yeobo.domain.repository.UserRepository2;
import com.jagi.yeobo.dto.UserDto;
import com.jagi.yeobo.dto.UserLoginDto;
import com.jagi.yeobo.dto.UserLoginRequestDto;
import com.jagi.yeobo.dto.UserResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.file.AccessDeniedException;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository2 userRepository2;
    private final UserRepository userRepository;

    private final JwtTokenProvider jwtTokenProvider;

    @Transactional
    public UserDto searchUser(long userId) {
        return userRepository2.searchUser(userId);
    }
    @Transactional
    public int updateUserNick(long userId, String nick){
        return userRepository2.updateUserNick(userId,nick);
    }
    @Transactional
    public int deleteUser(long userId) {
        return userRepository2.deleteById(userId);
    }
    @Transactional
    public List<UserResponseDto> searchByNick(String nickname){
        return userRepository2.searchByNick(nickname);
    }
    @Transactional
    public long signUp(User user){
        userRepository2.save(user);
        return user.getId();
    }

    @Transactional
    public UserLoginDto login(UserLoginRequestDto userLoginDto){
        String email = userLoginDto.getEmail();
        String password = userLoginDto.getPassword();
        User user = userRepository2.findByEmail(email);

       if(!user.getPassword().equals(password)) {
            throw new IllegalStateException("잘못된 비밀번호 입니다.");
        }
        // 리프레쉬 토큰 발급
        user.changeRefreshToken(jwtTokenProvider.createRefreshToken(email, user.getRoles()));
        UserLoginDto userDto = UserLoginDto.builder()
                .email(email)
                .accessToken(jwtTokenProvider.createToken(email, user.getRoles()))
                .refreshToken(user.getRefreshToken())
                .id(user.getId())
                .age(user.getAge())
                .gender(user.getGender())
                .nickname(user.getNickname())
                .profile_path(user.getProfilePath())
                .age(user.getAge())
                .build();

        return userDto;
    }

    @Transactional
    public void saveFile(long userId,String fileUrl) throws IllegalStateException {
        Optional<User> findUser = userRepository.findById(userId);

        findUser.get().setProfilePath(fileUrl);
        userRepository.save(findUser.get());
    }

    @Transactional
    public String getFile(long userId) throws IllegalStateException{
        Optional<User> findUser = userRepository.findById(userId);
        String img = findUser.get().getProfilePath();
        return img;
    }

    @Transactional
    public UserLoginDto getMember(String accessToken) throws Exception {
        String email = jwtTokenProvider.getUserPk(accessToken);
        User member = userRepository2.findByEmail(email);
//        if(member == null) throw new SomethingNotFoundException("member(email:"+email+")");
        // 리프레쉬 토큰 발급
        UserLoginDto memberDto = UserLoginDto.builder()
                .email(email)
                .accessToken(accessToken)
                .refreshToken(member.getRefreshToken())
                .id(member.getId())
                .age(member.getAge())
                .gender(member.getGender())
                .nickname(member.getNickname())
                .profile_path(member.getProfilePath())
                .build();

        return memberDto;
    }

    @Transactional
    public void joinSocial(UserDto user){
        User us = new User();
        us.setEmail(user.getEmail());
        us.setNickname(user.getNickname());
        us.setPassword("social");
        //us.setEnable(true);
        userRepository2.save(us);
    }

    @Transactional
    public void socialLogin(String email, String refreshToken){
        userRepository2.socialLogin(email, refreshToken);
    }

    @Transactional
    public UserLoginDto refreshToken(String token, String refreshToken) throws Exception {

       if(jwtTokenProvider.validateToken(token)) throw new AccessDeniedException("token이 만료되지 않음");

        User member = userRepository2.findByEmail(jwtTokenProvider.getUserPk(refreshToken));
        System.out.println(member.getRefreshToken());
        if(!refreshToken.equals(member.getRefreshToken())) throw new AccessDeniedException("해당 멤버가 존재하지 않습니다.");

        if(!jwtTokenProvider.validateToken(member.getRefreshToken()))
            throw new IllegalStateException("다시 로그인 해주세요.");

        member.changeRefreshToken(jwtTokenProvider.createRefreshToken(member.getEmail(), member.getRoles()));

        UserLoginDto memberDto = UserLoginDto.builder()
                .email(member.getEmail())
                .accessToken(jwtTokenProvider.createToken(member.getEmail(), member.getRoles()))
                .refreshToken(member.getRefreshToken())
                .id(member.getId())
                .age(member.getAge())
                .gender(member.getGender())
                .nickname(member.getNickname())
                .profile_path(member.getProfilePath())
                .age(member.getAge())
                .build();

        return memberDto;
    }

    @Transactional
    public void logout(String token) throws IllegalStateException {
        boolean result = jwtTokenProvider.validateToken(token);
        if(!result) throw new IllegalStateException("토큰 만료 되었습니다.");
        User member = userRepository2.findByEmail(jwtTokenProvider.getUserPk(token));
        member.changeRefreshToken("invalidate");
    }

}
