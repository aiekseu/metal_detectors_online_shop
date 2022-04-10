import { Box, Button, Container, Divider, Grid, Hidden, makeStyles, Typography } from '@material-ui/core'
import CartItem from './components/CartItem'
import { BreadCrumb } from '../../shared'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { API_SOURCE } from '../../shared/util/urls'
import { useQuery } from 'react-query'
import { useEffect, useState } from 'react'


const ShoppingCart = () => {
    const classes = useStyles()
    const isLoggedIn = useSelector((state) => state.authReducer.isLoggedIn)

    const [update, setUpdate] = useState(false)

    const fetchUsersCart = () => {
        if (isLoggedIn)
            return axios
                .get(API_SOURCE + 'cart', { params: { userId: localStorage.getItem('userId') } })
                .then((res) => {
                    console.log(res.data)
                    return res.data
                })
    }

    const cartItems = useQuery('userCart', fetchUsersCart)

    const getTotalPrice = () => {
        let sum = 0
        for (let item of cartItems.data) {
            sum += item.price * item.quantity
        }
        return sum
    }

    useEffect(() => {
        cartItems.refetch()
    }, [update])

    const handlePlaceOrder = () => {
        axios.get(API_SOURCE + 'placeOrder', {
            params: {
                userId: localStorage.getItem('userId'),
                sum: getTotalPrice() * 1.01,
            },
        })
            .then((res) => console.log(res.data))
    }

    return (
        <Container>
            <BreadCrumb thisRoute="Корзина"/>
            {
                (isLoggedIn && !cartItems.isError && cartItems?.data?.length > 0) &&
                <Box my={4}>
                    <Typography variant="h6">
                        <Box fontWeight="bold">КОРЗИНА</Box>
                    </Typography>
                    <Hidden smDown>
                        <Box my={3} className={classes.root}>
                            <Grid container justifyContent="space-between">
                                <Grid container item sm={2}>
                                    <Typography variant="h6">Product photo</Typography>
                                </Grid>
                                <Grid container item sm={2}>
                                    <Typography variant="h6">product name</Typography>
                                </Grid>
                                <Grid container item sm={2}>
                                    <Typography variant="h6">price</Typography>
                                </Grid>
                                <Grid container item sm={2}>
                                    <Typography variant="h6">quantitiy</Typography>
                                </Grid>
                                <Grid container item sm={2}>
                                    <Typography variant="h6">total price</Typography>
                                </Grid>
                            </Grid>
                        </Box>
                        <Divider/>
                    </Hidden>
                    <Box my={3}>
                        {/*start loop throught cart array */}
                        {
                            cartItems.isSuccess &&
                            cartItems.data.map((product) => (
                                <CartItem key={product.metDetectorId} product={product} setUpdate={setUpdate}/>
                            ))
                        }
                        {/*end loop throught cart array */}
                        <Divider/>
                        <Box my={4} display="flex" justifyContent="space-between">
                            <Link to="shop" style={{ textDecoration: 'none' }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.shoppingButtons}
                                >
                                    Продолжить шоппинг
                                </Button>
                            </Link>
                            <Box mx={1}/>
                        </Box>
                        <Box my={4}>
                            <Grid container>
                                <Grid item md={8} sm={6}></Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Typography variant="h6">ИТОГО:</Typography>
                                    <Box my={4}>
                                        <Box
                                            display="flex"
                                            justifyContent="space-between"
                                            mb={1}
                                            mt={3}
                                        >
                                            <Typography variant="h6">Товары: </Typography>
                                            <Typography variant="h6">
                                                {getTotalPrice()} руб.
                                            </Typography>
                                        </Box>
                                        <Divider/>
                                        <Box
                                            display="flex"
                                            justifyContent="space-between"
                                            mb={1}
                                            mt={3}
                                        >
                                            <Typography variant="h6">
                                                Комиссия:
                                            </Typography>
                                            <Typography variant="h6">{getTotalPrice() / 100} руб.</Typography>
                                        </Box>
                                        <Divider/>
                                        <Box
                                            display="flex"
                                            justifyContent="space-between"
                                            mb={1}
                                            mt={3}
                                        >
                                            <Typography variant="h6">К оплате:</Typography>
                                            <Typography variant="h6" color="primary">
                                                {getTotalPrice() * 1.01} руб.
                                            </Typography>
                                        </Box>
                                        <Divider/>
                                    </Box>
                                    {isLoggedIn ? (
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            className={classes.shoppingButtons}
                                            onClick={handlePlaceOrder}
                                        >
                                            <Link to="profile">Разместить заказ</Link>
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            className={classes.shoppingButtons}
                                        >
                                            <Link to="auth">Авторизоваться</Link>
                                        </Button>
                                    )}
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Box>
            }
            {
                (!isLoggedIn || cartItems.isError || cartItems.isLoading || cartItems.data?.length === 0) &&
                <Grid container alignItems="center" justifyContent="center">
                    <Box py={10} textAlign="center">
                        <Box pb={2}>
                            <Typography variant="h5">Корзина пуста</Typography>
                        </Box>
                        <Link to="shop" style={{ textDecoration: 'none' }}>
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.shoppingButtons}
                            >
                                За покупками
                            </Button>
                        </Link>
                    </Box>
                </Grid>
            }
        </Container>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        textTransform: 'uppercase',
    },
    shoppingButtons: {
        color: '#fff',
        '& a': {
            color: '#fff',
            textDecoration: 'none',
            width: '100%',
        },
    },
}))

export default ShoppingCart
