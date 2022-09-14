package com.jagi.yeobo.domain;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Table(name = "bag")
public class Bag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="bag_id")
    private long id;

    @ManyToOne
    @JoinColumn(name="user_id")
    private User userId;

    @Column(name="create_time")
    private LocalDateTime createTime;

    private String name;

    private String memo;


}
