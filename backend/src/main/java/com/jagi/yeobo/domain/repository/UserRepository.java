package com.jagi.yeobo.domain.repository;

import com.jagi.yeobo.domain.User;
import com.jagi.yeobo.dto.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class UserRepository {
    @PersistenceContext
    private final EntityManager em;

    public User searchOne(long id){
        User findUser = em.find(User.class, id);
        if(findUser == null)throw new NullPointerException();
        return findUser;
    }

    public UserDto searchUser(long id){
        User user = searchOne(id);

        UserDto userDto = UserDto.builder()
                .id(id)
                .email(user.getEmail())
//                .password(user.getPassword())
                .nickname(user.getNickname())
                .gender(user.getGender())
                .age(user.getAge())
                .build();
        return userDto;
    }

    public int updateUserNick(long id, String nick){
        User user = searchOne(id);
        user.setNickname(nick);
        em.persist(user);

        User finduser = searchOne(id);
        if(finduser.getNickname() == nick) return 1;
        else return 0;
    }

    public int deleteById(long id){ //void 말고 int로 해서 잘 삭제됐는지 확인해도 될듯
        User user = searchOne(id);
        em.remove(user);
//        em.flush(); em.persist(user); 이런거 필요하나?

        //확인
        User find = em.find(User.class,id);
        if(find == null) return 1; // 잘 삭제됨
        else return 0;//관련된 것도 지워야 하나 자동으로 지워지나
    }

    public List<UserDto> searchByNick(String nickname){ // nickname으로 userId와 nickname 리스트 반환해주면 되나?
        Query query = em.createQuery("SELECT u.id,u.nickname FROM User as u WHERE u.nickname LIKE :nickname " )//+
//                        "ORDER BY CASE WHEN u.nickname = :nick0 THEN 0" +
//                        " WHEN u.nickname = :nick1 THEN 1 " +
//                        " WHEN u.nickname LIKE :nick2 THEN 2" +
//                        " WHEN u.nickname LIKE :nick3 THEN 3 " +
//                        "ELSE 4 " +
//                        "END)")
                .setParameter("nickname","%"+nickname+"%");
//                .setParameter("nick0",nickname)
//                .setParameter("nick1",nickname+"%")
//                .setParameter("nick2","%"+nickname+"%")
//                .setParameter("nick3","%"+nickname);
        List<Object[]> list = query.getResultList();
        List<UserDto> nickList = new ArrayList<>();
        for (Object[] l:list) {
            UserDto userDto = UserDto.builder()
                    .id((long)l[0])
                    .nickname((String)l[1]).build();
            nickList.add(userDto);
        }

        return nickList;
    }
}
