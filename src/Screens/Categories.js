import { View, Text,SafeAreaView,FlatList,Image,ScrollView,TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import { Card } from 'react-native-paper'
import Metrics from '../Constants/Metrics'
import Entypo from 'react-native-vector-icons/Entypo';

import { useNavigation } from '@react-navigation/native';



const Categories = () => {
const navigation = useNavigation()
const [selectedItem,setselectedItem]=useState('')
const[value,setvalues]=useState(false)
const data=[
  {id:1,color:'#FFB6C1',image:require('../assets/images/image1.jpg'),name:'Outstanding'},
  {id:2,color:'#00B0FF',image:require('../assets/images/image3.jpg'),name:'Great'},
  {id:3,color:'#65a765',image:require('../assets/images/image2.jpg'),name:'Excellent'},
  {id:4,color:'#F4C430',image:require('../assets/images/image4.jpg'),name:'calm down'},
  {id:5,color:'#FF7F7F',image:require('../assets/images/image5.jpg'),name:"Don't cry"},
  // {id:6,color:'lightgrey',image:require('../assets/images/image2.jpg'),name:''},
]
const data1=[
  {id:1,name:'#Type'},
  {id:2,name:'#home'},
  {id:3,name:'#work'},
  {id:4,name:'#boss'},
  {id:5,name:'#communication'},
  {id:6,name:'#relationships'},
  {id:7,name:'#tastyfood'},
  {id:8,name:'#drive'},
]
const Item=({item})=>{
  return(
    <View style={{flex:1,margin:10,marginTop:10,}}>
     <TouchableOpacity style={{backgroundColor:(value == true && selectedItem.id == item.id) ? 'grey' :item.color,
      width:60,height:60,borderRadius:10,alignSelf:'center',}}
        onPress={()=>{
          setvalues(!value)
          setselectedItem(item)
          }} >
     <Image
          style={{
             width:40,height:40,margin:10,borderRadius:10,
            }}
           source={item.image}
         />
     </TouchableOpacity>
          
    </View>
  )
}
const Item1=({item})=>{

  
  return(
    <View style={{flex:1,marginTop:10}}>
     <TouchableOpacity style={{backgroundColor:'white', borderRadius:30,padding:5,alignSelf:'center'}} >
     <Text style={{alignSelf:'center',color:'black'}}>{item.name}</Text>
     </TouchableOpacity>
          
    </View>
  )
}
  return (
    <SafeAreaView style={{backgroundColor:'white',flex:1}}>
      <ScrollView>
    <View style={{marginTop:Metrics.rfv(10),margin:10}}>
     <Card style={{padding:20,}}>
      <View style={{ alignSelf: 'flex-end',}}>
         <Entypo
           name="cross"
           color={'black'}
           size={30}
            />
      </View>
      <View style={{alignSelf: 'center',}}>
      <Text style={{fontSize:Metrics.rfv(25),fontWeight:'bold',color:'black'}}>How are you feeling Today ?</Text>
      </View>
      <View style={{marginTop:20,}}>
      <FlatList
        numColumns={3}
        data={data}
        renderItem={Item}
        keyExtractor={item =>item.id}
        />
      </View>
      <Text style={{alignSelf: 'center',color:'black',fontSize:Metrics.rfv(20),marginTop:10,}}>What made you feel like that ?</Text>
      <View style={{marginTop:10,}}>
      <FlatList
        numColumns={2}
        data={data1}
        renderItem={Item1}
        keyExtractor={item =>item.id}
        />
      </View>
     </Card>
     <TouchableOpacity style={{backgroundColor:'black',width:'60%',padding:10,
          alignSelf:'center',marginTop:20,borderRadius:5}}
       onPress={()=>{
        if(selectedItem != ''){
          navigation.navigate('Category',{item:selectedItem})
        }else{
             alert('Please select any one emoji')
        }
        }}>
      <Text style={{alignSelf:'center',color:'white'}}>Next</Text>
     </TouchableOpacity>
    </View>
    </ScrollView>
    </SafeAreaView>
  )
}

export default Categories