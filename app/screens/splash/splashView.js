// import React, {useEffect} from 'react';
import React, {Component} from 'react';
import {
  SafeAreaView,
  Image,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import Toast from 'react-native-simple-toast';
import AppStyles from '../../config/styles';
import NetInfo from '@react-native-community/netinfo';
import styles from './styles';
import metrics from '../../config/metrics';
import Logo from '../../config/logo';
import HeaderImage from '../../config/headerImage';
class splash extends Component {
  componentDidMount = () => {
    setTimeout(() => {
      this.props.Login.isLogin
        ? this.props.navigation.navigate('Home')
        : this.props.navigation.navigate('Login');
    }, 2000);

    const unsubscribe = NetInfo.addEventListener(state => {
      this.props.handleNetworkChange(state.isInternetReachable);
      !state.isInternetReachable && Toast.show('No Internet', Toast.LONG);
    });
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <StatusBar backgroundColor={'#144072'} barStyle="light-content" />
        <ImageBackground
          style={{flex: 1}}
          position="absolute"
          source={require('../../assets/Images/pic/MapBackground.png')}
          resizeMode={'cover'}>
          <View style={{flex: 1, backgroundColor: '#FFFFFF60'}}>
            <View
              style={{
                flex: 1,
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
              }}>
              <HeaderImage
                height={moderateScale(255)}
                width={metrics.SCREEN_WIDTH}
              />
            </View>

            <View
              style={{
                height: '100%',
                flex: 3,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Logo height={moderateScale(75)} width={moderateScale(226)} />
            </View>
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

export default splash;