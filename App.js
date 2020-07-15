/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { enableScreens } from 'react-native-screens';
import {Login, Logout, QrVerification, Settings} from './src/components';
import { PrivacyPolicy, TermsOfUse, ResetPassword, DeleteAccount } from './src/components/Settings';
import {TabNavigator} from './src/navigators';
import {LogoTitle, Splash} from './src/components';
import {connect} from 'react-redux';
import {loginProcess} from './src/services/sevices'
import { insertToken, deleteToken, restoreToken } from './actions';
import IdVerification from "./src/components/IdVerification";
import {TouchableHighlight, Text} from 'react-native';


// performance imporovement for navigator
enableScreens();

//Navigator initialization
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
export const AuthContext = React.createContext();

const SettingsDrawerScreen  = () => (
  <Drawer.Navigator>
      <Drawer.Screen
          name="PrivacyPolicy"
          component={PrivacyPolicy}
          options={{
            title: 'Privacy Policy'
          }}
        />
        <Drawer.Screen
          name="TermsOfUse"
          component={TermsOfUse}
          options={{
            title: 'Terms Of Use'
          }}
        />
        <Drawer.Screen
          name="ResetPassword"
          component={ResetPassword}
          options={{
            title: 'Reset Password'
          }}
        />
        <Drawer.Screen
          name="DeleteAccount"
          component={DeleteAccount}
          options={{
            title: 'Delete Account'
          }}
          />
        
      </Drawer.Navigator>
)

const App = ({userToken, isLoading, isSignout, dispatch}) => {

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      // After restoring token, we may need to validate it in production apps
      // request to backend in order to see if the token is valid / maybe with the mac address ?? 

      // This will switch to the A
      // screen will be unmounted and thrown away.
      dispatch(restoreToken());
    };
    if(userToken != null){
      bootstrapAsync();
    }else {
      dispatch(restoreToken())
    }
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (username, password) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token
        try {
          // let response = await fetch(domain.BACKEND_URL + `/hackathon/testingRoute`,
          // {
          //   method:'GET'
          // });
          // let responseJson = await response.json();
          
          user = loginProcess(username, password)
          if(user == '') alert('Wrong credentials')
          else{
            await dispatch(insertToken(user));
          }

        }
        catch(error){
          alert(error)
        }
      },

      signOut: async () =>{
        dispatch(deleteToken())
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
      <Stack.Navigator
        headerMode={userToken == null || isLoading ?'none':'screen'}>
        {userToken == null?
        (
          <Stack.Screen
            name="SignIn"
            component={Login}
            options={{
              title: 'Sign in',
              animationTypeForReplace: isSignout ? 'pop' : 'push',
            }}
          />
        ) : (
          <>
          {isLoading && <Stack.Screen name="Splash" component={Splash}/>}
          <Stack.Screen
            name="TabNavigator"
            component={TabNavigator}
            options={ ({navigation}) => ({
              headerStyle: {
                backgroundColor: 'black',
                height:45
              },
              headerRight: () => (
                <TouchableHighlight style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}} title="Settings" onPress={() => navigation.toggleDrawer()}>
                  <Text style={{color:'white', paddingHorizontal:8}}>Settings</Text>
                </TouchableHighlight>
                
              ),
              headerTitle: props => (
              <>
                <LogoTitle {...props} />
              </>
              ),
              headerTitleAlign:'center'
            })}
          />
          <Stack.Screen
            name="Settings"
            component={Settings}
            options={{
              title: 'Settings'
            }}
          />
          </>
        )}
        <Stack.Screen
          name="VerifyById"
          component={IdVerification}
          options={{
            title: 'Scan or type Id'
          }}
        />
        <Stack.Screen
          name="VerifyByQR"
          component={QrVerification}
          options={{
            title: 'Scan QR Code'
          }}
        />
      </Stack.Navigator>
      <SettingsDrawerScreen/>
      </NavigationContainer>
    </AuthContext.Provider>
  )
}




const mapStateToProps = (state) => ({
  userToken: state.auth.userToken,
  isSignout: state.auth.isSignout,
  isLoading: state.auth.isLoading

})

const mapDispatchToProps = (dispatch) => ({
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(App)


