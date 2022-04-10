import * as types from './types';

export function vehicleDetailListRequest(params,navigate,apiRgn) {
    return {
      type: types.VEHICLE_DETAILLIST_REQUEST,
      params,
      navigate,
      apiRgn
    };
  }

export function vehicleDetailListResponse(response,category) {
  return {
    type: types.VEHICLE_DETAILLIST_RESPONSE,
    response,
    category
    
  };
}

export function vehicleDetailListChangeScreen(response) {
  return {
    type: types.VEHICLE_DETAILLIST_CHANGE_SCREEN,
    response
  };
}

export function vehicleDetailListMessageBoxDisable() {
  return {
    type: types.VEHICLE_DETAILLIST_FAILED,
    
  };
}

export function vehicleDetailListMessageBoxEnable() {
  return {
    type: types.VEHICLE_DETAILLIST_FAILED,
    
  };
}

export function mobilizeVehicleRequest(params) {
  // console.log("in action",params);
  return {
    type: types.VEHICLE_MOBILIZE_REQUEST,
    params
  };
}

export function immobilizeVehicleRequest(params) {
  return {
    type: types.VEHICLE_IMMOBILIZE_REQUEST,
    params
  };
}

export function mobilizeVehicleResponse(response) {
  return {
    type: types.VEHICLE_MOBILIZE_RESPONSE,
    response
  };
}

export function immobilizeVehicleResponse(response) {
  return {
    type: types.VEHICLE_IMMOBILIZE_RESPONSE,
    response
  };
}

