package com.construction.service;

import com.construction.entity.Employee;
import com.construction.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Optional;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository repository;

    public void create(Employee emp){
        repository.save(emp);
    }

    public Collection<Employee> getAll(){
        Collection<Employee> allEmp = repository.findAll();
        return allEmp;
    }

    public Employee getById(Long id){
        Optional<Employee> op = repository.findById(id);
        Employee foundEmp = op.orElse(null);
        return foundEmp;
    }

    public Employee update(Employee existEmp){
        Employee updateEmp = repository.save(existEmp);
        return updateEmp;
    }

}
