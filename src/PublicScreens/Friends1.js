import { View, Text, SafeAreaView, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { getUserProfileInfo } from '../utils/AsyncStorageHelper';
import { getAPI } from '../api/api-utils';
import Loader from '../Components/Loader'
import { Card } from 'react-native-paper'
import Metrics from '../Constants/Metrics'
import { useNavigation } from '@react-navigation/native'
import { API_BASE_URL } from '../api/ApiClient'
import { format } from 'date-fns';
const Friends1 = () => {
  const navigation = useNavigation()
  const [loading, setLoading] = useState(true)
  const [chatList, setChatList] = useState([]);
  const data = [
    { id: 1, image: require('../assets/images/profileImg.png'), name: 'Satish', time: '6:30 PM', message: 'Hi' },
    { id: 2, image: require('../assets/images/profileImg.png'), name: 'Bharath', time: '5:30 AM', message: 'Hello' },
    { id: 3, image: require('../assets/images/profileImg.png'), name: 'Vamsi', time: '7:45 AM', message: 'Welcome' },
    { id: 4, image: require('../assets/images/profileImg.png'), name: 'Srikanth', time: '12:00 Pm', message: 'How are you' },
    { id: 5, image: require('../assets/images/profileImg.png'), name: 'Santhosh', time: '9:00 AM', message: 'Where are you' },
    { id: 6, image: require('../assets/images/profileImg.png'), name: 'Kiran', time: '5:15 PM', message: 'Ok' },
  ]

  const fetchChatList = async () => {
    const userDetails = await getUserProfileInfo();
    let url = `${API_BASE_URL}/api/chat/fetchChats?userType=audience`;
    getAPI(url).then((res) => {
      setLoading(false);
      let chatList = fetchParticipant(res.data.list, userDetails);
      setChatList(chatList)
    })
  }

  const fetchParticipant = (chatList, userData) => {

    chatList.forEach(item => {
      let participants = item['participants'];
      let sender = participants.find(u => u._id !== userData._id);
      if (sender) {
        item['participantId'] = sender._id
        item['participantName'] = sender.name
        item['participantImage'] = sender.profileImage
        item['currentUser'] = userData
      }
    })
    return chatList
  }

  useEffect(() => {
    fetchChatList();
  }, [])


  const Item = ({ item }) => {
    return (
      <View style={{ paddingVertical: 10, paddingHorizontal: 10, borderBottomColor: '#00000033', borderBottomWidth: 1 }}>
        <TouchableOpacity onPress={() => { navigation.navigate('FriendsMessage', { chatData: item }) }} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
            {item.participantImage !== null &&
              <Image
                style={{
                  width: Metrics.rfv(45), height: Metrics.rfv(45), margin: Metrics.rfv(3), borderRadius: Metrics.rfv(30),
                }}  
                source={{ uri: item.participantImage}}
              />
            }
            <View>
              <Text style={{ paddingLeft: 10, color: 'black', fontWeight: 'bold', marginTop: 5, }}>{item.participantName}</Text>
              <Text style={{ paddingLeft: 10, color: 'black', marginTop: 5, }}>{item.lastMessage.message}</Text>
            </View>

          </View>
          <View>
            <Text style={{ color: 'black', alignSelf: 'center' }}>{format(item.lastMessage.createdAt, 'p')}</Text>
            {/* TODO: Rating display should be done */}
          </View>
        </TouchableOpacity>

      </View>
    )
  }


  return (
    <SafeAreaView style={{ alignSelf: 'center', width: '100%' }}>
      <Loader loading={loading}></Loader>
      <FlatList
        data={chatList}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={item => item._id}
      />
    </SafeAreaView>
  )
}

export default Friends1;
