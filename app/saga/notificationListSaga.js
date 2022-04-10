import {put, call, select} from 'redux-saga/effects';
import {delay} from 'redux-saga';
import loginUser from '../api/method/loginUser';
import notificationList from '../api/method/notificationList';
import * as common from '../config/commonGlobal'
import * as notificationListAction from '../action/notificationListAction';
import * as loadingAction from '../action/loadingAction';

export function* notificationListAsync(actions) {
  const response = yield call(notificationList, actions.params,actions.apiRgn);
  if (response[0] == 200) {
    yield put(notificationListAction.notificationListResponse(response[1],actions.params.type));
    yield put(loadingAction.disableLoader());
  //  yield call(actions.navigate)
  } else if (response[0]  == 404 ) {
    yield put(loadingAction.enableMessagebox());
    yield put(loadingAction.disableLoader());
  }else {
    yield put(loadingAction.disableLoader());
    yield put(loadingAction.enableInternalErrorMessagebox());
  }
}
