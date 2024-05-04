import useScreen from '@hooks/useScreen'
import { useEffect, useState } from 'react'
import { QueryParams, Screen, ScreenListResponse } from 'types/screen'
import styles from './ScreensControl.module.css'
import { Pagination, PaginationProps } from '@mui/material'
import ListScreens from '../ListScreens/ListScreens'

const pageSize = 10

const ScreensControl = () => {
    const {getScreens, loading} = useScreen()
    //Total de pantallas
    //State donde se almacenarán las pantallas
    const [screens, setScreens] = useState<Screen[]>([])
    //State que almacena la página actual del listado
    const [page, setPage] = useState<number>(1)
    //State donde se almacenarán los parámetros que usaremos para buscar en la bd
    const [queryParams, setQueryParams] = useState<QueryParams>({
        pageSize,
        offset: pageSize * (page-1)
    })

    //Actualizamos la página y guardamos los valores en los estados correspondientes
    const handlePage = (event: React.ChangeEvent<unknown>, value: number) =>{
        setPage(value)
        setQueryParams((prev) => ({
            ...prev,
            offset: pageSize * (value-1)
        }))
    } 

    //Ejecutamos este efecto cuando se carga el módulo
    useEffect(() => {
        //Obtenemos las pantallas enviando parámetros a la query
        getScreens(queryParams,(response:ScreenListResponse)=>{
            setScreens(response.data)
        })
    }, [getScreens, queryParams])

    //Configuramos los props de la paginación
    const paginationProps:PaginationProps = {
        color: 'primary',
        count: 10,
        variant: 'outlined',
        shape: "rounded",
        onChange: handlePage,
        page
    }

    return (
        <div className={styles.screensControlContainer}>
            <Pagination {...paginationProps}/>
            <ListScreens screens={screens} loading={loading}/>
            <Pagination {...paginationProps}/>
        </div>
    )
}

export default ScreensControl