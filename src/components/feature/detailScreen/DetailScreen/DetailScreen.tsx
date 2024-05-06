import { Button, Paper } from '@mui/material'
import { Screen } from 'types/screen'
import styles from "./DetailScreen.module.css";

type Props = {
    screen:Screen
}

const DetailScreen = ({screen}:Props) => {


    return (
        <Paper className={styles.detailContainer}>
            <h3 className={styles.screenTitle}>
                {screen.name}
            </h3>
            <div>
                <div>
                    <img src={screen.picture_url} alt={screen.name} />
                </div>
                <div>
                    <p>{screen.description}</p>
                    <p>Tipo: {screen.type}</p>
                    <p>Precio: {screen.price_per_day}</p>
                    <p>Resolución: {screen.resolution_width} x {screen.resolution_height}</p>
                </div>
            </div>
            <div>
                <Button color='error'>Borrar</Button>
                <Button variant='contained'>Editar</Button>
            </div>
        </Paper>
    )
}

export default DetailScreen