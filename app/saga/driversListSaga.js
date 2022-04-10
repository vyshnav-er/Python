import {put, call, select} from 'redux-saga/effects';
import {delay} from 'redux-saga';
import loginUser from '../api/method/loginUser';
import driversList from '../api/method/driversList';

import * as vehicleListAction from '../action/vehicleListAction';
import * as loadingAction from '../action/loadingAction';

export function* driversListAsync(actions) {
  const response = yield call(driversList, actions.token,actions.apiRgn);
  if (response[0] == 200) {
    yield put(vehicleListAction.driverListResponse(response[1]));
    yield put(loadingAction.disableLoader());
  } else {
    yield put(loadingAction.disableLoader());

  }
}
export function* resendOtpAsync(actions) {
  const params = {
    key: actions.key,
    data: actions.encryptedData,
  };
  const response = yield call(resendOtp, params);

  if (response.status) {
  } else {
    response.message == 'no key'
      ? keyActions.keyRequest()
      : loginActions.resendOtpRequest(actions.key, actions.encryptedData);
  }
}
