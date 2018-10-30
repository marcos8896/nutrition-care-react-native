import { createStackNavigator, createSwitchNavigator, createDrawerNavigator } from 'react-navigation';

import SignInScreen from './components/Screens/SignInScreen/SignInScreen';
import AuthLoadingScreen from './components/Screens/AuthLoadingScreen/AuthLoadingScreen';
import DietScreen from './components/Screens/DietScreen/DietScreen';
import DashboardScreen from './components/Screens/DashboardScreen/DashboardScreen';

import navigationOptions from './navigation/sharedNavigatorOpt';
const AppStack = createDrawerNavigator({ 
  Dashboard: createStackNavigator({ Dashboard: DashboardScreen }, { navigationOptions }),
  Dietas: createStackNavigator({ Diet: DietScreen }, { navigationOptions }),
});
const AuthStack = createStackNavigator({ SignIn: SignInScreen }, { navigationOptions });

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
