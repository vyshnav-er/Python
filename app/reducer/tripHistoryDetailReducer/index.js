import * as types from '../../action/types';
let tempList=[]
const initialState = {
  tripListDetails: [],
  
};

const tripHistoryDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.TRIP_HISTORY_DETAIL_REQUEST:
      return {
        ...state,
      };
    case types.TRIP_HISTORY_DETAIL_RESPONSE:
      tempList=[]
      action.response.map(item => {
         item.selected = false;
         tempList.push(item);
       });
      return {
        ...state,
        tripListDetails: tempList,
        
      };
    default:
      return state;
      
  }
  
};

export default tripHistoryDetailReducer;
