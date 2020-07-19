import React from 'react';
import {TouchableOpacity, Text } from 'react-native';

const PadBtn = ({number, style, pressFunc}) => {
    return(
        <TouchableOpacity style={{width:30, height:30, justifyContent:'center', alignItems:'center'}} onPress={pressFunc}>
            <Text style={style}>
                {number}
            </Text>
        </TouchableOpacity>
    )
}

export default PadBtn;