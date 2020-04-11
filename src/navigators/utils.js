import React from 'react';
import {View} from 'react-native'
import {InsertUser, VerifyUser, UserQRCode} from '../components';
import {Role} from '../data/index'


export const getTabScreens = (role, Tab) => {

    if(role == 'admin') {
        return (
            <>
            <Tab.Screen name="Insert" component={InsertUser} />
            <Tab.Screen name="Verify" component={VerifyUser} />
            <Tab.Screen name="QR Code" component={UserQRCode} />
        </>);
    }else if(role == 'health'){
        return (<>
            <Tab.Screen name="Insert" component={InsertUser} />
            <Tab.Screen name="QR Code" component={UserQRCode} /> 
        </>); 
    }else if(role == 'verifier'){
        return (<>
            <Tab.Screen name="Verify" component={VerifyUser} />
            <Tab.Screen name="QR Code" component={UserQRCode} />
        </>); 
    }else if(role == 'user'){
        return (
            <Tab.Screen name="QR Code" component={UserQRCode} />   
        ); 
    }
}