import useScreen from '@hooks/useScreen'
import { useCallback, useEffect, useState } from 'react'
import { QueryParams, Screen, ScreenListResponse } from 'types/screen'
import styles from './ScreensControl.module.css'
import { Pagination, PaginationProps } from '@mui/material'
import ListScreens from '../ListScreens/ListScreens'
import ScreenFilter from '../ScreensFilter/ScreenFilter'

//valor por defecto del pageSize
const pageSize = 10

//Esta función calcula el offset de nuestra query
const calculateOffset = (pageSize:number, page:number)=>{
    return pageSize * (page-1)
}

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
        offset: calculateOffset(pageSize, page)
    })

    //Actualizamos la página y guardamos los valores en los estados correspondientes
    const handlePage = (event: React.ChangeEvent<unknown>, value: number) =>{
        setPage(value)
        setQueryParams((prev) => ({
            ...prev,
            offset: calculateOffset(pageSize, value)
        }))
    } 

    //Al enviar el filtro se ejecturá esta función.
    //useCallback para no crear la función en cada renderizado.  
    const handleFilterSubmit = useCallback((values: QueryParams) => {
        setPage(1)
        setQueryParams(values)
    }, [])

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
            {/* ADD FILTER */}
            <ScreenFilter 
                pageSize={pageSize}
                onSubmit={handleFilterSubmit}
            />
            <Pagination {...paginationProps}/>
            <ListScreens screens={screens} loading={loading}/>
            <Pagination {...paginationProps}/>
        </div>
    )
}

export default ScreensControl