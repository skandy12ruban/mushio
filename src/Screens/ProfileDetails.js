import { View, Text,SafeAreaView,TouchableOpacity } from 'react-native'
import React from 'react'

const ProfileDetails = () => {
  return (
    <SafeAreaView>
      <Text style={{fontSize:25,fontWeight:'bold',alignSelf:'center',marginTop:100}}>Personal Details</Text>

      <View style={{alignSelf:'center',padding:10}}>
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={{fontSize:20,fontWeight:'bold',}}>Name  : </Text>
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={{fontSize:20,fontWeight:'bold',}}>Dob  : </Text>
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={{fontSize:20,fontWeight:'bold',}}>Important dates  : </Text>
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={{fontSize:20,fontWeight:'bold',}}>Phone number  : </Text>
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={{fontSize:20,fontWeight:'bold',}}>Tagline  : </Text>
        </View>

        <TouchableOpacity style={{backgroundColor:'#00B0FF',width:200,padding:10,
          alignSelf:'center',marginTop:20,borderRadius:5}}
           onPress={()=>{}}>
      <Text style={{alignSelf:'center',color:'white'}}>Submit</Text>
     </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default ProfileDetails