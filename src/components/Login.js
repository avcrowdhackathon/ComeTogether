import React from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TextInput,
  Image,
  TouchableHighlight,
} from "react-native";
import { AuthContext } from "../../App";

export default function Login({ navigation }) {
  const { signIn } = React.useContext(AuthContext);

  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");

  function validation() {
    const email_trimmed = email.toLowerCase().trim();
    if (email_trimmed == "") {
      return true;
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,8}$/i.test(email_trimmed)
    ) {
      return true;
    } else if (password == "") {
      return true;
    }
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../../images/BT_logoWithName.png")}
        resizeMode="contain"
      />
      <Text style={styles.header}> Login</Text>

      <View style={styles.root}>
        <View style={styles.rowContainer}>
          <TextInput
            autoCorrect={true}
            onChangeText={setEmail}
            value={email}
            style={styles.textInput}
            secureTextEntry={false}
          />

          <TextInput
            autoCorrect={false}
            onChangeText={setPassword}
            value={password}
            style={styles.textInput}
            secureTextEntry={true}
          />
          <TouchableHighlight
            title="goToEmail"
            style={styles.goToEmail}
            onPress={() => {
              navigation.navigate("SendEmail");
            }}
          >
            <Text style={styles.labelEmail}>
              Don't have an account? Register now!
            </Text>
          </TouchableHighlight>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableHighlight
          style={styles.scan}
          title="Login"
          disabled={validation()}
          onPress={() => {
            signIn(email, password);
          }}
        >
          <Text style={styles.button}>Login</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
    justifyContent: "space-around",
    paddingHorizontal: 20,
    overflow: "hidden",
  },
  button: {
    fontSize: 20,
    color: "#FFFFFF",
    fontWeight: "bold",
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 15,
    fontWeight: "bold",
  },
  labelEmail: {
    fontSize: 12,
    color: "#FF652F",
    textAlign: "right",
  },
  goToEmail: {
    width: "100%",
  },
  scan: {
    justifyContent: "center",
    alignItems: "center",
    height: 44,
    borderRadius: 7,
    backgroundColor: "#FF652F",
    marginBottom: 100,
  },
  logo: {
    flex: 0.5,
    marginBottom: 25,
    marginTop: 15,
    height: undefined,
    width: undefined,
  },
  header: {
    flex: 0.3,
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
  },
  root: {
    flex: 1,
    flexDirection: "column",
  },
  rowContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  text: {
    flex: 1,
  },
  textInput: {
    width: "100%",
    marginTop: 10,
    paddingLeft: 6,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: "grey",
    backgroundColor: "rgba(243, 241, 239, 0.8)",
  },
});
