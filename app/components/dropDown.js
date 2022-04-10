import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Platform,
  Image,
} from 'react-native';
import {
  SelectedService,
  Plumber,
  Electrician,
  Tailor,
  Doctor,
  Driver,
  More,
  LocationPin,
  Phone,
  UserIcon,
} from '../config/svg';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';

import appStyles from '../config/styles';
import {SelectDistrict, UpArrow, DownArrow} from '../config/svg';
import {Item} from 'native-base';
let data = '';
export function _onReturnValue(item) {
  item = data;
  if (item != '') {
    return item;
  }
}
export default class DropDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: '',
    };
  }
  _onSelect = (item, index) => {  

    data = item;
    this.props._onValue();
  };

  _dropDownRender = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.dropDownRenderContainer}
        onPress={() => this._onSelect(item, index)}>
        <Text style={{color: 'black', fontSize: moderateScale(12)}}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };
  render() {
    return (
      <View>
        <TouchableOpacity
          style={[styles.inputDataTouchable, {height: this.props.height}]}
          onPress={() => {
            this.props._onPress(),
              this.setState({showFlatlist: !this.state.showFlatlist});
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={{
                fontSize: moderateScale(13),
                //marginLeft: moderateScale(5),
                color: this.props.TextColor,
                fontFamily: 'Roboto-Regular',
              }}>
              {this.props.HeaderText}
            </Text>
          </View>
          {!this.props.showUserRegion ? <DownArrow /> : <UpArrow />}
        </TouchableOpacity>
        {this.props.showUserRegion && (
          <FlatList
            data={this.props.data ? this.props.data : ''}
            renderItem={(item, index) => this._dropDownRender(item, index)}
            extraData={this.state}
            keyboardShouldPersistTaps={'always'}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appStyles.colors.COLOR_RED,
  },
  contentContainer: {},
  inputContainer: {
    flex: 1,

    //padding: moderateScale(20),
    //paddingTop: moderateScale(20),
    //justifyContent: 'space-evenly',
    backgroundColor: 'white',
  },
  dropDownRenderContainer: {
    borderBottomWidth: 1,
    width: '100%',
    alignSelf: 'center',
    borderColor: 'grey',
    height: moderateScale(50),
    paddingLeft: moderateScale(10),
    //paddingVertical:moderateScale(1),
    justifyContent: 'center',
    backgroundColor: appStyles.colors.COLOR_SECONDARY,
  },
  inputDataText: {
    height: moderateScale(30),
    width: '100%',
    backgroundColor: '#fff',

    padding: 0,
    borderBottomWidth: 1,
    borderColor: 'grey',
  },
  inputDataTouchable: {
    marginBottom: moderateScale(0),
    justifyContent: 'space-between',
    paddingRight: moderateScale(7),
    alignItems: 'center',
    flexDirection: 'row',
    height: moderateScale(30),
    width: '100%',
    backgroundColor: '#fff',

    // padding: moderateScale(5),
    borderBottomWidth: 1,
    borderColor: 'grey',
  },
  firText: {
    fontSize: moderateScale(14),
    fontWeight: 'bold',
    color: appStyles.colors.COLOR_GREY,
    marginBottom: moderateScale(15),
  },
  buttonContainer: {
    //flex: 1,
    marginTop: moderateScale(20),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
  },
});
