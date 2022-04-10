import React, { Component } from 'react';
import NotificationView from './notificationView';
import { connect } from 'react-redux';

class NotificationContainer extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    return <NotificationView { ...this.props } />;
  }
}

function mapStateToProps (state) {
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

function mapDispatchToProps (dispatch) {
  return {
   
};
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NotificationContainer);
