import {javaApi} from './axiosInstance';

export const generateSalary = async(employeeId, month, year) => {
    return javaApi.post(`/salary/generate/${employeeId}`, {month, year}).then((response) => response.data);
}