import React, { Component } from 'react';
import DrawerView from './drawerView';
import { connect } from 'react-redux';

class DrawerContainer extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    return <DrawerView { ...this.props } />;
  }
}

function mapStateToProps (state) {
  return {
    Login: state.loginReducer,
  };
}

function mapDispatchToProps (dispatch) {
  return {
   
};
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DrawerContainer);
