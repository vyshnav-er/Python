import {put, call, select} from 'redux-saga/effects';
import vehicleList from '../api/method/vehicleList';

import * as vehicleListAction from '../action/vehicleListAction';
import * as loadingAction from '../action/loadingAction';

export function* vehicleListAsync(actions) {

  const response = yield call(vehicleList,actions.token,actions.apiRgn);
  
  if (response[0] == 200) {
    yield put(vehicleListAction.vehicleListResponse(response[1]));
    yield put(loadingAction.disableLoader());
  }
  else if (response[0]  == 401 ) {
    yield put(loadingAction.disableLoader());
    yield put(loadingAction.enableMessagebox());
  
  }
  else if (response[0]  == 404 ) {
    yield put(loadingAction.disableLoader());
  }else {
    yield put(loadingAction.disableLoader());
  }
}