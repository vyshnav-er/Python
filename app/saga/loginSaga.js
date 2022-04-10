import {put, call, select} from 'redux-saga/effects';
import {delay} from 'redux-saga';
import loginUser from '../api/method/loginUser';

import * as loginActions from '../action/loginAction';
import * as loadingAction from '../action/loadingAction';

export function* loginAsync(actions) {
  const response = yield call(loginUser, actions.params, actions.deviceId,actions.apiRgn);
 let region = actions.params.rgn;
  if (response[0] == 201) {
    yield put(loginActions.loginResponse(response[1],region,actions.deviceId));
    yield put(loadingAction.disableLoader());
  }else if (response[0]  == 401 ) {
    yield put(loginActions.loginFailed());
    yield put(loadingAction.disableLoader());
  } else {
    yield put(loadingAction.disableLoader());
  }
}
