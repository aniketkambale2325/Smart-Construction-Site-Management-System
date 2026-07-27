package com.construction.service;

import com.construction.entity.User;
import com.construction.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository repository;

    @Autowired
    private BCryptPasswordEncoder encoder;

    public void register(User user){
        String encodedPassword = encoder.encode(user.getPasswordHash());
        user.setPasswordHash(encodedPassword);
        repository.save(user);
    }



}
