import React, { Component } from 'react';
import LoginView from './loginView';
import { connect } from 'react-redux';
import * as LoginAction from '../../action/loginAction';
import * as loadingAction from '../../action/loadingAction'

class LoginContainer extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    return <LoginView { ...this.props } />;
  }
}

function mapStateToProps (state) {
  return {
   // Login:state.loginReducer,
    ISLogin:state.loginReducer,
    // Key: state.keyReducer,
     //Global:state.globalReducer,
     VehicleList:state.vehicleListReducer,
    // Login: state.loginReducer,
     Loading:state.loadingReducer
  };
}

function mapDispatchToProps (dispatch) {
  return {
    
    _isLogin: () => dispatch(LoginAction.loginResponse()),
    disableLoader: () => dispatch(loadingAction.disableLoader()),
    Login:(params,deviceId,apiRgn)=>dispatch(LoginAction.loginRequest(params,deviceId,apiRgn)),
    LoginFailed:()=>dispatch(LoginAction.loginClearFailed()),
    EnableLoader:()=>dispatch(loadingAction.enableLoader()),
    getsms: (params,navigate) =>
      dispatch(getsmsAction.getsmsRequest(params,navigate)),
    // onVerifyOtp: ( key, encryptedData) =>
    //   dispatch(otpActions.otpVerificationRequest(key, encryptedData)),
    // onResendOtp: ( key, encryptedData) =>
    //     dispatch(loginActions.resendOtpRequest(key, encryptedData)),
    // onPrivacyTermsAboutFetch: ( key, encryptedData) =>
    //    dispatch(loginActions.privacytermsaboutfetchRequest(key, encryptedData))
  //  getKey: () => dispatch(Actions.userActions.masterDataRequest),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginContainer);
