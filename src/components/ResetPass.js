import React from 'react';
import {TouchableOpacity, StyleSheet, Text, View, Image} from 'react-native';
import { NumericPad, PasscodeView } from '../components';
import { useNavigation } from '@react-navigation/native';
import { connect } from "react-redux";
import { resetNewCode, resetPassCode, setStatus } from '../../actions';

const ResetPassword = ({status, dispatch}) => {
    const navigation = useNavigation();
    
    const backfunc = () => {
        dispatch(resetPassCode());
        dispatch(resetNewCode());
        dispatch(setStatus(true));
        navigation.goBack();
    }

    return (
    <View style={{marginVertical:20, marginHorizontal:18, flexDirection:'column', flexGrow:1}}>
        <View style={{flexGrow:0.5}}>
        <TouchableOpacity onPress={backfunc}>
            <Image style={{width:24, height:24}} source={require('../../images/back.png')} />
        </TouchableOpacity>
        </View>
    <View style={{flexGrow:2, flexDirection:'column', justifyContent:'space-between', marginHorizontal:18}}>
        <Text style={styles.texts}>{status? "Enter your existing passcode": status? "Create your new passcode":"Confirm your new passcode"}</Text>
        <PasscodeView/>
        <NumericPad/>
    </View>
    </View>

    );
  }
 
 const styles = StyleSheet.create({
    texts: {
        textAlign:'center',
        fontWeight:'bold',
        fontSize: 18,
      },
 })

const mapStateToProps = (state) => ({
    status: state.pass.old
});

const mapDispatchToProps = (dispatch) => ({
    dispatch,
  });
  

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);