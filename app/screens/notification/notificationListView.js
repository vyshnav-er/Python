import React, {useState, useEffect, Component} from 'react';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import {
  Image,
  View,
  Text,
  Keyboard,
  BackHandler,
  ScrollView,
  Alert,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Linking,
} from 'react-native';
import styles from './styles';
import {connect} from 'react-redux';
import {_ValidateEmail} from '../../config/commonGlobal';
import DropDown, {_onReturnValue} from '../../components/dropDown';
import LabelHeader from '../../components/labelHeader';
import AppStyles from '../../config/styles';
import {_RemoveWhiteSpace} from '../../config/commonGlobal';
import {MarkerPopUp} from '../../components/commonFunctionComponent';
import MapView, {Marker, Circle} from 'react-native-maps';
import Actions from '../../action/index';
import {PROVIDER_GOOGLE} from 'react-native-maps'; //
let imeiNo = '';
let region='';
let imageUrl='';
let params = [];
let Alarm = false;
let Info = [];
let plate = '';
let getItem = '';
class NotificationListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      showSatellite: false,
      showPopUp: false,
    };
    this.back = false;
  }
  componentDidMount() {
    data = {
      token: this.props.Login.resp.accessToken,
      notificationID: params.id,
      
    }
    body={
      status:"1"
    }
    this.props._statusUpdate(data,body,this.props.Login.region);
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardDidHide,
    );
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

  _goback = () => {
    this.props.navigation.goBack();
  };
  render() {
    
    params = this.props.route.params.params;
    region=this.props.Login.region
     Alarm = this.props.route.params.Alarm;
    Info = this.props.route.params.params.notification;
      plate = this.props.route.params.plate;
    // getItem = this.props.route.params.getItem;
    if(!Alarm){
       imeiNo=this.props.route.params.imeiNo;
     }
    if(region=='Oman')
    {
      imageUrl = 'https://oman.g-trackit.com';
    } else if(region=='Demo')
    {
      imageUrl = 'https://test.g-trackit.com';
    }else if(region=='India')
    {
      imageUrl = 'https://g-trackit.com';

    }else if (region=='Rest of the world')
    {
      imageUrl = 'https://g-trackit.com';
    }
    else {
      imageUrl = 'https://g-trackit.com';
    }
    return (
      <>
        <SafeAreaView style={styles.container}>
          <StatusBar
            backgroundColor={AppStyles.colors.COLOR_PRIMARY}
            barStyle="light-content"
          />
          {this.state.showPopUp && (
            <MarkerPopUp
              Info={Info}
              Alarm={Alarm}
              plate={plate}
              imeiNo={imeiNo}
              getItem={getItem}
              item={params.notification}
              onPress={() => {
                this.setState({showPopUp: !this.state.showPopUp});
              }}
            />
          )}

          <LabelHeader
            Label={'GTRACKIT'}
            onPress={() => {
              this._goback();
            }}
          />
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.satelliteTouchable}
            onPress={() => {
              this.setState({showSatellite: !this.state.showSatellite});
            }}>
            {this.state.showSatellite ? (
              <Image
                style={{height: '100%', width: '100%'}}
                source={require('../../../assets/Images/pic/map.jpg')}
              />
            ) : (
              <Image
                style={{height: '100%', width: '100%'}}
                source={require('../../../assets/Images/pic/satelite.jpg')}
              />
            )}
          </TouchableOpacity>
          <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={{flex: 1}}
            mapType={this.state.showSatellite ? 'hybrid' : 'standard'}
            region={{
              latitude: JSON.parse(params.notification.lat),
              longitude: JSON.parse(params.notification.lang),
              latitudeDelta: 0.002,
              longitudeDelta: 0.002,
            }}
            rotateEnabled={false}
            zoomTapEnabled={true}
            followUserLocation={true}
            showsUserLocation
            ref={ref => {
              this._map = ref;
            }}>
            <Marker
              key={params.id}
              // ref={ref => markers[index] = ref}
              //={() => this._markerDataSet(marker, index)}
              coordinate={{
                latitude: JSON.parse(params.notification.lat),
                longitude:JSON.parse(params.notification.lang),
              }}
              onPress={() => {
                this.setState({showPopUp: true});
              }}>
              <Image
                  style={{
                    height: moderateScale(30),
                    width: moderateScale(30),
                    resizeMode: 'contain',
                  }}
                  source={
                    params.notification.icon != '' && params.notification.icon != null
                      ? {
                          uri: imageUrl + params.notification.icon,
                        }
                      : require('../../../assets/Images/CarIcon/carblueEast.png')
                  }
                //  source={require('../../assets/images/CarIcon/carylwWest.png')}
                />
              </Marker>
          </MapView>
        </SafeAreaView>
      </>
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
      Notification:state.notificationListReducer,
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
      _getNotificationList: (data,apiRgn) => {
        dispatch(Actions.notificationListAction.notificationListRequest(data,apiRgn));
      },
      _statusUpdate:(data,body,apiRgn)=>{
        dispatch(Actions.notificationListAction.notificationStatusUpdate(data,body,apiRgn));
      },
      EnableLoader: () => dispatch(Actions.loadingAction.enableLoader()),
      disableLoader: () => dispatch(Actions.loadingAction.disableLoader()),
    };
  }
  export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(NotificationListView);

