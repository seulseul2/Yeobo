package com.jagi.yeobo.dto;

import com.jagi.yeobo.domain.Bag;
import lombok.*;

@Getter
@Setter
@RequiredArgsConstructor
@Builder
@AllArgsConstructor
public class BagDto {
    private String name;

    private String memo;

    public Bag toEntity(){
        return Bag.builder().name(name).memo(memo).build();
    }
}
