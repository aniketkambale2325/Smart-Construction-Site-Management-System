package com.construction.dto.request;

import com.construction.entity.AttendanceStatus;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record AttendanceRequest(
        @NotNull Long employeeId,
        @NotNull LocalDate date,
        @NotNull AttendanceStatus status)
{}
