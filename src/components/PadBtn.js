import React from 'react';
import {TouchableOpacity, Text } from 'react-native';
import { connect } from "react-redux";
import { setPassCode , setNewCode, setStatus, setRepeat, setConfCode} from '../../actions';
import { resetPassUser } from '../services/sevices'; 

const PadBtn = ({number, style, currentpass, newpass, confpass, status, repeat, dispatch}) => {

  const pressFuncCurrent = () => {
    if(currentpass.length == 5){
      dispatch(setStatus(false))
    }
    dispatch(setPassCode(currentpass+number))
  }

  const pressFuncNew = () => {
    if(newpass.length == 5){
      dispatch(setRepeat(true))
    }
    dispatch(setNewCode(newpass+number))
  }
  
  const pressFuncConf = async () => {
    await dispatch(setConfCode(confpass+number))
    if( confpass.length == 5){
      if(confpass === newpass){
        await resetPassUser(currentpass, newpass);
      }
      else {
        console.warn("Error");
      }
    }
  }
    return(
        <TouchableOpacity style={{width:30, height:30, justifyContent:'center', alignItems:'center'}} onPress={()=>{status?pressFuncCurrent():repeat?pressFuncConf():pressFuncNew()}}>
            <Text style={style}>
                {number}
            </Text>
        </TouchableOpacity>
    )
}


const mapStateToProps = (state) => ({
    currentpass: state.pass.passCode,
    newpass: state.pass.newCode,
    confpass: state.pass.confCode,
    status: state.pass.old,
    repeat: state.pass.repeat
  });
  
  const mapDispatchToProps = (dispatch) => ({
    dispatch,
  });
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(PadBtn);