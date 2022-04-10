import {put, call, select} from 'redux-saga/effects';
import {delay} from 'redux-saga';
import loginUser from '../api/method/loginUser';
import liveTracking from '../api/method/liveTracking';
import * as common from '../config/commonGlobal'
import * as liveTrackingAction from '../action/liveTrackingAction';
import * as loadingAction from '../action/loadingAction';
import * as vehicleDetailListAction from '../action/vehicleDetailListAction'

export function* liveTrackingAsync(actions) {

  const response = yield call(liveTracking, actions.params,actions.apiRgn);
  if (response[0] == 200) {
    
    yield put(vehicleDetailListAction.vehicleDetailListResponse(response[1]));
  }
}

