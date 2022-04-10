import Slider from './components/Slider'
import Cards from './components/Cards'
import { Box } from '@material-ui/core'
import React from 'react'
import Reviews from './components/Reviews'


const Home = () => {
    return (
        <>
            <Slider/>
            <Box my={4}>
                <Cards/>
            </Box>
            <Reviews/>
        </>
    )
}

export default React.memo(Home)
