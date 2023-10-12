import { View, Text,TouchableOpacity,Image,FlatList,SafeAreaView } from 'react-native'
import React,{useState,useEffect} from 'react'
import Metrics from '../Constants/Metrics'
import Loader from '../Components/Loader'
import { useNavigation } from '@react-navigation/native'

const People = () => {
  const [loading,setLoading]=useState(false)
  const navigation=useNavigation()
  const data=[
    {id:1,image:require('../assets/images/place1.jpg')},
    {id:2,image:require('../assets/images/place2.jpg')},
    {id:3,image:require('../assets/images/place3.jpg')},
    {id:4,image:require('../assets/images/place4.jpg')},
  ]
const Item= ({item})=>{
  return(
    <View style={{margin:1,alignSelf:'center'}}>
      <TouchableOpacity style={{backgroundColor:'white', borderWidth:Metrics.rfv(1), width:Metrics.rfv(120),}}
        onPress={()=>{
        //   setProfileImg()
          }}>
          <Image
          style={{
             width:Metrics.rfv(120),height:Metrics.rfv(150),
            }}
           source={item.image}
         />
         </TouchableOpacity>
    </View>
  )
}

  return (
    <SafeAreaView>
    <Loader loading={loading}></Loader>
     <FlatList
     numColumns={3}
     data={data}
     renderItem={Item}
     keyExtractor={item =>item.id}
     />
  </SafeAreaView>
  )
}

export default People