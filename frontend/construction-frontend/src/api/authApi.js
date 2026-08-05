import {javaApi} from "./axiosInstance.js";

export async function loginRequest(username, password){
    const response = await javaApi.post('/auth/login', {username, password});
    return response.data;
}

export async function registerRequest(username, email, password,roleId){
    const response = await javaApi.post('/auth/register', {username, email, password});
    return response.data;
}