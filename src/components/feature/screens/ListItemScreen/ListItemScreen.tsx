import { Screen } from 'types/screen'
import styles from './ListItemScreen.module.css'
import { Button, Divider, IconButton, ListItem, ListItemText, Tooltip } from '@mui/material'
import { formatScreenType } from '@lib/utils.string';
import { useNavigate } from 'react-router-dom';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

type Props = {
  screen:Screen,
  onDelete?: (id:string)=>void
}

const ScreenItem = ({screen,onDelete}:Props) => {
  //Destructuramos la info proveniente de la pantalla
  const {id, name, type} = screen
  const navigation = useNavigate()

  const redirect = ()=>{
    navigation(`/screen/${id}`)
  }

  const handleDelete = ()=>{
    if (onDelete) {
      if (id) {
        onDelete(id)
      }
    }
  }

  return (
    <>
      <ListItem className={styles.screenContainer}>
        <ListItemText primary={name} secondary={formatScreenType(type)}/>
        <div className={styles.actionButtons}>
          <Button onClick={redirect}>Ver más</Button>
          <Tooltip title="Borrar pantalla">
            <IconButton onClick={handleDelete}>
              <DeleteOutlineOutlinedIcon/>
            </IconButton>
          </Tooltip>
        </div>
      </ListItem>
      <Divider/>
    </>
  )
}

export default ScreenItem