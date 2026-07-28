package com.construction.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record RegisterRequest(@NotBlank String username,
                              @Email @NotBlank String email,
                              @NotBlank String password,
                              @NotNull Integer roleId) {
}
