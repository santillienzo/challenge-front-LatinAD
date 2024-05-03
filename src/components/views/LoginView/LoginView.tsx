import Login from '@components/feature/auth/Login/Login'
import style from './LoginView.module.css'

const LoginView = () => {
  return (
    <div className={style.loginContainer}>
      <Login/>
    </div>
  )
}

export default LoginView