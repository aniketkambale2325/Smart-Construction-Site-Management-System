package com.construction.controller;


import com.construction.dto.request.SalaryGenerateRequest;
import com.construction.dto.responce.SalaryRecordResponce;
import com.construction.repository.SalaryRecordRepository;
import com.construction.service.SalaryRecordService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.PrivateKey;

@RestController
@RequestMapping("api/salary")
@RequiredArgsConstructor
public class SalaryController {


    private final SalaryRecordService salaryService;

    public ResponseEntity<SalaryRecordResponce> generateSalaryRecords(@PathVariable Long employeeId, @Valid @RequestBody SalaryGenerateRequest request){
        return ResponseEntity.ok(salaryService.generateSalaryRecord(employeeId, request));

    }
}
