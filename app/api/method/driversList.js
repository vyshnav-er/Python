import Api from '../../api';
import ApiConstants from '../apiConstants';

export default function driversList(token,apiRgn) {
   return Api(ApiConstants.DRIVERS ,null, 'get', token,apiRgn);
 }