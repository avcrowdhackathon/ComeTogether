import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableHighlight
} from 'react-native';
import { AuthContext } from "../../App";


export default function Login ({navigation}) {    
  const { signIn } = React.useContext(AuthContext);

  return (
      <View style={styles.container}>
          <Text>Login</Text>
          <TouchableHighlight style={styles.scan} title="Login" onPress= {()=>{signIn()}} >
                    <Text style={styles.button}>Next</Text>
            </TouchableHighlight>
      </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor: '#F5FCFF',
      justifyContent:"space-around",
      paddingHorizontal:20
    },
    button:{
      fontSize: 20,
      color:'#FFFFFF',
      fontWeight: 'bold',
    },
    scan: {
      justifyContent:'center',
      alignItems: 'center',
      height:44,
      borderRadius:7,
      backgroundColor: '#FF652F',
      marginBottom:100
  
    },
  });