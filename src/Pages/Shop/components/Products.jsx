import React from 'react'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined'
import Box from '@material-ui/core/Box'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Typography from '@material-ui/core/Typography'

import product_0 from '../../../assets/products/product-0.webp'
import product_1 from '../../../assets/products/product-1.webp'
import product_2 from '../../../assets/products/product-2.webp'
import product_3 from '../../../assets/products/product-3.webp'
import product_4 from '../../../assets/products/product-4.webp'

import { Link } from 'react-router-dom'


const Products = (props) => {
    const classes = useStyles()

    const { data } = props
    const title = data.name.slice(0, 30)

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

    return (
        <Box
            id={data.id}
            px={3}
            pt={3}
            display="flex"
            flexDirection="column"
            style={{ transition: 'all 0.3s linear' }}
        >
            <Box className={classes.container}>
                <div className={classes.overlay + ' overlay'}></div>
                <img className={classes.imgStyle} src={sourceImg(data.id)} alt={data.name}/>
                <Link
                    className={classes.searchIcon + ' show'}
                    to={`/products:${data.id}`}
                >
                    <SearchOutlinedIcon/>
                </Link>
            </Box>
            <Box display="flex" justifyContent="space-between" mt={3}>
                <Typography variant={'h6'} className={classes.title}>{title}</Typography>
                <Typography variant={'h6'} className={classes.title} color="primary">
                    {data.price + ' руб.'}
                </Typography>
            </Box>
            <Typography variant={'subtitle1'}>Производитель: {data.manufacturer}</Typography>
            <Typography variant={'body1'}>Частота обнаружения: {data.frequency} кГц</Typography>
            <Typography variant={'body1'}>Метод обнаружения: {data.detectionMethod}</Typography>
            <Typography variant={'body1'}>Назначение: {data.purpose}</Typography>
        </Box>
    )
}

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        borderRadius: 10,
        backgroundColor: '#f5f5f5',
        '&:hover': {
            '& .show': {
                opacity: 1,
            },
            '& .overlay': {
                opacity: 0.6,
            },
        },
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        borderRadius: 10,
        backgroundColor: '#333',
        opacity: 0,
        zIndex: 100,
        transition: 'all 0.3s linear',
    },
    searchIcon: {
        position: 'absolute',
        color: '#fff',
        cursor: 'pointer',
        width: theme.spacing(6),
        height: theme.spacing(6),
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.palette.primary.main,
        opacity: 0,
        zIndex: 200,
    },
    imgStyle: {
        width: '100%',
        borderRadius: 5,
        height: '13rem',
        objectFit: 'contain',
        // [theme.breakpoints.down("sm")]: {
        //   maxHeight: "20vmax",
        // },
        // [theme.breakpoints.up("xl")]: {
        //   height: "13vmax",
        // },
    },
    cursor: {
        cursor: 'pointer',
    },
    title: {
        textTransform: 'capitalize',
        fontWeight: 500,
    },
}))

export default Products
