import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { APP_DRAWER, BOTTOM_TABS,  CATEGORY,  HELP,  HOME,LOGIN,  MY_MOMENT,  PRIVATE_ABOUT,  PRIVATE_APP_DRAWER,  PROFILE_DETAILS,  SETTINGS,  SIGNIN, SIGNUP,  } from './RouteConst';
import AppDrawer from './AppDrawer';
import { Category, DetailsPage, DrawerScreen, ListPage, Login,  MyMoment,  Profile, ProfileDetails, SignIn, SignUp,   } from '../Screens';
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
import Settings from '../Screens/Settings';
import PrivateAbout from '../Screens/PrivateAbout';
import Help from '../Screens/Help';

const MainStack = createStackNavigator();

const MainRoute = () => {

    const login_status = useSelector(state => state.User.login_status);
    
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
                     <MainStack.Screen name={MY_MOMENT} component={MyMoment} />
                     <MainStack.Screen name={PROFILE_DETAILS} component={ProfileDetails} />
                     <MainStack.Screen name={SETTINGS} component={Settings} />
                     <MainStack.Screen name={HELP} component={Help} />
                     <MainStack.Screen name={PRIVATE_ABOUT} component={PrivateAbout} />
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
