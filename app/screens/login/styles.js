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
    // backgroundColor: AppStyles.colors.COLOR_PRIMARY,
  },
  welcomeBox: {
    flex:1,
    width:'100%',
    // backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    top:moderateScale(-10)
  },
  errorText:{
    fontSize: moderateScale(12),
    textAlign: 'center',
    color: AppStyles.colors.COLOR_RED,
  },
  Logo: {
    height: '90%',
    width: '80%',
    //marginTop: moderateScale(30),
    //alignSelf:'center'
    
  },
 
  welcomeText: {
    marginTop:moderateScale(15),
    fontFamily:'Roboto-Regular',
    marginLeft:moderateScale(15),
    fontSize: moderateScale(25),
    color: AppStyles.colors.COLOR_BLACK,
    
  },
  welcomeFooterText: {
    fontFamily:'Avenir Next Regular',
    marginLeft:moderateScale(15),
    marginBottom:moderateScale(10),
    fontSize: moderateScale(16),
    color: AppStyles.colors.COLOR_GREY,
    
  },
  buttonContainer:{
   // width:'100%',
    marginTop:moderateScale(30),
    flexDirection:'row',
    //justifyContent:'space-around'
  },
  colorTextRight:{
    fontSize: moderateScale(12),
    color: AppStyles.colors.COLOR_PRIMARY,
    textAlign: 'right',
    fontFamily: 'Poppins-Medium',
    marginBottom:moderateScale(15)
  },
  colorTextUnderLine:{
    fontSize: moderateScale(13),
    color: AppStyles.colors.COLOR_PRIMARY,
    textAlign: 'left',
    fontFamily: 'Roboto-Regular',
    textDecorationLine:'underline'
  },
  plainTextLeft:{
    fontSize: moderateScale(13),
    color: AppStyles.colors.COLOR_DARK_GREY,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
  dropDownRenderContainer:{
    borderBottomWidth: 0.75,
    width: '100%',
    alignSelf: 'center',
    borderColor: 'grey',
    height: moderateScale(50),
    paddingLeft: moderateScale(10),
    //paddingVertical:moderateScale(1),
    justifyContent: 'center',
    backgroundColor:AppStyles.colors.COLOR_SECONDARY,
  }
});
export default styles;