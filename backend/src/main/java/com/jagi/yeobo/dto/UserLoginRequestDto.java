package com.jagi.yeobo.dto;

import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiParam;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserLoginRequestDto {
    @ApiParam(value = "사용자 email", required = true)
    @ApiModelProperty(example="lgeun123@naver.com")
    private String email;

    @ApiParam(value = "사용자 password", required = true)
    @ApiModelProperty(example="1234")
    private String password;

}
