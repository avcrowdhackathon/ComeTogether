import React from 'react';
import {TouchableHighlight, Text} from 'react-native';
import {AuthContext} from '../../App';

export default function Logout() {
    const { signOut } = React.useContext(AuthContext);

     React.useEffect(() => {
       signOut()
     }, [])

    return (
      null
     );
   }