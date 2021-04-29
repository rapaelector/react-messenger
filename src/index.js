import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './themes/theme'
import darkTheme from './themes/darkTheme'
import { Provider } from 'react-redux'
import { store, persistor, sagaMiddleware } from './store/configureStore';
import rootSaga from './sagas'
import { PersistGate } from 'redux-persist/integration/react';
import { Paper } from '@material-ui/core';

sagaMiddleware.run(rootSaga);



ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
          <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
