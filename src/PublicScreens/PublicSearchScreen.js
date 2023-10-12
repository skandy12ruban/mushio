import { View, Text, SafeAreaView,TouchableOpacity,Image,FlatList } from 'react-native'
import React,{useState} from 'react'
import { useNavigation } from '@react-navigation/native'
import SearchView from '../Components/SearchView'
import Loader from '../Components/Loader'
import Metrics from '../Constants/Metrics'

const PublicSearchScreen = () => {
  const navigation=useNavigation()
  const[loading,setLoading]=useState(false)
  const data=[
    {id:1,image:require('../assets/images/place1.jpg'),name:'Satish',place:'Guntur'},
    {id:2,image:require('../assets/images/place2.jpg'),name:'Bharath',place:'Hyderabad'},
    {id:3,image:require('../assets/images/place3.jpg'),name:'Vamsi',place:'Warangal'},
    {id:4,image:require('../assets/images/place4.jpg'),name:'Vinay',place:'Vizag'},
  ]
const Item= ({item})=>{
  console.log(item)
  return(
    <View style={{margin:1,alignSelf:'center'}}>
      <TouchableOpacity style={{backgroundColor:'white', borderWidth:Metrics.rfv(1), width:Metrics.rfv(120),}}
        onPress={()=>{
          navigation.navigate('PublicSearchScreen1',{item:item})
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
    <SafeAreaView style={{alignSelf:'center',width:'100%',flex:1,}}>
    <Loader loading={loading}></Loader>
    <SearchView/>
    <View style={{marginTop:5}}>
    <FlatList
     numColumns={3}
     data={data}
     renderItem={Item}
     keyExtractor={item =>item.id}
     />
    </View>
    </SafeAreaView>
    
  )
}

export default PublicSearchScreen