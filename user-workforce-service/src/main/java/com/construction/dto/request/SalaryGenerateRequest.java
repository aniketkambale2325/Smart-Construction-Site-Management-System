package com.construction.dto.request;

import jakarta.validation.constraints.NotNull;

public record SalaryGenerateRequest(@NotNull Integer month, @NotNull Integer year) {
}
