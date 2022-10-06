package com.jagi.yeobo.dto;

import com.jagi.yeobo.domain.Bag;
import lombok.*;

@Getter
@Setter
@RequiredArgsConstructor
@Builder
@AllArgsConstructor
public class BagDto {

    private long id;
    private String name;
    private String memo;
    private String image;

    public Bag toEntity(){
        return Bag.builder().id(id).name(name).memo(memo).bagImage(image).build();
    }
}
