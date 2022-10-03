package com.jagi.yeobo.config.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jagi.yeobo.domain.repository.UserRepository;
import com.jagi.yeobo.domain.repository.UserRepository2;
import com.jagi.yeobo.dto.UserDto;
import com.jagi.yeobo.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Component
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtTokenProvider jwtTokenProvider;

    private final UserRequestMapper userRequestMapper;

    private final ObjectMapper objectMapper;

    private final UserRepository2 userRepository2;

    private final UserService userService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        UserDto user = userRequestMapper.toDto(oAuth2User);

        // 최초 로그인한 회원이라면 회원가입 처리를 한다.
        if(!userRepository2.existsByEmail(user.getEmail())){
            userService.joinSocial(user);
        }


        List<String> roles = new ArrayList<>();
        roles.add("ROLE_USER");
        String accessToken = jwtTokenProvider.createToken(user.getEmail(), roles);
        String refreshToken = jwtTokenProvider.createRefreshToken(user.getEmail(), roles);

        // 로그인 처리
        userService.socialLogin(user.getEmail(), refreshToken);

        log.info("email : {}", user.getEmail());
        log.info("name : {}", user.getNickname());
        log.info("access token : {}", accessToken);
        log.info("refresh token : {}", refreshToken);
        String targetUrl;

        response.setContentType("text/html;charset=UTF-8");
        response.addHeader("accessToken", accessToken);
        response.setContentType("application/json;charset=UTF-8");
//        targetUrl = UriComponentsBuilder.fromHttpUrl("http://j7c103.p.ssafy.io/oauth/redirect")
        targetUrl = UriComponentsBuilder.fromHttpUrl("https://localhost:8080/")
                .queryParam("accessToken", accessToken)
                .build().toUriString();
        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }


}
