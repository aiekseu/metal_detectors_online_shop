import { Box, Container, Grid, Typography } from '@material-ui/core'
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined'
import PhoneOutlinedIcon from '@material-ui/icons/PhoneOutlined'
import MailOutlineOutlinedIcon from '@material-ui/icons/MailOutlineOutlined'
import CreditCardOutlinedIcon from '@material-ui/icons/CreditCardOutlined'
import useStyles from './Styles'


const Footer = () => {
    const classes = useStyles()

    return (
        <Box className={classes.root} py={10} component="footer">
            <Container>
                <Grid container justify="center">
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" className={classes.footerHeading}>
                            <Box fontWeight="bold">о магазине</Box>
                        </Typography>
                        <Box my={3} className={classes.smallScreenCenter}>
                            <Box display="flex" my={1} className={classes.boxScreenCenter}>
                                <HomeOutlinedIcon/>
                                <Typography component="span" className={classes.spacingLeft}>Усова 15Б,
                                    Томск</Typography>
                            </Box>
                            <Box display="flex" my={1} className={classes.boxScreenCenter}>
                                <PhoneOutlinedIcon/>
                                <Typography component="span"
                                            className={classes.spacingLeft}>+7(908)954-87-94</Typography>
                            </Box>
                            <Box display="flex" my={1} className={classes.boxScreenCenter}>
                                <MailOutlineOutlinedIcon/>
                                <Typography component="span" className={classes.spacingLeft}>avk224@tpu.ru</Typography>
                            </Box>
                            <Box display="flex" my={1} className={classes.boxScreenCenter}>
                                <MailOutlineOutlinedIcon/>
                                <Typography component="span" className={classes.spacingLeft}>haysin@tpu.ru</Typography>
                            </Box>
                            <Box display="flex" className={classes.boxScreenCenter}>
                                <CreditCardOutlinedIcon className={classes.spacingLeft}/>
                                <CreditCardOutlinedIcon className={classes.spacingLeft}/>
                                <CreditCardOutlinedIcon className={classes.spacingLeft}/>
                                <CreditCardOutlinedIcon className={classes.spacingLeft}/>
                                <CreditCardOutlinedIcon className={classes.spacingLeft}/>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" className={classes.footerHeading}>
                            <Box fontWeight="bold">Аккаунт</Box>
                        </Typography>
                        <Box className={classes.boxResponsiveStyles}>
                            <ul className={classes.footerList}>
                                <li>Профиль</li>
                                <li>Авторизация</li>
                                <li>Корзина</li>
                                <li>Вишлист</li>
                                <li>Заказы</li>
                            </ul>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" className={classes.footerHeading}>
                            <Box>Информация</Box>
                        </Typography>
                        <Box className={classes.boxResponsiveStyles}>
                            <ul className={classes.footerList}>
                                <li>О нас</li>
                                <li>Доставка</li>
                                <li>Политика конфиденциальности</li>
                                <li>Программа лояльности</li>
                            </ul>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" className={classes.footerHeading}>
                            <Box fontWeight="bold">Техподдержка</Box>
                        </Typography>
                        <Box className={classes.boxResponsiveStyles}>
                            <ul className={classes.footerList}>
                                <li>Shipping Policy</li>
                                <li>Compensation First</li>
                                <li>Контакты</li>
                                <li>Доставка</li>
                            </ul>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default Footer
