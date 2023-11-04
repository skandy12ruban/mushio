import { View, Text,Alert,TouchableOpacity,SafeAreaView,Image } from 'react-native'
import React,{useState} from 'react'
import Header from '../Components/Header'
import { useDispatch } from 'react-redux'
import { logout } from '../Redux/reducer/User'
import { useNavigation } from '@react-navigation/native'
import { getUserProfileInfo, saveUserProfileInfo, saveUserType } from '../utils/AsyncStorageHelper'
import { API_BASE_URL } from '../api/ApiClient'
import {  Switch } from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';
import { Card } from 'react-native-paper'
import { PUBLIC_MAIN_ROUTE } from '../routes/PublicRouteConts'
import { setusertype } from '../Redux/reducer/userType'
import LinearGradient from 'react-native-linear-gradient'

const Profile = () => {
  const [isSwitchOn, setIsSwitchOn] = useState(false);
    const dispatch = useDispatch()
    const navigation= useNavigation()

    const onToggleSwitch = () => {
      setIsSwitchOn(!isSwitchOn);

      if(!isSwitchOn){
        const UserType= {"userType":'Public'}
        saveUserType(UserType)
        dispatch(setusertype(UserType))
        navigation.reset({
          index: 0,
          routes: [{name: PUBLIC_MAIN_ROUTE}],
        });
      }
   }
 

  return (
    <SafeAreaView>
      {/* <Header bellIcon={true}/> */}
      <LinearGradient
      colors={['#cdffd8', '#94b9ff' ]}
      style={{flex:0,width:"100%",height:'100%'}}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
    >
      <View style={{marginTop:10}}>
          <Switch
              style={{
                marginRight: 10,
              }}
              color='#00B0FF'
              value={isSwitchOn}
              onValueChange={onToggleSwitch}
            />
      </View>
      <View style={{alignSelf:'flex-end'}}>
                <Entypo
                  name="menu"
                   size={40}
                   style={{marginRight: 20,color:'black'}}
                onPress={()=>{navigation.navigate('PrivateAppDrawer')}}   
                 />
      </View>
       
       <Card style={{backgroundColor:'white',alignSelf:'center',width:'80%'}}>
       
            <View style={{flexDirection:'row',justifyContent:'space-between',padding:5}}>
              <View style={{alignSelf:'center',}}>
              <Text style={{color:'black',fontWeight:'bold',fontSize:25,margin:5,alignSelf:'center',}}>Status</Text>
              <Text style={{color:'black',alignSelf:'center',fontWeight:'bold',marginLeft:20}}>Sehalo Scores you</Text>
              <Text style={{color:'white',fontWeight:'bold',fontSize:25,alignSelf:'center',backgroundColor:'black',borderRadius:50,padding:5}}>76</Text>
              </View>
              <View>
            <Image
          style={{
             width:80,height:80,borderRadius:10,margin:10
            }}
           source={require('../assets/images/image3.jpg')}
         />
         </View>
            </View>
            <View style={{marginBottom:10,}}>
              <Text style={{color:'black',alignSelf:'center',fontSize:15}}>you are a happy person,
              <Text style={{color:'#00B0FF',fontWeight:'bold',fontSize:20,marginTop:10}}> Satish</Text></Text>
            </View>
       </Card>
       <View style={{marginTop:10,alignSelf:'center'}}>
       {/* <TouchableOpacity  onPress={()=>{
         Alert.alert("Logout", "Are you want Logout ?",
         [
           { text: "Cancel", onPress: () => { } },
           { text: "Ok", onPress: () => onLogoutPress() }
         ])
       }}
       style={{padding:10,backgroundColor:'#FF7F7F',width:100,borderRadius:5,margin:10}}>
           <Text style={{color:'white',alignSelf:'center'}}>Logout</Text>
       </TouchableOpacity> */}
       </View>
     </LinearGradient>
    </SafeAreaView>
  )
}

export default Profile