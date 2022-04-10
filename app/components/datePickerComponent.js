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
import {BackArrow, Calender} from '../config/svg';
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
              justifyContent: 'center',
              //paddingHorizontal: moderateScale(5),
            }}>
            <TouchableOpacity
              style={styles.backArrow}
              onPress={() => this.props.onDatePickerPress()}>
              <Calender
                size={moderateScale(20)}
                color={AppStyles.colors.COLOR_WHITE}
              />
              <Text  numberOfLines={1}
              style={{
                fontSize: moderateScale(14),
                marginLeft: moderateScale(10),
                color: 'white',
                fontFamily:'Roboto-Regular'
              }}>{this.props.selectDateText==''?'Select a date':this.props.selectDateText}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={{backgroundColor:'white',marginLeft:moderateScale(50)}}
            onPress={() => this.props.onPress()}>
            <Text  numberOfLines={1}
              style={{
                fontSize: moderateScale(12),
                margin: moderateScale(8),
                color: AppStyles.colors.COLOR_PRIMARY,
                fontFamily:'Roboto-Regular'
              }}>Show</Text>

            </TouchableOpacity>
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
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection:'row',
    borderBottomWidth:1,
    borderBottomColor:'white'
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
