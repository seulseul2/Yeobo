package com.jagi.yeobo.domain;

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
    private List<Pick> pickList = new ArrayList<>();

    @OneToMany(mappedBy = "userId",cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Score> userscoreList = new ArrayList<>();

    @OneToMany(mappedBy = "userId",cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Bag> bagList = new ArrayList<>();
}
