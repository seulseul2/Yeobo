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
public class BagDetailDto {

    @ApiParam(value = "보따리 이름", type="String")
    private String name;

    @ApiParam(value="보따리 메모", type="String")
    private String memo;

    @ApiParam(value="여행지 리스트", type="List")
    private List<AttractionDto> attraction;

}
