import { createStackNavigator, createSwitchNavigator } from 'react-navigation';

import SignInScreen from './components/Screens/SignInScreen/SignInScreen';
import AuthLoadingScreen from './components/Screens/AuthLoadingScreen/AuthLoadingScreen';
import DietScreen from './components/Screens/DietScreen/DietScreen';
import DashboardScreen from './components/Screens/DashboardScreen/DashboardScreen';

const AppStack = createStackNavigator({ Dashboard: DashboardScreen, Diet: DietScreen });
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
