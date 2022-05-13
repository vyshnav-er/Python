import React, { useState, useEffect, Component } from 'react';
import {Platform} from "react-native"
import ApiConstants from './apiConstants';
import MessageBox from '../components/messageBox';
import { Alert, Linking } from 'react-native';
import { useLinkProps } from '@react-navigation/native';

export default function api(path, params, method, token, apiRgn,isLegacyUrl = false) {
  let options;
  options = {
    headers: {
      'API-KEY': 'zaeemkey1',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
      'APP-VER': '6;1.0.2'
    },
    method: method,
    ...(params && { body: JSON.stringify(params) }),
  };
  // console.log('ApiCal',
  //   ApiConstants.BASE_URL + (apiRgn == 'Oman' ? ApiConstants.BASE_URL_OMAN : apiRgn == 'Demo' ? ApiConstants.BASE_URL_DEMO : ApiConstants.BASE_URL_UAE) + ApiConstants.SUB_URL + path, options,
  //   'heu', apiRgn
  // );
  const getApiUrl = () =>{
    let urlPath ='';

     if(isLegacyUrl){
      urlPath = (apiRgn == 'Oman' ? ApiConstants.BASE_URL_OMAN : apiRgn == 'Demo' ? ApiConstants.LEGACY_BASE_URL_DEMO : ApiConstants.BASE_URL_UAE) + path;
     } else {
      urlPath = (apiRgn == 'Oman' ? ApiConstants.BASE_URL_OMAN : apiRgn == 'Demo' ? ApiConstants.BASE_URL_DEMO : ApiConstants.BASE_URL_UAE) + ApiConstants.SUB_URL + path;
     }
     return urlPath;
  }

  const apiUrl = getApiUrl()
  // console.log("apiUrl",apiUrl);
  return fetch(apiUrl, options)
  .then((resp) => {
      let appVer = resp?.headers.map['app-ver'];
      let buildVer = appVer && appVer.split(';')[0];
      console.log("appVer && buildVer",appVer , buildVer);
      
      if (appVer && buildVer) {
        if (buildVer > 6) {

          Alert.alert('GtrackIT', 'There is a new improved version available please update,thank you!', [
            {
              text: 'Update',
              onPress: () => {
                Linking.openURL('https://play.google.com/store/apps/details?id=com.gtrackit')
              }
            }
          ])

        }
      }
      
      const statusCode = resp?.status;
      const data =  resp?.json();
      // console.log("api response",data);
      if (statusCode == 401) {
        return Promise.all([statusCode]);
      }
      else if (statusCode == 404) {
        return Promise.all([statusCode]);
      }
      else if (statusCode == 204) {
        return Promise.all([statusCode]);
      }
      else {
        return Promise.all([statusCode, data]);
      }
    })
    .catch((error) => {
      return error
    });
}

