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
    borderBottomColor:'lightgrey',
    borderBottomWidth:1
  },
  boldText:{
    fontFamily:'System',fontSize:moderateScale(12)
  },
  regularText:{
    fontFamily:'Roboto-Regular',fontSize:moderateScale(12)
  },
  alarmWarningText:{
    fontFamily:'System',fontSize:moderateScale(14),color:'red',marginRight:moderateScale(5)
  },
  headerText:{
    fontFamily:'System',
    fontSize:moderateScale(16),
    color:AppStyles.colors.COLOR_BLACK
  },
  contentText:{
    fontFamily:'Roboto-Regular',
    fontSize:moderateScale(12),
    color:AppStyles.colors.COLOR_DARK_GREY,
    marginTop:moderateScale(5)
  }, satelliteTouchable:{
    height: moderateScale(50),
    width: moderateScale(50),
    backgroundColor: 'white',
    position: 'absolute',
    zIndex: 20,
    bottom: moderateScale(30),
    right: moderateScale(30),
  },
  
})

export default styles;