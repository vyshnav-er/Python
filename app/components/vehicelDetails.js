import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Keyboard,
  Linking,
} from 'react-native';

// //Function Component
import AppStyles from '../config/styles';
import metrics from '../config/metrics';
import {ButtonArrow, UpArrow, Info, Phone} from '../config/svg';
// //Package
import LinearGradient from 'react-native-linear-gradient';
// import CountDown from 'react-native-countdown-component';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import {LongButton, HalfButton} from './button';
import Share from 'react-native-share';
let shareOptions = {
  title: 'G-TrackIT',
  message: '',

  subject: 'Vehicle Details', //  for email
};
export function VehicleDetails(props) {
  if (props.item?.status != '') {
    var str = props.item?.status;
    var res = str.split('; ');
    } else {
    var res = [];
  }
  if (props.item?.createtime != '') {
    var dateStr = props.item?.createtime;
    var dateRes = dateStr.split(' ');
     }
  if(props.type=='dr'){
    if(props.item?.drivername != ''){
      var name=props.item?.drivername;
      var DriverName=str.split('; ')
    }
  }
  return (
    <View
      style={styles.renderContainer}
      activeOpacity={1}
      onPress={props.onPress}>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 1.75}}>
          <View style={{flexDirection:'row'}}>
          <Text
            style={[styles.boldText, {fontSize: moderateScale(14)}]}
            numberOfLines={1}>
            {props.item?.drivername == '' || props.item?.drivername == null
              ? 'No Driver ID'
              : props.item?.drivername}
          </Text>
          
            </View>
          {props.item?.drivermobile != '' && props.item?.drivermobile != null && (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Phone
                size={moderateScale(15)}
                color={AppStyles.colors.COLOR_PRIMARY}
              />
              <Text
                onPress={() =>
                  Linking.openURL(`tel:${props.item?.drivermobile}`)
                }
                style={[
                  styles.boldText,
                  {fontSize: moderateScale(14), marginLeft: moderateScale(5)},
                ]}
                numberOfLines={1}>
                {props.item?.drivermobile}
              </Text>
            </View>
          )}
          
          {res.length > 0 && (
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.boldText} numberOfLines={1}>
                {res[0]}
              </Text>

              <TouchableOpacity
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'flex-start',
                  marginLeft: moderateScale(5),
                }}
                onPress={props.status}>
                <Info size={20} color={AppStyles.colors.COLOR_BLACK} />
              </TouchableOpacity>
            </View>
          )}
          {props.type=='dr' && props.list &&
          <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  alignSelf: 'flex-start',
                  //marginLeft: moderateScale(5),
                }}
               >
                <Text>Team : {props.driverDetail[0].team}</Text>
                <Text>Company : {props.driverDetail[0].company}</Text>
                <Text onPress={()=>{Linking.openURL(`mailto:${props.item?.drivermobile}`)}}>Email : {props.driverDetail[0].email}</Text>
              </View>}
          {!props.item?.selected ? (
            <View style={{flexDirection: 'row', marginTop: moderateScale(5)}}>
              <Text
                style={[
                  styles.boldText,
                  {
                    fontSize: moderateScale(12),
                    textAlign: 'left',
                    marginBottom: 10,
                  },
                ]}
                onPress={props.selected}>
                Coords : {props.item?.lat}, {props.item?.lang}
              </Text>
              <TouchableOpacity
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'flex-start',
                  marginLeft: moderateScale(5),
                }}
                onPress={props.selected}>
                <Info size={20} color={AppStyles.colors.COLOR_BLACK} />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: moderateScale(5),
              //  backgroundColor: 'red',
              }}
              onPress={props.selected}>
              <Text
                style={[
                  styles.boldText,
                  {
                    fontSize: moderateScale(12),
                    textAlign: 'left',
                    //marginBottom: 10,
                  },
                ]}>
                Address : {props.item?.address}
                <Info size={20} color={AppStyles.colors.COLOR_BLACK} />
              </Text>
              
            </TouchableOpacity>
          )}
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.coordsText}>Time : </Text>

            <Text style={styles.coordsText}>
              {dateRes[0]}
              {` `}
            </Text>
            <Text style={{textAlign: 'right'}}>{dateRes[1]}</Text>
          </View>
          <Text style={styles.coordsText}>Mileage : {props.item?.mileage} km</Text>
        </View>
        <View style={{flex: 1}}>
          <Text
            style={[
              styles.boldText,
              {fontSize: moderateScale(14), textAlign: 'right'},
            ]}
            numberOfLines={2}>
            {props.item?.plate}
          </Text>

          <Text style={[styles.regularText, {textAlign: 'right'}]}>
            {props.item?.imeino}
          </Text>
          <Text
            style={[
              styles.regularText,
              {fontSize: moderateScale(11), textAlign: 'right'},
            ]}>
            {props.item?.speed} Km/hr
          </Text>
          {props.item?.alarm != '' && props.item?.alarm != null && (
            <Text
              onPress={props.alarmInfo}
              style={[styles.alarmWarningText, {fontSize: moderateScale(12)}]}
              numberOfLines={1}>
              {props.item?.alarm}
            </Text>
          )}
          {props?.mobilize && (
            <Text
              // onPress={props.alarmInfo}
              style={[styles.regularText, {color:props?.mobilize?.color,textAlign: 'right'}]}
              numberOfLines={1}>
              {props?.mobilize?.text}
            </Text>
          )}
        </View>
        <View style={{flex: 0.25, paddingTop: moderateScale(2)}}>
          <TouchableOpacity
            style={{justifyContent: 'center', alignItems: 'center'}}
            onPress={props.info}>
            <Info size={20} color={AppStyles.colors.COLOR_BLACK} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{flex: 1}}>
        <View style={styles.rowView}>
          <HalfButton
            Label={'Trip History'}
            backgroundColor={AppStyles.colors.COLOR_BLACK}
            textColor={AppStyles.colors.COLOR_WHITE}
            onPress={props.onTripHistoryPress}
            height={moderateScale(35)}
          />
          <HalfButton
            Label={'Previous Alarms'}
            backgroundColor={AppStyles.colors.COLOR_BLACK}
            height={moderateScale(35)}
            textColor={AppStyles.colors.COLOR_WHITE}
            onPress={props.onAlarmList}
          />
        </View>
        <View style={[styles.rowView, {marginTop: moderateScale(10)}]}>
          <HalfButton
            Label={'Guide'}
            height={moderateScale(35)}
            backgroundColor={AppStyles.colors.COLOR_BLACK}
            textColor={AppStyles.colors.COLOR_WHITE}
            onPress={props.showGuide}
          />
          <HalfButton
            Label={'Share Location'}
            backgroundColor={AppStyles.colors.COLOR_BLACK}
            height={moderateScale(35)}
            textColor={AppStyles.colors.COLOR_WHITE}
            onPress={props.onShare}
          />
        </View>
        {props?.hasMobilizeOption && (
          <View style={[styles.rowView, {marginTop: moderateScale(10)}]}>
          <HalfButton
            Label={'Mobilize'}
            height={moderateScale(35)}
            backgroundColor={AppStyles.colors.COLOR_GREEN}
            textColor={AppStyles.colors.COLOR_WHITE}
            onPress={()=>props.confirmMobilize(true)}
          />
          <HalfButton
            Label={'Immobilize'}
            backgroundColor={AppStyles.colors.COLOR_RED}
            height={moderateScale(35)}
            textColor={AppStyles.colors.COLOR_WHITE}
            onPress={()=>props.confirmMobilize(false)}
          />
        </View>
        )}
        {props.showLess && (
          <TouchableOpacity
            style={{
              height: moderateScale(30),
              width: moderateScale(90),
              marginTop: moderateScale(7),
              alignSelf: 'flex-end',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: AppStyles.colors.COLOR_PRIMARY,
            }}
            onPress={props.onPress}>
            <Text style={{color: 'white'}}>Show Less</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppStyles.colors.COLOR_SECONDARY,
  },
  renderContainer: {
    // paddingHorizontal: moderateScale(10),
    //paddingVertical: moderateScale(5),
    padding: moderateScale(10),
    backgroundColor: AppStyles.colors.COLOR_WHITE,
    marginBottom: 0,
    height: '100%',
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    // flexDirection: 'row',
  },
  rowView: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  boldText: {
    fontFamily: 'System',
    fontSize: moderateScale(12),
    //textAlign:'right'
  },
  regularText: {
    fontFamily: 'System',
    fontSize: moderateScale(12),
    //textAlign:'right'
  },
  alarmWarningText: {
    fontFamily: 'System',
    fontSize: moderateScale(12),
    color: 'red',
    marginBottom: moderateScale(5),
  },
});
