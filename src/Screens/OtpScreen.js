import React, { useState } from 'react';
import { View, Text,TouchableOpacity,StyleSheet, Dimensions,TextInput, SafeAreaView,Image } from 'react-native';
import { STANDARD_SCREEN_HEIGHT } from '../utils/AppConst';
import { RFValue } from 'react-native-responsive-fontsize';
import LinearGradient from 'react-native-linear-gradient'
import { useNavigation, useRoute } from '@react-navigation/native';
import Metrics from '../Constants/Metrics';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Checkbox } from 'react-native-paper';


const { width, height } = Dimensions.get('window');

const OtpScreen = () => {
    const navigation=useNavigation()
    const route=useRoute()
   const[checked,setChecked]=useState(false)
    const[otp,setOtp]=useState('')
  


  
    return (
        <SafeAreaView style={{ flex:1}}>
           <LinearGradient
      colors={['#cdffd8', '#94b9ff' ]}
      style={{flex:1,width:"100%",height:'100%'}}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
    >
       <View style={{margin:10,flexDirection:'row',justifyContent:'space-between'}}>
        <Ionicons
        name='arrow-back'
        size={50}
        color='white'
        onPress={()=>{navigation.goBack()}}
        />
              <Image
          style={{
             width:60,height:60,margin:10,borderRadius:10,
            }}
           source={require('../assets/images/image3.jpg')}
         />
         </View>
          <View style={{
          alignSelf: 'center',
          width: '90%',marginTop:Metrics.rfv(100)
        }}>
          <Text style={{color:'white',fontSize:20,fontWeight:'bold',alignSelf:'center',fontFamily:'sans-serif-condensed'}}>
            OTP has been sent to your Phone number (or) Email </Text>
               <TextInput
                   value={otp}
                   placeholder={'Enter'}
                    placeholderTextColor={'black'}
                    style={{padding:15,backgroundColor:'white',width:'70%',alignSelf:'center',margin:20,fontSize:15,fontWeight:'bold',
                    borderRadius:30,borderColor:'blue',borderWidth:1}}                        onChangeText={text => {
                      setOtp(text);
                     }}
                  />
                  <View style={{alignSelf:'center',flexDirection:'row',justifyContent:'space-between',width:'80%'}}>
                  <Checkbox
                       status={checked ? 'checked' : 'unchecked'}
                       onPress={() => {
                         setChecked(!checked);
                       }}
                       
                  />
                  <Text style={{color:'black',fontWeight:'bold',}}> I heredby consent to our privacy policy and agree to its terms and conditions.
                    <Text style={{fontWeight:'bold',color:'white'}} onPress={()=> {navigation.navigate('Agreement')}}> Read more</Text></Text>
                  </View>
              <TouchableOpacity style={{alignSelf:'center',margin:20,}}
                   onPress={()=>{navigation.navigate("Login")}}>
              {/* <Text style={{alignSelf:'center',color:'white'}}>Finish</Text> */}
              <MaterialCommunityIcons
                     name="check-decagram"
                     color={'white'}
                    size={70}
                  />
         </TouchableOpacity>
        </View>
        </LinearGradient>
        </SafeAreaView>
      );
    }
    const styles = StyleSheet.create({
      
    })

export default OtpScreen;
