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

    private String name;

    private String description;

    private String address;

    private String image;

    @Column(nullable = true)
    private double score;

    @OneToMany(orphanRemoval = true, mappedBy = "attractionId" , cascade = CascadeType.ALL)
    @JsonIgnore
    List<Atoasim> atoasimList = new ArrayList<>();

    @OneToMany(orphanRemoval = true, mappedBy = "attraction2Id" , cascade = CascadeType.ALL)
    @JsonIgnore
    List<Atoasim> atoasim2List = new ArrayList<>();

    @OneToMany(orphanRemoval = true, mappedBy = "attractionId" , cascade = CascadeType.ALL)
    @JsonIgnore
    List<Score> scoreList = new ArrayList<>();

    @Builder
    public Attraction(String name, String description, String address, String image, double score) {
        this.name = name;
        this.description = description;
        this.address = address;
        this.image = image;
        this.score = score;
    }
}
