import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { APP_DRAWER, BOTTOM_TABS,  CATEGORY,  HOME,LOGIN,  PRIVATE_APP_DRAWER,  PROFILE_DETAILS,  SIGNIN, SIGNUP,  } from './RouteConst';
import AppDrawer from './AppDrawer';
import { Category, DetailsPage, DrawerScreen, ListPage, Login,  Profile, ProfileDetails, SignIn, SignUp,   } from '../Screens';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfileInfo } from '../utils/AsyncStorageHelper';
import { setuser } from '../Redux/reducer/User';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../Screens/Home';
import BottomTabs from './BottomTabs';
import { PUBLIC_MAIN_ROUTE } from './PublicRouteConts';
import PublicMainRoute from './PublicMainRoute';
import PrivateAppDrawer from './PrivateAppDrawer';

const MainStack = createStackNavigator();

const MainRoute = () => {

    const login_status = useSelector(state => state.User.login_status);
    console.log("loginStatus",login_status)
    // const dispatch = useDispatch();

    // const checkUser = async () => {
    //     let account = await getUserProfileInfo();
    //     if (account) {
    //         dispatch(setuser(account));
    //     } else {
    //     }
    // };
    // useEffect(() => {
    //     checkUser();
    // }, []);
    return (
        <MainStack.Navigator screenOptions={{
            headerShown: false
        }}
        >
            {login_status ? (
                <>
                     <MainStack.Screen name={BOTTOM_TABS} component={BottomTabs} />
                     <MainStack.Screen name={CATEGORY} component={Category} />
                     <MainStack.Screen name={PROFILE_DETAILS} component={ProfileDetails} />
                     <MainStack.Screen name={PUBLIC_MAIN_ROUTE} component={PublicMainRoute} />
                     <MainStack.Screen name={PRIVATE_APP_DRAWER} component={PrivateAppDrawer} />
                </>
            ) : (
                <>
                    <MainStack.Screen name={LOGIN} component={Login} />
                    <MainStack.Screen name={SIGNUP} component={SignUp} />
                </>
            )}
          
        </MainStack.Navigator>
    );
}

export default MainRoute;
