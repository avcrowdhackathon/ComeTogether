import {
  ScrollView,
  StyleSheet, Text, TouchableOpacity,
  View
} from 'react-native';
import React, { Component } from 'react'

class VerifyOptions extends Component {
  constructor(props) {

    super(props);

    this.state = {
      verifyType: ''
    };
  }

  openIdVerification() {
    this.props.navigation.navigate('VerifyById');
  }


  openQRVerification() {
    this.props.navigation.navigate('VerifyByQR');
  }

  render() {
    return (
      <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Verify options</Text>
          <TouchableOpacity
            style = {styles.idVerificationButton}
            onPress = {
              () => this.openIdVerification()
            }>
            <Text style = {styles.idVerificationButtonText}> Id verification </Text>
          </TouchableOpacity>
        <TouchableOpacity
          style = {styles.qrCodeVerificationButton}
          onPress = {
            () => this.openQRVerification()
          }>
          <Text style = {styles.qrCodeVerificationButtonText}> QR code verification </Text>
        </TouchableOpacity>
      </ScrollView>
      </View>
    );
  }
}
export default VerifyOptions


const styles = StyleSheet.create({
  container: {
    paddingTop:20,
    backgroundColor:'#efeff5'
  },
  preview: {
    height:200,
    flex: 1,
    alignItems: 'center',
    width: '100%',
    overflow: "hidden",
    justifyContent: 'flex-end'
  },
  title: {
    fontSize: 22,
    margin: 'auto',
    textAlign: 'center',
    marginBottom:100
  },
  idVerificationButton: {
    backgroundColor: 'rgb(0,103,187)',
    borderRadius: 10,
    height:44,
    justifyContent:'center',
    color: 'white',
    marginHorizontal:30,
    marginBottom:40
  },
  idVerificationButtonText: {
    color: 'white',
    margin:'auto',
    textAlign:'center',
    alignItems: 'center'
  },
  qrCodeVerificationButton: {
    backgroundColor: 'rgb(0,103,187)',
    borderRadius: 10,
    height:44,
    justifyContent:'center',
    color: 'white',
    marginHorizontal:30
  },
  qrCodeVerificationButtonText: {
    color: 'white',
    margin:'auto',
    textAlign:'center',
    alignItems: 'center'
  },
  idIcon: {
    alignItems: 'center'
  }
});
