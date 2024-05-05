import { Alert, Box, Button, Collapse, FormControl, FormHelperText, InputAdornment, InputLabel, MenuItem, Modal, Select, TextField, TextareaAutosize } from "@mui/material"
import { getModalStyle } from "@lib/utils.some"
import AddIcon from '@mui/icons-material/Add';
import styles from './AddScreen.module.css'
import HeightIcon from '@mui/icons-material/Height';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useAddScreenForm } from "@hooks/useAddScreenForm";
import { Screen } from "types/screen";
import { FormEvent } from "react";


type Props = {
    open:boolean,
    handleClose: () => void,
    actions: {
        add: (screen: Screen)=>void
    }
}

const AddScreen = ({open, handleClose, actions}:Props) => {
    //Extraemos los datos del hook personalzdo
    const {values, onSubmit, inputErrors, onChange, error, resetValues} = useAddScreenForm()

    const handleSubmit = (event: FormEvent<HTMLFormElement>)=>{
        event.preventDefault()
        if (actions && actions.add) {
            onSubmit((values)=>{
                const {type, resolutionWidth, resolutionHeight, pricePerDay, description, name} = values
                actions.add({
                    name,
                    description,
                    price_per_day: pricePerDay,
                    resolution_height: resolutionHeight,
                    resolution_width: resolutionWidth,
                    type
                })
                handleClose()
                resetValues()
            })
        }
    }

    return (
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="add-screen-modal"
        aria-describedby="Modal para agregar pantalla"
        keepMounted
    >
        <Box className={styles.modal} sx={{ ...getModalStyle()}}>
            <h2>Agregar pantalla</h2>
            <Collapse in={Boolean(error)} unmountOnExit>
                <Alert severity="error">{error}</Alert>
            </Collapse>
            <form onSubmit={handleSubmit}>
                <div className={styles.formContainer}>
                    <TextField
                        fullWidth
                        variant='outlined'
                        label="Nombre"
                        name='name'
                        placeholder='Pantalla avenida Este...'
                        value={values.name}
                        onChange={onChange}
                        error={Boolean(inputErrors.name)}
                        helperText={inputErrors.name}
                    />
                    <FormControl fullWidth error={Boolean(inputErrors.description)}>
                        <TextareaAutosize
                            minRows={3}
                            name="description"
                            className={styles.inputTextArea}
                            value={values.description}
                            onChange={onChange}
                            style={{
                                outline: inputErrors.description ? '1px solid red' : undefined
                            }}
                            placeholder="Esta es una pantalla situada en la Avenida Este ... "
                        />
                        <FormHelperText>{inputErrors.description}</FormHelperText>
                    </FormControl>
                    <div className={styles.sizeInputsContainer}>
                        <TextField
                            size="small"
                            placeholder="1920"
                            label="Ancho"
                            type="number"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <TrendingFlatIcon fontSize="small"/>
                                    </InputAdornment>
                                ),
                            }}
                            name="resolutionWidth"
                            value={values.resolutionWidth}
                            onChange={onChange}
                            error={Boolean(inputErrors.resolutionWidth)}
                            helperText={inputErrors.resolutionWidth}
                        />
                        <TextField
                            size="small"
                            placeholder="1080"
                            label="Alto"
                            type="number"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <HeightIcon fontSize="small"/>
                                    </InputAdornment>
                                ),
                            }}
                            name="resolutionHeight"
                            value={values.resolutionHeight}
                            onChange={onChange}
                            error={Boolean(inputErrors.resolutionHeight)}
                            helperText={inputErrors.resolutionHeight}
                        />
                    </div>
                    <TextField
                        fullWidth   
                        placeholder="1500"
                        label="Precio por día"
                        type="number"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AttachMoneyIcon fontSize="small"/>
                                </InputAdornment>
                            ),
                        }}
                        name="pricePerDay"
                        value={values.pricePerDay}
                        onChange={onChange}
                        error={Boolean(inputErrors.pricePerDay)}
                        helperText={inputErrors.pricePerDay}
                    />
                    <FormControl fullWidth>
                        <InputLabel id="type-screen-label">Tipo</InputLabel>
                        <Select
                            labelId="type-screen-label"
                            id="demo-simple-select"
                            label="Tipo"
                            name="type"
                            value={values.type}
                            onChange={onChange}
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
                        type='submit'
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