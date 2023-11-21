import { View, Text, SafeAreaView,FlatList,TouchableOpacity,Image } from 'react-native'
import React,{useState,useEffect} from 'react'

import Loader from '../Components/Loader'
import { Card } from 'react-native-paper'
import Metrics from '../Constants/Metrics'
import Header from '../Components/Header'
import { getUserProfileInfo } from '../utils/AsyncStorageHelper'
import { API_BASE_URL } from '../api/ApiClient'
import { useRoute } from '@react-navigation/native'

const Posts = () => {
  const route=useRoute()
  const[loading,setLoading]=useState(false)
  const {audienceArray}=route.params

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

  return (
    <SafeAreaView style={{alignSelf:'center',width:'100%'}}>
    <Header backIcon={true} name1={'Audience'}/>
      <Loader loading={loading}></Loader>
 <FlatList
 data={audienceArray}
 renderItem={Item}
 keyExtractor={item =>item._id}
 />
</SafeAreaView>
  )
}

export default Posts