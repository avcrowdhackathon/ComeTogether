/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { enableScreens } from "react-native-screens";
import { Login, SettingsBtn, QrVerification } from "./src/components";
import {
  TabNavigator,
  SettingsNavigator,
  LoginNavigator,
} from "./src/navigators";
import { LogoTitle, Splash } from "./src/components";
import { connect } from "react-redux";
import { insertToken, deleteToken, restoreToken } from "./actions";
import IdVerification from "./src/components/IdVerification";
import { useRoute } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

// performance imporovement for navigator
enableScreens();

//Navigator initialization
const Stack = createStackNavigator();
export const AuthContext = React.createContext();

const App = ({ userToken, isLoading, isSignout, dispatch }) => {
  React.useEffect(() => {
    const bootstrapAsync = async () => {
      // After restoring token, we may need to validate it in production apps
      // request to backend in order to see if the token is valid / maybe with the mac address ??

      // This will switch to the A
      // screen will be unmounted and thrown away.
      dispatch(restoreToken());
    };
    if (userToken != null) {
      bootstrapAsync();
    } else {
      dispatch(restoreToken());
    }
  }, []);

  const RouteName = () => {
    const route = useRoute();
    return (
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 24,
          marginLeft: 18,
          color: "black",
        }}
      >
        {route.name}
      </Text>
    );
  };

  const authContext = React.useMemo(
    () => ({
      signIn: async (email, password, cb) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token
        try {
          const email_trimmed = email.toLowerCase().trim();
          auth()
            .signInWithEmailAndPassword(email_trimmed, password)
            .then(async (data) => {
              const userid = data.user.uid;
              firestore()
                .collection("users")
                .where("id", "==", userid)
                .get()
                .then((doc) => {
                  if (!doc.empty) {
                    const data = doc.docs[0].data();

                    dispatch(insertToken(data));
                  }
                });
            })
            .catch((error) => {
              if (error.code === "auth/invalid-email") {
                console.log("That email address is invalid!");
              } else if (error.code === "auth/wrong-password") {
                console.log("That password is incorrect!");
                cb((prevState) => ({
                  ...prevState,
                  password: "Password is not correct",
                }));
              } else if (error.code === "auth/user-not-found") {
                console.log("That password is incorrect!");
                cb((prevState) => ({
                  ...prevState,
                  email: "User not found",
                }));
              }else {
                cb((prevState) => ({
                  ...prevState,
                  passwrod: "Something went wrong",
                }));
              }

              console.log(error);
            });
        } catch (error) {
          alert(error);
        }
      },

      signOut: async () => {
        dispatch(deleteToken());
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator
          headerMode={userToken == null || isLoading ? "none" : "screen"}
        >
          {userToken == null ? (
            <Stack.Screen
              name="SignIn"
              component={LoginNavigator}
              options={{
                title: "Sign in",
                animationTypeForReplace: isSignout ? "pop" : "push",
              }}
            />
          ) : (
            <>
              {isLoading && <Stack.Screen name="Splash" component={Splash} />}
              <Stack.Screen
                name="TabNavigator"
                component={TabNavigator}
                options={{
                  headerStyle: {
                    backgroundColor: "#efeff5",
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomWidth: 0,
                  },
                  headerRight: (props) => <SettingsBtn />,
                  // headerLeft: (props) => (<RouteName />),
                  headerTitle: (props) => (
                    <>
                      <LogoTitle {...props} />
                    </>
                  ),
                  headerTitleAlign: "center",
                  headerStatusBarHeight: 10,
                }}
              />
              <Stack.Screen
                name="Settings"
                component={SettingsNavigator}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="VerifyById"
                component={IdVerification}
                options={{
                  title: "Scan or type Id",
                }}
              />
              <Stack.Screen
                name="VerifyByQR"
                component={QrVerification}
                options={{
                  title: "Scan QR Code",
                }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

const mapStateToProps = (state) => ({
  userToken: state.auth.userToken,
  isSignout: state.auth.isSignout,
  isLoading: state.auth.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
