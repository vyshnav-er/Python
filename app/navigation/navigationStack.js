import 'react-native-gesture-handler';
import * as React from 'react';
import {connect} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
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
  Platform, Alert
} from 'react-native';
const platform = Platform.OS;
import Search from '../screens/search';
import Login from '../screens/login';
import Splash from '../screens/splash';
import WebView from '../screens/login/webView';
import Home from '../screens/home';
import VehicleDetailPage from '../screens/home/vehicleDetailPage';
import AlarmList from '../screens/home/alarmList';
import VehicleDetail from '../screens/vehicleDetail';
import TripHistory from '../screens/tripHistory';
import TripListDetail from '../screens/tripHistory/tripListDetail';
import Logout from '../screens/home/logout';
import DrawerSupport from '../screens/home/drawerSupport';
import WhatsNew from '../screens/home/whatsNew';
import CustomMapView from '../screens/home/mapView';
import Forgot from '../screens/login/forgot';
import {LongButton} from '../components/button';
import {navigationRef,navigate} from './topLevelNavigation'
import messaging from '@react-native-firebase/messaging';
import Test from '../Test'
import Actions from '../../app/action/index'
import DrawerStyle from '../screens/drawer'
import NotificationView from '../screens/notification'
import NotificationList from '../screens/notification/notificationList'
import NotificationListView from '../screens/notification/notificationListView'
//import Profile from '../screens/Profile'

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
function DrawerNav() {
  return (
    <Drawer.Navigator
     initialRouteName="Home"
    drawerContent={props => <DrawerStyle {...props}/>}
    
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Support" component={DrawerSupport} />
      <Drawer.Screen name="Coming Up" component={WhatsNew} />
      <Drawer.Screen name="Logout" component={Logout} />
      {/* <Text>hello</Text>
      drawerContent={props => <DrawerContent {...props} />}
      
      */}
    </Drawer.Navigator>
  );
}

class RootNavigator extends React.Component {
  constructor(props) {
    super(props);
  }
 
  render() {
    return (
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator>
          {this.props.Login.isLogin ? (
            <>
              <Stack.Screen
                name="Home"
                component={DrawerNav}
                options={{
                  headerShown: false,
                }}
              />

              {/* <Stack.Screen name="Home" component={Home} 
            options={{
            headerShown:false
            }}/> */}
              <Stack.Screen
                name="Search"
                component={Search}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="VehicleDetail"
                component={VehicleDetail}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="TripHistory"
                component={TripHistory}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="TripListDetail"
                component={TripListDetail}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="VehicleDetailPage"
                component={VehicleDetailPage}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="AlarmList"
                component={AlarmList}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="DrawerSupport"
                component={DrawerSupport}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="WhatsNew"
                component={WhatsNew}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="CustomMapView"
                component={CustomMapView}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="NotificationView"
                component={NotificationView}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="NotificationList"
                component={NotificationList}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="NotificationListView"
                component={NotificationListView}
                options={{
                  headerShown: false,
                }}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="Splash"
                component={Splash}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="Login"
                component={Login}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="WebView"
                component={WebView}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="Forgot"
                component={Forgot}
                options={{
                  headerShown: false,
                }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

function mapStateToProps(state) {
  return {
    Login: state.loginReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
setFCMTOKEN: (token) => {
       dispatch(Actions.loginAction.loginGetFcm(token));
     },

  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RootNavigator);
