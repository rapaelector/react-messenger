import {put, call, select, delay, takeLatest} from "redux-saga/effects";
import * as api from '../components/api'

export function* fetchMessageBygroup(action) {
    try {
       const response = yield call(api.fetchMessageByGroup, action.payload);
       yield put({type: "FETCH_MESSAGE_FOR_GROUP", payload: response});
    } catch (error) {
      //  yield put({type: "LOGIN_FAILED", payload: {error: error}});
    }
 }

export function* saveMessage(action) {
    try {
       const response = yield call(api.createMessage, action.payload);
       yield put({type: "FETCH_MESSAGE_FOR_GROUP", payload: response});
    } catch (error) {
      //  yield put({type: "LOGIN_FAILED", payload: {error: error}});
    }
 }