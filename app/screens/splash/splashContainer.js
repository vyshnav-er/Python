import React, { Component } from 'react';
import SplashView from './splashView';
import { connect } from 'react-redux';
import  * as Actions   from '../../action/index';
import * as globalActions  from '../../action/globalAction';
// import * as loginActions from '../../actions/loginActions';
// import * as otpActions from '../../actions/otpActions';

class SplashContainer extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    return <SplashView { ...this.props } />;
  }
}

function mapStateToProps (state) {
  return {
    Global:state.globalReducer,
    Login: state.loginReducer,
  };
}

function mapDispatchToProps (dispatch) {
  return {
     
    handleNetworkChange: isNetworkAvailable =>
    dispatch(globalActions.handleNetworkChange(isNetworkAvailable)),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SplashContainer);
