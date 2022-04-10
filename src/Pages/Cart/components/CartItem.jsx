import Hidden from '@material-ui/core/Hidden'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Grid from '@material-ui/core/Grid'
import DeleteIcon from '@material-ui/icons/Delete'
import product_0 from '../../../assets/products/product-0.webp'
import product_1 from '../../../assets/products/product-1.webp'
import product_2 from '../../../assets/products/product-2.webp'
import product_3 from '../../../assets/products/product-3.webp'
import product_4 from '../../../assets/products/product-4.webp'
import axios from 'axios'
import { API_SOURCE } from '../../../shared/util/urls'


const CartItem = ({ product, setUpdate }) => {
    const classes = useStyles()

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

    const deleteFromCart = () => {
        axios.get(API_SOURCE + 'deleteFromCart', { params: { cartItemId: product.cartItemId } })
            .then(() => setUpdate((prevState) => !prevState))
    }

    return (
        <Grid container justify="space-between" alignItems="center">
            <Hidden xsDown>
                <Grid item sm={1} md={2}>
                    <img
                        className={classes.productImage}
                        src={sourceImg(product.metDetectorId)}
                        alt="product"
                    />
                </Grid>
                <Grid item sm={3} md={2}>
                    <Typography variant="subtitle1">{product.name}</Typography>
                </Grid>
                <Grid item sm={2}>
                    <Typography variant="subtitle1" color="primary">
                        <Box fontWeight="bold">{product.price} руб.</Box>
                    </Typography>
                </Grid>
            </Hidden>
            <Hidden smUp>
                <Grid container item xs={6} alignItems="center" justify="space-between">
                    <Box mb={1}>
                        <img
                            className={classes.productImage}
                            src={sourceImg(product.metDetectorId)}
                            alt="product"
                        />
                    </Box>
                    <Box>
                        <Typography variant="subtitle1">{product.name}</Typography>
                        <Typography variant="subtitle1" color="primary">
                            <Box fontWeight="bold">{product.price} руб.</Box>
                        </Typography>
                    </Box>
                </Grid>
            </Hidden>

            <Typography variant="h5">{product.quantity} ШТ.</Typography>

            <Grid container item xs={1} sm={2} justify="space-between">
                <Hidden xsDown>
                    <Typography variant="subtitle1" color="primary">
                        <Box fontWeight="bold">{product.price * product.quantity} руб.</Box>
                    </Typography>
                </Hidden>
                <DeleteIcon
                    className={classes.closeIcon}
                    onClick={deleteFromCart}
                />
            </Grid>
        </Grid>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        textTransform: 'uppercase',
    },
    productImage: {
        maxWidth: '16vmax',
        height: '8vmax',
        objectFit: 'contain',
        [ theme.breakpoints.down('xs') ]: {
            maxWidth: '8vmax',
        },

    },
    productNumber: {
        padding: '0 .5rem',
        [ theme.breakpoints.down('xs') ]: {
            padding: 0,
        },
    },
    iconsBG: {
        '&:hover': {
            backgroundColor: theme.palette.secondary.main,
            color: '#fff',
        },
    },
    closeIcon: {
        '& :hover': {
            color: theme.palette.primary.main,
            cursor: 'pointer',
        },
    },
    shoppingButtons: {
        color: '#fff',
    },
}))

export default CartItem
