import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import {  BOTTOM_TABS,  CATEGORY,  HOME,LOGIN,  MAIN_ROUTE,  PROFILE_DETAILS,  SIGNIN, SIGNUP,  } from './RouteConst';
import AppDrawer from './AppDrawer';
import { Category, DetailsPage, ListPage, Login,  Profile, ProfileDetails, SignIn, SignUp,   } from '../Screens';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfileInfo } from '../utils/AsyncStorageHelper';
import { setuser } from '../Redux/reducer/User';
import { NavigationContainer } from '@react-navigation/native';


import { ADD_CARDS, APP_DRAWER, ARTIST_MESSAGE, CARDS, CHAT_SCREEN, ENTERTAINMENT, FRIENDS, FRIENS_MESSAGE, MY_PROFILE, NEW_POST, PEOPLE, POSTS, PUBLIC_BOTTOM_TABS, PUBLIC_SERACH_SCREEN1, TOP_TABS } from './PublicRouteConts';
import PublicBottomTabs from './PublicBottomTabs';
import MainRoute from './MainRoute';
import People from '../PublicScreens/People';
import TopTabs from './TopTabs';
import Posts from '../PublicScreens/Posts';
import Friends from '../PublicScreens/Friends';
import Cards from '../PublicScreens/Cards';
import PublicSearchScreen1 from '../PublicScreens/PublicSearchScreen1';
import ChatScreen from '../PublicScreens/ChatScreen';
import FriendsMessage from '../PublicScreens/FriendsMessage';
import ArtistMessage from '../PublicScreens/ArtistMessage';
import Entertainment from '../PublicScreens/Entertainment';
import AddCards from '../PublicScreens/AddCards';
import NewPost from '../PublicScreens/NewPost';
import MyProfile from '../PublicScreens/MyProfile';

const MainStack = createStackNavigator();

const PublicMainRoute = () => {

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
                     <MainStack.Screen name={PUBLIC_BOTTOM_TABS} component={PublicBottomTabs} />
                     <MainStack.Screen name={TOP_TABS} component={TopTabs} />
                     <MainStack.Screen name={APP_DRAWER} component={AppDrawer} />
                     <MainStack.Screen name={MAIN_ROUTE} component={MainRoute} />
                     {/* <MainStack.Screen name={PEOPLE} component={People} /> */}
                     <MainStack.Screen name={POSTS} component={Posts} />
                     <MainStack.Screen name={FRIENDS} component={Friends} />
                     <MainStack.Screen name={CARDS} component={Cards} />
                     <MainStack.Screen name={PUBLIC_SERACH_SCREEN1} component={PublicSearchScreen1} />
                     <MainStack.Screen name={CHAT_SCREEN} component={ChatScreen} />
                     <MainStack.Screen name={FRIENS_MESSAGE} component={FriendsMessage} />
                     <MainStack.Screen name={ARTIST_MESSAGE} component={ArtistMessage} />
                     <MainStack.Screen name={ENTERTAINMENT} component={Entertainment} />
                     <MainStack.Screen name={ADD_CARDS} component={AddCards} />
                     <MainStack.Screen name={NEW_POST} component={NewPost} />
                     <MainStack.Screen name={MY_PROFILE} component={MyProfile} />
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

export default PublicMainRoute;
