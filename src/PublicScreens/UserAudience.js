import { View, Text, SafeAreaView,FlatList,TouchableOpacity,Image,useColorScheme } from 'react-native'
import React,{useState,useEffect} from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Loader from '../Components/Loader'
import { Card } from 'react-native-paper'
import Metrics from '../Constants/Metrics'
import Header from '../Components/Header'
import { getUserProfileInfo } from '../utils/AsyncStorageHelper'
import { API_BASE_URL } from '../api/ApiClient'
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native'

const UserAudience = () => {
  const route=useRoute()
  const navigation=useNavigation()
  const[loading,setLoading]=useState(false)
  const {Token,userProfile}=route.params
  console.log("Token,userProfile",Token,userProfile)
  const[audienceArray,setAudienceArray]=useState([])
  const isFocused=useIsFocused()
  const theme = useColorScheme();
  const[requestArray,setRequestArray]=useState([])

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

  const Item= ({item})=>{
    return(
      <View style={{margin:10,flexDirection:'row',justifyContent:'space-between',borderWidth:1,
      borderColor:theme === 'dark' ? 'white':'black',borderRadius:5,padding:5}}>
       <View style={{flexDirection:'row',justifyContent:'space-between'}}>
       <TouchableOpacity style={{backgroundColor:'white', width:Metrics.rfv(35),height:Metrics.rfv(35),borderRadius:Metrics.rfv(30),}}
      onPress={()=>{
      //   setProfileImg()
        }}>
        <Image
        style={{
           width:Metrics.rfv(30),height:Metrics.rfv(30),margin:Metrics.rfv(3),borderRadius:Metrics.rfv(30),
          }}
         source={{uri:item.profileImage}}
       />
       </TouchableOpacity>
       <Text style={{paddingLeft:20,color:theme === 'dark' ? 'white':'black',fontWeight:'bold',marginTop:5,fontSize:20}}>{item.name}</Text>
       </View>
       <View>
       <TouchableOpacity style={{padding:10,backgroundColor:theme === 'dark' ? 'white':'black',borderRadius:10,width:130}}>
       <Text style={{color:theme === 'dark' ? 'black':'white',alignSelf:'center'}}>{'connected'}</Text>
       </TouchableOpacity>
       </View>
       
      
      </View>
    )
  }
  const Item1= ({item})=>{
    return(
      <View style={{margin:10,flexDirection:'row',justifyContent:'space-between',borderWidth:1,
      borderColor:theme === 'dark' ? 'white':'black',borderRadius:5,padding:5}}>
       <View style={{flexDirection:'row',justifyContent:'space-between'}}>
       <TouchableOpacity style={{backgroundColor:'white', width:Metrics.rfv(35),height:Metrics.rfv(35),borderRadius:Metrics.rfv(30),}}
      onPress={()=>{
      //   setProfileImg()
        }}>
        <Image
        style={{
           width:Metrics.rfv(30),height:Metrics.rfv(30),margin:Metrics.rfv(3),borderRadius:Metrics.rfv(30),
          }}
         source={{uri:item.profileImage}}
       />
       </TouchableOpacity>
       <Text style={{paddingLeft:20,color:theme === 'dark' ? 'black':'white',fontWeight:'bold',marginTop:5,fontSize:20}}>{item.name}</Text>
       </View>
       <View style={{flexDirection:'row',justifyContent:'space-between'}}>
       <TouchableOpacity style={{padding:5,backgroundColor:'blue',borderRadius:10,width:70}}
       onPress={()=>{
        AcceptRequest(item.connectionRequestId)
       }}
       >
       <Text style={{color:'white',alignSelf:'center'}}>{'Accept'}</Text>
       </TouchableOpacity>
       <TouchableOpacity style={{padding:5,backgroundColor:theme === 'dark' ? 'white':'black',borderRadius:10,marginLeft:10,width:70}}
       onPress={()=>{
        RejectRequest(item.connectionRequestId)
       }}
       >
       <Text style={{color:theme === 'dark' ? 'black':'white',alignSelf:'center'}}>{'Reject'}</Text>
       </TouchableOpacity>
       </View>
       
      
      </View>
    )
  }

     const AcceptRequest=async(id)=>{
        const res = await getUserProfileInfo()
        console.log(res.accessToken)
          setLoading(true)
          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          myHeaders.append("Authorization", `Bearer ${Token}`);
          var raw = JSON.stringify({
            "requestId": `${id}`
          });
          
          var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
          };
       console.log(requestOptions)
        fetch(`${API_BASE_URL}/api/user/acceptRequest`, requestOptions)
          .then(response => response.json())
          .then(result => {
            console.log(' request result',result)
            getRequests()
            getAudience()
            // if(result && result.success == true){
            //  console.log(result.data.status)
            // // setSearchQuery(text)
            // setLoading(false)
            // }
            setLoading(false)
          })
          .catch(error => {
            console.log('error', error)
            setLoading(false)
          });
      }

      const RejectRequest=async(id)=>{
        const res = await getUserProfileInfo()
        console.log(res.accessToken)
          setLoading(true)
          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          myHeaders.append("Authorization", `Bearer ${Token}`);
          var raw = JSON.stringify({
            "requestId": `${id}`
          });
          
          var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
          };
       console.log(requestOptions)
        fetch(`${API_BASE_URL}/api/user/deleteRequest`, requestOptions)
          .then(response => response.json())
          .then(result => {
            console.log(' request result',result)
            getRequests()
            getAudience()
            setLoading(false)
            // if(result && result.success == true){
            
            //  console.log(result.data.status)
            // // setSearchQuery(text)
            // setLoading(false)
            // }
           
          })
          .catch(error => {
            console.log('error', error)
            setLoading(false)
          });
      }

  const getRequests = async ()=>{
    const res = await getUserProfileInfo()
    console.log(res.accessToken)
    setLoading(true)
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${Token}`);
        
        const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      
      fetch(`${API_BASE_URL}/api/user/pendingConnections?userType=audience`, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result.data.list)
          if(result && result.success == true){
          setRequestArray(result.data.list)
          getAudience()
          setLoading(false)
          }
        })
        .catch(error => {
          console.log('error', error)
        setLoading(false)
        });
      }
      
      useEffect(()=>{
        getRequests()
      },[isFocused])


  return (
    <SafeAreaView style={{alignSelf:'center',width:'100%',backgroundColor:theme === 'dark' ? 'black':'white',flex:1}}>
    {/* <Header backIcon={true} name1={'Audience'}/> */}
      <Loader loading={loading}></Loader>
      <View style={{flexDirection:'row'}}>
   <Ionicons
            onPress={() => {
               navigation.goBack()
            }}
            style={{
             
              margin:5
            }}
            name={'arrow-back'}
            size={35}
            color={theme === 'dark' ? 'white':'black'}
          />
          <Text style={{color:theme === 'dark' ? 'white':'black',fontWeight:'bold',fontSize:20,marginTop:10,marginLeft:10}}>{'Audience'}</Text>
</View>
      <View>
<Text style={{fontWeight:'bold',fontSize:20,color:theme === 'dark' ? 'white':'black',margin:5,marginLeft:40}}> Connection Requests ({requestArray.length})</Text>
 <FlatList
 data={requestArray}
 renderItem={Item1}
 keyExtractor={item =>item._id}
 />
</View>
 <View style={{alignSelf:'flex-end',marginRight:20}}>
  <Text style={{color:'blue'}}>See all ({requestArray.length})</Text>
 </View>
<View>
<Text style={{fontWeight:'bold',fontSize:20,color:theme === 'dark' ? 'white':'black',margin:5,marginLeft:40}}> All Audience ({audienceArray.length})</Text>
 <FlatList
 data={audienceArray}
 renderItem={Item}
 keyExtractor={item =>item._id}
 />
 </View>
</SafeAreaView>
  )
}

export default UserAudience