import * as React from 'react';
import { NavigationContainer,DarkTheme,DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AGREEMENT, FORGET, HOME, LOGIN, MAIN_ROUTE, MY_MOMENT, OTP_SCREEN,  RESET,  SIGNUP, SPLASH_PAGE, VERIFICATION_SCREEN, VERIFY_FORGET } from './RouteConst';
import { Agreement, Home, Login, MyMoment, OtpScreen,  SignUp, Splash, VerificationScreen } from '../Screens';
import MainRoute from './MainRoute';
import { APP_DRAWER, PUBLIC_MAIN_ROUTE } from './PublicRouteConts';
import PublicMainRoute from './PublicMainRoute';
import AppDrawer from './AppDrawer';
import { useColorScheme } from 'react-native';
import Forget from '../Screens/Forget';
import Reset from '../Screens/Reset';
import VerifyForget from '../Screens/VerifyForget';


const Stack = createStackNavigator();

const AuthRoute = () => {
  const theme = useColorScheme();

  return (
    <NavigationContainer theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}
      >
        <Stack.Screen name={SPLASH_PAGE} component={Splash} />
        <Stack.Screen name={MAIN_ROUTE} component={MainRoute} />
        <Stack.Screen name={PUBLIC_MAIN_ROUTE} component={PublicMainRoute} />
        <Stack.Screen name={LOGIN} component={Login} />
        <Stack.Screen name={SIGNUP} component={SignUp} />
        <Stack.Screen name={VERIFICATION_SCREEN} component={VerificationScreen} />
        <Stack.Screen name={FORGET} component={Forget} />
        <Stack.Screen name={RESET} component={Reset} />
        <Stack.Screen name={VERIFY_FORGET} component={VerifyForget} />
        <Stack.Screen name={AGREEMENT} component={Agreement} />
        <Stack.Screen name={OTP_SCREEN} component={OtpScreen} />
        <Stack.Screen name={APP_DRAWER} component={AppDrawer} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default AuthRoute;