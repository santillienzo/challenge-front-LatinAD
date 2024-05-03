import { AuthBody, AuthUser } from "types/user"

const login = async (body:AuthBody): Promise<AuthUser>=>{
    const res = await fetch("https://challenge-front-7fw1.onrender.com/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        //Manejo de erroes
        console.log(res)
        throw new Error(res.statusText);
    }

    const data:AuthUser = await res.json()

    return data
}

export const authService = {
    login
}