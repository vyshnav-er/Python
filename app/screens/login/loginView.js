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
import {Showpassword} from '../../config/svg';
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
        <SafeAreaView style={styles.container}>
          <StatusBar
            backgroundColor={AppStyles.colors.COLOR_PRIMARY}
            barStyle="light-content"
          />
          {this.props.Loading.isLoading && (
            <HudView
              onPress={() => {
                this.props.disableLoader();
              }}
            />
          )}
          <View style={styles.imageContainer}>
            <Image
              style={styles.Logo}
              source={require('../../../assets/Images/pic/Logo.png')}
              resizeMode={'cover'}
            />
          </View>
          <ScrollView
            keyboardShouldPersistTaps={'always'}
            style={{
              paddingHorizontal: moderateScale(20),
              backgroundColor: 'white',
            }}
            showsVerticalScrollIndicator={false}>
            {this.props.ISLogin.failed && (
              <Text style={styles.errorText}>
                Wrong username or password. Please retry
              </Text>
            )}
            <TextInput
              marginTop={moderateScale(20)}
              label="User Name *"
              fontSize={moderateScale(13)}
              labelColor={'grey'}
              value={this.state.userName}
              onChangeText={name =>
                this.setState({userName: name.replace(/\s/g, '')})
              }
              error={this.state.userNameError && 'Enter Valid Username'}
              //  onEndEditing={() => this._onEndEditing(this.state.userName)}
              fontFamily={'Roboto-Regular'}
              underlineActiveColor={'green'}
              underlineActiveHeight={1}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                alignItems: 'center',
              }}>
              <View style={{width: '100%'}}>
                <TextInput
                  label="Password *"
                  labelColor={'grey'}
                  fontSize={moderateScale(13)}
                  value={this.state.userPassword}
                  secureTextEntry={this.state.showPassword && true}
                  fontFamily={'Roboto-Regular'}
                  underlineActiveColor={'green'}
                  underlineActiveHeight={1}
                  onChangeText={password =>
                    this.setState({userPassword: password.replace(/\s/g, '')})
                  }
                />
              </View>
              <TouchableOpacity
                style={{position: 'absolute', right: 5}}
                onPress={() =>
                  this.setState({showPassword: !this.state.showPassword})
                }>
                <Showpassword
                  size={moderateScale(20)}
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
              style={[styles.colorTextRight, {marginTop: moderateScale(10)}]}
              onPress={() => {
                this.props.navigation.navigate('Forgot');
              }}>
              Forgot Password
            </Text>
            <Text style={styles.plainTextLeft} numberOfLines={2}>
              {`By logging in you agree to G-Trackit's `}
              <Text style={styles.colorTextUnderLine}>{`Terms of use`}</Text>
              <Text style={styles.plainTextLeft}>{`  &  `}</Text>
              <Text style={styles.colorTextUnderLine}>{`Policy`}</Text>
            </Text>

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
                    this.state.userName == '' || this.state.userPassword == ''
                      ? // ||
                        // this.state.userRegion == ''
                        Toast.show('Fill all mandatory fields', Toast.SHORT)
                      : this._onLogin();
                  }
                }}
              />
            </View>
            <View style={[styles.buttonContainer, {alignSelf: 'center'}]}>
              <Text style={styles.plainTextLeft}>{`Not a member? `}</Text>
              <Text
                style={styles.colorTextUnderLine}
                onPress={() => {
                  this.props.navigation.navigate('WebView', {url: signUp});
                }}>{`Sign Up`}</Text>
            </View>
            <View style={{height: moderateScale(15)}} />
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}

export default Login;
