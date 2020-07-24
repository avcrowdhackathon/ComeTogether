import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, SliderComponent } from 'react-native';
import {PadBtn} from '../components';
import { connect } from "react-redux";
import { setPassCode, setStatus, resetNewCode, resetPassCode, setNewCode, setRepeat, setConfCode } from '../../actions';

const NumericPad = ({currentpass, newpass, confpass, old, repeat, dispatch}) => {

    return(
        <View style={{marginHorizontal:40}}>
            <View style={style.lines}>
                <PadBtn style={style.numb} number="1" />
                <PadBtn style={style.numb} number="2" />
                <PadBtn style={style.numb} number="3" />
            </View>
            <View style={style.lines}>
                <PadBtn style={style.numb} number="4" />
                <PadBtn style={style.numb} number="5" />
                <PadBtn style={style.numb} number="6" />
            </View>
            <View style={style.lines}>
                <PadBtn style={style.numb} number="7" />
                <PadBtn style={style.numb} number="8" />
                <PadBtn style={style.numb} number="9" />
            </View>
            <View style={style.lines}>
                <View style={{width:30, height:30}}></View>
                <PadBtn style={style.numb} number="0"/>
                {currentpass == '' ? <View style={{width:30, height:30}}></View> : <TouchableOpacity style={{width:30, height:30, justifyContent:'center', alignItems:'center'}} onPress={()=> {old?dispatch(setPassCode(currentpass.slice(0,currentpass.length-1))):repeat?dispatch(setConfCode(confpass.slice(0, confpass.length-1))):dispatch(setNewCode(newpass.slice(0,newpass.length-1)))}}>
                    <Image  source={require("../../images/back.png")} />
                </TouchableOpacity>}
            </View>
        </View>
    )
}

const style= StyleSheet.create({
    lines: {
        flexDirection:'row',
        justifyContent:'space-between',
        marginVertical:25,
    },  
    numb:{
        fontSize: 30,
    }
})


const mapStateToProps = (state) => ({
    currentpass: state.pass.passCode,
    newpass: state.pass.newCode,
    confpass: state.pass.confCode,
    old: state.pass.old,
    repeat: state.pass.repeat
  });
  
  const mapDispatchToProps = (dispatch) => ({
    dispatch,
  });
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(NumericPad);