import * as types from '../../action/types';
let tempEmptyArray=false
const initialState = {
  tripList: [],
  emptyArray:false
  
};

const tripHistoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.TRIP_HISTORY_REQUEST:
      return {
        ...state,
      };
    case types.TRIP_HISTORY_RESPONSE:
    if(action.response){  
    if(action.response.length==0)
      {
        tempEmptyArray=true
      }
      else {
        tempEmptyArray=false
      }
    }
      return {
        ...state,
        tripList: action.response,
        emptyArray:tempEmptyArray
        
        
      };
      case types.TRIP_HISTORY_MESSAGEBOX:
       tempEmptyArray=false
          return {
            ...state,
            emptyArray:false
            
            
          };
    default:
      return state;
      
  }
  
};

export default tripHistoryReducer;
