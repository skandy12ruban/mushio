import { View, Text, SafeAreaView,TouchableOpacity,Image,FlatList,ScrollView, Alert,TextInput,useColorScheme } from 'react-native'
import React,{useState,useRef} from 'react'
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native'
import Feather from 'react-native-vector-icons/Feather'
import { Card } from 'react-native-paper';
import { Badge,Rating } from 'react-native-elements';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Loader from '../Components/Loader'
import Metrics from '../Constants/Metrics'
import Ionicons from 'react-native-vector-icons/Ionicons';
import VideoPlayer from 'react-native-video-player';
import { API_BASE_URL } from '../api/ApiClient';
import { getUserProfileInfo } from '../utils/AsyncStorageHelper';
import { useEffect } from 'react';
import RBSheet from "react-native-raw-bottom-sheet";
import Share from 'react-native-share';
import { DateHelper } from '../utils/DateHelper';


const MyPosts = () => {
  const navigation=useNavigation()
  const route=useRoute()
  const refRBSheet = useRef();
  const isFocused=useIsFocused()
  const [userid,setUserid]=useState('')
  const [selectedItem, setSelectedItem] = useState(null);
  const [rating, setRating] = useState('');
  const {selectedId,selectedType}=route.params;
  console.log(selectedId,selectedType)
  const theme= useColorScheme()
  const[loading,setLoading]=useState(false)
  const[coment,setComment]=useState('')
  const[comentId,setCommentId]=useState('')
  const [comments,setComments]=useState([])
  const [showPopover, setShowPopover] = useState(false);
  const [like,setLike]=useState(false)
  const[searchArray,setSearchArray]=useState([])
  const[requestStatus,setRequestStatus]=useState('')
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
  
  const GetUserProfileInfo= async ()=>{
    const res = await getUserProfileInfo()
    setUserid(res._id)
    console.log('profile res',res)
  }
  const selectItemData=async()=>{
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
    console.log(`${API_BASE_URL}/api/post/myPosts?postType=${selectedType}&postId=${selectedId}`)
    fetch(`${API_BASE_URL}/api/post/myPosts?postType=${selectedType}&postId=${selectedId}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(' selecty rrsult....',result.data.list)
        if(result && result.success == true){
          let item =result.data.list
          setSearchArray(item)
        // setSearchQuery(text)
        setLoading(false)
        }
       
      })
      .catch(error => {
        console.log('error', error)
        setLoading(false)
      });
  }
 

  const sendRequest=async(id)=>{
    const res = await getUserProfileInfo()
    console.log(res.accessToken)
      // setLoading(true)
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${res.accessToken}`);
      var raw = JSON.stringify({
        "receiverId": `${id}`
      });
      
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
   console.log(requestOptions)
    fetch(`${API_BASE_URL}/api/user/sendRequest`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(' request result',result.data)
        selectItemData()
        if(result && result.success == true){
          // setRequestStatus(result)
         console.log(result.data)
        // setSearchQuery(text)
        setLoading(false)
        }
       
      })
      .catch(error => {
        console.log('error', error)
        setLoading(false)
      });
  }

  const disconnectUser=async(id)=>{
    const res = await getUserProfileInfo()
    console.log(res.accessToken)
      // setLoading(true)
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${res.accessToken}`);
      var raw = JSON.stringify({
        "disconnectUserId": `${id}`
      });
      
      var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
   console.log(requestOptions)
    fetch(`${API_BASE_URL}/api/user/disconnectUser`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(' disconnectUser result',result)
        selectItemData()
        if(result && result.success == true){
        
         console.log(result)
        // setSearchQuery(text)
        setLoading(false)
        }
       
      })
      .catch(error => {
        console.log('error', error)
        setLoading(false)
      });
  }

  const RejectRequest=async(id)=>{
    const res = await getUserProfileInfo()
    console.log(res.accessToken)
      // setLoading(true)
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${res.accessToken}`);
      var raw = JSON.stringify({
        "requestId": `${id}`
      });
      
      var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
   console.log(requestOptions)
   console.log(`${API_BASE_URL}/api/user/deleteRequest`)
    fetch(`${API_BASE_URL}/api/user/deleteRequest`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(' reject result',result)
        selectItemData()
        // if(result && result.success == true){
        
        //  console.log(result)
        // // setSearchQuery(text)
        // setLoading(false)
        // }
       
      })
      .catch(error => {
        console.log('error', error)
        setLoading(false)
      });
  }

  const ratingCompleted = (rating) => {
    setRating(rating);
    console.log("Rating is:==========> " + rating)
}

  useEffect(()=>{
    selectItemData()
    GetUserProfileInfo()
  },[isFocused])

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
        selectItemData()
        if(result && result.success == true){
            selectItemData()
        setLoading(false)
        }
        setLoading(false)
      })
      .catch(error => {
        console.log('error', error)
        setLoading(false)
      });
  }

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
        if( result.message == 'Post unliked successfully' ){
          //  alert(result.message)
           setSelectedItem(null)
    }
        selectItemData()
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
        selectItemData()
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
       selectItemData();
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
       selectItemData();
        setLoading(false)
      })
      .catch(error => {
        console.log('error', error)
        setLoading(false)
      });
  }


  const renderPost = (post, index) => {
console.log('post',post)
    let name = post.createdBy.name;
    let type= post.createdBy.userType;
    let status =post.status
    let profileImage = post.createdBy.profileImage
    let Id=post.createdBy._id
    let Id1= post.connectionRequestId
     let Id2=post._id
     let likeCount = post.likeCount;
     let commentsCount = post.commentCount
     const isSelected = selectedItem === post._id;
     const likes = post.likes.filter((e)=>{
      if( e.user == userid) 
       return e;
     })
    return(
    <Card style={{padding:10,margin:10,width:'90%',alignSelf:'center',}}>
    {/* <View style={{flexDirection:'row',justifyContent:'space-between'}}>
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
     <Text style={{color:'black',fontWeight:'bold',marginTop:10,fontSize:20,marginLeft:5}}>{name}</Text>
     </View>
     <View>
      
      
     </View>
               { type != 'audience' ?( <View>
                          <Rating
                                count={5}
                                type='star'
                                ratingColor='#3498db'
                                ratingBackgroundColor={'black'}
                                imageSize={10}
                                startingValue={rating}
                                // showRating
                                onFinishRating={ratingCompleted}
                                style={{ marginTop:20,alignSelf:'center',marginRight:10 }}
                            />
         
                  </View>):(null)}
     <TouchableOpacity style={{backgroundColor:'black',padding:5,borderRadius:10,height:30,marginTop:10}}
     onPress={()=>{
         if(status == 'Connect'){
          sendRequest(Id)
         }else if(status == 'Connected'){
          disconnectUser(Id)
         }else if(status == 'Requested'){
          RejectRequest(Id1)
         }else{

         }
     }}
     > 
        <Text style={{color:'white',alignSelf:'center'}}>{status}</Text>
     </TouchableOpacity>
     <TouchableOpacity onPress={()=>{
         Alert.alert('Delete', 'Delete this post', [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => { DeletePost(Id2)}},
        ]);
     }}> 
        <Entypo
         name='dots-three-vertical'
         color={'black'}
         size={20}
         style={{borderRadius:100,borderRadius:10,alignSelf:'center',padding:2,marginTop:10}}
  
        />
     </TouchableOpacity>
    </View> */}
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
                    getComments(Id2)
                    setCommentId(Id2)
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
                   style={{color:(isSelected && like)|| (likes[0]&& likes[0].user == userid) ? 'blue':'black',}}
                 onPress={()=>{
                  setSelectedItem(post._id)
                  setLike(!like)
                   postLikes(Id2)
                  }} 
                 />
                 <Text style={{fontSize:10,color:'black',marginTop:5}}>{likeCount} likes</Text>
                 </View>
          </View>
   </Card>
    )
  };
  const CommentsItem =  ({item})=>{
    console.log('comment',item)
    let profileImage = item.user.profileImage
    let name = item.user.name
    let id= item._id
    let date = DateHelper.formatToDateAMPM(item.createdAt)
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
        <Text style={{color:theme === 'dark' ?'black':'',}}>{item.text}</Text>
        <Text style={{color:theme === 'dark' ?'black':'',fontSize:10}}>{date}</Text>
        </View>
      </View>
      </TouchableOpacity>
    ) 
  }
  return (
    <SafeAreaView style={{alignSelf:'center',width:'100%',flex:1,backgroundColor:'black'}}>
    <Loader loading={loading}></Loader>
    <View style={{flexDirection:'row',}}>
        
        <Ionicons
            onPress={() => {
               navigation.goBack()
            }}
            style={{
             
              margin:10
            }}
            name={'arrow-back'}
            size={40}
            color={'white'}
          />
         <Text style={{marginLeft:10,color:'white',fontWeight:'bold',marginTop:10,fontSize:30}}>{selectedType}</Text>
         </View>
  
         <ScrollView style={{}}>
            <View style={{marginBottom:100}}>
        {searchArray.map((post, index) => (
          <View key={index} style={{  }}>
            {renderPost(post, index)}
          </View>
        ))}
        </View>
      </ScrollView>

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
            <View style={{marginTop:10,marginBottom:100}}>
                <Text style={{color:theme === 'dark' ?'black':'',alignSelf:'center',fontWeight:'bold'}}>Comments</Text>
             <FlatList
            data={comments || []}
            renderItem={CommentsItem}
            keyExtractor={item =>item._id}
           />
            </View>
           ):(<Text style={{alignSelf:'center',fontSize:20,fontWeight:'bold'}}>No comments</Text>)}
          
           <View style={{flexDirection:'row'}}>
           <TextInput
           placeholder='Add comments'
           value={coment}
           onChangeText={(text)=>{setComment(text)}}
           style={{margin:10,borderRadius:10,borderWidth:0.5,width:'80%',color:theme === 'dark' ?'black':'',}}
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

export default MyPosts