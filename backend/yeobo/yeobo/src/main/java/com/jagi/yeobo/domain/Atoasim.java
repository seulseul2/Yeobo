package com.jagi.yeobo.domain;

import lombok.Getter;

import javax.persistence.*;

import static javax.persistence.FetchType.*;

@Entity
@Getter
@Table(name = "atoasim")
public class Atoasim {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "atoasim_id")
    private long id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "attraction_id")
    private Attraction attraction;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "attraction2_id")
    private Attraction attraction2;

}
