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
            const response = await fetch('http://144.126.132.105:8080/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            // Primero verificamos el código de estado del servidor
            if (data[1] === 2) {  // Autenticación exitosa
                setUserType(data[0]);
                localStorage.setItem('userType', data[0].toString());
                localStorage.setItem('userEmail', email);
                return;
            }

            // Manejo específico de errores según la respuesta del servidor
            if (data[1] === 0 || data[0] === 0) {
                throw new Error('Error en correo y/o contraseña');
            }

            throw new Error('Error desconocido durante la autenticación');

        } catch (error) {
            console.error('Error de autenticación:', error);
            throw new Error(
                error.message || 'Error al conectarse con el servidor. Intente nuevamente.'
            );
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