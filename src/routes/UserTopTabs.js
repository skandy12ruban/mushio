import { View, Text } from 'react-native'
import React from 'react'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import People from '../PublicScreens/People';
import Places from '../PublicScreens/Places';
import Moments from '../PublicScreens/Moments';
import { PEOPLE } from './PublicRouteConts';
import UserMoments from '../PublicScreens/UserMoments';
import UserPeople from '../PublicScreens/UserPeople';
import UserPlaces from '../PublicScreens/UserPlaces';

const Tab = createMaterialTopTabNavigator();
const UserTopTabs = (props) => {
  const{Token,userProfile} =props
//   
  return (
    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around'}}>
      <Tab.Navigator
        screenOptions={{
            tabBarLabelStyle: {fontSize: 12, fontWeight: '500',color:'black'},
            // tabBarActiveTintColor: 'black',
            // tabBarLabelStyle: { fontSize: 15 },
            // tabBarInactiveTintColor: 'black',
            // tabBarIndicatorStyle: {
            //   borderBottomColor: '#804EEB',
            //   borderBottomWidth: 2,
            //   width: 150,
            //   alignSelf: 'center',
            //   marginLeft: 30
            // }
            tabBarStyle: {
              backgroundColor: 'white',
              
            }
        }}
        >
       {Token != undefined ? (
        <>
       <Tab.Screen name="Moments" component={UserMoments} initialParams={ {"Token": Token, "userProfile": userProfile }}/>
        <Tab.Screen name={"People"} component={UserPeople} initialParams={ {"Token": Token, "userProfile": userProfile }}/>
        <Tab.Screen name="Places" component={UserPlaces} initialParams={ {"Token": Token, "userProfile": userProfile }}/>
        </>
        ):(null)}
      </Tab.Navigator>
    </View>
  )
}

export default UserTopTabs