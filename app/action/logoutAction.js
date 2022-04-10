import * as types from './types';

export function logoutRequest(params,deviceId,demo,apiRgn) {
    return {
      type: types.LOGOUT_REQUEST,
      params,
      deviceId,
      apiRgn
    };
  }

export function logoutResponse(response) {
  return {
    type: types.LOGOUT_RESPONSE,
    response
  };
}