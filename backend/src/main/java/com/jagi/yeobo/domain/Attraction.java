package com.jagi.yeobo.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Setter
@Table(name = "attraction")
public class Attraction {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "attraction_id")
    private long id;

    private int category;
    private String name;

    @Column(length = 10000)
    private String description;

    private String address;

    private int areaCode;

    private String image;

    private String image2;

    private double mapx;

    private double mapy;

    @Column(nullable = true)
    private double score;

    private int cnt; //이 여행지에 대해 평가한 개수

    private int readCount;

    @OneToMany(orphanRemoval = true, mappedBy = "attractionId" , cascade = CascadeType.ALL)
    @JsonIgnore
    List<Atoasim> atoasimList = new ArrayList<>();

    @OneToMany(orphanRemoval = true, mappedBy = "attraction2Id" , cascade = CascadeType.ALL)
    @JsonIgnore
    List<Atoasim> atoasim2List = new ArrayList<>();

    @OneToMany(orphanRemoval = true, mappedBy = "attractionId" , cascade = CascadeType.ALL)
    @JsonIgnore
    List<Score> scoreList = new ArrayList<>();

    @OneToMany(orphanRemoval = true, mappedBy = "attractionId" , cascade = CascadeType.ALL)
    @JsonIgnore
    List<BagAttraction> bagAttractionList = new ArrayList<>();

    @Builder
    public Attraction(String name, String description, String address, String image, double score) {
        this.name = name;
        this.description = description;
        this.address = address;
        this.image = image;
        this.score = score;
    }
}
