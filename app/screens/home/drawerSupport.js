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
  Linking,
} from 'react-native';
import {connect} from 'react-redux';
import styles from './styles';
import LabelHeader from '../../components/labelHeader';
import AppStyles from '../../config/styles';
import {_RemoveWhiteSpace} from '../../config/commonGlobal';
import { Phone, SMS } from '../../config/svg';
class WebViewClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      number:''
    };
    this.back = false;
  }
  componentDidMount() {
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardDidHide,
    );
 //   BackHandler.addEventListener('hardwareBackPress', this._backHandlerPress);
    BackHandler.addEventListener('hardwareBackPress', () =>
    this._backHandlerPress(),
  );
  this.props.Login.region == 'Oman'
                ? this.setState({number:'+968 91102030'})
                : this.props.Login.region == 'UAE'
                ?this.setState({number:'+971 523804216'}) 
                :
                this.props.Login.region=='India'? this.setState({number:'+91 755-8939629'}):
                this.props.Login.region=='Rest of the world'? this.setState({number:'+91 755-8939629'}):
                this.props.Login.region=='Demo'? this.setState({number:'+971 521392379'}): ''
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
          <View style={{flex: 1, backgroundColor: 'white',justifyContent:'center',alignItems:'center',paddingBottom:moderateScale(100)}}>
            <Text
              numberOfLines={1}
              style={{
                fontFamily: 'Roboto-Regular',
                color: AppStyles.colors.COLOR_GREY,
                fontSize: moderateScale(20),
              }}>
              For Your Support
            </Text>
            <Text
              numberOfLines={1}
              style={{
                fontFamily: 'Roboto-Regular',
                color: AppStyles.colors.COLOR_BLACK,
                fontSize: moderateScale(25),
               
              }}>
              Contact
            </Text>
            <Text
              numberOfLines={1}
              style={{
                fontFamily: 'Roboto-Regular',
                color: AppStyles.colors.COLOR_BLACK,
                fontSize: moderateScale(25),
                
              }}
              >
             {this.state.number}
            </Text>
            <View style={{flexDirection:'row',marginTop:moderateScale(20),width:150,justifyContent:'space-around'}}>
              <TouchableOpacity onPress={() => Linking.openURL(`tel:${this.state.number}`)}>
              <Phone size={moderateScale(30)} color={AppStyles.colors.COLOR_PRIMARY}/>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Linking.openURL(`sms:`+this.state.number+`?body=`)}>
              
              <SMS size={moderateScale(30)} color={AppStyles.colors.COLOR_PRIMARY}/>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </>
    );
  }
}
function mapStateToProps(state) {
  return {
   
    Login: state.loginReducer,
   
  };
}
function mapDispatchToProps(dispatch) {
  return {
   
    EnableLoader: () => dispatch(Actions.loadingAction.enableLoader()),
    disableLoader: () => dispatch(Actions.loadingAction.disableLoader()),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WebViewClass);

