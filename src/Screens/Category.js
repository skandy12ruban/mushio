import { View, Text,SafeAreaView,FlatList,Image,ScrollView,TouchableOpacity,TextInput } from 'react-native'
import React,{useState} from 'react'
import { Card } from 'react-native-paper'
import Metrics from '../Constants/Metrics'
import Entypo from 'react-native-vector-icons/Entypo';
import { useRoute } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Category = () => {
    const route =useRoute()
    const {item}=route.params;
    const[title,setTitle]=useState('')
    const[description,setDescription]=useState('')

  return (
    <SafeAreaView style={{backgroundColor:item.color,flex:1}}>
        <ScrollView>
       <View style={{marginTop:Metrics.rfv(30),margin:10,flex:1}}>
    
      <View style={{ alignSelf: 'flex-end',}}>
         <Entypo
           name="cross"
           size={30}
           color='black'
            />
      </View>
      <View style={{alignSelf: 'center',marginTop:Metrics.rfv(30),}}>
        <Text style={{fontSize:Metrics.rfv(30),color:'black',alignSelf: 'center',fontWeight:'bold'}}>{item.name}</Text>
      <Image
          style={{
             width:120,height:120,margin:10,borderRadius:10,marginTop:Metrics.rfv(30),
            }}
           source={item.image}
         />
      </View>
       <Text style={{color:'black',alignSelf: 'center',marginTop:Metrics.rfv(10),}}>Tell mushio about your day</Text>
       <View style={{alignSelf:'center',width:'90%'}}>
        <TextInput
         value={title}
         placeholder={'Title'}
         style={{padding:10,backgroundColor:'white',borderRadius:5,margin:10,}}
         onChangeText={text => {
            setTitle( text);
          }}
        />
        <TextInput
         value={description}
         placeholder={'Description'}
         style={{padding:10,backgroundColor:'white',borderRadius:5,margin:10,height:100}}
         multiline={true}
         onChangeText={text => {
            setDescription( text);
          }}
        />
        <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10}}>
           <TouchableOpacity style={{ borderRadius:20,padding:5,alignSelf:'center',backgroundColor:'white'}}>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <FontAwesome
           name="microphone"
           size={20}
           color='black'
            />
              <Text  style={{alignSelf:'center',color:'black'}}> Record</Text>
            </View>
          
           </TouchableOpacity>
           <TouchableOpacity style={{ borderRadius:20,padding:5,alignSelf:'center',backgroundColor:'white'}}>
           <View style={{flexDirection:'row',justifyContent:'space-between'}}>
           <Feather
           name="image"
           size={20}
           color='black'
            />
              <Text  style={{alignSelf:'center',color:'black'}}> Add Images</Text>
            </View>
           </TouchableOpacity>
           <TouchableOpacity style={{ borderRadius:20,padding:5,alignSelf:'center',backgroundColor:'white'}}>
           <View style={{flexDirection:'row',justifyContent:'space-between'}}>
           <MaterialCommunityIcons
           name="calendar"
           size={20}
           color='black'
            />
              <Text  style={{alignSelf:'center',color:'black'}}> Deadlines</Text>
            </View>
           </TouchableOpacity>
        </View>
        <TouchableOpacity style={{backgroundColor:'black',width:'60%',padding:10,
          alignSelf:'center',marginTop:20,borderRadius:5}}
           onPress={()=>{}}>
      <Text style={{alignSelf:'center',color:'white'}}>Submit</Text>
     </TouchableOpacity>
       </View>
      
    </View>
    </ScrollView>
    </SafeAreaView>
  
  )
}

export default Category