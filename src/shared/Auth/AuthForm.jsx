import { Box, Button, Grid, makeStyles, TextField, Typography } from '@material-ui/core'
import axios from 'axios'
import { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { API_SOURCE } from '../util/urls'
import { login, setLoginState } from '../../store/actions/authActions'


const AuthForm = () => {
    const history = useHistory()
    const dispatch = useDispatch()

    const emailInputRef = useRef()
    const passInputRef = useRef()

    const classes = useStyles()
    const [isLogin, setIsLogin] = useState(true)
    const [errorMessage, setErrorMessage] = useState('')

    const switchAuthModeHandler = () => {
        setIsLogin((prevState) => !prevState)
    }

    const formSubmitHandler = (e) => {
        e.preventDefault()

        const emailValue = emailInputRef.current.value
        const passValue = passInputRef.current.value

        // make some validation
        let url

        if (isLogin) {
            url = API_SOURCE + 'auth'
        } else {
            url = API_SOURCE + 'signup'
        }

        axios.get(url, { params: { email: emailValue, password: passValue } })
            .then((response) => {
                if (response.data.result === 'FAILED') {
                    setErrorMessage('WRONG EMAIL OR PASSWORD')
                } else {
                    // localStorage.setItem('userId', response.data.userId)
                    console.log(response.data)
                    // const expirationTime = Date.now() + response.data.expiresIn * 1000
                    dispatch(login(response.data.userId, emailValue))
                    dispatch(setLoginState(response.data.userId))
                    // setTimeout(() => dispatch(logout()), expirationTime - Date.now())
                    history.replace('/')
                }
            })
    }

    return (
        <Grid container direction="column" justifyContent="center" alignItems="center">
            <Box
                my={4}
                py={5}
                px={2}
                width={'30vmax'}
                border={1}
                textAlign="center"
                borderRadius="borderRadius"
            >
                <Typography variant="h5">{isLogin ? 'Войти' : 'Регистрация'}</Typography>

                <form onSubmit={formSubmitHandler}>
                    <Box pt={2}>
                        <TextField
                            required
                            label="Email"
                            type="email"
                            inputRef={emailInputRef}
                            className={classes.inputField}
                        />
                    </Box>
                    <Box pt={4} pb={2}>
                        <TextField
                            className={classes.inputField}
                            required
                            label="Password"
                            type="password"
                            inputRef={passInputRef}
                        />
                    </Box>
                    <Typography className={classes.alert}>{errorMessage}</Typography>
                    <Box flexGrow={1} my={2}></Box>
                    <Button variant="contained" color="secondary" type="submit">
                        <Typography>{isLogin ? 'Войти' : 'Создать аккаунт'}</Typography>
                    </Button>
                    <Box flexGrow={1} my={2}></Box>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={switchAuthModeHandler}
                    >
                        <Typography>
                            {isLogin ? 'Зарегистироваться' : 'Войти в существующий аккаунт'}
                        </Typography>
                    </Button>
                </form>
            </Box>
        </Grid>
    )
}

const useStyles = makeStyles({
    inputField: {
        width: '100%',
    },
    alert: {
        color: '#f00',
    },
})

export default AuthForm
