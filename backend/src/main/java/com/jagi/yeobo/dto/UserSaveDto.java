package com.jagi.yeobo.dto;

import com.jagi.yeobo.domain.User;
import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiParam;
import lombok.*;

@Getter
@Setter
@ToString
@Builder @AllArgsConstructor
public class UserSaveDto {

    @ApiModelProperty(example="lgeun123@naver.com")
    @ApiParam(value = "사용자 email")
    private String email;

    @ApiModelProperty(example="1234")
    @ApiParam(value = "사용자 password")
    private String password;

    @ApiModelProperty(example="userNick")
    @ApiParam(value = "사용자 nickname", type = "String")
    private String nickname;

    @ApiModelProperty(example="MALE")
    @ApiParam(value = "사용자 gender(MALE/FEMALE)", type = "String")
    private String gender;

    @ApiModelProperty(example="20")
    @ApiParam(value = "사용자 age", type = "int")
    private int age;

    public User toEntity(){
        User user = new User();
         user.setEmail(email);
         user.setPassword(password);
         user.setAge(age);
         user.setGender(gender);
         user.setNickname(nickname);
         return user;
    }
}
