import React, { Component,useEffect } from 'react';
import { ActivityIndicator, Platform,Alert } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import Navigator from './navigation/navigationStack';
import configureStore from './store';
const { persistor, store } = configureStore();
// import messaging from '@react-native-firebase/messaging';
// import {navigate} from '../app/navigation/topLevelNavigation'
const platform = Platform.OS;
// import Actions from '../app/action/index';
// import PushEntry from './pushEntry'
import { connect } from 'react-redux';

export default function Entrypoint (){
        return (
            <Provider store={store}>
                <PersistGate
                    loading={<ActivityIndicator />}
                    persistor={persistor}
                >{
                //    <PushEntry/>
                <Navigator />
                }
                    
                </PersistGate>
            </Provider>
        );
   
}


