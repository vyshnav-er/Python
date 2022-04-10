//import createReducer from 'app/lib/createReducer';
import * as types from '../../action/types'

const initialState = {
  isMessagebox: false,
  isInternalMessageBox:false
  
};

const messageboxReducer = (state = initialState, action) => {
    switch (action.type) {
      case types.MESSAGEBOX_ENABLE:
        return {
          ...state,
          isMessagebox:true
        };
        case types.MESSAGEBOX_DISABLE:
          return {
            ...state,
            //loginSkip:true,
            isMessagebox:false
           
          };
          case types.INTERNALERROR_MESSAGEBOX_ENABLE:
            return {
              ...state,
              isInternalMessageBox:true
            };
            case types.INTERNALERROR_MESSAGEBOX_DISABLE:
              return {
                ...state,
                isInternalMessageBox:false  
              };
      default:
        return state;
    }
  };
  
  export default messageboxReducer;