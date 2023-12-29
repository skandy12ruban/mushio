import { View, Text,SafeAreaView,Image,TouchableOpacity,useColorScheme } from 'react-native'
import React,{useState,useEffect} from 'react'
import {  Switch } from 'react-native-paper';
import { MAIN_ROUTE } from '../routes/RouteConst';
import { DrawerActions, useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { clearusertype } from '../Redux/reducer/userType';
import { useDispatch } from 'react-redux';
import { getUserProfileInfo, saveUserType } from '../utils/AsyncStorageHelper';
import Entypo from 'react-native-vector-icons/Entypo';
import Loader from '../Components/Loader';
import Metrics from '../Constants/Metrics';
import TopTabs from '../routes/TopTabs';
import LinearGradient from 'react-native-linear-gradient'
import { API_BASE_URL } from '../api/ApiClient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import UserTopTabs from '../routes/UserTopTabs';

const PublicProfile1 = (props) => {
const navigation= useNavigation()
const isFocused = useIsFocused()
const dispatch=useDispatch()
const route=useRoute();
const {Token,userProfile}=route.params;
// console.log('Token,userProfile',Token,userProfile)
const theme = useColorScheme();
const [isSwitchOn, setIsSwitchOn] = useState(false);
const[loading,setLoading]=useState(false)
const[artistArray,setArtistArray]=useState([])
const[audienceArray,setAudienceArray]=useState([])
const[profileRes,setProfileRes]=useState()
const [profileimg,setProfileImg]=useState(require('../assets/images/image3.jpg'))

    const onToggleSwitch = () => {
        setIsSwitchOn(!isSwitchOn);
        if(!isSwitchOn){
           
             dispatch(clearusertype());
          navigation.reset({
            index: 0,
            routes: [{name: MAIN_ROUTE}],
          });
        }
     }

     const getArtists = async ()=>{
      const res = await getUserProfileInfo()
      // console.log(res.accessToken)
      setLoading(true)
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${Token}`);
          
          const requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };
        
        fetch(`${API_BASE_URL}/api/user/connectedUsers?userType=artist`, requestOptions)
          .then(response => response.json())
          .then(result => {
            console.log('artist res',result.data)
            if(result && result.success == true){
            setArtistArray(result.data.list)
            setLoading(false)
            }
            setLoading(false)
          })
          .catch(error => {
            console.log('error', error)
          setLoading(false)
          });
        }
       
        const getAudience = async ()=>{
          const res = await getUserProfileInfo()
          // console.log(res.accessToken)
          setLoading(true)
          var myHeaders = new Headers();
          myHeaders.append("Authorization", `Bearer ${Token}`);
              
              const requestOptions = {
              method: 'GET',
              headers: myHeaders,
              redirect: 'follow'
            };
            
            fetch(`${API_BASE_URL}/api/user/connectedUsers?userType=audience`, requestOptions)
              .then(response => response.json())
              .then(result => {
                console.log('audience res',result.data)
                if(result && result.success == true){
                setAudienceArray(result.data.list)
                setLoading(false)
                }
                setLoading(false)
              })
              .catch(error => {
                console.log('error', error)
              setLoading(false)
              });
            }
           
            const getProfile = async ()=>{
              const res = await getUserProfileInfo()
              // console.log(res.accessToken)
              setLoading(true)
              var myHeaders = new Headers();
              // myHeaders.append("Content-Type", "application/json");
              myHeaders.append("Authorization", `Bearer ${Token}`);
                  
                  const requestOptions = {
                  method: 'GET',
                  headers: myHeaders,
                  redirect: 'follow'
                };
              
                fetch(`${API_BASE_URL}/api/user/myProfile`, requestOptions)
                  .then(response => response.json())
                  .then(result => {
                    console.log('profile res...',result.data)
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
          getArtists()
          getAudience()
          getProfile()
        },[isFocused])

  return (
    <SafeAreaView style={{alignSelf:'center',width:'100%',flex:1,backgroundColor:theme === 'dark' ? 'white':'',}}>
         <Loader loading={loading}></Loader>
       
         <View style={{flexDirection:'row',justifyContent:'space-between'}}>
          <View>
        <TouchableOpacity style={{backgroundColor:'white', width:Metrics.rfv(60),height:Metrics.rfv(60),borderRadius:Metrics.rfv(10),}}
        onPress={()=>{

          }}>
            <Ionicons
            onPress={() => {
               navigation.goBack()
            }}
            style={{
             
              margin:5
            }}
            name={'arrow-back'}
            size={40}
            color={'black'}
          />
         </TouchableOpacity>
      </View>
          <View style={{marginTop:Metrics.rfv(10)}}>
          <Switch
              style={{
                transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }],alignSelf:'flex-end',marginRight:10
              }}
              color='#00B0FF'
              value={!isSwitchOn}
              onValueChange={onToggleSwitch}
            />
               <Entypo
                  name="menu"
                   size={40}
                   style={{color:'black'}}
                 onPress={()=>{ navigation.navigate('AppDrawer')}} 
                  // onPress={()=>{ navigation.dispatch(DrawerActions.openDrawer());}}
                 /> 
      </View>
      </View>
      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
      <View style={{marginLeft:Metrics.rfv(20)}}>
      <TouchableOpacity style={{backgroundColor:'white', width:Metrics.rfv(50),height:Metrics.rfv(50),borderRadius:30,}}
        onPress={()=>{
          navigation.navigate('MyProfile',{profileRes:profileRes,getProfile:getProfile})
          }}>
            
        {profileRes && profileRes.profileImage != '' ?(
        <Image
          style={{
             width:Metrics.rfv(40),height:Metrics.rfv(40),margin:5,borderRadius:30,
            }}
           source={{uri:profileRes.profileImage }}
         />):(<Image
          style={{
             width:Metrics.rfv(40),height:Metrics.rfv(40),margin:5,borderRadius:30,
            }}
           source={require('../assets/images/profileImg.png')}
         />)}

         </TouchableOpacity>
         <Text style={{color:'black',fontWeight:'bold'}}>{profileRes && profileRes.alias}</Text>
         <Text style={{color:'black'}}>{profileRes && profileRes.phile}</Text>
         <Text style={{color:'black'}}>{profileRes && profileRes.about}</Text>
         {/* <Text style={{color:'black'}}>{profileRes && profileRes.userType}</Text> */}
         <Text style={{color:'black'}}>{profileRes && profileRes.artistType}</Text>
      </View>
      <View style={{marginRight:Metrics.rfv(20),marginTop:10}}>
        <TouchableOpacity onPress={()=>{navigation.navigate('Cards')}}>
            <Text style={{color:'black',fontWeight:'bold',fontSize:20}}>0</Text>
            <Text style={{color:'black',fontWeight:'bold'}}>Cards</Text>
            </TouchableOpacity>
        </View>
        
        <View style={{marginTop:10}}>
        <TouchableOpacity onPress={()=>{navigation.navigate('UserArtist',{Token:Token,userProfile:userProfile})}}>
            <Text style={{color:'black',fontWeight:'bold',fontSize:20}}> {artistArray.length}</Text>
            <Text style={{color:'black',fontWeight:'bold'}}>Artists</Text>
            </TouchableOpacity>
        </View>
        <View style={{marginTop:10,marginRight:10}}>          
          <TouchableOpacity onPress={()=>{navigation.navigate('UserAudience',{Token:Token,userProfile:userProfile})}}>
            <Text style={{color:'black',fontWeight:'bold',fontSize:20}}>{audienceArray.length}</Text>
            <Text style={{color:'black',fontWeight:'bold'}}>Audience</Text>
           </TouchableOpacity>
        </View>
      </View>
    <View style={{marginTop:10,flex:1}}>
    <UserTopTabs  
    Token={Token}
    userProfile={userProfile}
    {...props}
    />
    </View>
    

    </SafeAreaView>
  )
}

export default PublicProfile1