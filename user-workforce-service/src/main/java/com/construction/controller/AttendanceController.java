package com.construction.controller;


import com.construction.dto.request.AttendanceRequest;
import com.construction.dto.responce.AttendanceResponce;
import com.construction.service.AttendanceService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/attendance")
@RequiredArgsConstructor
public class AttendanceController {

    private final AttendanceService attendanceService;

    @PostMapping
    public ResponseEntity<AttendanceResponce> markAttendance(@Valid @RequestBody AttendanceRequest request, Authentication authentication){
        String markedBy = authentication.getName();
        return ResponseEntity.ok(attendanceService.markAttendance(request, markedBy));
    }

    @GetMapping("/{employeeId}")
    public ResponseEntity<List<AttendanceResponce>> getAttendanceHistory(@PathVariable Long employeeId){
        return ResponseEntity.ok(attendanceService.getHistory(employeeId));
    }


}
