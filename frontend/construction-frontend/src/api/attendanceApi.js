import { javaApi } from "./axiosInstance";

export async function markAttendance(employeeId, date, status) {
  const response = await javaApi.post('/attendance', { employeeId, date, status });
  return response.data;
}

export async function getAttendanceHistory(employeeId) {
    const response = await javaApi.get(`/attendance/${employeeId}`);
    return response.data;
}
