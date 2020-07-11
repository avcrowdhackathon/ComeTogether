import React from 'react';
import { View, Text, Image,TouchableOpacity } from 'react-native';
import {B} from '../components';

const Test = ({id, title, date, expiration, result, onSelect}) => {
    

    return(
        <View style={{marginHorizontal:10, marginVertical:5}}>
        <TouchableOpacity onPress={()=>onSelect(id)} style={{flex:1, flexDirection:'row', justifyContent:'space-between',  alignItems:'center', paddingHorizontal:10, paddingVertical:5, borderRadius:10, borderWidth:1}}>
            <View>
                <Text style={{fontSize:18, fontWeight:'bold', color:'blue'}}>
                    {title}
                </Text>
                <Text>
                    <B>Date:</B> {date}
                </Text>
                <Text>
                    <B>Expiration Date:</B> {expiration}
                </Text>
            </View>
            <View>
                <Image style={{width:16, height:16}} source={result?require('../../images/green-tick.png'):require('../../images/red-x.png')} />
            </View>
        </TouchableOpacity>
        </View>
    )
}

export default Test;