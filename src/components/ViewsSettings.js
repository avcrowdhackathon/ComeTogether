import React from 'react';
import {TouchableOpacity, TouchableHighlight, Text, TextInput, View, StyleSheet, ScrollView, Image} from 'react-native';
import { NumericPad, PasscodeView } from '../components';
import { useNavigation } from '@react-navigation/native';


export function PrivacyPolicy() {
    return (
       <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.texts}>Privacy Policy Text</Text>
       </ScrollView>
    );
 }
 export function TermsOfUse() {
    return (
       <View style={styles.container}>
          <Text style={styles.texts}>Terms of Use Text</Text>
       </View>
    );
 }
 export function ResetPassword() {
   const [password, setPassword] = React.useState('');
   const [textState, setTextState] = React.useState('old');
   const navigation = useNavigation();

   const backfunc = () => {
      navigation.goBack();
   }

   const resetPassword = async () => {
   
   }
    return (
       <View style={{flexGrow:1, flexDirection:'column', justifyContent:'space-evenly'}}>
         <TouchableOpacity style={{marginRight:18}} onPress={backfunc}>
               <Image style={{width:24, height:24}} source={require('../../images/back.png')} />
         </TouchableOpacity>
         <Text style={styles.texts}>{textState == 'old'? "Enter your existing passcode": textState == 'new'? "Create your new passcode":"Confirm your new passcode"}</Text>
         <PasscodeView />
         <NumericPad />
       </View>
    );
 }
 export function DeleteAccount() {
    const [password, setPassword] = React.useState('')
 
    const deleteAccount = async () => {
 
    }
    return (
       <View style={styles.container}>
          <Text>"Confirm with your passcode</Text>
          <TextInput
            autoCorrect={false}
            onChangeText={setPassword}
            value={password}
            style={styles.textInput}
            secureTextEntry={true}
          />
          <TouchableHighlight style={styles.confirmButton} title="Delete Account" onPress= {()=>{deleteAccount()}} >
             <Text style={styles.optionButtonText}>Delete Account</Text>
          </TouchableHighlight>
       </View>
    );
 }
 
 const styles = StyleSheet.create({
    container: {
       flex: 1, 
       alignItems: 'center', 
       justifyContent: 'center'
    },
    optionButton: {
       margin: 25,
       justifyContent:'center',
       alignItems: 'center',
       alignSelf: 'center',
       height:44,
       borderRadius:7,
       backgroundColor: '#FF652F',
       width:'70%',
       overflow:"hidden"
    },
    confirmButton: {
       margin: 25,
       justifyContent:'center',
       alignItems: 'center',
       alignSelf: 'center',
       height:44,
       borderRadius:7,
       backgroundColor: '#FF652F',
       width:'50%',
       overflow:"hidden"
    },
 
    optionButtonText: {
       fontSize: 20,
       color:'#FFFFFF',
       fontWeight: 'bold',
    },
    texts: {
       textAlign:'center',
       marginBottom: 20,
       fontWeight:'bold',
       fontSize: 18,
     },
    textInput: {
       height:40,
       width: '50%',
       alignSelf: 'center',
       paddingLeft: 6,
       borderWidth: 2,
       borderRadius: 8,
       borderColor: 'grey',
       backgroundColor: 'rgba(243, 241, 239, 0.8)'
 
     },
 })