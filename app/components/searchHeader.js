import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import metrics from '../config/metrics';
import {moderateScale} from 'react-native-size-matters';
import {BackArrow, Search} from '../config/svg';
import {TextInput} from 'react-native-gesture-handler';
import AppStyles from '../config/styles';

let phNO = '';

export default class SearchHeader extends Component {
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
    this.props.navigation.goBack();
  };
  render() {
    return (
      <View>
        <TouchableOpacity style={styles.main} activeOpacity={1}
        onPress={this.props._search}
        >
          <View style={styles.inputDataText}>
            <Text style={styles.searchText}>Search </Text>
          </View>
          <Search
            color={AppStyles.colors.COLOR_WHITE}
            size={moderateScale(20)}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    height: moderateScale(45),
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(15),
    elevation: 2,
    backgroundColor: AppStyles.colors.COLOR_PRIMARY,
  },
  inputDataText: {
    height: '65%',
    width: '90%',
    padding: moderateScale(0),
    paddingLeft: moderateScale(10),
    borderRadius: moderateScale(3),
    borderBottomColor: AppStyles.colors.COLOR_WHITE,
    borderBottomWidth: moderateScale(0.75),
  },
  searchText: {
    fontSize: moderateScale(13),
    color: AppStyles.colors.COLOR_WHITE,
    fontFamily: 'Roboto-Regular',
  },
});
