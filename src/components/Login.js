import React from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import { AuthContext } from "../../App";

export default function Login({ navigation }) {
  const { signIn } = React.useContext(AuthContext);

  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [errors, setErrors] = React.useState({ email: "", password: "" });
  const [wait, setWait] = React.useState(false)

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

  if (wait) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" color="rgb(0, 103, 187)" />
      </View>
    );
  } else
    return (
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require("../../images/BT_logoWithName.png")}
          resizeMode="contain"
        />
        <Text style={styles.header}> Login</Text>
          <View style={styles.rowContainer}>
            <TextInput
              autoCorrect={true}
              onChangeText={setEmail}
              value={email}
              style={styles.textInput}
              secureTextEntry={false}
              placeholder="Email"
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
              placeholder="Password"
            />
            {errors.password !== "" && (
              <View style={{ width: "100%" }}>
                <Text style={styles.errorMessage}>{errors.password}</Text>
              </View>
            )}
            <TouchableOpacity
              title="resetPass"
              style={styles.goToEmail}
              onPress={() => {
                navigation.navigate("Login_reset_password");
              }}
            >
              <Text style={styles.labelEmail}>Reset your password</Text>
            </TouchableOpacity>
            <TouchableOpacity
              title="goToEmail"
              style={styles.goToEmail}
              onPress={() => {
                navigation.navigate("SendEmail");
              }}
            >
              <Text style={styles.labelEmail}>
                Don't have an account? Register now!
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.scan}
            title="Login"
            onPress={() => {
              const validate = validation();
              if (validate) return;
              signIn(email, password, setErrors, setWait);
            }}
          >
            <Text style={styles.button}>Login</Text>
          </TouchableOpacity>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFEFF5",
    marginHorizontal:18,
  },
  button: {
    fontSize: 20,
    color: "#FFFFFF",
    fontWeight: "bold",
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
    borderRadius: 10,
    backgroundColor: "#rgb(0, 103, 187)",
    marginTop:10,
  },
  logo: {
    width:90, 
    height:90, 
    alignSelf:'center',
    marginBottom: 20,
    marginTop: 20,
  },
  header: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
    overflow:'hidden'
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
    marginTop: 10,
    paddingLeft: 6,
    borderRadius: 10,
    backgroundColor: "white",
  },
});
