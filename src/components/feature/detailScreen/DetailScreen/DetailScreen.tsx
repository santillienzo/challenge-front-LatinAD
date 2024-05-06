import { Button, Chip, Paper, Typography } from '@mui/material'
import { Screen } from 'types/screen'
import HeightIcon from '@mui/icons-material/Height';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import styles from "./DetailScreen.module.css";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { formatScreenType } from '@lib/utils.string';

type Props = {
    screen:Screen
}

const DetailScreen = ({screen}:Props) => {


    return (
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
                <Button color='error'>Borrar</Button>
                <Button variant='contained'>Editar</Button>
            </footer>
        </Paper>
    )
}

export default DetailScreen