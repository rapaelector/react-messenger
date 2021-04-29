import {put, call, select, delay, takeLatest} from "redux-saga/effects";
import * as api from '../components/api'

export function* fetchUser(action) {
    try {
       const response = yield call(api.fetchUsersExpresse, action.payload);
       yield put({type: "FETCH_USERS_EXPRESS", payload: response});
    } catch (error) {
      //  yield put({type: "LOGIN_FAILED", payload: {error: error}});
    }
 }