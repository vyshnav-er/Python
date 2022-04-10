import React, {Component} from 'react';
import {Alert, PermissionsAndroid, Platform, View, Linking,TouchableOpacity,Text} from 'react-native';
import metrics from './metrics';
import Appstyles from './styles'
import {request, PERMISSIONS, check, RESULTS} from 'react-native-permissions';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import {Logout} from '../components/commonFunctionComponent'
const extract = (str, pattern) => (str.match(pattern) || []).pop() || '';

export function _RemoveWhiteSpace(str) {
  return extract(str, `/\s/g, ''`);
}
export function showAlertWithTitleCallback(
  titleHead,
  titleMessage,
  okText,
  cancelText,
  callbackFunction,
) {
  return(
  <TouchableOpacity
  style={{
    position: 'absolute',
    zIndex: 10,
    height: metrics.SCREEN_HEIGHT,
    width: metrics.SCREEN_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(110,110,110,.5)',
  }}
  activeOpacity={1}
  onPress={() => {
    callbackFunction
  }}>
  <View
    style={{
      width: '75%',
      paddingHorizontal: moderateScale(25),
      height: moderateScale(80),
      backgroundColor: 'white',
      alignItems: 'center',
      flexDirection: 'row',
      borderRadius: moderateScale(5),
    }}>
    <Text
      style={{
        marginHorizontal: moderateScale(20),
        fontFamily: 'Roboto-Regular',
      }}>
     {titleHead}
     {titleMessage}
    </Text>
  </View>
</TouchableOpacity>
     );
  
}
export function _ValidateEmail(mail) {
  if (
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)
  ) {
    return true;
  }
  
  return false;
}

