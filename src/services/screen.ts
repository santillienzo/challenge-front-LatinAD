import {QueryParams, ScreenListResponse} from '../types/screen'

interface Options {
    params: QueryParams,
    token?: string
}

const fetchScreens = async ({params, token}:Options): Promise<ScreenListResponse>=>{
    //Nuevo objeto URL que nos permite manejar la url como un objeto
    const url = new URL("https://challenge-front-7fw1.onrender.com/display")
    //Agregamois los params provenientes de los argumentos de la función a url
    Object.entries(params).forEach(([key, value]) => {
        return url.searchParams.append(key, value)
    });

    const res = await fetch(url,{
        headers: {
            'Content-Type': 'application/json',
            //Envío de user token
            'Authorization': `Bearer ${token}`
        },
    })
    
    if (!res.ok) {
        if (res.status === 401) {
            throw new Error('El usuario o la contraseña son incorrectas. Intentalo de nuevo.');
        }else if(res.status === 500) {
            throw new Error('Error de servidor. Intentalo de nuevo más tarde.');
        } else{
            throw new Error('Hubo un error. Intentalo de nuevo más tarde.');
        }
    }

    const data:ScreenListResponse = await res.json()

    return data
}

//Export service
export const screenService = {
    fetchScreens
}