import { createStackNavigator, createSwitchNavigator, createDrawerNavigator } from 'react-navigation';

import SignInScreen from './components/Screens/SignInScreen/SignInScreen';
import AuthLoadingScreen from './components/Screens/AuthLoadingScreen/AuthLoadingScreen';
import DietScreen from './components/Screens/DietScreen/DietScreen';
import ShowDiet from './components/Screens/DietScreen/ShowDiet';
import DashboardScreen from './components/Screens/DashboardScreen/DashboardScreen';

import stackConfig from './navigation/shared-stack-config';
import drawerStackConfig from './navigation/drawer-config';

const AppStack = createDrawerNavigator({ 
  Dashboard: createStackNavigator({ Dashboard: DashboardScreen }, drawerStackConfig ),
  Dietas: createStackNavigator({ 
    Diets: DietScreen,
    ShowDiet: ShowDiet,
  }, drawerStackConfig ),
});
const AuthStack = createStackNavigator({ SignIn: SignInScreen }, stackConfig );

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
