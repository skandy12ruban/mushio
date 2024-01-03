import { View, Text, SafeAreaView, TouchableOpacity, Alert, TextInput, ScrollView, useColorScheme } from 'react-native'
import React, { useState } from 'react'
import { DrawerActions, useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Metrics from '../Constants/Metrics';
import { useDispatch } from 'react-redux';
import { clearusertype } from '../Redux/reducer/userType';
import { saveUserProfileInfo, saveUserType } from '../utils/AsyncStorageHelper';
import { logout } from '../Redux/reducer/User';
import { Switch } from 'react-native-paper';
import { MAIN_ROUTE } from '../routes/RouteConst';
const EditProfile = () => {
  const navigation = useNavigation()
  const theme = useColorScheme()
  const [name, setName] = useState('')
  const [phoneNo, setPhoneNo] = useState('')
  const [dob, setDob] = useState('')
  const [bio, setBio] = useState('')
  const [artist, setArtist] = useState('')
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const dispatch = useDispatch()

  const onLogoutPress = async (props) => {
    await saveUserType({})
    await saveUserProfileInfo({})
    dispatch(logout());
    navigation.navigate('Login')
  };

  const onToggleSwitch = () => {
    setIsSwitchOn(!isSwitchOn);
    if (!isSwitchOn) {

      dispatch(clearusertype());
      navigation.reset({
        index: 0,
        routes: [{ name: MAIN_ROUTE }],
      });
    }
  }

  return (
    <SafeAreaView style={{ width: '100%', backgroundColor: theme === 'dark' ? 'black' : 'white', flex: 1 }}>
      <View style={{ margin: 10, flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

          <Ionicons
            onPress={() => {
              navigation.goBack()
            }}
            style={{
              paddingRight: 5
            }}
            name={'arrow-back'}
            size={40}
            color={theme === 'dark' ? 'white' : 'black'}
          />
          <Text style={{ paddingLeft: 10, color: theme === 'dark' ? 'white' : 'black', fontWeight: 'bold', fontSize: 30 }}>{'Settings'}</Text>
        </View>
      </View>

      <View>
        <ScrollView>
          <View style={{ marginHorizontal: 20 }}>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical:10 }}>
                <Text style={{ color: theme === 'dark' ? 'white' : 'black', fontSize: 20, fontWeight: 'bold', alignSelf: 'flex-start' }}>Public Mode</Text>
                <Switch
                  style={{
                    transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }], alignSelf: 'flex-end'
                  }}
                  color='#00B0FF'
                  value={!isSwitchOn}
                  onValueChange={onToggleSwitch}
                />
              </View>

            </View>
            <TouchableOpacity onPress={() => { navigation.navigate('About') }}>
              <Text style={{ color: theme === 'dark' ? 'white' : 'black', fontSize: 20, fontWeight: 'bold', marginVertical: 10 }}>Privacy</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('Support') }}>
              <Text style={{ color: theme === 'dark' ? 'white' : 'black', fontSize: 20, fontWeight: 'bold', marginVertical: 10 }}>Help</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
              Alert.alert("Logout", "Are you want Logout ?",
                [
                  { text: "Cancel", onPress: () => { } },
                  { text: "Ok", onPress: () => onLogoutPress() }
                ])
            }}
              style={{
                backgroundColor: theme === 'dark' ? 'white' : 'black', padding: 10, borderRadius: 5, marginVertical: 20
              }}>
              <Text style={{ alignSelf: 'center', color: theme === 'dark' ? 'black' : 'white' }}>Logout</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default EditProfile