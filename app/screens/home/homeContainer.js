import React, {Component} from 'react';
import HomeView from './homeView';
import {connect} from 'react-redux';
import Actions from '../../action/index';
class HomeContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <HomeView {...this.props} />;
  }
}

function mapStateToProps(state) {
  return {
    VehicleList: state.vehicleListReducer,
    DriversList:state.driversListReducer,
    DetailList:state.detailListReducer,
    Login: state.loginReducer,
    Loading: state.loadingReducer,
    Notification:state.notificationListReducer,
    LiveTracking:state.liveTrackingReducer
    , MessageBox:state.messageboxReducer
  };
}

function mapDispatchToProps(dispatch) {
  
  return {
    getVehicleList: (token,apiRgn,deviceID) => {
      dispatch(Actions.vehicleListAction.vehicleListRequest(token,apiRgn,deviceID));
    },
    getDriversList: (token,apiRgn) => {
      dispatch(Actions.vehicleListAction.driverListRequest(token,apiRgn));
    },
    setMobilize: (data) =>{
      dispatch(Actions.vehicleDetailListAction.mobilizeVehicleRequest(data));
    },
    setImmobilize: (data,token,apiRgn) =>{
      dispatch(Actions.vehicleDetailListAction.immobilizeVehicleRequest(data,token,apiRgn));
    },
    _disableMessageBox:()=>dispatch(Actions.loadingAction.disableMessagebox()),
    EnableLoader: () => dispatch(Actions.loadingAction.enableLoader()),
    disableLoader: () => dispatch(Actions.loadingAction.disableLoader()),
    getliveTracking: (data,apiRgn) => {
      dispatch(Actions.liveTrackingAction.liveTrackingRequest(data,apiRgn));
    
    },_getNotificationList: (data,apiRgn) => {
      dispatch(Actions.notificationListAction.notificationListRequest(data,apiRgn));
    },
    _logout:( deviceId,token,navigate,apiRgn )=> dispatch(Actions.logoutAction.logoutRequest(deviceId,token,navigate,apiRgn)),
        clearDetailList:()=>dispatch(Actions.vehicleDetailListAction.vehicleDetailListResponse()),
        changeScreen:()=>{dispatch(Actions.vehicleDetailListAction.vehicleDetailListChangeScreen())}
    // getKey: () => dispatch(keyActions.keyRequest()),
    // onLogin: (mobile, key, encryptedData) =>
    //   dispatch(loginActions.loginRequest(mobile, key, encryptedData)),
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
)(HomeContainer);
