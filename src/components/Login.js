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
  const [errors, setErrors] = React.useState({ email: "", password: "" });

  function validation() {
    const email_trimmed = email.toLowerCase().trim();
    setErrors({ email: "", password: "" });

    if (email_trimmed == "") {
      setErrors((prevState) => ({
        ...prevState,
        email: "Email cannot be empty.",
      }));
      return true;
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,8}$/i.test(email_trimmed)
    ) {
      setErrors((prevState) => ({
        ...prevState,
        email: "Email format is not valid.",
      }));
      return true;
    } else if (password == "") {
      setErrors((prevState) => ({
        ...prevState,
        password: "Password cannot be empty",
      }));
      return true;
    } else {
      return false;
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
            placeholder='Email'
          />
          {errors.email !== "" && (
            <View style={{ width: "100%" }}>
              <Text style={styles.errorMessage}>{errors.email}</Text>
            </View>
          )}
          <TextInput
            autoCorrect={false}
            onChangeText={setPassword}
            value={password}
            style={styles.textInput}
            secureTextEntry={true}
            placeholder='Password'
          />
          {errors.password !== "" && (
            <View style={{ width: "100%" }}>
              <Text style={styles.errorMessage}>{errors.password}</Text>
            </View>
          )}
          <TouchableHighlight
            title="resetPass"
            style={styles.goToEmail}
            onPress={() => {
              navigation.navigate("Login_reset_password");
            }}
          >
            <Text style={styles.labelEmail}>
              Reset your password
            </Text>
          </TouchableHighlight>
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
          onPress={() => {
            const validate = validation();
            if (validate) return;
            signIn(email, password, setErrors);
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
    backgroundColor: "#EFEFF5",
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
    color: "#rgb(0, 103, 187)",
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
    backgroundColor: "#rgb(0, 103, 187)",
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
  errorMessage: {
    fontSize: 12,
    color: "red",
    textAlign: "left",
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
