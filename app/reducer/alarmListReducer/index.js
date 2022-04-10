import * as types from '../../action/types';
import Actions from '../../action';
let list=[]
const initialState = {
    alarmList:[],
   
};

const alarmListReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ALARM_LIST_REQUEST:
      return {
        ...state,
        
      };
      case types.ALARM_LIST_RESPONSE:
        list=[];
        action.response.map(item => {
          item.selected = false;
          list.push(item);
        });
        return {
          ...state,
          
          alarmList:list
        };
    default:
      return state;
  }
};

export default alarmListReducer;

