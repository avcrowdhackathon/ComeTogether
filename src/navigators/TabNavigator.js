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
            iconName = focused? require('../../images/insert.png'):require('../../images/insertG.png');
          }
          if (route.name === 'Verify') {
            iconName = focused? require('../../images/verify.png'):require('../../images/verifyG.png');
          }
          if (route.name === 'QR Code') {
            iconName = focused? require('../../images/qr.png'):require('../../images/qrG.png');
          }
          if (route.name === 'Certificates') {
            iconName = focused? require('../../images/history.png'):require('../../images/historyG.png');
          }

          const st = focused? null: {opacity:0.3}

          // You can return any component that you like here!
          return <Image source={iconName} style={[{width:24, height:24}, st]}/>;
        },
      })}
      tabBarOptions={{
        showLabel:false,
        style: {
          backgroundColor: 'white',
        },
        tabStyle: {
          alignItems:'center',
          justifyContent: 'center',
        },
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
  
