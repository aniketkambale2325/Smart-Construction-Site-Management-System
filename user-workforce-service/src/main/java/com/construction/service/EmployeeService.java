package com.construction.service;

import com.construction.dto.request.EmployeeRequest;
import com.construction.dto.responce.EmployeeResponse;
import com.construction.entity.Employee;
import com.construction.entity.User;
import com.construction.exception.ResourceNotFoundException;
import com.construction.repository.EmployeeRepository;
import com.construction.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final UserRepository userRepository;

    public EmployeeResponse create(EmployeeRequest request){
        User user = userRepository.findById(request.userId())
                .orElseThrow(()-> new ResourceNotFoundException("User not found"));

        Employee employee = new Employee();
        employee.setUser(user);
        employee.setFullName(request.fullName());
        employee.setPhone(request.phone());
        employee.setDesignation(request.designation());
        employee.setDailyRate(request.dailyRate());
        employee.setJoiningDate(request.joiningDate());

        Employee saved = employeeRepository.save(employee);

        return  toResponse(saved);
    }

    public List<EmployeeResponse> getAll(){
        return employeeRepository.findAll().stream().map(this::toResponse).toList();
    }

    public EmployeeResponse getById(Long id){
       Employee employee = employeeRepository.findById(id)
               .orElseThrow(() -> new ResourceNotFoundException("Employee not found"));
        return toResponse(employee);
    }

    public EmployeeResponse update(Long id ,EmployeeRequest request){
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found"));

        employee.setFullName(request.fullName());
        employee.setPhone(request.phone());
        employee.setDesignation(request.designation());
        employee.setDailyRate(request.dailyRate());
        employee.setJoiningDate(request.joiningDate());

        return  toResponse(employeeRepository.save(employee));
    }

    private EmployeeResponse toResponse(Employee e){
        return  new EmployeeResponse(e.getId(),e.getFullName(),e.getPhone(),e.getDesignation(),e.getDailyRate(),e.getJoiningDate());
    }

}
