import { View, Text, SafeAreaView,TouchableOpacity,TextInput } from 'react-native'
import React,{useState} from 'react'
import Metrics from '../Constants/Metrics'
import AppDropDown from '../Components/AppDropDown'
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';

const PublicEntertainment = () => {
  const navigation=useNavigation()
  const[name,setName]=useState('')
  const[tagline,setTagline]=useState('')
  const[category,setCategory]=useState('')
  const[role,setRole]=useState('')
  const data=[
    {value:'Artist',label:'Artist'},{value:'Artist',label:'Audience'}
  ]
 const data1=[
  {value:'Singer',label:'Singer'},
  {value:'Dancer',label:'Dancer'},
  {value:'StartUp Comedian',label:'StartUp Comedian'},
  {value:'Reporter',label:'Reporter'},
  {value:'Painter',label:'Painter'},
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
      <View style={{}}>
        <Text style={{fontSize:15,fontWeight:'bold',color:'black',marginLeft:20}}>Name  : </Text>
             <TextInput
                   value={name}
                   placeholder={'Enter name'}
                   placeholderTextColor={'grey'}
                   style={{padding:10,backgroundColor:'white',borderRadius:5,margin:10,width:'90%',marginLeft: Metrics.rfv(20),}}
                   onChangeText={text => {
                   setName(text);
                   }}
                 />
        </View>
        <Text style={{fontSize:15,fontWeight:'bold',color:'black',marginLeft:20}}>Role : </Text>
               <AppDropDown
                  label={''}
                  items={data ||[]}
                  value={role}
                  placeholder={'select customer care'}
                  changeText={(text) => {
                    setRole(text)
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
        <View style={{}}>
        <Text style={{fontSize:15,fontWeight:'bold',color:'black',marginLeft:20}}>Tagline  : </Text>
             <TextInput
                   value={tagline}
                   placeholder={'Enter tagline'}
                   placeholderTextColor={'grey'}
                   style={{padding:10,backgroundColor:'white',borderRadius:5,margin:10,width:'90%',marginLeft: Metrics.rfv(20),}}
                   onChangeText={text => {
                   setTagline(text);
                   }}
                 />
        </View>
        <TouchableOpacity style={{backgroundColor:'black',width:200,padding:10,
          alignSelf:'center',marginTop:20,borderRadius:5}}
          onPress={()=>{
           navigation.navigate('Entertainment',{name,category,tagline,role})
          }}>
      <Text style={{alignSelf:'center',color:'white'}}>Submit</Text>
     </TouchableOpacity>
    </View>
    </SafeAreaView>
  )
}

export default PublicEntertainment