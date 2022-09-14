package com.jagi.yeobo.domain;

import lombok.*;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Setter
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

    @Builder
    public Attraction(String name, String description, String address, String image, double score) {
        this.name = name;
        this.description = description;
        this.address = address;
        this.image = image;
        this.score = score;
    }
}
