import Api from '../../api';
import ApiConstants from '../apiConstants';

export default function vehicleList(token, apiRgn) {
  return Api(ApiConstants.VEHICLES, null, 'get', token, apiRgn);
}


