import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native'
import CalendarComponent from "./CalendarComponent";

// const { Api, JsonRpc } = require('eosjs');
// const fetch = require('node-fetch');
// const { TextDecoder, TextEncoder } = require('util');
// const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig')

// const signatureProvider = new JsSignatureProvider([process.env.PRIVATE_KEY]);
// const rpc = new JsonRpc(process.env.ENDPOINT_URL, { fetch });
// const api = new Api({ rpc,signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });

class InsertUser extends Component {
  constructor(props) {
    super(props);
    this.oneYearExpiry = this.oneYearExpiry.bind(this);
    this.getData = this.getData.bind(this);

    this.state = {
      citizenId: '',
      testId: '',
      issueDate: {},
      expiryDate: {}
    }
  }


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


  issueCertificate = () => {
    alert('call blockchain here:... ' )
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
        <CalendarComponent typeOfDate='expiryDate' maxDate={this.oneYearExpiry()}  sendData={this.getData}/>

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
  async getData(val){
    await this.setState({[val.typeOfDate]: val.date})
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
