import React, {Component} from 'react';
import VehicleDetailView from './vehicleDetailView';
import {connect} from 'react-redux';
import Actions from '../../action/index';
class vehicleDetailContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <VehicleDetailView {...this.props} />;
  }
}

function mapStateToProps(state) {
  return {
    VehicleList: state.vehicleListReducer,
    DetailList: state.detailListReducer,
    // WalkThrough: state.userReducer,
    // NeededList:state.neededReducer,
    // ISLogin:state.loginReducer,
    //  Global:state.globalReducer,
    //  SMS:state.getsmsReducer
    Login: state.loginReducer,
    Loading: state.loadingReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getVehicleList: token => {
      dispatch(Actions.vehicleListAction.vehicleListRequest(token));
    },
    EnableLoader: () => dispatch(Actions.loadingAction.enableLoader()),
    disableLoader: () => dispatch(Actions.loadingAction.disableLoader()),
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
)(vehicleDetailContainer);
