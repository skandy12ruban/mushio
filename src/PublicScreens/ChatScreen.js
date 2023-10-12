import { View, Text,SafeAreaView } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import SearchView from '../Components/SearchView';
import Metrics from '../Constants/Metrics';
import PublicTopTabs from '../routes/PublicTopTabs';


const ChatScreen = () => {
    const navigation= useNavigation()
  return (
    <SafeAreaView style={{alignSelf:'center',width:'100%',flex:1}}>
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
    <View style={{marginTop:10,flex:1}}>
    <PublicTopTabs/>
    </View>
    </SafeAreaView>
  )
}

export default ChatScreen