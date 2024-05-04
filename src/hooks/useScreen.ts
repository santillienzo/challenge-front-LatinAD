import { useCallback, useState } from "react"
import { QueryParams, ScreenListResponse } from "../types/screen"
import { screenService } from "@services/screen"
import { useAuth } from "./useAuth"

const useScreen = () => {
    //Obtenemos el token de nuestra sesión
    const {token} = useAuth()
    //State donde se almacenará el error en caso de haber uno
    const [error, setError] = useState<string | null>(null)
    //Controlamos el loading del componente
    const [loading, setLoading] = useState<boolean>(false)

    //Obtenemos las pantallas enviando parámetros a la query
    const getScreens = useCallback(async (params:QueryParams, callback: (data:ScreenListResponse)=> void) => {

        setLoading(true)
        try {
            const res = await screenService.fetchScreens({params, token})
            if (res) {
                callback(res)
            }
            
        } catch (error:any) {
            console.log(error)
            setError(error.message)
        } finally{
            setLoading(false)
        }
    }, [token])

    return {getScreens, loading, error}
}

export default useScreen