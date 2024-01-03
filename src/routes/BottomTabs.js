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
import { Categories, Home, Profile, Graphs } from '../Screens';
import { HOME, GRAPHS } from './RouteConst';
import { useColorScheme } from 'react-native';

const { width, height } = Dimensions.get('window');
const Tab = createBottomTabNavigator();

const BottomTabs = (props) => {
  const theme = useColorScheme()

  const tabIcon = (icon, focused) => {

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
            name={{ icon }}
            style={[
              { fontSize: Metrics.rfv(25), color: 'white', backgroundColor: 'black', borderRadius: 44, padding: 5 },
              focused && { fontSize: Metrics.rfv(30), color: 'white', },
            ]}
          />
        </View>
      </View>
    )

  }


  return (
    <View style={{ flex: 1, backgroundColor: theme === 'dark' ? 'black' : '#f6f6f6' }}>
      <Tab.Navigator
        initialRouteName={HOME}
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarItemStyle: {
            borderRadius: 200,
          },
          tabBarStyle: {
            backgroundColor: theme === 'dark' ? 'black' : '#f6f6f6',
            borderRadius: 5,
            marginHorizontal: 10,
            height: 54,
          },
          tabBarActiveTintColor: '#000000',
        }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ focused }) => tabIcon('home', focused),
          }}
        />
        <Tab.Screen
          name="Categories"
          component={Categories}
          options={{
            tabBarIcon: ({ focused }) => tabIcon('pluscircleo', focused)
          }}
        />
        <Tab.Screen
          name="Graphs"
          component={Graphs}
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
                    <Octicons
                      name="graph"
                      style={[
                        { fontSize: Metrics.rfv(25), color: 'white', backgroundColor: 'black', borderRadius: 44, padding: 5 },
                        focused && { fontSize: Metrics.rfv(25), color: 'white' },
                      ]}
                    />
                  </View>
                </View>
              );
            },
          }}
        />

        <Tab.Screen
          name="Profile"
          component={Profile}
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
                        { fontSize: Metrics.rfv(25), color: 'white', backgroundColor: 'black', borderRadius: 44, padding: 5 },
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
export default BottomTabs;