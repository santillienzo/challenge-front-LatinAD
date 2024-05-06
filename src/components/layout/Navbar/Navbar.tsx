import { Outlet, useNavigate } from 'react-router-dom'
import styles from './Navbar.module.css'
import { AppBar, CssBaseline, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material'
import { navLinks } from '@lib/utils.misc'
import LogoutIcon from '@mui/icons-material/Logout';
import logo from '@assets/logo.svg'
import { useAuth } from '@hooks/useAuth';

const drawerWidth = 240

const Navbar = () => {
    //Utilizamos el hook de react-router
    const navigation = useNavigate()
    //Utilizamos nuestro hook para cerrar sessión
    const {logout} = useAuth()

    const redirect = (path:string)=>{
        navigation(path)
    }

    return (
        <div className={styles.navWrapper}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{ 
                    width: `calc(100% - ${drawerWidth}px)`, 
                    ml: `${drawerWidth}px`,
                    borderBottom: '1px solid #ddd'
                }}
                color='inherit'
                elevation={0}
            >
                <Toolbar className={styles.toolbar}>
                    <h2 className={styles.title}>
                        Administración
                    </h2>
                    <div>
                        <IconButton onClick={()=> logout()}>
                            <LogoutIcon/>
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                    },
                }}
                variant="permanent"
                anchor="left"

            >
                <Toolbar className={styles.logoContainer}>
                    <img src={logo} alt="Logo LatinAD" />
                </Toolbar>
                <Divider />
                <List>
                    {navLinks.map((link) => (
                        <ListItem key={link.path} disablePadding onClick={()=> redirect(link.path)}>
                            <ListItemButton>
                                <ListItemIcon >
                                    <link.icon/>
                                </ListItemIcon>
                                <ListItemText primary={link.name} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <div className={styles.content}>
                <Toolbar/>
                <Outlet/>
            </div>
        </div>
    )
}

export default Navbar