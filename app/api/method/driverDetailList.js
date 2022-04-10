import Api from '../../api';
import ApiConstants from '../apiConstants';

export default function vehicleDetailList(data, apiRgn) {
  return Api(ApiConstants.VEHICLESDETAILS + data.type + '&val=' + data.rfid, null, 'get', data.token, apiRgn)
}
