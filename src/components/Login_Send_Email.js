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
import AWS from "aws-sdk/dist/aws-sdk-react-native";

const ses = new AWS.SES({
  accessKeyId: "AKIAI3AHZ2I7EX4SABGA",
  secretAccessKey: "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",
  region: "eu-west-1",
  apiVersion: "2010-12-01",
});

export default function Login_Send_Email({ navigation }) {
  const [email, setEmail] = React.useState("");

  const sendEmail = () => {
    var TemplateData = {
      urlLink: 'lala',
    };

    var params = {
      Source: "info@cometogether.network",
      Destination: {
        ToAddresses: [email],
      },
      Template: "Login" /* required */,
      TemplateData: JSON.stringify(TemplateData) /* required */,
    };

    ses
      .sendTemplatedEmail(params)
      .promise()
      .then(navigation.navigate("SignIn"));
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../../images/comeTogetherBlack.png")}
        resizeMode="contain"
      />
      <Text style={styles.header}> One-Time Password</Text>

      <View style={styles.root}>
        <View style={styles.rowContainer}>
          <Text style={styles.label}>Submit your email</Text>

          <TextInput
            autoCorrect={true}
            onChangeText={setEmail}
            value={email}
            style={styles.textInput}
          />
          <TouchableHighlight
            title="goToEmail"
            style={styles.goToEmail}
            onPress={() => {
              navigation.navigate("SignIn");
            }}
          >
            <Text style={styles.labelEmail}>Go to login</Text>
          </TouchableHighlight>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableHighlight
          style={styles.scan}
          title="SendEmail"
          onPress={sendEmail}
        >
          <Text style={styles.button}>Send Password</Text>
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
    flex: 1,
    height: undefined,
    width: undefined,
  },
  header: {
    flex: 0.5,
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
