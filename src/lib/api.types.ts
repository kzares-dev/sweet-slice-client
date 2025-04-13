export interface AuthResponse {
    _id: string,
    name: string,
    email: string,
    createdAt: string,
    updatedAt: string,
    token: string
}
export interface LoginRequest {
    email: string,
    password: string
}

export interface RegisterRequest {
    email: string,
    password: string,
    name: string
}

export interface ErrorMessage {
    message: string,
    status: number
}