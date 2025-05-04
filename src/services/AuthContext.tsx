import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Configura Axios globalmente
axios.defaults.baseURL = '/api';
axios.defaults.withCredentials = true;

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
        try {
            const response = await axios.post('/auth/login', {
                email,
                password
            });

            if (response.data[1] === 2) {
                setUserType(response.data[0]);
                localStorage.setItem('userType', response.data[0].toString());
                navigate(getDashboardRoute(response.data[0]));
            } else {
                throw new Error('Credenciales inválidas');
            }
        } catch (error) {
            console.error('Error de autenticación:', error);
            throw new Error('Error al iniciar sesión');
        }
    };

    const getDashboardRoute = (userType: number) => {
        switch(userType) {
            case 1: return '/doctor-dashboard';
            case 2: return '/patient';
            case 3: return '/researcher-dashboard';
            default: return '/';
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