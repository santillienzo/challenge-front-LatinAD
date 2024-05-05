import { Box, Button, Modal, TextField, TextareaAutosize } from "@mui/material"
import { getModalStyle } from "@lib/utils.some"
import AddIcon from '@mui/icons-material/Add';
import styles from './AddScreen.module.css'


type Props = {
    open:boolean,
    handleClose: () => void
}

const AddScreen = ({open, handleClose}:Props) => {
  return (
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="add-screen-modal"
        aria-describedby="Modal para agregar pantalla"
    >
        <Box className={styles.modal} sx={{ ...getModalStyle()}}>
            <h2>Agregar pantalla</h2>
            <form>
                <div>
                    <TextField
                        fullWidth
                        variant='outlined'
                        size='small'
                        label="Nombre"
                        name='name'
                        placeholder='Pantalla avenida Este'
                        // onChange={(event)=> {handleFilterValues(event.target.name, event.target.value)}}
                    />
                    <TextareaAutosize
                        minRows={3}
                        // value={formik.values.observacion}
                        name="description"
                        // onChange={}
                        placeholder="Esta es una pantalla situada en la Avenida Este"
                    />
                </div>
                <footer className={styles.btnsContainer}>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button
                        variant='contained' 
                        startIcon={<AddIcon/>} 
                        // onClick={handleOpenAddModal}
                    >
                        Agregar
                    </Button>
                </footer>
            </form>
        </Box>
    </Modal>
  )
}

export default AddScreen