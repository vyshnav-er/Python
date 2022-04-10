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
import Toast from 'react-native-simple-toast';
import {_ValidateEmail} from '../../config/commonGlobal';
import DropDown, {_onReturnValue} from '../../components/dropDown';
import LabelHeader from '../../components/labelHeader';
import DeviceInfo from 'react-native-device-info';
import AppStyles from '../../config/styles';
import {_RemoveWhiteSpace} from '../../config/commonGlobal';
import HudView from '../../components/hudView';
import {WebView} from 'react-native-webview';
import {HalfButton} from '../../components/button';
import { Phone, SMS } from '../../config/svg';
import { color } from 'react-native-reanimated';
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
   // BackHandler.addEventListener('hardwareBackPress', this._backHandlerPress);
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
          <View style={{flex: 1, backgroundColor: 'white',paddingHorizontal:moderateScale(10)}}>
            <Text
              numberOfLines={1}
              style={{
                fontFamily: 'Roboto-Regular',
                color: AppStyles.colors.COLOR_GREY,
                fontSize: moderateScale(20),
                textAlign:'center'
              }}>
              Coming Up
            </Text>
            
            <Text
              numberOfLines={1}
              style={{
                fontFamily: 'Roboto-Regular',
                color: AppStyles.colors.COLOR_GREY,
                fontSize: moderateScale(14),
                textAlign:'left'
              }}>
              1. Location related search will coming soon.
            </Text>
           
          </View>
        </SafeAreaView>
      </>
    );
  }
}

export default WebViewClass;
