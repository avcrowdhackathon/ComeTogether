import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import {PadBtn} from '../components';

const NumericPad = () => {

    return(
        <View >
            <View style={style.lines}>
                <PadBtn style={style.numb} number="1" pressFunc={()=>{console.log("Press")}} />
                <PadBtn style={style.numb} number="2" pressFunc={()=>{console.log("Press")}} />
                <PadBtn style={style.numb} number="3" pressFunc={()=>{console.log("Press")}} />
            </View>
            <View style={style.lines}>
                <PadBtn style={style.numb} number="4" pressFunc={()=>{console.log("Press")}} />
                <PadBtn style={style.numb} number="5" pressFunc={()=>{console.log("Press")}} />
                <PadBtn style={style.numb} number="6" pressFunc={()=>{console.log("Press")}} />
            </View>
            <View style={style.lines}>
                <PadBtn style={style.numb} number="7" pressFunc={()=>{console.log("Press")}} />
                <PadBtn style={style.numb} number="8" pressFunc={()=>{console.log("Press")}} />
                <PadBtn style={style.numb} number="9" pressFunc={()=>{console.log("Press")}} />
            </View>
            <View style={style.lines}>
                <View style={{width:30, height:30}}></View>
                <PadBtn style={style.numb} number="0" pressFunc={()=>{console.log("Press")}} />
                <TouchableOpacity style={{width:30, height:30, justifyContent:'center', alignItems:'center'}}>
                    <Image  source={require("../../images/back.png")} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const style= StyleSheet.create({
    lines: {
        flexDirection:'row',
        justifyContent:'space-evenly',
        marginVertical:20,
        marginHorizontal:10
    },  
    numb:{
        fontSize: 30
    }
})


export default NumericPad;