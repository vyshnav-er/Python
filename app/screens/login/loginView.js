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
  ImageBackground
} from 'react-native';
import {LongButton, WhiteButtonHalf} from '../../components/button';
import styles from './styles';
import Toast from 'react-native-simple-toast';
import {_ValidateEmail} from '../../config/commonGlobal';
import DropDown, {_onReturnValue} from '../../components/dropDown';
import DeviceInfo from 'react-native-device-info';
import AppStyles from '../../config/styles';
import TextInput from 'react-native-material-textinput';
import {_RemoveWhiteSpace} from '../../config/commonGlobal';
import HudView from '../../components/hudView';
import {ShowPassword,Password,Tick,Username} from '../../config/svg';
import HeaderImage from '../../config/headerImage';
import Logo from '../../config/logo';
import metrics from '../../config/metrics';
let dataRegion = ['UAE', 'Oman','India','Rest of the world','Demo'];
let signUp = 'http://zaeemsolutions.com/contact-us/';
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      userPassword: '',
      deviceId: '',
      userRegion: '',
      captchaCode: '',
      userNameError: false,
      showPassword: true,
    };
    this.back = false;
  }
  componentDidMount() {
    this.props.LoginFailed();
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardDidHide,
    );
    BackHandler.addEventListener('hardwareBackPress', () =>
    this._backHandlerPress(),

  //  this.setState({userName:this.props.ISLogin.FCM})
  );

    let uniqueId = DeviceInfo.getUniqueId();
    // console.log("DEVICE ID IS",this.state.deviceId,uniqueId);
    this.setState({deviceId: uniqueId});
  }
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this._backHandlerPress);

  }
  //Android back button handler
  _backHandlerPress() {
      this.back
        ? BackHandler.exitApp()
        : (Toast.show('Press again to exit app'), (this.back = true));
    
    return true;
  }
  _onLogin = () => {
    Keyboard.dismiss();
    const params = {
      un: this.state.userName.trim(),
      pwd: this.state.userPassword.trim(),
      rgn: this.state.userRegion.trim(),
      captchaCode: this.state.captchaCode,
      fcmToken:this.props.ISLogin.FCM
    };
    this.props.EnableLoader();
    this.props.Login(params, this.state.deviceId,this.state.userRegion);
  };

  _onEndEditing = Item => {
    if (_ValidateEmail(Item)) {
      this.setState({userNameError: false});
    } else {
      this.setState({userNameError: true});
    }
  };
  _onValue = item => {
    const value = _onReturnValue(item);
    if (value != '') {
      this.setState({showUserRegion: false, userRegion: value});
    }
  };
  render() {
    return (
      <>
        <SafeAreaView style={{flex: 1}}>
          <ImageBackground
            style={{flex: 1, height: '100%', width: '100%'}}
            source={require('../../assets/Images/pic/MapBackground.png')}
            resizeMode={'cover'}>
            <View
              style={{flex: 1, backgroundColor: 'rgba(255, 255, 255, 0.9)'}}
              >
              <StatusBar
                backgroundColor={'#144072'}
                barStyle="light-content"
              />
              <View
                style={{
                  width: '100%',
                  // backgroundColor: 'red'
                }}>
                <HeaderImage
                  height={moderateScale(255)}
                  width={metrics.SCREEN_WIDTH}
                />
              </View>
              {this.props.Loading.isLoading && (
                <HudView
                  onPress={() => {
                    this.props.disableLoader();
                  }}
                />
              )}
              <ScrollView
                keyboardShouldPersistTaps={'always'}
                style={{
                  paddingHorizontal: moderateScale(20),
                  // backgroundColor: 'white',
                }}
                showsVerticalScrollIndicator={false}>
              <View style={styles.welcomeBox}>
                <Text
                  style={{
                    left: moderateScale(15),
                    bottom: moderateScale(-10),
                    fontSize: 14,
                    color: '#1F97DE',
                    fontWeight: '500',
                    fontFamily: 'Poppins-SemiBold',
                  }}>
                  Welcome to
                </Text>
                <Logo
                  height={moderateScale(44)}
                  width={moderateScale(132)}
                />
                {/* <Text
                  style={{
                    fontSize: 24,
                    color: '#144072',
                    fontWeight: '600',
                    fontFamily: 'Poppins-SemiBold',
                  }}>
                  G-Trackit
                </Text> */}
              </View>
              
                {this.props.ISLogin.failed && (
                  <Text style={styles.errorText}>
                    Wrong username or password. Please retry
                  </Text>
                )}
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                    alignItems: 'center',
                  }}>
                  <View style={{position: 'absolute'}}>
                    <Username
                      height={moderateScale(15)}
                      width={moderateScale(14)}
                      color="#909090"
                    />
                  </View>
                  <View style={{width: '100%'}}>
                    <TextInput
                      paddingLeft={moderateScale(20)}
                      // marginTop={moderateScale(20)}
                      label="User Name *"
                      fontSize={moderateScale(13)}
                      labelColor={'grey'}
                      value={this.state.userName}
                      onChangeText={name =>
                        this.setState({userName: name.replace(/\s/g, '')})
                      }
                      error={
                        this.state.userNameError && 'Enter Valid Username'
                      }
                      //  onEndEditing={() => this._onEndEditing(this.state.userName)}
                      fontFamily={'Roboto-Regular'}
                      underlineActiveColor={'green'}
                      underlineActiveHeight={1}
                    />
                  </View>
                  <View style={{position: 'absolute', right: 5}}>
                    <Tick
                      height={moderateScale(14)}
                      width={moderateScale(15)}
                      color="#909090"
                    />
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                    alignItems: 'center',
                  }}>
                  <View style={{position: 'absolute'}}>
                    <Password
                      height={moderateScale(15)}
                      width={moderateScale(12)}
                    />
                  </View>
                  <View style={{width: '100%'}}>
                    <TextInput
                      label="Password *"
                      labelColor={'grey'}
                      fontSize={moderateScale(13)}
                      paddingLeft={moderateScale(20)}
                      value={this.state.userPassword}
                      secureTextEntry={this.state.showPassword && true}
                      fontFamily={'Roboto-Regular'}
                      underlineActiveColor={'green'}
                      underlineActiveHeight={1}
                      onChangeText={password =>
                        this.setState({
                          userPassword: password.replace(/\s/g, ''),
                        })
                      }
                    />
                  </View>
                  <TouchableOpacity
                    style={{position: 'absolute', right: 5}}
                    onPress={() =>
                      this.setState({
                        showPassword: !this.state.showPassword,
                      })
                    }>
                    <ShowPassword
                      height={moderateScale(10)}
                      width={moderateScale(19)}
                      color={AppStyles.colors.COLOR_PRIMARY}
                    />
                  </TouchableOpacity>
                </View>
                <DropDown
                  _onPress={() =>
                    this.setState(
                      {showUserRegion: !this.state.showUserRegion},
                      Keyboard.dismiss(),
                    )
                  }
                  data={dataRegion ? dataRegion : ''}
                  showUserRegion={this.state.showUserRegion}
                  HeaderText={
                    this.state.userRegion != ''
                      ? this.state.userRegion
                      : 'Select Region *'
                  }
                  height={moderateScale(45)}
                  _onValue={() => {
                    this._onValue(this.state.userRegion);
                  }}
                  TextColor={this.state.userRegion != '' ? 'black' : 'grey'}
                />
                <Text
                  style={[
                    styles.colorTextRight,
                    {marginTop: moderateScale(10)},
                  ]}
                  onPress={() => {
                    this.props.navigation.navigate('Forgot');
                  }}>
                  Forgot Password
                </Text>
                {/* <Text style={styles.plainTextLeft} numberOfLines={2}>
                  {`By logging in you agree to G-Trackit's `}
                  <Text
                    style={
                      styles.colorTextUnderLine
                    }>{`Terms of use`}</Text>
                  <Text style={styles.plainTextLeft}>{`  &  `}</Text>
                  <Text style={styles.colorTextUnderLine}>{`Policy`}</Text>
                </Text> */}

                <View style={styles.buttonContainer}>
                  <LongButton
                    disabled={
                      this.state.userName == '' ||
                      this.state.userPassword == '' ||
                      this.state.userRegion == ''
                      // ||
                      // this.state.userRegion == ''
                    }
                    Label={'Login'}
                    color={AppStyles.colors.COLOR_PRIMARY}
                    height={moderateScale(45)}
                    onPress={() => {
                      {
                        this.state.userName == '' ||
                        this.state.userPassword == ''
                          ? // ||
                            // this.state.userRegion == ''
                            Toast.show(
                              'Fill all mandatory fields',
                              Toast.SHORT,
                            )
                          : this._onLogin();
                      }
                    }}
                  />
                </View>
                <View>
                  <Text
                    style={{
                      ...styles.plainTextLeft,
                      marginTop: moderateScale(30),
                    }}
                    numberOfLines={2}>
                    {`By logging in you agree to G-Trackit's `}
                    <Text
                      style={
                        styles.colorTextUnderLine
                      }>{`Terms of use`}</Text>
                    <Text style={styles.plainTextLeft}>{`  &  `}</Text>
                    <Text
                      style={styles.colorTextUnderLine}>{`Policy`}</Text>
                  </Text>
                </View>
                {/* <View
                  style={[styles.buttonContainer, {alignSelf: 'center'}]}>
                  <Text
                    style={styles.plainTextLeft}>{`Not a member? `}</Text>
                  <Text
                    style={styles.colorTextUnderLine}
                    onPress={() => {
                      this.props.navigation.navigate('WebView', {
                        url: signUp,
                      });
                    }}>{`Sign Up`}</Text>
                </View> */}
                <View style={{height: moderateScale(15)}} />
              </ScrollView>
            </View>
          </ImageBackground>
        </SafeAreaView>
      </>
    );
  }
}

export default Login;
