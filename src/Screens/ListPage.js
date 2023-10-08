import { View, Text, FlatList, Image, StyleSheet, ScrollView, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { Card } from 'react-native-paper'
import Metrics from '../Constants/Metrics'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation, useRoute } from '@react-navigation/native'
import { API_BASE_URL } from '../api/ApiClient'
import Loader from '../Components/Loader'


const ListPage = () => {
  const navigation = useNavigation()
  const route=useRoute()
  const {item,promocard}=route.params;
  const [shoplist,setShopList]=useState([])
  const [itemDetails,setItemDetails]=useState([])
  const[loading,setLoading]=useState(false)
  // console.log(item)
  const data1 = [
    { id: 1, image: require('../assets/images/card2.png') },
    { id: 2, image: require('../assets/images/card2.png') },
    { id: 3, image: require('../assets/images/card2.png') }
  ]


  const getShopList=async ()=>{
    setLoading(true)
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch(`${API_BASE_URL}/api/shop-list/${item.tid}`, requestOptions)
      .then(response => response.json())
      .then(result => {  
        console.log("shop list res",result)
        setShopList(result)
        setLoading(false)
      })
      .catch(error =>{ 
        console.log('error', error)
        setLoading(false)
      });
  }

  useEffect(()=>{
    getShopList()
  },[])
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
        setItemDetails(result)
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
    getShopList()
  },[])

  const Item = ({ item }) => {
    return (
      <View style={{
        alignSelf: 'center',
      }}>
        <Card style={{
          backgroundColor: 'white',
          width: Metrics.rfp(45),
          height: Metrics.rfp(20),
          margin: Metrics.rfp(1),
          // borderRadius: Metrics.rfp(1),
          marginLeft: 20,padding:0,
          backgroundColor: '#F1F1E9', 
        }} onPress={()=>{getItemDetails(item.field_shop_business_details_1)}}>
           <View style={{flexDirection:'row',justifyContent:'space-between'}}>
               <View style={{ width: "50%",}}>
                <Text style={{color:'black',margin:5,marginTop:Metrics.rfp(3), fontSize:20,fontWeight:'bold',alignSelf:'center'}}>{item.title}</Text>
                <Text style={{color:'black',margin:5,fontSize:15,}}>{item.field_shop_business_details}</Text>
               </View>
            <Image source={{uri:`${API_BASE_URL}${item.field_promo_image}`}}
            style={{  resizeMode: 'cover',
              // width: "100%",
              margin: Metrics.rfp(1),
              width: "40%",
              height: Metrics.rfv(120),
              borderRadius: Metrics.rfp(2)
            }}
              />
              </View>
        </Card>

      </View>
    )
  }
  const Item1 = ({ item }) => {
    return (
      <View style={{
        alignSelf: 'center',
        
      }}>
        <Card style={{
          backgroundColor: '#41bab0',
          // width: Metrics.rfp(25),
          // height: Metrics.rfp(25),
          padding:5,
          margin: Metrics.rfv(5),
          borderRadius: Metrics.rfp(2)
        }} onPress={() => { getItemDetails(item.nid) }}>
          <Image source={{uri:`${API_BASE_URL}${item.field_shop_banner_image != ''?item.field_shop_banner_image : item.field_banner_image}`}} 
          style={{width:Metrics.rfv(160),height:Metrics.rfv(130),borderRadius:5,}}/>
          <Text style={{alignSelf:'center',color:'white',fontWeight:'bold',fontSize:10,marginTop:5}}>{item.title}</Text>
        </Card>
       
      </View>
    )
  }

  return (
    <View style={styles.container}>
       <Loader loading={loading}></Loader>
      <Header name={'List Page'} language={true} bellIcon={true} />   
      <View style={{ marginTop: Metrics.rfv(10) }}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={promocard}
          renderItem={Item}
          keyExtractor={item => item.id}
        />
      </View>
      <View>
        <View style={{ justifyContent: 'space-between', flexDirection: 'row', margin: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>{item != undefined ? item.name: ''}</Text>
          <AntDesign name="menuunfold" size={25} color={'black'} />
        </View>
        <View style={{marginBottom:Platform.OS == "ios" ? 350 : 60 }}>
          <FlatList
            numColumns={2}
            showsVerticalScrollIndicator={false}
            data={shoplist}
            renderItem={Item1}
            keyExtractor={item => item.nid}
          />
        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  }
})
export default ListPage