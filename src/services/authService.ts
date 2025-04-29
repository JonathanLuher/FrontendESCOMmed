// src/services/authService.ts
import axios from 'axios';

const API_URL = 'http://localhost:8081/api/auth/login';

export const loginUser = async (email: string, password: string): Promise<{ exists: number; type: number }> => {
    const response = await axios.post(API_URL, {
        email,
        password,
    });

    // El servidor responde un string, como "1 3"
    const [existsStr, typeStr] = response.data.trim().split(' ');

    return {
        exists: parseInt(existsStr, 10),
        type: parseInt(typeStr, 10),
    };
};
