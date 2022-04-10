import Api from '../../api';
import ApiConstants from '../apiConstants';

export default function vehicleDetailList(data, apiRgn) {
  return Api(ApiConstants.NOTIFICATION + data.userID + '?count=' + data.limit, null, 'get', data.token, apiRgn)
}
