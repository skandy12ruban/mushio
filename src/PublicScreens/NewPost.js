import { View, Text,SafeAreaView,TextInput,TouchableOpacity, ScrollView,Image } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppDropDown from '../Components/AppDropDown'
import { useNavigation, useRoute } from '@react-navigation/native';
import Metrics from '../Constants/Metrics';
import Video from 'react-native-video';

const NewPost = () => {
  const navigation = useNavigation()
  const route=useRoute()
  const {fileUri,type}=route.params
  const [category,setCategory]=useState('')
  const[locationName,setLocationName]=useState('')
  const [caption,setCaption]=useState('')
  const[dob,setDob]=useState('')
console.log(category)
  const data=[
    {value:'Place',label:'Place'},{value:'People',label:'People'},{value:'Moment',label:'Moment'}
  ]

  return (
    <SafeAreaView style={{flex:1,alignSelf:'center',width:'100%',}}>
      <View style={{flexDirection:'row'}}>
       <Ionicons
            onPress={() => {
               navigation.goBack()
            }}
            style={{
              marginLeft:10,marginTop:10
            }}
            name={'arrow-back'}
            size={30}
            color={'black'}
          />
     <Text style={{color:'black', marginLeft:20,marginTop:10,fontSize:20,fontWeight:'bold'}}> New Post</Text>
      </View>
      <View style={{borderWidth:0.5,marginTop:10}}/>
      <ScrollView>
    <View style={{marginBottom:50}}>
      <View style={{alignSelf:'center',marginTop:20}}>
      <> 
       {type == 'image/jpeg'  ? (
             <Image
                source={{uri:fileUri }}
                style={{width:100,height:100}}
               />
               ):(type == 'video/mp4') ? (
                <Video  
                source={{ uri: fileUri}}
                style={{width:200,height:150}}
                // paused={true}
                />
             ):(null)}
         </>
      </View>
      <View style={{borderWidth:0.5,marginTop:10}}/>
      <View style={{marginTop:20}}>
      <Text style={{fontSize:15,fontWeight:'bold',color:'black',marginLeft:20}}>Category : </Text>
        <AppDropDown
                  label={''}
                  items={data ||[]}
                  value={category}
                  placeholder={'select customer care'}
                  changeText={(text) => {
                    setCategory(text)
                  }}
                  containerStyle={{
                    padding: Metrics.rfv(20),
                  }}
                  viewStyle={{
                    borderRadius: Metrics.rfv(5),
                    
                  }}
                />
          </View>
          <View style={{}}>
        <Text style={{fontSize:15,fontWeight:'bold',color:'black',marginLeft:20}}>{category == 'Place'?  'Location Name' : 'Mention'} </Text>
             <TextInput
                   value={locationName}
                   placeholder={category == 'Place'?  'Enter Location Name' : 'Mention'}
                   placeholderTextColor={'grey'}
                   style={{padding:10,backgroundColor:'white',borderRadius:5,margin:10,width:'90%',marginLeft: Metrics.rfv(20),}}
                   onChangeText={text => {
                   setLocationName(text);
                   }}
                 />
        </View>
        <View style={{}}>
        <Text style={{fontSize:15,fontWeight:'bold',color:'black',marginLeft:20}}>Name  : </Text>
             <TextInput
                   value={caption}
                   placeholder={'Enter name'}
                   placeholderTextColor={'grey'}
                   style={{padding:10,backgroundColor:'white',borderRadius:5,margin:10,width:'90%',marginLeft: Metrics.rfv(20),}}
                   onChangeText={text => {
                   setCaption(text);
                   }}
                 />
        </View>
        <View style={{}}>
        <Text style={{fontSize:15,fontWeight:'bold',color:'black',marginLeft:20}}>Name  : </Text>
             <TextInput
                   value={dob}
                   placeholder={'Enter name'}
                   placeholderTextColor={'grey'}
                   style={{padding:10,backgroundColor:'white',borderRadius:5,margin:10,width:'90%',marginLeft: Metrics.rfv(20),}}
                   onChangeText={text => {
                   setDob(text);
                   }}
                 />
        </View>
           <View>
           <TouchableOpacity style={{backgroundColor:'black',width:200,padding:10,
          alignSelf:'center',marginTop:20,borderRadius:5}}
          onPress={()=>{
         
          }}>
      <Text style={{alignSelf:'center',color:'white'}}>Share</Text>
     </TouchableOpacity>
           </View>
    </View>
    </ScrollView>
    </SafeAreaView>
  )
}

export default NewPost