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
    backgroundColor:'white'
  },
  renderContainer: {
    paddingLeft:moderateScale(10),
    paddingVertical: moderateScale(5),
    backgroundColor: AppStyles.colors.COLOR_WHITE,
    marginBottom: 2,
    width: '100%',
    flexDirection: 'row',
  },
  boldText:{
    fontFamily:'System',fontSize:moderateScale(12)
  },
  regularText:{
    fontFamily:'Roboto-Regular',fontSize:moderateScale(12)
  },
  alarmWarningText:{
    fontFamily:'System',fontSize:moderateScale(14),color:'red',marginRight:moderateScale(5)
  }
  
})

export default styles;