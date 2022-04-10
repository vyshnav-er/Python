import * as types from '../../action/types';

const initialState = {
    list:[],
}

const liveTrackingReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LIVETRACKING_REQUEST:
      return {
        ...state,
        
      };
      case types.LIVETRACKING_RESPONSE:
        
        return {
          ...state,
          list:action.response
        };
    default:
      return state;
  }
};

export default liveTrackingReducer;

