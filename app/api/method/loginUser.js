import Api from '../../api';
import ApiConstants from '../apiConstants';

export default function loginUser(params, deviceId, apiRgn) {
    return Api(
        ApiConstants.SESSIONS + deviceId,
        params,
        'post',
        null,
        apiRgn
    );
}
