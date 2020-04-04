import React from 'react';
import {Image} from 'react-native';

export default function LogoTitle() {
    return (
      <Image
        style ={{flex:1}}
        source={require('../../images/android-icon-36x36.png')}
        resizeMode='contain'
      />
    );
  }