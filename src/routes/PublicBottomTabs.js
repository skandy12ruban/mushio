import React from 'react';
import { View, Text, Dimensions, StyleSheet, useColorScheme } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Octicons from 'react-native-vector-icons/Octicons';
import Metrics from '../Constants/Metrics';
import { Categories, Home, Profile, Graphs } from '../Screens';
import { HOME, GRAPHS } from './RouteConst';
import PublicSearchScreen from '../PublicScreens/PublicSearchScreen';
import PublicCategories from '../PublicScreens/PublicCategories';
import PublicHome from '../PublicScreens/PublicHome';
import PublicEntertainment from '../PublicScreens/PublicEntertainment';
import PublicProfile from '../PublicScreens/PublicProfile';
import { PUBLIC_HOME, PUBLIC_PROFILE } from './PublicRouteConts';
import EditProfile from '../PublicScreens/EditProfile';
import Entertainment from '../PublicScreens/Entertainment';

const { width, height } = Dimensions.get('window');
const Tab = createBottomTabNavigator();

const tabIcon = (icon, focused) => {
  return (
    <View style={{
      backgroundColor: '#FFFFFF',
      marginVertical: 5,
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#00B0FF',
      top: focused ? -20 : 0,
    }}>
      <View
        style={{
          height: 50,
          width: 50,
          borderRadius: 50,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: focused ? 'black' : 'white',
          elevation: focused ? 4 : 0,
          shadowOffset: focused ? { width: 0, height: 5 } : { width: 0, height: 0 },
        }}>
        <Ionicons
          name={icon}
          style={[
            { fontSize: 30, color: focused ? 'white' : 'black' },
          ]}
        />
      </View>
    </View>
  )
}

const PublicBottomTabs = (props) => {
  const theme = useColorScheme()



  return (
    <View style={{ flex: 1, backgroundColor: '#f6f6f6' }}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarItemStyle: {
            borderRadius: 200,
          },
          tabBarStyle: {
            borderRadius: 5,
            height: 55,
          },
          tabBarActiveTintColor: '#000000',
        }}>
        <Tab.Screen
          name="PublicHome"
          component={PublicHome}
          options={{
            tabBarIcon: ({ focused }) => tabIcon('home-outline', focused),
          }}
        />
        <Tab.Screen
          name="PublicSearchScreen"
          component={PublicSearchScreen}
          options={{
            tabBarIcon: ({ focused }) => tabIcon('search-outline', focused),
          }}
        />
        <Tab.Screen
          name="PublicCategories"
          component={PublicCategories}
          options={{
            tabBarIcon: ({ focused }) => tabIcon('add-outline', focused),
          }}
        />
        <Tab.Screen
          name="Entertainment"
          component={Entertainment}
          options={{
            tabBarIcon: ({ focused }) => tabIcon('people-outline', focused),
          }}
        />

        <Tab.Screen
          name="PublicProfile"
          component={PublicProfile}
          // name="EditProfile"
          // component={EditProfile}
          options={{
            tabBarIcon: ({ focused }) => tabIcon('person-outline', focused),
          }}
        />
      </Tab.Navigator>
    </View>
  )
}
const styles = StyleSheet.create({

})
export default PublicBottomTabs;