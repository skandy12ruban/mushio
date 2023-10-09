import React, { useState } from 'react';
import { View, Text,TouchableOpacity,StyleSheet, Dimensions,TextInput, SafeAreaView } from 'react-native';
import { STANDARD_SCREEN_HEIGHT } from '../utils/AppConst';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation, useRoute } from '@react-navigation/native';
import Metrics from '../Constants/Metrics';

const { width, height } = Dimensions.get('window');

const OtpScreen = () => {
    const navigation=useNavigation()
    const route=useRoute()
   
    const[otp,setOtp]=useState('')
  


  
    return (
        <SafeAreaView style={{ backgroundColor: 'lightblue',flex:1}}>
          <View style={{
          alignSelf: 'center',
          width: '90%',marginTop:Metrics.rfv(100)
        }}>
          <Text style={{marginLeft:Metrics.rfv(30),color:'black',marginTop:20,fontWeight:'bold'}}>
            OTP has been sent to your Phone number (or) Email </Text> 
               <TextInput
                   value={otp}
                   placeholder={'Enter'}
                    placeholderTextColor={'grey'}
                    style={{padding:10,backgroundColor:'white',borderRadius:5,margin:10,width:'90%',marginLeft: Metrics.rfv(20),}}
                    onChangeText={text => {
                      setOtp(text);
                     }}
                  />
              <TouchableOpacity style={{backgroundColor:'#00B0FF',width:'60%',padding:15,
                 alignSelf:'center',marginTop:20,borderRadius:5}}
                   onPress={()=>{navigation.navigate("Login")}}>
              <Text style={{alignSelf:'center',color:'white'}}>Finish</Text>
         </TouchableOpacity>
        </View>
        </SafeAreaView>
      );
    }
    const styles = StyleSheet.create({
      
    })

export default OtpScreen;
