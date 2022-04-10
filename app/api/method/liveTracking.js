import Api from '../../api';
import ApiConstants from '../apiConstants';

export default function liveTrackng(data,apiRgn) {
  return Api(ApiConstants.LIVETRACKING +data.imeino+'&starttime='+data.starttime+'&endtime='+data.endtime ,null, 'get', data.token,apiRgn);
}
