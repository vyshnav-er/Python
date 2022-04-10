import Api from '../../api';
import ApiConstants from '../apiConstants';

export default function tripHistoryList(data, apiRgn) {
  if (data.categoryType == 'dr') {
    return Api(ApiConstants.TRIPHISTORY + ApiConstants.DRIVERS + data.driverId + '?starttime=' + data.startTime + '&endtime=' + data.endTime, null, 'get', data.token, apiRgn);
  } else {
    return Api(ApiConstants.TRIPHISTORY + data.imeino + '?starttime=' + data.startTime + '&endtime=' + data.endTime, null, 'get', data.token, apiRgn);
  }
}