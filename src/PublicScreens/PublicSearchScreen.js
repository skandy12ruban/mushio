import { View, Text, SafeAreaView,TouchableOpacity,Image,FlatList,ScrollView,useColorScheme } from 'react-native'
import React,{useState,useEffect} from 'react'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import SearchView from '../Components/SearchView'
import Loader from '../Components/Loader'
import Metrics from '../Constants/Metrics'
import { API_BASE_URL } from '../api/ApiClient'
import { getUserProfileInfo } from '../utils/AsyncStorageHelper'
import { Card } from 'react-native-paper';
import Video from 'react-native-video';
import { Searchbar } from 'react-native-paper';
import { SearchBar } from 'react-native-elements'


const PublicSearchScreen = () => {
  const navigation=useNavigation()
  const isFocused= useIsFocused()
  const theme = useColorScheme();
  const[loading,setLoading]=useState(false)
  const [searchQuery, setSearchQuery] = React.useState('');
  const[serachArray,setSearchArray]=useState([])
  const[searchRes,setSearchRes]=useState([])
  const[serachArray1,setSearchArray1]=useState([])
  const data=[
    {id:1,image:require('../assets/images/place1.jpg'),name:'Satish',place:'Guntur'},
    {id:2,image:require('../assets/images/place2.jpg'),name:'Bharath',place:'Hyderabad'},
    {id:3,image:require('../assets/images/place3.jpg'),name:'Vamsi',place:'Warangal'},
    {id:4,image:require('../assets/images/place4.jpg'),name:'Vinay',place:'Vizag'},
  ]

const Item= ({item,index})=>{
  // 
  return(
    // <View style={{alignSelf:'center',borderWidth:1,margin:2,marginLeft:5}}>
        
      <Card style={{alignSelf:'center',margin:2,marginLeft:5,}} 
       onPress={()=>{
        let id=item.userId
        navigation.navigate('PublicSearchScreen1',{selectedId:id})
        // selectSearchData(id)
     
        }}>
        {/* <TouchableOpacity style={{    }}
       > */}
          { item.type == 'video'  ? (
                 < View style={{}}>
                   <Video
                     source={{ uri:`${item.url}` }}
                    //  videoWidth={3000}
                    //  videoHeight={2000}
                    //  thumbnail={{ uri: 'https://i.picsum.photos/id/866/1600/900.jpg' }}
                     style={{width:110,height:100,alignSelf:'center',borderRadius:10,backgroundColor:theme === 'dark' ? 'white':'black'}}
                   />
            </View>
                 ) : item.type == 'image'  ?(
           < View style={{borderRadius:5}}>
                  <Image
                  key={index}
                       source={{uri:item.url}}
                       style={{width:110,height:100,alignSelf:'center',borderRadius:10}}
                      />
                </View>
           
               ):(null)}
         {/* </TouchableOpacity> */}
         
      </Card>
     
    // </View>
  )
}

const getSearchdata = async ()=>{
  const res = await getUserProfileInfo()
  
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
      
      if(result && result.success == true){
      //   let userdata=[]
      //  result.data.posts.map((e)=>{
      //     let a= e.files;
      //       for(let i=0; i<a.length;i++){
      //         // 
      //         userdata.push(a[i])
      //       }
      //   })
       
        // 
      // setSearchArray(userdata)

      const updatedA = result.data.posts.map(item => ({
        files: item.files.map(file => ({
          ...file,
          userId: item._id
        }))
      }));
      let userdata=[]
      updatedA.map((e)=>{
         let a= e.files;
           for(let i=0; i<a.length;i++){
             // 
             userdata.push(a[i])
           }
       })
      // 
      setSearchArray(userdata)

      setLoading(false)
      }
      setLoading(false)
    })
    .catch(error => {
      
      setLoading(false)
    });
  }
  const getSearchdata1 = async (text)=>{
   
    const res = await getUserProfileInfo()
    
      // setLoading(true)
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${res.accessToken}`);
      const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    
    fetch(`${API_BASE_URL}/api/post?q=${text}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        
        if(result && result.success == true){
          const updatedA = result.data.posts.map(item => ({
            files: item.files.map(file => ({
              ...file,
              userId: item._id
            }))
          }));
          let userdata=[]
          updatedA.map((e)=>{
             let a= e.files;
               for(let i=0; i<a.length;i++){
                 // 
                 userdata.push(a[i])
               }
           })
        setSearchArray(userdata)
        // setSearchQuery(text)
        setLoading(false)
        }
       
      })
      .catch(error => {
        
        setLoading(false)
      });

    }
  
    // const selectSearchData=async(id)=>{
    //   const res = await getUserProfileInfo()
    //   
    //     setLoading(true)
    //     var myHeaders = new Headers();
    //     myHeaders.append("Authorization", `Bearer ${res.accessToken}`);
    //     const requestOptions = {
    //     method: 'GET',
    //     headers: myHeaders,
    //     redirect: 'follow'
    //   };
    //   
    //   fetch(`${API_BASE_URL}/api/post/travel?postId=${id}`, requestOptions)
    //     .then(response => response.json())
    //     .then(result => {
    //       
    //       if(result && result.success == true){
    //         let item =result.data.posts
    //         navigation.navigate('PublicSearchScreen1',{searchArray:item,selectSearchData:selectSearchData})
    //       // setSearchQuery(text)
    //       setLoading(false)
    //       }
         
    //     })
    //     .catch(error => {
    //       
    //       setLoading(false)
    //     });
    // }
   
  
  useEffect(()=>{
    getSearchdata()
   
  },[isFocused])

  return (
    <SafeAreaView style={{alignSelf:'center',width:'100%',flex:1,backgroundColor:theme === 'dark' ? 'black':'white',}}>
    <Loader loading={loading}></Loader>
    {/* <SearchView/> */}
    <Searchbar
      placeholder="Search"
      onChangeText={(text) => {
        setSearchQuery(text)
        getSearchdata1(text)
      }}
      onClearIconPress={(text) => {
        getSearchdata()
       
      }}
      value={searchQuery}
      style={{}}
    />
    <View style={{marginTop:1,flex:2}}>
    <ScrollView>
    < View style={{}}>
                <FlatList
                numColumns={3}
                // horizontal
                data={serachArray || []}
                renderItem={Item}
                keyExtractor={item =>item._id}
                />
               </View>
       {/* {serachArray.map((e)=>{

            
            return(
              < View style={{}}>
                <FlatList
                // numColumns={3}
                horizontal
                data={e.files || []}
                renderItem={Item}
                keyExtractor={item =>item._id}
                />
               </View>
               ) 
               } )
         } */}
          {/* <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {serachArray.map((item) => (
            //  console.log()
             <View key={item._id} style={{ width: '33.33%',padding:1 }}>           
         {item.files.map((file) => (
            <View key={file._id} style={{margin:2}}>
              {file.type === 'image' && (
               <TouchableOpacity style={{backgroundColor:'white',  }}
                onPress={()=>{
                      //   setProfileImg()
                 }}>
                <Image
                  source={{ uri: file.url }}
                  style={{ width: '100%', height: 100, resizeMode: 'cover' }}
                />
                </TouchableOpacity>
              )}
              {file.type === 'video' && (
            <TouchableOpacity style={{backgroundColor:'white',  }}
                 onPress={()=>{
                      //   setProfileImg()
                }}>
                  <Video
                  source={{ uri: file.url }}
                  style={{ width: '100%', height: 100, resizeMode: 'cover' }}
                />
                   </TouchableOpacity>
              )}
           
            </View>
          ))}
              </View>
          ))}
          </View> */}
         </ScrollView>
    </View>
    </SafeAreaView>
    
  )
}

export default PublicSearchScreen