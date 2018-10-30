import React from 'react';
import { Text } from 'react-native';

import { createStackNavigator, createSwitchNavigator, createDrawerNavigator } from 'react-navigation';

import SignInScreen from './components/Screens/SignInScreen/SignInScreen';
import AuthLoadingScreen from './components/Screens/AuthLoadingScreen/AuthLoadingScreen';
import DietScreen from './components/Screens/DietScreen/DietScreen';
import DashboardScreen from './components/Screens/DashboardScreen/DashboardScreen';

const AppStack = createDrawerNavigator({ 
  Dashboard: createStackNavigator({ Dashboard: DashboardScreen }),
  Dietas: createStackNavigator({ Diet: DietScreen }),
});
const AuthStack = createStackNavigator({ SignIn: SignInScreen });

const RootSwitchStack = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);

export default RootSwitchStack;
