import { AuthBody, User } from "types/user"

const login = async (body:AuthBody): Promise<User>=>{
    const res = await fetch("https://challenge-front-7fw1.onrender.com/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        if (res.status === 401) {
            throw new Error('El usuario o la contraseña son incorrectas. Intentalo de nuevo.');
        }else if(res.status === 500) {
            throw new Error('Error de servidor. Intentalo de nuevo más tarde.');
        } else{
            throw new Error('Hubo un error. Intentalo de nuevo más tarde.');
        }
    }
    const data:User = await res.json()

    return data
}

export const authService = {
    login
}