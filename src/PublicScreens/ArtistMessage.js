import React, { useState } from 'react';
import { View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native';
import Loader from '../Components/Loader';
import Metrics from '../Constants/Metrics';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation, useRoute } from '@react-navigation/native';

const ArtistMessage = () => {
  const navigation = useNavigation()
  const [loading, setLoading] = useState(false)
  const route = useRoute()
  const { item } = route.params;

  return (
    <SafeAreaView style={{ alignSelf: 'center', width: '100%', flex: 1, }}>
      <Loader loading={loading}></Loader>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Ionicons
          onPress={() => {
            navigation.goBack()
          }}
          style={{
            marginLeft: 10, marginTop: 10
          }}
          name={'arrow-back'}
          size={30}
          color={'black'}
        />
        <TouchableOpacity style={{ backgroundColor: 'white', width: Metrics.rfv(60), height: Metrics.rfv(60), borderRadius: Metrics.rfv(10), marginRight: 30 }}
          onPress={() => {
            //   setProfileImg()
          }}>
          <Image
            style={{
              width: Metrics.rfv(60), height: Metrics.rfv(60), margin: Metrics.rfv(0), borderRadius: Metrics.rfv(10),
            }}
            source={require('../assets/images/profileImg.png')}
          />
        </TouchableOpacity>
        <View style={{ marginTop: 10, marginRight: 30 }}>
          <Text style={{ fontWeight: 'bold', color: 'black' }}>{item.name}</Text>
          <Text>Active now</Text>
        </View>
        <Ionicons
          onPress={() => { navigation.navigate('') }}
          style={{ marginLeft: 10, marginTop: 10, marginRight: 30 }}
          name={'videocam'}
          size={30}
          color={'black'}
        />
        {/* <View style={{marginTop:15,}}>
          <Entypo
            onPress={() => { navigation.navigate('') }}
            style={{ alignSelf:'flex-end',}}
            name={'dots-three-vertical'}
            size={30}
            color={'black'}
          />
          </View> */}

      </View>
      <View style={{ borderWidth: 0.5, marginTop: 10 }} />
      <ScrollView>
        <View style={{ flex: 2 }}>
          <Text>Artist messages </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default ArtistMessage;
