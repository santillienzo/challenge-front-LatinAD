import { Outlet, useNavigate } from 'react-router-dom'
import styles from './Navbar.module.css'
import { AppBar, CssBaseline, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, useMediaQuery } from '@mui/material'
import { navLinks } from '@lib/utils.misc'
import LogoutIcon from '@mui/icons-material/Logout';
import logo from '@assets/logo.svg'
import { useAuth } from '@hooks/useAuth';
import MenuIcon from '@mui/icons-material/Menu';
import { Fragment, useState } from 'react';

const drawerWidth = 240

const Navbar = () => {
    const desktop = useMediaQuery('(min-width:768px)');
    //Utilizamos el hook de react-router
    const navigation = useNavigate()
    //Utilizamos nuestro hook para cerrar sessión
    const {logout} = useAuth()
    //Control de apertura menú
    const [menuIsOpen, setMenuIsOpen] = useState(false)

    
    const toggleMenu = ()=> setMenuIsOpen(!menuIsOpen)
    
    const redirect = (path:string)=>{
        navigation(path)
        toggleMenu()
    }

    return (
        <div className={styles.navWrapper}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{ 
                    width: desktop ? `calc(100% - ${drawerWidth}px)` : '100%', 
                    ml: `${drawerWidth}px`,
                    borderBottom: '1px solid #ddd'
                }}
                color='inherit'
                elevation={0}
            >
                <Toolbar className={styles.toolbar}>
                    {
                        !desktop &&
                            <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={toggleMenu}>
                                <MenuIcon />
                            </IconButton>
                    }
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
                    width: desktop ? drawerWidth : '70%',
                    flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: desktop ? drawerWidth : '70%',
                            boxSizing: 'border-box',
                    },
                }}
                variant={desktop ? "permanent" : "temporary"}
                anchor="left"
                open={menuIsOpen}
                onClose={toggleMenu}
            >
                <Toolbar className={styles.logoContainer}>
                    <img src={logo} alt="Logo LatinAD" />
                </Toolbar>
                <Divider />
                <List>
                    {navLinks.map((section, i) => (
                        <Fragment key={i}>
                            {
                                section.map((link)=>(
                                    <ListItem key={link.path} disabled={link.disabled} disablePadding onClick={()=> redirect(link.path)}>
                                        <ListItemButton>
                                            <ListItemIcon >
                                                <link.icon/>
                                            </ListItemIcon>
                                            <ListItemText primary={link.name} />
                                        </ListItemButton>
                                    </ListItem>
                                ))
                            }
                            <Divider/>
                        </Fragment>
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