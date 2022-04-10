import * as types from '../../action/types';

const initialState = {
loginMobile:'',
userID:'',
isLogin:false,
accessToken:'',
resp:[],
failed:false,
deviceId:'',
region:'',
FCM:''
};

const loginReducer = (state = initialState, action,region) => {
  switch (action.type) {
    case types.LOGIN_REQUEST:
      return {
        ...state,
        loginMobile:action.params.mobile,
        userID:action.params.userID,
        failed:false
      };
      case types.LOGIN_RESPONSE:
            return {
          ...state,
          isLogin:true,
          resp:action.response,
          //userID:action.response.userid,
          failed:false,
          region:action.region,
          deviceId:action.deviceID

         
        };
        case types.LOGIN_FAILED:
          return {
            ...state,
            failed:true,
            
            };
            case types.LOGIN_CLEAR_FAILED:
              return {
            ...state,
            failed:false,
            
            };
        case types.LOGOUT_RESPONSE:
          return {
            ...state,
            //loginSkip:true,
            isLogin:false,
            region:'',
            resp:[]
            };
        case types.LOGIN_GET_FCM:
                  return{
                ...state,
                FCM:action.FCMTOKEN
              }
    default:
      return state;
  }
};

export default loginReducer;

