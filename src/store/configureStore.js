import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers';

const persistConfig = {
  key: 'root',
  storage,
  whiteList:['counter']
};

const composeEnhancers =  typeof window === 'object' && window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] ? 
      window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']({ }) : compose;
      
const sagaMiddleware = createSagaMiddleware();
const enhancer = composeEnhancers(
    applyMiddleware(sagaMiddleware /*other middleware*/),
            /* other store enhancers if any */
);

const persistedReducer = persistReducer(persistConfig, rootReducer);

let store = createStore(persistedReducer, enhancer);
let persistor = persistStore(store);

export { store, persistor, sagaMiddleware };