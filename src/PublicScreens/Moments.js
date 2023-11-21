import { View, Text,TouchableOpacity,Image,FlatList,SafeAreaView,ScrollView,StyleSheet} from 'react-native'
import React,{useState,useEffect,useRef} from 'react'
import Metrics from '../Constants/Metrics'
import Loader from '../Components/Loader'
import { useNavigation } from '@react-navigation/native'
import { API_BASE_URL } from '../api/ApiClient'
import { getUserProfileInfo } from '../utils/AsyncStorageHelper'
import Video from 'react-native-video';



const Moments = () => {
  const videoPlayer = useRef(null);
  const [loading,setLoading]=useState(false)
  const[momentsArray,setMomentsArray]=useState([]);
  const navigation=useNavigation()
  const data=[
    {id:1,image:require('../assets/images/place1.jpg')},
    {id:2,image:require('../assets/images/place2.jpg')},
    {id:3,image:require('../assets/images/place3.jpg')},
    {id:4,image:require('../assets/images/place4.jpg')},
  ]

  

const Mymoments = async ()=>{
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
fetch(`${API_BASE_URL}/api/post/myPosts?postType=moments`, requestOptions)
.then(response => response.json())
.then(result => {
  console.log(result.data.list)
  if(result && result.success == true){
    setMomentsArray(result.data.list)
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
  Mymoments();
},[])

const Item= ({item})=>{
  // console.log('item',item)
  return(
    <View style={{margin:1,alignSelf:'center',}}>

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
                  ref={videoPlayer}
                  source={{ uri: item.url }}
                  style={styles.mediaPlayer}
                  volume={10}
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
      <ScrollView>
       {momentsArray.map((e)=>{
            //  console.log('ee',e)
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
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  toolbar: {
    marginTop: 30,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  mediaPlayer: {
    width:100,height:100,
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // bottom: 0,
    // right: 0,
    // backgroundColor: 'black',
    // justifyContent: 'center',
  },
})
export default Moments