import ScreenItem from '../ListItemScreen/ListItemScreen'
import { List, Paper } from '@mui/material'
import style from './ListScreens.module.css'
import { Screen } from 'types/screen'
import EmptyDataAdvice from '@components/common/EmptyDataAdvice/EmptyDataAdvice'

type Props = {
    screens: Screen[]
}

//Render list of screens
const ListScreens = ({screens}:Props) => {
    return (
        <Paper square className={style.listScreensWrapper}>
            {
                screens.length === 0 ? (<EmptyDataAdvice/>):(
                    <List className={style.listScreens} component="ul">
                        {
                            screens.map((screen) => {
                                return <ScreenItem key={screen.id} screen={screen}/>
                            })
                        }
                    </List>
                )
            }
        </Paper>
    )
}

export default ListScreens