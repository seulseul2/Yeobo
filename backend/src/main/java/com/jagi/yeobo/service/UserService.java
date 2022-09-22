package com.jagi.yeobo.service;

import com.jagi.yeobo.domain.repository.UserRepository;
import com.jagi.yeobo.dto.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    public UserDto searchUser(long userId) {
        return userRepository.searchUser(userId);
    }
    public int updateUserNick(long userId, String nick){
        return userRepository.updateUserNick(userId,nick);
    }
    public int deleteUser(long userId) {
        return userRepository.deleteById(userId);
    }

    public List<UserDto> searchByNick(String nickname){
        return userRepository.searchByNick(nickname);
    }
}
