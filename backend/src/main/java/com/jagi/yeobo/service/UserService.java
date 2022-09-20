package com.jagi.yeobo.service;

import com.jagi.yeobo.domain.repository.UserRepository;
import com.jagi.yeobo.dto.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    public UserDto searchUser(int userId) {
        return userRepository.searchUser(userId);
    }
    public int updateUserNick(int userId, String nick){
        return userRepository.updateUserNick(userId,nick);
    }
    public int deleteUser(int userId) {
        return userRepository.deleteById(userId);
    }
}
