package com.jagi.yeobo.dto;

import com.jagi.yeobo.domain.Bag;
import lombok.*;

@Getter
@Setter
@RequiredArgsConstructor
@Builder
@AllArgsConstructor
public class BagSearchDto {
    private String name;
    private String memo;

    //해당 사용자가 좋아요를 눌렀는지 안눌렀는지 확인하기 위한 변수
    private boolean check;

    public Bag toEntity(){
        return Bag.builder().name(name).memo(memo).build();
    }
}
