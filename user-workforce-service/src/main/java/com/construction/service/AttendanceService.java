package com.construction.service;

import com.construction.dto.request.AttendanceRequest;
import com.construction.dto.responce.AttendanceResponce;
import com.construction.entity.Attendance;
import com.construction.entity.Employee;
import com.construction.exception.ResourceNotFoundException;
import com.construction.repository.AttendanceRepository;
import com.construction.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AttendanceService {

    private final AttendanceRepository attendanceRepository;
    private final EmployeeRepository employeeRepository;

    public AttendanceResponce markAttendance(AttendanceRequest request, String markedBy){
        Employee employee = employeeRepository.findById(request.employeeId())
                .orElseThrow(()-> new ResourceNotFoundException(("Employee Not Found")));

        Attendance attendance = attendanceRepository.findByEmployeeIdAndDate(request.employeeId(), request.date())
                .orElse(new Attendance());
        attendance.setEmployee(employee);
        attendance.setDate(request.date());
        attendance.setStatus(request.status());
        attendance.setMarkedBy(markedBy);

        Attendance saved = attendanceRepository.save(attendance);
        return toResponse(saved);
    }

    public List<AttendanceResponce> getHistory(Long employeeId){
        return attendanceRepository.findByEmployeeIdOrderByDateDesc(employeeId)
                .stream()
                .map(this::toResponse)
                .toList();
    }


    private AttendanceResponce toResponse(Attendance atd){
        return  new AttendanceResponce(atd.getId(), atd.getEmployee().getId(), atd.getDate(), atd.getStatus(), atd.getMarkedBy());
    }

}
