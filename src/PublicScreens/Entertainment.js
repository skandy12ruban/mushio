import { useRoute } from '@react-navigation/native';
import { View, Text,SafeAreaView,Image,TouchableOpacity, ScrollView, FlatList,Alert, TextInput } from 'react-native'
import React,{useState,useEffect,useRef} from 'react'
import Loader from '../Components/Loader'
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { useNavigation } from '@react-navigation/native';
import Metrics from '../Constants/Metrics';
import { Card } from 'react-native-paper';
import { Badge,Rating } from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import VideoPlayer from 'react-native-video-player';
import { getUserProfileInfo } from '../utils/AsyncStorageHelper';
import { API_BASE_URL } from '../api/ApiClient';
import RBSheet from "react-native-raw-bottom-sheet";
import Share from 'react-native-share';

const Entertainment = () => {
    const navigation=useNavigation()
    const refRBSheet = useRef();
    const[loading,setLoading]=useState(false)
    const [rating, setRating] = useState('');
    const route=useRoute()
    const[entertainmentArray,setEntertainmentArray]=useState([])
    const[coment,setComment]=useState('')
    const[comentId,setCommentId]=useState('')
    const [comments,setComments]=useState([])
    const [selectedItem, setSelectedItem] = useState(null);
    const [showPopover, setShowPopover] = useState(false);
    const [like,setLike]=useState(false)
    // const{name,category,role,tagline}=route.params;
    // console.log(name,category,role,tagline)

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
            console.log(' request result',result)
            getEntertainments()
            // if(result && result.success == true){
            //   // setRequestStatus(result.data.status)
            //  console.log(result.data.status)
            // // setSearchQuery(text)
            // setLoading(false)
            // }
           
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
            getEntertainments()
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
            getEntertainments()
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

      const renderPost = (post, index) => {
          console.log(post)
        let name = post.createdBy.name;
        let type= post.createdBy.userType;
        let profileImage = post.createdBy.profileImage
        let artist = post.createdBy.artistType
        let alias = post.createdBy.alias
        let status=post.status
        let Id2=post._id
        let likeCount = post.likeCount;
        let commentsCount = post.commentCount
        const isSelected = selectedItem === post._id;
        return( 
        <Card style={{padding:10,margin:10,width:'90%',alignSelf:'center',}}>
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
          <View style={{flexDirection:'row',}}>
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
       <View>
       <Text style={{color:'black',fontWeight:'bold',fontSize:20,marginLeft:10}}>{name}</Text>
       <View style={{flexDirection:'row',}}> 
       <Text style={{color:'black',fontSize:15,marginLeft:10}}>{artist} ;</Text>
       <Text style={{color:'black',fontSize:15,marginLeft:5}}>{alias}</Text>
       </View>
       </View>
       </View>
        
        
        { type != 'audience' ?( <View>
                          <Rating
                                count={5}
                                type='star'
                                ratingColor='#3498db'
                                ratingBackgroundColor={'black'}
                                imageSize={15}
                                startingValue={rating}
                                // showRating
                                onFinishRating={ratingCompleted}
                                style={{ marginTop:10,alignSelf:'center', }}
                            />
         
         </View>):(null)}
         
         <TouchableOpacity onPress={()=>{
        
          if(status == 'Connect'){
            sendRequest(post._id)
           }else if(status == 'Connected'){
            disconnectUser(post._id)
           }else if(status == 'Requested'){
            RejectRequest(post.connectionRequestId)
           }else{
  
           }
          }}> 
            <Entypo
             name='add-user'
             color={status == 'Connected' ? 'black' : status == 'Requested' ? 'orange':'blue'}
             size={25}
             style={{borderRadius:100,borderRadius:10,alignSelf:'center',padding:2,marginTop:10}}
      
            />
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
                   style={{color:(isSelected && like) ? 'blue':'black',}}
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

    const ratingCompleted = (rating) => {
      setRating(rating);
      console.log("Rating is:==========> " + rating)
  }

  const getEntertainments = async ()=>{
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
  
  fetch(`${API_BASE_URL}/api/post/entertainment`, requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log('entertaiment result',result.data.posts)
      if(result && result.success == true){
      setEntertainmentArray(result.data.posts)
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
   getEntertainments()
  },[])

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
          getEntertainments()
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
        getEntertainments()
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
        getEntertainments()
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
       getEntertainments();
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
       getEntertainments();
        setLoading(false)
      })
      .catch(error => {
        console.log('error', error)
        setLoading(false)
      });
  }

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
    <SafeAreaView style={{width:'100%',flex:1,backgroundColor:'black'}}>
    <Loader loading={loading}></Loader>
    <View>
  
    {/* <View style={{flexDirection:'row',justifyContent:'space-between'}}>
      
          <View style={{flexDirection:'row',}}>
          <Ionicons
            onPress={() => {
               navigation.goBack()
            }}
            style={{
              marginLeft:10,marginTop:10
            }}
            name={'arrow-back'}
            size={30}
            color={'black'}
          />
        <TouchableOpacity style={{backgroundColor:'white', width:Metrics.rfv(60),height:Metrics.rfv(60),borderRadius:Metrics.rfv(10), marginLeft:10}}
        onPress={()=>{
        //   setProfileImg()
          }}>
          <Image
          style={{
             width:Metrics.rfv(60),height:Metrics.rfv(60),margin:Metrics.rfv(0),borderRadius:Metrics.rfv(10),
            }}
           source={require('../assets/images/image3.jpg')}
         />
         </TouchableOpacity>
      </View>
          <View style={{}}>
         
          <TouchableOpacity   onPress={()=>{ navigation.navigate('AddCards')}}>
                <AntDesign
                      name="pluscircleo"
                       size={20}
                       style={{color:'black', top: Metrics.rfv(20),right: Metrics.rfv(10),}}
                    
                     />
           <View style={{padding:5,borderWidth:1,borderRadius:2,marginRight:Metrics.rfv(30),marginTop:Metrics.rfv(10),}}>
            <Text style={{alignSelf:'center'}}>Add cards</Text>
            </View>
            </TouchableOpacity> 
                
      </View>
      </View>
      <View style={{marginTop:5}}>
      <View style={{borderWidth:0.5,marginTop:10}}/>
      <View style={{flexDirection:'row',margin:10,justifyContent:'space-between'}}>
        <View>
        <Text style={{paddingLeft:10,color:'black',fontWeight:'bold',fontSize:20}}>{'name'}</Text>
        <Text style={{paddingLeft:15,color:'black',}}>{'category' }</Text>
        <Text style={{paddingLeft:15,color:'black',fontSize:10}}>{'tagline'}</Text>
        </View>
         <TouchableOpacity style={{backgroundColor:'white', width:Metrics.rfv(55),height:Metrics.rfv(55),borderRadius:Metrics.rfv(30),}}
        onPress={()=>{
        //   setProfileImg()
          }}>
          <Image
          style={{
             width:Metrics.rfv(50),height:Metrics.rfv(50),margin:Metrics.rfv(3),borderRadius:Metrics.rfv(30),
            }}
           source={require('../assets/images/profileImg.png')}
         />
         </TouchableOpacity>
        <View>
            <TouchableOpacity style={{padding:5,borderWidth:1,borderRadius:5}}
            onPress={()=>{}}>
            <Text style={{alignSelf:'center'}}>Add Artist</Text>
            </TouchableOpacity>
           
            <Text style={{marginTop:5}}>⭐⭐⭐⭐⭐</Text>
                           <Rating
                                count={5}
                                type='star'
                                ratingColor='#3498db'
                                // ratingBackgroundColor='#c8c7c8'
                                imageSize={15}
                                startingValue={rating}
                                // showRating
                                onFinishRating={ratingCompleted}
                                style={{ marginTop:10,alignSelf:'center' }}
                            />
        </View>
         </View>
       <View style={{borderWidth:0.5,}}/>
           <ScrollView>
             <View style={{flex:2,marginBottom:350,}}>
                 <FlatList
                 data={data}
                 renderItem={Item}
                 keyExtractor={item =>item.id}
                 />
             </View>
           </ScrollView>
      </View> */}
      <View>
      <Text style={{fontSize:30,fontFamily:'Montserrat-Bold',color:'white',margin:10,marginLeft:30}}>Se<Text style={{color:'#4b4c4c'}}>halo</Text></Text>
      </View>
      
      <ScrollView style={{}}>
            <View style={{marginBottom:100}}>
        {entertainmentArray.map((post, index) => (
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
    </View>
    </SafeAreaView>
  );
}

export default Entertainment;
