package com.construction.repository;

import com.construction.entity.SalaryRecord;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SalaryRecordRepository extends JpaRepository<SalaryRecord, Long> {
}
