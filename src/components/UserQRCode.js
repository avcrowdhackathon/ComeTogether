import React from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import QRCode from 'react-native-qrcode-svg';
import { sha256 } from 'react-native-sha256';



const UserQRCode= ({navigation, qrValue}) => {
    const [value, HashVaule] = React.useState(null)
    React.useEffect(() => {
        sha256(qrValue).then(async hash => { HashVaule(hash)})
    }
    )
    
    return (
        <View style={{flexGrow:1, backgroundColor:'#efeff5'}}>
            <Text style={{fontSize: 22, textAlign: "center", marginTop:15, marginBottom:100}}>Qr Code</Text>
            <View style={{flex:1, borderRadius:10, alignItems:'center'}}>
                <QRCode
                    value= 'kappa'
                    color='rgb(0,103,187)'
                    size= {200}
                    backgroundColor='#efeff5'
                />
            </View>
        </View>
    );
};


const mapStateToProps = (state, props) => ({
    // qrValue: state.auth.userToken.id_licence,
    qrValue: 'user123',
    navigation: props.navigation
})

export default connect(mapStateToProps)(UserQRCode)