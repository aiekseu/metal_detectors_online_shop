import React from 'react'
import {
    AppBar,
    Badge,
    Box,
    Button,
    Container,
    Hidden,
    IconButton,
    makeStyles,
    Toolbar,
    Typography,
} from '@material-ui/core'
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined'
import MenuOpenOutlinedIcon from '@material-ui/icons/MenuOpenOutlined'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import SideDrawer from '../SideDrawer/SideDrawer'
import { logout } from '../../../store/actions/authActions'


const Navbar = () => {
    const history = useHistory()
    const classes = useStyles()
    const cart = useSelector((state) => state.cartReducer)
    const isLoggedIn = useSelector((state) => state.authReducer.isLoggedIn)
    const [toggleDrawer, setToggleDrawer] = React.useState(false)
    const dispatch = useDispatch()
    const toggleDrawerHandler = () => {
        setToggleDrawer(!toggleDrawer)
    }

    return (
        <AppBar position="static" className={classes.root}>
            <Container>
                <Toolbar className={classes.toolbar}>
                    <Box display="flex" alignItems="center">
                        <MenuOpenOutlinedIcon className={classes.logoIcon}/>
                        <Box fontWeight="fontWeightBold">
                            <Typography variant="h4">
                                <Link to="/" className={classes.logo}>
                                    Мир металлоискателей
                                </Link>
                            </Typography>
                        </Box>
                    </Box>
                    <Box flexGrow={1}/>
                    <Hidden smDown>
                        <Box>
                            <Button className={classes.button}>
                                <Link to="/">Главная</Link>
                            </Button>
                            <Button className={classes.button}>
                                <Link to="/shop">Каталог</Link>
                            </Button>
                            <Button className={classes.button}>
                                <Link to="/about">О нас</Link>
                            </Button>
                            {isLoggedIn && (
                                <Button className={classes.button}>
                                    <Link to="/profile">Профиль</Link>
                                </Button>
                            )}
                        </Box>
                        <Box flexGrow={1}/>

                        <Link to="cart">
                            <IconButton className={classes.IconButton}>
                                <Badge badgeContent={cart.length} color="primary">
                                    <ShoppingCartOutlinedIcon/>
                                </Badge>
                            </IconButton>
                        </Link>
                        {!isLoggedIn && (
                            <Button className={classes.button}>
                                <Link to="/auth">Войти</Link>
                            </Button>
                        )}
                        {isLoggedIn && (
                            <Button
                                className={classes.button}
                                onClick={() => {
                                    dispatch(logout())
                                    history.replace('/auth')
                                }}
                            >
                                Выйти
                            </Button>
                        )}
                    </Hidden>

                    {/* SideDrawer on small screen */}
                    <Hidden only={['lg', 'xl', 'md']}>
                        <SideDrawer
                            toggleDrawerHandler={toggleDrawerHandler}
                            toggleDrawer={toggleDrawer}
                        >
                            <Box display="flex" alignItems="center" justifyContent="center">
                                <MenuOpenOutlinedIcon
                                    className={`${classes.logoIcon} ${classes.sideDrawerLogo}`}
                                />
                                <Box fontWeight="fontWeightBold" pr={5}>
                                    <Typography variant="h5">
                                        <Link to="/" className={`${classes.logo}`}>
                                            Мир металлоискателей
                                        </Link>
                                    </Typography>
                                </Box>
                            </Box>

                            {/* Menu Button */}
                            <Box mt={1}/>
                            <Button
                                className={classes.button}
                                onClick={() => setToggleDrawer(false)}
                            >
                                <Link to="/">Главная</Link>
                            </Button>
                            <Button
                                className={classes.button}
                                onClick={() => setToggleDrawer(false)}
                            >
                                <Link to="/shop">Каталог</Link>
                            </Button>
                            <Button
                                className={classes.button}
                                onClick={() => setToggleDrawer(false)}
                            >
                                <Link to="/about">О нас</Link>
                            </Button>
                            {isLoggedIn && (
                                <Button className={classes.button}>
                                    <Link to="/profile">Профиль</Link>
                                </Button>
                            )}
                            <Box mt={1}/>

                            {/* cart button */}
                            <Link to="cart">
                                <IconButton
                                    className={classes.IconButton}
                                    onClick={() => setToggleDrawer(false)}
                                >
                                    <Badge badgeContent={cart.length} color="primary">
                                        <ShoppingCartOutlinedIcon/>
                                    </Badge>
                                </IconButton>
                            </Link>

                            {/* Auth Buttons */}
                            {!isLoggedIn && (
                                <Button
                                    className={classes.button}
                                    onClick={() => setToggleDrawer(false)}
                                >
                                    <Link to="/auth">Войти</Link>
                                </Button>
                            )}
                            {isLoggedIn && (
                                <Button
                                    className={classes.button}
                                    onClick={() => {
                                        dispatch(logout())
                                        history.replace('/auth')
                                        setToggleDrawer(false)
                                    }}
                                >
                                    Выйти
                                </Button>
                            )}
                        </SideDrawer>
                    </Hidden>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#303030',
        color: '#fff',
        padding: theme.spacing(1, 0),
    },
    logo: {
        textDecoration: 'none',
        color: '#fff',
        cursor: 'pointer',
    },
    logoIcon: {
        fontSize: '3rem',
        color: theme.palette.primary.main,
    },
    IconButton: {
        '& span': {
            color: '#fff',
        },
        '&:hover': {
            backgroundColor: theme.palette.primary.contrastText,
        },
    },
    sideDrawerLogo: {
        fontSize: '2.4rem',
    },
    button: {
        color: '#fff',
        padding: '0',
        margin: '0 1rem',
        '& a': {
            color: '#fff',
            textDecoration: 'none',
            width: '100%',
            padding: '6px 8px',
        },
        '&:hover': {
            backgroundColor: theme.palette.primary.contrastText,
        },
    },
    toolbar: {
        padding: '0',
    },
}))
export default Navbar
