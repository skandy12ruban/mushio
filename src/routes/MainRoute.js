import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { APP_DRAWER, BOTTOM_TABS, DETAILS_PAGE, HOME, LIST_PAGE, LOGIN, LOGIN_COMPONENT, PROFILE, SIGNIN, SIGN_UP, VIEW_CONTENT, VIEW_COURSE, VIEW_PDF } from './RouteConst';
import AppDrawer from './AppDrawer';
import { DetailsPage, ListPage, Login, LoginComponent, Profile, SignIn, SignUpScreen, ViewContent, ViewCourse, ViewPdf } from '../Screens';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfileInfo } from '../utils/AsyncStorageHelper';
import { setuser } from '../Redux/reducer/User';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../Screens/Home';
import BottomTabs from './BottomTabs';

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
                     <MainStack.Screen name={LIST_PAGE} component={ListPage} />
                     <MainStack.Screen name={DETAILS_PAGE} component={DetailsPage} />
            
                </>
            ) : (
                <>
                    <MainStack.Screen name={LOGIN} component={Login} />
                    <MainStack.Screen name={SIGNIN} component={SignIn} />
                </>
            )}
            {/* <MainStack.Screen name={BOTTOM_TABS} component={BottomTabs} />
            <MainStack.Screen name={LIST_PAGE} component={ListPage} />
            <MainStack.Screen name={DETAILS_PAGE} component={DetailsPage} /> */}
        </MainStack.Navigator>
    );
}

export default MainRoute;
