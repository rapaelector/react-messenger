import {put, call, select, delay} from "redux-saga/effects";

export function* increment(){
    yield put({type:'DO_INCREENT'})
}