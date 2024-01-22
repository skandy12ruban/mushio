import { useEffect, useState } from 'react';
import { View, Dimensions, StyleSheet, useColorScheme, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import messaging from '@react-native-firebase/messaging';
import { useDispatch, useSelector } from 'react-redux';
import PublicSearchScreen from '../PublicScreens/PublicSearchScreen';
import PublicCategories from '../PublicScreens/PublicCategories';
import PublicHome from '../PublicScreens/PublicHome';
import PublicProfile from '../PublicScreens/PublicProfile';
import Entertainment from '../PublicScreens/Entertainment';
import DeviceInfo from 'react-native-device-info';
import { getAPI, putAPI } from '../api/api-utils';
import { API_BASE_URL } from '../api/ApiClient';
import { setProfile } from '../Redux/reducer/User';
import { getUserProfileInfo } from '../utils/AsyncStorageHelper';
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
  const userData = useSelector(state => state.User.userData);
  const [userProfileData, setUserProfileData] = useState(null);

  const dispatch = useDispatch();
  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    let deviceId = DeviceInfo.getUniqueId();

    if (enabled) {
      // User has authorized
      let fcmToken = await messaging().getToken();
      return {
        'deviceId': deviceId._j,
        'deviceToken': fcmToken,
        'deviceType': Platform.OS === 'android' ? 'A' : 'I',
        'userId': userData._id
      }
    } else {
      return {
        'deviceId': deviceId._j,
        'deviceType': Platform.OS === 'android' ? 'A' : 'I',
        'userId': userData._id
      }
    }
  };


  useEffect(() => {
    getAPI(`${API_BASE_URL}/api/user/myProfile`).then((profileData)=>{
      let profile = profileData.data;
      dispatch(setProfile(profile))    
      requestUserPermission().then(deviceInfo => {
        let url = `${API_BASE_URL}/api/userAuth/storeDeviceToken`
        let promise$ = null;
        if (profile.deviceId && profile.deviceToken) {
          if (profile.deviceId !== deviceInfo.deviceId || profile.deviceToken !== deviceInfo.deviceToken) {
            promise$ = putAPI(url, deviceInfo)
          }
        } else {
          promise$ = putAPI(url, deviceInfo)
        }
  
        if (promise$) {
          promise$.then((res) => {
            if (res) {
              let cloned_profile = _.cloneDeep(profile);
              dispatch(setProfile(Object.assign(cloned_profile, deviceInfo)))
            }
          }).catch((err)=>{
            console.error(err)
          })
        }
        // 
      });
    })
  }, [])

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