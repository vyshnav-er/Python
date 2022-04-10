import {put, call, select} from 'redux-saga/effects';
import {delay} from 'redux-saga';
import loginUser from '../api/method/loginUser';
import driverDetailList from '../api/method/driverDetailList';
import * as common from '../config/commonGlobal'
import * as vehicleDetailListAction from '../action/vehicleDetailListAction';
import * as loadingAction from '../action/loadingAction';
export function* driverDetailListAsync(actions) {
  const response = yield call(driverDetailList, actions.params,actions.apiRgn,actions.type);
  
  if (response[0] == 200) {
    yield put(vehicleDetailListAction.vehicleDetailListResponse(response[1],actions.params.type));
    yield put(loadingAction.disableLoader());
    yield call(actions.navigate)
  }else if (response[0]  == 401 ) {
    yield put(loadingAction.disableLoader());
    yield put(loadingAction.enableMessagebox());
  
  } else if (response[0]  == 404 ) {
    yield put(loadingAction.enableMessagebox());
    yield put(loadingAction.disableLoader());
  }else {
    yield put(loadingAction.disableLoader());
    yield put(loadingAction.enableInternalErrorMessagebox());
  }
}
