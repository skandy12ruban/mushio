import React, { useState, useEffect, useCallback, } from 'react';
import { View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView, StyleSheet, PermissionsAndroid, Platform, ActivityIndicator, Clipboard } from 'react-native';
import Loader from '../Components/Loader';
import Metrics from '../Constants/Metrics';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { API_BASE_URL } from '../api/ApiClient'
import { getUserProfileInfo } from '../utils/AsyncStorageHelper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Bubble, GiftedChat, Send, IMessage, InputToolbar } from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as DocumentPicker from 'react-native-document-picker';
import NavBar from '../Components/chat/navbar';
import InChatFileTransfer from '../Components/chat/InChatFileTransfer';
import InChatViewFile from '../Components/chat/InChatViewFile';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import RNFetchBlob from 'rn-fetch-blob';
import { getAPI, postAPI } from '../api/api-utils';

const audioRecorderPlayer = new AudioRecorderPlayer();


const FriendsMessage = () => {
  const navigation = useNavigation()

  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(null)
  const [participant, setParticipant] = useState(null)
  const route = useRoute()
  const { item } = route.params;
  // 
  const time = `${new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true, // This will display AM/PM
  })}`


  const [recordingActive, setRecordingActive] = useState(false);
  const [audioPath, setAudioPath] = useState('');

  const [isAttachAudio, setIsAttachAudio] = useState(false);
  const [isAttachImage, setIsAttachImage] = useState(false);
  const [isAttachFile, setIsAttachFile] = useState(false);
  const [imagePath, setImagePath] = useState('');
  const [filePath, setFilePath] = useState('');
  const [fileVisible, setFileVisible] = useState(false);
  const [messages, setMessages] = useState([]);

  const checkPermissions = async () => {
    if (Platform.OS === 'android') {
      try {
        const grants = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ]);



        if (
          grants['android.permission.WRITE_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.READ_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.RECORD_AUDIO'] === PermissionsAndroid.RESULTS.GRANTED
        ) {

        } else {

          return;
        }
      } catch (err) {
        console.warn(err);
        return;
      }
    }
  }

  const serializeChat = (item) => {
    return {
      _id: item._id,
      text: item.message,
      createdAt: item.createdAt,
      user: {
        _id: item.sender._id,
        name: item.sender.name,
        avatar: item.sender.profileImage,
      },
    }
  }

  const fetchChats = async () => {
    let url = `${API_BASE_URL}/api/message/${item._id}`;
    getAPI(url).then(res => {
      let messages = res.data.list.map(item => serializeChat(item))
      messages = messages.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setMessages(messages)
    })
  }
  useEffect(() => {

    getUserProfileInfo().then(userDetails => {
      let id = userDetails._id;
      let userInfo = item.participants.find(user => user._id == id)
      let otherUserInfo = item.participants.find(user => user._id != id)
      if (userInfo) {
        setUser(userInfo);
      }
      if (otherUserInfo) {
        setParticipant(otherUserInfo);
      }
    });
    checkPermissions();
    fetchChats();
  }, [])

  const dirs = RNFetchBlob.fs.dirs;
  const path = Platform.select({
    ios: 'hello.m4a',
    android: `${dirs.CacheDir}/hello.mp3`,
  });

  const onStartRecord = async () => {
    setRecordingActive(true);

    await audioRecorderPlayer.startRecorder(path);
  }
  const onStopRecord = async () => {
    setRecordingActive(false);

    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    setAudioPath(result)
    setIsAttachAudio(true)
  };


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

      } else {

        throw err;
      }
    }
  };

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
    } else if (isAttachAudio) {
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
          url: audioPath
        }
      };
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, newMessage),
      );
      setAudioPath('');
      setIsAttachAudio(false);
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
      addMessage(messageToSend)
    }
  },
    [filePath, imagePath, isAttachFile, isAttachImage, audioPath, isAttachAudio],
  );

  const addMessage = (message) => {
    let payload = {
      message: message.text,
      chatId: item._id,
    }
    let url = `${API_BASE_URL}/api/message`;
    postAPI(url, payload).then(res => {
      if (res) {
        setMessages(previousMessages =>
          GiftedChat.append(previousMessages, message),
        );
      }
    })

  }
  const renderSend = (props) => {
    return (

      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={() => { recordingActive ? onStopRecord() : onStartRecord() }}>
          {recordingActive ? (<FontAwesome
            name="microphone"
            size={25}
            color='red'
            style={{ marginTop: 10, marginRight: 10, }}
          />) : (
            <FontAwesome
              name="microphone"
              size={25}
              color="#00B0FF"
              style={{ marginTop: 10, marginRight: 10, }}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={_pickDocument}>
          <Icon
            name="paperclip"
            style={{
              marginTop: 10,
              marginRight: 10,
              transform: [{ rotateY: '180deg' }],
            }}
            size={30}
            color="#00B0FF"
            tvParallaxProperties={undefined}
          />
        </TouchableOpacity>
        <Send {...props}>
          <View>
            <MaterialCommunityIcons
              name="send-circle"
              style={{ marginBottom: 5, marginRight: 5 }}
              size={30}
              color="#00B0FF"
            />
          </View>
        </Send>
      </View>
    );
  };

  const renderBubble = (props) => {
    const { currentMessage } = props;
    if (currentMessage.file && currentMessage.file.url) {
      return (
        <TouchableOpacity
          style={{
            ...styles.fileContainer,
            backgroundColor: props.currentMessage.user._id === 2 ? '#00B0FF' : '#efefef',
            borderBottomLeftRadius: props.currentMessage.user._id === 2 ? 15 : 5,
            borderBottomRightRadius: props.currentMessage.user._id === 2 ? 5 : 15,
          }}
          onPress={() => setFileVisible(true)}
        >
          <InChatFileTransfer
            style={{ marginTop: -10 }}
            filePath={currentMessage.file.url}
          />
          <InChatViewFile
            props={props}
            visible={fileVisible}
            onClose={() => setFileVisible(false)}
          />
          <View style={{ flexDirection: 'column' }}>
            <Text style={{
              ...styles.fileText,
              color: currentMessage.user._id === 2 ? 'white' : 'black',
            }} >
              {currentMessage.text}
            </Text>
            <Text style={{ alignSelf: 'flex-end', color: 'white', fontSize: 10, padding: 5 }}>{`${time}`}</Text>
          </View>
        </TouchableOpacity>
      );
    }

    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#00B0FF',
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
    return (
      <FontAwesome name='angle-double-down' size={22} color='#333' />
    );
  }

  const renderInputToolbar = (props) => {
    //Add the extra styles via containerStyle
    return <InputToolbar {...props} containerStyle={{ borderRadius: 100, marginBottom: 5 }} />
  }
  const renderChatFooter = useCallback(() => {
    if (audioPath) {

      return (
        <View style={styles.chatFooter}>
          <InChatFileTransfer
            filePath={audioPath}
          />
          <TouchableOpacity
            onPress={() => setAudioPath('')}
            style={styles.buttonFooterChat}
          >
            <Text style={styles.textFooterChat}>X</Text>
          </TouchableOpacity>
        </View>)
    }
    if (imagePath) {
      return (
        <View style={styles.chatFooter}>
          <Image source={{ uri: imagePath }} style={{ height: 75, width: 75 }} />
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
  }, [audioPath, filePath, imagePath]);

  const onDeleteMessage = (messageId) => {
    // Filter out the message to be deleted
    const updatedMessages = messages.filter((message) => message._id !== messageId);
    setMessages(updatedMessages);
  };
  const handleCopyMessage = (message) => {
    const textToCopy = message.text;
    Clipboard.setString(textToCopy);
  };
  return (
    user && 
    <SafeAreaView style={{ alignSelf: 'center', width: '100%', flex: 1, }}>
      <Loader loading={loading}></Loader>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <Ionicons
          onPress={() => {
            navigation.goBack()
          }}
          style={{
            marginLeft: 15, marginTop: 10, alignSelf: 'center'
          }}
          name={'arrow-back'}
          size={30}
          color={'black'}

        />
        <View style={{ marginTop: 10, marginLeft: 10, flex: 1, flexDirection: 'row' }}>
          <TouchableOpacity style={{ width: Metrics.rfv(60), height: Metrics.rfv(60) }}
            onPress={() => {
              //   setProfileImg()
            }}>
            <Image
              style={{
                width: Metrics.rfv(50), height: Metrics.rfv(50), borderRadius: Metrics.rfv(30),
                alignSelf: 'center'
              }}
              source={{
                uri: item.participantImage
              }}
            />
          </TouchableOpacity>
          <View style={{ alignSelf: 'center', marginHorizontal: 10 }}>
            <Text style={{ fontWeight: 'bold', color: 'black' }}>{item.participantName}</Text>
            <Text>Active now</Text>
          </View>
        </View>

        <Ionicons
          onPress={() => {
            navigation.navigate('CallScreen', {
              data: {
                callerData: user,
                receiverData: participant,
                callType: 'audio'
              }
            })
          }}
          style={{ marginTop: 10, marginHorizontal: 10, alignSelf: 'center', }}
          name={'call'}
          size={30}
          color={'black'}
        />
        <Ionicons
          onPress={() => {
            navigation.navigate('CallScreen', {
              data: {
                callerData: user,
                receiverData: participant,
                callType: 'audio'
              }
            })
          }}
          style={{ marginTop: 10, marginHorizontal: 10, alignSelf: 'center', }}
          name={'videocam'}
          size={30}
          color={'black'}
        />
        <Entypo
          onPress={() => { navigation.navigate('') }}
          style={{ alignSelf: 'center', marginTop: 10, marginHorizontal: 10, }}
          name={'dots-three-vertical'}
          size={30}
          color={'black'}
        />


      </View>
      <View style={{ borderWidth: 0.5, marginTop: 10 }} />

      <View style={{ flex: 1 }}>
        {/* <NavBar/> */}
        <GiftedChat
          messages={messages}
          onSend={(messages) => onSend(messages)}
          user={{
            _id: user._id,
            avatar: user.profileImage
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
          renderInputToolbar={renderInputToolbar}
          onLongPress={(context, message) => {
            // Handle long press on a message
            const options = ['copy', 'Delete Message', 'Cancel'];
            const cancelButtonIndex = options.length - 1;

            context.actionSheet().showActionSheetWithOptions(
              {
                options,
                cancelButtonIndex,
              },
              (buttonIndex) => {
                switch (buttonIndex) {
                  case 0:
                    handleCopyMessage(message);
                    break;
                  case 1:
                    onDeleteMessage(message._id);
                    break;
                }
              }
            );
          }}
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
    transform: [{ rotateY: '180deg' }],
  },
  sendButton: { marginBottom: 10, marginRight: 10 },
  sendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  chatFooter: {
    shadowColor: '#00B0FF',
    shadowOpacity: 0.37,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.18)',
    flexDirection: 'row',
    padding: 5,
    backgroundColor: '#00B0FF'
  },
  fileContainer: {
    flex: 1,
    maxWidth: 200,
    // marginVertical: 2,
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
  audioPlayerContainer: { flexDirection: 'row', alignItems: 'center' },
  progressDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressDetailsText: {
    paddingHorizontal: 5,
    color: 'black',

  },
  progressIndicatorContainer: {
    flex: 1,
    backgroundColor: '#e2e2e2',
    marginTop: 10
  },
  progressLine: {
    borderWidth: 1,
    borderColor: 'black',
  },
});
export default FriendsMessage;
