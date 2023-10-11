import { View, Text } from 'react-native'
import React from 'react'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import People from '../PublicScreens/People';
import Places from '../PublicScreens/Places';
import Moments from '../PublicScreens/Moments';
import { PEOPLE } from './PublicRouteConts';

const Tab = createMaterialTopTabNavigator();
const TopTabs = () => {
  return (
    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around'}}>
      <Tab.Navigator
        screenOptions={{
            // tabBarLabelStyle: {fontSize: 12, fontWeight: '500'}
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
        }}
        >
        <Tab.Screen name="Moments" component={Moments} />
        <Tab.Screen name={PEOPLE} component={People} />
        <Tab.Screen name="Places" component={Places} />
      </Tab.Navigator>
    </View>
  )
}

export default TopTabs