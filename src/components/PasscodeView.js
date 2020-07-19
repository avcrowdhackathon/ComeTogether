import React from 'react';
import { View, Text, StyleSheet} from 'react-native';

const PasscodeView = ({t1,t2, t3, t4, t5, t6}) => {
    const [field1, setField1] = React.useState(null);
    const [field2, setField2] = React.useState(false);
    const [field3, setField3] = React.useState(false);
    const [field4, setField4] = React.useState(false);
    const [field5, setField5] = React.useState(false);
    const [field6, setField6] = React.useState(false);

    React.useEffect(() => {

    }, [])

    return(
        <View style={{justifyContent:'center', alignItems:'center'}}>
            <View style={{flexDirection:'row'}}>
                <Text style={[style.field, `${field1?{color:'rgb(0,103,187)'}:{color:'rgba(0,103,187, 0.3)'}}`]}>
                    *
                </Text>
                <Text style={style.field}>
                    *
                </Text>
                <Text style={style.field}>
                    *
                </Text>
                <Text style={style.field}>
                    *
                </Text>
                <Text style={style.field}>
                    *
                </Text>
                <Text style={style.field}>
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