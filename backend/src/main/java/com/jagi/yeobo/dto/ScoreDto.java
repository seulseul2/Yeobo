package com.jagi.yeobo.dto;

import com.jagi.yeobo.domain.Attraction;
import com.jagi.yeobo.domain.User;
import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiParam;
import lombok.*;

import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
public class ScoreDto {
    @ApiModelProperty(example="1")
    @ApiParam(value = "사용자 userId")
    private User userId;

    @ApiModelProperty(example="1")
    @ApiParam(value = "여행지 attractionId")
    private Attraction attractionId;

    @ApiModelProperty(example="5")
    @ApiParam(value = "사용자의 여행지에 대한 점수", type = "double")
    private double score;
}
