package com.jagi.yeobo.dto;

import com.jagi.yeobo.domain.Bag;
import com.jagi.yeobo.domain.User;
import lombok.*;

@Getter
@Setter
@RequiredArgsConstructor
@Builder
@AllArgsConstructor
@ToString
public class PopularBagDto {

    private String name;
    private String memo;
    private String image;

    private String userName;
    private Long id;


}
