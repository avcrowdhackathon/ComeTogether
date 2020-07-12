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
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

const ses = new AWS.SES({
  accessKeyId: "AKIAXQFEMNA4AWKM4HW5",
  secretAccessKey: "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",
  region: "eu-west-1",
  apiVersion: "2010-12-01",
});

export default function Login_Send_Email({ navigation }) {
  const [email, setEmail] = React.useState("");

  const sendEmail = () => {
    //check if user exists in our database already
    const email_trimmed = email.toLowerCase().trim();
    firestore()
      .collection("users")
      .where("email", "==", email_trimmed)
      .get()
      .then((doc) => {
        if (!doc.empty) {
          //user exists, so get his one time password
          if (doc.docs[0].data.one_time_password === "")
            console.warn(
              `You are a registered user, if you don't remember your password, please reset it!`
            );
          else {
            //send email, if one time password is set
            var TemplateData = {
              urlLink: "lala",
            };

            var params = {
              Source: "info@cometogether.network",
              Destination: {
                ToAddresses: [email_trimmed],
              },
              Template: "Login" /* required */,
              TemplateData: JSON.stringify(TemplateData) /* required */,
            };

            ses
              .sendTemplatedEmail(params)
              .promise()
              .then(() => {
                //redirect to 'email sent page'
                navigation.navigate("SignIn");
              });
          }
        } else {
          //user dont exist, so register him, and add him to database.
          const defaultNum = Math.floor(100000 + Math.random() * 900000); //6 digits default number

          auth()
            .createUserWithEmailAndPassword(
              email_trimmed,
              defaultNum.toString()
            )
            .then((data) => {
              console.log(data)
              firestore()
                .collection("users")
                .add({
                  email: email_trimmed,
                  one_time_password: defaultNum,
                  id: data.user.uid,
                  role: 'user'
                });
              //send email with his code.
              var TemplateData = {
                urlLink: "lala",
              };

              var params = {
                Source: "info@cometogether.network",
                Destination: {
                  ToAddresses: [email_trimmed],
                },
                Template: "Login" /* required */,
                TemplateData: JSON.stringify(TemplateData) /* required */,
              };

              ses
                .sendTemplatedEmail(params)
                .promise()
                .then(() => {
                  //redirect to 'email sent page'
                  navigation.navigate("SignIn");
                });
            })
            .catch((error) => {
              if (error.code === "auth/email-already-in-use") {
                console.warn("That email address is already in use!");
              }

              if (error.code === "auth/invalid-email") {
                console.warn("That email address is invalid!");
              }

              console.log(error);
            });
        }
      });
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
