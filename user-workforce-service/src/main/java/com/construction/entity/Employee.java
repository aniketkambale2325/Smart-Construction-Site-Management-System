package com.construction.entity;

import com.construction.dto.request.EmployeeRequest;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name="employees")
@Data @NoArgsConstructor @AllArgsConstructor
public class Employee {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;
    
    private String fullName;
    private String phone;
    private String designation;
    private BigDecimal dailyRate;
    private LocalDate joiningDate;


}
