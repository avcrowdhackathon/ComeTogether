import React from 'react';
import {View, Image,StatusBar} from 'react-native';

export default function Splash(){
    return(
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Image source={require('../../images/android-icon-36x36.png')} />
            <StatusBar barStyle="default" />
        </View>
    )
}
  