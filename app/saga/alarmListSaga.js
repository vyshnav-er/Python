import {put, call, select} from 'redux-saga/effects';
import {delay} from 'redux-saga';
import loginUser from '../api/method/loginUser';
import alarmList from '../api/method/alarmList';

import * as alarmListAction from '../action/alarmListAction';
import * as loadingAction from '../action/loadingAction';

export function* alarmListAsync(actions) {
  const response = yield call(alarmList, actions.params,actions.apiRgn);
  if (response[0] == 200) {
    yield put(alarmListAction.alarmListResponse(response[1]));
    yield put(loadingAction.disableLoader());
  }  else if (response[0]  == 401 ) {
    yield put(loadingAction.disableLoader());
    yield put(loadingAction.enableMessagebox());
  
  }else {
    yield put(loadingAction.disableLoader());
  }
}

