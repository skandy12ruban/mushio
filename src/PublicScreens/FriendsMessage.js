import React,{useState,useEffect,useCallback} from 'react';
import { View, Text, SafeAreaView,Image,TouchableOpacity,ScrollView,StyleSheet } from 'react-native';
import Loader from '../Components/Loader';
import Metrics from '../Constants/Metrics';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation, useRoute } from '@react-navigation/native';
import {Bubble, GiftedChat, Send, IMessage} from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as DocumentPicker from 'react-native-document-picker';
import NavBar from '../Components/chat/navbar';
import InChatFileTransfer from '../Components/chat/InChatFileTranfer';
import InChatViewFile from '../Components/chat/InChatViewFile';

interface File extends IMessage {
  url?: string;
}

const FriendsMessage = () => {
  const navigation=useNavigation()
  const[loading,setLoading]=useState(false)
  const route= useRoute()
  const{item}=route.params;
// console.log('item',item)

  const [isAttachImage, setIsAttachImage] = useState(false);
const [isAttachFile, setIsAttachFile] = useState(false);
const [imagePath, setImagePath] = useState('');
const [filePath, setFilePath] = useState('');
const [fileVisible, setFileVisible] = useState(false);
const [messages, setMessages] = useState([
  {
    _id: 1,
    text: 'Welcome !!',
    createdAt: new Date(),
    user: {
      _id: 1,
      name: 'UserChat',
      avatar: '',
    },
    image: '',
    file: {
      url: '',
    }
  },
]);

const _pickDocument = async () => {
  try {
    const result = await DocumentPicker.pick({
      type: [DocumentPicker.types.allFiles],
      copyTo: 'documentDirectory',
      mode: 'import',
      allowMultiSelection: true,
    });
    const fileUri = result[0].fileCopyUri;
    if (!fileUri) {
      console.log('File URI is undefined or null');
      return;
    }
    if (fileUri.indexOf('.png') !== -1 || fileUri.indexOf('.jpg') !== -1) {
      setImagePath(fileUri);
      setIsAttachImage(true);
    } else {
      setFilePath(fileUri);
      setIsAttachFile(true);
    }
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      console.log('User cancelled file picker');
    } else {
      console.log('DocumentPicker err => ', err);
      throw err;
    }
  }
};

  useEffect(() => {
    
  }, []);

  const onSend = useCallback((messages = []) => {
    const [messageToSend] = messages;
    if (isAttachImage) {
      const newMessage = {
        _id: messages[0]._id + 1,
        text: messageToSend.text,
        createdAt: new Date(),
        user: {
          _id: 2,
          avatar: '',
        },
        image: imagePath,
        file: {
          url: ''
        }
      };
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, newMessage),
      );
      setImagePath('');
      setIsAttachImage(false);
    } else if (isAttachFile) {
      const newMessage = {
        _id: messages[0]._id + 1,
        text: messageToSend.text,
        createdAt: new Date(),
        user: {
          _id: 2,
          avatar: '',
        },
        image: '',
        file: {
          url: filePath
        }
      };
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, newMessage),
      );
      setFilePath('');
      setIsAttachFile(false);
    } else {
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, messages),
      );
    }
  },
  [filePath, imagePath, isAttachFile, isAttachImage],
  );
  

  const renderSend = (props) => {
    return (
    
        <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={_pickDocument}>
        <Icon
          name="paperclip"
          style={{
            marginTop: 5,
            marginRight: 5,
            transform: [{rotateY: '180deg'}],
          }}
          size={30}
          color="#2e64e5"
          tvParallaxProperties={undefined}
        />
        </TouchableOpacity>
        <Send {...props}>
          <View>
          <MaterialCommunityIcons
            name="send-circle"
            style={{marginBottom: 5, marginRight: 5}}
            size={30}
            color="#2e64e5"
          />
        </View>
      </Send>
      </View>
    );
  };

  const renderBubble = (props) => {
    const {currentMessage} = props;
    if (currentMessage.file && currentMessage.file.url) {
      return (
        <TouchableOpacity
        style={{
          ...styles.fileContainer,
          backgroundColor: props.currentMessage.user._id === 2 ? '#2e64e5' : '#efefef',
          borderBottomLeftRadius: props.currentMessage.user._id === 2 ? 15 : 5,
          borderBottomRightRadius: props.currentMessage.user._id === 2 ? 5 : 15,
        }}
        onPress={() => setFileVisible(true)}
        >
          <InChatFileTransfer
            style={{marginTop: -10}}
            filePath={currentMessage.file.url}
          />
          <InChatViewFile
              props={props}
              visible={fileVisible}
              onClose={() => setFileVisible(false)}
            />
          <View style={{flexDirection: 'column'}}>
            <Text style={{
                  ...styles.fileText,
                  color: currentMessage.user._id === 2 ? 'white' : 'black',
                }} >
              {currentMessage.text}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#2e64e5',
          },
        }}
        textStyle={{
          right: {
            color: '#efefef',
          },
        }}
      />
    );
  };

  const scrollToBottomComponent = () => {
    return(
      <FontAwesome name='angle-double-down' size={22} color='#333' />
    );
  }

  const renderChatFooter = useCallback(() => {
    if (imagePath) {
      return (
        <View style={styles.chatFooter}>
          <Image source={{uri: imagePath}} style={{height: 75, width: 75}} />
          <TouchableOpacity
            onPress={() => setImagePath('')}
            style={styles.buttonFooterChatImg}
          >
            <Text style={styles.textFooterChat}>X</Text>
          </TouchableOpacity>
        </View>
      );
    }
    if (filePath) {
      return (
        <View style={styles.chatFooter}>
          <InChatFileTransfer
            filePath={filePath}
          />
          <TouchableOpacity
            onPress={() => setFilePath('')}
            style={styles.buttonFooterChat}
          >
            <Text style={styles.textFooterChat}>X</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  }, [filePath, imagePath]);
  return (
    <SafeAreaView style={{alignSelf:'center',width:'100%',flex:1,}}>
    <Loader loading={loading}></Loader>
    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
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
        <TouchableOpacity style={{backgroundColor:'white', width:Metrics.rfv(60),height:Metrics.rfv(60),borderRadius:Metrics.rfv(10),marginRight:30}}
        onPress={()=>{
        //   setProfileImg()
          }}>
          <Image
          style={{
             width:Metrics.rfv(60),height:Metrics.rfv(60),margin:Metrics.rfv(0),borderRadius:Metrics.rfv(10),
            }}
           source={require('../assets/images/profileImg.png')}
         />
         </TouchableOpacity>
         <View style={{marginTop:10,marginRight:30}}>
          <Text style={{fontWeight:'bold',color:'black'}}>{item.name}</Text>
          <Text>Active now</Text>
         </View>
         <Ionicons
            onPress={() => { navigation.navigate('') }}
            style={{ marginLeft:10,marginTop:10,marginRight:30}}
            name={'videocam'}
            size={30}
            color={'black'}
          />
          <View style={{marginTop:15,}}>
          <Entypo
            onPress={() => { navigation.navigate('') }}
            style={{ alignSelf:'flex-end',}}
            name={'dots-three-vertical'}
            size={30}
            color={'black'}
          />
          </View>
          
    </View>
    <View style={{borderWidth:0.5,marginTop:10}}/>
        
             <View style={{flex:1}}>
               {/* <NavBar/> */}
     <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: 2,
      }}
      renderBubble={renderBubble}
      alwaysShowSend
      renderSend={renderSend}
      scrollToBottom
      showUserAvatar
      isAnimated
      showAvatarForEveryMessage
      scrollToBottomComponent={scrollToBottomComponent}
      renderChatFooter={renderChatFooter}
    />
          

             </View>
         
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  paperClip: {
    marginTop: 8,
    marginHorizontal: 5,
    transform: [{rotateY: '180deg'}],
  },
  sendButton: {marginBottom: 10, marginRight: 10},
  sendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  chatFooter: {
    shadowColor: '#1F2687',
    shadowOpacity: 0.37,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 8},
    elevation: 8,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.18)',
    flexDirection: 'row',
    padding: 5,
    backgroundColor: 'blue'
  },
  fileContainer: {
    flex: 1,
    maxWidth: 300,
    marginVertical: 2,
    borderRadius: 15,
  },
  fileText: {
    marginVertical: 5,
    fontSize: 16,
    lineHeight: 20,
    marginLeft: 10,
    marginRight: 5,
  },
  textTime: {
    fontSize: 10,
    color: 'gray',
    marginLeft: 2,
  },
  buttonFooterChat: {
    width: 35,
    height: 35,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    borderColor: 'black',
    right: 3,
    top: -2,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  buttonFooterChatImg: {
    width: 35,
    height: 35,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    borderColor: 'black',
    left: 66,
    top: -4,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
  textFooterChat: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'gray',
  },
});
export default FriendsMessage;
