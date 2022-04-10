import Sidebar from './components/Sidebar'
import Products from './components/Products'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import { Banner, BreadCrumb } from '../../shared'
import { useQuery } from 'react-query'
import axios from 'axios'
import { API_SOURCE } from '../../shared/util/urls'
import { useEffect, useState } from 'react'


const Shop = () => {
    const [params, setParams] = useState({})
    const [search, setSearch] = useState('')

    const fetchMetDetectors = () => {
        console.log(params)
        return axios
            .get(API_SOURCE + 'metdetectors', { params: params })
            .then((res) => res.data)
    }

    const metDetectors = useQuery('metDetectorsCatalogue', fetchMetDetectors)

    useEffect(() => {
        metDetectors.refetch()
    }, [params])

    return (
        <Box mb={5}>
            <Banner/>
            <Container>
                <BreadCrumb thisRoute=""/>
                <Box mt={4}>
                    <Grid container>
                        <Grid item xs={12} sm={2}>
                            <Sidebar params={params} setParams={setParams} setSearch={setSearch}/>
                        </Grid>
                        <Grid item xs={12} sm={10}>
                            {
                                (metDetectors.isLoading || (metDetectors.isSuccess && metDetectors.data.length === 0)) &&
                                <Box
                                    display="flex"
                                    minHeight="55vh"
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <Grid container justifyContent="center" alignItems="center">
                                        {
                                            metDetectors.isLoading &&
                                            <CircularProgress/>
                                        }
                                        {
                                            metDetectors.isSuccess && metDetectors.data.length === 0 &&
                                            <Box>
                                                <Typography variant="h3" color="textSecondary">
                                                    Таких металлоискателей нет
                                                </Typography>
                                            </Box>
                                        }
                                    </Grid>
                                </Box>
                            }
                            <Grid
                                container
                                justify={metDetectors.isLoading ? 'center' : 'space-between'}
                                alignItems="center"
                            >
                                {
                                    metDetectors.isSuccess &&
                                    metDetectors.data
                                        .filter((item) => item.name.toLowerCase().indexOf(search.toLowerCase()) !== -1)
                                        .map((metDet) => (
                                            <Grid item xs={12} sm={6} lg={4} key={metDet.id}>
                                                <Products data={metDet}/>
                                            </Grid>
                                        ))
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Box>
    )
}

export default Shop
