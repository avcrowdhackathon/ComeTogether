import React from "react";
import { TouchableHighlight, Text } from "react-native";
import { AuthContext } from "../../App";
import auth from "@react-native-firebase/auth";

export default function Logout() {
  const { signOut } = React.useContext(AuthContext);

  React.useEffect(() => {
    auth().signOut();
    signOut();
  }, []);

  return null;
}
