export interface User {
    name: string;
    email: string;
    token: string
}

export interface AuthBody {
    email: string;
    password: string;
}