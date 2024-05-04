import useScreen from '@hooks/useScreen'
import { useEffect, useState } from 'react'
import { Screen, ScreenListResponse } from 'types/screen'
import styles from './ScreensControl.module.css'
import { Pagination, PaginationProps } from '@mui/material'
import ListScreens from '../ListScreens/ListScreens'

const ScreensControl = () => {
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

    //Configuramos los props de la paginación
    const paginationProps:PaginationProps = {
        color: 'primary',
        count: 10,
        variant: 'outlined',
        shape: "rounded"
    }

    return (
        <div className={styles.screensControlContainer}>
            <Pagination {...paginationProps}/>
            <ListScreens screens={screens}/>
            <Pagination {...paginationProps}/>
        </div>
    )
}

export default ScreensControl