import { Button, TextField } from '@mui/material'
import style from './LoginForm.module.css'
import useLoginForm from '@hooks/useLoginForm';

const LoginForm = () => {
  const {values, errors, onChange, onSubmit} = useLoginForm()
  

  return (
    <form className={style.loginFormInputsContainer} onSubmit={onSubmit}>
        <TextField 
            fullWidth
            label="Email"
            placeholder='tuemail@gmail.com'
            type='email'
            name='email'
            value={values.email}
            onChange={onChange}
            error={Boolean(errors.email)}
            helperText={errors.email}
        />
        <TextField 
            fullWidth
            label="Contraseña"
            placeholder='******'
            type='password'
            name='password'
            value={values.password}
            onChange={onChange}
        />
        <div className={style.buttonFormContainer}>
            <Button variant='contained' type='submit'>Iniciar sesión</Button>
        </div>
    </form>
  )
}

export default LoginForm