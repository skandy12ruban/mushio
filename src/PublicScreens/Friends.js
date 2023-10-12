import { View, Text, SafeAreaView,FlatList,TouchableOpacity,Image } from 'react-native'
import React,{useState,useEffect} from 'react'

import Loader from '../Components/Loader'
import { Card } from 'react-native-paper'
import Metrics from '../Constants/Metrics'
import Header from '../Components/Header'

const Friends = () => {
    const [loading,setLoading]=useState(false)
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
        <View style={{margin:10,flexDirection:'row',justifyContent:'space-between'}}>
         <View style={{flexDirection:'row',justifyContent:'space-between'}}>
         <TouchableOpacity style={{backgroundColor:'white', width:Metrics.rfv(35),height:Metrics.rfv(35),borderRadius:Metrics.rfv(30),}}
        onPress={()=>{
        //   setProfileImg()
          }}>
          <Image
          style={{
             width:Metrics.rfv(30),height:Metrics.rfv(30),margin:Metrics.rfv(3),borderRadius:Metrics.rfv(30),
            }}
           source={item.image}
         />
         </TouchableOpacity>
         <Text style={{paddingLeft:10,color:'black',fontWeight:'bold',marginTop:5,}}>{item.name}</Text>
         </View>
         <View>
         <TouchableOpacity style={{padding:10,backgroundColor:'#00B0FF',borderRadius:10,width:130}}>
         <Text style={{color:'white',alignSelf:'center'}}>{item.status}</Text>
         </TouchableOpacity>
         </View>
         
        
        </View>
      )
    }


  return (
    <SafeAreaView style={{alignSelf:'center',width:'100%'}}>
    <Header backIcon={true} name1={'Friends'}/>
<Loader loading={loading}></Loader>
 <FlatList
 data={data}
 renderItem={Item}
 keyExtractor={item =>item.id}
 />
</SafeAreaView>
  )
}

export default Friends