import { View, Text,FlatList,Image } from 'react-native'
import React, { useState,useEffect } from 'react'
import Loader from '../Components/Loader'
import Header from '../Components/Header'
import Metrics from '../Constants/Metrics'
import { API_BASE_URL } from '../api/ApiClient'
import { Card } from 'react-native-paper';

const Likes = () => {
  const [loading,setLoading]=useState(false)
  const[promolist,setPromoList]=useState([])

  const getPromoCards = async ()=>{
    setLoading(true)
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch(`${API_BASE_URL}/api/promo-list`, requestOptions)
      .then(response => response.json())
      .then(result => {
        result = result.map((e,i)=>{
          return { id : i+1, ...e}
       }) 
        // console.log('promo card res',result)
        setPromoList(result)
        setLoading(false)
      })
      .catch(error => {
        console.log('error', error)
        setLoading(false)
      });
  }

  useEffect(()=>{
    getPromoCards()
  },[])

  const Item = ({ item }) => {
    return (
      <View style={{
        alignSelf: 'center',
      }}>
        <Card style={{
          backgroundColor: 'white',
          width: Metrics.rfp(50),
          height: Metrics.rfp(23),
          margin: Metrics.rfp(1),
          // borderRadius: Metrics.rfp(1),
          margin:10,
          padding:0,
          backgroundColor: '#CBDEDC', 
        }} onPress={()=>{}}>
          <View style={{flexDirection:'row',}}>
         <View style={{width:"90%",}}>
         <View style={{flexDirection:'row',justifyContent:'space-between'}}>
               <View style={{ width: "50%",}}>
               <Text style={{color:'#41bab0',margin:5,fontSize:20,marginTop:Metrics.rfp(2),alignSelf:'center',fontWeight:'bold',}}>{item.field_shop_business_details_export}</Text>
                <Text style={{color:'black',margin:5, fontSize:15,alignSelf:'center',width: "70%",fontWeight:'500',}}>{item.field_promo_details_export}</Text>
               </View>
            <Image source={{uri:`${API_BASE_URL}${item.field_promo_image_export}`}}
            style={{  resizeMode: 'cover',
              // width: "100%",
              margin: Metrics.rfp(1),
              width: "40%",
              height: Metrics.rfv(140),
              borderRadius: Metrics.rfp(2)
            }}
              />
              </View>
              </View>
              <View style={{backgroundColor:'#41bab0',width:'10%',  borderTopRightRadius: Metrics.rfp(2),borderBottomRightRadius: Metrics.rfp(2)}}>
              <Text style={{color:'white',fontWeight:'bold',fontSize:11,marginTop:Metrics.rfv(60),transform: [{ rotate: '-90deg', }], }}>{`Offers`}</Text>
          
              </View>
              
              </View>
        </Card>

      </View>
    )
  }
  return (
    <View>
      <Loader loading={loading}></Loader>
      <Header name={'Offers'} language={true} bellIcon={true} />   
      <View style={{ marginTop: Metrics.rfv(10),marginBottom:100 }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={promolist}
          renderItem={Item}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  )
}

export default Likes