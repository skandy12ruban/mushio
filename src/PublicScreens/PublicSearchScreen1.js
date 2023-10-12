import { View, Text, SafeAreaView,TouchableOpacity,Image,FlatList,ScrollView } from 'react-native'
import React,{useState} from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'

import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Loader from '../Components/Loader'
import Metrics from '../Constants/Metrics'
import Ionicons from 'react-native-vector-icons/Ionicons';

const PublicSearchScreen1 = () => {
  const navigation=useNavigation()
  const route=useRoute()
  const {item}=route.params;
  console.log(item)
  const[loading,setLoading]=useState(false)
  const data=[
    {id:1,image:require('../assets/images/place1.jpg')},
    {id:2,image:require('../assets/images/place2.jpg')},
    {id:3,image:require('../assets/images/place3.jpg')},
    {id:4,image:require('../assets/images/place4.jpg')},
  ]
const Item= ({item})=>{
  return(
    <View style={{margin:5,alignSelf:'center', width:"100%"}}>
        <View style={{borderWidth:0.5,marginTop:10}}/>
      <View>
        <TouchableOpacity style={{ width:"100%"   }}
        onPress={()=>{
        //   setProfileImg()
          }}>
          <Image
          style={{
            width:"99%",alignSelf:'center'
            }}
           source={item.image}
         />
         </TouchableOpacity>
          <View style={{flexDirection:'row',justifyContent:'space-around',margin:5}}> 
              <Entypo
                  name="eye"
                   size={25}
                   style={{color:'black'}}
                 onPress={()=>{ navigation.navigate('')}} 
                 />
                   <FontAwesome
                  name="comment-o"
                   size={25}
                   style={{color:'black'}}
                 onPress={()=>{ navigation.navigate('')}} 
                 />
                   <EvilIcons
                  name="sc-telegram"
                   size={30}
                   style={{color:'black'}}
                 onPress={()=>{ navigation.navigate('')}} 
                 />
          </View>
      </View>
      <View style={{borderWidth:0.5,marginTop:10}}/>
    </View>
  )
}

  return (
    <SafeAreaView style={{alignSelf:'center',width:'100%',flex:1,}}>
    <Loader loading={loading}></Loader>
    <View style={{flexDirection:'row',}}>
        
        <Ionicons
            onPress={() => {
               navigation.goBack()
            }}
            style={{
              paddingRight: 5
            }}
            name={'arrow-back'}
            size={30}
            color={'black'}
          />
         <Text style={{paddingLeft:10,color:'black',fontWeight:'bold',marginTop:5,fontSize:20}}>{'Travel'}</Text>
         </View>
    <View style={{flexDirection:'row',}}>
    <TouchableOpacity style={{backgroundColor:'white', width:Metrics.rfv(50),height:Metrics.rfv(50),borderRadius:30,}}
        onPress={()=>{
        //   setProfileImg()
          }}>
          <Image
          style={{
             width:Metrics.rfv(40),height:Metrics.rfv(40),margin:5,borderRadius:30,
            }}
           source={require('../assets/images/profileImg.png')}
         />
         </TouchableOpacity>
         <View style={{marginLeft:5}}>
         <Text style={{color:'black',fontWeight:'bold',marginTop:5}}>{item.name}</Text>
         <Text style={{color:'black'}}>{item.place}</Text>
         </View>
    </View>
    <ScrollView>
             <View style={{flex:2}}>
                 <FlatList
                 data={data}
                 renderItem={Item}
                 keyExtractor={item =>item.id}
                 />
             </View>
           </ScrollView>
    </SafeAreaView>
    
  )
}

export default PublicSearchScreen1