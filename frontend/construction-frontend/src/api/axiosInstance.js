import axios from 'axios';

//JAva Api's
export const javaApi = axios.create({
    baseURL: 'http://localhost:8080/api',
});

//dotnet api's
export const dotnetApi = axios.create({
    baseURL:'http://localhost:8081/api',
});

export const pythonApi = axios.create({
    baseURL:'http://localhost:8082/api',
});

[javaApi, dotnetApi, pythonApi].forEach((instance)=>{
    instance.interceptors.request.use((config)=>{
        const token = localStorage.getItem('token');
        if(token){
            config.headers.Authorization = `Bearer ${token}`;   
        }
        return config;
    });

    instance.interceptors.response.use((responce) => responce, (error) => {
        if(error.response && error.response.status === 401){
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            window.location.href = '/login';
        }
        return promise.reject(error);
    });
});
[javaApi, dotnetApi, pythonApi].forEach(attachToken);