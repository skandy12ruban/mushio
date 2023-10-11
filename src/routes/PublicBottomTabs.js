import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Octicons from 'react-native-vector-icons/Octicons';
import Metrics from '../Constants/Metrics';
import { Categories, Home,  Profile, Graphs } from '../Screens';
import { HOME, GRAPHS } from './RouteConst';
import PublicSearchScreen from '../PublicScreens/PublicSearchScreen';
import PublicCategories from '../PublicScreens/PublicCategories';
import PublicHome from '../PublicScreens/PublicHome';
import PublicEntertainment from '../PublicScreens/PublicEntertainment';
import PublicProfile from '../PublicScreens/PublicProfile';
import { PUBLIC_HOME, PUBLIC_PROFILE } from './PublicRouteConts';

const { width, height } = Dimensions.get('window');
const Tab = createBottomTabNavigator();

const PublicBottomTabs = (props) => {

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Tab.Navigator
        // initialRouteName={PUBLIC_HOME}
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarItemStyle: {
            borderRadius: 200,
          },
          tabBarStyle: {
            backgroundColor: 'white',
            borderRadius: 5,
            margin:10,
            height: 54,
          },
          tabBarActiveTintColor: '#000000',

          // tabBarLabelStyle: { fontSize: 10 },
          // tabBarInactiveTintColor: 'black',
          // tabBarActiveBackgroundColor: 'orange',
        }}>
        <Tab.Screen
          name="PublicHome"
          component={PublicHome}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View style={{
                  backgroundColor: '#FFFFFF',
                  height: 50,
                  width: 50,
                  borderRadius: 50,
                  position: 'absolute',
                  justifyContent: 'center',
                  alignItems: 'center',
                  bottom: focused ? 10 : 0,
                  shadowColor: '#00B0FF',
                  elevation: focused ? 6 : 0,
                  shadowOffset: focused ? { width: 0, height: 5 } : { width: 0, height: 0 },
                }}>
                  <View
                    style={{
                      bottom: focused ? 0 : 0,
                      height: 44,
                      width: 44,
                      borderRadius: 44,
                      backgroundColor: focused ? '#00B0FF' : 'white',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Ionicons
                      name="home"
                      style={[
                        { fontSize: Metrics.rfv(25), color: 'gray', },
                        focused && { fontSize: Metrics.rfv(30), color: 'white', },
                      ]}
                    />
                  </View>
                </View>
              );
            },
          }}
        />
        <Tab.Screen
          name="PublicSearchScreen"
          component={PublicSearchScreen}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View style={{
                  backgroundColor: '#FFFFFF',
                  height: 50,
                  width: 50,
                  borderRadius: 50,
                  position: 'absolute',
                  justifyContent: 'center',
                  alignItems: 'center',
                  bottom: focused ? 10 : 0,
                  shadowColor: '#00B0FF',
                  elevation: focused ? 6 : 0,
                  shadowOffset: focused ? { width: 0, height: 5 } : { width: 0, height: 0 },
                }}>
                  <View
                    style={{
                      bottom: focused ? 0 : 0,
                      height: 44,
                      width: 44,
                      borderRadius: 44,
                      backgroundColor: focused ? '#00B0FF' : 'white',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Ionicons
                      name="search"
                      style={[
                        { fontSize: Metrics.rfv(25), color: 'gray', },
                        focused && { fontSize: Metrics.rfv(30), color: 'white', },
                      ]}
                    />
                  </View>
                </View>
              );
            },
          }}
        />
        <Tab.Screen
          name="PublicCategories"
          component={PublicCategories}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View style={{
                  backgroundColor: '#FFFFFF',
                  height: 50,
                  width: 50,
                  borderRadius: 50,
                  position: 'absolute',
                  justifyContent: 'center',
                  alignItems: 'center',
                  bottom: focused ? 10 : 0,
                  shadowColor: '#00B0FF',
                  elevation: focused ? 6 : 0,
                  shadowOffset: focused ? { width: 0, height: 5 } : { width: 0, height: 0 },
                }}>
                  <View
                    style={{
                      bottom: focused ? 0 : 0,
                      height: 44,
                      width: 44,
                      borderRadius: 44,
                      backgroundColor: focused ? '#00B0FF' : 'white',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <AntDesign
                      name="pluscircleo"
                      style={[
                        { fontSize: Metrics.rfv(30), color: 'gray' },
                        focused && { fontSize: Metrics.rfv(30), color: 'white' },
                      ]}
                    />
                  </View>
                </View>
              );
            },
          }}
        />
        <Tab.Screen
          name="PublicEntertainment"
          component={PublicEntertainment}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View style={{
                  backgroundColor: '#FFFFFF',
                  height: 50,
                  width: 50,
                  borderRadius: 50,
                  position: 'absolute',
                  justifyContent: 'center',
                  alignItems: 'center',
                  bottom: focused ? 10 : 0,
                  shadowColor: '#00B0FF',
                  elevation: focused ? 6 : 0,
                  shadowOffset: focused ? { width: 0, height: 5 } : { width: 0, height: 0 },
                }}>
                  <View
                    style={{
                      bottom: focused ? 0 : 0,
                      height: 44,
                      width: 44,
                      borderRadius: 44,
                      backgroundColor: focused ? '#00B0FF' : 'white',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <MaterialIcons
                      name="headset-mic"
                      style={[
                        { fontSize: Metrics.rfv(25), color: 'gray',marginTop:0 ,},
                        focused && { fontSize: Metrics.rfv(25), color: 'white' },
                      ]}
                    />
                    {/* <MaterialIcons
                      name="mic"
                      style={[
                        { fontSize: Metrics.rfv(25), color: 'gray', },
                        focused && { fontSize: Metrics.rfv(25), color: 'white' },
                      ]}
                    /> */}
                  </View>
                </View>
              );
            },
          }}
        />
      
        <Tab.Screen
          name="PublicProfile"
          component={PublicProfile}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View style={{
                  backgroundColor: '#FFFFFF',
                  height: 50,
                  width: 50,
                  borderRadius: 50,
                  position: 'absolute',
                  justifyContent: 'center',
                  alignItems: 'center',
                  bottom: focused ? 10 : 0,
                  shadowColor: '#00B0FF',
                  elevation: focused ? 6 : 0,
                  shadowOffset: focused ? { width: 0, height: 5 } : { width: 0, height: 0 },
                }}>
                  <View
                    style={{
                      bottom: focused ? 0 : 0,
                      height: 44,
                      width: 44,
                      borderRadius: 44,
                      backgroundColor: focused ? '#00B0FF' : 'white',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <FontAwesome
                      user-circle
                      name="user-circle"
                      style={[
                        { fontSize: Metrics.rfv(25), color: 'gray' },
                        focused && { fontSize: Metrics.rfv(30), color: 'white' },
                      ]}
                    />
                  </View>
                </View>
              );
            },
          }}
        />
      </Tab.Navigator>
    </View>
  )
}
const styles = StyleSheet.create({

})
export default PublicBottomTabs;