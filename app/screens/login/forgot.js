import React, {Component} from 'react';
import {moderateScale} from 'react-native-size-matters';
import {
  View,
  Text,
  Keyboard,
  BackHandler,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Linking,
} from 'react-native';
import styles from './styles';
import {_ValidateEmail} from '../../config/commonGlobal';
import DropDown, {_onReturnValue} from '../../components/dropDown';
import LabelHeader from '../../components/labelHeader';
import DeviceInfo from 'react-native-device-info';
import AppStyles from '../../config/styles';
import {_RemoveWhiteSpace} from '../../config/commonGlobal';

import { Phone, SMS } from '../../config/svg';
let url = '';
class WebViewClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
    };
    this.back = false;
  }
  componentDidMount() {
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardDidHide,
    );
  //  BackHandler.addEventListener('hardwareBackPress', this._backHandlerPress);
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

  _goback = () => {
    this.props.navigation.goBack();
  };
  render() {
    return (
      <>
        <SafeAreaView style={styles.container}>
          <StatusBar
            backgroundColor={AppStyles.colors.COLOR_PRIMARY}
            barStyle="light-content"
          />
          <LabelHeader
            Label={'GTRACKIT'}
            onPress={() => {
              this._goback();
            }}
          />
          <View style={{flex: 1, backgroundColor: 'white',justifyContent:'center',alignItems:'center',paddingBottom:moderateScale(100)}}>
            <Text
              numberOfLines={1}
              style={{
                fontFamily: 'Roboto-Regular',
                color: AppStyles.colors.COLOR_GREY,
                fontSize: moderateScale(20),
              }}>
              To reset password
            </Text>
            <Text
              numberOfLines={1}
              style={{
                fontFamily: 'Roboto-Regular',
                color: AppStyles.colors.COLOR_BLACK,
                fontSize: moderateScale(25),
               
              }}>
              Contact
            </Text>

            <View style={{flexDirection:'row',marginTop:moderateScale(10),alignItems:'center',width:'100%',justifyContent:'space-around'}}>
            <Text
              numberOfLines={1}
              style={{
                fontFamily: 'Roboto-Regular',
                color: AppStyles.colors.COLOR_BLACK,
                fontSize: moderateScale(18),
                
              }}
              >
              Oman - +968 91102030
            </Text>
            
              <TouchableOpacity onPress={() => Linking.openURL(`tel:${'+968 91102030'}`)}>
              <Phone size={moderateScale(20)} color={AppStyles.colors.COLOR_PRIMARY}/>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Linking.openURL(`sms:+968 91102030?body=`)}>
              
              <SMS size={moderateScale(20)} color={AppStyles.colors.COLOR_PRIMARY}/>
              </TouchableOpacity>
            </View>
            <View style={{flexDirection:'row',marginTop:moderateScale(10),alignItems:'center',width:'100%',justifyContent:'space-around'}}>
            <Text
              numberOfLines={1}
              style={{
                fontFamily: 'Roboto-Regular',
                color: AppStyles.colors.COLOR_BLACK,
                fontSize: moderateScale(18),
                
              }}
              >
              UAE - +971 523804216
            </Text>
            
              <TouchableOpacity onPress={() => Linking.openURL(`tel:${'+971 523804216'}`)}>
              <Phone size={moderateScale(20)} color={AppStyles.colors.COLOR_PRIMARY}/>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Linking.openURL(`sms:+971 523804216?body=`)}>
              
              <SMS size={moderateScale(20)} color={AppStyles.colors.COLOR_PRIMARY}/>
              </TouchableOpacity>
            </View>
            <View style={{flexDirection:'row',marginTop:moderateScale(10),alignItems:'center',width:'100%',justifyContent:'space-around'}}>
            <Text
              numberOfLines={1}
              style={{
                fontFamily: 'Roboto-Regular',
                color: AppStyles.colors.COLOR_BLACK,
                fontSize: moderateScale(18),
                
              }}
              >
              India - +91 755-8939629
            </Text>
            
              <TouchableOpacity onPress={() => Linking.openURL(`tel:${'+91 755-8939629'}`)}>
              <Phone size={moderateScale(20)} color={AppStyles.colors.COLOR_PRIMARY}/>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Linking.openURL(`sms:+91 755-8939629?body=`)}>
              
              <SMS size={moderateScale(20)} color={AppStyles.colors.COLOR_PRIMARY}/>
              </TouchableOpacity>
            </View>
            <View style={{flexDirection:'row',marginTop:moderateScale(10),alignItems:'center',width:'100%',justifyContent:'space-around'}}>
            <Text
              numberOfLines={1}
              style={{
                fontFamily: 'Roboto-Regular',
                color: AppStyles.colors.COLOR_BLACK,
                fontSize: moderateScale(18),
                
              }}
              numberOfLines={1}
              >
              Others - +91 755-8939629
            </Text>
            
              <TouchableOpacity onPress={() => Linking.openURL(`tel:${'+91 755-8939629'}`)}>
              <Phone size={moderateScale(20)} color={AppStyles.colors.COLOR_PRIMARY}/>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Linking.openURL(`sms:+91 755-8939629?body=`)}>
              
              <SMS size={moderateScale(20)} color={AppStyles.colors.COLOR_PRIMARY}/>
              </TouchableOpacity>
            </View>
            
          </View>
        </SafeAreaView>
      </>
    );
  }
}

export default WebViewClass;
