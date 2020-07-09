import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {CertificateHistory, CertificateSummary} from '../components'

const Certificate = createStackNavigator();

const CertificateNavigator = () => {
    return(
        <Certificate.Navigator header={({scene, navigation})=> { console.warn("scene",scene.route.name); console.warn("navi",navigation); scene.route.name == 'History'?'none': 'screen'}} mode='modal'
            screenOptions={{
                // cardStyle: { backgroundColor: 'transparent'},
                cardOverlayEnabled: true,
            }} 
        >
            <Certificate.Screen name='History' component={CertificateHistory}/>
            <Certificate.Screen name='Summary' component= {CertificateSummary} />
        </Certificate.Navigator>
    )   
}

export default CertificateNavigator;