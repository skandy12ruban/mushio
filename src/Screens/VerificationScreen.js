import { View, Text, SafeAreaView,TextInput,TouchableOpacity,Image,Dimensions,useColorScheme } from 'react-native'
import React,{useState,useEffect} from 'react'
import AppDropDown from '../Components/AppDropDown'
import Metrics from '../Constants/Metrics'
import { useNavigation, useRoute } from '@react-navigation/native'
import { API_BASE_URL } from '../api/ApiClient'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Loader from '../Components/Loader'
// import FontAwesome from 'react-native-vector-icons/FontAwesome';

const { width, height } = Dimensions.get('window');


const VerificationScreen = () => {
  const route=useRoute();
  const{values}=route.params;
  const navigation=useNavigation()
  const[loading,setLoading]=useState(false)
const[country,setCountry]=useState('')
const[countryList,setCountryList]=useState([])
const [email,setEmail]=useState('')
const[phoneNumber,setPhoneNumber]=useState('')
const theme = useColorScheme();


  const getCountryList =async ()=>{
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    console.log(`${API_BASE_URL}/api/getCountries`)
    fetch(`${API_BASE_URL}/api/getCountries`, requestOptions)
      .then(response => response.json())
      .then(result =>{
         const country=result.data.map(e=>({
             ...e,
             label: e.name,
             value:e.code
         }))
         setCountryList(country)
         console.log('country res',country)
        })
      .catch(error =>{ console.log('error', error)});
  }


const sendOtp = async ()=>{
  setLoading(true)
  let myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

let raw = JSON.stringify({
  "email": `${email}`
});

let requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch(`${API_BASE_URL}/api/userAuth/sendOtp`, requestOptions)
  .then(response => response.json())
  .then(result => {
    console.log(result)
    if(result && result.success == true){
      navigation.navigate('OtpScreen',{values:values,country:country,email:email,phoneNumber:phoneNumber})
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

useEffect(()=>{
  getCountryList()
},[])

  return (
    <SafeAreaView style={{flex:1,backgroundColor:theme === 'dark' ? 'white':'black',}}>
       {/* <LinearGradient
      colors={['#cdffd8', '#94b9ff' ]}
      style={{flex:1,width:"100%",height:'100%'}}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
    > */}
      <Loader loading={loading}></Loader>
      <View style={{margin:10,flexDirection:'row',justifyContent:'space-between'}}>
        <Ionicons
        name='arrow-back'
        size={50}
        color='#0058aa'
        onPress={()=>{navigation.goBack()}}
        />
              {/* <Image
          style={{
             width:60,height:60,margin:10,borderRadius:10,
            }}
           source={require('../assets/images/image6.jpg')}
         /> */}
         </View>
      <View style={{
          alignSelf: 'center',
          width: '90%',marginTop:Metrics.rfv(50)
        }}>

             <Text style={{color:'#0058aa',alignSelf:'center',fontWeight:'bold',fontSize:30,fontFamily:'sans-serif-condensed'}}> Verification </Text> 
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
                    padding: Metrics.rfv(0),
                    width:'70%',alignSelf:'center',margin:0
                  }}
                  viewStyle={{
                    borderRadius: Metrics.rfv(10),
                    borderWidth:1,
                    borderColor:'blue',marginTop:10
                  }}
                />
                {/* <Text style={{marginLeft:Metrics.rfv(30),color:'black',fontWeight:'bold'}}>Phone number / email</Text> */}
                 <TextInput
                   value={email}
                   placeholder={' email'}
                    placeholderTextColor={'black'}
                    style={{padding:5,backgroundColor:'white',width:'70%',alignSelf:'center',margin:10,fontSize:15,fontWeight:'bold',color:theme === 'dark' ?'black':'',
                    borderRadius:10,borderColor:'blue',borderWidth:1,}}     
                     onChangeText={text => {
                      setEmail(text);
                     }}
                  /> 
                    <TextInput
                   value={phoneNumber}
                   placeholder={' phone number'}
                    placeholderTextColor={'black'}
                    style={{padding:5,backgroundColor:'white',width:'70%',alignSelf:'center',margin:10,fontSize:15,fontWeight:'bold',color:theme === 'dark' ?'black':'',
                    borderRadius:10,borderColor:'blue',borderWidth:1}}    
                    keyboardType='numeric' 
                     onChangeText={text => {
                      setPhoneNumber(text);
                     }}
                  /> 
              <TouchableOpacity style={{  backgroundColor: theme === 'dark' ?'black':'white',
                    padding:5,
                    width: width * 0.4,
                    alignSelf: 'center',
                    borderRadius: 10,
                    marginTop: 20,
                  }}
                  activeOpacity={0.5}
           onPress={()=>{
            if(country == '' || country == 'select country'){
                    alert('please select country')
            }else if(email == ''){
                   alert('please enter email')
            }else if(phoneNumber == ''){
              alert('please enter phoneNumber')
             }else{
              sendOtp()
            }
            }}>
       <Text style={{color:theme === 'dark' ? 'white':'black',
    paddingVertical: 5,
    fontSize: 15,
    fontWeight: 'bold',
    alignSelf: 'center',}}>Next</Text>
                      {/* <Icon
                      name={'arrow-circle-right'}
                      color={'white'}
                      size={Metrics.rfv(50)}
                      /> */}
     </TouchableOpacity>
       </View>
       {/* </LinearGradient> */}
    </SafeAreaView>
  )
}

export default VerificationScreen