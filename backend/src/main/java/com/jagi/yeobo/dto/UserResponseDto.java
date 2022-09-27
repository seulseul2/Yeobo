package com.jagi.yeobo.dto;

import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiParam;
import lombok.*;

@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
public class UserResponseDto {
    @ApiModelProperty(example="1")
    @ApiParam(value = "사용자 userId")
    private long id;

    @ApiModelProperty(example="유저 닉네임")
    @ApiParam(value = "사용자 nickname", type = "String")
    private String nickname;
}
