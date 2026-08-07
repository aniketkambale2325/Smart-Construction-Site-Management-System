package com.construction.controller;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.construction.dto.request.SalaryGenerateRequest;
import com.construction.dto.responce.SalaryRecordResponce;
import com.construction.service.SalaryRecordService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/salary")
@RequiredArgsConstructor
public class SalaryController {


    private final SalaryRecordService salaryService;

    @PostMapping("/generate/{employeeId}")
    public ResponseEntity<SalaryRecordResponce> generateSalaryRecords(@PathVariable Long employeeId, @Valid @RequestBody SalaryGenerateRequest request){
        return ResponseEntity.ok(salaryService.generateSalaryRecord(employeeId, request));

    }
}
