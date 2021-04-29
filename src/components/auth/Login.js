import { Button, Card, CardContent, Grid, Paper, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, AlertTitle } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
    gridHeight:{
        height: "90vh"
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(3)
      },
      avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
      },
      form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
      },
      submit: {
        margin: theme.spacing(3, 0, 2),
      },
}));


const Login = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const error = useSelector(state=>state.auth.error)

    const submit = () => {
        dispatch(
            {
                type: 'DO_LOGIN', 
                payload: {
                    email,
                    password
                }
            }
        )
    }
    return (
        <Grid className={classes.gridHeight} container alignItems="center" direction="row" justify="center">
            <Grid item xs={3}>
                <Paper className={classes.paper} elevation={3}>
                    <Typography variant="h4" color="primary">Sing In</Typography>
                    <form className={classes.form}>
                        <TextField onChange={e => setEmail(e.target.value)} id="email" required name="email" autoFocus label="email" variant="outlined" margin="normal" fullWidth />
                        <TextField onChange={e => setPassword(e.target.value)} id="password" required name="password" label="password" variant="outlined" margin="normal" fullWidth />
                        {error ? <Alert severity="error">
                            <AlertTitle>Error</AlertTitle>
                            {error}
                        </Alert> : '' }
                        <Button type='button' onClick={submit} fullWidth className={classes.submit} variant="contained" color="primary">Login</Button>
                    </form>
                    <Grid container direction="row" justify="space-between">
                        <Grid item>forgot password?</Grid>
                        <Grid item>create new profile?</Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default Login;