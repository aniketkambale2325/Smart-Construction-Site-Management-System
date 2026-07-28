package com.construction.service;

import com.construction.dto.request.SalaryGenerateRequest;
import com.construction.dto.responce.SalaryRecordResponce;
import com.construction.entity.Attendance;
import com.construction.entity.Employee;
import com.construction.entity.SalaryRecord;
import com.construction.exception.ResourceNotFoundException;
import com.construction.repository.AttendanceRepository;
import com.construction.repository.EmployeeRepository;
import com.construction.repository.SalaryRecordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SalaryRecordService {

    private final SalaryRecordRepository salaryRecordRepository;
    private final EmployeeRepository employeeRepository;
    private final AttendanceRepository attendanceRepository;

    public SalaryRecordResponce generateSalaryRecord(Long employeeId, SalaryGenerateRequest request){

        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(()-> new ResourceNotFoundException("Employee Not Found"));

        LocalDate start = LocalDate.of(request.year(), request.month(), 1);
        LocalDate end = start.withDayOfMonth(start.lengthOfMonth());

        List<Attendance> attendances = attendanceRepository
                .findByEmployeeIdAndDateBetween(employeeId, start, end);
        double workedDay = attendances.stream()
                .mapToDouble(a-> switch (a.getStatus()){
                    case PRESENT -> 1.0;
                    case HALFDAY -> 0.5;
                    case ABSENT -> 0.0;
                })
                .sum();

        BigDecimal amount = employee.getDailyRate()
                .multiply(BigDecimal.valueOf(workedDay));

        SalaryRecord record = new SalaryRecord();
        record.setEmployee(employee);
        record.setMonth(request.month());
        record.setYear(request.year());
        record.setDaysPresent((int) workedDay);
        record.setSalary(amount);

        SalaryRecord saved = salaryRecordRepository.save(record);
        return  toResponse(saved);
    }

    private SalaryRecordResponce toResponse(SalaryRecord record){
        return new SalaryRecordResponce(
                record.getId(),
                record.getEmployee().getId(),
                record.getMonth(),
                record.getYear(),
                record.getSalary(),
                record.getDaysPresent(),
                record.getGeneratedAt()
                );
    }


}
