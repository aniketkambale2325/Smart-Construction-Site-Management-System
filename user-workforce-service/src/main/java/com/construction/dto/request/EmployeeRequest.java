package com.construction.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.time.LocalDate;

public record EmployeeRequest(@NotNull Long userId,
                              @NotBlank String fullName,
                              String phone,
                              String designation,
                              @NotNull BigDecimal dailyRate,
                              @NotNull LocalDate joiningDate) { }
