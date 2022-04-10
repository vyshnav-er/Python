import * as types from '../../action/types';
let templist=[];
let count=[]
const initialState = {
    list:[],
    loading:false,
    countLength:0
    
};

const notificationListReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.NOTIFICATION_LIST_REQUEST:
      return {
        ...state,
        loading:true
        
      };
      case types.NOTIFICATION_LIST_RESPONSE:
        templist=[]
      
        action.response.map(item => {
          item.selected = false;
          templist.push(item);
       
        });
      
        return {
          ...state,
          loading:false,
          list:templist,
          //countLength:count.length
        };
        case types.NOTIFICATION_LIST_FAILED:
          return {
            ...state,
            list:[],
            
            };
    default:
      return state;
  }
};

export default notificationListReducer;

