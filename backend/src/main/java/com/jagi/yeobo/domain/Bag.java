package com.jagi.yeobo.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.jagi.yeobo.dto.BagDto;
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
@Builder
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

    @Column(name="link_cnt")
    private int likeCnt;

    @OneToMany(orphanRemoval = true, mappedBy = "bagId" , cascade = CascadeType.ALL)
    @Builder.Default
    @JsonIgnore
    List<Pick> bagPickList = new ArrayList<>();

    @OneToMany(orphanRemoval = true, mappedBy = "bagId" , cascade = CascadeType.ALL)
    @Builder.Default
    @JsonIgnore
    List<BagAttraction> bagAttractionList = new ArrayList<>();

    public void updateBag(BagDto bagDto){
        this.name = name;
        this.memo = memo;
    }

    public Bag(User user, String name, String memo){
        this.userId = user;
        this.name = name;
        this.memo = memo;
    }



}
