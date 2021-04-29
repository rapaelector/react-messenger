import { all, takeEvery } from "redux-saga/effects";
import * as counterSaga  from './counterSaga'
import * as authSaga  from './authSaga'
import * as userSaga  from './userSaga'
import * as groupSaga  from './groupSaga'
import * as messageSaga  from './messageSaga'

function * rootSaga() {
    yield all([
        takeEvery('DO_INCREMENT', counterSaga.increment),
        takeEvery('DO_LOGIN', authSaga.login),
        takeEvery('DO_LOGOUT', authSaga.logout),
        takeEvery('DO_CHECK_USER', authSaga.checkUser),
        takeEvery('DO_FETCH_USER_EXPRESS', userSaga.fetchUser),
        takeEvery('DO_FETCH_GROUP_CURRENT_USER', groupSaga.fetchGroupForUser),
        takeEvery('DO_FETCH_MESSAGE_FOR_GROUP', messageSaga.fetchMessageBygroup),
        takeEvery('DO_SAVE_MESSAGE', messageSaga.saveMessage),
    ])
}

export default rootSaga