import {put, call, select} from 'redux-saga/effects';
import {delay} from 'redux-saga';
import loginUser from '../api/method/loginUser';
import vehicleDetailList,{mobilizeVehicle,immobilizeVehicle} from '../api/method/vehicleDetailList';
import * as common from '../config/commonGlobal'
import * as vehicleDetailListAction from '../action/vehicleDetailListAction';
import * as loadingAction from '../action/loadingAction';

export function* vehicleDetailListAsync(actions) {
  const response = yield call(vehicleDetailList, actions.params,actions.apiRgn,actions.type);
  if (response[0] == 200) {
     yield call(actions.navigate)
     
   
    yield put(vehicleDetailListAction.vehicleDetailListResponse(response[1],actions.params.type));
    yield put(loadingAction.disableLoader());
  } else if (response[0]  == 404 ) {
    yield put(loadingAction.enableMessagebox());
    yield put(loadingAction.disableLoader());
  }else {
    yield put(loadingAction.disableLoader());
    yield put(loadingAction.enableInternalErrorMessagebox());
  }
}

export function* mobilizeVehicleAsync(actions) {
  const response = yield call(mobilizeVehicle, actions.params);
  if (response[0] == 200) {
   
    yield put(vehicleDetailListAction.mobilizeVehicleResponse(true));
    yield put(loadingAction.disableLoader());
  } else if (response[0]  == 404 ) {
    yield put(loadingAction.enableMessagebox());
    yield put(loadingAction.disableLoader());
  }else {
    yield put(loadingAction.disableLoader());
    yield put(loadingAction.enableInternalErrorMessagebox());
  }
}

export function* immobilizeVehicleAsync(actions) {
  const response = yield call(immobilizeVehicle, actions.params,actions.apiRgn,actions.type);
  if (response[0] == 200) {
   
    yield put(vehicleDetailListAction.immobilizeVehicleResponse(true));
    yield put(loadingAction.disableLoader());
  } else if (response[0]  == 404 ) {
    yield put(loadingAction.enableMessagebox());
    yield put(loadingAction.disableLoader());
  }else {
    yield put(loadingAction.disableLoader());
    yield put(loadingAction.enableInternalErrorMessagebox());
  }
}
