import Api from '../../api';
import ApiConstants from '../apiConstants';

export default function notificationStatus(data, body, apiRgn) {
  return Api(ApiConstants.NOTIFICATION + data.notificationID, body, 'put', data.token, apiRgn)
}
