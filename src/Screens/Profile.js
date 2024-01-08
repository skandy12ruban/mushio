import { View, Text,Alert,TouchableOpacity,SafeAreaView,Image,FlatList } from 'react-native'
import React,{useEffect, useState} from 'react'
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
import Loader from '../Components/Loader'

const Profile = () => {
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [userInfo,setUserInfo]=useState({})
  const [loading,setLoading]=useState(false)
  const[scoreRes,setScoreRes]=useState({})
    const dispatch = useDispatch()
    const navigation= useNavigation()

    const data=[
      {id:1,color:'#FFB6C1',image:require('../assets/images/image1.jpg'),name:'SuperHappy'},
      {id:2,color:'#95D1F4',image:require('../assets/images/image3.jpg'),name:'Happy'},
      {id:3,color:'#67a596',image:require('../assets/images/image2.jpg'),name:'Neutral'},
      {id:4,color:'#FFD75A',image:require('../assets/images/image4.jpg'),name:'Sad'},
      {id:5,color:'#FF7F7F',image:require('../assets/images/image5.jpg'),name:"VerySad"},
    ]

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
 
   const MyScore = async ()=>{
    const res = await getUserProfileInfo()
    setUserInfo(res)
    // 
    setLoading(true)
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${res.accessToken}`);
  
  var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
  };

  fetch(`${API_BASE_URL}/api/private/moment/myProfile`, requestOptions)
  .then(response => response.json())
  .then(result => {
    
    if(result && result.success == true){
    setScoreRes(result.data)
      setLoading(false)
    }
    setLoading(false)
  })
  .catch(error => {
    
    setLoading(false)
  });
  }

  useEffect(()=>{
   MyScore()
  },[])

  return (
    <SafeAreaView>
      {/* <Header bellIcon={true}/> */}
      <Loader loading={loading}></Loader>
      {/* <LinearGradient
      colors={['#cdffd8', '#94b9ff' ]}
      style={{flex:0,width:"100%",height:'100%'}}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
    > */}
      <View style={{marginTop:10}}>
          <Switch
              style={{
               transform: [{ scaleX: 1.5 }, { scaleY: 1.3 }],alignSelf:'flex-end',marginRight:10,marginTop:10
              }}
              color='#00B0FF'
              value={isSwitchOn}
              onValueChange={onToggleSwitch}
            />
      </View>
      {/* <View style={{alignSelf:'flex-end',marginTop:5}}>
                <Entypo
                  name="menu"
                   size={40}
                   style={{marginRight: 20,color:'black'}}
                onPress={()=>{navigation.navigate('Settings')}}   
                 />
      </View> */}
       
       <Card style={{backgroundColor:'white',alignSelf:'center',width:'75%',marginTop:150}}>
       
            <View style={{flexDirection:'row',padding:5,justifyContent:'space-around'}}>
              <View style={{}}>
              <Text style={{color:'#0058aa',fontSize:25,margin:5,alignSelf:'center',fontFamily:'Montserrat-Bold',marginLeft:30}}>Status</Text>
              <Text style={{color:'black',alignSelf:'center',fontWeight:'bold',marginLeft:30}}>Halo scores you</Text>
              <Text style={{color:'white',fontWeight:'bold',fontSize:25,alignSelf:'center',backgroundColor:'black',borderRadius:200,
              padding:10,marginTop:10,marginLeft:20}}>{scoreRes.averageMaxScore != undefined ? scoreRes.averageMaxScore : 0}</Text>
              </View>
              <View>
              <FlatList
                    data={data}
                    keyExtractor={item => item.id}
                    renderItem={(e1)=>{
                     let name = e1.item.name ==  scoreRes.emoji ? e1.item : null;
                      
                      if(name != null){
                      return(
                        <TouchableOpacity style={{backgroundColor: name.color ,width:70,height:70,borderRadius:5,marginTop:50}} >
                        <Image
                          style={{
                          width:60,height:60,borderRadius:5,margin:5
                         }}
                        source={ name.image}
                      />
                     </TouchableOpacity> 
                      )
                        }
                    }}
                    />
                    </View>
            </View>
            <View style={{marginBottom:10,}}>
              <Text style={{color:'black',alignSelf:'center',fontSize:15,fontWeight:'bold',}}>you are a happy person,
              <Text style={{color:'#0058aa',fontSize:25,fontFamily:'Montserrat-Bold',}}> {userInfo.name}</Text></Text>
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
     {/* </LinearGradient> */}
    </SafeAreaView>
  )
}

export default Profile