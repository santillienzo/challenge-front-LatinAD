import { Typography } from '@mui/material'
import styles from './EmptyDataAdvice.module.css'

const DEFAULT_TEXT = "No se encontraron datos. Intentelo de nuevo más tarde."

type Props = {
    text?:string
}

const EmptyDataAdvice = ({text=DEFAULT_TEXT}:Props) => {
  return (
    <div className={styles.adviceWrapper}>
      <Typography variant='overline' fontSize={14}>{text}</Typography>
    </div>
  )
}

export default EmptyDataAdvice