import React from 'react';
import {TouchableOpacity, TouchableHighlight, Text, TextInput, View, StyleSheet} from 'react-native';
import {AuthContext} from '../../App';


export default function Settings({navigation}) {
   const { signOut } = React.useContext(AuthContext);
   return (
      <View style={styles.container}>
         <TouchableOpacity style = {styles.optionButton} onPress={() => navigation.navigate('PrivacyPolicy')} >
            <Text style = {styles.optionButtonText}> Privacy Policy </Text>
         </TouchableOpacity>
         <TouchableOpacity style = {styles.optionButton} onPress={() => navigation.navigate('TermsOfUse')}>
            <Text style = {styles.optionButtonText}> Terms of Use </Text>
         </TouchableOpacity>
         <TouchableOpacity style = {styles.optionButton} onPress={() => navigation.navigate('ResetPassword')}>
            <Text style = {styles.optionButtonText}> Reset Password </Text>
         </TouchableOpacity>
         <TouchableOpacity style = {styles.optionButton} onPress={() => navigation.navigate('DeleteAccount')}>
            <Text style = {styles.optionButtonText}> Delete Account </Text>
         </TouchableOpacity>
         <TouchableOpacity style = {styles.optionButton} onPress={async ()=> {await signOut()}}>
            <Text style = {styles.optionButtonText}> Logout </Text>
         </TouchableOpacity>
      </View>
   );
}

export function PrivacyPolicy() {
   return (
      <View style={styles.container}>
         <Text style={styles.texts}>Privacy Policy Text</Text>
      </View>
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
   const [password, setPassword] = React.useState('')

   const resetPassword = async () => {

   }
   return (
      <View style={styles.container}>
         <Text style={styles.texts}>Type your current password to confirm</Text>
         <TextInput
           autoCorrect={false}
           onChangeText={setPassword}
           value={password}
           style={styles.textInput}
           secureTextEntry={true}
         />
         <TouchableHighlight style={styles.confirmButton} title="Reset Password" onPress= {()=>{resetPassword()}} >
            <Text style={styles.optionButtonText}>Reset Password</Text>
         </TouchableHighlight>
         
      </View>
   );
}
export function DeleteAccount() {
   const [password, setPassword] = React.useState('')

   const deleteAccount = async () => {

   }
   return (
      <View style={styles.container}>
         <Text style={styles.texts}>Type your current password to confirm</Text>
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
      marginBottom: 20,
      fontSize: 18,
      textAlign: 'center',
      width: '50%',
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