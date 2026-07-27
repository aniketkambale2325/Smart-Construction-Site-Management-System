package com.construction.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    private String secret;

    private long expirationMs;

    private static final long REFRESH_EXPIRATION_MS = 7 * 24 * 60 * 60 * 100L;

    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }

    public String generateaccessTocken(String username, String role, Long userId) {
        return Jwts.builder()
                .subject(username)
                .claim("role",role)
                .claim("userId", userId)
                .claim("type","access")
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + expirationMs))
                .signWith(getSigningKey())
                .compact();
    }

    public String generateRefreshTocken(String username){
        return Jwts.builder()
                .subject(username)
                .claim("type","refresh")
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + REFRESH_EXPIRATION_MS))
                .signWith(getSigningKey())
                .compact();
    }

    public Claims extractClaims(String token){
        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public String extractUsername(String token){
        return extractClaims(token).getSubject();
    }

    public String extractRole(String token){
        return extractClaims(token).get("role", String.class);
    }

    public boolean isTokenvalid(String token){
        try{
            Claims claims = extractClaims(token);
            return claims.getExpiration().after(new Date());
        }
        catch(JwtException | IllegalArgumentException e){
            return false;
        }
    }

    public boolean isRefreshtoken

}
