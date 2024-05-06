import useScreen from '@hooks/useScreen'
import { useCallback, useEffect, useState } from 'react'
import { QueryParams, Screen, ScreenListResponse } from 'types/screen'
import styles from './ScreensControl.module.css'
import { Button, Pagination, PaginationProps } from '@mui/material'
import ListScreens from '../ListScreens/ListScreens'
import ScreenFilter from '../ScreensFilter/ScreenFilter'
import { calculateOffset } from '@lib/utils.number'
import { defaultPageSize as pageSize } from '@lib/config'
import AddIcon from '@mui/icons-material/Add';
import AddScreen from '../AddScreenModal/AddScreenModal'

const INITIAL_PAGE = 1

const ScreensControl = () => {
    const {getScreens, loading, addScreen} = useScreen()
    //State que controla la visualización del modal 'agregar'
    const [isAddOpen, setIsAddOpen] = useState(false)
    //State donde se almacena las pantallas
    const [screens, setScreens] = useState<Screen[]>([])
    //State que almacena la página actual del listado
    const [page, setPage] = useState<number>(INITIAL_PAGE)
    //State donde se almacena los parámetros que usaremos para buscar en la bd
    const [queryParams, setQueryParams] = useState<QueryParams>({
        pageSize,
        offset: calculateOffset(pageSize, page)
    })

    const handleCloseAddModal = ()=> setIsAddOpen(false)
    const handleOpenAddModal = ()=> setIsAddOpen(true)

    //Actualizamos la página y guardamos los valores en los estados correspondientes
    const handlePage = (event: React.ChangeEvent<unknown>, value: number) =>{
        if (event) {
            setPage(value)
            setQueryParams((prev) => ({
                ...prev,
                offset: calculateOffset(pageSize, value)
            }))
        }
    } 

    //Al enviar el filtro se ejecturá esta función.
    //useCallback para no crear la función en cada renderizado.  
    const handleFilterSubmit = useCallback((values: QueryParams) => {
        setPage(INITIAL_PAGE)
        setQueryParams(values)
    }, [])

    //Cargamos una nueva pantalla en array
    const handleAddScreen = (newScreen: Screen)=>{
        addScreen(newScreen, (response:Screen)=>{
            setScreens((prev) => [response, ...prev])
        })
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
        <>
            <div className={styles.screensControlContainer}>
                <div className={styles.screensControlHeader}>
                    <h1>Pantallas</h1>
                    <Button 
                        variant='contained' 
                        startIcon={<AddIcon/>} 
                        onClick={handleOpenAddModal}
                    >
                        Agregar<span className={styles.titleSpan}>&nbsp;pantalla</span>
                    </Button>
                </div>
                <ScreenFilter 
                    pageSize={pageSize}
                    onSubmit={handleFilterSubmit}
                />
                <Pagination {...paginationProps}/>
                <ListScreens screens={screens} loading={loading}/>
                <Pagination {...paginationProps}/>
            </div>
            <AddScreen open={isAddOpen} handleClose={handleCloseAddModal} action={handleAddScreen}/>
        </>
    )
}

export default ScreensControl