import { View, Text,SafeAreaView } from 'react-native'
import React from 'react'
import Entypo from 'react-native-vector-icons/Entypo';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

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

    <View>
    <Text>Edit profile</Text>
    </View>
    </SafeAreaView>
  )
}

export default Support