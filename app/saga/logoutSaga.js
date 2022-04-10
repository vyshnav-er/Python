import {put, call, select} from 'redux-saga/effects';
import {delay} from 'redux-saga';
import logoutUser from '../api/method/logoutUser';
import * as vehicleDetailListAction from '../action/vehicleDetailListAction'
import * as vehicleListAction from '../action/vehicleListAction'

import * as logoutActions from '../action/logoutAction';
import * as loadingAction from '../action/loadingAction';

export function* logoutAsync(actions) {
  const response = yield call(logoutUser, actions.params,actions.deviceId,actions.apiRgn);
  if (response[0] == 204) {
    yield put(logoutActions.logoutResponse([]));
    yield put(vehicleDetailListAction.vehicleDetailListResponse([]));
    yield put(vehicleListAction.vehicleListResponse([]));
    yield put(vehicleListAction.driverListResponse([]));
    
    yield put(loadingAction.disableLoader());
    //
  }else {
    yield put(loadingAction.disableLoader());
  }
}
