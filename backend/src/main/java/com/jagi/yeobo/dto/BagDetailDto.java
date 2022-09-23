package com.jagi.yeobo.dto;

import com.jagi.yeobo.domain.Attraction;
import com.jagi.yeobo.domain.Bag;
import lombok.*;

import java.util.List;

@Getter
@Setter
@RequiredArgsConstructor
@Builder
@AllArgsConstructor
public class BagDetailDto {

    private String name;

    private String memo;

    private List<AttractionDto> attraction;

}
