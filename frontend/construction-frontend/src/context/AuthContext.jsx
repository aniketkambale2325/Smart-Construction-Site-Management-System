import { createContext, useContext, useState } from "react";
import {loginRequest} from "../api/authApi.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(()=>{
       const token = localStorage.getItem('token');
       const role = localStorage.getItem('role');
       const userId = localStorage.getItem('userId');
       return token ? {token, role, userId } : null;
    });

    const login = async (username, password) => {
        const data = await loginRequest(username, password);
        localStorage.setItem('token', data.token);
        localStorage.setItem('refreshToken', data.refreshToken);
        localStorage.setItem('role', data.role);
        localStorage.setItem('userId', data.userId);
        setUser({token: data.token, role: data.role, userId: data.userId });
        return data;
    };

    const logout = () => {
        localStorage.clear();
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{user, login
        , logout}}>{children}</AuthContext.Provider>
    );
}

export function useAuth(){
    const context = useContext(AuthContext);
    if(!context){
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}