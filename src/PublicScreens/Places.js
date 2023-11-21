import { View, Text,TouchableOpacity,Image,FlatList,SafeAreaView } from 'react-native'
import React,{useState,useEffect} from 'react'
import Metrics from '../Constants/Metrics'
import Loader from '../Components/Loader'
import { useNavigation } from '@react-navigation/native'
import { API_BASE_URL } from '../api/ApiClient'
import { getUserProfileInfo } from '../utils/AsyncStorageHelper'
import Video from 'react-native-video';

const Places = () => {
  const [loading,setLoading]=useState(false)
  const[placeArray,setPlaceArray]=useState([])
  const navigation=useNavigation()
  const data=[
    {id:1,image:require('../assets/images/place1.jpg')},
    {id:2,image:require('../assets/images/place2.jpg')},
    {id:3,image:require('../assets/images/place3.jpg')},
    {id:4,image:require('../assets/images/place4.jpg')},
  ]
  const MyPlace = async ()=>{
    const res = await getUserProfileInfo()
    console.log(res.accessToken)
    setLoading(true)
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${res.accessToken}`);
  
  
  var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
  };
  console.log(myHeaders)
  fetch(`${API_BASE_URL}/api/post/myPosts?postType=place`, requestOptions)
  .then(response => response.json())
  .then(result => {
    console.log(result.data.list)
    if(result && result.success == true){
      setPlaceArray(result.data.list)
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
    MyPlace();
  },[])
  
  const Item= ({item})=>{
    return(
      <View style={{margin:1,alignSelf:'center'}}>
        <TouchableOpacity style={{backgroundColor:'white', borderWidth:Metrics.rfv(1), }}
          onPress={()=>{
          //   setProfileImg()
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
                    // paused={true}
                    />
            </View>
                 )}
           </TouchableOpacity>
      </View>
    )
  }
  
  
  
    return (
      <SafeAreaView style={{width:'100%',alignSelf:'center',}}>
        <Loader loading={loading}></Loader>
         
         {placeArray.map((e)=>{
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
      </SafeAreaView>
    )
  }

export default Places