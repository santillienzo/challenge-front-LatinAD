import { Box, Button, FormControl, InputAdornment, InputLabel, MenuItem, Modal, Select, TextField, TextareaAutosize } from "@mui/material"
import { getModalStyle } from "@lib/utils.some"
import AddIcon from '@mui/icons-material/Add';
import styles from './AddScreen.module.css'
import HeightIcon from '@mui/icons-material/Height';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';


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
                <div className={styles.formContainer}>
                    <TextField
                        fullWidth
                        variant='outlined'
                        label="Nombre"
                        name='name'
                        placeholder='Pantalla avenida Este...'
                        // value={}
                        // onChange={(event)=> {handleFilterValues(event.target.name, event.target.value)}}
                    />
                    <TextareaAutosize
                        minRows={3}
                        name="description"
                        className={styles.inputTextArea}
                        // value={formik.values.observacion}
                        // onChange={}
                        placeholder="Esta es una pantalla situada en la Avenida Este ... "
                    />
                    <div className={styles.sizeInputsContainer}>
                        <TextField
                            size="small"
                            placeholder="1920"
                            label="Ancho"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <TrendingFlatIcon fontSize="small"/>
                                    </InputAdornment>
                                ),
                            }}
                            // value={}
                            // onChange={}
                        />
                        <TextField
                            size="small"
                            placeholder="1080"
                            label="Alto"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <HeightIcon fontSize="small"/>
                                    </InputAdornment>
                                ),
                            }}
                            // value={}
                            // onChange={}
                        />
                    </div>
                    <TextField
                        fullWidth   
                        placeholder="1500"
                        label="Precio por día"
                        // value={}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AttachMoneyIcon fontSize="small"/>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <FormControl fullWidth>
                        <InputLabel id="type-screen-label">Tipo</InputLabel>
                        <Select
                            labelId="type-screen-label"
                            id="demo-simple-select"
                            value={'indoor'}
                            label="Tipo"
                            // onChange={handleChange}
                        >
                            <MenuItem value={'indoor'}>Indoor</MenuItem>
                            <MenuItem value={'outdoor'}>Outdoor</MenuItem>
                        </Select>
                    </FormControl>

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