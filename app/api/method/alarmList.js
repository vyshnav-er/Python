import Api from '../../api';
import ApiConstants from '../apiConstants';

export default function alarmList(data,apiRgn) {
  if(data.categoryType=='dr')
  {
    return Api(ApiConstants.DRIVERS+ data.driverid +'/alarms' ,null, 'get', data.token,apiRgn);  
  }  
  else
  {
    return Api(ApiConstants.VEHICLES+ data.imeino +'/alarms' ,null, 'get', data.token,apiRgn);
  }
}
