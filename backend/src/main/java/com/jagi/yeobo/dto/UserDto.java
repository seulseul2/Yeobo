package com.jagi.yeobo.dto;

import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiParam;
import lombok.*;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Getter
@Setter
@ToString
@Builder @AllArgsConstructor
public class UserDto {
    @ApiModelProperty(example="1")
    @ApiParam(value = "사용자 userId")
    private long id;
    @ApiModelProperty(example="lgeun123@naver.com")
    @ApiParam(value = "사용자 email")
    private String email;
//    @ApiModelProperty(example="1234")
//    @ApiParam(value = "사용자 password")
//    private String password;
    @ApiModelProperty(example="유저 닉네임")
    @ApiParam(value = "사용자 nickname", type = "String")
    private String nickname;

//    private String profile_path;
    @ApiModelProperty(example="MALE")
    @ApiParam(value = "사용자 gender(MALE/FEMALE)", type = "String")
    private String gender;

    @ApiModelProperty(example="20")
    @ApiParam(value = "사용자 age", type = "int")
    private int age;

//    private String refresh_token;

//    private String role;
}
