import { View, Text,SafeAreaView,TextInput,TouchableOpacity, ScrollView,Image,Alert } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AppDropDown from '../Components/AppDropDown'
import { useNavigation, useRoute } from '@react-navigation/native';
import Metrics from '../Constants/Metrics';
import LinearGradient from 'react-native-linear-gradient'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { API_BASE_URL } from '../api/ApiClient';
import { getUserProfileInfo } from '../utils/AsyncStorageHelper';
import { useEffect } from 'react';

const MyProfile = () => {
    const navigation=useNavigation()
    const route=useRoute()
    const {profileRes,getProfile}=route.params;
    // console.log('profile res',profileRes)
      
     
    const[loading,setLoading]=useState(false)
    const[alias,setAlias]=useState(profileRes && profileRes.alias ? profileRes.alias :'')
    const[phile,setPhile]=useState(profileRes && profileRes.phile  ? profileRes.phile :'')
    const[about,setAbout]=useState(profileRes && profileRes.about ? profileRes.about :'')
    const[role,setRole]=useState(profileRes && profileRes.userType ? profileRes.userType :'')
    const[type,setType]=useState(profileRes && profileRes.artistType ? profileRes.artistType :'')
    const[imagepath,setImagePath]=useState(profileRes && profileRes.profileImage ? profileRes.profileImage :'')
    const[fileName,setFileName]=useState('')
    const [fileUri, setFileUri] = useState(null);
   const[imageType,setImageType]=useState('')
   
    const data=[
      {value:'artist',label:'artist'},{value:'audience',label:'audience'}
    ]
   const data1=[
    {value:'singer',label:'singer'},
    {value:'Dancer',label:'Dancer'},
    {value:'StartUp Comedian',label:'StartUp Comedian'},
    {value:'Reporter',label:'Reporter'},
    {value:'Painter',label:'Painter'},
   ]

   const launchNativeImageLibrary = () => {
    let options = {
      mediaType: 'photo',
      // includeBase64: true,
      width:1000,
      height:1000,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: response.assets.uri };
        console.log('response', JSON.stringify(response));
        setFileName(response.assets[0].fileName)
        setImageType(response.assets[0].type)
        setFileUri(response.assets[0].uri)
        filesUpload()
      }
    });

  }

  const filesUpload = async ()=>{
    const res = await getUserProfileInfo()
    console.log(res.accessToken)
    setLoading(true)
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${res.accessToken}`);

    const formdata = new FormData();
      formdata.append('file', {
        uri: fileUri,
        type: imageType,
        name: fileName,
      });

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: formdata,
  redirect: 'follow'
};
console.log(myHeaders)
fetch(`${API_BASE_URL}/api/fileUpload/upload`, requestOptions)
  .then(response => response.json())
  .then(result => {
    console.log(result)
    if(result && result.success == true){
        setImagePath(result.data.url)
     alert(result.message)
      setLoading(false)
    }
    setLoading(false)
  })
  .catch(error => {
    console.log('error', error)
    setLoading(false)
  });
  }

//   console.log(fileUri)

   const Profile= async()=>{
    const res = await getUserProfileInfo()
    setLoading(true)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${res.accessToken}`);
    var raw = JSON.stringify({
        "profileImage": `${imagepath}`,
        "userType": `${role}`,
        "artistType": `${type}`,
        "alias": `${alias}`,
        "phile":`${phile}`,
        "about": `${about}`,
      });
      
      var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      console.log(raw)
      fetch(`${API_BASE_URL}/api/user/myProfile`, requestOptions)
  .then(response => response.json())
  .then(result => {
    console.log('profile updated res',result)
    if(result && result.success == true){
      Alert.alert(' ', result.message, [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () =>  navigation.goBack()},
      ]);
     getProfile()
      setLoading(false)
    }
    setLoading(false)
  })
  .catch(error => {
    alert(result.message)
    console.log('error', error)
    setLoading(false)
  });
   }

   

   useEffect(()=>{
    //  getProfile()
   },[])

  return (
    <SafeAreaView style={{flex:1,alignSelf:'center',width:'100%',}}>
         <LinearGradient
      colors={['#433D3D', '#ffffff' ]}
      style={{flex:1,width:"100%",height:'100%'}}
      start={{ x: 0.6, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
    >
        <View>
        <Ionicons
            onPress={() => {
               navigation.goBack()
            }}
            style={{
              marginLeft:10,marginTop:10
            }}
            name={'arrow-back'}
            size={40}
            color={'white'}
          />
        </View>
    <ScrollView>
        <View style={{backgroundColor:'white',width:'70%',alignSelf:'center',height:'30%',}}>
        {/* <View style={{backgroundColor:'white',width:'50%',alignSelf:'center',height:'40%',flex:1}}>
            <Text>hh</Text>
         </View> */}
         
     {/* {fileUri != null ? (  */}
        <TouchableOpacity style={{padding:20,alignSelf:'center',backgroundColor:'black',margin:10,width:'80%',height:'30%',flex:1,}}
         onPress={() => {
            launchNativeImageLibrary()
          }}>
         <Image
         source={{uri:fileUri != null ? fileUri :(profileRes && profileRes.profileImage)  }}
         style={{width:150,height:150,borderRadius:100}}
        /> 
        </TouchableOpacity>
             {/* ):(
                
      <TouchableOpacity style={{padding:20,alignSelf:'center',backgroundColor:'black',margin:10,width:'80%',height:'30%',flex:1}}
      >
            
          
              <FontAwesome
            onPress={() => {
              launchNativeImageLibrary()
            }}
            style={{
              marginLeft:10,marginTop:50,backgroundColor:'grey',padding:10, borderRadius: Metrics.rfv(30),alignSelf:'center',
            }}
            name={'image'}
            size={30}
            color={'black'}
          /> 
       
        
         
      </TouchableOpacity>
    
            )} 
          */}
        </View>
      <AppDropDown
                  label={''}
                  items={data ||[]}
                  value={role}
                  placeholder={'select'}
                  changeText={(text) => {
                    setRole(text)
                  }}
                  containerStyle={{
                    padding: Metrics.rfv(20),
                    width:'60%',alignSelf:'center',
                  }}
                  viewStyle={{
                    borderRadius: Metrics.rfv(30),
                    borderWidth:1,
                    borderColor:'blue'
                  }}
                />
         { role != 'Audience' ?  (<AppDropDown
                  label={''}
                  items={data1 ||[]}
                  value={type}
                  placeholder={'select'}
                  changeText={(text) => {
                    setType(text)
                  }}
                  containerStyle={{
                    padding: Metrics.rfv(20),
                    width:'60%',alignSelf:'center',
                  }}
                  viewStyle={{
                    borderRadius: Metrics.rfv(30),
                    borderWidth:1,
                    borderColor:'blue'
                  }}
                />):(null)}
                <View style={{flexDirection:'row',margin:20,}}>
                    <Text style={{marginLeft:Metrics.rfv(30),color:'white',fontWeight:'bold',fontSize:20}}>Alias : </Text>
                 <TextInput
                   value={alias}
                   placeholder={'Enter Alias'}
                    // placeholderTextColor={'black'}
                    style={{padding:10,backgroundColor:'white',width:'50%',alignSelf:'center',fontSize:15,fontWeight:'bold', borderRadius: Metrics.rfv(10),
                   }}     
                     onChangeText={text => {
                      setAlias(text);
                     }}
                  /> 
                </View>
                <View style={{flexDirection:'row',margin:20,}}>
                    <Text style={{marginLeft:Metrics.rfv(30),color:'white',fontWeight:'bold',fontSize:20}}>Phile : </Text>
                 <TextInput
                   value={phile}
                   placeholder={'Enter Phile'}
                    // placeholderTextColor={'black'}
                    style={{padding:10,backgroundColor:'white',width:'50%',alignSelf:'center',fontSize:15,fontWeight:'bold', borderRadius: Metrics.rfv(10),
                   }}     
                     onChangeText={text => {
                      setPhile(text);
                     }}
                  /> 
                </View>
                <View style={{flexDirection:'row',margin:20,}}>
                    <Text style={{marginLeft:Metrics.rfv(10),color:'white',fontWeight:'bold',fontSize:20}}>Unique About : </Text>
                 <TextInput
                   value={about}
                   placeholder={'Enter About'}
                    // placeholderTextColor={'black'}
                    style={{padding:10,backgroundColor:'white',width:'50%',alignSelf:'center',fontSize:15,fontWeight:'bold', borderRadius: Metrics.rfv(10),
                   }}     
                     onChangeText={text => {
                      setAbout(text);
                     }}
                  /> 
                </View>
                <TouchableOpacity style={{ alignSelf:'center',marginTop:20,backgroundColor:'black',padding:10,width:'40%',borderRadius: Metrics.rfv(30),marginBottom:80}}
                      onPress={()=>{
                        Profile()
                     }}>
         <Text style={{alignSelf:'center',color:'white'}}>Submit</Text>             
     </TouchableOpacity>
    </ScrollView>
    </LinearGradient>
    </SafeAreaView>
  );
}

export default MyProfile;
