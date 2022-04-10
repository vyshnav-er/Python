import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Keyboard } from 'react-native';
import appStyles from '../config/styles';
import metrics from '../config/metrics';
// //Package
import { scale, moderateScale } from 'react-native-size-matters';

export function LongButton(props) {
  return (
    <TouchableOpacity
      disabled={props.disabled}
      activeOpacity={props.disabled ? 1 : 0.8}
      style={[
        styles.buttonTouchable,
        {
          backgroundColor: props.disabled ? 'grey' : props.color,
          height: props.height,
        },
      ]}
      onPress={() => {
        props.onPress();
      }}>
      <Text numberOfLines={1} style={styles.buttonWhiteText}>
        {props.Label}
      </Text>
    </TouchableOpacity>
  );
}
export function HalfButton(props) {
  return (
    <TouchableOpacity
      activeOpacity={1}
      // disabled={props.disabled}
      style={[
        styles.buttonWhiteTouchable,
        { backgroundColor: props.backgroundColor, height: props.height },
      ]}
      onPress={() => {
        props.onPress();
      }}>
      <Text
        numberOfLines={1}
        style={[styles.buttonText, { color: props.textColor }]}>
        {props.Label}
      </Text>
    </TouchableOpacity>
  );
}
export function DateButton(props) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={props.Disable}
      style={[
        styles.datebuttonLinear,
        { backgroundColor: props.color1, borderColor: props.color2 },
      ]}
      onPress={() => {
        props.onPress();
      }}>
      <Text
        numberOfLines={1}
        style={[styles.buttonText, { color: props.color2 }]}>
        {props.Label}
      </Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  linearGradient: {
    alignSelf: 'center',
    height: metrics.SCREEN_HEIGHT * 0.07,
    borderRadius: moderateScale(30),
    alignItems: 'center',
    width: metrics.SCREEN_WIDTH * 0.7,
    justifyContent: 'center',
    marginTop: moderateScale(10),
  },
  viewTextInput: {
    backgroundColor: 'white',
    height: metrics.SCREEN_HEIGHT * 0.065,
    borderRadius: moderateScale(30),
    flexDirection: 'row',
    width: metrics.SCREEN_WIDTH * 0.69,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textCancel: {
    color: appStyles.colors.COLOR_RED,
    textAlign: 'center',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: moderateScale(18),
  },
  continueContainer: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: scale(30),
  },
  continueButton: {
    height: moderateScale(40),
    width: metrics.SCREEN_WIDTH * 0.375,
    borderRadius: moderateScale(20),
  },
  continueButtonTouchable: {
    height: '100%',
    width: '100%',
    zIndex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(40),
  },
  continueButtonText: {
    fontSize: 16,
    color: '#fafafa',
  },
  continueButtonTextContainer: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  continueButtonArrowContainer: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: '100%',
  },
  addmemberButton: {
    height: '50%',
    width: '40%',
    borderRadius: moderateScale(40),
    borderWidth: 1,
    borderColor: appStyles.colors.COLOR_RED,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addmemberButtonText: {
    fontSize: moderateScale(16),
    color: appStyles.colors.COLOR_RED,
    opacity: 0.7,
  },
  buttonLinear: {
    height: moderateScale(40),
    width: metrics.SCREEN_WIDTH,
    borderRadius: moderateScale(0),
    elevation: moderateScale(2),
    justifyContent: 'center',
    alignItems: 'center',
    //padding:moderateScale(3)
  },
  datebuttonLinear: {
    height: moderateScale(38),
    width: metrics.SCREEN_WIDTH,
    borderRadius: moderateScale(0),
    borderWidth: 0.75,
    borderColor: appStyles.colors.COLOR_PRIMARY,
    //elevation: moderateScale(1),
    justifyContent: 'center',
    alignItems: 'center',
    //padding:moderateScale(3)
  },
  buttonTouchable: {
    height: moderateScale(45),
    width: '100%',
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: moderateScale(15),
    // backgroundColor:'#bfbfbf',
    borderRadius: moderateScale(0),
  },
  buttonWhiteTouchable: {
    height: moderateScale(40),
    width: '49.9%',
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: moderateScale(15),

    borderRadius: moderateScale(0),
  },
  datebuttonWhiteTouchable: {
    height: '97%',
    width: '98.5%',
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: moderateScale(15),
    backgroundColor: 'white',
    borderRadius: moderateScale(5),
  },
  buttonTouchable1: {
    height: '97%',
    width: '99%',
    zIndex: 2,
    paddingHorizontal: moderateScale(15),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    borderRadius: moderateScale(5),
  },
  buttonText: {
    fontSize: moderateScale(14),

    fontFamily: 'Roboto-Regular',
  },
  buttonWhiteText: {
    fontSize: moderateScale(16),
    color: 'white',
    fontFamily: 'Roboto-Regular',
  },
  whitebuttonText: {
    fontSize: moderateScale(16),
    color: appStyles.colors.COLOR_RED,
  },
});
