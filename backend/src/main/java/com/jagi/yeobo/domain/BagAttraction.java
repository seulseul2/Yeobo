package com.jagi.yeobo.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import static javax.persistence.FetchType.LAZY;

@Entity
@Table(name = "bag_attraction")
@NoArgsConstructor
@Getter
public class BagAttraction {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bag_attraction_id")
    private long id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "bag_id")
    private Bag bagId;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "attraction_id")
    private Attraction attractionId;

    public BagAttraction(Bag bagId, Attraction attractionId){
        this.bagId = bagId;
        this.attractionId = attractionId;
    }
}
