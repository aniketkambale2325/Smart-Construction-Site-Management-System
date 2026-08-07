package com.construction.entity;

import com.construction.dto.request.EmployeeRequest;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name="employees")
@Data @NoArgsConstructor @AllArgsConstructor
public class Employee {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    private String fullName;
    private String phone;
    private String designation;
    private BigDecimal dailyRate;
    private LocalDate joiningDate;

    @OneToMany(
            mappedBy = "employee",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<SalaryRecord> salaryRecords;


}
