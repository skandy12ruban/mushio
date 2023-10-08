import React, { useRef,useState } from 'react';
import { View, Text,TouchableOpacity,StyleSheet, Dimensions } from 'react-native';
import { STANDARD_SCREEN_HEIGHT } from '../utils/AppConst';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';
import Metrics from '../Constants/Metrics';
// import PhoneInput from 'react-native-phone-number-input';
import { API_BASE_URL } from '../api/ApiClient';

const { width, height } = Dimensions.get('window');

const SignIn = () => {
    const navigation=useNavigation()
    const [mobileNumber,setMobileNumber]=useState('')
    const [formattedNumber, setFormattedNumber] = useState("");
    const phoneInput = useRef(null);

    const generateOtp = async ()=>{
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Basic Og==");
        
        var raw = JSON.stringify({
          "mobile_number": `${mobileNumber}`
        });
        
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        
        fetch(`${API_BASE_URL}/otp/generate`, requestOptions)
          .then(response => response.text())
          .then( result => {
            console.log('result',result)
            navigation.navigate('OtpScreen',{mobileNumber:mobileNumber})
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
                        Hello there.
                    </Text>
                    <Text style={{
                        color: '#41bab0',
                        fontSize: 20,
                        fontWeight: 'bold'
                    }}>
                        Welcome back
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
                             }}>Enter your mobile number </Text>
                     </View>
        {/* <PhoneInput
            containerStyle={styles.phoneNumberView}
            textContainerStyle={{ paddingVertical: 0,  }}
            ref={phoneInput}
            defaultValue={mobileNumber}
            defaultCode="IN"
            layout="first"
            onChangeText={(text) => {
                setMobileNumber( text)
            }}
            withDarkTheme
            withShadow
            autoFocus
          /> */}
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
                                    if(mobileNumber != ''){
                                        generateOtp()  
                                    } else{
                                        alert('Please enter Mobile Number')
                                    }                                                       
                                }}>
                <Text style={{ color: 'white', paddingVertical: 10, fontSize: 15,fontWeight: 'bold',alignSelf: 'center',}}>Continue</Text>
                     </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
    SectionStyle: {
        flexDirection: 'row',
        height: 43,
        width: '88%',
        marginLeft: 22,
        marginRight: 40,
        margin: 8,
        alignItems: 'center'

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
        backgroundColor: 'white'
    },
    phoneNumberView: {
        width: '90%',
        height: Metrics.rfv(60),
        backgroundColor: 'white',
        alignSelf:'center',
        borderColor: '#dadee3',
        borderWidth: 1,
        borderRadius: Metrics.rfv(5),
        marginTop:10
      }
    
})
export default SignIn;
