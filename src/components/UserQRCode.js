import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import QRCode from 'react-native-qrcode-svg';
import {Picker} from '@react-native-community/picker';
import { sha256 } from 'react-native-sha256';
import firestore from "@react-native-firebase/firestore";





const UserQRCode= ({navigation, qrValue}) => {
    const [value, HashValue] = React.useState(' ');
    const [testType, changeTestType] = React.useState(null);
    const Types = [
        {
            label: "Rapid RT-PCR",
            value: "Rapid RT-PCR",
        },
        {
            label: "RT-PCR",
            value: "RT-PCR",
        },
        {
            label: "Rapid Antibodies Test",
            value: "Rapid Antibodies Test",
        },
        {
            label: "Antibodies Test",
            value: "Antibodies Test",
        }
    ]


    React.useEffect(() => {
       testType && firestore()
        .collection("tests")
        .where("testType", "array-contains", testType)
        .orderBy("issueDate", "desc")
        .limit(1)
        .get()
        .then((doc) => {if(doc.exists){ console.warn("doccc", doc);  sha256(qrValue).then(async hash => { HashValue(hash)})} else console.warn("No doc");});
    }, [testType])

    return (
        <View style={{flexGrow:1, backgroundColor:'#efeff5'}}>
            <Text style={{fontSize: 22, textAlign: "center", marginTop:15}}>QR Code</Text>
            <View style={styles.typeDropdown}>
            <Picker
              selectedValue={testType}
              style={{height: 40}}
              itemStyle={{fontSize:16}}
              onValueChange={(itemValue) =>{
                if (itemValue !== 0) {
                  changeTestType(itemValue);
                }
              }
              }>
              <Picker.Item style={{color:'dimgrey'}} key={0} label='Please select...' value={"Select"} />

              {Types.map((type)=> {
                return <Picker.Item key={type.value} label={type.label} value={type.value} />
              })}
            </Picker>
          </View>
            <View style={{flex:1, borderRadius:10, alignItems:'center', marginTop:60}}>
                <QRCode
                    value= {value}
                    color='rgb(0,103,187)'
                    size= {200}
                    backgroundColor='#efeff5'
                />
            </View>
        </View>
    );
};


const mapStateToProps = (state, props) => ({
    qrValue: 'user123',
    navigation: props.navigation
})

export default connect(mapStateToProps)(UserQRCode)

const styles = StyleSheet.create({

    typeDropdown: {
      marginHorizontal:18,
      marginVertical:20,
      marginBottom: 2,
      backgroundColor:'white',
      borderRadius: 10
    }
})
  