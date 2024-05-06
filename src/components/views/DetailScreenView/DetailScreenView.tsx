import { useParams } from 'react-router-dom'
import styles from './DetailScreenView.module.css'
import DetailScreen from '@components/feature/detailScreen/DetailScreen/DetailScreen'
import { useEffect, useState } from 'react'
import useScreen from '@hooks/useScreen'
import { Screen } from 'types/screen'

const DetailScreenView = () => {
  const {id} = useParams()

  const {getOneScreen} = useScreen()
  //State donde se almacena la pantalla buscada en la bd
  const [screen, setScreen] = useState<Screen | null>(null)

  useEffect(()=>{
  if (id) {
    getOneScreen(Number(id), (response)=>{
      setScreen(response)
    })
  }
  }, [id, getOneScreen])

  return (
    <main className={styles.detailScreenContainer}>
      <section className={styles.detailContentBox}>
        <h1>Detalle</h1>
        {
          screen &&
            <DetailScreen screen={screen}/>
        }
      </section>
    </main>
  )
}

export default DetailScreenView