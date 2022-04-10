import Api from '../../api';
import LegacyApi from '../../api/api';
import ApiConstants from '../apiConstants';

const LegacyAppParam = true;

export default function vehicleDetailList(data, apiRgn) {
  return Api(ApiConstants.VEHICLESDETAILS + data.type + '&val=' + data.imeino, null, 'get', data.token, apiRgn)
}

export const  mobilizeVehicle = (data) =>{
  return LegacyApi(`${ApiConstants.MOBILIZE}&cids=${data.imeino}&operate=${data.operate}&param=${data.param}&mobile=Y`, null, 'post', data.token, data.region,LegacyAppParam)
}

export const  immobilizeVehicle = (data) =>{
  return LegacyApi(`${ApiConstants.MOBILIZE}&cids=${data.imeino}&operate=${data.operate}&param=${data.param}&mobile=Y`, null, 'post', data.token, data.region,LegacyAppParam)
}
