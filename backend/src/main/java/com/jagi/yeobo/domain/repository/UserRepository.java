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
        if(findUser == null)throw new NullPointerException();
        return findUser;
    }

    public UserDto searchUser(int id){
        User user = searchOne(id);

        UserDto userDto = UserDto.builder()
                .email(user.getEmail())
//                .password(user.getPassword())
                .nickname(user.getNickname())
                .gender(user.getGender())
                .age(user.getAge())
                .build();
        return userDto;
    }

    public int updateUserNick(int id, String nick){
        User user = searchOne(id);
        user.setNickname(nick);
        em.persist(user);

        User finduser = searchOne(id);
        if(finduser.getNickname() == nick) return 1;
        else return 0;
    }

    public int deleteById(int id){ //void 말고 int로 해서 잘 삭제됐는지 확인해도 될듯
        User user = searchOne(id);
        em.remove(user);
//        em.flush(); em.persist(user); 이런거 필요하나?

        //확인
        User find = em.find(User.class,id);
        if(find == null) return 1; // 잘 삭제됨
        else return 0;//관련된 것도 지워야 하나 자동으로 지워지나
    }


}
