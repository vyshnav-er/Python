import React, {Component} from 'react';
import {
  Keyboard,
  BackHandler,
  SafeAreaView,
  StatusBar,
  View,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  Animated,
} from 'react-native';
import HudView from '../../components/hudView';
import {connect} from 'react-redux';
import Geolocation from 'react-native-geolocation-service';
import {request, PERMISSIONS, check, RESULTS} from 'react-native-permissions';
import LabelHeader from '../../components/labelHeader';
import SearchHeader from '../../components/searchHeader';
import {RightArrow, UpArrow, Info, CustomMarker} from '../../config/svg';
import metrics from '../../config/metrics';
import Toast from 'react-native-simple-toast';
import styles from './styles';
import appStyles from '../../config/styles';
import {HalfButton, LongButton} from '../../components/button';
import {moderateScale} from 'react-native-size-matters';
import Actions from '../../action/index';
import moment from 'moment/src/moment';
import DeviceInfo from 'react-native-device-info';
import AppStyles from '../../config/styles';

class AlarmListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deviceId: '',
    };
    this.back = false;
    this._map = null;
  }

  componentDidMount() {
    let uniqueId = DeviceInfo.getUniqueId();
    this.setState({deviceId: uniqueId});
    BackHandler.addEventListener('hardwareBackPress', () =>
    this._backHandlerPress(),
  );

}
componentWillUnmount() {
  BackHandler.removeEventListener('hardwareBackPress', () =>
    this._backHandlerPress(),
  );
}

_backHandlerPress() {
  this.props.navigation.goBack();
  return true;
}
  _onLogout = () => {
    this.props.EnableLoader();
    this.props.Logout(this.state.deviceId,this.props.Login.resp.accessToken, () =>
    this.props.navigation.navigate('Home'),this.props.Login.region);
    
  };

  _goback = () => {
    this.props.navigation.goBack();
  };
  render() {
    return (
      <SafeAreaView style={styles.container}>
        {this.props.Loading.isLoading && <HudView onPress={()=>{this.props.disableloader()}} />}
        <TouchableOpacity
          style={{
            position: 'absolute',
            //zIndex: 10,
            height: metrics.SCREEN_HEIGHT,
            width: metrics.SCREEN_WIDTH,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(110,110,110,.5)',
          }}
          activeOpacity={1}
          onPress={() => {
            this._goback();
          }}>
          <View
            style={{
              width: '90%',
              paddingHorizontal: moderateScale(25),
              height: moderateScale(200),
              backgroundColor: 'white',
              alignItems: 'center',
              //flexDirection: 'row',
              justifyContent: 'center',
              borderRadius: moderateScale(5),
            }}>
            <Text
              style={{
                color: AppStyles.colors.COLOR_PRIMARY,
                fontSize: moderateScale(16),
                marginBottom: moderateScale(15),
                fontFamily: 'Roboto-Regular',
              }}>
              Do you want to Logout?
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                width: '100%',
              }}>
              <TouchableOpacity
                style={{
                  height: moderateScale(45),
                  width: moderateScale(100),
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'white',
                  borderColor: AppStyles.colors.COLOR_PRIMARY,
                  borderWidth: 1,
                }}
                onPress={() => {
                  this._goback();
                }}>
                <Text style={{color: AppStyles.colors.COLOR_PRIMARY}}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  height: moderateScale(45),
                  width: moderateScale(100),
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: AppStyles.colors.COLOR_PRIMARY,
                }}
                onPress={() => {
                  this._onLogout();
                }}
                >
                <Text style={{color: AppStyles.colors.COLOR_WHITE}}>
                  Logout
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

function mapStateToProps(state) {
  return {
    VehicleList: state.vehicleListReducer,
    DetailList: state.detailListReducer,
    TripHistoryList: state.tripHistoryReducer,
    TripHistoryDetailList: state.tripHistoryDetailReducer,
    AlarmList: state.alarmListReducer,
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
    _getAlarmList: data => {
      dispatch(Actions.alarmListAction.alarmListRequest(data));
    },
    EnableLoader: () => dispatch(Actions.loadingAction.enableLoader()),
    disableLoader: () => dispatch(Actions.loadingAction.disableLoader()),
    Logout:( deviceId,token,navigate,apiRgn )=> dispatch(Actions.logoutAction.logoutRequest(deviceId,token,navigate,apiRgn)),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AlarmListView);
