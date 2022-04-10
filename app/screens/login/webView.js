import React, {useState, useEffect, Component} from 'react';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import {
  Image,
  View,
  Text,
  Keyboard,
  BackHandler,
  ScrollView,
  Alert,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import styles from './styles';
import Toast from 'react-native-simple-toast';
import {_ValidateEmail} from '../../config/commonGlobal';
import DropDown, {_onReturnValue} from '../../components/dropDown';
import LabelHeader from '../../components/labelHeader';
import DeviceInfo from 'react-native-device-info';
import AppStyles from '../../config/styles';
import {_RemoveWhiteSpace} from '../../config/commonGlobal';
import HudView from '../../components/hudView';
import {WebView} from 'react-native-webview';
import {HalfButton} from '../../components/button';
let url = '';
class WebViewClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
    };
    this.back = false;
  }
  componentDidMount() {
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardDidHide,
    );
   
    let uniqueId = DeviceInfo.getUniqueId();
    this.setState({deviceId: uniqueId});
    BackHandler.addEventListener('hardwareBackPress', () =>
    this._backHandlerPress(),
  );

}
componentWillUnmount() {
  BackHandler.removeEventListener('hardwareBackPress', () =>
    this._backHandlerPress(),
  );
}

_backHandlerPress() {
  this.props.navigation.goBack();
  return true;
}
  _goback = () => {
    this.props.navigation.goBack();
  };
  render() {
    url = this.props.route.params.url;
    return (
      <>
        <SafeAreaView style={styles.container}>
          <StatusBar
            backgroundColor={AppStyles.colors.COLOR_PRIMARY}
            barStyle="light-content"
          />
          <LabelHeader
            Label={'GTRACKIT'}
            onPress={() => {
              this._goback();
            }}
          />

          <WebView source={{uri: url}} />

          <View
            style={{
              position: 'absolute',
              bottom: 30,
              alignSelf: 'center',
              zIndex: 10,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection:'row'
            }}>
            <Text
              numberOfLines={1}
              style={{
                fontFamily: 'Robot-Regular',
                color: 'grey',
                fontSize: moderateScale(14),
                
              }}>
              {`Is a member? `}
            </Text>
            <Text
              numberOfLines={1}
              style={{
                fontFamily: 'Robot-Regular',
                color: AppStyles.colors.COLOR_PRIMARY,
                fontSize: moderateScale(14),
                textDecorationLine:'underline'
              }}
              onPress={()=>{this._goback()}}
              >
              Login
            </Text>
          </View>
        </SafeAreaView>
      </>
    );
  }
}

export default WebViewClass;
