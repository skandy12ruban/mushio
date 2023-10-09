import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HOME, LOGIN, MAIN_ROUTE, OTP_SCREEN, SIGNIN, SIGNUP, SPLASH_PAGE } from './RouteConst';
import { Home, Login, OtpScreen, SignIn, SignUp, Splash } from '../Screens';
import MainRoute from './MainRoute';

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
        <Stack.Screen name={LOGIN} component={Login} />
        <Stack.Screen name={SIGNUP} component={SignUp} />
        <Stack.Screen name={SIGNIN} component={SignIn} />
        <Stack.Screen name={OTP_SCREEN} component={OtpScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default AuthRoute;