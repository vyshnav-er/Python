import {put, call, select} from 'redux-saga/effects';
import tripHistoryListDetails from '../api/method/tripHistoryListDetails';

import * as tripHistoryDetailAction from '../action/tripHistoryDetailAction';
import * as loadingAction from '../action/loadingAction';

export function* tripHistoryDetailAsync(actions) {
 
  const response = yield call(tripHistoryListDetails, actions.params,actions.apiRgn);
  if (response[0] == 200) {
    yield call(actions.navigate)
    yield put(tripHistoryDetailAction.tripHistoryDetailResponse(response[1]));
    yield put(loadingAction.disableLoader());
  } else if (response[0]  == 404 ) {
    yield put(loadingAction.enableMessagebox());
    yield put(loadingAction.disableLoader());
   } else {
    yield put(loadingAction.enableInternalErrorMessagebox());
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
