package com.jagi.yeobo.dto;

import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiParam;
import lombok.*;

@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
public class AttractionScoreDto {
    @ApiModelProperty(example="1")
    @ApiParam(value = "사용자 userId")
    private long userId;

    @ApiModelProperty(example="1")
    @ApiParam(value = "여행지 attractionId")
    private long attractionId;

    @ApiModelProperty(example="5")
    @ApiParam(value = "사용자의 여행지에 대한 점수", type = "double")
    private double score;

    @ApiParam(value="여행지 이름", type = "String")
    private String name;

    @ApiParam(value="여행지 이미지", type = "String")
    private String img;
}
