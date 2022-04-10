import * as types from './types';

export function liveTrackingRequest(params,apiRgn) {
  
    return {
      type: types.LIVETRACKING_REQUEST,
      params,apiRgn
    };
  }

export function liveTrackingResponse(response) {
  return {
    type: types.LIVETRACKING_RESPONSE,
    response
  };
}

// export function driverListRequest(params) {
//   return {
//     type: types.DRIVERLIST_REQUEST,
//     params,
//   };
// }

// export function driverListResponse(response) {
// return {
//   type: types.DRIVERLIST_RESPONSE,
//   response
// };
// }