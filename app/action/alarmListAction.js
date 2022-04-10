import * as types from './types';

export function alarmListRequest(params,apiRgn) {
    return {
      type: types.ALARM_LIST_REQUEST,
      params,
      apiRgn
    };
  }

export function alarmListResponse(response) {
  return {
    type: types.ALARM_LIST_RESPONSE,
    response
  };
}