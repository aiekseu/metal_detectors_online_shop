import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import makeStyles from '@material-ui/core/styles/makeStyles'
import TextField from '@material-ui/core/TextField'
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel } from '@material-ui/core'
import { useState } from 'react'
import axios from 'axios'
import { API_SOURCE } from '../../../shared/util/urls'
import { useQuery } from 'react-query'


const Sidebar = ({ params, setParams, setSearch }) => {
    const classes = useStyles()

    const fetchManufacturers = () => axios
        .get(API_SOURCE + 'manufacturers')
        .then((res) => {
            let tempObj = []
            for (let manufacturer of res.data) {
                tempObj.push({
                    id: manufacturer.id,
                    name: manufacturer.name,
                    checked: false,
                })
            }
            setManufacturersChecks(tempObj)
            return res.data
        })

    const fetchPurposes = () => axios
        .get(API_SOURCE + 'purposes')
        .then((res) => {
            let tempObj = []
            for (let manufacturer of res.data) {
                tempObj.push({
                    id: manufacturer.id,
                    name: manufacturer.name,
                    checked: false,
                })
            }
            setPurposesChecks(tempObj)
            return res.data
        })

    const fetchFrequencies = () => axios
        .get(API_SOURCE + 'frequencies')
        .then((res) => {
            let tempObj = []
            for (let manufacturer of res.data) {
                tempObj.push({
                    id: manufacturer.id,
                    frequency: manufacturer.frequency,
                    checked: false,
                })
            }
            setFrequenciesChecks(tempObj)
            return res.data
        })

    const fetchMethods = () => axios
        .get(API_SOURCE + 'detmethods')
        .then((res) => {
            let tempObj = []
            for (let manufacturer of res.data) {
                tempObj.push({
                    id: manufacturer.id,
                    name: manufacturer.name,
                    checked: false,
                })
            }
            setMethodsChecks(tempObj)
            return res.data
        })

    const manufacturers = useQuery('manufacturers', fetchManufacturers)
    const purposes = useQuery('purposes', fetchPurposes)
    const frequencies = useQuery('frequencies', fetchFrequencies)
    const methods = useQuery('methods', fetchMethods)

    const [manufacturersChecks, setManufacturersChecks] = useState([])
    const [purposesChecks, setPurposesChecks] = useState([])
    const [frequenciesChecks, setFrequenciesChecks] = useState([])
    const [methodsChecks, setMethodsChecks] = useState([])

    const handleApplyFilter = () => {
        // params.frequencyId || params.detectionMethodId || params.manufacturerId || params.purposeId
        // setParams({
        //
        // })
        const manufacturersParams = []
        const purposesParams = []
        const frequenciesParams = []
        const methodsParams = []
        manufacturersChecks
            .filter((item) => item.checked)
            .map((item) => manufacturersParams.push(item.id))

        purposesChecks
            .filter((item) => item.checked)
            .map((item) => purposesParams.push(item.id))

        frequenciesChecks
            .filter((item) => item.checked)
            .map((item) => frequenciesParams.push(item.id))

        methodsChecks
            .filter((item) => item.checked)
            .map((item) => methodsParams.push(item.id))

        setParams({
            manufacturerId: manufacturersParams.toString(),
            purposeId: purposesParams.toString(),
            frequencyId: frequenciesParams.toString(),
            detectionMethodId: methodsParams.toString(),
        })
    }

    return (
        <Box mt={1} className={classes.root}>
            <Box className={classes.searchInput}>
                <TextField
                    label="Поиск"
                    margin="dense"
                    variant="outlined"
                    onChange={(e) => setSearch(e.target.value)}
                />
            </Box>
            <Box mt={2}>
                {
                    manufacturers.isSuccess &&
                    <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                        <FormLabel component="legend">Производитель</FormLabel>
                        <FormGroup>
                            {
                                manufacturersChecks.map((item) =>
                                    <FormControlLabel
                                        key={item.id}
                                        control={
                                            <Checkbox
                                                checked={item.checked}
                                                name={item.id.toString()}
                                                onChange={(event, checked) => {
                                                    let newArray = manufacturersChecks.slice()
                                                    newArray[ item.id ] = {
                                                        id: item.id,
                                                        name: item.name,
                                                        checked: checked,
                                                    }
                                                    setManufacturersChecks(newArray)
                                                }}
                                            />
                                        }
                                        label={item.name}
                                    />,
                                )
                            }
                        </FormGroup>
                    </FormControl>
                }
            </Box>
            <Divider className={classes.divider}/>
            <Box>
                {
                    purposes.isSuccess &&
                    <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                        <FormLabel component="legend">Назначение</FormLabel>
                        <FormGroup>
                            {
                                purposesChecks.map((item) =>
                                    <FormControlLabel
                                        key={item.id}
                                        control={
                                            <Checkbox
                                                checked={item.checked}
                                                name={item.id.toString()}
                                                onChange={(event, checked) => {
                                                    let newArray = purposesChecks.slice()
                                                    newArray[ item.id ] = {
                                                        id: item.id,
                                                        name: item.name,
                                                        checked: checked,
                                                    }
                                                    setPurposesChecks(newArray)
                                                }}
                                            />
                                        }
                                        label={item.name}
                                    />,
                                )
                            }
                        </FormGroup>
                    </FormControl>
                }
            </Box>
            <Divider className={classes.divider}/>
            <Box>
                {
                    methods.isSuccess &&
                    <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                        <FormLabel component="legend">Метод обнаружения</FormLabel>
                        <FormGroup>
                            {
                                methodsChecks.map((item) =>
                                    <FormControlLabel
                                        key={item.id}
                                        control={
                                            <Checkbox
                                                checked={item.checked}
                                                name={item.id.toString()}
                                                onChange={(event, checked) => {
                                                    let newArray = methodsChecks.slice()
                                                    newArray[ item.id ] = {
                                                        id: item.id,
                                                        name: item.name,
                                                        checked: checked,
                                                    }
                                                    setMethodsChecks(newArray)
                                                }}
                                            />
                                        }
                                        label={item.name}
                                    />,
                                )
                            }
                        </FormGroup>
                    </FormControl>
                }
            </Box>
            <Divider className={classes.divider}/>
            <Box>
                {
                    frequencies.isSuccess &&
                    <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                        <FormLabel component="legend">Частота обнаружения</FormLabel>
                        <FormGroup>
                            {
                                frequenciesChecks.map((item) =>
                                    <FormControlLabel
                                        key={item.id}
                                        control={
                                            <Checkbox
                                                checked={item.checked}
                                                name={item.id.toString()}
                                                onChange={(event, checked) => {
                                                    let newArray = frequenciesChecks.slice()
                                                    newArray[ item.id ] = {
                                                        id: item.id,
                                                        frequency: item.frequency,
                                                        checked: checked,
                                                    }
                                                    setFrequenciesChecks(newArray)
                                                }}
                                            />
                                        }
                                        label={item.frequency}
                                    />,
                                )
                            }
                        </FormGroup>
                    </FormControl>
                }
            </Box>
            <Box mt={2}>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleApplyFilter()}
                    className={classes.responsiveButton}
                >
                    Применить фильтр
                </Button>
            </Box>
        </Box>
    )
}

//sidebar styles :)
const useStyles = makeStyles((theme) => ({
    root: {
        '& button': {
            textAlign: 'left',
            display: 'block',
        },
        position: 'sticky',
        top: 0,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    iconButton: {
        width: '1rem',
        height: '1rem',
        marginRight: '.3rem',
        display: 'flex !important',
        [ theme.breakpoints.down('md') ]: {
            marginBottom: '.5rem',
        },
    },
    allBtn: {
        minWidth: '1rem',
        fontSize: '1.2rem',
    },
    checkIcon: {
        color: '#fff',
        fontSize: '1rem',
    },
    selectedColor: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        [ theme.breakpoints.up('lg') ]: {
            flexWrap: 'nowrap',
        },
    },
    lineText: {
        minWidth: '1rem',
        fontSize: '1.2rem',
        textDecoration: 'underline',
    },
    responsiveButton: {
        [ theme.breakpoints.up('lg') ]: {
            fontSize: '.9rem',
        },
        fontSize: '.8rem',
    },
    divider: {
        marginTop: 4,
        marginBottom: 12,
    },
}))

export default Sidebar
