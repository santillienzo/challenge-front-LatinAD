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
        //Manejo de erroes
        throw new Error(res.statusText);
    }

    const data:User = await res.json()

    return data
}

export const authService = {
    login
}