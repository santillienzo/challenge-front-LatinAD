import { Screen } from 'types/screen'
import styles from './ScreenItem.module.css'
import { Button, Divider, ListItem, ListItemText } from '@mui/material'
import { formatScreenType } from '@lib/utils.string';
import { useNavigate } from 'react-router-dom';

type Props = {
  screen:Screen
}

const ScreenItem = ({screen}:Props) => {
  //Destructuramos la info proveniente de la pantalla
  const {id, name, type} = screen
  const navigation = useNavigate()


  const redirect = ()=>{
    navigation(`/screen/${id}`)
  }

  return (
    <>
      <ListItem className={styles.screenContainer}>
        <ListItemText primary={name} secondary={formatScreenType(type)}/>
        <Button onClick={redirect}>Ver más</Button>
      </ListItem>
      <Divider/>
    </>
  )
}

export default ScreenItem