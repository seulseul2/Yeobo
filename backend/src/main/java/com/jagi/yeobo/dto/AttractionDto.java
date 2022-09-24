package com.jagi.yeobo.dto;

import io.swagger.annotations.ApiParam;
import lombok.*;

@Getter
@Setter
@RequiredArgsConstructor
@Builder
@AllArgsConstructor
public class AttractionDto {

    @ApiParam(value="여행지 id", type="long")
    private long id;

    @ApiParam(value="여행지 이름", type = "String")
    private String name;
}
