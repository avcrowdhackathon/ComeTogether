import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { connect } from "react-redux";
import { Login, Login_Send_Email } from "../components";

const Stack = createStackNavigator();

const LoginNavigator = () => {
  return (
    <Stack.Navigator
      backBehavior="history"
      initialRouteName="SignIn"
      headerMode="none"
    >
      <Stack.Screen name="SignIn" component={Login} />
      <Stack.Screen name="SendEmail" component={Login_Send_Email} />
    </Stack.Navigator>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginNavigator);
