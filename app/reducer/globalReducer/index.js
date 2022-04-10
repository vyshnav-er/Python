

import * as types from '../../action/types';

const initialState = {
    isNetworkAvailable:false,
    currentScreen:""
};

const globalReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.HANDLE_NETWORK_CHANGE:
      return {
        ...state,
        isNetworkAvailable:action.isNetworkAvailable
      };
   
    default:
      return state;
  }
};

export default globalReducer;
