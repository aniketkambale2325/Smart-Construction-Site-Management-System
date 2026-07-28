package com.construction.controller;

import com.construction.dto.request.LoginRequest;
import com.construction.dto.request.RegisterRequest;
import com.construction.dto.responce.LoginResponse;
import com.construction.entity.User;
import com.construction.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

public class AuthController {

    private final AuthService authService;

    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request){
        User user = authService.register((request));
        return ResponseEntity.status(HttpStatus.CREATED).body(user);
    }

    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request){
        return  ResponseEntity.ok(authService.login(request));
    }
    
    public ResponseEntity<LoginResponse> 
}
