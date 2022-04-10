import { Box, CircularProgress, Container, Grid, List, ListItem, makeStyles, Typography } from '@material-ui/core'
import axios from 'axios'
import React from 'react'
import { API_SOURCE } from '../../shared/util/urls'
import { useQuery } from 'react-query'


const Profile = () => {
    const classes = useStyles()

    const fetchUsersOrders = () => axios
        .get(API_SOURCE + 'orders', { params: { userId: localStorage.getItem('userId') } })
        .then((res) => {
            console.log(res.data)
            return res.data
        })

    const orders = useQuery('userOrders', fetchUsersOrders)

    return (
        <>
            <Grid container justifyContent="center">
                <Box my={3} px={4} textAlign="center">
                    <Typography variant="h5">
                        ZДРАВСТВУЙТЕ, {localStorage.getItem('userEmail')}
                    </Typography>
                </Box>
                <Container maxWidth={'lg'} className={classes.orders}>
                    <Typography variant="h6">
                        Ваши заказы:
                    </Typography>
                    {
                        orders.isLoading &&
                        <CircularProgress/>
                    }
                    {
                        orders.isSuccess &&
                        <List>
                            {
                                orders.data.map((order) =>
                                    <Order order={order} key={order.id}/>,
                                )
                            }
                        </List>
                    }
                </Container>
            </Grid>
        </>
    )
}

const Order = ({ order }) => {

    const prettyDateTime = (datetime) => {
        const date = new Date(datetime)

        return (date.getDate() < 10 ? '0' + date.getDate().toString() : date.getDate().toString()) + '.' +
            (date.getMonth() < 9 ? '0' + (date.getMonth() + 1).toString() : (date.getMonth() + 1).toString()) + '.' +
            date.getFullYear().toString() + ' ' +
            (date.getHours() < 10 ? '0' + date.getHours().toString() : date.getHours().toString()) + ':' +
            (date.getMinutes() < 10 ? '0' + date.getMinutes().toString() : date.getMinutes().toString()) + ':' +
            (date.getSeconds() < 10 ? '0' + date.getSeconds().toString() : date.getSeconds().toString())
    }

    return (
        <ListItem>
            <Box>
                <Typography variant={'h6'}>
                    ЗАКАЗ #{order.id}
                </Typography>
                <Typography variant={'subtitle1'}>
                    Дата: {prettyDateTime(order.dateCreated)}
                </Typography>
                <Typography variant={'subtitle1'}>
                    Сумма: {order.sum} руб.
                </Typography>
                <Typography variant={'subtitle1'}>
                    Статус: Оплачен
                </Typography>
            </Box>
        </ListItem>
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
    orders: {
        marginTop: 16,
    },
}))

export default Profile
