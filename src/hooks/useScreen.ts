import { useCallback, useState } from "react"
import { QueryParams, Screen, ScreenListResponse } from "../types/screen"
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
            console.error(error)
            setError(error.message)
        } finally{
            setLoading(false)
        }
    }, [token])

    //Esta función creará una nueva pantalla en la base de datos e imapactará en la interfaz
    const addScreen = async (newScreen: Screen, callback: (screen:Screen)=> void)=>{
        setLoading(true)

        try {
            //Ejecutamos el servicio
            const res = await screenService.createScreen(newScreen, token)

            if (res) {
                callback(res)
            }
        } catch (error:any) {
            console.error(error)
            setError(error.message)
        } finally{
            setLoading(false)
        }
    }

    return {getScreens, loading, error, addScreen}
}

export default useScreen