import { View, Text, SafeAreaView,TextInput,TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import AppDropDown from '../Components/AppDropDown'
import Metrics from '../Constants/Metrics'
import { useNavigation } from '@react-navigation/native'


const VerificationScreen = () => {
  const navigation=useNavigation()
const[country,setCountry]=useState('')
const [phoneNumber,setPhoneNumber]=useState('')
 const data=[
  {value:1,label:'India'}
 ]

  return (
    <SafeAreaView style={{flex:1,backgroundColor:'lightblue'}}>

      <View style={{
          alignSelf: 'center',
          width: '90%',marginTop:Metrics.rfv(100)
        }}>

             <Text style={{color:'white',alignSelf:'center',fontWeight:'bold',fontSize:30}}> Verification </Text> 
             <Text style={{marginLeft:Metrics.rfv(30),color:'black',marginTop:20,fontWeight:'bold'}}>Country</Text> 
            <AppDropDown
                  label={''}
                  items={data ||[]}
                  value={country}
                  placeholder={'select country'}
                  changeText={(text) => {
                    setCountry( text)
                  }}
                  containerStyle={{
                    padding: Metrics.rfv(20),
                  }}
                  viewStyle={{
                    borderRadius: Metrics.rfv(5),
                    
                  }}
                />
                <Text style={{marginLeft:Metrics.rfv(30),color:'black',fontWeight:'bold'}}>Phone number / email</Text>
                 <TextInput
                   value={phoneNumber}
                   placeholder={'Enter'}
                    placeholderTextColor={'grey'}
                    style={{padding:10,backgroundColor:'white',borderRadius:5,margin:10,width:'90%',marginLeft: Metrics.rfv(20),}}
                    onChangeText={text => {
                      setPhoneNumber(text);
                     }}
                  />
             <TouchableOpacity style={{backgroundColor:'#00B0FF',width:'60%',padding:15,
                 alignSelf:'center',marginTop:20,borderRadius:5}}
                   onPress={()=>{navigation.navigate("OtpScreen")}}>
              <Text style={{alignSelf:'center',color:'white'}}>Next</Text>
         </TouchableOpacity>
       </View>
    </SafeAreaView>
  )
}

export default VerificationScreen