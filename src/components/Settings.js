import React from 'react';
import {TouchableOpacity, Text, View, StyleSheet} from 'react-native';
import {AuthContext} from '../../App';


export default function Settings({navigation}) {
   const { signOut } = React.useContext(AuthContext);
   return (
      <View style={styles.container}>
         <TouchableOpacity style = {styles.optionButton} >
            <Text style = {styles.optionButtonText}> Privacy Policy </Text>
         </TouchableOpacity>
         <TouchableOpacity style = {styles.optionButton} >
            <Text style = {styles.optionButtonText}> Terms of Use </Text>
         </TouchableOpacity>
         <TouchableOpacity style = {styles.optionButton} >
            <Text style = {styles.optionButtonText}> Reset Password </Text>
         </TouchableOpacity>
         <TouchableOpacity style = {styles.optionButton} >
            <Text style = {styles.optionButtonText}> Delete Account </Text>
         </TouchableOpacity>
         <TouchableOpacity style = {styles.optionButton} onPress={async ()=> {await signOut()}}>
            <Text style = {styles.optionButtonText}> Logout </Text>
         </TouchableOpacity>
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
   optionButtonText: {
      fontSize: 20,
      color:'#FFFFFF',
      fontWeight: 'bold',
   },
})