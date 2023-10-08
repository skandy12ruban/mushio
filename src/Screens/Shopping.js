import { View, Text, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import SearchView from '../Components/SearchView'
import Entypo from 'react-native-vector-icons/Entypo';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Metrics from '../Constants/Metrics';
import { useNavigation } from '@react-navigation/native';
import { API_BASE_URL } from '../api/ApiClient';
import Loader from '../Components/Loader';
import { ImageBackground } from 'react-native';


const Shopping = () => {

  const navigation = useNavigation();
  const[categories,setCategories]=useState([])
  const[services,setServices]=useState([])
  const[promocard,setPromocards]=useState([])
  const[loading,setLoading]=useState(false)

 
  const getPromoCards = async ()=>{
    setLoading(true)
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch(`${API_BASE_URL}/api/promo-card`, requestOptions)
      .then(response => response.json())
      .then(result => {
        result = result.map((e,i)=>{
          return { id : i+1, ...e}
       }) 
        // console.log('promo card res',result)
        setPromocards(result)
        setLoading(false)
      })
      .catch(error => {
        console.log('error', error)
        setLoading(false)
      });
  }

  const getCategories = async ()=>{
    setLoading(true)
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch(`${API_BASE_URL}/api/category`, requestOptions)
      .then(response => response.json())
      .then(result => {
        // console.log("categories res",result)
        setCategories(result)
        setLoading(false)
      })
      .catch(error => {
        console.log('error', error)
        setLoading(false)
    });
  }

  const getServices = async ()=>{
    setLoading(true)
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch(`${API_BASE_URL}/api/services`, requestOptions)
      .then(response => response.json())
      .then(result => {
        // console.log("services res",result)
        setServices(result)
        setLoading(false)
      })
      .catch(error =>{ 
        console.log('error', error)
        setLoading(false)
      });
  }

  const getItemDetails=async (id)=>{
    setLoading(true)
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch(`${API_BASE_URL}/api/product-details?id=${id}`, requestOptions)
      .then(response => response.json())
      .then(result => {  
        console.log("item details res",result)
        if(result.length > 0){
          navigation.navigate('DetailsPage', { item: result[0] })
          setLoading(false)
        }
        // else{

        // }
        setLoading(false)
      })
      .catch(error => {
        console.log('error', error)
        setLoading(false)
      });
  }

useEffect(()=>{
  getPromoCards()
  getCategories()
  getServices()
},[])

  const Item = ({ item }) => {
    return (
      <View style={{
        alignSelf: 'center',
      }}>
        <Card style={{
          backgroundColor: 'white',
          width: Metrics.rfp(45),
          height: Metrics.rfp(25),
          margin: Metrics.rfp(1),
          // borderRadius: Metrics.rfp(1),
          marginLeft: 20,padding:0,
          backgroundColor: '#F1F1E9', 
        }} onPress={()=>{getItemDetails(item.field_shop_business_details_1)}}>
          {/* <ImageBackground source={{uri:`${API_BASE_URL}${item.field_promo_image}`}}
            imageStyle={{
              resizeMode: 'cover',
              // width: "100%",
              // margin: Metrics.rfp(1),
              // width:300,height:160,
              height: Metrics.rfv(170),
              borderRadius: Metrics.rfp(2)
            }} >
            <Text style={{color:'black',margin:5,marginTop:Metrics.rfp(10), width: "50%",fontSize:15,fontWeight:'bold'}}>{item.title}</Text>
            <Text style={{color:'black',margin:5,fontSize:15,}}>{item.field_shop_business_details}</Text>
         </ImageBackground> */}
         <View style={{flexDirection:'row',justifyContent:'space-between'}}>
               <View style={{ width: "50%",}}>
                <Text style={{color:'black',margin:5,marginTop:Metrics.rfp(8), fontSize:20,fontWeight:'bold',alignSelf:'center'}}>{item.title}</Text>
                <Text style={{color:'black',margin:5,fontSize:15,}}>{item.field_shop_business_details}</Text>
               </View>
            <Image source={{uri:`${API_BASE_URL}${item.field_promo_image}`}}
            style={{  resizeMode: 'cover',
              // width: "100%",
              margin: Metrics.rfp(1),
              width: "40%",
              height: Metrics.rfv(150),
              borderRadius: Metrics.rfp(2)
            }}
              />
              </View>
        </Card>

      </View>
    )
  }
  const Item1 = ({ item }) => {
    // console.log(item.name)
    return (
      <View style={{ margin: 10 }}>
        <Card style={{ backgroundColor: '#41bab0', padding: 5,width:Metrics.rfv(100),height:Metrics.rfv(85) }} onPress={() => {
          navigation.navigate('ListPage',{item:item,promocard:promocard})
        }}>
           <Image source={{uri:`${API_BASE_URL}${item.field_icon}`}} style={{width:50,height:50,alignSelf:'center'}} />
          <Text style={{ color: 'white', alignSelf:'center',fontSize:10,}}>{item.name}</Text>
        </Card>

      </View>
    )
  }
  const Item2 = ({ item }) => {
    // console.log(item.name)
    return (
      <View style={{ margin: 10 }}>
        <Card style={{ backgroundColor: '#41bab0', padding: 5,width:Metrics.rfv(100),height:Metrics.rfv(90) }} onPress={() => {
          navigation.navigate('ListPage',{item:item,promocard:promocard})
        }}>
           <Image source={{uri:`${API_BASE_URL}${item.field_icons}`}} style={{width:50,height:50,alignSelf:'center'}} />
          <Text style={{ color: 'white', alignSelf:'center',fontSize:10,margin:5}}>{item.name}</Text>
        </Card>

      </View>
    )
  }
  return (
    <View style={styles.container}>
        <Loader loading={loading}></Loader>
      <Header name={' '} Language={''} bellIcon={true} />
      <TouchableOpacity onPress={() => { alert('location') }}>
        <View style={{ flexDirection: 'row', justfyContent: 'space-evenly', padding: 10 }}>
          <View style={{
            flexDirection: 'row', alignItems: 'center', backgroundColor: '#41bab0',
            borderRadius: 20, height: 30, width: 30, padding: 5, marginTop: 5
          }}>
            <Entypo name="location-pin" size={20} color={'white'} />
          </View>
          <Text style={{ marginLeft: 10 }}> Benguluru {'\n'} BTM Layout. 500628 </Text>
          <View style={{ justfyContent: 'space-around', flexDirection: 'row', marginLeft: 130 }}>
            <Entypo name="chevron-right" size={25} color={'black'} style={{ alignSelf: 'center', marginTop: 10, justfyContent: 'space-between' }} />
          </View>
        </View>
      </TouchableOpacity>
      <View>
        <SearchView/>
      </View>
      <ScrollView>
        <View style={{}}>
          <View style={{ marginTop: 1 }}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal
              data={promocard}
              renderItem={Item}
              keyExtractor={item => item.id}
            />
          </View>
          <View style={{ justifyContent: 'space-between', flexDirection: 'row', margin: 5 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black',marginLeft:10 }}>Categories</Text>
            <Entypo name="chevron-right" size={25} color={'black'} />
          </View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={categories}
            renderItem={Item1}
            keyExtractor={item => item.tid}
          />
          <View>
            <View style={{ justifyContent: 'space-between', flexDirection: 'row', margin: 5 }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black',marginLeft:10 }}>Services</Text>
              <Entypo name="chevron-right" size={25} color={'black'} />
            </View>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={services}
              renderItem={Item2}
              keyExtractor={item => item.tid}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,

  }
})
export default Shopping