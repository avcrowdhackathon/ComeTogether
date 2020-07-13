import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native'
import CalendarComponent from "./CalendarComponent";
import { Api, JsonRpc } from 'eosjs-rn';
import { JsSignatureProvider } from 'eosjs-rn/dist/eosjs-jssig';
import {Picker} from '@react-native-community/picker';
import { Types } from '../data'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import moment from "moment";
const { TextEncoder, TextDecoder } = require('text-encoding');
const defaultPrivateKey = "5K6FsMBtaNEvbFMaJbqNruSoKWoe5vLcZA8QEX6br3BxQhQp6cK"; // bob
const signatureProvider = new JsSignatureProvider([defaultPrivateKey]);
const rpc = new JsonRpc('https://jungle2.cryptolions.io:443', { fetch });
const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });

var radio_props = [
  {label: 'positive', value: 1 },
  {label: 'negative', value: 0 }
];

import firestore from "@react-native-firebase/firestore";


class InsertUser extends Component {
  constructor(props) {
    super(props);
    this.oneYearExpiry = this.oneYearExpiry.bind(this);
    this.getData = this.getData.bind(this);

    this.state = {
      doctorEmail: '',
      patientEmail: '',
      testId: '',
      testType: '',
      issueDate: moment( new Date()).format('YYYY-MM-DD'),
      checkBoxes: [],
      isPending: false,
      authority: '',
      expireDate: '',
    }
  }

  issue = async (dataParams) => {
    try {
      if (dataParams && dataParams.tests && dataParams.tests.length) {
        firestore()
          .collection("tests")
          .where('email', '==', this.state.patientEmail)
          .get()
          .then((res) => {
            if (res.docs.length !== 0) {
              firestore()
                .collection("tests")
                .doc(res.docs[0].ref.id)
                .update({ tests:  [...res.docs[0].data().tests, ...dataParams.tests]})
            .then(() => {
              alert('Updated data successfully')
            })
            } else {
              firestore()
                .collection("tests")
                .add({ email: this.state.patientEmail, tests: [...dataParams.tests]})
                .then(() => {
                  alert('Inserted data successfully')
                })
            }
          });
      }else {
        alert('Please fill all the test information')
      }
    } catch (e) {
      alert('Certificate was not issued!' + e)
      await this.setState({isPending:false})
    }
  };

  oneYearExpiry() {
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDate();
    var newdate = new Date(year + 1, month, day).toISOString().slice(0,10);
    return newdate
  }

  handleDoctorEmail = (text) => {
    this.setState({ doctorEmail: text })
  }
  handleAuthority = (text) => {
    this.setState({ authority: text })
  }
  handlePatientEmail = (text) => {
    this.setState({ patientEmail: text })
  }
  handleTestId = (text) => {
    this.setState({ testId: text })
  }


  issueCertificate = async () => {
    try{
      let data;

      if(this.state.testType === 'type1'){
        data = {
          patientEmail: this.state.patientEmail,
          tests:  [{
            testId: this.state.testId,
            testType: 'RT_PCR',
            result: this.state.checkBoxes[0].value === 1,
            issueDate: this.state.issueDate,
            expireDate: this.state.expireDate,
            issuer: this.state.doctorEmail,
            authority: this.state.authority
          }]
        };
      }else if(this.state.type === 'type2'){
        data = {
          patientEmail: this.state.patientEmail,
          tests:  [{
            testId: this.state.testId,
            testType: 'Antibodies',
            result: this.state.checkBoxes[0].value === 1,
            issueDate: this.state.issueDate,
            expireDate: this.state.expireDate,
            issuer: this.state.doctorEmail,
            authority: this.state.authority
          }]
        };
      }else if(this.state.type === 'type3'){
        data = {
          patientEmail: this.state.patientEmail,
          tests:  [
            {
              testId: this.state.testId,
              testType: 'RT_PCR',
              result: this.state.checkBoxes[0].value === 1,
              issueDate: this.state.issueDate,
              expireDate: this.state.expireDate,
              issuer: this.state.doctorEmail,
              authority: this.state.authority
            },
            {
              testId: this.state.testId,
              testType: 'Antibodies',
              result: this.state.checkBoxes[0].value === 1,
              issueDate: this.state.issueDate,
              expireDate: this.state.expireDate,
              issuer: this.state.doctorEmail,
              authority: this.state.authority
            }]
        }
      }

      if(!this.state.isPending) {
        this.setState({isPending: true})
        await this.issue(data)
      }
    } catch (e) {
      alert('Certificate was not issued!' + e)
      await this.setState({isPending: false})
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <ScrollView>
          <Text style={styles.title}>Issue Certificate</Text>

          <Text style={styles.label}>Issuing Authority</Text>
          <TextInput style = {styles.input}
                     underlineColorAndroid = "transparent"
                     placeholder = "e.g. Euromedica"
                     placeholderTextColor = "grey"
                     autoCapitalize = "none"
                     onChangeText={(text) => this.handleAuthority(text)}/>

          <Text style={styles.label}>Doctor email</Text>
          <TextInput style = {styles.input}
                     underlineColorAndroid = "transparent"
                     placeholder = "e.g. doctor@gmail.com"
                     placeholderTextColor = "grey"
                     autoCapitalize = "none"
                     onChangeText={(text) => this.handleDoctorEmail(text)}/>

          <Text style={styles.label}>Patient email</Text>
          <TextInput style = {styles.input}
                     underlineColorAndroid = "transparent"
                     placeholder = "e.g. patient@gmail.com"
                     placeholderTextColor = "grey"
                     autoCapitalize = "none"
                     onChangeText={(text) => this.handlePatientEmail(text)}/>


          <Text style={styles.label}>Test ID</Text>
          <TextInput style = {styles.input}
                     underlineColorAndroid = "transparent"
                     placeholder = "e.g. 1234"
                     placeholderTextColor = "grey"
                     autoCapitalize = "none"
                     onChangeText={(text) => this.handleTestId(text)}/>

          <Text style={styles.label}>Test Type</Text>
          <View style={styles.typeDropdown}>
            <Picker
              selectedValue={this.state.testType}
              style={{height: 40}}
              onValueChange={(itemValue) =>{
                if (itemValue !== 0) {
                  this.setState({testType: itemValue})
                  let checkBoxes = [];
                  Types.forEach((testType)=> {
                    if(testType.value === itemValue) checkBoxes= testType.checkBoxes;
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
          <CalendarComponent typeOfDate='issueDate' maxDate={new Date()} current={new Date()} sendData={this.getData}/>
          <Text style={styles.label}>Expiry Date (optional)</Text>
          <CalendarComponent typeOfDate='expireDate' minDate={new Date()} sendData={this.getData}/>

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
