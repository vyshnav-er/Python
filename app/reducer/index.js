import loginReducer from './loginReducer';
import globalReducer from './globalReducer';
import vehicleListReducer from './vehicleListReducer';
import detailListReducer from './detailListReducer'
import loadingReducer from './loadingReducer';

import tripHistoryReducer from './tripHistoryReducer'
import tripHistoryDetailReducer from './tripHistoryDetailReducer'
import alarmListReducer from './alarmListReducer';
import driversListReducer from './driversListReducer';
import messageboxReducer from './messageboxReducer';
import liveTrackingReducer from './liveTrackingReducer';
import notificationListReducer from './notificationListReducer';

const rootReducer = {
  loginReducer,
  loadingReducer,
  globalReducer,
  vehicleListReducer,
  detailListReducer,
  tripHistoryReducer,
  tripHistoryDetailReducer,
  alarmListReducer,
  driversListReducer,
  messageboxReducer,
  liveTrackingReducer,
  notificationListReducer

 // messageboxReducerboxReducer

};
export default rootReducer;
