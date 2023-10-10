import { View, Text,Alert,TouchableOpacity,SafeAreaView,Image } from 'react-native'
import React,{useState} from 'react'
import Header from '../Components/Header'
import { useDispatch } from 'react-redux'
import { logout } from '../Redux/reducer/User'
import { useNavigation } from '@react-navigation/native'
import { getUserProfileInfo, saveUserProfileInfo } from '../utils/AsyncStorageHelper'
import { API_BASE_URL } from '../api/ApiClient'
import {  Switch } from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';
import { Card } from 'react-native-paper'

const Profile = () => {
  const [isSwitchOn, setIsSwitchOn] = useState(false);
    const dispatch = useDispatch()
    const navigation= useNavigation()

    const onToggleSwitch = () => {
      setIsSwitchOn(!isSwitchOn);
   }
 

  const onLogoutPress = async () => {
    const res= await getUserProfileInfo()
 
   await saveUserProfileInfo({})
    dispatch(logout());
    navigation.navigate('Login')
  };



  return (
    <SafeAreaView>
      {/* <Header bellIcon={true}/> */}
      <View style={{marginTop:10}}>
          <Switch
              style={{
                marginRight: 10,
              }}
              color='green'
              value={isSwitchOn}
              onValueChange={onToggleSwitch}
            />
      </View>
      <View style={{alignSelf:'flex-end'}}>
                <Entypo
                  name="menu"
                   size={40}
                   style={{marginRight: 20,color:'black'}}
                onPress={()=>{navigation.navigate('ProfileDetails')}}   
                 />
      </View>
       
       <Card style={{backgroundColor:'#00B0FF',alignSelf:'center',width:'80%'}}>
            <View style={{flexDirection:'row',justifyContent:'space-between',padding:10}}>
              <View style={{marginTop:10}}>
              <Text style={{color:'white',alignSelf:'center',}}>Mushio Scores you</Text>
              <Text style={{color:'white',fontWeight:'bold',fontSize:30,alignSelf:'center',}}>76</Text>
              </View>
           
            <Image
          style={{
             width:50,height:50,margin:10,borderRadius:10,
            }}
           source={require('../assets/images/image3.jpg')}
         />
            </View>
            <View style={{marginBottom:10,}}>
              <Text style={{color:'white',alignSelf:'center',fontSize:15}}>you are a happy person,
              <Text style={{color:'blue',fontWeight:'bold',fontSize:20,marginTop:10}}> Satish</Text></Text>
            </View>
       </Card>
       <View style={{marginTop:10,alignSelf:'center'}}>
       <TouchableOpacity  onPress={()=>{
         Alert.alert("Logout", "Are you want Logout ?",
         [
           { text: "Cancel", onPress: () => { } },
           { text: "Ok", onPress: () => onLogoutPress() }
         ])
       }}
       style={{padding:10,backgroundColor:'#FF7F7F',width:100,borderRadius:5,margin:10}}>
           <Text style={{color:'white',alignSelf:'center'}}>Logout</Text>
       </TouchableOpacity>
       </View>
          
    </SafeAreaView>
  )
}

export default Profile