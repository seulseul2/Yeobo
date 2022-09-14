package com.jagi.yeobo.domain;

import lombok.*;

import javax.persistence.*;

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

    private int age;

    private String refresh_token;

    private String role;
}
