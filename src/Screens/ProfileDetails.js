// import { View, Text,SafeAreaView,TouchableOpacity,Alert,TextInput,ScrollView } from 'react-native'
// import React,{useState} from 'react'
// import { getUserProfileInfo, saveUserProfileInfo, saveUserType } from '../utils/AsyncStorageHelper';
// import { useNavigation } from '@react-navigation/native';
// import { useDispatch } from 'react-redux';
// import { logout } from '../Redux/reducer/User';
// import Metrics from '../Constants/Metrics';
// import Entypo from 'react-native-vector-icons/Entypo';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import AppDropDown from '../Components/AppDropDown'

// const ProfileDetails = () => {

//   const dispatch = useDispatch()
//   const navigation= useNavigation()

//   const onLogoutPress = async () => {
//     const res= await getUserProfileInfo()
 
//    await saveUserProfileInfo({})
//    await saveUserType({})
//     dispatch(logout());
//     navigation.navigate('Login')
//   };
//   const data=[
//     {value:1,label:'Phone No'},{value:2,label:'Email Id'}
//    ]
//   const[name,setName]=useState('')
//   const[dob,setDob]=useState('')
//   const[dates,setDates]=useState('') 
//   const[phoneNo,setPhoneNo]=useState('')
//   const[tagline,setTagline]=useState('')
//  const [customerCare,setCustomerCare]=useState('')

//   return (
//     <SafeAreaView style={{backgroundColor:'black',flex:1}}>
//       <View style={{marginTop:30,flexDirection:'row',justifyContent:'space-around'}}>
//       <Entypo
//            name="cross"
//            color={'white'}
//            size={30}
//            onPress={()=>{navigation.goBack()}}
//             />
//             <Ionicons
//            name="checkmark-circle-sharp"
//            color={'white'}
//            size={30}
//             />
//       </View>
//       <ScrollView>
//       <Text style={{fontSize:25,fontWeight:'bold',alignSelf:'center',marginTop:30,color:'white'}}>Personal Details</Text>

//       <View style={{alignSelf:'center',padding:10, width: '90%',}}>
//         <View style={{}}>
//         <Text style={{fontSize:15,fontWeight:'bold',color:'white',marginLeft:20}}>Name  : </Text>
//              <TextInput
//                    value={name}
//                    placeholder={'Enter name'}
//                    placeholderTextColor={'grey'}
//                    style={{padding:10,backgroundColor:'white',borderRadius:5,margin:10,width:'90%',marginLeft: Metrics.rfv(20),}}
//                    onChangeText={text => {
//                    setName(text);
//                    }}
//                  />
//         </View>
//         <View style={{}}>
//         <Text style={{fontSize:15,fontWeight:'bold',color:'white',marginLeft:20}}>Dob  : </Text>
//                <TextInput
//                    value={dob}
//                    placeholder={'Enter dob'}
//                    placeholderTextColor={'grey'}
//                    style={{padding:10,backgroundColor:'white',borderRadius:5,margin:10,width:'90%',marginLeft: Metrics.rfv(20),}}
//                    onChangeText={text => {
//                    setDob(text);
//                    }}
//                  />
//         </View>
//         <View style={{}}>
//         <Text style={{fontSize:15,fontWeight:'bold',color:'white',marginLeft:20}}>Important dates  : </Text>
//                <TextInput
//                    value={dates}
//                    placeholder={'Enter dates'}
//                    placeholderTextColor={'grey'}
//                    style={{padding:10,backgroundColor:'white',borderRadius:5,margin:10,width:'90%',marginLeft: Metrics.rfv(20),}}
//                    onChangeText={text => {
//                    setDates(text);
//                    }}
//                  />
//         </View>
//         <View style={{}}>
//         <Text style={{fontSize:15,fontWeight:'bold',color:'white',marginLeft:20}}>Phone number  : </Text>
//               <TextInput
//                    value={phoneNo}
//                    placeholder={'Enter phoneNo'}
//                    placeholderTextColor={'grey'}
//                    style={{padding:10,backgroundColor:'white',borderRadius:5,margin:10,width:'90%',marginLeft: Metrics.rfv(20),}}
//                    onChangeText={text => {
//                    setPhoneNo(text);
//                    }}
//                  />
//         </View>
//         <View style={{}}>
//         <Text style={{fontSize:15,fontWeight:'bold',color:'white',marginLeft:20}}>Tagline  : </Text>
//                <TextInput
//                    value={tagline}
//                    placeholder={'Enter Tagline'}
//                    placeholderTextColor={'grey'}
//                    style={{padding:10,backgroundColor:'white',borderRadius:5,margin:10,width:'90%',marginLeft: Metrics.rfv(20),}}
//                    onChangeText={text => {
//                    setTagline(text);
//                    }}
//                  />
//         </View>
//         <View>
//         <Text style={{fontSize:15,fontWeight:'bold',color:'white',marginLeft:20}}>Customer care  : </Text>
//                <AppDropDown
//                   label={''}
//                   items={data ||[]}
//                   value={customerCare}
//                   placeholder={'select customer care'}
//                   changeText={(text) => {
//                     setCustomerCare( text)
//                   }}
//                   containerStyle={{
//                     padding: Metrics.rfv(20),
//                   }}
//                   viewStyle={{
//                     borderRadius: Metrics.rfv(5),
                    
//                   }}
//                 />
//         </View>

//         <TouchableOpacity style={{backgroundColor:'white',width:200,padding:10,
//           alignSelf:'center',marginTop:20,borderRadius:5}}
//           onPress={()=>{
//             Alert.alert("Logout", "Are you want Logout ?",
//             [
//               { text: "Cancel", onPress: () => { } },
//               { text: "Ok", onPress: () => onLogoutPress() }
//             ])
//           }}>
//       <Text style={{alignSelf:'center',color:'black'}}>Logout</Text>
//      </TouchableOpacity>
//       </View>
//       </ScrollView>
//     </SafeAreaView>
//   )
// }

// export default ProfileDetails

import { View, Text,SafeAreaView ,TextInput,TouchableOpacity,ScrollView,Alert} from 'react-native'
import React,{useState,useEffect} from 'react'
import Entypo from 'react-native-vector-icons/Entypo';
import { DrawerActions, useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Metrics from '../Constants/Metrics';
import { API_BASE_URL } from '../api/ApiClient';
import { getUserProfileInfo } from '../utils/AsyncStorageHelper';
import Loader from '../Components/Loader';
import Icon from 'react-native-vector-icons/FontAwesome';

const ProfileDetails = () => {
  const navigation=useNavigation()
  const [loading,setLoading]=useState(false)
  const route=useRoute();
  const {profileRes,getProfile}=route.params;
  // const[profileRes,setProfileRes]=useState({})
  
  const[name,setName]=useState(profileRes && profileRes.nickName ? profileRes.nickName :'')
  const[dob,setDob]=useState(profileRes && profileRes.dob ? profileRes.dob.slice(0,10) :'')
  const[dates,setDates]=useState(profileRes && profileRes.impDates ? profileRes.impDates :"")
  const[working,setWorking]=useState(profileRes && profileRes.workingHours ? profileRes.workingHours :'')
  const[dream,setDream]=useState(profileRes && profileRes.dream ? profileRes.dream :'')

  const Profile= async()=>{
    const res = await getUserProfileInfo()
    setLoading(true)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${res.accessToken}`);
    var raw = JSON.stringify({
          "privateMode":true,
        "nickName": `${name}`,
        "dob": `${dob}`,
        "impDates":[],
        "workingHours": `${working}`,
        "dream": `${dream}`,
      });
      
      var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      
      fetch(`${API_BASE_URL}/api/user/myProfile`, requestOptions)
  .then(response => response.json())
  .then(result => {
    
    if(result && result.success == true){
      Alert.alert(' ', result.message, [
        {
          text: 'Cancel',
          
          style: 'cancel',
        },
        {text: 'OK', onPress: () =>  navigation.goBack()},
      ]);
     getProfile()
      setLoading(false)
    }
    setLoading(false)
  })
  .catch(error => {
    alert(result.message)
    
    setLoading(false)
  });
   }


      useEffect(()=>{
       
      },[])

  return (
    <SafeAreaView style={{alignSelf:'center',width:'100%'}}>
     {/* <View style={{margin:10,flexDirection:'row',justifyContent:'space-between'}}> */}
     <Loader loading={loading}></Loader>
     <ScrollView>
     <View style={{flexDirection:'row',margin:10}}>
        
        <Ionicons
            onPress={() => {
               navigation.goBack()
            }}
            style={{
              paddingLeft: 10
            }}
            name={'arrow-back'}
            size={30}
            color={'black'}
          />
        <Text style={{color:'black',fontWeight:'bold',fontSize:25, paddingLeft: 20}}>{'Edit Profile'}</Text>
         </View>
        
         {/* <View style={{bottom:10}}>
               <Entypo
                  name="menu"
                   size={40}
                   style={{color:'black',}}
                   onPress={()=>{ navigation.dispatch(DrawerActions.openDrawer());}}
                 /> 
        </View> */}
    {/* </View> */}

    <View style={{marginTop:Metrics.rfv(50),marginLeft:30}}>
    <Text style={{fontWeight:'bold',color:'black',padding:10,fontSize:20}}>Nick Name  : </Text>
              <TextInput
                   value={name}
                   placeholder={'Enter name'}
                    // placeholderTextColor={'black'}
                    style={{padding:10,backgroundColor:'white',width:'70%',alignSelf:'center',fontSize:15,fontWeight:'bold', borderRadius: Metrics.rfv(10),
                   }}     
                     onChangeText={text => {
                      setName(text);
                     }}
                  /> 
    <Text style={{fontWeight:'bold',color:'black',padding:10,fontSize:20}}>DOB :</Text>
          <TextInput
                   value={dob}
                   placeholder={'Enter Dob'}
                    // placeholderTextColor={'black'}
                    style={{padding:10,backgroundColor:'white',width:'70%',alignSelf:'center',fontSize:15,fontWeight:'bold', borderRadius: Metrics.rfv(10),
                   }}     
                     onChangeText={text => {
                      setDob(text);
                     }}
                  />
    {/* <Text style={{fontWeight:'bold',color:'black',padding:10,fontSize:20}}>IMP Dates : </Text>
          <TextInput
                   value={dates}
                   placeholder={'Enter dates yyyy-mm-dd'}
                    // placeholderTextColor={'black'}
                    style={{padding:10,backgroundColor:'white',width:'70%',alignSelf:'center',fontSize:15,fontWeight:'bold', borderRadius: Metrics.rfv(10),
                   }}     
                     onChangeText={text => {
                      
                      setDates(text);
                     }}
                  /> */}
    <Text style={{fontWeight:'bold',color:'black',padding:10,fontSize:20}}>Working : </Text>
         <TextInput
                   value={working}
                   placeholder={'Enter working'}
                    // placeholderTextColor={'black'}
                    style={{padding:10,backgroundColor:'white',width:'70%',alignSelf:'center',fontSize:15,fontWeight:'bold', borderRadius: Metrics.rfv(10),
                   }}     
                     onChangeText={text => {
                      setWorking(text);
                     }}
                  />
    <Text style={{fontWeight:'bold',color:'black',padding:10,fontSize:20}}>Dream : </Text>
            <TextInput
                   value={dream}
                   placeholder={'Enter dream'}
                    // placeholderTextColor={'black'}
                    style={{padding:10,backgroundColor:'white',width:'70%',alignSelf:'center',fontSize:15,fontWeight:'bold', borderRadius: Metrics.rfv(10),
                   }}     
                     onChangeText={text => {
                      setDream(text);
                     }}
                  />
    </View>

    <TouchableOpacity style={{ alignSelf:'center',marginTop:20,marginBottom:50,backgroundColor:'black',
    padding:15,borderRadius: Metrics.rfv(10),width:'40%'}}
           onPress={()=>{
            // if(country == '' || country == 'select country'){
            //         alert('please select country')
            // }else if(email == ''){
            //        alert('please enter email')
            // }else{
              Profile()
            // }
            }}>
      <Text style={{alignSelf:'center',color:'white'}}>Submit</Text>
                      {/* <Icon
                      name={'arrow-circle-right'}
                      color={'white'}
                      size={Metrics.rfv(50)}
                      /> */}
     </TouchableOpacity>
     </ScrollView>
    </SafeAreaView>
  )
}

export default ProfileDetails;
