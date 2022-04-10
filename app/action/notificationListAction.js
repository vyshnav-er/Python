import * as types from './types';

export function notificationListRequest(params,apiRgn) {
    return {
      type: types.NOTIFICATION_LIST_REQUEST,
      params,
      apiRgn
    };
  }

export function notificationListResponse(response) {
  return {
    type: types.NOTIFICATION_LIST_RESPONSE,
    response
  };
}

export function notificationStatusUpdate(response,body,apiRgn) {
  
  return {
    type: types.NOTIFICATION_STATUS_UPDATE,
    response,
    body,
    apiRgn
  };
}