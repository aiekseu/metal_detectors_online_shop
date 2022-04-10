import Box from '@material-ui/core/Box'
import Input from '@material-ui/core/Input'
import Typography from '@material-ui/core/Typography'
import { Button, Card, CardContent, CircularProgress, Grid, makeStyles } from '@material-ui/core'
import NewsLetterBg from '../../../assets/newsler.jpg'
import axios from 'axios'
import { API_SOURCE } from '../../../shared/util/urls'
import { useQuery } from 'react-query'
import React, { useRef } from 'react'


const Reviews = () => {
    const classes = useStyles()
    const reviewTextRef = useRef()

    const fetchReviews = () => axios
        .get(API_SOURCE + 'reviews')
        .then((res) => {
            return res.data
        })

    const reviews = useQuery('reviews', fetchReviews)

    const handlePostReview = (e) => {
        e.preventDefault()
        const text = reviewTextRef.current.value

        axios.get(API_SOURCE + 'postReview', { params: { text: text } })
            .then((res) => {
                reviews.refetch()
            })

        reviewTextRef.current.value = ''
    }

    return (
        <Box my={10} py={6} className={classes.root} justifyContent="center">
            <Typography variant="h5">
                <Box fontWeight="bold" className={classes.upperCase}>
                    Последние отзывы на наши металлоискатели
                </Box>
            </Typography>
            <Box className={classes.boxTextWidth} textAlign="center" mt={1} mb={5}>
                {
                    reviews.isLoading &&
                    <CircularProgress/>
                }
                {
                    reviews.isSuccess &&
                    <Grid container direction={'row'} spacing={3}>
                        {
                            reviews.data.map((review) =>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Review review={review}/>
                                </Grid>,
                            )
                        }
                    </Grid>
                }
            </Box>
            <form className={classes.form} onSubmit={handlePostReview}>
                <Input
                    multiline
                    required
                    type="text"
                    className={classes.textField}
                    placeholder="Оставить отзыв"
                    inputRef={reviewTextRef}
                />
                <Button variant="contained" color="secondary" type="submit" className={classes.submit}>
                    <Typography>Отправить отзыв (анонимно)</Typography>
                </Button>
            </form>
        </Box>
    )
}

const Review = ({ review }) => {
    const classes = useStyles()

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
        <Card>
            <CardContent>
                <Typography variant={'subtitle1'} className={classes.name}>
                    Аноним
                </Typography>
                <Typography variant={'body2'}>
                    {prettyDateTime(review.dateCreated)}
                </Typography>
                <Typography variant={'body1'} className={classes.text}>
                    {review.text}
                </Typography>
            </CardContent>
        </Card>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundImage: `url(${NewsLetterBg})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'bottom',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundAttachment: 'fixed',
    },
    name: {
        fontWeight: 600,
    },
    text: {
        marginTop: 8,
    },
    upperCase: {
        textTransform: 'uppercase',
    },
    textField: {
        padding: theme.spacing(1),
        backgroundColor: 'inherit',
        border: '1px solid #444',
        borderRadius: '3px',
        width: '100%',
        height: '8rem',
    },
    form: {
        width: '80%',
        [ theme.breakpoints.up('sm') ]: {
            width: '40%',
        },
    },
    sendIcon: {
        cursor: 'pointer',
    },
    boxTextWidth: {
        [ theme.breakpoints.up('sm') ]: {
            width: '50%',
        },
    },
    submit: {
        marginTop: 8,
    },
}))

export default Reviews
