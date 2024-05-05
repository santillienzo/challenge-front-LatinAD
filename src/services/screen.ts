import {QueryParams, Screen, ScreenListResponse} from '../types/screen'
import {uri} from "@lib/config";


interface Options {
    params: QueryParams,
    token?: string
}

//Obtendremos todas las pantallas de la bd
const fetchScreens = async ({params, token}:Options): Promise<ScreenListResponse>=>{
    //Nuevo objeto URL que nos permite manejar la url como un objeto
    const url = new URL(`${uri}/display`)
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

const createScreen = async (screen:Screen, token:string):Promise<Screen>=>{
    //Realiazamos una llamada a nuestra api
    const res = await fetch(`${uri}/display`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            //Envío de user token
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(screen),
    })

    //validamos que no hayan errores
    if (!res.ok) {
        if (res.status === 401) {
            throw new Error('El usuario o la contraseña son incorrectas. Intentalo de nuevo.');
        }else if(res.status === 500) {
            throw new Error('Error de servidor. Intentalo de nuevo más tarde.');
        } else{
            throw new Error('Hubo un error. Intentalo de nuevo más tarde.');
        }
    }

    const data:Screen = await res.json()

    return data
}

//Export service
export const screenService = {
    fetchScreens,
    createScreen
}