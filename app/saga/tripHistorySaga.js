import {put, call, select} from 'redux-saga/effects';
import tripHistoryList from '../api/method/tripHistoryList';

import * as tripHistoryAction from '../action/tripHistoryAction';
import * as loadingAction from '../action/loadingAction';

export function* tripHistoryListAsync(actions) {
 
  const response = yield call(tripHistoryList, actions.params,actions.apiRgn);
  if (response[0] == 200) {
    yield put(tripHistoryAction.tripHistoryResponse(response[1]));
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
