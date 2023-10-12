import { View, Text, SafeAreaView,TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import Metrics from '../Constants/Metrics'
import AppDropDown from '../Components/AppDropDown'
import Entypo from 'react-native-vector-icons/Entypo';

const PublicEntertainment = () => {
  const[category,setCategory]=useState('')
  const[role,setRole]=useState('')
  const data=[
    {id:1,label:'Artist'},{id:2,label:'Audience'}
  ]
 const data1=[
  {id:1,label:'Singer'},
  {id:2,label:'Dancer'},
  {id:3,label:'StartUp Comedian'},
  {id:4,label:'Reporter'},
  {id:5,label:'Painter'},
 ]
  return (
    <SafeAreaView style={{flex:1,}}>
    <View style={{alignSelf:'center',width:'100%',marginTop: Metrics.rfv(100),}}>
      <View  style={{marginRight:10,alignSelf:'flex-end'}}>
      <Entypo
           name="cross"
           color={'black'}
           size={30}
          
           onPress={()=>{navigation.goBack()}}
            />
      </View>
   
      <View style={{marginTop:20}}>
        <Text style={{fontSize:15,fontWeight:'bold',color:'black',marginLeft:20}}>Role : </Text>
               <AppDropDown
                  label={''}
                  items={data ||[]}
                  value={role}
                  placeholder={'select customer care'}
                  changeText={(text) => {
                    setRole( text)
                  }}
                  containerStyle={{
                    padding: Metrics.rfv(20),
                  }}
                  viewStyle={{
                    borderRadius: Metrics.rfv(5),
                    
                  }}
                />
        </View>
      <View>
        <Text style={{fontSize:15,fontWeight:'bold',color:'black',marginLeft:20}}>Category : </Text>
               <AppDropDown
                  label={''}
                  items={data1 ||[]}
                  value={category}
                  placeholder={'select customer care'}
                  changeText={(text) => {
                    setCategory( text)
                  }}
                  containerStyle={{
                    padding: Metrics.rfv(20),
                  }}
                  viewStyle={{
                    borderRadius: Metrics.rfv(5),
                    
                  }}
                />
        </View>
        <TouchableOpacity style={{backgroundColor:'black',width:200,padding:10,
          alignSelf:'center',marginTop:20,borderRadius:5}}
          onPress={()=>{
           
          }}>
      <Text style={{alignSelf:'center',color:'white'}}>Submit</Text>
     </TouchableOpacity>
    </View>
    </SafeAreaView>
  )
}

export default PublicEntertainment