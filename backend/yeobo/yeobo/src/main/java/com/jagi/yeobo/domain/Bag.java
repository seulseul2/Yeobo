package com.jagi.yeobo.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User userId;

    @Column(name="create_time")
    private LocalDateTime createTime;

    private String name;

    private String memo;

    @OneToMany(orphanRemoval = true, mappedBy = "bagId" , cascade = CascadeType.ALL)
    @JsonIgnore
    List<Pick> bagPickList = new ArrayList<>();

}
