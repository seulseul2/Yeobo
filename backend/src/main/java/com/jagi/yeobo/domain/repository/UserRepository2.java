package com.jagi.yeobo.domain.repository;

import com.jagi.yeobo.domain.User;
import com.jagi.yeobo.dto.UserDto;
import com.jagi.yeobo.dto.UserResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.ArrayList;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class UserRepository2 {
    @PersistenceContext
    private final EntityManager em;

    public void save(User user){
        //
        /* 닉네임이 비어있다면 이메일의 @앞까지 넣어주기 */
        if(user.getNickname() == null || user.getNickname() == ""){
            String email = user.getEmail();
            email = email.substring(0,email.indexOf("@"));
            user.setNickname(email);
        }
        em.persist(user);
    }

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
                .profilePath(user.getProfilePath())
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

    public List<UserResponseDto> searchByNick(String nickname){ // nickname으로 userId와 nickname 리스트 반환해주면 되나?
        Query query = em.createNativeQuery("SELECT u.user_id,u.nickname FROM user as u WHERE u.nickname LIKE :nickname " +
                        "ORDER BY CASE WHEN u.nickname = :nick0 THEN 0" +
                        " WHEN u.nickname LIKE :nick1 THEN 1 " +
                        " WHEN u.nickname LIKE :nick2 THEN 2" +
                        " WHEN u.nickname LIKE :nick3 THEN 3 " +
                        "ELSE 4 " +
                        "END")
                .setParameter("nickname","%"+nickname+"%")
                .setParameter("nick0",nickname)
                .setParameter("nick1",nickname+"%")
                .setParameter("nick2","%"+nickname+"%")
                .setParameter("nick3","%"+nickname);
        List<Object[]> list = query.getResultList();

        List<UserResponseDto> nickList = new ArrayList<>();
        for (Object[] l:list) {
            UserResponseDto userDto = UserResponseDto.builder()
                    .id(Long.valueOf(String.valueOf(l[0])))
                    .nickname(String.valueOf(l[1])).build();
            nickList.add(userDto);
        }

        return nickList;
    }

    public boolean existsByEmail(String email){
        List<User> userList = em.createQuery("select u from User u where u.email = :email", User.class)
                .setParameter("email", email)
                .getResultList();
        if(userList.size() == 0) return false;
        return true;
    }

    public User findByEmail(String email) throws IllegalStateException {
        List<User> memberList = em.createQuery("select m from User m where m.email = :email", User.class)
                .setParameter("email", email)
                .getResultList();
        if(memberList.size() == 0) throw new IllegalStateException("해당 이메일을 가진 사용자가 없습니다.");
        return memberList.get(0);
    }
    public void socialLogin(String email, String refreshToken){
        User user = findByEmail(email);
        user.changeRefreshToken(refreshToken);

    }


}
