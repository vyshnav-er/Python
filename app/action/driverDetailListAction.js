import * as types from './types';

export function driverDetailListRequest(params,navigate,apiRgn) {
    return {
      type: types.DRIVER_DETAILLIST_REQUEST,
      params,
      navigate,
      apiRgn
    };
  }

export function driverDetailListResponse(response) {
  return {
    type: types.DRIVER_DETAILLIST_RESPONSE,
    response
  };
}

export function driverDetailListChangeScreen(response) {
  return {
    type: types.DRIVER_DETAILLIST_CHANGE_SCREEN,
    response
  };
}

export function driverDetailListMessageBoxDisable() {
  return {
    type: types.DRIVER_DETAILLIST_FAILED,
    
  };
}

export function vehicleDetailListMessageBoxEnable() {
  return {
    type: types.VEHICLE_DETAILLIST_FAILED,
    
  };
}

