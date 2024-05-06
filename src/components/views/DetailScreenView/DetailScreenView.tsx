import { Link, useParams } from 'react-router-dom'
import styles from './DetailScreenView.module.css'
import DetailScreen from '@components/feature/detailScreen/DetailScreen/DetailScreen'
import { useEffect, useState } from 'react'
import useScreen from '@hooks/useScreen'
import { Screen } from 'types/screen'
import DetailSkeleton from '@components/common/DetailSkeleton/DetailSkeleton'
import EmptyDataAdvice from '@components/common/EmptyDataAdvice/EmptyDataAdvice'

const DetailScreenView = () => {
  const {id} = useParams()

  const {getOneScreen, loading} = useScreen()
  //State donde se almacena la pantalla buscada en la bd
  const [screen, setScreen] = useState<Screen | null>(null)

  //Efecto que obtiene la info de la bd
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
          loading ?  <DetailSkeleton/>
          : screen ?
            <DetailScreen screen={screen}/>
          : <EmptyDataAdvice>No se encontró una pantalla. <Link to="/">Ir al inicio.</Link></EmptyDataAdvice>
        }
      </section>
    </main>
  )
}

export default DetailScreenView