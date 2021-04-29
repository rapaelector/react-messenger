import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import {grey} from '@material-ui/core/colors';
import green from '@material-ui/core/colors/green';


const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: grey,
  }});

export default theme;