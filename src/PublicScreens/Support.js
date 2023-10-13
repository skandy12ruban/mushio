import { View, Text,SafeAreaView } from 'react-native'
import React from 'react'
import Entypo from 'react-native-vector-icons/Entypo';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Metrics from '../Constants/Metrics';

const Support = () => {
  const navigation=useNavigation()
  return (
    <SafeAreaView style={{alignSelf:'center',width:'100%'}}>
     <View style={{margin:10,flexDirection:'row',justifyContent:'space-between'}}>
     <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        
        <Ionicons
            onPress={() => {
               navigation.goBack()
            }}
            style={{
              paddingRight: 5
            }}
            name={'arrow-back'}
            size={30}
            color={'black'}
          />
         <Text style={{paddingLeft:10,color:'black',fontWeight:'bold',marginTop:5,}}>{'Support'}</Text>
         </View>
         <View style={{bottom:10}}>
               <Entypo
                  name="menu"
                   size={40}
                   style={{color:'black',}}
                  onPress={()=>{ navigation.dispatch(DrawerActions.openDrawer());}}
                 /> 
        </View>
    </View>

    <View style={{alignSelf:'center',marginTop:Metrics.rfv(50)}}>
    <Text style={{fontWeight:'bold',color:'black',padding:10,fontSize:20}}>Customer Care</Text>
    <Text style={{color:'black',padding:10}}>customercaremushio@gmail.com</Text>
    <Text style={{fontWeight:'bold',color:'black',padding:10,fontSize:20}}>Complaints</Text>
    <Text style={{color:'black',color:'black',padding:10}}>complaintsmushio@gmail.com</Text>
    <Text style={{fontWeight:'bold',color:'black',padding:10,fontSize:20}}>Suggestions</Text>
    <Text style={{color:'black',padding:10}}>suggestionsmushio@gmail.com</Text>
    </View>
    </SafeAreaView>
  )
}

export default Support