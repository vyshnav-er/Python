//import createReducer from 'app/lib/createReducer';
import * as types from '../../action/types'

const initialState = {
  isLoading: false,
  success: null,
  isUpdateCalled:false,
  versionCode:9,
  isKeyboard:false,
  isFindPs:false
};

const loadingReducer = (state = initialState, action) => {
    switch (action.type) {
      case types.ENABLE_LOADER:
        return {
          ...state,
          isLoading:true
        };
        case types.DISABLE_LOADER:
          return {
            ...state,
            //loginSkip:true,
            isLoading:false
           
          };
      default:
        return state;
    }
  };
  
  export default loadingReducer;