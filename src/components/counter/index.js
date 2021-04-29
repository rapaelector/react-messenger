import { Button, Card, CardContent, CardHeader, Grid, Typography } from '@material-ui/core';
import { purple } from '@material-ui/core/colors';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client'


const socket = io.connect('http://localhost:4000');
const Counter = () => {
    const counter = useSelector(state => state.counter.count)
    const dispatch = useDispatch()
    const users = useSelector(state=> state.user.users)
    // const increment = () => {
    //     dispatch({
    //         type: 'DO_INCREMENT'
    //     })
    // }
    const renderUsers = () => {
        return users.map(user => (
            <React.Fragment>
                <Grid item xs={3} key={user.id} spacing>
                    <Card color='secondary' elevation={6}>
                        <CardContent>
                            <Typography variant="h3">
                                firstmane: {user.firstName}
                            </Typography>
                            <Typography variant="p">
                                lastnamme : {user.lastName}
                            </Typography>
                            <Typography variant="p">
                                createdAt : {user.createdAt}
                            </Typography>
                            {/* <Button onClick={increment} variant="outlined" color="primary">increment</Button> */}
                        </CardContent>
                    </Card>
                </Grid>
            </React.Fragment>
        ))
    }

    useEffect(() => {
        socket.on('usercreated', (user) => {
            dispatch({type: 'DO_FETCH_USER_EXPRESS'})
        })
    }, [])

    useEffect(() => {
        dispatch({type: 'DO_FETCH_USER_EXPRESS'})
    }, [])
    return (
        <React.Fragment>
            <Grid container style={{margin:0}} justify="space-around" spacing={3} direction='row' alignItems='center' xs={12}>
                {renderUsers()}
            </Grid>
        </React.Fragment>
    )
}

export default Counter;