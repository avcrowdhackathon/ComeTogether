import React from 'react';
import {View, Image, Text} from 'react-native';
import {B} from '../components';

const CertificateSummary = ({id, navigation}) => {
    console.warn(id)
    var kappa = {
        name: 'Stavros Antoniadis',
        authority: 'BackTogether',
        type: 'Rapid Test',
        date: '1-2-1023',
        result: true
    };
    React.useEffect(()=>{
        
    })
    return(
<>
        <View style={{flex:1, textAlign:'center', fontSize:20}}>
            <Text style={{fontSize:20, textAlign:'center'}}>
                E-Certificate {"\n"}
                {kappa.name}
            </Text>
        </View>
          <Text style={{backgroundColor:'red', flex:1, flexDirection:'row', justifyContent:'space-around'}}>
            <B>Authority:</B> {kappa.authority}
          </Text>
          <View style={{flex:1, flexDirection:'row', justifyContent:'flex-start', backgroundColor:'green'}}>
          <Text>
            <B>Test Type: </B>
          </Text>
          <Text>
            {kappa.type}
          </Text>
          </View>
          <Text>
            <B>Date:</B> {kappa.date}
          </Text>
          <Text>
            <B>Result:</B> {kappa.result?'Positive':'Negative'}
          </Text>
        </>
    )
}

export default CertificateSummary;