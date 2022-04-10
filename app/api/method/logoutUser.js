import Api from '../../api';
import ApiConstants from '../apiConstants';

export default function logoutUser(deviceId, token, apiRgn) {
    return Api(
        ApiConstants.SESSIONS + deviceId,
        null,
        'DELETE',
        token,
        apiRgn
    );
}
