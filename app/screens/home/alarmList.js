import React, {Component} from 'react';
import {
  Keyboard,
  BackHandler,
  SafeAreaView,
  StatusBar,
  View,
  FlatList,
  Image,
  Platform,
  Text,
  TouchableOpacity,
  Linking,
  Animated,
} from 'react-native';
import MessageBox from '../../components/messageBox';
import {connect} from 'react-redux';
import Geolocation from 'react-native-geolocation-service';
import {request, PERMISSIONS, check, RESULTS} from 'react-native-permissions';
import LabelHeader from '../../components/labelHeader';
import SearchHeader from '../../components/searchHeader';
import {RightArrow, UpArrow, Info,Phone, CustomMarker} from '../../config/svg';
import styles from './styles';
import appStyles from '../../config/styles';
import {HalfButton, LongButton} from '../../components/button';
import {moderateScale} from 'react-native-size-matters';
import Actions from '../../action/index';
import moment from 'moment/src/moment';
import AppStyles from '../../config/styles';
import {
  TripListMapButtonContainer,
  TripListDetailContainer,
} from '../../components/commonFunctionComponent';
import HudView from '../../components/hudView';
import MapView, {Marker, Polyline} from 'react-native-maps';
import {PROVIDER_GOOGLE} from 'react-native-maps'; //
const coordinates = [[76.9102172, 8.5003739]];
let list = [];
let info = '';
let type=''
class AlarmListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddress: false,
    };
    this.back = false;
    this._map = null;
    this.i = 0;
  }

  componentDidMount() {
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardDidHide,
    );
    data = type=='dr'?{
      token: this.props.Login.resp.accessToken,
      imeino: info.imeino,
      driverid:info.driverid,
      categoryType:type
    }:{
      token: this.props.Login.resp.accessToken,
      imeino: info.imeino,
      categoryType:type
    }
    this.props.EnableLoader();
    this.props._getAlarmList(data,this.props.Login.region);
    //this._selected();
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

  _selected=()=>{
    
      this.props.AlarmList.alarmList.map(item => {
        item.selected = false;
        list.push(item);
      });
    
  }
  
  _goback = () => {
    this.props.navigation.goBack();
    };
  _selectList = item => {
    item.selected = !item.selected;
   // this.i = 1;
      this.setState({});
  };
  _toMap = (Details) => {
    this.props.navigation.navigate('CustomMapView',{params:Details,Alarm:true,Info:info,region:this.props.Login.region});
    

    //Linking.openURL('maps://app?saddr=100+101&daddr=100+102') for ios
  };
  _alarmListRender = ({item, index}) => {
    if (item.createtime != '') {
      var str = item.createtime;
      var res = str.split(' ');
      
    }
    if (item.alarmtext != '') {
      var alrmtext = item.alarmtext;
      var alrm = alrmtext.split(';');
    }
  
    return (
      <TouchableOpacity
        style={{
          paddingHorizontal: moderateScale(10),
          paddingVertical: moderateScale(5),
          
          borderBottomWidth: 1,
          borderBottomColor: 'lightgrey',
        }}
        onPress={()=>{
          this._toMap(item);
        }}
        >
          {type=='dr'&&
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={[
              styles.contentText,
              {textAlign: 'left', fontWeight: 'bold'},
            ]}>
            Plate : {item.plate}
          </Text>
          <Text style={[styles.contentText, {textAlign: 'left'}]}>
            GPS Id : {item.imeino} 
          </Text>
        </View>}
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={[
              styles.contentText,
              {textAlign: 'left', fontWeight: 'bold'},
            ]}>
            Alarm : {alrm[0]}
          </Text>
          <Text style={[styles.contentText, {textAlign: 'left'}]}>
            Speed : {item.speed} Km/hr
          </Text>
        </View>
        {item.drivername !='' && item.drivername != null &&type=='vh'&&
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={[
              styles.contentText,
              {textAlign: 'left'},
            ]}>
            Driver name : {item.drivername}
          </Text>
          <Text style={[styles.contentText, {textAlign: 'left'}]}>
            Mobile : {item.mobile} 
          </Text>
          
        </View>
  }
  {item.employeeid !=''&&item.employeeid != null &&type=='vh'&&
        <Text style={[styles.contentText, {textAlign: 'left'}]}>
            EmpID : {item.employeeid} 
          </Text>}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            //marginBottom: moderateScale(10),
          }}>
          {!item.selected ? (
            <TouchableOpacity
            onPress={() => {
                this._selectList(item);
              }}>
              <Text style={styles.coordsText}>
                Coords : {item.lat}, {item.lang}
                {` `}
                <Info size={15} color={AppStyles.colors.COLOR_BLACK} />
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
            style={{flex:1}}
              onPress={() => {
                this._selectList(item);
              }}>
              <Text style={styles.coordsText}>Address: {item.address}
              {` `}
                <Info size={15} color={AppStyles.colors.COLOR_BLACK} />
              </Text>
            </TouchableOpacity>
          )}

          <View style={{flex:1}}>
            <Text style={[styles.contentText, {textAlign: 'right'}]}>
              Time : {res[0]}
            </Text>
            <Text style={[styles.contentText, {textAlign: 'right'}]}>
              {res[1]}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  render() {
    info = this.props.route.params.alarmList;
    type=this.props.DetailList.type
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          backgroundColor={appStyles.colors.COLOR_PRIMARY}
          barStyle="light-content"
        />
          {this.props.MessageBox.isMessagebox && (
          <MessageBox
            message={'You are not authorized. Please relogin'}
            Label={'OK'}
            onPress={() => {
              this.props._disableMessageBox();
            }}
          />
        )}
        {this.props.Loading.isLoading && <HudView />}
        <LabelHeader
          Label={'GTRACKIT'}
          onPress={() => {
            this._goback();
          }}
        />
        <View style={{flex: 6,backgroundColor:'white'}}>
          <View
            style={{
              height: moderateScale(100),
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              borderBottomWidth: 1,
            }}>
            <Text style={styles.headerText}>{type == 'dr' ?('Driver Name : '+info.drivername):'Plate No: '+info.plate}</Text>
            <Text style={styles.headerText}
            
            onPress={()=>{
              type&& Linking.openURL(`tel:${info.drivermobile}`);
            
            }}
            >
              {type == 'dr'&&
            <Phone
                size={moderateScale(16)}
                color={AppStyles.colors.COLOR_PRIMARY}
              />
              }
            {type == 'dr' ?('  Contact Number : '+info.drivermobile):'GPS Id: '+info.imeino}
              {/* GPS Id: {info.imeino} */}
              </Text>
          </View>
          <View
            style={{
              flex: 4,
              paddingTop: moderateScale(5),
              //paddingHorizontal: moderateScale(15),
            }}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={this.props.AlarmList.alarmList ? this.props.AlarmList.alarmList : ''}
              renderItem={(item, index) => this._alarmListRender(item, index)}
              extraData={this.state}
              keyboardShouldPersistTaps={'always'}
              keyExtractor={(item, index) => index.toString()}
            />
            <LongButton
              Label={'Done'}
              color={AppStyles.colors.COLOR_BLACK}
              height={moderateScale(45)}
              onPress={() => {
                this._goback();
              }}
            />
          </View>
        </View>
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
    Loading: state.loadingReducer, MessageBox:state.messageboxReducer
  };
}
function mapDispatchToProps(dispatch) {
  return {
    _getAlarmList: (data,apiRgn) => {
      dispatch(Actions.alarmListAction.alarmListRequest(data,apiRgn));
    },
    EnableLoader: () => dispatch(Actions.loadingAction.enableLoader()),
    disableLoader: () => dispatch(Actions.loadingAction.disableLoader()),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AlarmListView);
