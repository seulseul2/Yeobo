package com.jagi.yeobo.dto;

import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiParam;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class UserLoginDto {
    @ApiParam(value = "사용자 email", required = true)
    @ApiModelProperty(example="lgeun123@naver.com")
    private String email;

    @ApiParam(value = "사용자 password", required = true)
    @ApiModelProperty(example="1234")
    private String password;

    @ApiModelProperty(example="발급받은 access token")
    String accessToken;

    @ApiModelProperty(example="발급받은 refresh token")
    String refreshToken;
}
