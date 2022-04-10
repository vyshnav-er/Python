import * as types from './types';

export function tripHistoryRequest(params,apiRgn) {
    return {
      type: types.TRIP_HISTORY_REQUEST,
      params,
      apiRgn
    };
  }

export function tripHistoryResponse(response) {
  return {
    type: types.TRIP_HISTORY_RESPONSE,
    response
  };
}

export function tripHistoryMessageBox(response) {
  return {
    type: types.TRIP_HISTORY_MESSAGEBOX,
    response
  };
}