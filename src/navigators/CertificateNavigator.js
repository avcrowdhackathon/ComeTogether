import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {CertificateHistory, CertificateSummary} from '../components'

const Certificate = createStackNavigator();

const CertificateNavigator = () => {
    return(
        <Certificate.Navigator 
            headerMode='none' 
            mode='modal'
            screenOptions={{
                // cardStyle: { backgroundColor: 'transparent'},
                cardOverlayEnabled: true,
            }} 
        >
            <Certificate.Screen name='History' component={CertificateHistory}
             options={{header : ({ scene, previous, navigation }) => ( null)}}/>
            <Certificate.Screen name='Summary' component= {CertificateSummary} 
             options={{}}/>
        </Certificate.Navigator>
    )   
}

export default CertificateNavigator;