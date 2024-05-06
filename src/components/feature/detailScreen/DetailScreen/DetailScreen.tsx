import { Button, Chip, Paper, Typography } from '@mui/material'
import { Screen } from 'types/screen'
import HeightIcon from '@mui/icons-material/Height';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import styles from "./DetailScreen.module.css";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { formatScreenType } from '@lib/utils.string';
import useScreen from '@hooks/useScreen';
import { useNavigate } from 'react-router-dom';
import { Dispatch, useState } from 'react';
import AddScreen from '@components/feature/screens/AddScreenModal/AddScreenModal';
import { toast } from 'sonner';
import DeleteModal from '../DeleteModal/DeleteModal';

type Props = {
    screen:Screen,
    setScreen: Dispatch<Screen>
}

const DetailScreen = ({screen, setScreen}:Props) => {
    //screen hook
    const {deleteScreen, updateScreen} = useScreen()
    //Instanciamos hook de react-router
    const navigation = useNavigate()
    //State que controla la visualización del modal 'editar'
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)

    //Funciones para controlar la apertura del modal de edición
    const handleCloseEditModal = ()=> setIsEditOpen(false)
    const handleOpenEditModal = ()=> setIsEditOpen(true)

    //Funciones para controlar la apertura del modal de eliminación
    const handleCloseDeleteModal = ()=> setIsDeleteOpen(false)
    const handleOpenDeleteModal = ()=> setIsDeleteOpen(true)

    //Obtenemos la pantalla actualizada y utilizamos nuestro hook
    const handleEdit = (updatedScreen: Screen)=>{
        //Guardamos nuestra promesa en una variable para simplificar la lectura
        const promise = updateScreen({ id: screen.id,...updatedScreen}, (response)=>{
            setScreen(response)
        })

        //Enviamos la promesa a través del objeto toast para recibir un feedback del estado de nuestra petición
        toast.promise(promise, {
            loading: 'Editando...',
            success: () => {
                return `Pantalla actualizada correctamente`;
            },
            error: (error) => error,
        })
        
    }

    const handleDelete = ()=>{
        const promise = deleteScreen(Number(screen.id))
        
        toast.promise(promise, {
            loading: 'Eliminando...',
            success: () => {
                return `Pantalla eliminada correctamente`;
            },
            error: (error) => error,
            finally:()=> {
                //Una vez eliminado redirigimos al inicio
                navigation(`/`)
            }
        })
    }

    return (
        <>
            <Paper className={styles.detailContainer}>
                <div className={styles.infoContainer}>
                    <div className={styles.imgContainer}>
                        <img src={screen.picture_url} alt={screen.name} />
                    </div>
                    <div>
                        <h3 className={styles.screenTitle}>
                            {screen.name}
                        </h3>
                        <p className={styles.description}>{screen.description}</p>
                        <div className={styles.detailItemContainer}>
                            <div className={styles.detailItem}>
                                <Typography variant='overline'>Tipo</Typography>
                                <Chip color='info' label={formatScreenType(screen.type)}/>
                            </div>
                            <div className={styles.detailItem}>
                                <Typography variant='overline'>Resolución</Typography>
                                <div>
                                    <Chip variant='outlined' icon={<TrendingFlatIcon/>} label={screen.resolution_width}/>
                                    &nbsp;
                                    x 
                                    &nbsp;
                                    <Chip variant='outlined' icon={<HeightIcon/>} label={screen.resolution_height}/>
                                </div>
                            </div>
                            <div className={styles.detailItem}>
                                <Typography variant='overline'>Precio por día</Typography>
                                <Chip icon={<AttachMoneyIcon fontSize='small'/>} label={screen.price_per_day}/>
                            </div>
                        </div>
                    </div>
                </div>
                <footer className={styles.actionButtonsContainer}>
                    <Button color='error' onClick={handleOpenDeleteModal}>Borrar</Button>
                    <Button variant='contained' onClick={handleOpenEditModal}>Editar</Button>
                </footer>
            </Paper>
            <AddScreen 
                open={isEditOpen} 
                handleClose={handleCloseEditModal} 
                action={handleEdit}
                initialValues={screen}
            />
            <DeleteModal open={isDeleteOpen} handleClose={handleCloseDeleteModal} name={screen.name} handleDelete={handleDelete}/>
        </>
    )
}

export default DetailScreen