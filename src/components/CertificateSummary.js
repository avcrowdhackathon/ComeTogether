import React from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {B} from '../components';

const CertificateSummary = ({route, navigation}) => {
 
  const {id, authority, issueDate, testType, result} = route.params;
    React.useEffect(()=>{
       
    })

    const backfunc = () => {
      navigation.goBack();
    }

    return(
      <>
        <View style={{justifyContent:'center', alignItems:'center', fontSize:20, paddingVertical:8, backgroundColor:'white'}}>
            <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center', alignSelf:'stretch'}}>
              <TouchableOpacity style={{position:'absolute', left:8}} onPress={backfunc}>
                <Image style={{width:24, height:24}} source={require('../../images/back.png')} />
              </TouchableOpacity>
              <Text style={{fontSize:20, textAlign:'center'}}>
                  <B>E-Certificate</B> 
              </Text>
            </View>
            <Image style={{width:48, height:70, marginVertical:6}} source={require('../../images/summary.png')}  />
            <Text style={{fontSize:28, textAlign:'center'}}>
              <B>Stavros Antoniadis</B>
            </Text>
        </View>
        <View style={{ flex: 1, flexDirection:'row', paddingTop:40, backgroundColor:'white' }}>
          <View style={page.infos_view}>
            <Text style={page.infos}>
              <B>Authority:</B>             
            </Text>
            <Text style={page.infos}>
              <B>Test Type: </B>
            </Text>
            <Text style={page.infos}>
              <B>Date:</B> 
            </Text>
            <Text style={page.infos}>
              <B>Result:</B> 
            </Text>
          </View>
          <View style={page.infos_view}>
            <Text style={page.infos}>
              {authority}
            </Text>
            <Text style={page.infos}>
              {testType}
            </Text>
            <Text style={page.infos}>
              {issueDate}
            </Text>
            <Text style={page.infos}>
              {result?'Positive':'Negative'}
            </Text>
          </View>
        </View>
      </>
    )
}

const page = StyleSheet.create({
  infos_view: {
    flex: 1,
    flexDirection: 'column',
  },
  infos: {
    flexDirection:'row',
    fontSize: 18,
    marginVertical: 5,
    marginLeft:50
  }
})

export default CertificateSummary;