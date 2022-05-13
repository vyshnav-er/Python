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
 
  const getApiUrl = () =>{
    let urlPath ='';

     if(isLegacyUrl){
      urlPath = (apiRgn == 'Oman' ? ApiConstants.LEGACY_BASE_URL_OMAN : apiRgn == 'Demo' ? ApiConstants.LEGACY_BASE_URL_DEMO : ApiConstants.LEGACY_BASE_URL_UAE) + path;
     } else {
      urlPath = (apiRgn == 'Oman' ? ApiConstants.BASE_URL_OMAN : apiRgn == 'Demo' ? ApiConstants.BASE_URL_DEMO : ApiConstants.BASE_URL_UAE) + ApiConstants.SUB_URL + path;
     }
    //  console.log("urlPath",urlPath,apiRgn);
     return urlPath;
  }

  const apiUrl = getApiUrl()
// console.log("apiUrl",apiUrl,isLegacyUrl);
  return fetch(apiUrl, options)
  .then((resp) => {
    
    //   let appVer = resp?.headers.map['app-ver'];
    //   let buildVer = appVer && appVer.split(';')[0];
    //   // console.log("response of login",resp,appVer,buildVer);
    //   if (appVer && buildVer) {
    //     if (buildVer > 4) {

    //       Alert.alert('GtrackIT', 'There is a new improved version available please update,thank you!', [
    //         {
    //           text: 'Update',
    //           onPress: () => {
    //             Linking.openURL('https://play.google.com/store/apps/details?id=com.gtrackit')
    //           }
    //         }
    //       ])

    //     }
    //   }
      
      const statusCode = resp?.status;
      // const blobData = await resp?.blob();
      // console.log("blobData data",blobData);
      const data =  resp.text();
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
    //   return resp;

    // }).then((resp)=> resp.text())
    // .then((result)=>{
      
    //   console.log("json format result",typeof result,result);
    //   return result;
    // })
    })
    .catch((error) => {
      return error
    });
}

