import {takeLatest, all} from 'redux-saga/effects';
import * as types from '../action/types';

import * as loginSaga from './loginSaga';
import * as logoutSaga from './logoutSaga';
import * as vehicleListSaga from './vehicleListSaga';
import * as vehicleDetailSaga from './vehicleDetailSaga';
import * as tripHistorySaga  from './tripHistorySaga';
import * as tripHistoryDetailSaga from './tripHistoryDetailSaga';
import * as alarmListSaga from './alarmListSaga';
import * as driversListSaga from './driversListSaga';
import * as liveTrackingSaga from './liveTrackingSaga'
import * as driverDetailListSaga from './driverDetailListSaga'
import * as notificationListSaga from './notificationListSaga'
import * as notificationStatusUpdateAsync from './notificationStatusUpdateSaga'
export default function* watch() {
  yield all([takeLatest(types.LOGIN_REQUEST, loginSaga.loginAsync)]);
  yield all([takeLatest(types.LOGOUT_REQUEST, logoutSaga.logoutAsync)]);
  yield all([takeLatest(types.VEHICLELIST_REQUEST, vehicleListSaga.vehicleListAsync)]);
  yield all([takeLatest(types.DRIVERLIST_REQUEST, driversListSaga.driversListAsync)]);
  yield all([takeLatest(types.VEHICLE_DETAILLIST_REQUEST, vehicleDetailSaga.vehicleDetailListAsync)]);
  yield all([takeLatest(types.VEHICLE_MOBILIZE_REQUEST, vehicleDetailSaga.mobilizeVehicleAsync)]);
  yield all([takeLatest(types.VEHICLE_IMMOBILIZE_REQUEST, vehicleDetailSaga.immobilizeVehicleAsync)]);
  yield all([takeLatest(types.DRIVER_DETAILLIST_REQUEST, driverDetailListSaga.driverDetailListAsync)]);
  yield all([takeLatest(types.TRIP_HISTORY_REQUEST, tripHistorySaga.tripHistoryListAsync)]);
  yield all([takeLatest(types.TRIP_HISTORY_DETAIL_REQUEST, tripHistoryDetailSaga.tripHistoryDetailAsync)]);
  yield all([takeLatest(types.ALARM_LIST_REQUEST, alarmListSaga.alarmListAsync)]);
  yield all ([takeLatest(types.LIVETRACKING_REQUEST, liveTrackingSaga.liveTrackingAsync)]);
  yield all ([takeLatest(types.NOTIFICATION_LIST_REQUEST, notificationListSaga.notificationListAsync)]);
  yield all ([takeLatest(types.NOTIFICATION_STATUS_UPDATE, notificationStatusUpdateAsync.notificationStatusUpdateAsync)]);
 // yield all([takeLatest(types.GETSMS_REQUEST, getsmsSaga.getsmsAsync)]);
  
}
