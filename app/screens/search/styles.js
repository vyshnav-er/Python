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
    backgroundColor: AppStyles.colors.COLOR_PRIMARY,
  },
  contentContainer: {
    flex: 1,
    justifyContent:'center',
    //paddingHorizontal:moderateScale(20),
    backgroundColor: AppStyles.colors.COLOR_WHITE,
  },
  renderContainer: {
    paddingVertical: moderateScale(5),
    backgroundColor: AppStyles.colors.COLOR_WHITE,
    borderBottomColor:'lightgrey',
    borderBottomWidth:.75,
    width: '100%',
    flexDirection: 'row',
  },
  boldText:{
    fontFamily:'System',fontSize:moderateScale(11)
  },
  regularText:{
    fontFamily:'Roboto-Regular',fontSize:moderateScale(11)
  }
});
export default styles;
