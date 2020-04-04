import React from 'react';
import {TouchableHighlight, Text} from 'react-native';
import {AuthContext} from '../../App';

export default function Logout() {
    const { signOut } = React.useContext(AuthContext);
     return (
       <TouchableHighlight style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}} title="Logout" onPress={()=> {signOut()}}>
          <Text style={{color:'white', paddingHorizontal:8}}>Logout</Text>
       </TouchableHighlight>
     );
   }