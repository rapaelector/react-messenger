import logo from './logo.svg';
import './App.css';
import {Button, Typography} from '@material-ui/core'

function App() {
  return (
    <div className="App">
      <Typography variant="h1" align='left' color='error' gutterBottom={true}>Hello</Typography>
      <Button variant='outlined' color='primary'>This is my first button</Button>
    </div>
  );
}

export default App;
