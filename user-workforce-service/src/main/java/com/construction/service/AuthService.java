package com.construction.service;

import com.construction.dto.request.LoginRequest;
import com.construction.dto.request.RefreshRequest;
import com.construction.dto.request.RegisterRequest;
import com.construction.dto.responce.LoginResponse;
import com.construction.entity.Role;
import com.construction.entity.User;
import com.construction.exception.ResourceNotFoundException;
import com.construction.exception.UnauthorizedException;
import com.construction.repository.RoleRepository;
import com.construction.repository.UserRepository;
import com.construction.util.JwtUtil;
import jdk.jfr.consumer.RecordedFrame;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;


    public User register(RegisterRequest request){
        Role role = roleRepository.findById(request.roleId())
                .orElseThrow(() -> new ResourceNotFoundException("Role not found"));

        User user = new User();
        user.setUsername(request.username());
        user.setEmail(request.email());
        user.setPasswordHash(passwordEncoder.encode(request.password()));
        user.setRole(role);

        return userRepository.save(user);
    }

    public LoginResponse login(LoginRequest request){
        User user = userRepository.findByUsername(request.username())
                .orElseThrow(() -> new UnauthorizedException("Invalid credentials"));

        if(!passwordEncoder.matches(request.password(), user.getPasswordHash())){
            throw  new UnauthorizedException("Invalid credentials");
        }
        
        String roleName = user.getRole().getRoleName();
        String accessToken = jwtUtil.generateAccessToken(user.getUsername(), roleName, user.getId());
        String refreshToken = jwtUtil.generateRefreshToken(user.getUsername());

        return new LoginResponse(accessToken, refreshToken, roleName, user.getId());
    }

    public LoginResponse refresh(RefreshRequest request){
        String token = request.refreshToken();

        if(!jwtUtil.isRefreshToken(token) || !jwtUtil.isRefreshToken(token)){
            throw new UnauthorizedException("Invalid or expired refresh token");
        }

        String username = jwtUtil.extractUsername(token);
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UnauthorizedException("User not found"));

        String roleName = user.getRole().getRoleName();
        String newAccessToken = jwtUtil.generateAccessToken(username, roleName, user.getId());
        String newRefreshToken = jwtUtil.generateRefreshToken(username);

        return new LoginResponse(newAccessToken, newRefreshToken,roleName,user.getId());
    }



}
