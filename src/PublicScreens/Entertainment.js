import { useIsFocused, useRoute } from '@react-navigation/native';
import { View, Text,SafeAreaView,Image,TouchableOpacity, ScrollView, FlatList,Alert, TextInput, useColorScheme } from 'react-native'
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
import Video from 'react-native-video';
import { getUserProfileInfo } from '../utils/AsyncStorageHelper';
import { API_BASE_URL } from '../api/ApiClient';
import RBSheet from "react-native-raw-bottom-sheet";
import Share from 'react-native-share';
import { DateHelper } from '../utils/DateHelper';
import Popover,{PopoverPlacement} from 'react-native-popover-view';

const Entertainment = () => {
    const navigation=useNavigation()
    const isFocused=useIsFocused()
    const refRBSheet = useRef();
    const refRBSheet1 = useRef();
    const[loading,setLoading]=useState(false)
    const [rating, setRating] = useState('');
    const route=useRoute()
    const [userid,setUserid]=useState('')
    const theme=useColorScheme()
    const [selectedItem1, setSelectedItem1] = useState(null);
    const[entertainmentArray,setEntertainmentArray]=useState([])
    const[coment,setComment]=useState('')
    const[comentId,setCommentId]=useState('')
    const [comments,setComments]=useState([])
    const [selectedItem, setSelectedItem] = useState(null);
    const[reportId,setReportId]=useState('')
  const [showPopover, setShowPopover] = useState(false);
  const [showPopover1, setShowPopover1] = useState(false);
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
                         <Video
                           source={{ uri:`${item.url}` }}
                          //  videoWidth={3000}
                          //  videoHeight={2000}
                          //  thumbnail={{ uri: 'https://i.picsum.photos/id/866/1600/900.jpg' }}
                           style={{width:300,height:250,alignSelf:'center',backgroundColor:theme === 'dark' ? 'black':'white'}}
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

      const reportItem = async (text)=>{
        const res = await getUserProfileInfo()
        console.log(res.accessToken)
          // setLoading(true)
          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          myHeaders.append("Authorization", `Bearer ${res.accessToken}`);
          var raw = JSON.stringify({
            "reportType" : "post",
          "reportItemId" : `${reportId}`,
          "reason" : `${text}`
          });
          
          var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
          };
          console.log(raw)
           fetch(`${API_BASE_URL}/api/report`, requestOptions)
            .then(response => response.json())
            .then(async (result) => {
              console.log('report res',result)
              if( result.success == true ){
                  alert('Thanks for letting us know')
              }
              refRBSheet1.current.close()
              getEntertainments()
              setLoading(false)
            })
            .catch(error => {
              console.log('error', error)
              setLoading(false)
            });
      }
      const userProfile = async (id,name)=>{
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
        // console.log(`${API_BASE_URL}/api/post/deleteComment/${comentId}/${id}`)
        fetch(`${API_BASE_URL}/api/user/profile/${id}`, requestOptions)
          .then(response => response.json())
          .then(result => {
            console.log('get userprofile response',result.data)
            if(result && result.success == true){
              console.log(result.data.accessToken)
                 navigation.navigate('PublicProfile1',{Token:result.data.accessToken,userProfile:true,name:name})
                  setLoading(false)
            }
            setLoading(false)
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
      const DisconnectUser = async (id)=>{
        const res = await getUserProfileInfo()
        console.log(res.accessToken)
          setLoading(true)
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
        console.log(raw)
        fetch(`${API_BASE_URL}/api/user/disconnectUser`, requestOptions)
          .then(response => response.json())
          .then(result => {
            console.log('disconnect user res',result)
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
          // console.log('entertaimnent post',post)
        let name = post.createdBy.name;
        let type= post.createdBy.userType;
        let head= post.head
        let profileImage = post.createdBy.profileImage
        let artist = post.createdBy.artistType
        let alias = post.createdBy.alias
        let status=post.status
        let profileId = post.createdBy._id
        let Id2=post._id
        let likeCount = post.likeCount;
        let commentsCount = post.commentCount
        const isSelected = selectedItem === post._id;
        const isSelected1 = selectedItem1 === post._id;
        const likes =( post.likes.filter((e)=>{
          if( e.user == userid) 
           return e;
         }))
        // const likes= [].
        return( 
        <Card style={{padding:10,margin:10,width:'90%',alignSelf:'center',backgroundColor:theme === 'dark'?'white':'black'}}>
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
          <View style={{flexDirection:'row',}}>
        <TouchableOpacity style={{backgroundColor:'white', width:Metrics.rfv(50),height:Metrics.rfv(50),borderRadius:Metrics.rfv(30),}}
        onPress={()=>{
        //   setProfileImg()
        userProfile(profileId,name)
          }}>
          <Image
          style={{
             width:Metrics.rfv(40),height:Metrics.rfv(40),margin:Metrics.rfv(3),borderRadius:Metrics.rfv(30),
            }}
           source={{uri:profileImage}}
         />
         </TouchableOpacity>
       <View>
       <Text style={{color:theme === 'dark' ?'black':'white',fontWeight:'bold',fontSize:15,marginLeft:10,marginTop:5}}>{name}</Text>
      
       </View>
       </View>
        
        
       
         
         {/* <TouchableOpacity onPress={()=>{
        
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
         </TouchableOpacity> */}
                <TouchableOpacity style={{backgroundColor:theme ==='dark'?'black':'white',padding:2,borderRadius:5,height:25,marginTop:10,marginLeft:100}}
     onPress={()=>{
         if(status == 'Connect'){
          sendRequest(post._id)
         }else if(status == 'Connected'){
          disconnectUser(post._id)
         }else if(status == 'Requested'){
          RejectRequest(post.connectionRequestId)
         }else{

         }
     }}
     > 
        <Text style={{color:theme ==='dark'?'white':'black',alignSelf:'center',}}>{status}</Text>
     </TouchableOpacity>

         <TouchableOpacity onPress={()=>{
          setSelectedItem1(post._id)
          setShowPopover(true)
        //  Alert.alert('Delete', 'Delete this post', [
        //   {
        //     text: 'Cancel',
        //     onPress: () => console.log('Cancel Pressed'),
        //     style: 'cancel',
        //   },
        //   {text: 'OK', onPress: () => { DeletePost(Id2)}},
        // ]);
     }}> 
        <Entypo
         name='dots-three-vertical'
         color={theme === 'dark' ?'black':'white'}
         size={20}
         style={{borderRadius:100,borderRadius:10,alignSelf:'center',padding:2,marginTop:10}}
  
        />
     </TouchableOpacity>
        </View>
        <View style={{flexDirection:'row',marginLeft:40,marginTop:-20}}> 
       <Text style={{color:theme === 'dark' ?'black':'white',fontSize:15,marginLeft:10}}>{artist} ;</Text>
       <Text style={{color:theme === 'dark' ?'black':'white',fontSize:15,marginLeft:5}}>{alias}</Text>
       </View>
       {isSelected1  ?( <Popover
              popoverStyle={{
                width: Metrics.rfp(30),
                // height: Metrics.rfp(20),
                borderRadius: Metrics.rfv(10),
              }}
              isVisible={showPopover}
              onRequestClose={() => setShowPopover(false)}
              from={(
                <TouchableOpacity onPress={() =>
                  setShowPopover(true)
                }>
                </TouchableOpacity>
              )}
            >
            {status == 'Connected' ?( <TouchableOpacity onPress={()=>{DisconnectUser(profileId)}} style={{padding:10}}>
              <Text style={{alignSelf:'center',fontWeight:'bold',color:'black',fontSize:20}}>Disconnect</Text>
              </TouchableOpacity>):(null)}
              <TouchableOpacity onPress={()=>{
                 setShowPopover(false)
                 setShowPopover1(true)
                 setReportId(Id2)
                 refRBSheet.current.close()
                 refRBSheet1.current.open()
              }} style={{padding:10}}>
                <Text style={{alignSelf:'center',fontWeight:'bold',color:'black',fontSize:20}}>Report</Text>
              </TouchableOpacity>
      </Popover>):(null)}
            <View style={{width:'100%'}}>
                   <FlatList
                   horizontal
                      data={post.files || []}
                      renderItem={Item}
                      keyExtractor={(item,index) =>item._id}
                      />
            </View>
            {/* <View style={{borderWidth:0.5,marginTop:10}}/> */}
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <Text style={{color:theme === 'dark' ?'black':'white',fontWeight:'bold',}}>{name}</Text>
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
                                style={{ marginTop:10,alignSelf:'center',marginRight:10 }}
                            />
         
         </View>):(null)}

         </View>
      <Text style={{color:theme === 'dark' ?'black':'white',marginLeft:0}}>{head}</Text>
        <View style={{flexDirection:'row',justifyContent:'space-around',margin:5,}}> 
        <View>
             <TouchableOpacity onPress={()=>{sharePost()}}>
                <EvilIcons
                  name="sc-telegram"
                   size={30}
                   style={{color:theme === 'dark' ?'black':'white',marginRight:10}}
                 />
              </TouchableOpacity>
              <Text style={{fontSize:10,color:theme === 'dark' ?'black':'white',marginTop:5,marginLeft:10}}>{'0'} </Text>
              </View>
                 <View>
                  <TouchableOpacity
                   onPress={()=>{
                    getComments(Id2)
                    setCommentId(Id2)
                    refRBSheet1.current.close()
                    refRBSheet.current.open()
                    }}>
                   <FontAwesome
                  name="comment-o"
                   size={25}
                   style={{color:theme === 'dark' ?'black':'white',marginRight:10}}
                 
                 />
                 </TouchableOpacity>
                 <Text style={{fontSize:10,color:theme === 'dark' ?'black':'white',marginTop:5,marginLeft:10}}>{commentsCount} </Text>
                 </View>
                <View>
                  <Feather
                  name="eye"
                   size={25}
                   style={{color:(isSelected && like) || (likes[0]&& likes[0].user == userid) ? 'blue':(theme === 'dark' ?'black':'white'),marginLeft:10}}
                 onPress={()=>{
                  setSelectedItem(post._id)
                   setLike(!like)
                   postLikes(Id2)
                  }} 
                 />
                 <Text style={{fontSize:10,color:theme === 'dark' ?'black':'white',marginTop:5,marginLeft:10}}>{likeCount} likes</Text>
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
        if( result.message == 'Post unliked successfully' ){
          //  alert(result.message)
           setSelectedItem(null)
    }
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
        <Text style={{color:theme === 'dark' ?'black':'black',}}>{item.text}</Text>
        <Text style={{color:theme === 'dark' ?'black':'black',fontSize:10}}>{date}</Text>
        </View>
      </View>
      </TouchableOpacity>
    ) 
  }
  return (
    <SafeAreaView style={{width:'100%',flex:1,backgroundColor:theme === 'dark'?'black':'white'}}>
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
     
      <View style={{flexDirection:'row'}}>
      <Image
          style={{
             width:75,height:60,margin:0,alignSelf:'center',marginTop:10,marginLeft:10,transform:[{rotate:'2deg'}]
            }}
           source={theme === 'dark' ?require('../assets/images/login1.png'):require('../assets/images/login.png')}
         />
      <Text style={{fontSize:25,fontFamily:'Montserrat-Bold',color:theme === 'dark'?'white':'black',marginLeft:-5,marginTop:20}}>Se<Text style={{color:'#4b4c4c'}}>halo</Text></Text>
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
             <View style={{marginTop:10,marginBottom:110,}}>
              <Text style={{color:theme === 'dark' ?'black':'black',alignSelf:'center',fontWeight:'bold'}}>Comments</Text>
             <FlatList
            data={comments || []}
            renderItem={CommentsItem}
            keyExtractor={item =>item._id}
           />
           <View style={{flexDirection:'row',}}>
           <TextInput
           placeholder='Add comments'
           placeholderTextColor={'black'}
           value={coment}
           onChangeText={(text)=>{setComment(text)}}
           style={{margin:10,borderRadius:10,borderWidth:0.5,width:'80%',color:theme === 'dark' ?'black':'black',}}
           />
            {coment != '' ? (<TouchableOpacity style={{backgroundColor:'blue',marginTop:15,borderRadius:5,padding:10,height:40}}
               onPress={()=>{
                AddComment()
               }}>
              <Text style={{alignSelf:'center',color:'white'}}>post</Text>
            </TouchableOpacity>):(null)}
           </View>
           </View>
           ):(
            <View>
            <Text style={{alignSelf:'center',fontSize:20,fontWeight:'bold',color:theme === 'dark' ?'black':'black',}}>No comments</Text>
            <View style={{flexDirection:'row',}}>
           <TextInput
           placeholder='Add Review'
           placeholderTextColor={'black'}
           value={coment}
           onChangeText={(text)=>{setComment(text)}}
           style={{margin:10,borderRadius:10,borderWidth:0.5,width:'80%',color:theme === 'dark' ?'black':'black',}}
           />
            {coment != '' ? (<TouchableOpacity style={{backgroundColor:'blue',marginTop:15,borderRadius:5,padding:10,height:40}}
               onPress={()=>{
                AddComment()
               }}>
              <Text style={{alignSelf:'center',color:'white'}}>post</Text>
            </TouchableOpacity>):(null)}
           </View>
            </View>
           )}
           {/* <View style={{flexDirection:'row'}}>
           <TextInput
           placeholder='Add comments'
           value={coment}
           onChangeText={(text)=>{setComment(text)}}
           style={{margin:10,borderRadius:10,borderWidth:0.5,width:'80%',color:theme === 'dark' ?'black':'black',}}
           />
            {coment != '' ? (<TouchableOpacity style={{padding:5,backgroundColor:'blue',height:30,marginTop:20,borderRadius:10}}
               onPress={()=>{
                AddComment()
               }}>
              <Text style={{alignSelf:'center',color:'white'}}>post</Text>
            </TouchableOpacity>):(null)}
           </View> */}
           
          </RBSheet>
          <RBSheet
            ref={refRBSheet1}
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
          {showPopover1 ?( <ScrollView style={{}}>
          <Text style={{fontSize:20,fontWeight:'bold',alignSelf:'center'}}>Report</Text>
          <View style={{marginTop:10,margin:10}}>
            <Text style={{fontWeight:'bold',}}>Why are you report this post ?</Text>
            <Text style={{}}>
              your report is anonyomus, expect if you're reporting an intellectual property infringement. If someone is in immediate danger,
              call the local emergency service don't wait.
            </Text>
          </View>
          <View style={{margin:10,width:'100%'}}>
           <TouchableOpacity onPress={()=>{
            let item = "I just don't like it"
            reportItem(item)
            }}>
            <Text style={{fontSize:20,margin:10}}> I just don't like it</Text>
           </TouchableOpacity>
           <TouchableOpacity onPress={()=>{
             let item = "it's spam"
             reportItem(item)
           }}>
            <Text style={{fontSize:20,margin:10}}> it's spam</Text>
           </TouchableOpacity>
           <TouchableOpacity onPress={()=>{
             let item = "Nudity or sexual activity"
             reportItem(item)
           }}>
            <Text style={{fontSize:20,margin:10}}> Nudity or sexual activity</Text>
           </TouchableOpacity>
           <TouchableOpacity onPress={()=>{
             let item = "Violence or dangerous organizations"
             reportItem(item)
           }}>
            <Text style={{fontSize:20,margin:10}}>Violence or dangerous organizations</Text>
           </TouchableOpacity>
           <TouchableOpacity onPress={()=>{
             let item = "scam or farud"
             reportItem(item)
           }}>
            <Text style={{fontSize:20,margin:10}}> scam or farud</Text>
           </TouchableOpacity>
           <TouchableOpacity onPress={()=>{
             let item = "false information"
             reportItem(item)
           }}>
            <Text style={{fontSize:20,margin:10}}> false information</Text>
           </TouchableOpacity>
          </View>
      
           </ScrollView>):(null)}
           
          </RBSheet>
    </View>
    </SafeAreaView>
  );
}

export default Entertainment;
