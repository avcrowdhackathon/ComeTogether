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
import { TouchableOpacity } from "react-native-gesture-handler";
import Snackbar from 'react-native-snackbar';



const ses = new AWS.SES({
  accessKeyId: "AKIAXQFEMNA4AWKM4HW5",
  secretAccessKey: "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",
  region: "eu-west-1",
  apiVersion: "2010-12-01",
});

export default function Login_Send_Email({ navigation }) {
  const [email, setEmail] = React.useState("");
  const [wait, setWait] = React.useState(false);


  const snack = (msg) => {
    Snackbar.show({
      text: `${msg}`,
      textColor:'red',
      backgroundColor:'white',
      duration: Snackbar.LENGTH_SHORT,
      action: {
        text: 'UNDO',
        textColor: 'rgb(0, 103, 187)',
        onPress: () => { Snackbar.dismiss()},
      },
    });
  }

  const validation = React.useCallback(() => {
    const email_trimmed = email.toLowerCase().trim();
    if (email_trimmed == "") {
      snack("Email cannot be empty.");
      return true;
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,8}$/i.test(email_trimmed)
    ) {
      snack("Email format is not valid.");
      return true;
    } else {
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
          <View style={styles.rowContainer}>
            <Text style={styles.label}>Submit your email</Text>

            <TextInput
              autoCorrect={true}
              onChangeText={setEmail}
              value={email}
              style={styles.textInput}
              placeholder="Email"
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

          <TouchableOpacity
            style={styles.scan}
            title="SendEmail"
            onPress={sendEmail}
          >
            <Text style={styles.button}>Send Password</Text>
          </TouchableOpacity>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFEFF5",
    marginHorizontal: 18,
  },
  button: {
    fontSize: 20,
    color: "#FFFFFF",
    fontWeight: "bold",
    marginHorizontal: 18,
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
    marginBottom: 100,
  },
  logo: {
    width:90, 
    height:90, 
    alignSelf:'center',
    marginBottom: 20,
    marginTop: 20,
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
    borderRadius: 10,
    backgroundColor: "white",
  },
});
