package com.jagi.yeobo.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="user_id")
    private long id;

    private String email;

    private String password;

    private String nickname;

    private String profile_path;

    private String gender;

    @Column(nullable = true)
    private int age;

    private String refresh_token;

    private String role;

    @OneToMany(mappedBy = "userId",cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Pick> userPickList = new ArrayList<>();

    @OneToMany(mappedBy = "userId",cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Score> userScoreList = new ArrayList<>();

    @OneToMany(mappedBy = "userId",cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Bag> bagList = new ArrayList<>();
}
