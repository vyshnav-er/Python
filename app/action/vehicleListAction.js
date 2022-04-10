import * as types from './types';

export function vehicleListRequest(token,apiRgn,deviceID) {
    return {
      type: types.VEHICLELIST_REQUEST,
      token,
      apiRgn,
      deviceID
    };
  }

export function vehicleListResponse(response) {
  return {
    type: types.VEHICLELIST_RESPONSE,
    response
  };
}

export function driverListRequest(token,apiRgn,) {
  return {
    type: types.DRIVERLIST_REQUEST,
    token,
    apiRgn,
    
  };
}

export function driverListResponse(response) {
return {
  type: types.DRIVERLIST_RESPONSE,
  response
};
}