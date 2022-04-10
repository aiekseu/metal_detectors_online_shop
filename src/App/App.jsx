import React, { Suspense, useEffect } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { Footer, Navbar } from '../shared'
import Auth from '../shared/Auth/AuthForm'
import { makeStyles, unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import ScrollToTop from '../shared/util/ScrollToTop'
import { useDispatch, useSelector } from 'react-redux'
import Profile from '../Pages/Profile/Profile'
import CssBaseline from '@material-ui/core/CssBaseline'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import { login, setLoginState } from '../store/actions/authActions'


const Home = React.lazy(() => import('../Pages/Home/index'))
const Shop = React.lazy(() => import('../Pages/Shop/Shop'))
const About = React.lazy(() => import('../Pages/About/About'))
const SingleProduct = React.lazy(() => import('../Pages/Shop/SingleProduct'))
const ShoppingCart = React.lazy(() => import('../Pages/Cart/ShoppingCart'))
const NotFound = React.lazy(() => import('../shared/components/404/NotFound'))

const App = () => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const isLoggedIn = useSelector((state) => state.authReducer.isLoggedIn)

    useEffect(() => {
        const userId = localStorage.getItem('userId')
        const userEmail = localStorage.getItem('userEmail')
        if (userId !== null) {
            dispatch(login(userId, userEmail))
            dispatch(setLoginState(userId))
        }
    }, [])

    return (
        <BrowserRouter>
            <ScrollToTop/>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Navbar/>
                <main className={classes.main}>
                    <Suspense
                        fallback={
                            <Grid container justify="center" alignItems="center">
                                <CircularProgress/>
                            </Grid>
                        }
                    >
                        <Switch>
                            <Route exact path="/" component={Home}/>
                            <Route path="/shop">
                                <Shop/>
                            </Route>
                            <Route exact path="/about" component={About}/>
                            <Route path={'/products:id'} component={SingleProduct}/>
                            <Route path="/cart" component={ShoppingCart}/>
                            {!isLoggedIn && (
                                <Route path="/auth">
                                    <Auth/>
                                </Route>
                            )}
                            {isLoggedIn && (
                                <Route path="/profile">
                                    <Profile/>
                                </Route>
                            )}
                            {isLoggedIn && (
                                <Route path="*">
                                    <Redirect to="/"/>
                                </Route>
                            )}
                            {!isLoggedIn && <Route path="*" component={NotFound}/>}
                        </Switch>
                    </Suspense>
                </main>
                <Footer/>
            </ThemeProvider>
        </BrowserRouter>
    )
}

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#79B6C8',
        },
        secondary: {
            main: '#525252',
        },
    },
})

const useStyles = makeStyles({
    main: {
        minHeight: '55vh',
    },
})

export default App
