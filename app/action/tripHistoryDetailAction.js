import * as types from './types';

export function tripHistoryDetailRequest(params,navigate,apiRgn) {
    return {
      type: types.TRIP_HISTORY_DETAIL_REQUEST,
      params,
      navigate,
      apiRgn
    };
  }

export function tripHistoryDetailResponse(response) {
  return {
    type: types.TRIP_HISTORY_DETAIL_RESPONSE,
    response
  };
}