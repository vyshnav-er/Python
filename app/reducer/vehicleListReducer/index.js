import * as types from '../../action/types';
let templist=[];
const initialState = {
    list:[],
    loading:false
    
};

const vehicleListReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.VEHICLELIST_REQUEST:
      return {
        ...state,
        loading:true
        
      };
      case types.VEHICLELIST_RESPONSE:
        templist=[]
        action.response.map(item => {
          item.selected = false;
          templist.push(item);
        });
      
        return {
          ...state,
          loading:false,
          list:templist
        };
        case types.LOGOUT_RESPONSE:
          return {
            ...state,
            list:[],
            
            };
    default:
      return state;
  }
};

export default vehicleListReducer;

