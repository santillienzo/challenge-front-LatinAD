import useScreen from '@hooks/useScreen'
import { useEffect, useState } from 'react'
import { Screen, ScreenListResponse } from 'types/screen'
import ScreenItem from '../ScreenItem/ScreenItem'
import { List, Paper } from '@mui/material'
import style from './ListScreens.module.css'

//Render list of screens
const ListScreens = () => {
    const {getScreens} = useScreen()
    //State donde se almacenarán las pantallas
    const [screens, setScreens] = useState<Screen[]>([])

    //Ejecutamos este efecto cuando se carga el módulo
    useEffect(() => {

        //Obtenemos las pantallas enviando parámetros a la query
        getScreens({pageSize: 10, offset: 0},(response:ScreenListResponse)=>{
            setScreens(response.data)
        })
    }, [getScreens])
    return (
        <Paper square className={style.listScreensContainer}>
            <List className={style.listScreens} component="ul">
                {
                    screens.map((screen) => {
                        return <ScreenItem key={screen.id} screen={screen}/>
                    })
                }
            </List>
        </Paper>
    )
}

export default ListScreens