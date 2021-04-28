import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from '../reducers';
import createSagaMiddleware, {END} from 'redux-saga';
import sagas from '../sagas';
import {saveState} from "./localStorage";


const sagaMiddleware = createSagaMiddleware();


/**
 * This function is responsible to configure the PROD store
 * @param persistedState
 * @returns {Store<any, Action<any>> & Store<S & {}, A> & {dispatch: any}}
 */
function configureStoreProd(persistedState) {

    const middlewares = [
        sagaMiddleware
    ];

    const store = createStore(rootReducer,
        persistedState || {},
        compose(
            applyMiddleware(...middlewares)
        )
    );

    //Subscribe saveState function as a listener
    //saveState function will be called every time the state change
    store.subscribe(() => {
        saveState( {
            auth: store.getState().auth
        });
    });

    sagaMiddleware.run(sagas);
    store.close = () => store.dispatch(END);

    return store;
}

/**
 * This function is responsible to configure the DEV store
 * @param persistedState
 * @returns {any}
 */
function configureStoreDev(persistedState) {
    const logger = (store) => (next) => (action) => {
        next(action);
        console.log(action);
    };

    const middlewares = [
        sagaMiddleware,
       //logger
    ];

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools

    const store = createStore(
        rootReducer,
        persistedState || {},
        composeEnhancers(applyMiddleware(...middlewares))
    );

    //Subscribe saveState function as a listener
    //saveState function will be called every time the state change
    store.subscribe(() => {
        saveState( {
            auth: store.getState().auth
        });
    });

    sagaMiddleware.run(sagas);
    store.close = () => store.dispatch(END);

    return store;
}
//Check if we are in DEV or PROD and configure the corresponding store
const configureStore = process.env.NODE_ENV === 'production' ? configureStoreProd : configureStoreDev;

export default configureStore;
