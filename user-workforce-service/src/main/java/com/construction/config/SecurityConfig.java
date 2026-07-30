package com.construction.config;

import com.construction.security.JwtAuthFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;

    @Bean
    public PasswordEncoder passwordEncoder(){
        return  new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws  Exception{
        http
                .csrf(csrf -> csrf.disable())
                .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/auth/**", "/swagger-ui/**", "/v3/api-docs/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/employees/**").hasAnyRole("ADMIN", "CONTRACTOR", "SITE_ENGINEER")
                        .requestMatchers(HttpMethod.POST, "/api/employees/**").hasAnyRole("ADMIN", "CONTRACTOR")
                        .requestMatchers(HttpMethod.PUT, "/api/employees/**").hasAnyRole("ADMIN", "CONTRACTOR")
                        .requestMatchers("/api/attendence/**").hasAnyRole("ADMIN", "CONTRACTOR", "SITE_ENGINEER", "SUPERVISOR")
                        .requestMatchers("/api/salary/**").hasAnyRole("ADMIN", "CONTRACTOR")
                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
        return  http.build();
    }
}
