package com.jagi.yeobo.service;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class UserDto2 {
    private String email;
    private String nickname;

    @Builder
    public UserDto2(String email, String name){
        this.email = email;
        this.nickname = name;
    }

}
