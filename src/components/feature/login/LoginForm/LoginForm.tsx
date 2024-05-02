import style from './LoginForm.module.css'
import { Button, Paper, TextField, Typography } from '@mui/material'
import LoginIcon from '@mui/icons-material/Login';
import logo from '@assets/logo.svg'

//Login form container component
const LoginForm = () => {
  return (
    <Paper className={style.loginFormContainer}>
            <img src={logo} alt="Logo LatinAD" />
            <Typography 
                variant='h5' 
                component="h2"
                fontWeight={500}
                className={style.loginTitle}
            >
                <LoginIcon fontSize='small'/>
                Accede a tu cuenta
            </Typography>
            <form className={style.loginFormInputsContainer}>
                <TextField 
                    fullWidth
                    label="Email"
                    placeholder='tuemail@gmail.com'
                    type='email'
                />
                <TextField 
                    fullWidth
                    label="Contraseña"
                    placeholder='******'
                    type='password'
                />
                <div className={style.buttonFormContainer}>
                    <Button variant='contained'>Iniciar sesión</Button>
                </div>
            </form>
    </Paper>
  )
}

export default LoginForm