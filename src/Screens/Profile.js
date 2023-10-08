import { View, Text,Alert } from 'react-native'
import React from 'react'
import Header from '../Components/Header'
import { TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux'
import { logout } from '../Redux/reducer/User'
import { useNavigation } from '@react-navigation/native'
import { getMobileNumber, getUserProfileInfo, saveUserProfileInfo } from '../utils/AsyncStorageHelper'
import { API_BASE_URL } from '../api/ApiClient'

const Profile = () => {
    const dispatch = useDispatch()
    const navigation= useNavigation()

  const onLogoutPress = async () => {
    const res= await getUserProfileInfo()
    const res1 = await getMobileNumber()
    console.log('profile info',res,res1)
    var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", "Basic Og==");
var raw = JSON.stringify({
  "session_id": `${res.userId}`,
  "mobile_number": `${res1}`,
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};
    console.log(raw)
    fetch(`${API_BASE_URL}/otp/logout`, requestOptions)
     .then(response => response.text())
      .then(result => console.log('logout res',result))
      .catch(error => console.log('error', error));
   await saveUserProfileInfo({})
    dispatch(logout());
    navigation.navigate('SignIn')
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