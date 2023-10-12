import { View, Text, SafeAreaView,FlatList,TouchableOpacity,Image } from 'react-native'
import React,{useState,useEffect} from 'react'

import Loader from '../Components/Loader'
import { Card } from 'react-native-paper'
import Metrics from '../Constants/Metrics'
import Header from '../Components/Header'

const Cards = () => {
   const [loading,setLoading]=useState(false)
    const data=[
        {id:1,image:require('../assets/images/place1.jpg')},
        {id:2,image:require('../assets/images/place2.jpg')},
        {id:3,image:require('../assets/images/place3.jpg')},
        {id:4,image:require('../assets/images/place4.jpg')},
      ]
    const Item= ({item})=>{
      return(
        <View style={{margin:20,alignSelf:'center'}}>
        
          <Card style={{backgroundColor:'white',  width:Metrics.rfv(120),borderRadius:10}}
            onPress={()=>{
            //   setProfileImg()
              }}>
              <Image
              style={{
                 width:Metrics.rfv(150),height:Metrics.rfv(150),borderRadius:10
                }}
               source={item.image}
             />
             </Card>
        </View>
      )
    }

  return (
    <SafeAreaView style={{alignSelf:'center'}}>
        <Header backIcon={true} name1={'Cards'}/>
    <Loader loading={loading}></Loader>
     <FlatList
     numColumns={2}
     data={data}
     renderItem={Item}
     keyExtractor={item =>item.id}
     />
  </SafeAreaView>
  )
}

export default Cards