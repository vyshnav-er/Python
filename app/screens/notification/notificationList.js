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
import {connect} from 'react-redux';
import Geolocation from 'react-native-geolocation-service';
import {request, PERMISSIONS, check, RESULTS} from 'react-native-permissions';
import LabelHeader from '../../components/labelHeader';
import SearchHeader from '../../components/searchHeader';
import {RightArrow, UpArrow, Info,Phone, CustomMarker} from '../../config/svg';
import Toast from 'react-native-simple-toast';
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
class NotificationListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
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
    Details.status=1
    this.setState({});
   this.props.navigation.navigate('NotificationListView',{params:Details,Alarm:true,});
    

    //Linking.openURL('maps://app?saddr=100+101&daddr=100+102') for ios
  };
  _notificationListRender = ({item, index}) => {
    
  
    return (
      <TouchableOpacity
      activeOpacity={.9}
        style={{
          backgroundColor:item.status==1?AppStyles.colors.COLOR_WHITE:AppStyles.colors.COLOR_PRIMARY,
          paddingHorizontal: moderateScale(10),
          paddingVertical: moderateScale(5),
          borderBottomWidth: 1,
          borderBottomColor: 'lightgrey',
        }}
        onPress={()=>{
          this._toMap(item);
        }}
        >
         
          <Text
            style={[
              styles.contentText,
              {textAlign: 'left', fontWeight: 'bold',color:item.status==0?'white':'black'},
            ]}
            numberOfLines={1}
            >
            {item.notification.title}
          </Text>
          <Text style={[styles.contentText, {textAlign: 'left',color:item.status==0?'lightgrey':'grey'}]}
          numberOfLines={2}
          >
             {item.notification.body} 
          </Text>
        
        
        
      </TouchableOpacity>
    );
  };
  render() {
    //info = this.props.route.params.alarmList;
    list=this.props.Notification.list
    

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          backgroundColor={appStyles.colors.COLOR_PRIMARY}
          barStyle="light-content"
        />
        {this.props.Loading.isLoading && <HudView />}
        <LabelHeader
          Label={'GTRACKIT'}
          onPress={() => {
            this._goback();
          }}
        />
        <View style={{flex: 6}}>
          <View
            style={{
              flex: 4,
              //paddingTop: moderateScale(5),
              //paddingHorizontal: moderateScale(15),
            }}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={this.props.Notification.list ? this.props.Notification.list : ''}
              renderItem={(item, index) => this._notificationListRender(item, index)}
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
    
    EnableLoader: () => dispatch(Actions.loadingAction.enableLoader()),
    disableLoader: () => dispatch(Actions.loadingAction.disableLoader()),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NotificationListView);
