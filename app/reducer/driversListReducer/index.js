import * as types from '../../action/types';

const initialState = {
    list:[],
    loading:false
}

const driversListReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.DRIVERLIST_REQUEST:
      return {
        ...state,
        loading:true
        
      };
      case types.DRIVERLIST_RESPONSE:
        let templist=[]
        action.response.map(item => {
          item.selected = false;
          templist.push(item);
        });
        return {
          ...state,
          list:templist,
          loading:false
        };
        case types.LOGOUT_RESPONSE:
          return {
            ...state,
            //loginSkip:true,
            list:[]
            };
    default:
      return state;
  }
};

export default driversListReducer;

