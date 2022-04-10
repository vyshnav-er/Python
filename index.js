/**
 * @format
 */

import {AppRegistry} from 'react-native';
import Entrypoint from './app/entryPoint'
// import messaging from '@react-native-firebase/messaging';
import {name as appName} from './app.json';
// import {LocalNotification} from './app/components/localNotification'


// messaging().setBackgroundMessageHandler(async remoteMessage => {
//     console.log('AppEXIT', remoteMessage);
//     LocalNotification(remoteMessage);
//   });
AppRegistry.registerComponent("Gtrackit", () => Entrypoint);

