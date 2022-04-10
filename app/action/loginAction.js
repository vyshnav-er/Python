import * as types from './types';

export function loginRequest(params,deviceId,apiRgn) {
    return {
      type: types.LOGIN_REQUEST,
      params,
      deviceId,
      apiRgn,
      
    };
  }

export function loginResponse(response,region,deviceID) {
  return {
    type: types.LOGIN_RESPONSE,
    response,
    region,
    deviceID
  };
}
export function loginFailed(response) {
  return {
    type: types.LOGIN_FAILED,
    response
  };
}
 
export function loginClearFailed(response) {
    return {
      type: types.LOGIN_CLEAR_FAILED,
      response
    };
}

export function loginGetFcm(FCMTOKEN){
  return{
      type:types.LOGIN_GET_FCM,
      FCMTOKEN
  };
}