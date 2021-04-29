import {put, call, select, delay, takeLatest} from "redux-saga/effects";
import * as api from '../components/api'

export function* fetchGroupForUser(action) {
    try {
       const response = yield call(api.fetchGroupExpress, action.payload);
       yield put({type: "FETCH_CHANEL_CURRENT_USER", payload: response});
    } catch (error) {
      //  yield put({type: "LOGIN_FAILED", payload: {error: error}});
    }
 }