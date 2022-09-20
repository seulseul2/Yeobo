package com.jagi.yeobo.domain.repository;

import com.jagi.yeobo.domain.User;
import com.jagi.yeobo.dto.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Repository
@RequiredArgsConstructor
public class UserRepository {
    @PersistenceContext
    private final EntityManager em;

    public User searchOne(int id){
        User findUser = em.find(User.class, id);
        return findUser;
    }

    public UserDto searchUser(int id){
        User user = searchOne(id);

        UserDto userDto = UserDto.builder()
                .email(user.getEmail())
                .password(user.getPassword())
                .nickname(user.getNickname())
                .gender(user.getGender())
                .age(user.getAge())
                .build();
        return userDto;
    }
}
