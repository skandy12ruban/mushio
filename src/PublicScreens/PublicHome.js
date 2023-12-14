import { View, Text,SafeAreaView,Image,TouchableOpacity, ScrollView, FlatList, TextInput,Alert } from 'react-native'
import React,{useState,useEffect,useRef} from 'react'
import Loader from '../Components/Loader'
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather'
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import Metrics from '../Constants/Metrics';
import { Card } from 'react-native-paper';
import { Badge } from 'react-native-elements';
import Video from 'react-native-video';
import { API_BASE_URL } from '../api/ApiClient';
import { getUserProfileInfo } from '../utils/AsyncStorageHelper';
import VideoPlayer from 'react-native-video-player';
import { BackHandler } from 'react-native';
import RBSheet from "react-native-raw-bottom-sheet";
import Share from 'react-native-share';
import Popover from 'react-native-popover-view';

const PublicHome = () => {
  const navigation=useNavigation()
  const refRBSheet = useRef();
  const [selectedItem, setSelectedItem] = useState(null);
  const[loading,setLoading]=useState(false)
  const[coment,setComment]=useState('')
  const[comentId,setCommentId]=useState('')
  const [comments,setComments]=useState([])
  const [showPopover, setShowPopover] = useState(false);
  const [like,setLike]=useState(false)
  const[homeArray,setHomeArray]=useState([])
  const isFocused=useIsFocused()
  const data=[
    {id:1,image:require('../assets/images/place1.jpg')},
    {id:2,image:require('../assets/images/place2.jpg')},
    {id:3,image:require('../assets/images/place3.jpg')},
    {id:4,image:require('../assets/images/place4.jpg')},
  ]



const Item= ({item,index})=>{
  // console.log(item)
  return(
    <View style={{margin:10,alignSelf:'center',}}>
        
      <View>
        <TouchableOpacity style={{    }}
        onPress={()=>{
          
           }}>
          { item.type == 'video'  ? (
                 < View style={{}}>
                   <VideoPlayer
                     video={{ uri:`${item.url}` }}
                    //  videoWidth={3000}
                    //  videoHeight={2000}
                    //  thumbnail={{ uri: 'https://i.picsum.photos/id/866/1600/900.jpg' }}
                     style={{width:300,height:250,alignSelf:'center',}}
                   />
            </View>
                 ) : item.type == 'image'  ?(
           < View style={{}}>
                  <Image
                  key={index}
                       source={{uri:item.url}}
                       style={{width:300,height:250,alignSelf:'center',}}
                      />
                </View>
           
               ):(null)}
         </TouchableOpacity>
         
      </View>
     
    </View>
  )
}

const showPopOver= ()=>{
  return (
    <Popover
    isVisible={showPopover}
    onRequestClose={() => setShowPopover(false)}
    from={(
      <TouchableOpacity onPress={() => setShowPopover(true)}>
        <Text>Press here to open popover!</Text>
      </TouchableOpacity>
    )}>

  </Popover>
  );
}

const sharePost = async () => {
  const shareOptions = {
    title: 'Share via',
    message: 'Check out this awesome post!',
    url: 'https://your-post-url.com', // Replace with your actual post URL
    social: Share.Social.ALL, // Share on all social media platforms
  };

  try {
    const result = await Share.open(shareOptions);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

const DeletePost = async (id)=>{
  const res = await getUserProfileInfo()
  console.log(res.accessToken)
    setLoading(true)
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${res.accessToken}`);
    const requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    redirect: 'follow'
  };
  
  fetch(`${API_BASE_URL}/api/post/${id}`, requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log('delete post res',result)
      if(result && result.success == true){
        getHomedata()
      setLoading(false)
      }
      setLoading(false)
    })
    .catch(error => {
      console.log('error', error)
      setLoading(false)
    });
}

const getHomedata = async ()=>{
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
  
  fetch(`${API_BASE_URL}/api/post/home`, requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log('home res',result.data.posts)
      if(result && result.success == true){
      setHomeArray(result.data.posts)
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
  getHomedata()
},[isFocused])

  const postLikes = async (id)=>{
    const res = await getUserProfileInfo()
    console.log(res.accessToken)
      setLoading(true)
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${res.accessToken}`);
      const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow'
    };
    
    fetch(`${API_BASE_URL}/api/post/toggleLike/${id}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        getHomedata()
        setLoading(false)
      })
      .catch(error => {
        console.log('error', error)
        setLoading(false)
      });
  }

  const getComments = async (id)=>{
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
    
    fetch(`${API_BASE_URL}/api/post/getComments/${id}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log('getCommnets res',result.data.comments)
        setComments(result.data.comments)
        getHomedata()
        setLoading(false)
      })
      .catch(error => {
        console.log('error', error)
        setLoading(false)
      });
  }

  const AddComment = async ()=>{
    const res = await getUserProfileInfo()
    console.log(res.accessToken)
      setLoading(true)
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${res.accessToken}`);
      var raw = JSON.stringify({
        "text": `${coment}`,
        "taggedUsers": []
      });
      const requestOptions = {
      method: 'POST',
      body: raw,
      headers: myHeaders,
      redirect: 'follow'
    };
    console.log(raw)
    fetch(`${API_BASE_URL}/api/post/addComment/${comentId}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
       setComment('') 
       getComments(comentId)
       getHomedata();
        setLoading(false)
      })
      .catch(error => {
        console.log('error', error)
        setLoading(false)
      });
  }

  const deleteComment = async (id)=>{
    const res = await getUserProfileInfo()
    console.log(res.accessToken)
      setLoading(true)
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${res.accessToken}`);
      
      const requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow'
    };
    // console.log(`${API_BASE_URL}/api/post/deleteComment/${comentId}/${id}`)
    fetch(`${API_BASE_URL}/api/post/deleteComment/${comentId}/${id}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log('delete',result)
       getComments(comentId)
       getHomedata();
        setLoading(false)
      })
      .catch(error => {
        console.log('error', error)
        setLoading(false)
      });
  }

const renderPost = (post, index) => {
// console.log('post',post)
  let name = post.createdBy.name;
 let likeCount = post.likeCount;
 let commentsCount = post.commentCount
  let profileImage = post.createdBy.profileImage
 let Id= post._id
 const isSelected = selectedItem === post._id;
  return(
  <Card style={{padding:10,margin:10,width:'90%',alignSelf:'center',}}>
  <View style={{flexDirection:'row',justifyContent:'space-between'}}>
    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
  <TouchableOpacity style={{backgroundColor:'white', width:Metrics.rfv(50),height:Metrics.rfv(50),borderRadius:Metrics.rfv(30),}}
  onPress={()=>{
  //   setProfileImg()
    }}>
    <Image
    style={{
       width:Metrics.rfv(40),height:Metrics.rfv(40),margin:Metrics.rfv(3),borderRadius:Metrics.rfv(30),
      }}
     source={{uri:profileImage}}
   />
   </TouchableOpacity>
   <Text style={{color:'black',fontWeight:'bold',marginTop:10,fontSize:20,marginLeft:10}}>{name}</Text>
   </View>
   <View>
    
    {/* <Text style={{color:'black',fontWeight:'bold'}}>{date}</Text> */}
   </View>
   {/* <TouchableOpacity style={{backgroundColor:'black',padding:5,borderRadius:10}}> 
      <Text style={{color:'white',alignSelf:'center'}}>Connected</Text>
   </TouchableOpacity> */}
   <TouchableOpacity onPress={()=>{
      
      //  setShowPopover(true)
      Alert.alert('Delete', 'Delete this post', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => { DeletePost(Id)}},
      ]);
    }}> 
      <Entypo
       name='dots-three-vertical'
       color={'black'}
       size={20}
       style={{borderRadius:100,borderRadius:10,alignSelf:'center',padding:2,marginTop:10}}

      />
   </TouchableOpacity>
  </View>
      <View style={{width:'100%'}}>
             <FlatList
             horizontal
                data={post.files || []}
                renderItem={Item}
                keyExtractor={(item,index) =>item._id}
                />
      </View>
      <View style={{borderWidth:0.5,marginTop:10}}/>
      <View style={{flexDirection:'row',justifyContent:'space-around',margin:5,}}> 
             <TouchableOpacity onPress={()=>{sharePost()}}>
                <EvilIcons
                  name="sc-telegram"
                   size={30}
                   style={{color:'black'}}
                 />
              </TouchableOpacity>
                 <View>
                  <TouchableOpacity
                   onPress={()=>{
                    getComments(Id)
                    setCommentId(Id)
                    refRBSheet.current.open()
                    }}>
                   <FontAwesome
                  name="comment-o"
                   size={25}
                   style={{color:'black'}}
                 
                 />
                 </TouchableOpacity>
                 <Text style={{fontSize:10,color:'black',marginTop:5}}>{commentsCount} comments</Text>
                 </View>
                <View>
                  <Feather
                  name="eye"
                   size={25}
                   style={{color:(isSelected && like) ? 'blue':'black',}}
                 onPress={()=>{
                  setSelectedItem(post._id)
                   setLike(!like)
                   postLikes(Id)
                  }} 
                 />
                 <Text style={{fontSize:10,color:'black',marginTop:5}}>{likeCount} likes</Text>
                 </View>
          </View>
          {/* {showPopOver()} */}
 </Card>
  )
};

useEffect(() => {
  const backHandler = BackHandler.addEventListener(
    'hardwareBackPress',
    () => true,
  );
  return () => backHandler.remove();
}, []);

const CommentsItem =  ({item})=>{
  console.log('comment',item)
  let profileImage = item.user.profileImage
  let name = item.user.name
  let id= item._id
 
  return(
    <TouchableOpacity onLongPress={()=>{
      Alert.alert('Delete', 'Delete this message', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => { deleteComment(id)}},
      ]);
     
      }}>
    <View style={{flexDirection:'row'}}>
     
      <View>
      <TouchableOpacity style={{backgroundColor:'white', width:Metrics.rfv(50),height:Metrics.rfv(50),borderRadius:Metrics.rfv(30),}}
          onPress={()=>{
  //   setProfileImg()
        }}>
    <Image
    style={{
       width:Metrics.rfv(40),height:Metrics.rfv(40),margin:Metrics.rfv(3),borderRadius:Metrics.rfv(30),
      }}
     source={{uri:profileImage}}
   />
   </TouchableOpacity>
      </View>
      <View style={{marginLeft:10,marginTop:5}}>
      <Text style={{fontWeight:'bold',color:'black'}}>{name}</Text>
      <Text>{item.text}</Text>
      </View>
    </View>
    </TouchableOpacity>
  ) 
}

  return (
    <SafeAreaView style={{alignSelf:'center',width:'100%',flex:1,backgroundColor:'black',}}>
    <Loader loading={loading}></Loader>
      <View>
      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
          <View>
            <Text style={{fontSize:30,fontFamily:'Montserrat-Bold',color:'white',margin:10,marginLeft:30}}>Se<Text style={{color:'#4b4c4c'}}>halo</Text></Text>
        {/* <TouchableOpacity style={{backgroundColor:'white', width:Metrics.rfv(60),height:Metrics.rfv(60),borderRadius:Metrics.rfv(10),margin:Metrics.rfv(5),}}
        onPress={()=>{
        //   setProfileImg()
          }}>
          <Image
          style={{
             width:Metrics.rfv(60),height:Metrics.rfv(60),borderRadius:Metrics.rfv(10),
            }}
           source={require('../assets/images/image3.jpg')}
         />
         </TouchableOpacity> */}
      </View>
          <View style={{marginTop:Metrics.rfv(10)}}>
               <Fontisto
                  name="hipchat"
                   size={30}
                   style={{color:'white',marginRight:20,margin:10}}
                 onPress={()=>{ navigation.navigate('ChatScreen')}} 
                 /> 
                 <Badge
              value={ '1' }
              containerStyle={{
                top: Metrics.rfv(-50),
                left: Metrics.rfv(5),
              }}></Badge>
      </View>
      </View>
     
           <ScrollView style={{}}>
            <View style={{marginBottom:100}}>
        {homeArray.map((post, index) => (
          <View key={index} style={{  }}>
            {renderPost(post, index)}
          </View>
        ))}
        </View>
      </ScrollView>
    
    </View>
    
            <RBSheet
            ref={refRBSheet}
            closeOnDragDown={true}
            closeOnPressMask={false}
            customStyles={{
              wrapper: {
                backgroundColor: "transparent",
                // borderTopLeftRadius:50,
                // borderTopRightRadius:5
              },
              draggableIcon: {
                backgroundColor: "#000"
              }
            }}
           height={400}
          >
          {comments.length > 0 ?(
             <FlatList
            data={comments || []}
            renderItem={CommentsItem}
            keyExtractor={item =>item._id}
           />
           ):(<Text style={{alignSelf:'center',fontSize:20,fontWeight:'bold'}}>No comments</Text>)}
           <View style={{flexDirection:'row'}}>
           <TextInput
           placeholder='Add comments'
           value={coment}
           onChangeText={(text)=>{setComment(text)}}
           style={{margin:10,borderRadius:10,borderWidth:0.5,width:'80%'}}
           />
            {coment != '' ? (<TouchableOpacity style={{padding:5,backgroundColor:'blue',height:30,marginTop:20,borderRadius:10}}
               onPress={()=>{
                AddComment()
               }}>
              <Text style={{alignSelf:'center',color:'white'}}>post</Text>
            </TouchableOpacity>):(null)}
           </View>
           
          </RBSheet>
    
    </SafeAreaView>
  )
}

export default PublicHome