package com.construction.dto.responce;

public record LoginResponse(String token,
                            String refreshToken,
                            String role,
                            Long userId) { }
