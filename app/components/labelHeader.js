import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Platform,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import metrics from '../config/metrics';
import {moderateScale} from 'react-native-size-matters';
import {BackArrow} from '../config/svg';
import {TextInput} from 'react-native-gesture-handler';
import AppStyles from '../config/styles';
let phNO = '';

export default class LabelHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddMemberModal: false,
    };
  }

  _closeModal = () => {
    //alert('Hai')
    this.setState({
      showAddMemberModal: false,
    });
  };

  _clickMenuBar = () => {
    this.setState({
      showAddMemberModal: true,
    });
  };
  _goback = () => {
    this.props.navigation.goBaack();
  };
  render() {
    return (
      <SafeAreaView>
        <View style={styles.main}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              //paddingHorizontal: moderateScale(5),
            }}>
            <TouchableOpacity
              style={styles.backArrow}
              onPress={() => this.props.onPress()}>
              <BackArrow
                size={moderateScale(20)}
                color={AppStyles.colors.COLOR_WHITE}
              />
            </TouchableOpacity>
            <Text
              numberOfLines={1}
              style={{
                fontSize: moderateScale(14),
                marginLeft: moderateScale(10),
                color: 'white',
                fontFamily:'System'
              }}>
              {this.props.Label}
            </Text>
            <View style={{paddingRight: moderateScale(20)}} />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    height: moderateScale(60),
    width: '100%',
    paddingHorizontal: moderateScale(10),
   // elevation: 2,
    backgroundColor: AppStyles.colors.COLOR_PRIMARY,
  },
  backArrow: {
    paddingHorizontal: moderateScale(10),
    height: '75%',
    //width:50,
    justifyContent: 'center',
    alignItems: 'center',
   // backgroundColor:'red'
  },
  locationTouchable: {
    height: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  inputDataText: {
    height: '65%',
    elevation: moderateScale(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginBottom: moderateScale(20),
    backgroundColor: AppStyles.colors.COLOR_PRIMARY, //
    paddingHorizontal: moderateScale(15),
    borderRadius: moderateScale(3),
  },
});
