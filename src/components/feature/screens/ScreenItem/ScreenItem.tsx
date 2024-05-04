import { Screen } from 'types/screen'
import styles from './ScreenItem.module.css'
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react'
import { formatScreenType } from '@lib/utils.string';



type Props = {
  screen:Screen
}

const ScreenItem = ({screen}:Props) => {
  //Destructuramos la info proveniente de la pantalla
  const {name, description, type, picture_url} = screen
  //State que usaremos para controlar la vizualización del detalle de la pantalla
  const [open, setOpen] = useState<boolean>(false)

  //Función encargada de alternar el estado de open
  const toggleOpen = ()=> setOpen(!open)

  return (
    <>
        <Accordion 
          expanded={open} 
          onChange={toggleOpen} 
          slotProps={{ 
            transition: { 
              unmountOnExit: true 
              } 
            }
          }
          disableGutters
          >
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" expandIcon={<ExpandMoreIcon />}>
            <div>
              <Typography>{name}</Typography>
              <Typography variant='caption'>{formatScreenType(type)}</Typography>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div className={styles.detailWrapper}>
              <div className={styles.infoSide}>
                <Typography>
                  {description}
                </Typography>
              </div>
              <div className={styles.pictureSide}>
                <img src={picture_url} alt={name} />
              </div>
            </div>
          </AccordionDetails>
      </Accordion>
    </>
  )
}

export default ScreenItem