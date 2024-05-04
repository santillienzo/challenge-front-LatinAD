import ScreenItem from '../ListItemScreen/ListItemScreen'
import { List, Paper } from '@mui/material'
import style from './ListScreens.module.css'
import { Screen } from 'types/screen'
import EmptyDataAdvice from '@components/common/EmptyDataAdvice/EmptyDataAdvice'
import TableDataSkeleton from '@components/common/TableDataSkeleton/TableDataSkeleton'

type Props = {
    screens: Screen[],
    loading?: boolean,
}

//Render list of screens
const ListScreens = ({screens, loading = true}:Props) => {
    return (
        <Paper square className={style.listScreensWrapper}>
            {
                loading ? (
                    <TableDataSkeleton/>
                ):screens.length === 0 ? (<EmptyDataAdvice/>):(
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