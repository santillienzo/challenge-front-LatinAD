export interface User {
    name: string;
    email: string;
}

export interface AuthUser extends User{
    token: string
}

export interface AuthBody {
    email: string;
    password: string;
}