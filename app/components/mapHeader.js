import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import appStyles from '../config/styles';
import metrics from '../config/metrics';
import {moderateScale} from 'react-native-size-matters';
import {BackArrow, Notification,MenuDrawer} from '../config/svg';
import {TextInput} from 'react-native-gesture-handler';
import AppStyles from '../config/styles';
let phNO = '';

export default class MapHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddMemberModal: false,
      showVehicle: false,
      showDriver: false,
      showLocation: false,
    };
  }

  _closeModal = () => {
    //alert('Hai')
    this.setState({
      showAddMemberModal: false,
    });
  };

  _clickMenuBar = () => {
    this.setState({
      showAddMemberModal: true,
    });
  };
  _goback = () => {
    this.props.navigation.goBaack();
  };
  render() {
    let navigation =this.props.navigation;
    return (
      <View>
        <View style={styles.main}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: moderateScale(5),
            }}>
              {this.props.showDrawer=='Yes' &&
            <TouchableOpacity
              style={styles.backArrow}
              onPress={()=>{this.props.drawer()}}
            >
              <MenuDrawer
                size={moderateScale(20)}
                color={AppStyles.colors.COLOR_WHITE}
              />
              
            </TouchableOpacity>}
            <TouchableOpacity
              style={[
                styles.buttonContainer,
                {
                  backgroundColor: this.props.showVehicle
                    ? AppStyles.colors.COLOR_WHITE
                    : AppStyles.colors.COLOR_PRIMARY,
                },
              ]}
              onPress={() => {
                this.props.vehicleOnPress()
              }}>
              <Text
                style={[
                  styles.buttonText,
                  {
                    color: this.props.showVehicle
                      ? AppStyles.colors.COLOR_PRIMARY
                      : AppStyles.colors.COLOR_WHITE,
                  },
                ]}
                numberOfLines={1}
                >
                Vehicle
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.buttonContainer,
                {
                  backgroundColor: this.props.showDriver
                    ? AppStyles.colors.COLOR_WHITE
                    : AppStyles.colors.COLOR_PRIMARY,
                },
              ]}
              // onPress={() => {
              //   this.setState({
              //     showVehicle: false,
              //     showLocation: false,
              //     showDriver: true,
              //   });
              // }}>
              onPress={() => {
                this.props.driverOnPress()
              }}>
              <Text  style={[
                  styles.buttonText,
                  {
                    color: this.props.showDriver
                      ? AppStyles.colors.COLOR_PRIMARY
                      : AppStyles.colors.COLOR_WHITE,
                  },
                ]}>Driver</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.buttonContainer,
                {
                  backgroundColor: this.props.showLocation
                    ? AppStyles.colors.COLOR_WHITE
                    : AppStyles.colors.COLOR_PRIMARY,
                },
              ]}
              
              onPress={() => {
                this.props.locationOnPress()
              }}>
              <Text  style={[
                  styles.buttonText,
                  {
                    color: this.props.showLocation
                      ? AppStyles.colors.COLOR_PRIMARY
                      : AppStyles.colors.COLOR_WHITE,
                  },
                ]}>Location</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{
              this.props.notificationOnPress()
            }}>
             
            <Notification
              size={moderateScale(20)}
              color={AppStyles.colors.COLOR_WHITE}
            />
           
           </TouchableOpacity>
           
          </View>
        </View>
        {this.props.notificationCount>0 &&
             <View style={{zindex:10,paddingHorizontal:3,paddingVertical:2,top:moderateScale(10),right:moderateScale(10),position:'absolute',borderRadius:100,backgroundColor:'red'}}>
                <Text style={{color:'white',fontSize:moderateScale(10)}}>{this.props.notificationCount}</Text>
              </View>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    height: moderateScale(60),
    width: '100%',
    paddingHorizontal: moderateScale(10),
   // elevation: 2,
    backgroundColor: appStyles.colors.COLOR_PRIMARY,
  },
  buttonContainer: {
    height: '50%',
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(5),
    marginRight: moderateScale(10),
  },
  buttonText: {
    fontFamily: 'Roboto-Regular',
    fontSize: moderateScale(12),
  },
  backArrow: {
    paddingHorizontal: moderateScale(10),
    height: '75%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationTouchable: {
    height: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  inputDataText: {
    height: '65%',
    elevation: moderateScale(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginBottom: moderateScale(20),
    backgroundColor: appStyles.colors.COLOR_PRIMARY, //
    paddingHorizontal: moderateScale(15),
    borderRadius: moderateScale(3),
  },
});
