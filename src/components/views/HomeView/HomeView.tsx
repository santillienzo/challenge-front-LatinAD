import ListScreens from '@components/feature/screens/ListScreens/ListScreens'
import style from './Home.module.css'

const HomeView = () => {
  return (
    <div className={style.homeContainer}>
        <ListScreens/>
    </div>
  )
}

export default HomeView