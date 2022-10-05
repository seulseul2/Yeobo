package com.jagi.yeobo.dto;

import io.swagger.annotations.ApiParam;
import lombok.*;

@Getter
@Setter
@RequiredArgsConstructor
@Builder
@AllArgsConstructor
public class AttractionResponseDto {
    @ApiParam(value="여행지 id", type="long")
    private long id;

    @ApiParam(value="여행지 이름", type = "String")
    private String name;

    @ApiParam(value="사용자가 평가한 여행지 점수", type = "double")
    private double score;

    @ApiParam(value="여행지 이미지", type = "String")
    private String img;
}
