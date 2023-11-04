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

import { View, Text,SafeAreaView } from 'react-native'
import React from 'react'
import Entypo from 'react-native-vector-icons/Entypo';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Metrics from '../Constants/Metrics';

const ProfileDetails = () => {
  const navigation=useNavigation()
  return (
    <SafeAreaView style={{alignSelf:'center',width:'100%'}}>
     <View style={{margin:10,flexDirection:'row',justifyContent:'space-between'}}>
     <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        
        <Ionicons
            onPress={() => {
               navigation.navigate('Profile')
            }}
            style={{
              paddingRight: 5
            }}
            name={'arrow-back'}
            size={30}
            color={'black'}
          />
       
         </View>
         <Text style={{color:'black',fontWeight:'bold',fontSize:25}}>{'Edit Profile'}</Text>
         <View style={{bottom:10}}>
               <Entypo
                  name="menu"
                   size={40}
                   style={{color:'black',}}
                   onPress={()=>{ navigation.dispatch(DrawerActions.openDrawer());}}
                 /> 
        </View>
    </View>

    <View style={{marginTop:Metrics.rfv(50),marginLeft:30}}>
    <Text style={{fontWeight:'bold',color:'black',padding:10,fontSize:20}}>Nick Name  : </Text>
    <Text style={{fontWeight:'bold',color:'black',padding:10,fontSize:20}}>DOB :</Text>
    <Text style={{fontWeight:'bold',color:'black',padding:10,fontSize:20}}>IMP Dates : </Text>
    <Text style={{fontWeight:'bold',color:'black',padding:10,fontSize:20}}>Working : </Text>
    <Text style={{fontWeight:'bold',color:'black',padding:10,fontSize:20}}>Dream : </Text>
   
    </View>
    </SafeAreaView>
  )
}

export default ProfileDetails;
