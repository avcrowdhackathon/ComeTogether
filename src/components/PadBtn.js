import React from 'react';
import {TouchableOpacity, Text } from 'react-native';
import { connect } from "react-redux";
import { setPassCode , setNewCode, setStatus} from '../../actions';
 
const PadBtn = ({number, style, currentpass,newpass,status, dispatch}) => {

  const pressFuncCurrent = () => {
    if(currentpass.length == 5){
      dispatch(setStatus(false))
    }
    dispatch(setPassCode(currentpass+number))
  }

  const pressFuncNew = () => {
    if(newpass.length == 5){
      //dispatch(setStatus(false))
    }
    dispatch(setPassCode(newpass+number))
  }

    return(
        <TouchableOpacity style={{width:30, height:30, justifyContent:'center', alignItems:'center'}} onPress={()=>{status?pressFuncCurrent():pressFuncNew()}}>
            <Text style={style}>
                {number}
            </Text>
        </TouchableOpacity>
    )
}


const mapStateToProps = (state) => ({
    currentpass: state.pass.passCode,
    newpass: state.pass.newCode,
    status: state.pass.old
  });
  
  const mapDispatchToProps = (dispatch) => ({
    dispatch,
  });
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(PadBtn);