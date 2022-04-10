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
import {connect} from 'react-redux';
import Geolocation from 'react-native-geolocation-service';
import {request, PERMISSIONS, check, RESULTS} from 'react-native-permissions';
import LabelHeader from '../../components/labelHeader';
import SearchHeader from '../../components/searchHeader';
import {
  RightArrow,
  UpArrow,
  Info,
  CustomMarker,
  MarkerCircle,
  ButtonStop,
  Play,
  Pause,
  MovingCar,
} from '../../config/svg';
import Toast from 'react-native-simple-toast';
import styles from './styles';
import appStyles from '../../config/styles';
import {HalfButton} from '../../components/button';
import {moderateScale} from 'react-native-size-matters';
import Actions from '../../action/index';
// import moment from '../home/node_modules/moment/src/moment';
import AppStyles from '../../config/styles';
import metrics from '../../config/metrics';
import {
  TripListMapButtonContainer,
  TripListDetailContainer,
  AlarmMarkerClick,
  MarkerPopUp,
} from '../../components/commonFunctionComponent';
import HudView from '../../components/hudView';
import MessageBox from '../../components/messageBox';
import MapView, {Marker, Polyline, Callout} from 'react-native-maps';
import {StatusPopUp} from '../../components/commonFunctionComponent';
import {PROVIDER_GOOGLE} from 'react-native-maps'; //
const coordinates = [[76.9102172, 8.5003739]];
let imageUrl = '';
let plate = [];
let imeiNo = [];
let carPolyine = [];
let getItem = [];
let coords = [];
let list = [];
let red = [];
let i = 0;
let j = 0;
let k = 0;
let a = 500;
let carView = [];
class TripListDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showInitial: false,
      startTime: '2020-07-16 08:54:32',
      endTime: '2020-07-16 08:55:02',
      imeiNo: '',
      tripDetails: [],
      showMap: true,
      car: '',
      isAnimated: true,
      startAnimate: false,
      latitude: 23.5,
      longitude: 53.6,
      showSatellite: false,
      showAlarmDetails: false,
      carPolyine: [],
      showPopUp: false,
      markerValue: [],
      isPaused: false,
      showPlay: true,
      showPause: false,
      showStop: false,
      showStatus: false,
      clickedStatus: [],
    };
    this.back = false;
    this._map = null;
    this.intervalID = 0;
  }

  componentDidMount() {
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardDidHide,
    );
    this.setState({
      latitude: JSON.parse(getItem.startLat),
      longitude: JSON.parse(getItem.startLang),
      showInitial: true,
    });
    BackHandler.addEventListener('hardwareBackPress', () =>
      this._backHandlerPress(),
    );
    // this.props.navigation.addListener('focus', () => {
    //   this.liveTrackingTime1 = setTimeout(() => {
    //     if(coords.length>0){
    //     this._onMapClicked1()
    //     }
    //   }, 700);
    // });
  }
  _onMapClicked1 = () => {
    if (this.state.showMap) {
      this._map.fitToCoordinates(coords, {
        edgePadding: {top: 10, right: 10, bottom: 10, left: 10},
        animated: false,
      });
    }
  };
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', () =>
      this._backHandlerPress(),
    );
  }

  _backHandlerPress() {
    this.props.navigation.goBack();
    return true;
  }
  _selectList = item => {
    item.selected = !item.selected;
    this.setState({});
  };
  _tripHistoryDetails = item => {
    //this.setState({tripDetails: item});
    this.props.navigation.navigate('CustomMapView', {
      params: item,
      Alarm: false,
      plate: plate,
      getItem: this.state.imeiNo,
      imeiNo: imeiNo,
      region: this.props.Login.region,
    });
  };
  _clickStatus = item => {
    this.setState({clickedStatus: item, showStatus: true});
  };
  _detailListRender = ({item, index}) => {
    if (item.createtime != '') {
      var str = item.createtime;
      var res = str.split(' ');
    }
    if (item.statusText != '') {
      var status = item.statusText;
      var statusRes = status.split('; ');
    } else {
      var res = [];
    }
    return (
      <View>
        <TouchableOpacity
          style={styles.renderContainer}
          activeOpacity={0.3}
          onPress={() => {
            this._tripHistoryDetails(item, index);
          }}>
          <Text style={[styles.coordsText, {marginleft: moderateScale(5)}]}>
            {getItem.drivername != '' && getItem.drivername != null
              ? getItem.drivername
              : 'No Driver ID'}
          </Text>
          {!item.selected ? (
            <TouchableOpacity
              onPress={() => {
                this._selectList(item);
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  style={[styles.coordsText, {marginRight: moderateScale(5)}]}>
                  Coords : {item.lat},{item.lang}
                </Text>
                <Info size={10} color={AppStyles.colors.COLOR_BLACK} />
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                this._selectList(item);
              }}>
              <Text style={styles.coordsText}>
                Address: {item.address}
                {` `}
                <Info size={10} color={AppStyles.colors.COLOR_BLACK} />
              </Text>
            </TouchableOpacity>
          )}
          {item.alarmText != '' && (
            <Text style={styles.alarmText}>Alarm : {item.alarmText}</Text>
          )}
          <TouchableOpacity
            onPress={() => {
              this._clickStatus(item);
            }}>
            <Text>
              Status : {statusRes[0]}{' '}
              <Info size={12} color={AppStyles.colors.COLOR_BLACK} />
            </Text>
          </TouchableOpacity>
          <Text>Speed : {item.speed} km/hr</Text>
          <View style={{flexDirection: 'row'}}>
            <Text>Time : {res[1]} </Text>
            <View>
              {/* <Text>{res[0]}</Text> */}
              {/* <Text style={{textAlign: 'right'}}>{res[1]}</Text> */}
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  _goback = () => {
    this.props.navigation.goBack();
  };
  _startAnimate = () => {
    if (i == this.props.TripHistoryDetailList.tripListDetails.length - 1) {
      j = 0;
      this.setState({
        startAnimate: false,
        carPolyine: [],
        showPlay: true,
        showPause: false,
        showStop: false,
      });

      clearInterval(this.intervalID);
    } else {
      red = {
        latitude: this.props.TripHistoryDetailList.tripListDetails[i].lat,
        longitude: this.props.TripHistoryDetailList.tripListDetails[i].lang,
      };
      // carPolyine.push(red)
     
      if (this.state.isPaused) {
        i = a;
      } else {
        j = 1;
        i = i + 1;
      }
      this.setState({
        latitude: JSON.parse(
          this.props.TripHistoryDetailList.tripListDetails[i].lat,
        ),
        longitude: JSON.parse(
          this.props.TripHistoryDetailList.tripListDetails[i].lang,
        ),
        car: this.props.TripHistoryDetailList.tripListDetails[i].icon,
      });
      carView = [
        {
          latitude: this.state.latitude,
          longitude: this.state.longitude,
        },
      ];
      this.state.carPolyine.push(
        this.props.TripHistoryDetailList.tripListDetails[i],
      );

      //carPolyine=
    }
  };
  _goAnimation = () => {
    i = 0;
    this.intervalID = 0;
    if (this.state.isPaused) {
      i = a;
    } else {
      i = 0;
    }

    this.setState({
      showPlay: false,
      showPause: true,
      showStop: true,
      startAnimate: true,
      isAnimated: false,
      latitude: JSON.parse(getItem.startLat),
      longitude: JSON.parse(getItem.startLang),
      isPaused: false,
    });

    {
      this.intervalID = setInterval(() => {
        this._startAnimate();
      }, 400);
    }
  };
  _stopAnimation = () => {
    //clearInterval(this.intervalID);
    (i = this.props.TripHistoryDetailList.tripListDetails.length - 1),
      this.setState({
        isAnimated: true,
        showPlay: true,
        showStop: false,
        showPause: false,
      });
  };
  _pauseAnimation = () => {
    a = i;
    this.setState({
      isPaused: true,
      isAnimated: true,
      showPause: false,
      showPlay: true,
      showStop: true,
    });
    // a=1000000;
  };
  _alarmMarkerClicked = item => {
    this.setState({showAlarmDetails: !this.state.showAlarmDetails});
  };
  render() {
    // imageUrl = 'https://test.g-trackit.com';
    plate = this.props.route.params.plate;
    imeiNo = this.props.route.params.imeiNo;
    getItem = this.props.route.params.item;

    if (this.props.TripHistoryDetailList.tripListDetails.length > 0) {
      coords = this.props.TripHistoryDetailList.tripListDetails.map(
        (marker, index) => ({
          latitude: JSON.parse(marker.lat),
          longitude: JSON.parse(marker.lang),
        }),
      );
    } else {
      coords = [
        {
          latitude: this.state.latitude,
          longitude: this.state.longitude,
        },
      ];
    }
    if (this.state.carPolyine.length > 0) {
      carPolyine = this.state.carPolyine.map((marker, index) => ({
        latitude: JSON.parse(marker.lat),
        longitude: JSON.parse(marker.lang),
      }));
    }
    if (this.props.Login.region == 'Oman') {
      imageUrl = 'https://oman.g-trackit.com';
    } else if (this.props.Login.region == 'Demo') {
      imageUrl = 'https://test.g-trackit.com';
    } else if (this.props.Login.region == 'India') {
      imageUrl = 'https://g-trackit.com';
    } else if (this.props.Login.region == 'Rest of the world') {
      imageUrl = 'https://g-trackit.com';
    } else {
      imageUrl = 'https://g-trackit.com';
    }
    j = coords.length;
    return (
      <SafeAreaView style={styles.container}>
        {!this.state.showInitial ? (
          <View />
        ) : (
          <>
            <StatusBar
              backgroundColor={appStyles.colors.COLOR_PRIMARY}
              barStyle="light-content"
            />
            {this.state.showStatus && (
              <StatusPopUp
                tripList={true}
                item={this.state.clickedStatus}
                onPress={() => {
                  this.setState({showStatus: !this.state.showStatus});
                }}
              />
            )}
            {this.props.Loading.isLoading && <HudView />}
            {this.props.MessageBox.isMessagebox && (
              <MessageBox
                message={'No data found'}
                Label={'OK'}
                onPress={() => {
                  this.props._disableMessageBox(),
                    this.props.navigation.goBack();
                }}
              />
            )}
            {this.state.showPopUp && (
              <MarkerPopUp
                plate={plate}
                imeiNo={imeiNo}
                item={this.state.markerValue}
                onPress={() => {
                  this.setState({showPopUp: !this.state.showPopUp});
                }}
              />
            )}
            <LabelHeader
              Label={'GTRACKIT'}
              onPress={() => {
                this._goback();
              }}
            />
            <View style={{flex: 6}}>
              {this.state.showMap && (
                <TouchableOpacity
                  activeOpacity={0.9}
                  style={styles.satelliteTouchable}
                  onPress={() => {
                    this.setState({showSatellite: !this.state.showSatellite});
                  }}>
                  {this.state.showSatellite ? (
                    <Image
                      style={{height: '100%', width: '100%'}}
                      source={require('../../../assets/Images/pic/map.jpg')}
                    />
                  ) : (
                    <Image
                      style={{height: '100%', width: '100%'}}
                      source={require('../../../assets/Images/pic/satelite.jpg')}
                    />
                  )}
                </TouchableOpacity>
              )}
              {this.state.showMap ? (
                <MapView
                  provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                  style={{flex: 1}}
                  ref={ref => {
                    this._map = ref;
                  }}
                  // initialRegion={{
                  //   latitude: this.state.latitude,
                  //   longitude: this.state.longitude,
                  //   latitudeDelta: 0.004,
                  //   longitudeDelta: 4.004,
                  // }}
                  mapType={this.state.showSatellite ? 'hybrid' : 'standard'}
                  onLayout={() =>
                    this.props.TripHistoryDetailList.tripListDetails.length >
                      0 &&
                    this._map.fitToCoordinates(coords, {
                      edgePadding: {top: 10, right: 10, bottom: 10, left: 10},
                      animated: false,
                    })
                  }
                  followUserLocation={true}
                  //  minZoomLevel={j > 0 ? 17 : 3}
                  // animateToRegion={{
                  //   latitude: this.state.latitude,
                  //   longitude: this.state.longitude,
                  //   latitudeDelta: 0.04749824275133463,
                  //   longitudeDelta: 0.0274658203125,
                  // }}
                  //maxZoomLevel={100}
                  showsUserLocation
                  onMapReady={() => {
                    this.props.TripHistoryDetailList.tripListDetails;
                  }}
                  onPress={() => {
                    this.setState({
                      showMarkerClicked: false,
                      markerInitialRegion: [],
                    });
                  }}
                  rotateEnabled={false}>
                  {this.props.TripHistoryDetailList.tripListDetails.map(
                    (marker, index) => (
                      <>
                        {marker.alarmText != '' && (
                          <Marker
                            tracksViewChanges={false}
                            trackViewChanges={false}
                            key={marker.imeino}
                            coordinate={{
                              latitude: JSON.parse(marker.lat),
                              longitude: JSON.parse(marker.lang),
                            }}
                            onPress={() =>
                              this.setState({
                                showPopUp: true,
                                markerValue: marker,
                              })
                            }>
                            <View
                              style={{
                                height: moderateScale(20),
                                width: moderateScale(20),
                                borderRadius: 15,
                                borderWidth: 2,
                                borderColor: 'red',
                                justifyContent: 'center',
                                alignItems: 'center'
                                
                              }}>
                              <View
                                style={{
                                  height: moderateScale(10),
                                  width: moderateScale(10),
                                  borderRadius: 15,
                                  borderWidth: 2,
                                  borderColor: 'red',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}
                              />
                            </View>
                          </Marker>
                        )}
                      </>
                    ),
                  )}

                  {coords[0].latitude != null &&
                    coords[0].latitude != '' &&
                    (coords[0].longitude != null &&
                      coords[0].longitude != '') && (
                      <>
                        <Marker
                          key={imeiNo}
                          tracksViewChanges={false}
                        tracksInfoWindowChanges={false}
                          coordinate={{
                            latitude: coords[0].latitude && coords[0].latitude,
                            longitude:
                              coords[0].longitude && coords[0].longitude,
                            // JSON.parse(getItem.startLang) &&
                            // JSON.parse(getItem.startLang),
                          }}>
                          {
                            <CustomMarker
                              size={30}
                              color={AppStyles.colors.COLOR_GREEN}
                            />
                          }
                        </Marker>
                      </>
                    )}
                  {coords[j - 1].latitude != null &&
                    coords[j - 1].latitude != '' &&
                    (coords[j - 1].longitude != null &&
                      coords[j - 1].longitude != '') && (
                      <>
                        <Marker
                          tracksViewChanges={false}
                          tracksInfoWindowChanges={false}
                          coordinate={{
                            latitude:
                              coords[j - 1].latitude && coords[j - 1].latitude,
                            longitude:
                              coords[j - 1].longitude &&
                              coords[j - 1].longitude,
                            // JSON.parse(getItem.startLang) &&
                            // JSON.parse(getItem.startLang),
                          }}>
                          {
                            <CustomMarker
                              size={30}
                              color={AppStyles.colors.COLOR_RED}
                            />
                          }
                        </Marker>
                      </>
                    )}
                  <Polyline
                    coordinates={coords}
                    strokeColor={AppStyles.colors.COLOR_PRIMARY} // fallback for when `strokeColors` is not supported by the map-provider
                    strokeColors={[
                      '#7F0000',
                      '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
                      '#B24112',
                      '#E5845C',
                      '#238C23',
                      '#7F0000',
                    ]}
                    strokeWidth={5}
                  />

                  {this.state.startAnimate && (
                    <Polyline
                      coordinates={carPolyine}
                      strokeColor={AppStyles.colors.COLOR_RED} // fallback for when `strokeColors` is not supported by the map-provider
                      strokeColors={[
                        '#7F0000',
                        '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
                        '#B24112',
                        '#E5845C',
                        '#238C23',
                        '#7F0000',
                      ]}
                      strokeWidth={5}
                    />
                  )}

                  {this.state.startAnimate &&
                    (this.state.latitude != '' &&
                      this.state.latitude != null) &&
                    this.state.longitude != '' &&
                    this.state.longitude != null && (
                      <>
                        <Marker.Animated
                        tracksViewChanges={false}
                        tracksInfoWindowChanges={false}
                          animateMarkerToCoordinate={{
                            latitude: this.state.latitude,
                            longitude: this.state.longitude,
                          }}
                          trackViewChanges={false}
                          coordinate={{
                            latitude: this.state.latitude,
                            longitude: this.state.longitude,
                          }}>
                              <MovingCar
                              size={30}
                              color={AppStyles.colors.COLOR_GREEN}
                            />
                          {/* <Image
                            style={{
                              //marginTop:'80%',
                              height: moderateScale(30),
                              width: moderateScale(30),
                              alignSelf: 'baseline',
                              resizeMode: 'contain',
                            }}
                            source={
                              // this.state.car != '' && this.state.car != null
                              //   ? {
                              //       uri: imageUrl + this.state.car,
                              //     }
                              //   : require('../../assets/images/CarIcon/carblueEast.png')
                               
                            }
                          /> */}
                        </Marker.Animated>
                      </>
                    )}
                </MapView>
              ) : (
                <FlatList
                  data={
                    this.props.TripHistoryDetailList.tripListDetails
                      ? this.props.TripHistoryDetailList.tripListDetails
                      : ''
                  }
                  renderItem={(item, index) =>
                    this._detailListRender(item, index, getItem)
                  }
                  extraData={this.state}
                  keyboardShouldPersistTaps={'always'}
                  keyExtractor={(item, index) => index.toString()}
                />
              )}

              {this.state.showMap && (
                <View
                  style={{
                    
                    paddingHorizontal: moderateScale(9),backgroundColor:'white',
                    paddingVertical: moderateScale(8),
                    // borderRadius: moderateScale(30),
                    right: metrics.SCREEN_WIDTH * 0.5 - 25,
                    //elevation: moderateScale(2),
                    flexDirection: 'row',
                    bottom: moderateScale(10),
                    alignSelf: 'center',

                    // backgroundColor: AppStyles.colors.COLOR_WHITE,
                    position: 'absolute',
                    //zIndex:2,
                  }}
                  // onPress={() => {
                  //   this.state.isAnimated?
                  //   this._goAnimation()
                  //    : this._pauseAnimation()

                  // }}
                >
                  {this.state.showPlay && (
                    <TouchableOpacity
                      onPress={() => {
                        this._goAnimation();
                      }}>
                      <Play
                        size={moderateScale(20)}
                        color={AppStyles.colors.COLOR_BLACK}
                      />
                    </TouchableOpacity>
                  )}
                  {this.state.showPause && (
                    <TouchableOpacity
                      onPress={() => {
                        this._pauseAnimation();
                      }}>
                      <Pause
                        size={moderateScale(20)}
                        color={AppStyles.colors.COLOR_BLACK}
                      />
                    </TouchableOpacity>
                  )}
                  {this.state.showStop && (
                    <TouchableOpacity
                      style={{marginLeft: moderateScale(20)}}
                      onPress={() => {
                        this._stopAnimation();
                      }}>
                      <ButtonStop
                        size={moderateScale(20)}
                        color={AppStyles.colors.COLOR_BLACK}
                      />
                    </TouchableOpacity>
                  )}
                </View>
              )}
            </View>
            <TripListMapButtonContainer
              plate={plate}
              imeiNo={imeiNo}
              onPress={() => {
                {
                  !this.state.showMap && this._onMapClicked1();
                }
                this.setState({
                  showMap: !this.state.showMap,
                  isAnimated: !this.state.isAnimated,
                });
              }}
              show={this.state.showMap}
            />
            {this.props.TripHistoryDetailList.tripListDetails.length > 0 && (
              <View style={{flex: 2.5, justifyContent: 'center',backgroundColor:'white'}}>
                <TripListDetailContainer
                  plate={plate}
                  imeiNo={imeiNo}
                  item={getItem}
                  onPress={() => {
                    this._goback();
                  }}
                />
              </View>
            )}
          </>
        )}
      </SafeAreaView>
    );
  }
}

function mapStateToProps(state) {
  return {
    VehicleList: state.vehicleListReducer,
    DetailList: state.detailListReducer,
    TripHistoryList: state.tripHistoryReducer,
    TripHistoryDetailList: state.tripHistoryDetailReducer,
    // NeededList:state.neededReducer,
    // ISLogin:state.loginReducer,
    //  Global:state.globalReducer,
    //  SMS:state.getsmsReducer
    Login: state.loginReducer,
    Loading: state.loadingReducer,
    MessageBox: state.messageboxReducer,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    _getTripHistoryDetailList: (data, apiRgn) => {
      dispatch(
        Actions.tripHistoryDetailAction.tripHistoryDetailRequest(data, apiRgn),
      );
    },
    EnableLoader: () => dispatch(Actions.loadingAction.enableLoader()),
    disableLoader: () => dispatch(Actions.loadingAction.disableLoader()),
    _disableMessageBox: () =>
      dispatch(Actions.loadingAction.disableMessagebox()),
    _clearTripHistoryDetailList: () => {
      dispatch(Actions.vehicleDetailListAction.vehicleDetailListResponse([]));
    },
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TripListDetail);
