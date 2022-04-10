import * as types from './types';

export function handleNetworkChange(isNetworkAvailable) {
  return {
    type: types.HANDLE_NETWORK_CHANGE,
    isNetworkAvailable
  };
}
