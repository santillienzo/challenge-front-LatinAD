import { Paper, Typography } from '@mui/material'
import LoginIcon from '@mui/icons-material/Login';
import logo from '@assets/logo.svg'
import style from './Login.module.css'
import LoginForm from '../LoginForm/LoginForm';

//Login form container component
const Login = () => {
    
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
                <LoginForm/>
        </Paper>
    )
}

export default Login