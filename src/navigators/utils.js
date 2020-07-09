import React from 'react';
import {View} from 'react-native'
import {InsertUser, VerifyOptions, UserQRCode} from '../components';
import CertificateNavigator from './CertificateNavigator';
import {Role} from '../data/index'


export const getTabScreens = (role, Tab) => {

    if(role == 'admin') {
        return (
            <>
                <Tab.Screen name="Insert" component={InsertUser} />
                <Tab.Screen name="Verify" component={VerifyOptions} />
                <Tab.Screen name="QR Code" component={UserQRCode} />
            </>
        );
    }else if(role == 'health'){
        return (
            <>
                <Tab.Screen name="Insert" component={InsertUser} />
                <Tab.Screen name="QR Code" component={UserQRCode} /> 
            </>
        ); 
    }else if(role == 'verifier'){
        return (
            <>
                <Tab.Screen name="Verify" component={VerifyOptions} />
                <Tab.Screen name="QR Code" component={UserQRCode} />
            </>
        ); 
    }else if(role == 'user'){
        return (
            <>
                <Tab.Screen name="QR Code" component={UserQRCode} />
                <Tab.Screen name= "Certificates" component={CertificateNavigator} />
            </>
        ); 
    }
}