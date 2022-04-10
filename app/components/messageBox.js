import React from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  TouchableOpacity
} from "react-native";
import {moderateScale} from 'react-native-size-matters';

import metrics from "../config/metrics";
import appStyles from "../config/styles";
import {HalfButton} from './button'
import AppStyles from '../config/styles';

export default function HudView (props) {
 
  

    return (
      <TouchableOpacity
        style={{
          position: "absolute",
          zIndex:10,
          height: metrics.SCREEN_HEIGHT,
          width: metrics.SCREEN_WIDTH,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(110,110,110,.5)"
        }}
        activeOpacity={1}
        onPress={props.onPress}
      >
        <View
          style={{
            width: "75%",
            paddingHorizontal:moderateScale(25),
            height: moderateScale(150),
            justifyContent:'space-around',
            backgroundColor:"white",
            alignItems: "center",
            //flexDirection:'row',
            borderRadius: moderateScale(5)
          }}
        >
          
          <Text style={{fontFamily:'Roboto-Regular',color:AppStyles.colors.COLOR_PRIMARY,fontSize:moderateScale(16)}}>{props.message}</Text>
          <HalfButton Label={props.Label} onPress={props.onPress} height={moderateScale(40)} backgroundColor={AppStyles.colors.COLOR_PRIMARY} textColor={'white'}/>
        </View>
      </TouchableOpacity>
    );}


