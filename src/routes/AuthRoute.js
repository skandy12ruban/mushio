import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AGREEMENT, HOME, LOGIN, MAIN_ROUTE, OTP_SCREEN,  SIGNUP, SPLASH_PAGE, VERIFICATION_SCREEN } from './RouteConst';
import { Agreement, Home, Login, OtpScreen,  SignUp, Splash, VerificationScreen } from '../Screens';
import MainRoute from './MainRoute';
import { APP_DRAWER, PUBLIC_MAIN_ROUTE } from './PublicRouteConts';
import PublicMainRoute from './PublicMainRoute';
import AppDrawer from './AppDrawer';

const Stack = createStackNavigator();

const AuthRoute = () => {
  return (
    <NavigationContainer>
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
        <Stack.Screen name={AGREEMENT} component={Agreement} />
        <Stack.Screen name={OTP_SCREEN} component={OtpScreen} />
        <Stack.Screen name={APP_DRAWER} component={AppDrawer} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default AuthRoute;