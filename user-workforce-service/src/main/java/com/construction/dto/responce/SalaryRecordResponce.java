package com.construction.dto.responce;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record SalaryRecordResponce(
        Long id, Long employeeId, Integer month, Integer year,
        BigDecimal salary, Integer daysPresent, LocalDateTime generatedAt
) {
}
