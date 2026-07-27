package com.construction.dto.responce;

import com.construction.entity.AttendanceStatus;

import java.time.LocalDate;

public record AttendanceResponce(
        Long id,
        Long employeeId,
        LocalDate date,
        AttendanceStatus status,
        String markedBy
) {
}
