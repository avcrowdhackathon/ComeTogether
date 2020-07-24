import React from 'react';
import { View, Text, StyleSheet, Animated} from 'react-native';
import { connect } from "react-redux";


const PasscodeView = ({currentpass, newpass, status}) => {
    const [animation, setAnimation] = React.useState(new Animated.Value(0))
    

    const boxInterpolation =  animation.interpolate({
        inputRange: [0, 1],
        outputRange:["rgb(0,103,187)" , "rgba(0,103,187, 0.6)"]
    })
    let cl = (pos) => {const foc= (status?currentpass.length:newpass.length) >= pos?{color:boxInterpolation}:{color:'rgba(0,103,187, 0.6)'}; return(foc)}

    return(
        <View style={{justifyContent:'center', alignItems:'center'}}>
            <View style={{flexDirection:'row'}}>
                <Animated.Text style={[style.field, cl(1)]}>
                    *
                </Animated.Text>
                <Animated.Text style={[style.field, cl(2)]}>
                    *
                </Animated.Text>
                <Animated.Text style={[style.field, cl(3)]}>
                    *
                </Animated.Text>
                <Animated.Text style={[style.field, cl(4)]}>
                    *
                </Animated.Text>
                <Animated.Text style={[style.field, cl(5)]}>
                    *
                </Animated.Text>
                <Animated.Text style={[style.field, cl(6)]}>
                    *
                </Animated.Text>
            </View>
        </View>
    )
}


const style = StyleSheet.create({
    field:{
        marginHorizontal: 10,
        fontSize:40,
    }
})

const mapStateToProps = (state) => ({
    currentpass: state.pass.passCode,
    newpass: state.pass.newCode,
    status: state.pass.old
  });
  
  export default connect(
    mapStateToProps
  )(PasscodeView);