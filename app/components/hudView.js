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
            height: moderateScale(80),
            backgroundColor:"white",
            alignItems: "center",
            flexDirection:'row',
            borderRadius: moderateScale(5)
          }}
        >
          <ActivityIndicator size="large" color={appStyles.colors.COLOR_PRIMARY} />
          <Text style={{marginHorizontal:moderateScale(20),fontFamily:'Roboto-Regular'}}>Please wait...</Text>
        </View>
      </TouchableOpacity>
    );

      
}
