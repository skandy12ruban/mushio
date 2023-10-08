import React, { useState } from 'react';
import { View, Text,TouchableOpacity,StyleSheet, Dimensions,TextInput } from 'react-native';
import { STANDARD_SCREEN_HEIGHT } from '../utils/AppConst';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation, useRoute } from '@react-navigation/native';
import Metrics from '../Constants/Metrics';
import { API_BASE_URL } from '../api/ApiClient';
import { saveMobileNumber, saveUserProfileInfo } from '../utils/AsyncStorageHelper';
import { useDispatch } from 'react-redux';
import { MAIN_ROUTE } from '../routes/RouteConst';
import { setuser } from '../Redux/reducer/User';
const { width, height } = Dimensions.get('window');

const OtpScreen = () => {
    const navigation=useNavigation()
    const route=useRoute()
    const {mobileNumber}=route.params;
    const[otp,setOtp]=useState('')
    const dispatch = useDispatch()


    const Login = async ()=>{
       
var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

fetch(`${API_BASE_URL}/session/token`, requestOptions)
  .then(response => response.text())
  .then(result => {
    console.log('response', result);
    const myHeaders = new Headers();
    myHeaders.append("X-CSRF-Token", `${result}`);
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Basic Og==");

    var raw = JSON.stringify({
        "otp": `${otp}`,
        "mobile_number": `${mobileNumber}`
      });
      
    const payload = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
       console.log("login payload", raw)
    fetch(`${API_BASE_URL}/otp/rest-login`, payload)
  .then(response => response.text())
  .then(async result =>{
    let data = JSON.parse(result)
      if ( data.message != 'Incorrect OTP.'){
        let userInfo = {"userId":data}
        console.log("userInfo res",userInfo)
       await saveUserProfileInfo (userInfo)
       await saveMobileNumber (mobileNumber)
       dispatch(setuser(userInfo))
       navigation.reset({
           index: 0,
           routes: [{ name: MAIN_ROUTE }],
       })
      }else{
        alert('Incorrect OTP')
      }
    })
  .catch(error => console.log('error', error));
})
  .catch(error => console.log('error', error));
    }

    return (
        <View style={{ backgroundColor: 'white',flex:1}}>
          <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginTop: RFValue(80, STANDARD_SCREEN_HEIGHT),
                    }}>
                        <Text style={{
                            color: 'green',
                            paddingVertical: 10,
                            fontSize: 35,
                            fontWeight: 'bold'
                        }}>
                            Buy
                        </Text>
                        <Text style={{
                            color: 'orange',
                            paddingVertical: 10,
                            fontSize: 35,
                            fontWeight: 'bold'
                        }}>
                            Exp
                        </Text>
                    </View>
    
                    <View style={{
                        marginTop: RFValue(25, STANDARD_SCREEN_HEIGHT),
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                       
                        <Text style={{
                            color: '#41bab0',
                            fontSize: 20,
                            fontWeight: 'bold'
                        }}>
                            Welcome 
                        </Text>
                    </View>
                   
                    <View style={{
                            marginLeft: Metrics.rfv(30),
                           marginTop:30,
                         }}>
                         <Text style={{
                              color: '#3d4b69',
                              fontSize: 14,
                              fontWeight: 'bold'
                             }}>Enter the code sent to you at xxxxxx</Text>
                     </View>
                     <View style={styles.SectionStyle}>
                         <TextInput
                           placeholder="Enter OTP"
                            style={styles.inputStyle}
                              onChangeText={(text) => {                   
                                setOtp( text)
                                 }}
                               value={otp}
                                placeholderTextColor="gray"
                                keyboardType="email-address"
                                                    
                             />
                       </View>
                        <TouchableOpacity
                                style={{
                                  backgroundColor: '#41bab0',
                                  color: '#FFFFFF',
                                  borderColor: '#7DE24E',
                                   height: 42,
                                   width: width * 0.7,
                                   alignSelf: 'center',
                                   borderRadius: 30,
                                   marginTop: 20,
                                   marginBottom: 20,
                                 }}
                                 activeOpacity={0.5}
                                     onPress={() => {
                                      if(otp != ''){
                                        Login()  
                                      }else{
                                        alert('Please enter OTP')
                                      }                                                 
                                    }}>
                    <Text style={{ color: 'white', paddingVertical: 10, fontSize: 15,fontWeight: 'bold',alignSelf: 'center',}}>Submit</Text>
                         </TouchableOpacity>
        </View>
      );
    }
    const styles = StyleSheet.create({
        SectionStyle: {
            flexDirection: 'row',
            height: 43,
            width: '88%',
            // marginLeft: 22,
            // marginRight: 40,
            margin: 8,
            alignItems: 'center',
            alignSelf:'center'
        },
        inputStyle: {
            flex: 2,
            height: 43,
            width: '100%',
            color: 'black',
            fontSize: 16,
            fontWeight: 'bold',
            paddingLeft: 15,
            paddingRight: 15,
            borderWidth: 1,
            borderRadius: 3,
            borderColor: '#dadee3',
            backgroundColor: 'white',
            
        },
    })

export default OtpScreen;
