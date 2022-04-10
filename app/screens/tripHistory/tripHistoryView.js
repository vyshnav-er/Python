import React, {Component} from 'react';
import {
  Keyboard,
  BackHandler,
  SafeAreaView,
  StatusBar,
  View,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  Animated,
} from 'react-native';
import moment from 'moment/src/moment';
import HorizontalDatePicker from '@logisticinfotech/react-native-horizontal-date-picker';
import LabelHeader from '../../components/labelHeader';
import DatePickerComponent from '../../components/datePickerComponent';
import Toast from 'react-native-simple-toast';
import styles from './styles';
import appStyles from '../../config/styles';
import HudView from '../../components/hudView';
import {moderateScale} from 'react-native-size-matters';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {RightArrow} from '../../config/svg';
import AppStyles from '../../config/styles';
import DatePicker from 'react-native-date-picker'
import MessageBox from '../../components/messageBox';
const coordinates = [[76.9102172, 8.5003739]];
let plate = [];
let imeiNo = '';
let driverId='';
let categoryType='';
let nameDriver = '';
class TripHistoryView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: '',
      endDate: '',
      imeiNo: '',
      tripDetails: [],
      isDatePickerVisible: false,
      Date: '',
      showMessage: false,
    };
    this.back = false;
    this._map = null;
  }

  componentDidMount() {
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardDidHide,
    );
    this.props._clearTripHistoryList();
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
  _getTripHistoryList = () => {
    this.props.EnableLoader();
    const data = {
      token: this.props.Login.resp.accessToken,
      imeino: imeiNo,
      driverId:driverId,
      categoryType:categoryType,
      startTime: moment(this.state.startDate, 'Do-MM-YYYY HH:mm:ss').format(
        'YYYY-MM-DD HH:mm:ss',
      ),
      endTime: moment(this.state.endDate, 'Do-MM-YYYY HH:mm:ss').format(
        'YYYY-MM-DD HH:mm:ss',
      ),
      //startTime: this.state.startDate,
      //endTime: this.state.endDate,
    };
    this.props._getTripHistoryList(data, this.props.Login.region);
  };

  // _tripHistoryDetails = item => {
  //   this.props.navigation.navigate('TripListDetail', {
  //     plate: plate,
  //     imeiNo:imeiNo,
  //     item: item,
  //   });
  // };
  _getTripHistoryDetailList = item => {
    this.props.EnableLoader();
    const data = {
      token: this.props.Login.resp.accessToken,
      imeino: imeiNo,
      driverId:driverId,
     
      startTime: moment(item.startDate, 'DD-MM-YYYY HH:mm:ss').format(
        'YYYY-MM-DD HH:mm:ss',
      ),
      endTime: moment(item.endDate, 'DD-MM-YYYY HH:mm:ss').format(
        'YYYY-MM-DD HH:mm:ss',
      ),
    };
    this.props._getTripHistoryDetailList(
      data,
      () =>
        this.props.navigation.navigate('TripListDetail', {
          plate: plate,
          item: item,
          imeiNo: imeiNo,
        }),
        
      this.props.Login.region,
    );
  };
  _detailListRender = ({item, index}) => {
    if (item.startDate != '') {
      var str = item.startDate;
      var res = str.split(' ');
    }
    if (item.endDate != '') {
      var endd = item.endDate;
      var endres = endd.split(' ');
    }

    if (item.totalodo != '') {
      var num = item.totalodo;
      var n = num.toFixed(2);
    }
    return (
      <View>
        <TouchableOpacity
          style={{
            borderBottomWidth: moderateScale(1),
            borderBottomColor: 'lightgrey',
          }}
          activeOpacity={0.3}
          onPress={() => {
            this._getTripHistoryDetailList(item, index);
          }}>
          <View style={[styles.renderContainer, {flexDirection: 'row'}]}>
            <View style={{flex: 1}}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.coordsText}>Start : </Text>
                <View>
                  <Text style={styles.coordsText}>{res[0]}</Text>
                  <Text style={{textAlign: 'right'}}>{res[1]}</Text>
                </View>
              </View>
              <Text>Trip Distance : {n == '' || n == null ? 0 : n} Km </Text>
              <Text>Max Speed : {item.maxspeed} km/hr</Text>
              <Text>
                {item.drivername != '' && item.drivername != null
                  ? item.drivername
                  : 'No Driver ID'}
              </Text>
              {item.mobile != '' && item.mobile != null && (
                <Text onPress={() => Linking.openURL(`tel:${item.mobile}`)}>
                  {item.mobile}
                </Text>
              )}
            </View>
            <View style={{flex: 1}}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.coordsText}>End : </Text>
                <View>
                  <Text style={styles.coordsText}>{endres[0]}</Text>
                  <Text style={{textAlign: 'right'}}>{endres[1]}</Text>
                </View>
              </View>
              <Text>Duration : {item.totalDuration} </Text>

              <Text>Alarm Count : {item.totalalarmcnt}</Text>
              {item.employeeid != '' && item.employeeid != null && (
                <Text>Emp ID : {item.employeeid}</Text>
              )}
            </View>
            <View style={{marginTop: moderateScale(5)}}>
              <RightArrow
                size={moderateScale(14)}
                color={AppStyles.colors.COLOR_PRIMARY}
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  _goback = () => {
    this.props.navigation.goBack();
  };

  _show = () => {
    this.state.Date == ''
      ? this.setState({showMessage: true})
      : this._getTripHistoryList();
  };

  render() {
    plate = this.props.route.params.plate;
    imeiNo = this.props.route.params.imeiNo;
    driverId = this.props.route.params.driverId;
    categoryType=this.props.DetailList.type;
    nameDriver= this.props.DetailList.list[0].drivername
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          backgroundColor={appStyles.colors.COLOR_PRIMARY}
          barStyle="light-content"
        />
        {this.props.Loading.isLoading && <HudView />}
        <LabelHeader
          Label={'GTRACKIT'}
          onPress={() => {
            this._goback();
          }}
        />
        <DatePickerComponent
          selectDateText={this.state.Date}
          onPress={() => {
            this._show();
          }}
          onDatePickerPress={() => {
            this.setState({isDatePickerVisible: true});
          }}
        />
      
        <DateTimePickerModal
        display={'spinner'}
          isVisible={this.state.isDatePickerVisible}
          mode="date"
          // style={{height:50,width:'100%'}}
         maximumDate={new Date()}
          //minimumDate={new Date(new Date().getTime()-15811200000)}
          onConfirm={date =>
            // this.setState({
            //   Date: moment(date).format('DD-MM-YYYY'),
            //   isDatePickerVisible: false,
            // })
            this.setState({
              startDate: moment(date).format('DD-MM-YYYY') + ' 00:00:01',
              endDate: moment(date).format('DD-MM-YYYY') + ' 23.59.59',
              Date: moment(date).format('DD-MM-YYYY'),
              isDatePickerVisible: false,
            })
          }
          onCancel={() => this.setState({isDatePickerVisible: false})}
        />
          
        {this.state.showMessage && (
          <MessageBox
            message={'Select a date to continue'}
            Label={'OK'}
            onPress={() => {
              this.setState({showMessage: false});
            }}
          />
        )}
        {this.props.MessageBox.isMessagebox && (
          <MessageBox
            message={'No data found'}
            Label={'OK'}
            onPress={() => {
              this.props._disableMessageBox();
            }}
          />
        )}
        {this.props.MessageBox.isInternalMessageBox && (
          <MessageBox
            message={'Internal Error'}
            Label={'OK'}
            onPress={() => {
              this.props._disableInternalMessageBox();
            }}
          />
        )}
        {this.props.TripHistoryList.emptyArray && (
          <MessageBox
            message={'No Trips,Try search another day'}
            Label={'OK'}
            onPress={() => {
              this.props._disableTripListMessageBox();
            }}
          />
        )}
        {this.props.TripHistoryList.tripList? (
          <View style={{flex: 1,backgroundColor:'white'}}>
            <Text style={styles.coordsText}> {categoryType == 'dr'? 'Driver Name : '+ nameDriver : 'Plate : '+ plate}</Text>
            <FlatList
              data={
                this.props.TripHistoryList.tripList
                  ? this.props.TripHistoryList.tripList
                  : ''
              }
              renderItem={(item, index) => this._detailListRender(item, index)}
              extraData={this.state}
              keyboardShouldPersistTaps={'always'}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        ) : (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:'white'}}>
            <Text style={styles.coordsText}>Choose a date and continue</Text>
          </View>
        )}
           {/* <DatePicker
      date={this.state.Date}
      // onDateChange={setDate}
    /> */}
      </SafeAreaView>
    );
  }
}

export default TripHistoryView;
