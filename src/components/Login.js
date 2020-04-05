import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TextInput,
  Image,
  TouchableHighlight
} from 'react-native';
import { AuthContext } from "../../App";


export default function Login ({navigation}) {    
  const { signIn } = React.useContext(AuthContext);

  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')

  return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require('../../images/comeTogetherBlack.png')} resizeMode='contain'/>
        <Text style={styles.header}> Login</Text>
        
        <View style={styles.root}>
          <View style={styles.rowContainer}>
            <Text style={styles.text}>Username</Text>
            <TextInput
              autoCorrect={false}
              onChangeText={setUsername}
              value={username}
              style={styles.textInput}
            />
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.text}>Password</Text>
            <TextInput
              autoCorrect={false}
              onChangeText={setPassword}
              value={password}
              style={styles.textInput}
              secureTextEntry={true}
            />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableHighlight style={styles.scan} title="Login" onPress= {()=>{signIn()}} >
            <Text style={styles.button}>Login</Text>
          </TouchableHighlight>
        </View>
        
      </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor: '#F5FCFF',
      justifyContent:"space-around",
      paddingHorizontal:20,
      overflow: "hidden"
    },
    button:{
      fontSize: 20,
      color:'#FFFFFF',
      fontWeight: 'bold',
      paddingHorizontal:20,
    },
    scan: {
      justifyContent:'center',
      alignItems: 'center',
      height:44,
      borderRadius:7,
      backgroundColor: '#FF652F',
      marginBottom:100
    },
    logo: {
      flex:1,
      height: undefined,
      width: undefined
    },
    header: {
      flex:0.5,
      textAlign: 'center',
      fontSize: 25,
      fontWeight: 'bold'
    },
    root: {
      flex: 1,
      flexDirection: "column",
    },
    rowContainer: {
      flex: 1, 
      flexDirection: "row",
      alignItems: "center"
    },
    buttonContainer: {
      width: '100%',
      flex: 2, 
      flexDirection: "column",
      alignItems: "center",
    },
    text: {
      flex: 1
    },
    textInput: {
      flex: 2,
      paddingLeft: 6,
      borderWidth: 2,
      borderRadius: 8,
      borderColor: 'grey',
      backgroundColor: 'rgba(243, 241, 239, 0.8)',
    }
  });