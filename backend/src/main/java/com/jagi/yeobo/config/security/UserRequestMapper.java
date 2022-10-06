package com.jagi.yeobo.config.security;

import com.jagi.yeobo.service.UserDto2;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Component;

@Component
public class UserRequestMapper {

    public UserDto2 toDto(OAuth2User oAuth2User){
        var attibutes = oAuth2User.getAttributes();
        return UserDto2.builder()
                .email((String)attibutes.get("email"))
                .name((String)attibutes.get("name"))
                .build();
    }

}
