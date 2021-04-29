import logo from './logo.svg';
import './App.css';
import {Button, Paper, Typography} from '@material-ui/core'
import Space  from "./components/space"
import Login from './components/auth/Login'
import React from 'react';
import jwt_decode from 'jwt-decode'
import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';
import darkTheme from './themes/darkTheme'
import theme from './themes/theme'
function App() {
  const token = useSelector(state=>state.auth.token)
  const dispatch = useDispatch();
  const light = useSelector(state => state.theme.light)
  if (token) {
    const uId = jwt_decode(token).id;

    dispatch({
      type: 'DO_CHECK_USER',
      payload: {
        uid : uId,
        token: token
      }
    })
    // get user by token 
    // match the id with uId
  }
  return (
    <React.Fragment>
      <ThemeProvider theme={light ? theme : darkTheme}>
        {/* <Paper style={{height: '100vh'}}> */}
          {!token ? 
          <Login/>
          :
          <Space/>
          }
      {/* </Paper> */}
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
