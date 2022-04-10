import * as types from '../../action/types';
let tempList=[]
const initialState = {
  list:[],
  screen:false,
  showMessage:false,
  type:'',
  Mobilize:null,
  isLoading:false,
};

const detailListReducer = (state = initialState, action) => {
  switch (action.type) {
    
      case types.VEHICLE_MOBILIZE_REQUEST:
      return {
        ...state,
        isLoading: true
      };
      case types.VEHICLE_IMMOBILIZE_REQUEST:
      return {
        ...state,
        isLoading: true
        
      };
      case types.VEHICLE_MOBILIZE_RESPONSE:
      return {
        ...state,
        isLoading: false,
        Mobilize: {isMobilize : action?.response,
                    text  : 'mobilized',
                    color : 'green'
                  }
                }
      case types.VEHICLE_IMMOBILIZE_RESPONSE:
      return {
        ...state,
        isLoading: false,
        Mobilize: {isMobilize : action?.response,
          text  : 'immobilized',
          color : 'red'
        }
      };
      case types.VEHICLE_DETAILLIST_REQUEST:
      return {
        ...state,
        
      };
      case types.VEHICLE_DETAILLIST_RESPONSE:
       
//  tempList=action.response.map((marker, index) => ({
//           latitude: JSON.parse(marker.lat),
//           longitude: JSON.parse(marker.lang),
//         }));
        return {
          ...state,
          list:action.response,
          type:action.category,
         // coords:tempList,
         showMessage:true,
         screen:true
          };
      case types.VEHICLE_DETAILLIST_FAILED:
            return {
              ...state,
              list:[],
              
             // showMessage:false
              };
              case types.VEHICLE_DETAILLIST_CHANGE_SCREEN:
            return {
              ...state,
              screen:false
             // showMessage:false
              };
              
    default:
      return state;
  }
};

export default detailListReducer;

