import React from 'react';
import {Image} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {connect} from 'react-redux';
import {getTabScreens} from './utils'



const Tab = createBottomTabNavigator();

const  TabNavigator = ({userToken}) => {
  if(userToken == null) return null
    return (
      <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Insert') {
            iconName = focused? require('../../images/insert_user_active.png'):require('../../images/inser_user_inactive.png');
          }
          if (route.name === 'Verify') {
            iconName = focused? require('../../images/verify_user_active.png'):require('../../images/verify_user_inactive.png');
          }
          if (route.name === 'QR Code') {
            iconName = focused? require('../../images/Qrcode_active.png'):require('../../images/Qrcode_inactive.png');
          }

          // You can return any component that you like here!
          return <Image source={iconName} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#FF652F',
        inactiveTintColor: '#B4CFF2',
        labelPosition:'below-icon',
        style: {
          height:70,
          backgroundColor: 'black'
        },
        tabStyle: {
          alignItems:'center',
          justifyContent: 'center',
        },
        labelStyle: {
        fontSize:15
        }
      }}
      backBehavior= 'history'
      initialRouteName= 'Insert'
    > 
    {
      getTabScreens(userToken.role, Tab)
    }
    </Tab.Navigator>
    );
  }

  const mapStateToProps = (state) => ({
    userToken: state.auth.userToken
  
  })
  
  const mapDispatchToProps = (dispatch) => ({
    dispatch
  })
  
  export default connect(mapStateToProps, mapDispatchToProps)(TabNavigator)
  
