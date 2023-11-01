import { View, Text, SafeAreaView,TextInput,TouchableOpacity } from 'react-native'
import React,{useState,useEffect} from 'react'
import AppDropDown from '../Components/AppDropDown'
import Metrics from '../Constants/Metrics'
import { useNavigation } from '@react-navigation/native'
import { API_BASE_URL } from '../api/ApiClient'



const VerificationScreen = () => {
  const navigation=useNavigation()
const[country,setCountry]=useState('')
const[countryList,setCountryList]=useState([])
const [email,setEmail]=useState('')

  const getCountryList =async ()=>{
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch(`${API_BASE_URL}/api/users/countryList`, requestOptions)
      .then(response => response.json())
      .then(result =>{
        //  console.log('country res',result.data)
         const country=result.data.map(e=>({
             ...e,
             label: e.country_name,
             value:e.country_id
         }))
         setCountryList(country)
        })
      .catch(error =>{ console.log('error', error)});
  }

useEffect(()=>{
  getCountryList()
},[])

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
                  items={countryList ||[]}
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
                   value={email}
                   placeholder={'Enter'}
                    placeholderTextColor={'grey'}
                    style={{padding:10,backgroundColor:'white',borderRadius:5,margin:10,width:'90%',marginLeft: Metrics.rfv(20),}}
                    onChangeText={text => {
                      setEmail(text);
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