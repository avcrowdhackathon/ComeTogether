import React from 'react';
import {View, Image,StatusBar} from 'react-native';

export default function Splash(){
    return(
        <View style={{flex:1,justifyContent:'center',alignItems:'center', backgroundColor:'white'}}>
            <Image style={{width:80, height:80}} source={require('../../images/logo_name.png')} resizeMode='contain'/>
            <StatusBar barStyle="default" />
        </View>
    )
}
  