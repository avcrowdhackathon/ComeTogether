import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native'
import CalendarComponent from "./CalendarComponent";
import { Api, JsonRpc } from 'eosjs-rn';
import { JsSignatureProvider } from 'eosjs-rn/dist/eosjs-jssig';
import {Picker} from '@react-native-community/picker';
import { Types } from '../data'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import sha256  from "./sha256";

const { TextEncoder, TextDecoder } = require('text-encoding');
const defaultPrivateKey = "5K6FsMBtaNEvbFMaJbqNruSoKWoe5vLcZA8QEX6br3BxQhQp6cK"; // bob
const signatureProvider = new JsSignatureProvider([defaultPrivateKey]);
const rpc = new JsonRpc('https://jungle2.cryptolions.io:443', { fetch });
const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });


var radio_props = [
  {label: 'positive', value: 1 },
  {label: 'negative', value: 0 }
];

class InsertUser extends Component {
  constructor(props) {
    super(props);
    this.oneYearExpiry = this.oneYearExpiry.bind(this);
    this.getData = this.getData.bind(this);

    this.state = {
      citizenId: '',
      testId: '',
      type: '',
      issueDate: '',
      checkBoxes: [],
      isPending: false
    }
  }

  issue = async (dataParams) => {
    try {
      const result = await api.transact({
        actions: [{
          account: 'covidcontrac',
          name: 'issue',
          authorization: [{
            actor: 'covidcontrac',
            permission: 'active',
          }],
          data: dataParams,
        }]
      }, {
        blocksBehind: 3,
        expireSeconds: 30,
      });
      alert('Certificate Successfully issued')
    }catch (e) {
      alert('Certificate was NOT issued')
      console.log(e)
    }
    await this.setState({isPending:false})
  };

  oneYearExpiry() {
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDate();
    var newdate = new Date(year + 1, month, day).toISOString().slice(0,10);
    return newdate
  }

  handleCitizenId = (text) => {
    this.setState({ citizenId: text })
  }
  handleTestId = (text) => {
    this.setState({ testId: text })
  }


issueCertificate = async () => {
    try{
      let data;

      const b = this.state.citizenId.text.toString()
      const hashId = await sha256.hex(b)


      if(this.state.type === 'type1'){
        data = {
          card_id_hash: hashId,
          tests:  [{
            test_id: this.state.testId.text,
            test_type: 'RT_PCR',
            result: this.state.checkBoxes[0].value === 1 ? true : false,
            sample_date: this.state.issueDate,
            issuer: 'covidcontrac'}]
        };
      }else if(this.state.type === 'type2'){
        data = {
          card_id_hash: hashId,
          tests:  [{
            test_id: this.state.testId.text,
            test_type: 'Antibodies',
            result: this.state.checkBoxes[0].value === 1 ? true : false,
            sample_date: this.state.issueDate,
            issuer: 'covidcontrac'}]
        };
      }else if(this.state.type === 'type3'){
         data = {
          card_id_hash: hashId,
          tests:  [
            {test_id: this.state.testId.text,
            test_type: 'RT_PCR',
            result: this.state.checkBoxes[0].value === 1 ? true : false,
            sample_date: this.state.issueDate,
            issuer: 'covidcontrac'},
            {test_id: this.state.testId.text,
            test_type: 'Antibodies',
            result: this.state.checkBoxes[0].value === 1 ? true : false,
            sample_date: this.state.issueDate,
            issuer: 'covidcontrac'}]
      }
    }
    

      if(!this.state.isPending) {
        this.setState({isPending:true})
        this.issue(data) 
      }
    } catch (e) {
      alert('Certificate was not issued!' + e)
      await this.setState({isPending:false})
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <ScrollView>
          <Text style={styles.title}>Issue Certificate</Text>

        <Text style={styles.label}>Citizen ID</Text>
        <TextInput style = {styles.input}
                   underlineColorAndroid = "transparent"
                   placeholder = "Citizen Id"
                   placeholderTextColor = "grey"
                   autoCapitalize = "none"
        onChangeText={(text) => this.handleCitizenId({text})}/>

        <Text style={styles.label}>Test ID</Text>
        <TextInput style = {styles.input}
                   underlineColorAndroid = "transparent"
                   placeholder = "Test Id"
                   placeholderTextColor = "grey"
                   autoCapitalize = "none"
        onChangeText={(text) => this.handleTestId({text})}/>

        <Text style={styles.label}>Test Type</Text>
        <View style={styles.typeDropdown}>
          <Picker
            selectedValue={this.state.type}
            style={{height: 40}}
            onValueChange={(itemValue) =>{
              if (itemValue !== 0) {
                this.setState({type: itemValue})
                let checkBoxes = [];
                Types.forEach((type)=> {
                  if(type.value === itemValue) checkBoxes= type.checkBoxes;
                })
                this.setState({checkBoxes: checkBoxes})
              }
            }
            }>
              <Picker.Item key={0} label='Please select...' value={0} />

              {Types.map((type)=> {
                return <Picker.Item key={type.value} label={type.label} value={type.value} />
              })}
          </Picker>
        </View>

        {this.state.checkBoxes.map((checkBox,index)=>{
          return(
            <View style={styles.typeCheckbox}>
              <Text key={checkBox.label} style={styles.radioBtnLabel}>{checkBox.label}</Text>
              <RadioForm
                radio_props={radio_props}
                initial={checkBox.value}
                formHorizontal={true}
                labelHorizontal={false}
                buttonColor={'#2196f3'}
                animation={true}
                onPress={(value) => {
                  let checkBoxes = this.state.checkBoxes;
                  checkBoxes[index].value = value
                  this.setState({checkBoxes:checkBoxes})
                }}
              />  
            </View>
            
          )
        })}

        <Text style={styles.label}>Issuance Date</Text>
        <CalendarComponent typeOfDate='issueDate' maxDate={Date()} sendData={this.getData}/>

        <TouchableOpacity
          style = {styles.submitButton}
          onPress = {
            () => this.issueCertificate()
          }>
          <Text style = {styles.submitButtonText}> Submit </Text>
        </TouchableOpacity>
        </ScrollView>
      </View>
    )
  }
   getData(val){
    try {
      this.setState({[val.typeOfDate]: val.date})

    }catch (e) {

    }
  }
}
export default InsertUser

const styles = StyleSheet.create({
  container: {
    paddingTop: 23
  },
  title:{
    fontSize: 28,
    textAlign: "center",
    marginTop:15
  },
  input: {
    margin: 15,
    marginTop: 2,
    height: 40,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    borderRadius: 5
  },
  typeDropdown: {
    marginLeft: 15,
    marginBottom: 2,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    borderRadius: 5
  },
  typeCheckbox: {
    marginLeft: 35,
  },
  label: {
    marginLeft: 15,
    marginTop: 35,
    fontSize: 18
  },
  radioBtnLabel: {
    marginTop: 5,
    fontSize: 18
  },
  submitButton: {
    backgroundColor: 'blue',
    padding: 10,
    margin: 15,
    height: 40,
    borderRadius: 5,
    display: 'flex',
    alignSelf:'center',
    width: 200
  },
  submitButtonText:{
    color: 'white',
    margin:'auto',
    textAlign:'center',

  }
})
