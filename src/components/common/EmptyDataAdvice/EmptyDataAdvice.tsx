import { Typography } from '@mui/material'
import styles from './EmptyDataAdvice.module.css'
import { ReactNode } from 'react'

const DEFAULT_TEXT = "No se encontraron datos.\nIntentelo de nuevo más tarde."

type Props = {
    children?:ReactNode
}

const EmptyDataAdvice = ({children=DEFAULT_TEXT}:Props) => {
  return (
    <div className={styles.adviceWrapper}>
      <Typography variant='overline' fontSize={14} className={styles.text}>{children}</Typography>
    </div>
  )
}

export default EmptyDataAdvice