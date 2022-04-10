import React, { Component } from 'react';
import SearchView from './searchView';
import { connect } from 'react-redux';
import  * as Actions   from '../../action/index';
import * as vehicleDetailListAction  from '../../action/vehicleDetailListAction';
import * as driverDetailListAction  from '../../action/driverDetailListAction';

// import * as loginActions from '../../actions/loginActions';
// import * as otpActions from '../../actions/otpActions';
import * as loadingAction from '../../action/loadingAction'
class SearchContainer extends Component {
  constructor (props) {
    super(props);
   
  }

  render () {
    return <SearchView { ...this.props } />;
  }
}

function mapStateToProps (state) {
  return {
    Global:state.globalReducer,
    Login: state.loginReducer,
    VehicleList:state.vehicleListReducer,
    DriversList:state.driversListReducer,
    Loading:state.loadingReducer,
    DetailList: state.deatalListReducer,
    MessageBox:state.messageboxReducer
  };
}

function mapDispatchToProps (dispatch) {
  return {
     
    _getvehicleDetails: (data,navigate,apiRgn) => {
      dispatch(vehicleDetailListAction.vehicleDetailListRequest(data,navigate,apiRgn));
    },
    _getdriverDetails: (data,navigate,apiRgn) => {
      dispatch(driverDetailListAction.driverDetailListRequest(data,navigate,apiRgn));
    },
    disableLoader: () => dispatch(loadingAction.disableLoader()),
    EnableLoader:()=>dispatch(loadingAction.enableLoader()),
    _disableMessageBox:()=>dispatch(loadingAction.disableMessagebox()),
    _disableInternalMessageBox:()=>dispatch(loadingAction.disableInternalErrorMessagebox())
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchContainer);
