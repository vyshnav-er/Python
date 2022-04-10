import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';

// //Function Component
import AppStyles from '../config/styles';
import metrics from '../config/metrics';
import { LongButton } from './button';
// //Package
import { moderateScale } from 'react-native-size-matters';

export function TripListMapButtonContainer(props) {
  return (
    <View
      style={{
        flex: 1.25,
        paddingHorizontal: moderateScale(10),
        borderTopWidth: 1,
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center', backgroundColor: 'white'
      }}>
      <TouchableOpacity
        style={{
          height: moderateScale(50),
          width: moderateScale(100),
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: AppStyles.colors.COLOR_PRIMARY,
        }}
        onPress={props.onPress}>
        <Text
          style={{
            color: AppStyles.colors.COLOR_WHITE,
            fontSize: moderateScale(14),
          }}>
          {props.show ? 'List' : 'Map'}
        </Text>
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          //paddingHorizontal: moderateScale(10),
          alignItems: 'flex-end',
        }}>
        <Text style={styles.coordsText} numberOfLines={2}>
          Plate No : {props.plate}
        </Text>
        <Text style={styles.coordsText} numberOfLines={2}>
          Vehicle ID : {props.imeiNo}
        </Text>
      </View>
    </View>
  );
}
export function Logout(props) {
  return (
    <TouchableOpacity
      style={{
        position: 'absolute',
        zIndex: 10,
        height: metrics.SCREEN_HEIGHT,
        width: metrics.SCREEN_WIDTH,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(110,110,110,.5)',
      }}
      activeOpacity={1}
      onPress={() => {
        props.navigation.goback();
      }}>
      <View
        style={{
          width: '75%',
          paddingHorizontal: moderateScale(25),
          height: moderateScale(80),
          backgroundColor: 'white',
          alignItems: 'center',
          flexDirection: 'row',
          borderRadius: moderateScale(5),
        }}>
        <Text
          style={{
            marginHorizontal: moderateScale(20),
            fontFamily: 'Roboto-Regular',
          }}>
          Please wait...
        </Text>
      </View>
    </TouchableOpacity>
  );
}
export function TripListDetailContainer(props) {
  if (props.item?.startDate != '') {
    var strdate = props.item?.startDate;
    var resstrDate = strdate.split(' ');
  }
  if (props.item?.startDate != '') {
    var enddate = props.item?.endDate;
    var resendDate = enddate.split(' ');
  }
  if (props.item?.totalodo != '') {
    var num = props.item?.totalodo;
    var n = num.toFixed(2);
  }
  return (
    <View style={{ flex: 1, paddingHorizontal: moderateScale(10) }}>
      <View
        style={{
          paddingVertical: moderateScale(15),
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.detailText}>Start : </Text>
            <View>
              <Text style={styles.detailText}>{resstrDate[0]}</Text>
              <Text style={[styles.detailText, { textAlign: 'right' }]}>
                {resstrDate[1]}
              </Text>
            </View>
          </View>
          <Text style={styles.detailText}>
            Drive Duration : {props.item?.totalDuration}
          </Text>
          <Text style={styles.detailText}>
            No of Alarms : {props.item?.totalalarmcnt}
          </Text>
        </View>
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.detailText}>End : </Text>
            <View>
              <Text style={styles.detailText}>{resendDate[0]}</Text>
              <Text style={[styles.detailText, { textAlign: 'right' }]}>
                {resendDate[1]}
              </Text>
            </View>
          </View>
          <Text style={styles.detailText}>
            Max Speed : {props.item?.maxspeed} Km/hr
          </Text>
          <Text style={styles.detailText}>Kms : {n} km</Text>
        </View>
      </View>
      <View style={{ width: '100%' }}>
        <LongButton
          Label={'Done'}
          color={AppStyles.colors.COLOR_BLACK}
          height={moderateScale(45)}
          onPress={props.onPress}
        />
      </View>
    </View>
  );
}
export function AlarmMarkerClick(props) {
  if (props.item?.createtime != '') {
    var date = props.item?.createtime;
    var resDate = date.split(' ');
  }

  return (
    <View style={{ paddingLeft: moderateScale(10) }}>
      <Text style={styles.detailText}>{props.item?.alarmText}</Text>
      <Text style={styles.detailText}>{props.item?.driverid}</Text>
      <Text style={styles.detailText}>{props.item?.drivername}</Text>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.detailText}>Time : </Text>
        <View>
          <Text style={styles.detailText}>{resDate[0]}</Text>
          <Text style={[styles.detailText, { textAlign: 'right' }]}>
            {resDate[1]}
          </Text>
        </View>
      </View>
      <Text style={styles.detailText}>Speed : {props.item?.maxspeed} Km/hr</Text>
      {/* <Text style={styles.detailText}>Kms : {n} km</Text> */}
    </View>
  );
}

export function MarkerPopUp(props) {
  return (
    <TouchableOpacity
      style={{
        position: 'absolute',
        zIndex: 3,
        height: metrics.SCREEN_HEIGHT,
        width: metrics.SCREEN_WIDTH,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(110,110,110,.5)',
      }}
      activeOpacity={1}
      onPress={props.onPress}>
      <View
        style={{
          width: '85%',
          padding: moderateScale(25),
          // height: '50%',
          justifyContent: 'space-around',
          backgroundColor: 'white',
          alignItems: 'center',
          flexDirection: 'row',
          borderRadius: moderateScale(5),
          zIndex: 25,
        }}>
        {props.Alarm ?
          <View style={{ flex: 1, alignSelf: 'flex-start' }}>
            <Text
              style={[
                styles.detailText,
                {
                  fontSize: moderateScale(16),
                  textAlign: 'center',
                  fontWeight: 'bold',
                  color: AppStyles.colors.COLOR_PRIMARY,
                },
              ]}>
              ALARM STATUS
          </Text>
            <Text
              style={[
                styles.detailText,
                {
                  fontSize: moderateScale(14),
                  color: AppStyles.colors.COLOR_PRIMARY,
                },
              ]}>
              Plate no : {props.Info?.plate}
            </Text>
            <Text
              style={[
                styles.detailText,
                {
                  fontSize: moderateScale(14),
                  color: AppStyles.colors.COLOR_PRIMARY,
                  marginBottom: moderateScale(5),
                },
              ]}>
              GPSID : {props.Info?.imeino}
            </Text>
            <Text
              style={[
                styles.detailText,
                {
                  fontSize: moderateScale(14),
                  marginBottom: moderateScale(10),
                  color: AppStyles.colors.COLOR_PRIMARY,
                },
              ]}>
              Alarm Details
          </Text>
            <Text style={[styles.detailText, { fontSize: moderateScale(14) }]}>
              Speed : {props.item?.speed} km/hr
          </Text>
            <Text style={[styles.detailText, { fontSize: moderateScale(14) }]}>
              Alarm :
            {props.item?.alarmText == '' ? 'No Alarm' : props.item?.alarmtext}
            </Text>

            <Text style={[styles.detailText, { fontSize: moderateScale(14) }]}>
              Address : {props.item?.address}
            </Text>
            <TouchableOpacity
              style={{
                alignSelf: 'center',
                marginTop: moderateScale(10),
                paddingVertical: moderateScale(7),
                paddingHorizontal: moderateScale(20),
                backgroundColor: AppStyles.colors.COLOR_PRIMARY,
              }}
              onPress={props.onPress}>
              <Text style={{ color: 'white', fontSize: moderateScale(14) }}>
                Ok
            </Text>
            </TouchableOpacity>

          </View>
          :
          <View style={{ flex: 1, alignSelf: 'flex-start' }}>
            <Text
              style={[
                styles.detailText,
                {
                  fontSize: moderateScale(16),
                  textAlign: 'center',
                  fontWeight: 'bold',
                  color: AppStyles.colors.COLOR_PRIMARY,
                },
              ]}>
              STATUS
          </Text>
            <Text
              style={[
                styles.detailText,
                {
                  fontSize: moderateScale(14),
                  color: AppStyles.colors.COLOR_PRIMARY,
                },
              ]}>
              Plate no : {props.plate}
            </Text>
            <Text
              style={[
                styles.detailText,
                {
                  fontSize: moderateScale(14),
                  color: AppStyles.colors.COLOR_PRIMARY,
                  marginBottom: moderateScale(5),
                },
              ]}>
              GPSID : {props.imeiNo}
            </Text>
            <Text
              style={[
                styles.detailText,
                {
                  fontSize: moderateScale(14),
                  marginBottom: moderateScale(10),
                  color: AppStyles.colors.COLOR_PRIMARY,
                },
              ]}>
              Alarm Details
          </Text>
            <Text style={[styles.detailText, { fontSize: moderateScale(14) }]}>
              Speed : {props.item?.speed} km/hr
          </Text>
            <Text style={[styles.detailText, { fontSize: moderateScale(14) }]}>
              Direction : {props.item?.sdirect}
            </Text>
            <Text style={[styles.detailText, { fontSize: moderateScale(14) }]}>
              Status : {props.item?.statusText}
            </Text>
            <Text style={[styles.detailText, { fontSize: moderateScale(14) }]}>
              Alarm :
            {props.item?.alarmText == '' || props.item?.alarmText == null ? 'No Alarm' : props.item?.alarmText}
            </Text>
            {props.item?.driverid != '' && props.item?.driverid != null &&
              <Text style={[styles.detailText, { fontSize: moderateScale(14) }]}>
                Driver ID : {props.item?.driverid}
              </Text>}
            {props.item?.address != '' && props.item?.address != null &&
              <Text style={[styles.detailText, { fontSize: moderateScale(14) }]}>
                Address : {props.item?.address}
              </Text>}
            <TouchableOpacity
              style={{
                marginTop: moderateScale(10),
                alignSelf: 'center',
                paddingVertical: moderateScale(7),
                paddingHorizontal: moderateScale(20),
                backgroundColor: AppStyles.colors.COLOR_PRIMARY,
              }}
              onPress={props.onPress}>
              <Text style={{ color: 'white', fontSize: moderateScale(14) }}>
                Ok
            </Text>
            </TouchableOpacity>

          </View>
        }
      </View>

    </TouchableOpacity>
  );
}
export function StatusPopUp(props) {
  if (props.tripList) {
    var str = props.item?.statusText;
    var res = str.split('; ');
  } else {
    if (props.alarm) {
      if (props.item?.alarm != '') {
        var str = props.item?.alarm;
        var res = str.split('; ');
      }
    } else if (props.item?.status != '') {
      var str = props.item?.status;
      var res = str.split('; ');
    }
  }

  return (
    <TouchableOpacity
      style={{
        position: 'absolute',
        zIndex: 3,
        height: metrics.SCREEN_HEIGHT,
        width: metrics.SCREEN_WIDTH,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(110,110,110,.5)',
      }}
      activeOpacity={1}
      onPress={props.onPress}>
      <View
        style={{
          width: '85%',
          padding: moderateScale(25),
          // height: '50%',
          justifyContent: 'space-around',
          backgroundColor: 'white',
          alignItems: 'center',
          flexDirection: 'row',
          borderRadius: moderateScale(5),
          zIndex: 25,
        }}>
        <View style={{ flex: 1, alignSelf: 'flex-start' }}>
          <Text
            style={[
              styles.detailText,
              {
                fontSize: moderateScale(16),
                textAlign: 'center',
                fontWeight: 'bold',
                color: AppStyles.colors.COLOR_PRIMARY,
              },
            ]}>
            {props.alarm ? 'Alarms' : 'STATUS'}
          </Text>
          {!props.tripList &&
            <>
              <Text
                style={[
                  styles.detailText,
                  {
                    fontSize: moderateScale(14),
                    color: AppStyles.colors.COLOR_PRIMARY,
                  },
                ]}>
                Plate no : {props.item?.plate}
              </Text>
              <Text
                style={[
                  styles.detailText,
                  {
                    fontSize: moderateScale(14),
                    color: AppStyles.colors.COLOR_PRIMARY,
                    marginBottom: moderateScale(5),
                  },
                ]}>
                GPSID : {props.item?.imeino}
              </Text>
            </>
          }
          <FlatList
            data={res ? res : ''}
            //renderItem={(item, index) => (<Text style={[styles.detailText,{fontSize:moderateScale(14)}]}>{res}</Text>)}
            renderItem={({ item }) => (
              <Text style={[styles.detailText, { fontSize: moderateScale(14) }]}>
                {item}
              </Text>
            )}
            //extraData={this.state}
            keyboardShouldPersistTaps={'always'}
            keyExtractor={(item, index) => index.toString()}
          />

          <TouchableOpacity
            style={{
              alignSelf: 'center',
              paddingVertical: moderateScale(7),
              paddingHorizontal: moderateScale(20),
              backgroundColor: AppStyles.colors.COLOR_PRIMARY,
            }}
            onPress={props.onPress}>
            <Text style={{ color: 'white', fontSize: moderateScale(14) }}>
              Ok
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  detailText: {
    fontFamily: 'Roboto-Regular',
    color: AppStyles.colors.COLOR_GREY,
    fontSize: moderateScale(11),
  },
  coordsText: {
    fontSize: moderateScale(15),
    fontWeight: 'bold',
    fontFamily: 'Roboto-Regular',
    textAlign: 'right',
  },
});
