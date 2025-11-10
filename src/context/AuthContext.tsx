import React, { createContext, useState, useEffect } from 'react';
import type {User} from '../types/authTypes';
import type { AuthContextType } from "../types/authTypes"


// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType>({
    authuser: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    login: async () => {},
    logout: () => {},
    setauthUser: () => {},
    setIsAuthenticated : () =>{}
});


export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [authUser, setauthUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // Check for token in localStorage on mount
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
            setIsAuthenticated(true);
        }
    }, []);


    // Login function
    const login = async (email: string, password: string) => {
        setLoading(true);
        const res = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
        });

        if (!res.ok) throw new Error("Invalid Email or Password");
        const data = await res.json();

        setToken(data.token);
        setIsAuthenticated(true);
        setauthUser(data.user || null);

        //storing token in local-storage
        localStorage.setItem("token", data.token);

        setLoading(false);

        return data.user;
    };

    //Logout function
    const logout = () => {
        setToken(null);
        setIsAuthenticated(false);
        setauthUser(null);
        localStorage.removeItem("token");
    };

    const value = {
        isAuthenticated,
        setIsAuthenticated,
        authuser: authUser,
        setauthUser,
        login,
        logout,
        token,
        loading
    };

    
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>

}