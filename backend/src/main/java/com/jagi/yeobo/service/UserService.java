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
}
