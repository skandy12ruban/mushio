import { View, Text } from 'react-native'
import React from 'react'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Friends1 from '../PublicScreens/Friends1';
import Artist from '../PublicScreens/Artist';



const Tab = createMaterialTopTabNavigator();
const PublicTopTabs = () => {
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
        <Tab.Screen name="Friends1" component={Friends1} />  
        <Tab.Screen name="Artist" component={Artist} />
      </Tab.Navigator>
    </View>
  )
}

export default PublicTopTabs