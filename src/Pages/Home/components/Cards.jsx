import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Typography from '@material-ui/core/Typography'
import productOne from '../../../assets/products/product-0.webp'
import productTwo from '../../../assets/products/product-1.webp'
import productThree from '../../../assets/products/product-2.webp'
import { Link } from 'react-router-dom'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined'
import React from 'react'


const useStyles = makeStyles((theme) => ({
    img: {
        maxWidth: '100%',
        maxHeight: '10rem',
        marginRight: 12,
    },
    textUpper: {
        textTransform: 'uppercase',
    },
    textCapitalize: {
        textTransform: 'capitalize',
    },
    container: {
        display: 'flex',
        padding: 16,
        flexDirection: 'row',
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
}))

const Card = (props) => {
    const classes = useStyles()

    return (
        <Grid item xs={12} sm={6} md={4}>
            <Box
                className={classes.container}
            >
                <div className={classes.overlay + ' overlay'}></div>
                <img className={classes.img} src={props.imageSrc} alt="product"/>
                <Link
                    className={classes.searchIcon + ' show'}
                    to={`/products:${props.id}`}
                >
                    <SearchOutlinedIcon/>
                </Link>
                <Box>
                    <Typography variant="h6" className={classes.textUpper}>
                        <Box fontWeight="bold" lineHeight={1}>
                            {props.name}
                        </Box>
                    </Typography>
                    <Typography
                        component="span"
                        className={classes.textCapitalize}
                        color="textSecondary"
                    >
                        <Box py={1}>{props.manufacturer}</Box>
                    </Typography>
                    <Typography variant="h6" color="primary">
                        <Box>{props.price} руб.</Box>
                    </Typography>
                </Box>
            </Box>
        </Grid>
    )
}

const Cards = () => {
    const classes = useStyles()
    const items = [
        {
            id: 0,
            img: productOne,
            name: 'Simplex Plus',
            manufacturer: 'Nokta&Makro',
            price: '29500',
        },
        {
            id: 1,
            img: productTwo,
            name: 'COBRA T350',
            manufacturer: 'CobraJet',
            price: '12800',
        },
        {
            id: 2,
            img: productThree,
            name: 'Eurotek',
            manufacturer: 'Teknetics',
            price: '1500',
        },
    ]
    return (
        <Container>
            <Grid
                container
                spacing={2}
                direction="row"
                justify="center"
                alignItems="center"
            >
                {items.map((item, index) => {
                    return (
                        <Card
                            key={index}
                            imageSrc={item.img}
                            name={item.name}
                            manufacturer={item.manufacturer}
                            price={item.price}
                            id={item.id}
                        />
                    )
                })}
            </Grid>
        </Container>
    )
}

export default Cards
