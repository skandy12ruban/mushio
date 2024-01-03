import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import SearchView from '../Components/SearchView';
import Metrics from '../Constants/Metrics';
import PublicTopTabs from '../routes/PublicTopTabs';


const ChatScreen = () => {
  const navigation = useNavigation()
  return (
    <SafeAreaView style={{ alignSelf: 'flex-start', width: '100%', flex: 1 }}>
      <View style={{
        marginTop: 20, flexDirection: 'row',
        paddingHorizontal: 10,
      }}>
        <Ionicons
          onPress={() => {
            navigation.goBack()
          }}
          name={'arrow-back-outline'}
          size={30}
          color={'black'}
        />
        <Text style={{ marginLeft: 20, color: 'black', fontSize: 20, fontWeight: 'bold' }}>Messages</Text>
      </View>
      <View style={{ marginTop: 20 }}>
        <SearchView />
      </View>
      <View style={{ marginTop: 10, flex: 1 }}>
        <PublicTopTabs />
      </View>
    </SafeAreaView>
  )
}

export default ChatScreen