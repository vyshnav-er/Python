// import React, { useEffect } from 'react';
// import { Alert , Platform} from 'react-native';
// import messaging from '@react-native-firebase/messaging';
// //const mainUrl = ReturnUrl.getUrl();
// //const mainToken = ReturnUrl.getToken();
// import Navigator from './navigation/navigationStack';
// import {navigate} from './navigation/topLevelNavigation'
// import {LocalNotification} from '../app/components/localNotification';
// const platform = Platform.OS;

// import Actions from '../app/action/index';
// // import {onNotification} from '../src/actions/notification';

// import {connect} from 'react-redux';



// // function sendToken(user_token, platform )  {
// //   return fetch(mainUrl,
// //   {
// //     method: "POST",
  
// //     // whatever data you want to post with a key-value pair
  
// //     body: "token="+mainToken+"&action=useradd"+"&user_token="+user_token+"&platform="+platform,
// //     headers: 
// //     {
// //         "Content-Type": "application/x-www-form-urlencoded"
// //     }
  
// //   })
// //   .catch(error => {
// //   console.error(error);
  
// //   });
  
// //   }



// getToken =  async (props) => {
//   fcmToken = await messaging().getToken();
//   //sendToken(fcmToken,platform);
// console.warn('FCMTOKEN',fcmToken);
//   props.setFCMTOKEN(fcmToken);
//   }

//   requestPermission = async() => {
//     try {
//       await messaging().requestPermission();
//       // If user allow Push Notification
//       this.getToken(props);
//     } catch (error) {
//       // If user do not allow Push Notification
//       console.log('Rejected');
//     }
//   }


//   showOnActive = () => {
//     let appStatusForeground= 'foreground'
    
//     const unsubscribe = messaging().onMessage(async remoteMessage => {
   

//       LocalNotification(remoteMessage);
//   console.warn('Message handled in the Forground!', remoteMessage);
//   //navigate('Search')
//     });

//     return unsubscribe;
//   }

//   showOnClose =(mainProps) => { 
//     let appStatusBackGround = 'background'
//     messaging().setBackgroundMessageHandler(async remoteMessage => {
//       console.warn('Message handled in the background!', remoteMessage);
//       LocalNotification(remoteMessage);
//     });

//   }


// onMessageOpen =(Props) =>{
//    // Alert.alert('hi')
//     messaging().onNotificationOpenedApp(async remoteMessage => {
//       Alert.alert('hi')

//      // navigate('Search')
//    //   Props.addStatus('recieved');
//     });
    
//   } 

// const PushEntry = props => {
//   useEffect(() => {
//   // LocalNotification();
//   platform ==='ios' ? requestPermission() : getToken();
//   getToken(props);
//   showOnActive();
//   showOnClose(props); 
//   onMessageOpen(props);

//   }, []);

 
//   return(
//     <Navigator/>
//   );
// }


// const mapStateToProps = (state) => {
//     return {
// //notificationState: state.notificationReducer.notificationState
//     }
//   }
  
//   const mapDispatchToProps = (dispatch) => {

//     return {
//     //  addStatus: (status) => dispatch(onNotification(status))
//       setFCMTOKEN: (token) => {
//        dispatch(Actions.loginAction.loginGetFcm(token));
//      },
//     }
//   }





// export default connect(mapStateToProps, mapDispatchToProps) (PushEntry);