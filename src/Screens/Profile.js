import { View, Text,Alert,TouchableOpacity } from 'react-native'
import React from 'react'
import Header from '../Components/Header'
import { useDispatch } from 'react-redux'
import { logout } from '../Redux/reducer/User'
import { useNavigation } from '@react-navigation/native'
import { getUserProfileInfo, saveUserProfileInfo } from '../utils/AsyncStorageHelper'
import { API_BASE_URL } from '../api/ApiClient'

const Profile = () => {
    const dispatch = useDispatch()
    const navigation= useNavigation()

  const onLogoutPress = async () => {
    const res= await getUserProfileInfo()
 
   await saveUserProfileInfo({})
    dispatch(logout());
    navigation.navigate('Login')
  };

  return (
    <View>
      <Header bellIcon={true}/>
       <TouchableOpacity  onPress={()=>{
         Alert.alert("Logout", "Are you want Logout ?",
         [
           { text: "Cancel", onPress: () => { } },
           { text: "Ok", onPress: () => onLogoutPress() }
         ])
       }}
       style={{padding:10,backgroundColor:'#41bab0',width:100,borderRadius:5,margin:10}}>
           <Text style={{color:'white'}}>Logout</Text>
       </TouchableOpacity>
      <Text>Profile</Text>
    </View>
  )
}

export default Profile