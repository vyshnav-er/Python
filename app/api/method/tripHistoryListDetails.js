import Api from '../../api';
import ApiConstants from '../apiConstants';

export default function tripHistoryDetail(data, apiRgn) {
  return Api(ApiConstants.TRIPHISTORYDETAILS + data.imeino + '?starttime=' + data.startTime + '&endtime=' + data.endTime, null, 'get', data.token, apiRgn);
}