import React from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  TextInput,
  Image,
  TouchableHighlight,
} from "react-native";

import AWS from "aws-sdk";
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
  const [error, seterror] = React.useState("");
  const [wait, setWait] = React.useState(false);

  const validation = React.useCallback(() => {
    const email_trimmed = email.toLowerCase().trim();
    if (email_trimmed == "") {
      seterror("Email cannot be empty.");
      return true;
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,8}$/i.test(email_trimmed)
    ) {
      seterror("Email format is not valid.");
      return true;
    } else {
      seterror("");
      return false;
    }
  });

  const sendEmail = () => {
    const validate = validation();
    if (validate) return;
    //check if user exists in our database already
    const email_trimmed = email.toLowerCase().trim();
    setWait(true);
    firestore()
      .collection("users")
      .where("email", "==", email_trimmed)
      .get()
      .then((doc) => {
        if (!doc.empty) {
          //user exists, so get his one time password
          if (doc.docs[0].data().one_time_password === "") {
            console.warn(
              `You are a registered user, if you don't remember your password, please reset it!`
            );
            setWait(false);
          } else {
            //send email, if one time password is set
            var TemplateData = {
              passwrod: doc.docs[0].data().one_time_password.toString(),
            };

            var params = {
              Source: "info@cometogether.network",
              Destination: {
                ToAddresses: [email_trimmed],
              },
              Template: "BackTogetherLoginPassword" /* required */,
              TemplateData: JSON.stringify(TemplateData) /* required */,
            };

            ses
              .sendTemplatedEmail(params)
              .promise()
              .then(() => {
                setWait(false);
                //redirect to 'email sent page'
                navigation.navigate("EmailSent");
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
              firestore()
                .collection("users")
                .add({
                  email: email_trimmed,
                  one_time_password: defaultNum,
                  id: data.user.uid,
                  role: "user",
                });

              //send email with his code.
              var TemplateData = {
                passwrod: defaultNum,
              };

              var params = {
                Source: "info@cometogether.network",
                Destination: {
                  ToAddresses: [email_trimmed],
                },
                Template: "BackTogetherLoginPassword" /* required */,
                TemplateData: JSON.stringify(TemplateData) /* required */,
              };

              ses
                .sendTemplatedEmail(params)
                .promise()
                .then(() => {
                  //redirect to 'email sent page'
                  setWait(false);
                  navigation.navigate("EmailSent");
                });
            })
            .catch((error) => {
              if (error.code === "auth/email-already-in-use") {
                console.warn("That email address is already in use!");
                setWait(false);
              }

              if (error.code === "auth/invalid-email") {
                console.warn("That email address is invalid!");
                setWait(false);
              }
              setWait(false);
              console.log(error);
            });
        }
      });
  };

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
        <Text style={styles.header}> One-Time Password</Text>

        <View style={styles.root}>
          <View style={styles.rowContainer}>
            <Text style={styles.label}>Submit your email</Text>

            <TextInput
              autoCorrect={true}
              onChangeText={setEmail}
              value={email}
              style={styles.textInput}
              placeholder="Email"
            />
            {error !== "" && (
              <View style={{ width: "100%" }}>
                <Text style={styles.errorMessage}>{error}</Text>
              </View>
            )}
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
  errorMessage: {
    fontSize: 12,
    color: "red",
    textAlign: "left",
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
