import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
    userType: number | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [userType, setUserType] = useState<number | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUserType = localStorage.getItem('userType');
        if (storedUserType) {
            setUserType(parseInt(storedUserType));
        }
    }, []);

    const login = async (email: string, password: string) => {
        const response = await fetch('http://144.126.132.105:8080/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) throw new Error('Login failed');

        const data = await response.json();
        if (data[1] === 2) {
            setUserType(data[0]);
            localStorage.setItem('userType', data[0].toString());
        } else {
            throw new Error('Invalid credentials');
        }
    };

    const logout = () => {
        setUserType(null);
        localStorage.removeItem('userType');
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ userType, login, logout, isAuthenticated: !!userType }}>
    {children}
    </AuthContext.Provider>
);
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};