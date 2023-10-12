import { View, Text,SafeAreaView } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import SearchView from '../Components/SearchView';
import Metrics from '../Constants/Metrics';

const ChatScreen = () => {
    const navigation= useNavigation()
  return (
    <SafeAreaView style={{alignSelf:'center',width:'100%'}}>
    <View>
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
             <SearchView/>
      <Text style={{marginLeft:Metrics.rfv(20),color:'black',fontSize:20,fontWeight:'bold'}}>Messages</Text>
    </View>
    </SafeAreaView>
  )
}

export default ChatScreen