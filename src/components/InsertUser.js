import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native'
import CalendarComponent from "./CalendarComponent";
import { Api, JsonRpc } from 'eosjs-rn';
import { JsSignatureProvider } from 'eosjs-rn/dist/eosjs-jssig';

import sha256  from "./sha256";
const { TextEncoder, TextDecoder } = require('text-encoding');
const defaultPrivateKey = "5K6FsMBtaNEvbFMaJbqNruSoKWoe5vLcZA8QEX6br3BxQhQp6cK"; // bob
const signatureProvider = new JsSignatureProvider([defaultPrivateKey]);
const rpc = new JsonRpc('https://jungle2.cryptolions.io:443', { fetch });
const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });

class InsertUser extends Component {
  constructor(props) {
    super(props);
    this.oneYearExpiry = this.oneYearExpiry.bind(this);
    this.getData = this.getData.bind(this);

    this.state = {
      citizenId: '',
      testId: '',
      issueDate: '',
      expiryDate: '',
      isPending: false
    }
  }

  issue = async (dataParams) => {
    try {
      const result = await api.transact({
        actions: [{
          account: 'immunityproo',
          name: 'issue',
          authorization: [{
            actor: 'immunityproo',
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
      console.log( e)
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
      const b = this.state.citizenId.text.toString()
      const hashId = await sha256.hex(b)
        if(!this.state.isPending) {
          this.setState({isPending:true})
          const data = {
            test_id: this.state.testId.text,
            card_id_hash: hashId,
            immunity: true,
            sample_date: this.state.issueDate,
            expiry_date: this.state.expiryDate,
            tester_id: 1234
          };
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

        <Text style={styles.label}>Citizen Id</Text>
        <TextInput style = {styles.input}
                   underlineColorAndroid = "transparent"
                   placeholder = "Citizen Id"
                   placeholderTextColor = "grey"
                   autoCapitalize = "none"
        onChangeText={(text) => this.handleCitizenId({text})}/>

        <Text style={styles.label}>Test Id</Text>
        <TextInput style = {styles.input}
                   underlineColorAndroid = "transparent"
                   placeholder = "Test Id"
                   placeholderTextColor = "grey"
                   autoCapitalize = "none"
        onChangeText={(text) => this.handleTestId({text})}/>


        <Text style={styles.label}>Issue date</Text>
        <CalendarComponent typeOfDate='issueDate' maxDate={Date()} sendData={this.getData}/>


        <Text style={styles.label}>Expiry date</Text>
        <CalendarComponent typeOfDate='expiryDate'  sendData={this.getData} minDate={Date()}/>

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
  label: {
    marginLeft: 15,
    marginTop: 35,
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
