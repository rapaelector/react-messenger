import { all, takeEvery } from "redux-saga/effects";
import * as counterSaga  from './counterSaga'

function * rootSaga() {
    yield all([
        takeEvery('DO_INCREMENT', counterSaga.increment)
    ])
}

export default rootSaga