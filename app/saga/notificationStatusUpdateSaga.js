import {put, call, select} from 'redux-saga/effects';
import {delay} from 'redux-saga';
import loginUser from '../api/method/loginUser';
import notificationStatus from '../api/method/notificationStatus';
import * as common from '../config/commonGlobal'
import * as notificationListAction from '../action/notificationListAction';
import * as loadingAction from '../action/loadingAction';

export function* notificationStatusUpdateAsync(actions) {
  const response = yield call(notificationStatus, actions.response,actions.body,actions.apiRgn);
  if (response[0] == 200) {
   
  } else if (response[0]  == 404 ) {
   
  }else {
   
  }
}
