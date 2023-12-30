import { View, Text,SafeAreaView,TextInput,TouchableOpacity, ScrollView,Image,useColorScheme,Alert } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppDropDown from '../Components/AppDropDown'
import { useNavigation, useRoute } from '@react-navigation/native';
import Metrics from '../Constants/Metrics';
import Video from 'react-native-video';
import { getUserProfileInfo } from '../utils/AsyncStorageHelper';
import { API_BASE_URL } from '../api/ApiClient';
import { DateHelper } from '../utils/DateHelper';
import Loader from '../Components/Loader';
import VideoPlayer from 'react-native-video-player';

const NewPost = () => {
  const navigation = useNavigation()
  const[loading,setLoading]=useState(false)
  const route=useRoute()
  const theme = useColorScheme();
  const {imgArray}=route.params
  const [category,setCategory]=useState('')
  const[locationName,setLocationName]=useState('')
  const[tag,setTag]=useState('')
  const [caption,setCaption]=useState('')
  const[dob,setDob]=useState(DateHelper.formatToDateYMD(new Date()))
console.log(category)
  const data=[
    {value:'place',label:'place'},{value:'people',label:'people'},{value:'moments',label:'moment'}
  ]

   
  console.log('imgArray..',imgArray)

const MyPost = async ()=>{
  const res = await getUserProfileInfo()
  // console.log(res.accessToken)
  setLoading(true)
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${res.accessToken}`);
  var raw = JSON.stringify({
    "files": imgArray,
    "location": `${locationName}`,
    "postType": `${category}`,
    "tagPeoples": tag != '' ? [] : [],
    "date": `${dob}`  ,
    "head":`${caption}`
  });
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  console.log('raw',raw)
  fetch(`${API_BASE_URL}/api/post`, requestOptions)
  .then(response => response.json())
  .then(result => {
    console.log(result)
    if(result && result.success == true){
        // setImagePath(result.data.url)
    //  alert(result.message)
    Alert.alert('Post', result.message, [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () =>  {
        navigation.navigate('PublicHome')
      }},
    ]);
  
      setLoading(false)
    }
    setLoading(false)
  })
  .catch(error => {
    console.log('error', error)
    setLoading(false)
  });
  }

  return (
    <SafeAreaView style={{flex:1,alignSelf:'center',width:'100%',backgroundColor:theme === 'dark' ? 'black':'white',}}>
      <Loader loading={loading}></Loader>
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
            color={theme === 'dark' ? 'white':'black'}
          />
     <Text style={{color:theme === 'dark' ? 'white':'black', marginLeft:20,marginTop:10,fontSize:20,fontWeight:'bold'}}> New Post</Text>
      </View>
      <View style={{borderWidth:0.5,marginTop:10}}/>
      <ScrollView>
    <View style={{marginBottom:50}}>
      <View style={{alignSelf:'center',marginTop:0,flex:1}}>
   
      <ScrollView horizontal style={{flexDirection:'row'}}>
      {imgArray.map((e)=>{
          console.log('ee',e)
          return(
            < View style={{}}>
       { e.type == 'image'  ? (
        < View style={{margin:10,}}>
           <Image
                source={{uri:e.url}}
                style={{width:250,height:250}}
               />
         </View>
               ):(
        < View style={{margin:10,}}>
              <VideoPlayer  
                video={{ uri: e.uri}}
                style={{width:300,height:200,backgroundColor:theme === 'dark' ? 'white':'black'}}
                // paused={true}
                />
        </View>
             )}
             </View>
             ) } )
         }
       </ScrollView>

      </View>
      <View style={{borderWidth:0.5,marginTop:10}}/>
      <View style={{marginTop:20}}>
      <Text style={{fontSize:15,fontWeight:'bold',color:theme === 'dark' ? 'white':'black',marginLeft:20}}>Type : </Text>
        <AppDropDown
                  label={''}
                  items={data ||[]}
                  value={category}
                  placeholder={'select'}
                  changeText={(text) => {
                    setCategory(text)
                  }}
                  containerStyle={{
                    padding: Metrics.rfv(20),
                   
                  }}
                  viewStyle={{
                    borderRadius: Metrics.rfv(5),
                    backgroundColor:theme === 'dark' ? '#666666':'white',
                    // color:theme === 'dark' ?'red':'white'
                  }}
                />
          </View>
         {category == 'place' ? ( <View style={{}}>
        <Text style={{fontSize:15,fontWeight:'bold',color:theme === 'dark' ? 'white':'black',marginLeft:20}}>{ 'Location'} </Text>
             <TextInput
                   value={locationName}
                   placeholder={'Place'}
                   placeholderTextColor={'grey'}
                   style={{padding:10,backgroundColor:theme === 'dark' ? 'black':'white',borderRadius:5,margin:10,width:'90%',marginLeft: Metrics.rfv(20),
                   color:theme === 'dark' ?'white':'black',borderColor:theme === 'dark' ?'white':'',borderWidth:1}}
                   onChangeText={text => {
                   setLocationName(text);
                   }}
                 />
        </View>):category == 'people' ?(
        <View style={{}}>
        <Text style={{fontSize:15,fontWeight:'bold',color:theme === 'dark' ? 'white':'black',marginLeft:20}}>{'Mention'} </Text>
             <TextInput
                   value={tag}
                   placeholder={' @ Tag'}
                   placeholderTextColor={'grey'}
                   style={{padding:10,backgroundColor:theme === 'dark' ? 'black':'white',borderRadius:5,margin:10,width:'90%',marginLeft: Metrics.rfv(20),
                   color:theme === 'dark' ?'white':'black',borderColor:theme === 'dark' ?'white':'',borderWidth:1}}
                   onChangeText={text => {
                   setTag(text);
                   }}
                 />
        </View>):(null)}
        <View style={{}}>
        <Text style={{fontSize:15,fontWeight:'bold',color:theme === 'dark' ? 'white':'black',marginLeft:20}}>Head  : </Text>
             <TextInput
                   value={caption}
                   placeholder={'Write a head'}
                   placeholderTextColor={'grey'}
                   style={{padding:10,backgroundColor:theme === 'dark' ? 'black':'white',borderRadius:5,margin:10,width:'90%',marginLeft: Metrics.rfv(20),
                   color:theme === 'dark' ?'white':'black',borderColor:theme === 'dark' ?'white':'',borderWidth:1}}
                   onChangeText={text => {
                   setCaption(text);
                   }}
                 />
        </View>
        <View style={{}}>
        <Text style={{fontSize:15,fontWeight:'bold',color:theme === 'dark' ? 'white':'black',marginLeft:20}}>Date  : </Text>
             <TextInput
                   value={dob}
                   placeholder={'Enter date'}
                   placeholderTextColor={'grey'}
                   style={{padding:10,backgroundColor:theme === 'dark' ? 'black':'white',borderRadius:5,margin:10,width:'90%',marginLeft: Metrics.rfv(20),
                   color:theme === 'dark' ?'white':'black',borderColor:theme === 'dark' ?'white':'',borderWidth:1}}
                   onChangeText={text => {
                   setDob(text);
                   }}
                 />
        </View>
           <View>
           <TouchableOpacity style={{backgroundColor:theme === 'dark' ? 'white':'black',width:200,padding:10,
          alignSelf:'center',marginTop:20,borderRadius:5}}
          onPress={()=>{
            if(caption != ''){
              MyPost()
            }else{
              alert('please enter headline')
            }
          
            
          }}>
      <Text style={{alignSelf:'center',color:theme === 'dark' ? 'black':'white'}}>Submit</Text>
     </TouchableOpacity>
           </View>
    </View>
    </ScrollView>
    </SafeAreaView>
  )
}

export default NewPost