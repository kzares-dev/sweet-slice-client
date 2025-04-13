// src/lib/api.ts

const BASE_URL = 'https://your-external-server.com/api';

const defaultHeaders = {
    'Content-Type': 'application/json',
};

interface RequestOptions extends RequestInit {
    headers?: HeadersInit;
}

async function request(url: string, options: RequestOptions = {}): Promise<any> {
    const headers: HeadersInit = {
        ...defaultHeaders,
        ...(options.headers || {}),
    };

    const response = await fetch(`${BASE_URL}${url}`, {
        ...options,
        headers,
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error in the request');
    }

    return await response.json();
}

// Methods to simplify requests
export const api = {
    get: (url: string, options?: RequestOptions) => request(url, { method: 'GET', ...options }),
    post: (url: string, body: any, options?: RequestOptions) => request(url, { method: 'POST', body: JSON.stringify(body), ...options }),
    put: (url: string, body: any, options?: RequestOptions) => request(url, { method: 'PUT', body: JSON.stringify(body), ...options }),
    delete: (url: string, options?: RequestOptions) => request(url, { method: 'DELETE', ...options }),

    login: async (email: string, password: string): Promise<any> => {
        return await api.post('/login', { email, password });
    },

    signup: async (name: string, email: string, password: string): Promise<any> => {
        return await api.post('/signup', { name, email, password });
    },
};
