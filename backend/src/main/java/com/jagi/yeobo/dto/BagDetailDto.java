package com.jagi.yeobo.dto;

import com.jagi.yeobo.domain.Attraction;
import com.jagi.yeobo.domain.Bag;
import io.swagger.annotations.ApiParam;
import lombok.*;

import java.util.List;

@Getter
@Setter
@RequiredArgsConstructor
@Builder
@AllArgsConstructor
@ToString
public class BagDetailDto {

    @ApiParam(value = "보따리 이름", type="String")
    private String name;

    @ApiParam(value="보따리 메모", type="String")
    private String memo;

    @ApiParam(value="여행지 리스트", type="List")
    private List<AttractionDto> attraction;

    @ApiParam(value="보따리 좋아요여부", type="boolean")
    private boolean pick;

}
