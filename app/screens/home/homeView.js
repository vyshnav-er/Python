import React, { Component } from 'react';
import {
  Keyboard,
  BackHandler,
  SafeAreaView,
  StatusBar,
  View,
  FlatList,
  Image,
  Text,
  Alert,
  TouchableOpacity,
  Animated,
  Linking,
  Dimensions,
} from 'react-native';
import MessageBox from '../../components/messageBox';
import Geolocation from 'react-native-geolocation-service';
import { request, PERMISSIONS, check, RESULTS } from 'react-native-permissions';
import MapHeader from '../../components/mapHeader';
import SearchHeader from '../../components/searchHeader';
import { RightArrow, UpArrow, Info, SelectedCircle } from '../../config/svg';
import Toast from 'react-native-simple-toast';
import styles from './styles';
import appStyles from '../../config/styles';
import { HalfButton } from '../../components/button';
import { moderateScale } from 'react-native-size-matters';
import AppStyles from '../../config/styles';
import { VehicleDetails } from '../../components/vehicelDetails';
import HudView from '../../components/hudView';
import MapView, { Marker, Circle } from 'react-native-maps';
import { PROVIDER_GOOGLE } from 'react-native-maps'; //
import { StatusPopUp } from '../../components/commonFunctionComponent';
import Share from 'react-native-share';
import DeviceInfo from 'react-native-device-info';
import { LocalNotification } from '../../components/localNotification';
import metrics from '../../config/metrics';
import {CustomAlert} from '../../components/CustomAlert';

let imageUrl = '';
let list = [];
let count = [];
let coords = [];
let imeiNo = '';
let shareOptions = {
  title: 'GtrackIT',
  message: '',
  subject: 'Vehicle Details', //  for email
};
let markerValue = {};

let driverDetail = []

class HomeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showVehicle: true,
      showDriver: false,
      showLocation: false,
      showMap: true,
      selectedIndex: 1000000,
      showList: true,
      showSatellite: false,
      startDate: "2020-07-23 00:00:00",
      endDate: "2020-07-24 00:00:00",
      gpsStatus: false,
      type: "vh",
      currentLongitude: "0",
      latitude: 0,
      longitude: 0,
      currentLatitude: "0",
      showLess: false,
      markerInitialRegion: [],
      clickData: [],
      listClickedData: [],
      showMarkerClicked: false,
      showStatus: false,
      showAlarm: false,
      showGuide: false,
      showName: false,
      imagepath: "Img/cargrnWest.png",
      limit: 50,
      showModal: false,
      mobilizeDescription: "",
      vehicleStatus: "",
    };
    this.back = false;
    this._map = null;
    this._getLocation();
  }
  _onShare = (item) => {
    shareOptions = {
      title: "GtrackIT",
      message: "",
      subject: "GtrackIT", //  for email
    };
    shareOptions.message = `
    The current location of the Vehicle ${item.plate} is Address ${item.lat},${
      item.lang
    } 
Googlemap link http://www.google.com/maps/place/${item.lat},${item.lang} 
G-Trackit. 
Powered By Zaeem Solutions
   `;

    Share.open(shareOptions);
  };

  componentDidMount() {
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this.keyboardDidHide
    );
    if (this.props.VehicleList.list.length == 0) {
      this.props.EnableLoader();
      this.props.getVehicleList(
        this.props.Login.resp?.accessToken,
        this.props.Login.region,
        this.props.Login.deviceId
      );
    }
    data = {
      token: this.props.Login.resp?.accessToken,
      userID: this.props.Login.resp?.userId,
      limit: this.state.limit,
    };
    // this.props.EnableLoader();
    this.props._getNotificationList(data, this.props.Login.region);
    BackHandler.addEventListener("hardwareBackPress", () =>
      this._backHandlerPress()
    );
    if (this.props.DriversList.list.length == 0) {
      this.props.EnableLoader();
      this.props.getDriversList(
        this.props.Login.resp?.accessToken,
        this.props.Login.region
      );
    }
    this.props.navigation.addListener("blur", () => {
      this.timeStart = false;
      clearTimeout(this.liveTrackingTime);
      this.props.changeScreen();
    });
    this.props.navigation.addListener("focus", () => {
      this.timeStart = true;
      // this.setState({showMap:true})
      console.log("showMarkerClicked",this.state.showMarkerClicked);
      !this.state.showMarkerClicked && this._onStartLiveTracking();
      BackHandler.addEventListener("hardwareBackPress", () =>
        this._backHandlerPress()
      );

      this.liveTrackingTime1 = setTimeout(() => {
        if (this.props.DetailList.screen) {
          this.setState({ showMarkerClicked: false });
          if (coords.length > 0 && !this.state.showMarkerClicked) {
            this._onMapClicked1();
          }
        }
      }, 1000);
    });
  }
  _onMapClicked1 = () => {
    this._map && this._map.fitToCoordinates(coords, {
      edgePadding: { top: 10, right: 10, bottom: 10, left: 10 },
      animated: false,
    });
  };
  componentWillMount() {
    BackHandler.addEventListener("hardwareBackPress", this._backHandlerPress);
    clearTimeout(this.liveTrackingTime);
  }
  //Android back button handler
  _backHandlerPress() {
    if (this.state.isModal) {
      this.setState({ isModal: false });
    } else {
      this.back
        ? BackHandler.exitApp()
        : (Toast.show("Press again to exit app"), (this.back = true));
    }
    return true;
  }

  //Call live tracking api ,call Settimeout
  _onStartLiveTracking = () => {
    if (this.timeStart) {
      this.liveTrackingTime = setTimeout(() => {
        this._callLiveTrack();
        this._onStartLiveTracking();
      }, 30000);
    }
  };

  //When map clicked
  _onMapClicked = () => {
    this.setState({
      showMarkerClicked: false,
    });
    this.timeStart = true;
    this._onStartLiveTracking();
    this.props.DetailList?.list?.map((item, index) => {
      item.mapSelected = false;
    });
    this.state.showMarkerClicked &&
    this._map && this._map.fitToCoordinates(coords, {
        edgePadding: { top: 10, right: 10, bottom: 10, left: 10 },
        animated: false,
      });
  };

  //Set api values for all live tracking
  _callLiveTrack = () => {
    imeiNo = [];
    let state = this.state;
    Keyboard.dismiss();
    this.props.DetailList.list?.map((item, index) => {
      imeiNo = imeiNo + item.imeino + ",";
    });
    const data = {
      token: this.props.Login.resp?.accessToken,
      starttime: this.state.startDate,
      endtime: this.state.endDate,
      imeino: imeiNo,
    };
    if (this.props.DetailList.list?.length > 0) {
      this.props.getliveTracking(data, this.props.Login.region);
    }
  };

  //for get live location
  _getLocation = (isStart) => {
    console.log("_getLocation");
    request(
      Platform.select({
        android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        ios: PERMISSIONS.IOS.LOCATION_ALWAYS,
      })
    ).then((status) => {
      console.log("status",status);
      if (status == RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          async (position) => {
            console.log("position",position);
            this.setState({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              showInitial: true,
            });
          },

          (error) => {
            this.props.Login.region == "Oman"
          ? this.setState({
              latitude: 22.3968124,
              longitude: 56.53329,
              showInitial: true,
            })
          : this.props.Login.region == "Demo"
          ? this.setState({
              latitude: 22.3968124,
              longitude: 56.53329,
              showInitial: true,
            })
          : this.props.Login.region == "India"
          ? this.setState({
              latitude: 20.049159,
              longitude: 64.4018361,
              showInitial: true,
            })
          : this.props.Login.region == "Rest of the world"
          ? this.setState({
              latitude: 2.340399,
              longitude: 13.9386651,
              showInitial: true,
            })
          : this.setState({
              latitude: 24.3424989,
              longitude: 53.7111108,
              showInitial: true,
            });
            Toast.show(
              "Error getting your location",
              Toast.LONG
              //   Toast.CENTER,
            );
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      } else if (status == RESULTS.BLOCKED) {
        this.props.Login.region == "Oman"
          ? this.setState({
              latitude: 22.3968124,
              longitude: 56.53329,
              showInitial: true,
            })
          : this.props.Login.region == "Demo"
          ? this.setState({
              latitude: 22.3968124,
              longitude: 56.53329,
              showInitial: true,
            })
          : this.props.Login.region == "India"
          ? this.setState({
              latitude: 20.049159,
              longitude: 64.4018361,
              showInitial: true,
            })
          : this.props.Login.region == "Rest of the world"
          ? this.setState({
              latitude: 2.340399,
              longitude: 13.9386651,
              showInitial: true,
            })
          : this.setState({
              latitude: 24.3424989,
              longitude: 53.7111108,
              showInitial: true,
            });
        common.showAlertWithTitleCallback(
          "",
          "Permission blocked, goto settings and allow location permission",
          "open settings",
          "close",
          () => Linking.openSettings()
        );
      } else {
        this.props.Login.region == "Oman"
          ? this.setState({
              latitude: 22.3968124,
              longitude: 56.53329,
              showInitial: true,
            })
          : this.setState({
              latitude: 24.3424989,
              longitude: 53.7111108,
              showInitial: true,
            });
        // Toast.showWithGravity(
        //   'Permission denied, allow location permission to continue',
        //   Toast.SHORT,
        //   Toast.CENTER,
        // );
      }
    });
  };

  // for navigate to search with selected value
  _search = () => {
    if (
      this.state.showLocation ||
      this.state.showDriver ||
      this.state.showVehicle
    ) {
      this.props.navigation.navigate("Search", { type: this.state.type });
    } else {
      Toast.showWithGravity(
        "Select Vehicle/Driver/Location",
        Toast.SHORT,
        Toast.CENTER
      );
    }
  };

  //for set data from list view in home screen
  _listDetails = (item, index) => {
    this.setState({
      selectedIndex: index,
      showList: false,
      listClickedData: item,
    });
  };

  //list expand its view  in selected when click a list
  _listBackDetails = (item, index) => {
    this.setState({ selectedIndex: 1000000, showList: false });
  };

  //renderListView
  _detailListRender = ({ item, index }) => {
    return (
      <View>
        {this.state.selectedIndex == index ? (
          <View
            style={{
              height: type == "dr" ? moderateScale(350) : moderateScale(300),
            }}
          >
            <VehicleDetails
              hasMobilizeOption={true}
              mobilize={this.props.DetailList.Mobilize}
              confirmMobilize={this._onConfirmMobilizeInfo}
              showGuide={() => {
                this._guideInfo();
              }}
              showLess={this.state.showLess}
              item={item}
              onPress={() => {
                this._listBackDetails(item, index);
              }}
              selected={() => {
                this._selectList(item);
              }}
              onTripHistoryPress={() => {
                this.props.navigation.navigate("TripHistory", {
                  plate: item.plate,
                  imeiNo: item.imeino,
                  driverId: item.driverid,
                });
              }}
              onAlarmList={() => {
                this._alarmList(item);
              }}
              onShare={() => {
                this._onShare(item);
              }}
              info={() => {
                this._info(item);
              }}
              alarmInfo={() => {
                this.setState({ showAlarm: true });
              }}
              status={() => {
                this.setState({ showStatus: true });
              }}
              type={type}
              driverDetail={driverDetail}
              list={true}
            />
          </View>
        ) : (
          <TouchableOpacity
            style={styles.renderContainer}
            activeOpacity={0.3}
            onPress={() => {
              this._listDetails(item, index);
            }}
          >
            <View style={{ flex: 4 }}>
              <Text style={styles.boldText}>Plate Number : {item.plate}</Text>

              <Text style={styles.regularText}>
                Chassis No : {item.chassis}
              </Text>

              <Text style={styles.regularText}>GPSID : {item.imeino}</Text>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <RightArrow
                size={moderateScale(16)}
                color={AppStyles.colors.COLOR_PRIMARY}
              />
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  _markerDataSet = (item, index) => {
    clearTimeout(this.liveTrackingTime);
    // clearInterval(this.intervalID);
    //this.timeStart=false;
    markerValue = item;
    this.props.DetailList.list?.map((marker) => {
      marker.mapSelected = false;
    });
    markerValue.mapSelected = true;
    this.setState({
      latitude: JSON.parse(this.props.DetailList.list[index]?.lat),
      longitude: JSON.parse(this.props.DetailList.list[index]?.lang),
      clickData: markerValue,
      showMarkerClicked: true,
      showMarker: true,
    });
  };
  _info = (item) => {
    this.props.navigation.navigate("VehicleDetailPage", { info: item });
  };
  _guideInfo = () => {
    let url =
      "https://www.google.com/maps/place/" +
      `${this.state.clickData.lat}` +
      "," +
      `${this.state.clickData.lang}`;
    Linking.openURL(url);
    //Linking.openURL(`https://maps.apple.com/?q=${markerName}&ll=${lat},${lng}`);
  };
  _alarmInfo = (item) => {
    this.props.navigation.navigate("VehicleDetailPage", { info: item });
  };
  _selectList = (item) => {
    item.selected = !item.selected;
    this.setState({});
  };
  _selectListMarker = (item) => {
    item.selected = !item.selected;
    this.setState({});
  };
  _alarmList = (item) => {
    this.props.navigation.navigate("AlarmList", { alarmList: item });
  };
  _listClicked = () => {
    this.setState({ showMap: false, selectedIndex: 100000, showLess: true });
    list = [];
    this.props.DetailList.list?.map((item) => {
      item.selected = false;
      list.push(item);
    });
  };
  drawer = () => {
    this.props.navigation.openDrawer();
  };
  closePopUp = () => {
    this.props.navigate.navigate("Home");
  };

  _onConfirmMobilizeInfo = (isMobilize) => {
    const mobilizeDescription = isMobilize
      ? `Please type "Start vehicle" to start the vehicle`
      : `Please type "Stop vehicle" to stop the vehicle`;
    const vehicleStatus = isMobilize ? "Mobilize" : "Immobilize";

    this.setState({ mobilizeDescription, vehicleStatus ,showModal: true });
  };

  verifyText = (str) => {
    const { vehicleStatus } = this.state;
    const START_VEHICLE = "STARTVEHICLE";
    const STOP_VEHICLE = "STOPVEHICLE";

    const statusDesc = vehicleStatus === "Mobilize" ? "Start vehicle" : "Stop vehicle";
    const data = {
      imeino: this.state?.clickData?.imeino,
      operate: 4114,
      param: vehicleStatus === "Mobilize" ? "0,2,2,2,2" : "1,2,2,2,2",
      token: this.props.Login.resp?.accessToken,
      region: this.props.Login.region,
    };

    let formattedStr = str && str.replace(/\s/g, "").toUpperCase();
    if (
      formattedStr &&
      formattedStr === START_VEHICLE &&
      vehicleStatus === "Mobilize"
    ) {
      this.setState({ showModal: false });
      this.props.EnableLoader();
      this.props.setMobilize(data);
      return true;
    } else if (
      formattedStr &&
      formattedStr === STOP_VEHICLE &&
      vehicleStatus === "Immobilize"
    ) {
      this.setState({ showModal: false });
      this.props.EnableLoader();
      this.props.setImmobilize(data);
      return true;
    } else {
      this.setState({
        mobilizeDescription: `Provided string do not match with "${statusDesc}".Please try again`,
      });
      // return false
    }
  };

  render() {
    const LATITUD_DELTA = 0.00688;
    const LONGITUDE_DELTA = LATITUD_DELTA * (metrics.SCREEN_WIDTH / metrics.SCREEN_HEIGHT);

    this.props.DriversList.list?.map((item) => {
      this.props.DetailList.list?.map((detail) => {
        if (item.id == detail.driverid) {
          driverDetail.push(item);
        }
      });
    });

    if (this.props.DetailList.list?.length > 0) {
      coords = this.props.DetailList.list?.map((marker, index) => ({
        latitude: JSON.parse(marker.lat),
        longitude: JSON.parse(marker.lang),
      }));
    } else if (this.props.DetailList.list?.length == 0) {
      coords = [
        {
          latitude: this.state.latitude,
          longitude: this.state.longitude,
        },
      ];
    }
    if (this.props.Login.region == "Oman") {
      imageUrl = "https://oman.g-trackit.com";
    } else if (this.props.Login.region == "Demo") {
      imageUrl = "https://test.g-trackit.com";
    } else if ((this.props.Login.region = "India")) {
      imageUrl = "https://g-trackit.com";
    } else if ((this.props.Login.region = a = "Rest of the world")) {
      imageUrl = "https://g-trackit.com";
    } else {
      imageUrl = "https://g-trackit.com";
    }
    type = this.props.DetailList.type;
    count = [];
    this.props.Notification.list?.map((item) => {
      if (item.status == 0) {
        count.push(item);
      }
    });
console.log("this.state.",this.state.latitude,this.state.longitude);
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          backgroundColor={appStyles.colors.COLOR_PRIMARY}
          barStyle="light-content"
        />
        {this.state.showModal && (
          <CustomAlert
            modalVisible={this.state.showModal}
            setModalVisible={() => this.setState({ showModal: false })}
            message={this.state.mobilizeDescription}
            verifyText={(text) => this.verifyText(text)}
          />
        )}
        {!this.state.showInitial ? (
          <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={{ flex: 1 }}
          />
        ) : (
          <>
            {this.state.showStatus && (
              <StatusPopUp
                item={
                  this.state.showMap
                    ? this.state.clickData
                    : this.state.listClickedData
                }
                onPress={() => {
                  this.setState({ showStatus: !this.state.showStatus });
                }}
              />
            )}
            {/* {this.state.showName && (
              <StatusPopUp
                item={
                  this.state.showMap
                    ? this.state.clickData
                    : this.state.listClickedData
                }
                onPress={() => {
                  this.setState({showName: !this.state.showName});
                }}
              />
            )} */}
            {this.state.showAlarm && (
              <StatusPopUp
                alarm={true}
                item={
                  this.state.showMap
                    ? this.state.clickData
                    : this.state.listClickedData
                }
                onPress={() => {
                  this.setState({ showAlarm: !this.state.showAlarm });
                }}
              />
            )}
            {this.props.MessageBox.isMessagebox && (
              <MessageBox
                message={"You are not authorized. Please relogin"}
                Label={"Logout"}
                onPress={() => {
                  this.props._disableMessageBox();
                  this.props.EnableLoader();
                  this.props._logout(
                    this.props.Login.deviceId,
                    this.props.Login.resp?.accessToken,
                    () => this.props.navigation.navigate("Home"),
                    this.props.Login.region
                  );
                }}
              />
            )}
            {this.props.Loading.isLoading && (
              <HudView
                onPress={() => {
                  this.props.disableLoader();
                }}
              />
            )}
            <MapHeader
              notificationCount={count.length}
              showDrawer={"Yes"}
              showVehicle={this.state.showVehicle}
              showLocation={this.state.showLocation}
              showDriver={this.state.showDriver}
              drawer={() => {
                this.drawer();
              }}
              closePopUp={() => {
                this.closePopUp();
              }}
              vehicleOnPress={() => {
                this.setState({
                  showVehicle: true,
                  showLocation: false,
                  showDriver: false,
                  type: "vh",
                });
              }}
              notificationOnPress={() => {
                {
                  this.props.navigation.navigate("NotificationList");
                }
              }}
              locationOnPress={() => {
                this.setState({
                  showVehicle: false,
                  showLocation: true,
                  showDriver: false,
                  type: "lc",
                });
              }}
              driverOnPress={() => {
                this.setState({
                  showVehicle: false,
                  showLocation: false,
                  showDriver: true,
                  type: "dr",
                });
              }}
            />
            {this.state.showGuide && (
              <MessageBox
                message={"This service will update soon"}
                Label={"OK"}
                onPress={() => {
                  this.setState({ showGuide: !this.state.showGuide });
                }}
              />
            )}
            <SearchHeader
              _search={() => {
                this._search();
              }}
            />

            {this.state.showMap ? (
              <View style={{ flex: 1, backgroundColor: "lightgrey" }}>
                {!this.state.showMarkerClicked && (
                  <TouchableOpacity
                    activeOpacity={0.9}
                    style={styles.satelliteTouchable}
                    onPress={() => {
                      this.setState({
                        showSatellite: !this.state.showSatellite,
                      });
                    }}
                  >
                    {this.state.showSatellite ? (
                      <Image
                        style={{ height: "100%", width: "100%" }}
                        source={require("../../../assets/Images/pic/map.jpg")}
                      />
                    ) : (
                      <Image
                        style={{ height: "100%", width: "100%" }}
                        source={require("../../../assets/Images/pic/satelite.jpg")}
                        // source={{uri: imageUrl}}
                      />
                    )}
                  </TouchableOpacity>
                )}
                <MapView
                  provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                  style={{ flex: 1 }}
                  mapPadding={{ top: 40, right: 40, left: 40 }}
                  initialRegion={{
                    latitude: this.state.latitude,
                    longitude: this.state.longitude,
                    latitudeDelta: 0.004,
                    longitudeDelta: 4.004,
                    // latitudeDelta: 5,
                    // longitudeDelta: 5
                    // latitudeDelta: LATITUD_DELTA,
                    // longitudeDelta: LONGITUDE_DELTA,
                  }}
                  mapType={this.state.showSatellite ? "hybrid" : "standard"}
                  ref={(ref) => {
                    this._map = ref;
                  }}
                  onLayout={
                    () =>
                      this.props.DetailList.list.length > 0 &&
                      !this.state.showMarker &&
                      this._map &&
                      this._map.fitToCoordinates(coords, {
                        edgePadding: {
                          top: 10,
                          right: 10,
                          bottom: 10,
                          left: 10,
                        },
                        animated: false,
                      })
                    //</View>this._map.fitToCoordinates(coords, { edgePadding: { top: 10, right: 10, bottom: 10, left: 10 }, animated: false })
                  }
                  //maxZoomLevel={coords.length ==1 && 18}
                  showsUserLocation={true}
                  rotateEnabled={false}
                  zoomTapEnabled={true}
                  followUserLocation={true}
                  //ios
                  onSelect={() => {
                    this._onMapClicked();
                  }}
                  //android
                  // onPress={() => {
                  //   this._onMapClicked();
                  // }}
                >
                  {this.props.DetailList.list.length > 0 &&
                    this.props.DetailList.list?.map((marker, index) => (
                      <>
                        <Marker
                          key={marker.imeino}
                          onPress={() => this._markerDataSet(marker, index)}
                          coordinate={{
                            latitude: JSON.parse(marker.lat),
                            longitude: JSON.parse(marker.lang),
                          }}
                        >
                          {marker.mapSelected &&
                          (this.state.clickData.lat != "" &&
                            this.state.clickData.lat != null &&
                            this.state.clickData.lang != "" &&
                            this.state.clickData.lang != null) ? (
                            <View
                              style={{
                                zIndex: 15,
                                height: moderateScale(50),
                                width: moderateScale(50),
                                borderRadius: moderateScale(50),
                                borderWidth: 1,
                                justifyContent: "center",
                                alignItems: "center",
                                borderColor: AppStyles.colors.COLOR_PRIMARY,
                                backgroundColor: AppStyles.colors.COLOR_PRIMARY,
                              }}
                            >
                              <Image
                                style={{
                                  height: moderateScale(30),
                                  width: moderateScale(30),
                                  resizeMode: "contain",
                                }}
                                // source={{
                                //   uri:
                                //     imageUrl + this.state.clickData.icon,
                                // }}
                                source={
                                  this.state.clickData.icon != "" &&
                                  this.state.clickData.icon != null
                                    ? {
                                        uri:
                                          imageUrl + this.state.clickData.icon,
                                      }
                                    : require("../../../assets/Images/CarIcon/carblueEast.png")
                                }
                              />
                            </View>
                          ) : (
                            marker.lang != "" &&
                            marker.lang != null &&
                            marker.lat != "" &&
                            marker.lat != null && (
                              <View>
                                <Image
                                  style={{
                                    height: moderateScale(30),
                                    width: moderateScale(30),
                                    resizeMode: "contain",
                                  }}
                                  //source={{uri: imageUrl + marker.icon}}
                                  source={
                                    marker.icon != "" && marker.icon != null
                                      ? {
                                          uri: imageUrl + marker.icon,
                                        }
                                      : require("../../../assets/Images/CarIcon/carblueEast.png")
                                  }
                                />
                              </View>
                            )
                          )}
                        </Marker>
                      </>
                    ))}
                </MapView>
                {this.state.showMarkerClicked && (
                  <View style={{ height: moderateScale(300) }}>
                    <TouchableOpacity
                      onPress={() => {
                        this._onMapClicked();
                      }}
                      style={{
                        width: "100%",
                        borderBottomWidth: 0.5,
                        borderTopWidth: 0.5,
                        padding: moderateScale(5),
                        backgroundColor: "white",
                      }}
                    >
                      <Text style={{ textAlign: "center" }}>showless</Text>
                    </TouchableOpacity>
                    <VehicleDetails
                      hasMobilizeOption={true}
                      showGuide={() => {
                        this._guideInfo();
                      }}
                      selected={() => {
                        this._selectListMarker(this.state.clickData);
                      }}
                      info={() => {
                        this._info(this.state.clickData);
                      }}
                      item={this.state.clickData}
                      onPress={() => {
                        // this._listBackDetails(this.state, index);
                      }}
                      onTripHistoryPress={() => {
                        this.props.navigation.navigate("TripHistory", {
                          plate: this.state.clickData.plate,
                          imeiNo: this.state.clickData.imeino,
                          driverId: this.state.clickData.driverid,
                        });
                      }}
                      confirmMobilize={this._onConfirmMobilizeInfo}
                      onAlarmList={() => {
                        this._alarmList(this.state.clickData);
                      }}
                      onShare={() => {
                        this._onShare(this.state.clickData);
                      }}
                      status={() => {
                        this.setState({ showStatus: true });
                      }}
                      showName={() => {
                        this.setState({ showName: true });
                      }}
                      alarmInfo={() => {
                        this.setState({ showAlarm: true });
                      }}
                      type={type}
                      mobilize={this.props.DetailList.Mobilize}
                    />
                  </View>
                )}
              </View>
            ) : (
              <View style={{ flex: 1, backgroundColor: "white" }}>
                <FlatList
                  data={list ? list : ""}
                  renderItem={(item, index) =>
                    this._detailListRender(item, index)
                  }
                  extraData={this.state}
                  keyboardShouldPersistTaps={"always"}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
            )}

            {this.props.DetailList.list.length > 0 && (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingBottom: moderateScale(0),
                }}
              >
                <HalfButton
                  Label={"Map"}
                  backgroundColor={
                    this.state.showMap
                      ? AppStyles.colors.COLOR_PRIMARY
                      : AppStyles.colors.COLOR_GREY
                  }
                  textColor={
                    this.state.showMap
                      ? AppStyles.colors.COLOR_WHITE
                      : AppStyles.colors.COLOR_BLACK
                  }
                  onPress={() => {
                    this.setState({
                      showMarker: true,
                      showMap: true,
                      showLess: false,
                    });
                  }}
                  height={moderateScale(50)}
                />
                <HalfButton
                  Label={"List"}
                  backgroundColor={
                    this.state.showMap
                      ? AppStyles.colors.COLOR_GREY
                      : AppStyles.colors.COLOR_PRIMARY
                  }
                  height={moderateScale(50)}
                  textColor={
                    this.state.showMap
                      ? AppStyles.colors.COLOR_BLACK
                      : AppStyles.colors.COLOR_WHITE
                  }
                  onPress={() => {
                    this._listClicked();
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

export default HomeView;
