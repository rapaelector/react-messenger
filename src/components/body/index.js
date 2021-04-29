import { Button, Card, CardContent, CardHeader, Grid, makeStyles, TextField, Typography } from '@material-ui/core';
import { purple } from '@material-ui/core/colors';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client'
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import SendIcon from '@material-ui/icons/Send';
import jwt_decode from 'jwt-decode'

const useStyle = makeStyles((theme) => ({
    userList: {
        border: 'solid 1px grey'
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      },
        root: {
            padding: theme.spacing(1),
          display: 'flex',
          alignItems: 'center',
        },
        input: {
          marginLeft: theme.spacing(0),
          flex: 1,
        },
        iconButton: {
          padding: 10,
        },
        divider: {
          height: 28,
          margin: 4,
        },
      }));


const socket = io.connect('http://localhost:4000');
const Counter = () => {
    const classes = useStyle();
    const counter = useSelector(state => state.counter.count)
    const dispatch = useDispatch()
    const users = useSelector(state=> state.user.users)
    const token = useSelector(state=> state.auth.token)
    const chanels = useSelector(state=> state.group.chanels)
    const messages = useSelector(state=> state.message.messages)
    const [message, setMessage] = useState('');
    const [groupId, setGroupId] = useState('');
    const fetchMessageByGroup = (value) => {
        setGroupId(value)
        // console.log(value);
        // if (e.target.id != undefined) {
            dispatch({
                type: 'DO_FETCH_MESSAGE_FOR_GROUP',
                payload: {
                    id: value
                }
            })
        // }
    }
    const displayMessages = () => {
        if (!messages)return '';
        return messages.map(message => {
            return (
            <React.Fragment key={message.id}>
                <Paper key={message.id} color='primary'>
                    {message.content}
                </Paper>
            </React.Fragment>
        )}
        )
    }
    const renderUsers = () => {
        if (!chanels)return '';
        return chanels.map(chanel => {
            return (
            <React.Fragment key={chanel.id}>
                <Paper key={chanel.id} id={chanel.UserGroup.GroupId} className={classes.paper} color='secondary' onClick={()=> fetchMessageByGroup(chanel.UserGroup.GroupId)}>
                    {chanel.name}
                </Paper>
            </React.Fragment>
        )}
        )
    }
    const sendMessage = () => {
        const uid = jwt_decode(token).id;
        dispatch({type: 'DO_SAVE_MESSAGE', payload:{
            content:  message,
            GroupId: groupId,
            UserId: uid
        }})
        setMessage('');
    }

    useEffect(() => {
        socket.on('usercreated', (user) => {
            dispatch({type: 'DO_FETCH_USER_EXPRESS'})
        })
        socket.on('messageadd', (message) => {
            const {GroupId} = message;
            dispatch({
                type: 'DO_FETCH_MESSAGE_FOR_GROUP', 
                payload: {
                    id: GroupId
                }
            })
        })
    }, [])

    const changeMessage = (e) => {
        setMessage(e.target.value)
    }

    useEffect(() => {
        dispatch({type: 'DO_FETCH_USER_EXPRESS'})
        dispatch({type: 'DO_FETCH_GROUP_CURRENT_USER', payload:{
            UserId:  1
        }})
    }, [])
    return (
        <React.Fragment>
            <Grid container style={{margin:0}} spacing={2} direction='row' alignItems='center' xs={12}>
                <Grid item xs={2} spacing container style={{margin:0}} spacing={2} direction='column' >
                        <Paper style={{height:'90vh'}}>
                            <Grid item >
                                {renderUsers()}
                            </Grid>
                        </Paper>
                </Grid>
                {groupId ? 
                <Grid item xs={10} spacing container style={{margin:0}} spacing={2} direction='column' >
                        {/* <Paper style={{height:'90vh'}}> */}
                            <Grid direction='column' justify='space-between' style={{height:'80vh'}}>
                                <Grid item >
                                    {displayMessages()}
                                </Grid>
                            
                            </Grid>
                        {/* </Paper> */}
                        <Paper component="form" className={classes.root} fullWidth>
                            <InputBase
                                className={classes.input}
                                placeholder="message"
                                inputProps={{ 'aria-label': 'message' }}
                                fullWidth
                                value={message}
                                onChange={changeMessage}
                            />
                            <Divider className={classes.divider} orientation="vertical" />
                            <IconButton color="primary" className={classes.iconButton} aria-label="directions" onClick={sendMessage}>
                                <SendIcon />
                            </IconButton>
                        </Paper>
                </Grid>
                :''}
            </Grid>
        </React.Fragment>
    )
}





export default Counter;