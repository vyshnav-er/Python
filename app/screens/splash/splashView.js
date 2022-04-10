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
  FlatList,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import Toast from 'react-native-simple-toast';
import AppStyles from '../../config/styles';
import NetInfo from '@react-native-community/netinfo';
import styles from './styles';
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
      <SafeAreaView style={styles.container}>
        <StatusBar
          backgroundColor={AppStyles.colors.COLOR_WHITE}
          barStyle="dark-content"
        />
        <View style={styles.contentContainer}>
          <View />
          <Image
            style={styles.Logo}
            resizeMode={'cover'}
            source={require('../../assets/Images/pic/Logo.jpeg')}
          />
          <Text style={styles.textStyle}>Powered By ZaeemSolutions</Text>
        </View>
      </SafeAreaView>
    );
  }
}

export default splash;
