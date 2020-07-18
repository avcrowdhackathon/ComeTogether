import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight,
} from "react-native";

export default function EmailSent({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../../images/BT_logoWithName.png")}
        resizeMode="contain"
      />
      <Image
        source={require("../../images/imageEmailVerification.png")}
        resizeMode="contain"
      />
      <Text style={styles.header}> Check your Email!</Text>

      <View style={styles.root}>
        <View style={styles.rowContainer}>
          <Text style={styles.label}>
            Use the password that has been sent in your Email in order to log
            in.{" "}
          </Text>
        </View>
        <TouchableHighlight
          title="goToLogin"
          style={styles.goToEmail}
          onPress={() => {
            navigation.navigate("SignIn");
          }}
        >
          <Text style={styles.labelEmail}>Go to login</Text>
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
    textAlign: "center",
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
    textAlign: "center",
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
