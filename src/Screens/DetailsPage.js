import React,{useEffect,useState} from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, FlatList, ImageBackground, Linking } from 'react-native';
import Header from '../Components/Header';
import { useRoute } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Card } from 'react-native-paper';
import Metrics from '../Constants/Metrics';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MapScreen from './MapScreen';
import { API_BASE_URL } from '../api/ApiClient';
import Loader from '../Components/Loader';

const DetailsPage = () => {
  const route = useRoute()
  const { item } = route.params;
  const[prodList,setprodList]=useState([])
  const[loading,setLoading]=useState(false)
console.log(item)
  const data = [
    { id: 1, image: require('../assets/images/powder1.jpg'), name: 'Rec Chilli', rupees: '₹99', rating: '4.8' },
    { id: 2, image: require('../assets/images/powder2.jpg'), name: 'Wheat Flour', rupees: '₹110', rating: '5.0' },
    { id: 3, image: require('../assets/images/powder3.jpg'), name: 'Termaric Powder', rupees: '₹70', rating: '4.6' },
    { id: 4, image: require('../assets/images/powder4.jpg'), name: 'Salt', rupees: '₹30', rating: '4.9' },
  ]

const getProductsList = async ()=>{
   setLoading(true)
  var raw = "";
  var requestOptions = {
    method: 'GET',
    body: raw,
    redirect: 'follow'
  };
  
  fetch(`${API_BASE_URL}/api/prod-list?id=${item.nid}`, requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log('prodList res',result)
       setprodList(result)
      setLoading(false)   
    })
    .catch(error => {
      console.log('error', error)
       setLoading(false)
    });
}

useEffect(()=>{
  getProductsList()
},[])

  const Item = ({ item }) => {
    return (
      <View style={{
        alignSelf: 'center', flex: 1
      }}>
        <Card style={{
          backgroundColor: 'white',
          width: Metrics.rfp(25),
          height: Metrics.rfp(35),
          margin: Metrics.rfp(1),
          borderRadius: Metrics.rfp(2), flex: 1
        }} onPress={() => { }}>
          <Image source={{uri:`${API_BASE_URL}${item.field_product_image_export}`}} 
            style={{
              resizeMode: 'cover',
              width:'90%',
              height: '70%',
              margin: Metrics.rfp(1),
              borderRadius: Metrics.rfp(2)
            }}
          />
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', flex: 1 }}>
            <Text style={{ color: 'black' }}>{item.field_product_title_export}</Text>
            {/* <Text style={{ color: 'black' }}> <AntDesign name='star' size={15} color='orange' />{item.rating}</Text> */}
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', margin: 5 }}>
            {/* <Text style={{ color: 'black' }}>{item.rupees}</Text> */}
            <AntDesign name='plus' size={20} color='white' style={{ backgroundColor: '#41bab0' }} />
          </View>
        </Card>

      </View>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <Loader loading={loading}></Loader>
      <Header name={'Details Page'} language={true} bellIcon={true} />
      <ImageBackground  source={{uri:`${API_BASE_URL}${ item.field_shop_banner_image != ''? item.field_shop_banner_image : item.field_banner_image}`}} 
        imageStyle={{
          borderRadius: 10, width: Metrics.rfv(350),
          height: Metrics.rfv(150),
          margin: 10, 
        }}>
        <View style={{
          width: Metrics.rfv(300), alignSelf: 'center',
          height: Metrics.rfv(150),
          marginTop: Metrics.rfv(90),
          borderRadius: Metrics.rfv(10), backgroundColor: '#41bab0',
        }}>
          <MapScreen />
        </View>
      </ImageBackground>
      <View style={{marginTop: Metrics.rfv(0) , flex: 1}}>
        <View style={{ alignSelf: 'center', margin: 10,  }}>
          {/* <Text style={{ color: 'black', alignSelf: 'center' }}>5.0 <Text style={{ color: 'orange' }}>★★★★★</Text>   (7). Clothing store</Text> */}
          <Text style={{ color: 'black',alignSelf:'center' }}>{item.title}.</Text>
          <Text style={{ color: 'black' }}>{item != undefined ? item.field_shop_address :''}</Text>
          {/* <Text style={{ color: 'black', alignSelf: 'center' }}>Home Delivery. In-stroe pick-up</Text> */}
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around',marginBottom:10, flex: 1 }}>
          <TouchableOpacity style={{ padding: 10, borderRadius: 5, backgroundColor: '#41bab0' }}
            onPress={() => { 
              const phoneNumber = `${item.field_contact_number}`;
              Linking.canOpenURL(`tel:${phoneNumber}`)
                .then(supported => {
                  if (!supported) {
                    // handle the error
                  } else {
                    return Linking.openURL(`tel:${phoneNumber}`);
                  }
                })
            }}>
            <View style={{ flexDirection: 'row', }}>
              <Feather name='phone-call' size={20} color='white' />
              <Text style={{ alignSelf: 'center', color: 'white', fontWeight: 'bold', marginLeft: 20 }}>Contact</Text>
            </View>

          </TouchableOpacity>
          <TouchableOpacity style={{ padding: 10, borderRadius: 5, backgroundColor: '#41bab0' }}
            onPress={() => { 
              const latitude = "";
const longitude = "";
const label = `${item.field_shop_address}`;

const url = Platform.select({
  ios: "maps:" + latitude + "," + longitude + "?q=" + label,
  android: "geo:" + latitude + "," + longitude + "?q=" + label
});

Linking.canOpenURL(url).then(supported => {
  if (supported) {
    return Linking.openURL(url);
  } else {
    const browser_url =
      "https://www.google.de/maps/@" +
      latitude +
      "," +
      longitude +
      "?q=" +
      label;
    return Linking.openURL(browser_url);
  }
});
            }}>
            <View style={{ flexDirection: 'row', }}>
              <Ionicons name='location' size={20} color='white' />
              <Text style={{ alignSelf: 'center', color: 'white', fontWeight: 'bold', marginLeft: 20 }}>Get Direction</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{flex:2,  marginBottom: Metrics.rfv(5) }}>
        <FlatList
          numColumns={2}
          showsHorizontalScrollIndicator={false}
          data={prodList}
          renderItem={Item}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
}

export default DetailsPage;
