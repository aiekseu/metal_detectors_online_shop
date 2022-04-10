import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { CircularProgress } from '@material-ui/core'
import { AmounButton, BreadCrumb } from '../../shared'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { API_SOURCE } from '../../shared/util/urls'
import { useQuery } from 'react-query'
import product_0 from '../../assets/products/product-0.webp'
import product_1 from '../../assets/products/product-1.webp'
import product_2 from '../../assets/products/product-2.webp'
import product_3 from '../../assets/products/product-3.webp'
import product_4 from '../../assets/products/product-4.webp'


const SingleProduct = () => {
    const [itemAmount, setItemAmount] = useState(1)
    const classes = useStyles()
    const isLoggedIn = useSelector((state) => state.authReducer.isLoggedIn)

    const { id } = useParams()
    const productID = id.slice(1, id.length)

    const fetchMetDetector = () => {
        return axios
            .get(API_SOURCE + 'metdetectors/' + productID)
            .then((res) => res.data[ 0 ])
    }

    const product = useQuery('metDetector-' + productID, fetchMetDetector)

    const sourceImg = (id) => {
        switch (id) {
            case 0:
                return product_0
            case 1:
                return product_1
            case 2:
                return product_2
            case 3:
                return product_3
            case 4:
                return product_4
            default:
                return product_0
        }
    }

    const addToCart = () => {
        axios.get(API_SOURCE + 'addToCart', {
            params: {
                userId: localStorage.getItem('userId'),
                itemId: productID,
                quantity: itemAmount,
            },
        })
            .then((res) => console.log(res))
    }

    return (
        <Box>
            {product.isLoading ? (
                <Box
                    display="flex"
                    minHeight="55vh"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Grid container justify="center" alignItems="center">
                        {product.isError ? (
                            <Box>
                                <Typography variant="h3" color="textSecondary">
                                    Металлоискатель не найден :(
                                </Typography>
                            </Box>
                        ) : (
                            <CircularProgress/>
                        )}
                    </Grid>
                </Box>
            ) : product.isSuccess &&
                <Container>
                    <BreadCrumb thisRoute={product.data.name}/>
                    <Grid container justifyContent="space-between" className={classes.root}>
                        <Grid item sm={6} xs={12}>
                            <Box className={classes.productImgContainer}>
                                <img
                                    src={sourceImg(product.data.id)}
                                    alt="metal detector"
                                    className={classes.productImg}
                                />
                            </Box>
                        </Grid>
                        <Grid item sm={6} xs={12}>
                            <Box mb={4}>
                                <Typography variant="h5">
                                    <Box fontWeight="bold" mb={1}>
                                        {product.data.name}
                                    </Box>
                                </Typography>
                                <Typography varinat="subtitle1" color="textSecondary">
                                    <Box mb={2}>
                                        {product.data.manufacturer}
                                    </Box>
                                </Typography>
                                <Typography variant="h6" color="primary">
                                    <Box fontWeight="bold" mt={1}>
                                        {product.data.price} руб.
                                    </Box>
                                </Typography>
                            </Box>
                            <Box display="flex" mb={4}>
                                <Box mr={3}>
                                    <Typography variant="h6">
                                        <Box mb={1}>Производитель:</Box>
                                        <Box mb={1}>Частота обнаружения:</Box>
                                        <Box mb={1}>Метод обнаружения:</Box>
                                        <Box mb={1}>Назначение:</Box>
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="h6" color="textSecondary">
                                        <Box mb={1} fontWeight="normal">
                                            {product.data.manufacturer}
                                        </Box>
                                        <Box mb={1} fontWeight="normal">
                                            {product.data.frequency} кГц
                                        </Box>
                                        <Box mb={1} fontWeight="normal">
                                            {product.data.purpose}
                                        </Box>
                                        <Box mb={1} fontWeight="normal">
                                            {product.data.detectionMethod}
                                        </Box>
                                    </Typography>
                                </Box>
                            </Box>
                            <Divider/>
                            <Typography variant="h6" color="primary">
                                <Box fontWeight="bold" mt={1}>
                                    Общая сумма : {product.data.price * itemAmount} руб.
                                </Box>
                            </Typography>
                            <AmounButton
                                itemAmount={itemAmount}
                                increaseItemCount={() => setItemAmount(itemAmount + 1)}
                                decreaseItemCount={() => setItemAmount(itemAmount - 1)}
                            />

                            <Box mt={3}>
                                {isLoggedIn ? (
                                    <Link to={'/cart'} style={{ textDecoration: 'none' }}>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={addToCart}
                                        >
                                            Добавить в корзину
                                        </Button>
                                    </Link>
                                ) : (
                                    <Link to="auth" style={{ textDecoration: 'none' }}>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                        >
                                            Авторизоваться
                                        </Button>
                                    </Link>
                                )}
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            }
        </Box>
    )
}

//styles
const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),
    },
    productImgContainer: {
        backgroundColor: '#f5f5f5',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '0 2rem',
    },
    productImg: {
        maxWidth: '100%',
        height: '25vmax',
    },
    subImg: {
        backgroundColor: '#f5f5f5',
        width: '8vmax',
        objectFit: 'cover',
        margin: `0 1rem 1rem 0`,
    },
    iconButton: {
        backgroundColor: '#f00',
        width: '1rem',
        height: '1rem',
        marginRight: '.3rem',
        display: 'flex !important',
    },
    checkIcon: {
        color: '#fff',
        fontSize: '1rem',
    },
    colorWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    productNumber: {
        padding: '0 .6rem',
    },
    iconsBG: {
        '&:hover': {
            backgroundColor: theme.palette.secondary.main,
            color: '#fff',
        },
    },
}))

export default SingleProduct
