package com.jagi.yeobo.dto;

import com.jagi.yeobo.domain.Attraction;
import io.swagger.annotations.ApiParam;
import lombok.*;

import java.util.List;

@Getter
@Setter
@RequiredArgsConstructor
@Builder
@AllArgsConstructor
public class BagResponseDto {

    @ApiParam(value="여행지 id 리스트", type="List<Long>")
    private List<Long> attractionId;

    @ApiParam(value="보따리 이름", type="String")
    private String name;

    @ApiParam(value="보따리 메모", type="String")
    private String memo;

}
