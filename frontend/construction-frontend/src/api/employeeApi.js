import {javaApi} from "./axiosInstance.js";

export async function getAllEmployees(){
    const response = await javaApi.get('/employees');
    return response.data;
}

export async function getEmployeeById(id){
    const response = await javaApi.get(`/employees/${id}`);
    return response.data;
}

export async function createEmployee(employeeData){
    const response = await javaApi.post('/employees', employeeData);
    return response.data;
}

export async function updateEmployee(id, employeeData){
    const response = await javaApi.put(`/employees/${id}`,employeeData);
    return response.data;
}

export async function deleteEmployee(id) {
    await javaApi.delete(`/employees/${id}`);
}