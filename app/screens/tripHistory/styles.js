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
    backgroundColor:AppStyles.colors.COLOR_PRIMARY
  },
  coordsText:{
    fontSize:moderateScale(13),
    fontWeight:'bold',
    fontFamily:'Roboto-Regular',

  }, satelliteTouchable:{
    height: moderateScale(50),
    width: moderateScale(50),
    backgroundColor: 'white',
    position: 'absolute',
    zIndex: 2,
    bottom: moderateScale(60),
    right: moderateScale(10),
  },
  renderContainer:{
    paddingVertical:moderateScale(5),
    paddingHorizontal:moderateScale(10),
    borderBottomWidth:moderateScale(1),
    borderBottomColor:'lightgrey',backgroundColor:'white'
   // backgroundColor:'#FAFAFA',
  //  flexDirection:'row'
  },
  alarmText:{
    fontSize:moderateScale(13),
    //fontWeight:'bold',
    fontFamily:'Roboto-Regular',
    color:'red'
  },
  speedText:{
    fontSize:moderateScale(13),
    //fontWeight:'bold',
    fontFamily:'Roboto-Regular',
    color:'grey'
  },
  
})

export default styles;