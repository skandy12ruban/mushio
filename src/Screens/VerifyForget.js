
import React,{ useState,useEffect } from 'react';
import { View, Text, SafeAreaView, TextInput,TouchableOpacity,Dimensions,useColorScheme } from 'react-native';
import Loader from '../Components/Loader';
import { API_BASE_URL } from '../api/ApiClient';
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

const VerifyForget = () => {
    const route=useRoute()
    const{forgetRes}=route.params;
    const navigation=useNavigation()
const[loading,setLoading]=useState(false)
const[otp,setOtp]=useState('')
const theme = useColorScheme();

const VerifyforgetPassword= async ()=>{
    setLoading(true)
    let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  let raw = JSON.stringify({
    "token":`${forgetRes.token}`,
    "otp": `${otp}`
  });
  
  let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  
  fetch(`${API_BASE_URL}/api/userAuth/verifyForgotPasswordOtp`, requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result)
      if(result && result.success == true){
        let response=result.data
        navigation.navigate('Reset',{forgetRes:forgetRes,otp:otp})
        setLoading(false)
      }else{
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


  return (
    <SafeAreaView style={{flex:1,backgroundColor:theme === 'dark' ? 'black':'white',}}>
          <Loader loading={loading}></Loader>
          <View style={{margin:10,flexDirection:'row',justifyContent:'space-between'}}>
          <Ionicons
        name='arrow-back'
        size={50}
        color={theme === 'dark' ? 'white':'black'}
        onPress={()=>{navigation.goBack()}}
        />
        </View>
          <Text style={{fontSize:35,fontWeight:'bold',color:theme === 'dark' ? 'white':'black',margin:20,marginTop:50,alignSelf:'center'}}>Verification </Text>
          <View style={{marginTop:50}}>
            <Text style={{color:theme === 'dark' ? 'white':'black',marginLeft:60,fontWeight:'bold'}}>Enter OTP</Text>
          <TextInput
                   value={otp}
                   placeholder={''}
                    placeholderTextColor={'black'}
                    style={{padding:5,backgroundColor:'white',width:'70%',margin:10,fontSize:15,fontWeight:'bold',color:theme === 'dark' ?'black':'',
                    borderRadius:10,borderColor:'blue',borderWidth:1,alignSelf:'center'}}     
                     onChangeText={text => {
                      setOtp(text);
                     }}
                  /> 
                   <TouchableOpacity style={{ backgroundColor: theme === 'dark' ?'white':'black',
                    padding:5,
                    width: width * 0.4,
                    alignSelf: 'center',
                    borderRadius: 10,
                    marginTop: 20,
                  }}
                  activeOpacity={0.5}
           onPress={()=>{
           if(otp == ''){
                   alert('please enter otp')
            }else{
                VerifyforgetPassword()
            }
            }}>
       <Text style={{color:theme === 'dark' ? 'black':'white',
    paddingVertical: 5,
    fontSize: 15,
    fontWeight: 'bold',
    alignSelf: 'center',}}>Next</Text>
    </TouchableOpacity>
         </View>
    </SafeAreaView>
  );
}

export default VerifyForget;
