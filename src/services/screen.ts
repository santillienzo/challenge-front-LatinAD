type ScreenType = 'outdoor' | 'indoor'

interface Params {
    pageSize: number,
    offset: number,
    name: string,
    type: ScreenType
}

interface Options {
    params: Params,
    token?: string
}

const listAll = async ({params, token}:Options)=>{
    //Nuevo objeto URL que nos permite manejar la url como un objeto
    const url = new URL("https://challenge-front-7fw1.onrender.com/display")
    //Agregamois los params provenientes de los argumentos de la función a url
    Object.keys(params).forEach(([key, value]) => url.searchParams.append(key, value));

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
}

export const screenService = {
    listAll
}