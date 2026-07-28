package com.construction.dto.responce;

import java.math.BigDecimal;
import java.time.LocalDate;

public record EmployeeResponse(Long id,
                               String fullName,
                               String phone,
                               String designation,
                               BigDecimal dailyRate,
                               LocalDate joiningDate) { }
