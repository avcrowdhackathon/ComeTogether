import React from 'react';
import { View, Text, StyleSheet} from 'react-native';

const PasscodeView = ({t1,t2, t3, t4, t5, t6}) => {
    const [field1, setField1] = React.useState(null);
    const [field2, setField2] = React.useState(true);
    const [field3, setField3] = React.useState(false);
    const [field4, setField4] = React.useState(false);
    const [field5, setField5] = React.useState(false);
    const [field6, setField6] = React.useState(false);

    React.useEffect(() => {
        
    }, [t1,t2,t3,t4,t5,t6])
    const boxInterpolation =  animation.interpolate({
        inputRange: [0, 1],
        outputRange:["rgb(0,103,187)" , "rgba(0,103,187, 0.6)"]
    })
    const cl = (val) => {const foc= val?{color:boxInterpolation}:{color:'rgba(0,103,187, 0.6)'}; return(foc)}

    return(
        <View style={{justifyContent:'center', alignItems:'center'}}>
            <View style={{flexDirection:'row'}}>
                <Text style={[style.field, cl(field1) ]}>
                    *
                </Text>
                <Text style={[style.field, cl(field2)]}>
                    *
                </Text>
                <Text style={[style.field, cl(field3)]}>
                    *
                </Text>
                <Text style={[style.field, cl(field4)]}>
                    *
                </Text>
                <Text style={[style.field, cl(field5)]}>
                    *
                </Text>
                <Text style={[style.field, cl(field6)]}>
                    *
                </Text>
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

export default PasscodeView;