import React from 'react';
import {View} from 'react-native';
import { QRCode } from 'react-native-custom-qr-codes';
import {connect} from 'react-redux'; 
import { sha256 } from 'react-native-sha256';



const UserQRCode= ({navigation,qrValue}) => {
    const [value, HashVaule] = React.useState(null)
    React.useEffect(() => {
        sha256(qrValue).then(async hash => { HashVaule(hash)})
    }
    )
    return (
        <View style={{flex:1, paddingTop:80, alignItems:'center', backgroundColor:'white'}}>
            <QRCode 
                value={value}
            />
        </View>
    );
};


const mapStateToProps = (state, props) => ({
    // qrValue: state.auth.userToken.id_licence,
    qrValue: 'user123',
    navigation: props.navigation
})

export default connect(mapStateToProps)(UserQRCode)