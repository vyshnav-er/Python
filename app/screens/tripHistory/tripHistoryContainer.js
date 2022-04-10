import React, {Component} from 'react';
import TripHistoryView from './tripHistoryView';
import {connect} from 'react-redux';
import Actions from '../../action/index';
class TripHistoryContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <TripHistoryView {...this.props} />;
  }
}

function mapStateToProps(state) {
  return {
    VehicleList: state.vehicleListReducer,
    DetailList: state.detailListReducer,
    TripHistoryList: state.tripHistoryReducer,
    // NeededList:state.neededReducer,
    // ISLogin:state.loginReducer,
    //  Global:state.globalReducer,
    //  SMS:state.getsmsReducer
    Login: state.loginReducer,
    Loading: state.loadingReducer,
    MessageBox: state.messageboxReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    _getTripHistoryList: (data, apiRgn) => {
      dispatch(Actions.tripHistoryAction.tripHistoryRequest(data, apiRgn));
    },
    _clearTripHistoryList: () => {
      dispatch(Actions.tripHistoryAction.tripHistoryResponse());
    },
    EnableLoader: () => dispatch(Actions.loadingAction.enableLoader()),
    disableLoader: () => dispatch(Actions.loadingAction.disableLoader()),
    _clearTripHistoryDetailList: () => {
      dispatch(Actions.vehicleDetailListAction.vehicleDetailListResponse([]));
    },
    _disableMessageBox: () =>
      dispatch(Actions.loadingAction.disableMessagebox()),
    _disableInternalMessageBox: () => {
      dispatch(Actions.loadingAction.disableInternalErrorMessagebox());
    },
    _disableTripListMessageBox: () => {
      dispatch(Actions.tripHistoryAction.tripHistoryMessageBox());
    },
    _getTripHistoryDetailList: (data, navigate, apiRgn) => {
      dispatch(
        Actions.tripHistoryDetailAction.tripHistoryDetailRequest(
          data,
          navigate,
          apiRgn,
        ),
      );
    },
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
)(TripHistoryContainer);
