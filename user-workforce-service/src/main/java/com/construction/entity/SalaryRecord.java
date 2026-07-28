package com.construction.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Data @NoArgsConstructor @AllArgsConstructor
public class SalaryRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "employee_id",  nullable = false)
    private Employee employee;

    private Integer month;
    private Integer year;
    private BigDecimal salary;
    private Integer daysPresent;
    private LocalDateTime generatedAt;

    @PrePersist
    protected void onCreate(){
        generatedAt = LocalDateTime.now();
    }


}
