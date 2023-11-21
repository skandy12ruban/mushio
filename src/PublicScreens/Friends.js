import { View, Text, SafeAreaView,FlatList,TouchableOpacity,Image } from 'react-native'
import React,{useState,useEffect} from 'react'

import Loader from '../Components/Loader'
import { Card } from 'react-native-paper'
import Metrics from '../Constants/Metrics'
import Header from '../Components/Header'
import { getUserProfileInfo } from '../utils/AsyncStorageHelper'
import { API_BASE_URL } from '../api/ApiClient'
import { useRoute } from '@react-navigation/native'

const Friends = () => {
  const route=useRoute()
  const {artistArray}=route.params
    const [loading,setLoading]=useState(false)
    // const[artistArray,setArtistArray]=useState([])
    const data=[
        {id:1,image:require('../assets/images/profileImg.png'),name:'Satish',status:'connected'},
        {id:2,image:require('../assets/images/profileImg.png'),name:'Bharath',status:'connected'},
        {id:3,image:require('../assets/images/profileImg.png'),name:'Vamsi',status:'not connected'},
        {id:4,image:require('../assets/images/profileImg.png'),name:'Srikanth',status:'Connected'},
        {id:5,image:require('../assets/images/profileImg.png'),name:'Santhosh',status:'not connected'},
        {id:6,image:require('../assets/images/profileImg.png'),name:'Kiran',status:'not connected'},
      ]
    const Item= ({item})=>{
      return(
        <View style={{margin:10,flexDirection:'row',justifyContent:'space-between',borderWidth:1,
        borderColor:'black',borderRadius:5,padding:5}}>
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
         <Text style={{paddingLeft:20,color:'black',fontWeight:'bold',marginTop:5,fontSize:20}}>{item.name}</Text>
         </View>
         <View>
         <TouchableOpacity style={{padding:10,backgroundColor:'black',borderRadius:10,width:130}}>
         <Text style={{color:'white',alignSelf:'center'}}>{'connected'}</Text>
         </TouchableOpacity>
         </View>
         
        
        </View>
      )
    }

    const getArtists = async ()=>{
    const res = await getUserProfileInfo()
    console.log(res.accessToken)
    setLoading(true)
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${res.accessToken}`);
        
        const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      
      fetch(`${API_BASE_URL}/api/user/connectedUsers?userType=artist`, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result.data.list)
          if(result && result.success == true){
          setArtistArray(result.data.list)
          setLoading(false)
          }
        })
        .catch(error => {
          console.log('error', error)
        setLoading(false)
        });
      }
      
      useEffect(()=>{
        // getArtists()
      },[])

  return (
    <SafeAreaView style={{alignSelf:'center',width:'100%'}}>
    <Header backIcon={true} name1={'Artists'}/>
<Loader loading={loading}></Loader>
 <FlatList
 data={artistArray}
 renderItem={Item}
 keyExtractor={item =>item._id}
 />
</SafeAreaView>
  )
}

export default Friends