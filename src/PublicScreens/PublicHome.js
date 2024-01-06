import { View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView, FlatList, Button, TextInput, Alert, useColorScheme, Modal } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import Loader from '../Components/Loader'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather'
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import Metrics from '../Constants/Metrics';
import { Card } from 'react-native-paper';
import { Badge } from 'react-native-elements';
import { DateHelper } from '../utils/DateHelper'
import { API_BASE_URL } from '../api/ApiClient';
import { getUserProfileInfo } from '../utils/AsyncStorageHelper';
import Video from 'react-native-video';
import { BackHandler } from 'react-native';
import RBSheet from "react-native-raw-bottom-sheet";
import Share from 'react-native-share';
import Popover, { PopoverPlacement } from 'react-native-popover-view';

const PublicHome = (props) => {
  const navigation = useNavigation()
  const refRBSheet = useRef();
  const refRBSheet1 = useRef();
  const [userid, setUserid] = useState('')
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItem1, setSelectedItem1] = useState(null);
  const [loading, setLoading] = useState(false)
  const [coment, setComment] = useState('')
  const [comentId, setCommentId] = useState('')
  const [link, setLink] = useState('')
  const theme = useColorScheme();
  const [comments, setComments] = useState([])
  const [reportId, setReportId] = useState('')
  const [showPopover, setShowPopover] = useState(false);
  const [showPopover1, setShowPopover1] = useState(false);
  const [like, setLike] = useState(false)
  const [homeArray, setHomeArray] = useState([])
  const isFocused = useIsFocused()
  const data = [
    { id: 1, image: require('../assets/images/place1.jpg') },
    { id: 2, image: require('../assets/images/place2.jpg') },
    { id: 3, image: require('../assets/images/place3.jpg') },
    { id: 4, image: require('../assets/images/place4.jpg') },
  ]
  console.log('showPopover1', showPopover1)
  const GetUserProfileInfo = async () => {
    const res = await getUserProfileInfo()
    setUserid(res._id)
    console.log('profile res', res)
  }

  const Item = ({ item, index }) => {
    // console.log(item)
    return (
      <View style={{ margin: 10, alignSelf: 'center', }}>

        <View>
          <TouchableOpacity style={{}}
            onPress={() => {

            }}>
            {item.type == 'video' ? (
              < View style={{}}>
                <Video
                  source={{ uri: `${item.url}` }}
                  //  videoWidth={3000}
                  //  videoHeight={2000}
                  //  thumbnail={{ uri: 'https://i.picsum.photos/id/866/1600/900.jpg' }}
                  style={{ width: 300, height: 250, alignSelf: 'center', backgroundColor: theme === 'dark' ? 'black' : 'white' }}
                />
              </View>
            ) : item.type == 'image' ? (
              < View style={{}}>
                <Image
                  key={index}
                  source={{ uri: item.url }}
                  style={{ width: 300, height: 250, alignSelf: 'center', }}
                />
              </View>

            ) : (null)}
          </TouchableOpacity>

        </View>

      </View>
    )
  }

  const reportItem = async (text) => {
    const res = await getUserProfileInfo()
    console.log(res.accessToken)
    // setLoading(true)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${res.accessToken}`);
    var raw = JSON.stringify({
      "reportType": "post",
      "reportItemId": `${reportId}`,
      "reason": `${text}`
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
        console.log('report res', result)
        if (result.success == true) {
          alert('Thanks for letting us know')
        }
        refRBSheet1.current.close()
        getHomedata()
        setLoading(false)
      })
      .catch(error => {
        console.log('error', error)
        setLoading(false)
      });
  }


  const sharePost = async (id) => {
    const res = await getUserProfileInfo()
    console.log(res.accessToken)
    setLoading(true)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${res.accessToken}`);
    var raw = JSON.stringify({
      "type": "profile",
      "itemId": `${id}`
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    fetch(`${API_BASE_URL}/api/share`, requestOptions)
      .then(response => response.json())
      .then(async (result) => {
        console.log('share res', result)
        if (result.success == true) {
          //  alert(result.message)
          setLink(result.data.link)
          const shareOptions = {
            title: 'Share via',
            message: 'Check out this awesome post!',
            url: `${result.data.link}`, // Replace with your actual post URL
            social: Share.Social.ALL, // Share on all social media platforms
          };

          try {
            const result = await Share.open(shareOptions);
            console.log(result);
          } catch (error) {
            console.log(error);
          }
        }
        getHomedata()
        setLoading(false)
      })
      .catch(error => {
        console.log('error', error)
        setLoading(false)
      });

  };

  const DeletePost = async (id) => {
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
        console.log('delete post res', result)
        if (result && result.success == true) {
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

  const DisconnectUser = async (id) => {
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
        console.log('disconnect user res', result)
        if (result && result.success == true) {
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

  const getHomedata = async () => {
    const res = await getUserProfileInfo()
    console.log('res', res.accessToken)
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
        console.log('home res', result.data.posts)
        if (result && result.success == true) {
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

  useEffect(() => {
    getHomedata()
    GetUserProfileInfo()
  }, [isFocused])

  const postLikes = async (id) => {
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
        if (result.message == 'Post unliked successfully') {
          //  alert(result.message)
          setSelectedItem(null)
        }
        console.log('likes response', result)
        getHomedata()
        setLoading(false)
      })
      .catch(error => {
        console.log('error', error)
        setLoading(false)
      });
  }

  const getComments = async (id) => {
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
        console.log('getCommnets res', result.data.comments)
        setComments(result.data.comments)
        getHomedata()
        setLoading(false)
      })
      .catch(error => {
        console.log('error', error)
        setLoading(false)
      });
  }

  const AddComment = async () => {
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

  const deleteComment = async (id) => {
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
        console.log('delete', result)
        getComments(comentId)
        getHomedata();
        setLoading(false)
      })
      .catch(error => {
        console.log('error', error)
        setLoading(false)
      });
  }

  const userProfile = async (id, name) => {
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
        console.log('get userprofile response', result.data)
        if (result && result.success == true) {
          console.log(result.data.accessToken)
          navigation.navigate('PublicProfile1', { Token: result.data.accessToken, userProfile: true, name: name })
          setLoading(false)
        }
        setLoading(false)
      })
      .catch(error => {
        console.log('error', error)
        setLoading(false)
      });
  }

  const renderPost = (post, index) => {
    console.log('post', post)
    let name = post.createdBy.name;
    let likeCount = post.likeCount;
    let commentsCount = post.commentCount
    let head = post.head
    let date = post.date
    let profileImage = post.createdBy.profileImage
    let profileId = post.createdBy._id
    let Id = post._id
    const isSelected = selectedItem === post._id;
    const isSelected1 = selectedItem1 === post._id;
    const likes = post.likes.filter((e) => {
      if (e.user == userid)
        return e;
    })
    //  console.log('likes....',likes)
    //  console.log("likessss...",likes[0] && likes[0].user == userid,isSelected,like)
    return (
      <Card style={{ padding: 10, margin: 10, width: '90%', alignSelf: 'center', backgroundColor: theme === 'dark' ? 'white' : 'black' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity style={{ backgroundColor: 'white', width: Metrics.rfv(50), height: Metrics.rfv(50), borderRadius: Metrics.rfv(30), }}
              onPress={() => {
                userProfile(profileId, name)
              }}>
              <Image
                style={{
                  width: Metrics.rfv(40), height: Metrics.rfv(40), margin: Metrics.rfv(3), borderRadius: Metrics.rfv(30),
                }}
                source={{ uri: profileImage }}
              />
            </TouchableOpacity>
            <Text style={{ color: theme === 'dark' ? 'black' : 'white', fontWeight: 'bold', marginTop: 10, fontSize: 20, marginLeft: 10 }}>{name}</Text>
          </View>
          <View>

            {/* <Text style={{color:'black',fontWeight:'bold'}}>{date}</Text> */}
          </View>
          {/* <TouchableOpacity style={{backgroundColor:'black',padding:5,borderRadius:10}}> 
      <Text style={{color:'white',alignSelf:'center'}}>Connected</Text>
   </TouchableOpacity> */}
          <TouchableOpacity onPress={() => {
            setSelectedItem1(post._id)
            setShowPopover(true)
            // Alert.alert('Delete', 'Delete this post', [
            //   {
            //     text: 'Cancel',
            //     onPress: () => console.log('Cancel Pressed'),
            //     style: 'cancel',
            //   },
            //   {text: 'OK', onPress: () => { DeletePost(Id)}},
            // ]);
          }}>
            <Entypo
              name='dots-three-vertical'
              color={theme === 'dark' ? 'black' : 'white'}
              size={20}
              style={{ borderRadius: 100, borderRadius: 10, alignSelf: 'center', padding: 2, marginTop: 10 }}

            />
          </TouchableOpacity>
        </View>
        {isSelected1 ? (<Popover
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
          <TouchableOpacity onPress={() => { DisconnectUser(profileId) }} style={{ padding: 10 }}>
            <Text style={{ alignSelf: 'center', fontWeight: 'bold', color: 'black', fontSize: 20 }}>Disconnect</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            setShowPopover(false)
            setShowPopover1(true)
            setReportId(Id)
            refRBSheet.current.close()
            refRBSheet1.current.open()
          }}
            style={{ padding: 10 }}>
            <Text style={{ alignSelf: 'center', fontWeight: 'bold', color: 'black', fontSize: 20 }}>Report</Text>
          </TouchableOpacity>
        </Popover>) : (null)}


        <View style={{ width: '100%' }}>
          <FlatList
            horizontal
            data={post.files || []}
            renderItem={Item}
            keyExtractor={(item, index) => item._id}
          />
        </View>
        <View style={{}}>
          <Text style={{ color: theme === 'dark' ? 'black' : 'white', fontWeight: 'bold', }}>{name}</Text>
          <Text style={{ color: theme === 'dark' ? 'black' : 'white', marginLeft: 0 }}>{head}</Text>

        </View>
        {/* <View style={{borderWidth:0.5,marginTop:10}}/> */}
        <View style={{ flexDirection: 'row', margin: 5, justifyContent: 'space-evenly' }}>
          <View>
            <TouchableOpacity onPress={() => { sharePost(Id) }}>
              <EvilIcons
                name="sc-telegram"
                size={30}
                style={{ color: theme === 'dark' ? 'black' : 'white', marginRight: 10 }}
              />

            </TouchableOpacity>
            <Text style={{ fontSize: 10, color: theme === 'dark' ? 'black' : 'white', marginTop: 5, marginLeft: 10 }}>{'0'} </Text>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => {
                getComments(Id)
                setCommentId(Id)
                refRBSheet1.current.close()
                refRBSheet.current.open()
              }}>
              <FontAwesome
                name="comment-o"
                size={25}
                style={{ color: theme === 'dark' ? 'black' : 'white', marginRight: 10 }}

              />
            </TouchableOpacity>
            <Text style={{ fontSize: 10, color: theme === 'dark' ? 'black' : 'white', marginTop: 5, marginLeft: 10 }}>{commentsCount} </Text>
          </View>
          <View>
            <Feather
              name="eye"
              size={25}
              style={{ color: (isSelected && like) || (likes[0] && likes[0].user == userid) ? 'blue' : (theme === 'dark' ? 'black' : 'white'), marginLeft: 10 }}
              onPress={() => {
                setSelectedItem(post._id)
                setLike(!like)
                postLikes(Id)
              }}
            />
            <Text style={{ fontSize: 10, color: theme === 'dark' ? 'black' : 'white', marginTop: 5, marginLeft: 10 }}>{likeCount} likes</Text>
          </View>

        </View>
        {/* <Text style={{color:theme === 'dark' ?'black':'white',fontSize:10,marginLeft:0,marginTop:5}}>{date.slice(0,10)}</Text> */}
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

  const CommentsItem = ({ item }) => {
    console.log('comment', item)
    let profileImage = item.user.profileImage
    let name = item.user.name
    let id = item._id
    let date = DateHelper.formatToDateAMPM(item.createdAt)
    return (
      <TouchableOpacity onLongPress={() => {
        Alert.alert('Delete', 'Delete  comment', [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          { text: 'OK', onPress: () => { deleteComment(id) } },
        ]);

      }}>
        <View style={{ flexDirection: 'row', marginTop: 10 }}>

          <View>
            <TouchableOpacity style={{ backgroundColor: 'white', width: Metrics.rfv(50), height: Metrics.rfv(50), borderRadius: Metrics.rfv(30), }}
              onPress={() => {
                //   setProfileImg()
              }}>
              <Image
                style={{
                  width: Metrics.rfv(40), height: Metrics.rfv(40), margin: Metrics.rfv(3), borderRadius: Metrics.rfv(30),
                }}
                source={{ uri: profileImage }}
              />
            </TouchableOpacity>
          </View>
          <View style={{ marginLeft: 10, marginTop: 5 }}>
            <Text style={{ fontWeight: 'bold', color: 'black' }}>{name}</Text>
            <Text style={{ color: theme === 'dark' ? 'black' : '', }}>{item.text}</Text>
            <Text style={{ color: theme === 'dark' ? 'black' : '', fontSize: 10, }}>{date}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={{ alignSelf: 'center', width: '100%', flex: 1, backgroundColor: theme === 'dark' ? 'black' : 'white', }}>
      <Loader loading={loading}></Loader>
      <View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', }}>
            <Image
              style={{
                width: 75, height: 60, margin: 0, alignSelf: 'center', marginTop: 0, marginLeft: 10, transform: [{ rotate: '2deg' }]
              }}
              source={theme === 'dark' ? require('../assets/images/login1.png') : require('../assets/images/login.png')}
            />
            <Text style={{ fontSize: 25, fontFamily: 'Montserrat-Bold', color: '#c6302c', margin: 20, marginLeft: 0 }}>Se<Text style={{ color: theme === 'dark' ? 'white' : 'black' }}>halo</Text></Text>

          </View>
          <View style={{ marginTop: Metrics.rfv(10) }}>
            <Ionicons
              name="chatbubble-outline"
              size={30}
              style={{ color: theme === 'dark' ? 'white' : 'black', marginRight: 20, margin: 10 }}
              onPress={() => { navigation.navigate('ChatScreen') }}
            />
            <Badge
              value={'1'}
              containerStyle={{
                top: Metrics.rfv(-40),
                left: Metrics.rfv(5),
              }}></Badge>
          </View>
        </View>

        <ScrollView style={{}}>
          <View style={{ marginBottom: 100 }}>
            {homeArray.map((post, index) => (
              <View key={index} style={{}}>
                {renderPost(post, index)}
              </View>
            ))}
          </View>
        </ScrollView>

      </View>
      <View style={{}}>
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
            },

          }}
          height={400}

        >

          {comments.length > 0 ? (
            <View style={{ marginTop: 10, marginBottom: 110, }}>
              <Text style={{ color: theme === 'dark' ? 'black' : '', alignSelf: 'center', fontWeight: 'bold' }}>Comments</Text>
              <FlatList
                data={comments || []}
                renderItem={CommentsItem}
                keyExtractor={item => item._id}
              />
              <View style={{ flexDirection: 'row', }}>
                <TextInput
                  placeholder='Add comments'
                  placeholderTextColor={'black'}
                  value={coment}
                  onChangeText={(text) => { setComment(text) }}
                  style={{ margin: 10, borderRadius: 10, borderWidth: 0.5, width: '80%', color: theme === 'dark' ? 'black' : '', }}
                />
                {coment != '' ? (<TouchableOpacity style={{ backgroundColor: 'blue', marginTop: 15, borderRadius: 5, padding: 10, height: 40 }}
                  onPress={() => {
                    AddComment()
                  }}>
                  <Text style={{ alignSelf: 'center', color: 'white' }}>post</Text>
                </TouchableOpacity>) : (null)}
              </View>
            </View>
          ) : (
            <View>
              <Text style={{ alignSelf: 'center', fontSize: 20, fontWeight: 'bold', color: theme === 'dark' ? 'black' : '', }}>No comments</Text>
              <View style={{ flexDirection: 'row', }}>
                <TextInput
                  placeholder='Add comments'
                  placeholderTextColor={'black'}
                  value={coment}
                  onChangeText={(text) => { setComment(text) }}
                  style={{ margin: 10, borderRadius: 10, borderWidth: 0.5, width: '80%', color: theme === 'dark' ? 'black' : '', }}
                />
                {coment != '' ? (<TouchableOpacity style={{ backgroundColor: 'blue', marginTop: 15, borderRadius: 5, padding: 10, height: 40 }}
                  onPress={() => {
                    AddComment()
                  }}>
                  <Text style={{ alignSelf: 'center', color: 'white' }}>post</Text>
                </TouchableOpacity>) : (null)}
              </View>
            </View>
          )}
          {/* <View style={{flexDirection:'row',}}>
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
           </View> */}

        </RBSheet>
      </View>
      <View style={{}}>
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
        {showPopover1 ? (<ScrollView style={{}}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', alignSelf: 'center' }}>Report</Text>
          <View style={{ marginTop: 10, margin: 10 }}>
            <Text style={{ fontWeight: 'bold', }}>Why are you report this post ?</Text>
            <Text style={{}}>
              your report is anonyomus, expect if you're reporting an intellectual property infringement. If someone is in immediate danger,
              call the local emergency service don't wait.
            </Text>
          </View>
          <View style={{ margin: 10, width: '100%' }}>
            <TouchableOpacity onPress={() => {
              let item = "I just don't like it"
              reportItem(item)
            }}>
              <Text style={{ fontSize: 20, margin: 10 }}> I just don't like it</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              let item = "it's spam"
              reportItem(item)
            }}>
              <Text style={{ fontSize: 20, margin: 10 }}> it's spam</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              let item = "Nudity or sexual activity"
              reportItem(item)
            }}>
              <Text style={{ fontSize: 20, margin: 10 }}> Nudity or sexual activity</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              let item = "Violence or dangerous organizations"
              reportItem(item)
            }}>
              <Text style={{ fontSize: 20, margin: 10 }}>Violence or dangerous organizations</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              let item = "scam or farud"
              reportItem(item)
            }}>
              <Text style={{ fontSize: 20, margin: 10 }}> scam or farud</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              let item = "false information"
              reportItem(item)
            }}>
              <Text style={{ fontSize: 20, margin: 10 }}> false information</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>) : (null)}

      </RBSheet>
      </View>
    </SafeAreaView>
  )
}

export default PublicHome