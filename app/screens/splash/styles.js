import React, {Component} from 'react';
import {StatusBar} from 'react-native';
import {StyleSheet} from 'react-native';
import appStyles from '../../config/styles';
import Metrics from '../../config/metrics';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import AppStyles from '../../config/styles';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppStyles.colors.COLOR_WHITE,
  },
  contentContainer: {
    flex: 8,
    paddingVertical:moderateScale(20),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Logo:{
      height:moderateScale(100),
      width:'80%',
      alignSelf:'center'
  },
  textStyle:{
      fontSize:moderateScale(12),
      color:AppStyles.colors.COLOR_GREY,
      fontFamily:'Roboto-Light'
  }
});
export default styles;