import dotenv from 'dotenv';
import type { AuthResponse, ErrorMessage, LoginRequest, RegisterRequest } from './api.types';

// Load environment variables from the .env file
dotenv.config();

// Get the base URL from the environment
const BASE_URL = process.env.BASE_URL;

if (!BASE_URL) {
    throw new Error("BASE_URL is not defined in the environment variables.");
}

async function login(data: LoginRequest): Promise<AuthResponse | ErrorMessage> {
    const url = `${BASE_URL}/auth/login`; // Corrected the use of quotes
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) { // Handling HTTP errors
            const errorResponse: ErrorMessage = await response.json();
            return { message: errorResponse.message || 'Error during login', status: response.status };
        }

        const parsedResponse: AuthResponse = await response.json();
        return parsedResponse;
    } catch (e: any) {
        console.error({ e });
        return { message: `Failed to login: ${e.message}`, status: 500 }; // Generic error
    }
}

async function register(data: RegisterRequest): Promise<AuthResponse | ErrorMessage> {
    const url = `${BASE_URL}/user`; // Corrected the use of quotes
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) { // Handling HTTP errors
            const errorResponse: ErrorMessage = await response.json();
            return { message: errorResponse.message || 'Error during registration', status: response.status };
        }

        const parsedResponse: AuthResponse = await response.json();
        return parsedResponse;
    } catch (e: any) {
        console.error({ e });
        return { message: `Failed to register: ${e.message}`, status: 500 }; // Generic error
    }
}

async function verifyToken(token: string): Promise<Partial<AuthResponse> | ErrorMessage> {
    const url = `${BASE_URL}/user/${token}`;
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
        });

        if (!response.ok) { // Handling HTTP errorsCorrected the use of quotes
            const errorResponse: ErrorMessage = await response.json();
            return { message: errorResponse.message || 'Error during registration', status: response.status };
        }

        const parsedResponse: AuthResponse = await response.json();
        return parsedResponse;
    } catch (e: any) {
        console.error({ e });
        return { message: `Failed to register: ${e.message}`, status: 500 }; // Generic error
    }
}


export const api = {
    register,
    login,
    verifyToken,
};

