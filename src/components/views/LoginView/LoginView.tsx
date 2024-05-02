import LoginForm from '@components/feature/login/LoginForm/LoginForm'
import style from './LoginView.module.css'

const LoginView = () => {
  return (
    <div className={style.loginContainer}>
      <LoginForm/>
    </div>
  )
}

export default LoginView