import { View, Text, SafeAreaView,TouchableOpacity,Image,FlatList,ScrollView } from 'react-native'
import React,{useState,useEffect} from 'react'
import { useNavigation } from '@react-navigation/native'
import SearchView from '../Components/SearchView'
import Loader from '../Components/Loader'
import Metrics from '../Constants/Metrics'
import { API_BASE_URL } from '../api/ApiClient'
import { getUserProfileInfo } from '../utils/AsyncStorageHelper'
import Video from 'react-native-video';

const PublicSearchScreen = () => {
  const navigation=useNavigation()
  const[loading,setLoading]=useState(false)
  const[serachArray,setSearchArray]=useState([])
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
            { item.type == 'image'  ? (
          < View style={{margin:5,}}>
             <Image
                  source={{uri:item.url}}
                  style={{width:100,height:100}}
                 />
           </View>
                 ):(
          < View style={{margin:5,}}>
                <Video  
                  source={{ uri: item.url}}
                  style={{width:100,height:100}}
                 
                  />
          </View>
               )}
         </TouchableOpacity>
    </View>
  )
}

const getSearchdata = async ()=>{
  const res = await getUserProfileInfo()
  console.log(res.accessToken)
    setLoading(true)
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${res.accessToken}`);
    const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  
  fetch(`${API_BASE_URL}/api/post`, requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result.data.posts)
      if(result && result.success == true){
      setSearchArray(result.data.posts)
      setLoading(false)
      }
      setLoading(false)
    })
    .catch(error => {
      console.log('error', error)
      setLoading(false)
    });
  }
  
  useEffect(()=>{
    getSearchdata()
  },[])

  return (
    <SafeAreaView style={{alignSelf:'center',width:'100%',flex:1,}}>
    <Loader loading={loading}></Loader>
    <SearchView/>
    <View style={{marginTop:5}}>
    <ScrollView>
       {serachArray.map((e)=>{
             console.log('ee',e)
            return(
              < View style={{}}>
                <FlatList
                numColumns={3}
                data={e.files}
                renderItem={Item}
                keyExtractor={item =>item._id}
                />
               </View>
               )  } )
         }
         </ScrollView>
    </View>
    </SafeAreaView>
    
  )
}

export default PublicSearchScreen