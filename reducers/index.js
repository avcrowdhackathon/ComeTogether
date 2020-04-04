import { combineReducers } from 'redux';
import AsyncStorage from '@react-native-community/async-storage';
import {persistReducer } from 'redux-persist';

import authReducer from './auth';
import privateKeyReducer from './privateKey';
import stepsReducer from './steps';

const privateKeyPersistConfig = {
    key: 'privateKey',
    storage: AsyncStorage,
    whitelist: ['privateKey']
}

const authPersistConfig = {
    key: 'userToken',
    storage: AsyncStorage,
    whitelist: ['userToken']
}

const stepsPersistConfig = {
    key: 'stepsSeen',
    storage: AsyncStorage,
    whitelist: ['stepsSeen']
}

const rootPersistConfig = {
    key: 'root',
    storage: AsyncStorage,
    blacklist: ['privateKey','auth','steps']
}

  
const reducer =  combineReducers({
    auth: persistReducer(authPersistConfig, authReducer),
    privateKey: persistReducer(privateKeyPersistConfig, privateKeyReducer),
    steps: persistReducer(stepsPersistConfig, stepsReducer)
})

export default persistReducer(rootPersistConfig, reducer)