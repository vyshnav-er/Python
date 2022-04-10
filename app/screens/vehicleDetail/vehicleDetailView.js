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
import Geolocation from 'react-native-geolocation-service';
import {request, PERMISSIONS, check, RESULTS} from 'react-native-permissions';
import MapHeader from '../../components/mapHeader';
import SearchHeader from '../../components/searchHeader';
import {RightArrow, UpArrow, Info} from '../../config/svg';
import Toast from 'react-native-simple-toast';
import styles from './styles';
import appStyles from '../../config/styles';
import {HalfButton} from '../../components/button';
import {moderateScale} from 'react-native-size-matters';
import AppStyles from '../../config/styles';
import {VehicleDetails} from '../../components/vehicelDetails';
import HudView from '../../components/hudView';
import MapView, {
  provider,
  Marker,
  Callout,
  Heatmap,
  Polyline,
  Polygon,
} from 'react-native-maps';
import {PROVIDER_GOOGLE} from 'react-native-maps'; //
let lat = '',
  long = '';
const coordinates = [[76.9102172, 8.5003739]];
let marker = [];
class HomeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddMemberModal: false,
      showVehicle: false,
      showDriver: false,
      showLocation: false,
      showMap: true,
      selectedIndex: 1000000,
      showList: true,
      lat: 8.5003739,
      long: 76.9102172,
      latitude: 0,
      longitude: 0,
      coordinates: coordinates,
      gpsStatus: false,
      type: '',
      initialRegion: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.04749824275133463,
        longitudeDelta: 0.0274658203125,
      },
      clickData: [],
      showMarkerClicked: false,
    };
    this.back = false;
    this._map = null;
  }

  componentDidMount() {
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardDidHide,
    );
    //  this._getLocation();
    if (this.props.VehicleList.list.length == 0) {
      this.props.EnableLoader();
      this.props.getVehicleList(this.props.Login.resp.accessToken);
    }
    this._map.fitToSuppliedMarkers(
      this.props.DetailList.list,
      true, // not animated
    );
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

  _search = () => {
    if (
      this.state.showLocation ||
      this.state.showDriver ||
      this.state.showVehicle
    ) {
      this.props.navigation.navigate('Search', {type: this.state.type});
    } else {
     
    }
  };

  _markerDataSet = (item, index) => {
    this.setState({
      clickData: item,
      showMarkerClicked: true,
      initialRegion: {
        latitude: JSON.parse(this.props.DetailList.list[index].lat),
        longitude: JSON.parse(this.props.DetailList.list[index].lang),
        latitudeDelta: 0.04749824275133463,
        longitudeDelta: 0.0274658203125,
      },
    });
  };
  _listDetails = (item, index) => {
    this.setState({selectedIndex: index, showList: false});
  };
  _listBackDetails = (item, index) => {
    this.setState({selectedIndex: 1000000, showList: false});
  };
  _detailListRender = ({item, index}) => {
    return (
      <View>
        {this.state.selectedIndex == index ? (
          <VehicleDetails
            item={item}
            onPress={() => {
              this._listBackDetails(item, index);
            }}
          />
        ) : (
          <TouchableOpacity
            style={styles.renderContainer}
            activeOpacity={0.3}
            onPress={() => {
              this._listDetails(item, index);
            }}>
            <View style={{flex: 4}}>
              <Text style={styles.boldText}>Plate Number : {item.plateNo}</Text>
              <Text style={styles.regularText}>
                Chassis No : {item.chassisNo}
              </Text>
              <Text style={styles.regularText}>GPSID : {item.gpsid}</Text>
              {item.alarms.length > 0 && (
                <TouchableOpacity
                  style={{
                    padding: 2,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text style={styles.alarmWarningText}>
                    {item.alarms[0].alarm}
                  </Text>
                  <Info size={moderateScale(13)} color={'red'} />
                </TouchableOpacity>
              )}
            </View>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
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
  goToInitialLocation = () => {
    //let initialRegion = Object.assign({}, this.state.initialRegion);
    //  initialRegion['latitudeDelta'] = 0.005;
    // initialRegion['longitudeDelta'] = 0.005;
    //  this.mapView.animateToRegion(initialRegion, 2000);
  };
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          backgroundColor={appStyles.colors.COLOR_PRIMARY}
          barStyle="light-content"
        />
        {this.props.Loading.isLoading && <HudView />}
        <MapHeader
          showVehicle={this.state.showVehicle}
          showLocation={this.state.showLocation}
          showDriver={this.state.showDriver}
          vehicleOnPress={() => {
            this.setState({
              showVehicle: true,
              showLocation: false,
              showDriver: false,
              type: 'vh',
            });
          }}
          locationOnPress={() => {
            this.setState({
              showVehicle: false,
              showLocation: true,
              showDriver: false,
              type: 'lc',
            });
          }}
          driverOnPress={() => {
            this.setState({
              showVehicle: false,
              showLocation: false,
              showDriver: true,
              type: 'dr',
            });
          }}
        />
        <SearchHeader
          _search={() => {
            this._search();
          }}
        />
        {this.state.showMap ? (
          <View style={{flex: 1, backgroundColor: 'lightgrey'}}>
            <MapView
              provider={PROVIDER_GOOGLE} // remove if not using Google Maps
              style={{flex: 1}}
              //region={initialRegion}
              onPress={() => {
                this.setState({showMarkerClicked: false});
              }}
              followUserLocation={true}
              // zoomEnabled={true}
              // minZoomLevel={8}
              //maxZoomLevel={100}
              showsUserLocation
              ref={ref => {
                this._map = ref;
              }}
              // onMapReady={() => {
              //   this.props.DetailList.list;
              // }}

              region={
                this.props.DetailList.list.length > 0
                  ? this.state.initialRegion
                  : {
                      latitude: 0,
                      longitude: 0,
                      latitudeDelta: 0.04749824275133463,
                      longitudeDelta: 0.0274658203125,
                    }
              }

              //camera={this.state.initialRegion}
              //initialCamera={37.78}
            >
              {this.props.DetailList.list.length > 0 &&
                this.props.DetailList.list.map((marker, index) => (
                  <>
                    <Marker
                      key={marker.imeino}
                      // ref={ref => markers[index] = ref}
                      onPress={() => this._markerDataSet(marker, index)}
                      coordinate={{
                        latitude: JSON.parse(marker.lat),
                        longitude: JSON.parse(marker.lang),
                      }}

                      // onMarkerPress={()=>{}}
                    >
                      {marker.sdirect == 'South' ? (
                        <Image
                          style={{
                            height: moderateScale(30),
                            width: moderateScale(30),
                            resizeMode: 'contain',
                          }}
                          source={require('../../../assets/Images/CarIcon/carblueNorth.png')}
                        />
                      ) : marker.sdirect == 'East' ? (
                        <Image
                          style={{
                            height: moderateScale(30),
                            width: moderateScale(30),
                            resizeMode: 'contain',
                          }}
                          source={require('../../../assets/Images/CarIcon/cargrnEast.png')}
                        />
                      ) : (
                        <Image
                          style={{
                            height: moderateScale(30),
                            width: moderateScale(30),
                            resizeMode: 'contain',
                          }}
                          source={require('../../../assets/Images/CarIcon/carredSouth.png')}
                        />
                      )}
                    </Marker>
                  </>
                ))}
            </MapView>
            {this.state.showMarkerClicked && (
              <View style={{flex: 1.5}}>
                <VehicleDetails
                  item={this.state.clickData}
                  onPress={() => {
                    this._listBackDetails(item, index);
                  }}
                />
              </View>
            )}
          </View>
        ) : (
          <View style={{flex: 1, backgroundColor: 'lightgrey'}}>
            <FlatList
              data={
                this.props.DetailList.list ? this.props.DetailList.list : ''
              }
              renderItem={(item, index) => this._detailListRender(item, index)}
              extraData={this.state}
              keyboardShouldPersistTaps={'always'}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        )}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingBottom: moderateScale(0),
            backgroundColor:'red'
          }}>
          <HalfButton
            Label={'clear'}
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
              this.setState({showMap: true});
            }}
            height={moderateScale(50)}
          />
          <HalfButton
            Label={'List'}
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
              this.setState({showMap: false, selectedIndex: 100000});
            }}
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default HomeView;
