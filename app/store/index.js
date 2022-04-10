import {createStore, compose, applyMiddleware} from 'redux';
import {persistStore, persistCombineReducers} from 'redux-persist';
import {AsyncStorage} from 'react-native'; // default: localStorage if web, AsyncStorage if react-native
import {createLogger} from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import rootReducers from '../reducer'; // where reducers is a object of reducers
import sagas from '../saga';
import driversListReducer from '../reducer/driversListReducer';


const config = {
  key: 'root',
  storage:AsyncStorage,
  blacklist: [,'detailListReducer','tripHistoryreducer','tripHistoryDetailReducer','alarmListReducer','messageboxReducer'],
  whitelist: ['loginReducer','globalReducer','vehicleListReducer','driversListReducer'],
  debug: true, //to get useful logging
};

const middleware = [];
const sagaMiddleware = createSagaMiddleware();

middleware.push(sagaMiddleware);

if (__DEV__) {
  middleware.push(createLogger());
}

const reducers = persistCombineReducers(config, rootReducers);
const enhancers = [applyMiddleware(...middleware)];
// const initialState = {};
const persistConfig = {enhancers};
const store = createStore(reducers, undefined, compose(...enhancers));
const persistor = persistStore(store, persistConfig, () => {
});
const configureStore = () => {
  return {persistor, store};
};

sagaMiddleware.run(sagas);

export default configureStore;
