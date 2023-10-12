import { View, Text,SafeAreaView,TouchableOpacity,Alert,TextInput,ScrollView } from 'react-native'
import React,{useState} from 'react'
import Entypo from 'react-native-vector-icons/Entypo';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Metrics from '../Constants/Metrics';


const EditProfile = () => {
  const navigation=useNavigation()
const[name,setName]=useState('')
const[phoneNo,setPhoneNo]=useState('')
const [dob,setDob]=useState('')
const[bio,setBio]=useState('')
const[artist,setArtist]=useState('')
  return (
    <SafeAreaView style={{alignSelf:'center',width:'100%'}}>
     <View style={{margin:10,flexDirection:'row',justifyContent:'space-between'}}>
     <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        
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
         <Text style={{paddingLeft:10,color:'black',fontWeight:'bold',marginTop:5,}}>{'Edit Profile'}</Text>
         </View>
         <View style={{bottom:10}}>
               <Entypo
                  name="menu"
                   size={40}
                   style={{color:'black',}}
                  onPress={()=>{ navigation.dispatch(DrawerActions.openDrawer());}}
                 /> 
        </View>
    </View>

    <View>
    <ScrollView>

      <View style={{alignSelf:'center',padding:10, width: '90%',}}>
        <View style={{}}>
        <Text style={{fontSize:15,fontWeight:'bold',color:'black',marginLeft:20}}>User Name  : </Text>
             <TextInput
                   value={name}
                   placeholder={'Enter username'}
                   placeholderTextColor={'grey'}
                   style={{padding:10,backgroundColor:'white',borderRadius:5,margin:10,width:'90%',marginLeft: Metrics.rfv(20),}}
                   onChangeText={text => {
                   setName(text);
                   }}
                 />
        </View>
        <View style={{}}>
        <Text style={{fontSize:15,fontWeight:'bold',color:'black',marginLeft:20}}>Type of Artist  : </Text>
               <TextInput
                   value={artist}
                   placeholder={'Enter type of artist'}
                   placeholderTextColor={'grey'}
                   style={{padding:10,backgroundColor:'white',borderRadius:5,margin:10,width:'90%',marginLeft: Metrics.rfv(20),}}
                   onChangeText={text => {
                   setArtist(text);
                   }}
                 />
        </View>
        <View style={{}}>
        <Text style={{fontSize:15,fontWeight:'bold',color:'black',marginLeft:20}}>Dob  : </Text>
               <TextInput
                   value={dob}
                   placeholder={'Enter dob'}
                   placeholderTextColor={'grey'}
                   style={{padding:10,backgroundColor:'white',borderRadius:5,margin:10,width:'90%',marginLeft: Metrics.rfv(20),}}
                   onChangeText={text => {
                   setDob(text);
                   }}
                 />
        </View>
        <View style={{}}>
        <Text style={{fontSize:15,fontWeight:'bold',color:'black',marginLeft:20}}>Audio bio  : </Text>
               <TextInput
                   value={bio}
                   placeholder={'Enter Audio bio'}
                   placeholderTextColor={'grey'}
                   style={{padding:10,backgroundColor:'white',borderRadius:5,margin:10,width:'90%',marginLeft: Metrics.rfv(20),}}
                   onChangeText={text => {
                   setBio(text);
                   }}
                 />
        </View>
        <View style={{}}>
        <Text style={{fontSize:15,fontWeight:'bold',color:'black',marginLeft:20}}>Phone number  : </Text>
              <TextInput
                   value={phoneNo}
                   placeholder={'Enter phoneNo'}
                   placeholderTextColor={'grey'}
                   style={{padding:10,backgroundColor:'white',borderRadius:5,margin:10,width:'90%',marginLeft: Metrics.rfv(20),}}
                   onChangeText={text => {
                   setPhoneNo(text);
                   }}
                 />
        </View>

        <TouchableOpacity style={{backgroundColor:'black',width:200,padding:10,
          alignSelf:'center',marginTop:20,borderRadius:5}}
          onPress={()=>{
             
          }}>
      <Text style={{alignSelf:'center',color:'white'}}>Submit</Text>
     </TouchableOpacity>
      </View>
      </ScrollView>
    </View>
    </SafeAreaView>
  )
}

export default EditProfile