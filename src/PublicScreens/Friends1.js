import { View, Text, SafeAreaView,FlatList,TouchableOpacity,Image } from 'react-native'
import React,{useState,useEffect} from 'react'

import Loader from '../Components/Loader'
import { Card } from 'react-native-paper'
import Metrics from '../Constants/Metrics'
import { useNavigation } from '@react-navigation/native'

const Friends1 = () => {
    const navigation=useNavigation()
    const [loading,setLoading]=useState(false)
    const data=[
        {id:1,image:require('../assets/images/profileImg.png'),name:'Satish',time:'6:30 PM',message:'Hi'},
        {id:2,image:require('../assets/images/profileImg.png'),name:'Bharath',time:'5:30 AM',message:'Hello'},
        {id:3,image:require('../assets/images/profileImg.png'),name:'Vamsi',time:'7:45 AM',message:'Welcome'},
        {id:4,image:require('../assets/images/profileImg.png'),name:'Srikanth',time:'12:00 Pm',message:'How are you'},
        {id:5,image:require('../assets/images/profileImg.png'),name:'Santhosh',time:'9:00 AM',message:'Where are you'},
        {id:6,image:require('../assets/images/profileImg.png'),name:'Kiran',time:'5:15 PM', message:'Ok'},
      ]
    const Item= ({item})=>{
      return(
        <View style={{margin:10,}}>
      <TouchableOpacity onPress={()=>{navigation.navigate('FriendsMessage')}} style={{flexDirection:'row',justifyContent:'space-between'}}>
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
         <View>
         <Text style={{paddingLeft:10,color:'black',fontWeight:'bold',marginTop:5,}}>{item.name}</Text>
         <Text style={{paddingLeft:10,color:'black',marginTop:5,}}>{item.message}</Text>
         </View>
         
         </View>
         <View>
         <Text style={{color:'black',alignSelf:'center'}}>{item.time}</Text>
         </View>
         </TouchableOpacity>
        
        </View>
      )
    }


  return (
    <SafeAreaView style={{alignSelf:'center',width:'100%'}}>
   
       <Loader loading={loading}></Loader>
           <FlatList
              data={data}
               renderItem={Item}
                 keyExtractor={item =>item.id}
              />
        </SafeAreaView>
  )
}

export default Friends1;
