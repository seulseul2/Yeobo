package com.jagi.yeobo.dto;

import com.jagi.yeobo.domain.Bag;
import lombok.*;

@Getter
@Setter
@RequiredArgsConstructor
@Builder
@AllArgsConstructor
public class BagSearchDto {

    private long bagId;
    private String name;

    //해당 사용자가 좋아요를 눌렀는지 안눌렀는지 확인하기 위한 변수
    private boolean check;

    private String image;

//    public Bag toEntity(){
//        return Bag.builder().id(bagId).name(name).build();
//    }
}
