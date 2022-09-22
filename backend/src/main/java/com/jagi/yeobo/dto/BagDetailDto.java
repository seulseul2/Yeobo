package com.jagi.yeobo.dto;

import com.jagi.yeobo.domain.Attraction;
import com.jagi.yeobo.domain.Bag;
import lombok.*;

@Getter
@Setter
@RequiredArgsConstructor
@Builder
@AllArgsConstructor
public class BagDetailDto {

    private Bag bag;

    private Attraction attraction;

}
