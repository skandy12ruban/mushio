import { View, Text, SafeAreaView,TextInput,TouchableOpacity,Image } from 'react-native'
import React,{useState,useEffect} from 'react'
import AppDropDown from '../Components/AppDropDown'
import Metrics from '../Constants/Metrics'
import { useNavigation } from '@react-navigation/native'
import { API_BASE_URL } from '../api/ApiClient'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';

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
  // getCountryList()
},[])

  return (
    <SafeAreaView style={{flex:1,}}>
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
          width: '90%',marginTop:Metrics.rfv(50)
        }}>

             <Text style={{color:'white',alignSelf:'center',fontWeight:'bold',fontSize:30,fontFamily:'sans-serif-condensed'}}> Verification </Text> 
             {/* <Text style={{marginLeft:Metrics.rfv(30),color:'black',marginTop:20,fontWeight:'bold'}}>Country</Text>  */}
            <AppDropDown
                  label={''}
                  items={countryList ||[]}
                  value={country}
                  placeholder={'select country'}
                  placeholderTextColor={'black'}
                  changeText={(text) => {
                    setCountry( text)
                  }}
                  containerStyle={{
                    padding: Metrics.rfv(20),
                    width:'80%',alignSelf:'center',margin:20
                  }}
                  viewStyle={{
                    borderRadius: Metrics.rfv(30),
                    borderWidth:1,
                    borderColor:'blue'
                  }}
                />
                {/* <Text style={{marginLeft:Metrics.rfv(30),color:'black',fontWeight:'bold'}}>Phone number / email</Text> */}
                 <TextInput
                   value={email}
                   placeholder={'Enter Phone number/email'}
                    placeholderTextColor={'black'}
                    style={{padding:10,backgroundColor:'white',width:'70%',alignSelf:'center',margin:20,fontSize:15,fontWeight:'bold',
                    borderRadius:30,borderColor:'blue',borderWidth:1}}     
                     onChangeText={text => {
                      setEmail(text);
                     }}
                  />
              <TouchableOpacity style={{ alignSelf:'center',marginTop:20,}}
           onPress={()=>{navigation.navigate('OtpScreen')}}>
      {/* <Text style={{alignSelf:'center',color:'white'}}>Submit</Text> */}
                      <Icon
                      name={'arrow-circle-right'}
                      color={'white'}
                      size={Metrics.rfv(50)}
                      />
     </TouchableOpacity>
       </View>
       </LinearGradient>
    </SafeAreaView>
  )
}

export default VerificationScreen