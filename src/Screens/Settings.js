import { useNavigation } from '@react-navigation/native';
import React,{useState,useEffect} from 'react';
import { View, Text, SafeAreaView,TouchableOpacity,Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getUserProfileInfo, saveUserProfileInfo, saveUserType } from '../utils/AsyncStorageHelper';
import { useDispatch } from 'react-redux';
import { logout } from '../Redux/reducer/User';
import Metrics from '../Constants/Metrics';
import Loader from '../Components/Loader';
import { API_BASE_URL } from '../api/ApiClient';

const Settings = () => {
 const navigation=useNavigation()
 const dispatch = useDispatch()
 const [loading,setLoading]=useState(false)
 const[profileRes,setProfileRes]=useState({})

 const onLogoutPress = async (props) => {
    await saveUserType({})
     await saveUserProfileInfo({})
     dispatch(logout());
     navigation.navigate('Login')
 };

 const getProfile = async ()=>{
  const res = await getUserProfileInfo()
  // console.log(res.accessToken)
  setLoading(true)
  var myHeaders = new Headers();
  // myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${res.accessToken}`);
  var raw = "";

      const requestOptions = {
      method: 'GET',
      body: raw,
      headers: myHeaders,
      redirect: 'follow'
    };
  
    fetch(`${API_BASE_URL}/api/user/myProfile?privateMode=true`, requestOptions)
      .then(response => response.json())
      .then(result => {
        // console.log('profile res...',result.data)
        if(result && result.success == true){
          setProfileRes(result.data)
        setLoading(false)
        }
        setLoading(false)
      })
      .catch(error => {
        console.log('error', error)
      setLoading(false)
      });
  
    }

    useEffect(()=>{
      getProfile();
    },[])

  return (
    <SafeAreaView style={{}}>
      <Loader loading={loading}></Loader>
      <View>
        <Ionicons
            onPress={() => {
               navigation.goBack()
            }}
            style={{
              marginLeft:10,
            }}
            name={'arrow-back'}
            size={40}
            color={'black'}
          />
        </View>
          <View style={{margin:20,alignSelf:'center'}}>
           <TouchableOpacity style={{margin:10,padding:10,backgroundColor:'black',borderRadius:10,}} onPress={()=>{navigation.navigate('ProfileDetails',{profileRes:profileRes,getProfile:getProfile})}}>
            <Text style={{color:'white',fontSize:25,fontWeight:'bold',alignSelf:'center'}}>Edit Profile</Text>
           </TouchableOpacity>
           <TouchableOpacity style={{margin:10,padding:10,backgroundColor:'black',borderRadius:10,}} onPress={()=>{navigation.navigate('Help')}}>
            <Text style={{color:'white',fontSize:25,fontWeight:'bold',alignSelf:'center',}}>Help</Text>
           </TouchableOpacity>
           <TouchableOpacity style={{margin:10,padding:10,backgroundColor:'black',borderRadius:10,}} onPress={()=>{navigation.navigate('PrivateAbout')}}>
            <Text style={{color:'white',fontSize:25,fontWeight:'bold',alignSelf:'center',}}>About </Text>
           </TouchableOpacity>
          </View>
          <View style={{alignSelf:'center',marginTop: Metrics.rfv(200)}}>
                   <TouchableOpacity onPress={()=>{
                      Alert.alert("Logout", "Are you want Logout ?",
                      [
                        { text: "Cancel", onPress: () => { } },
                        { text: "Ok", onPress: () => onLogoutPress() }
                      ])
                   }}
                    style={{backgroundColor:'black',padding:10,borderRadius:5,width:150,}}>
                        <Text style={{alignSelf:'center',color:'white'}}>Logout</Text>
                   </TouchableOpacity>
                   </View>
    </SafeAreaView>
  );
}

export default Settings;
