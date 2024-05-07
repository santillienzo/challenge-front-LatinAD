import { Avatar, Chip, Divider, List, ListItem, ListItemIcon, ListItemText, Paper } from '@mui/material'
import styles from './ProfileView.module.css'
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import BuildCircleOutlinedIcon from '@mui/icons-material/BuildCircleOutlined';

const ProfileView = () => {
  return (
    <div className={styles.profileContainer}>
        <section className={styles.profileContentBox}>
            <h1>Perfil</h1>
            <Paper className={styles.profileDataContainer}>
                <div className={styles.avatarContainer}>
                    <Avatar alt="Enzo" src="/static/images/avatar/1.jpg" className={styles.avatar}/>
                    <Chip icon={<BuildCircleOutlinedIcon/>} label={'Administrador'} color='secondary'/>
                </div>
                <div className={styles.infoContainer}>
                    <List>
                        <ListItem>
                            <ListItemIcon><AssignmentIndOutlinedIcon/></ListItemIcon>
                            <ListItemText primary="Nombre" secondary="Enzo Santilli"/>
                        </ListItem>
                        <Divider/>
                        <ListItem>
                            <ListItemIcon><EmailOutlinedIcon/></ListItemIcon>
                            <ListItemText primary="Email" secondary="enzo.santilli16@gmail.com"/>
                        </ListItem>
                        <Divider/>
                        <ListItem>
                            <ListItemIcon><LocalPhoneOutlinedIcon/></ListItemIcon>
                            <ListItemText primary="Teléfono" secondary="2634786580"/>
                        </ListItem>
                    </List>
                </div>
            </Paper>
        </section>
    </div>
  )
}

export default ProfileView