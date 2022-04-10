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
  Linking,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {connect} from 'react-redux';
import LabelHeader from '../../components/labelHeader';
import {RightArrow, UpArrow, Info, CustomMarker, Phone} from '../../config/svg';
import styles from './styles';
import appStyles from '../../config/styles';
import {HalfButton,LongButton} from '../../components/button';
import {moderateScale} from 'react-native-size-matters';
import Actions from '../../action/index';
import AppStyles from '../../config/styles';
import HudView from '../../components/hudView';
class VehicleDetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.back = false;
    this._map = null;
  }

  componentDidMount() {
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
    let info = this.props.route.params.info;
    
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          backgroundColor={appStyles.colors.COLOR_PRIMARY}
          barStyle="light-content"
        />
        
        <View style={{flex: 6,backgroundColor:'white'}}>
          <View
            style={{
              height:moderateScale(100),
              width:'100%',
              justifyContent: 'center',
              alignItems: 'center',
              borderBottomWidth: 1,
            }}>
            <Text style={styles.headerText}>Plate No : {info.plate}</Text>
            <Text style={styles.headerText}>GPS Id : {info.imeino}</Text>
            
          </View>
          <View
            style={{
              flex: 4,
              flexDirection:'row',
              paddingHorizontal: moderateScale(15),
            }}>
            <View
              style={{flex:1}}>
              <Text style={styles.contentText}>Chassis No : {info.chassis}</Text>
              <Text style={styles.contentText}>GPS ID : {info.imeino}</Text>
              {info.simno!='' || info.simno!=null &&
              <TouchableOpacity style={{flexDirection:'row',alignItems:'flex-end'}}
              
              onPress={()=>{
                Linking.openURL(`tel:${info.simno}`)
              }}
              >
            <Text style={[styles.contentText,{marginRight:moderateScale(5)}]}
            
            >
              SIM No : {info.simno}


            </Text>
            <Phone size={moderateScale(16)} color={AppStyles.colors.COLOR_PRIMARY}/>
            </TouchableOpacity>
            }
            </View>
            <View
              style={{flex:1}}>
              <Text style={styles.contentText}>Group ID : {info.grpid}</Text>
              <Text style={styles.contentText}>Group Name : {info.grpname}</Text>
              <Text />
            </View>
            
          </View>
          <LongButton
          Label={'Done'}
          color={AppStyles.colors.COLOR_BLACK}
          height={moderateScale(45)}
          onPress={()=>{
              this._goback()
          }}
        />
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
    _getTripHistoryDetailList: (data,apiRgn) => {
      dispatch(Actions.tripHistoryDetailAction.tripHistoryDetailRequest(data,apiRgn));
    },
    EnableLoader: () => dispatch(Actions.loadingAction.enableLoader()),
    disableLoader: () => dispatch(Actions.loadingAction.disableLoader()),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(VehicleDetailPage);
