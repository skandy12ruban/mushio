import { View, Text,SafeAreaView,FlatList,Image,ScrollView,TouchableOpacity,TextInput,
  PermissionsAndroid,Platform,ActivityIndicator,Button,StyleSheet,Alert } from 'react-native'
import React,{useState,useEffect} from 'react'
import { Card } from 'react-native-paper'
import Metrics from '../Constants/Metrics'
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation, useRoute } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';

import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import { getUserProfileInfo } from '../utils/AsyncStorageHelper';
import Loader from '../Components/Loader';
import { API_BASE_URL } from '../api/ApiClient';

const audioRecorderPlayer = new AudioRecorderPlayer();

const Category = () => {
    const route =useRoute()
    const {item,hashtags}=route.params;
    console.log(item,hashtags)
    const[loading,setLoading]=useState(false)
    const navigation=useNavigation()
    const[title,setTitle]=useState('')
    const[description,setDescription]=useState('')
    const [selectedDate, setSelectedDate] = useState(new Date());
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const[imgArray,setImagArray]=useState([])
  const[videoArray,setVideoArray]=useState([])
  const[audioArray,setAudioArray]=useState([])
  const [visible,setVisible]=useState(false)
  const [fileUri, setFileUri] = useState(null);
  const [fileUri1, setFileUri1] = useState(null);
   const[type,setType]=useState('')

   const [recordingActive, setRecordingActive] = useState(false);
   const [recordSecs, setRecordSecs] = useState(0);
   const [recordTime, setRecordTime] = useState(0);
   const [audioPath, setAudioPath] = useState('');
   const [paused, setPaused] = useState(false);
   const [currentPositionSec, setCurrentPositionSec] = useState(0);
  const [loadingAudio, setLoadingAudio] = useState(false);
   const [currentDurationSec, setCurrentDurationSec] = useState(recordTime);
   const [playTime, setPlayTime] = useState(0);
   const [duration, setDuration] = useState(recordTime);

  

console.log('duration',duration)

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(date);
    setVisible(true)
    hideDatePicker();
  };

  const checkPermissions = async ()=>{
    if (Platform.OS === 'android') {
      try {
        const grants = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ]);
    
        console.log('write external stroage', grants);
    
        if (
          grants['android.permission.WRITE_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.READ_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.RECORD_AUDIO'] === PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log('Permissions granted');
        } else {
          console.log('All required permissions not granted');
          return;
        }
      } catch (err) {
        console.warn(err);
        return;
      }
    }
  }
  
  useEffect(()=>{
    checkPermissions();
  },[])
  
 

    const onStartRecord = async () => {
    setRecordingActive(true);

    await audioRecorderPlayer.startRecorder();
    audioRecorderPlayer.addRecordBackListener(e => {
      setRecordSecs(e.currentPosition);
      setRecordTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)));

      return;
    });
  }
  const onStopRecord = async () => {
    setRecordingActive(false);

    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    setRecordSecs(0);
    const fileNameWithoutExtension = result.replace(/\.[^/.]+$/, "");

// Constructing the desired object
    const resultObject = {
          uri: result,
           type: "audio/mp3", // Change this to the appropriate MIME type for your use case
          fileName: 'audio',
       };
       console.log(resultObject);
    setAudioPath(result)
    const audioArray=[]
    audioArray.push(resultObject)
    // console.log('audioArray...',audioArray)
    filesUpload2(audioArray)
     console.log('response',result)
    
  };

  const onStartPlay = async () => {
    setPaused(false);
    setLoadingAudio(true);
    await audioRecorderPlayer.startPlayer(audioPath);

    setLoadingAudio(false);
    audioRecorderPlayer.addPlayBackListener(e => {
      if (e.currentPosition < 0) {
        return;
      }

      setCurrentPositionSec(e.currentPosition);
      setCurrentDurationSec(e.duration);
      setPlayTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)));
      setDuration(audioRecorderPlayer.mmssss(Math.floor(e.duration)));

      if (e.currentPosition === e.duration) {
        onStopPlay();
      }
      return;
    });
  };

  const onPausePlay = async () => {
    setPaused(true);
    await audioRecorderPlayer.pausePlayer();
  };

  const onStopPlay = async () => {
    setPaused(false);
    setCurrentPositionSec(0);
    setPlayTime(0);
    audioRecorderPlayer.stopPlayer();
    audioRecorderPlayer.removePlayBackListener();
  };

  const launchNativeImageLibrary = () => {
    let options = {
      mediaType: 'photo',
      // includeBase64: true,
      selectionLimit:4,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: response.assets.uri };
        console.log('response', JSON.stringify(response));
       
        setType(response.assets[0].type)
        setFileUri(response.assets[0].uri)
        filesUpload(response.assets)
      }
    });

  }
  const launchNativeImageLibrary1 = () => {
    let options = {
      mediaType: 'video',
      // includeBase64: true,
      selectionLimit:100,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: response.assets.uri };
        console.log('response', JSON.stringify(response));
        setType(response.assets[0].type)
        setFileUri1(response.assets[0].uri)
        filesUpload1(response.assets)
      }
    });

  }

  const filesUpload = async (ImgArray)=>{
    setLoading(true)
    const res = await getUserProfileInfo()
    setLoading(true)
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${res.accessToken}`);
    const formdata = new FormData();

    ImgArray.forEach((image, index) => {
      formdata.append('files', {
        uri: image.uri,
        type: image.type,
        name: image.fileName,
      });
    });

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: formdata,
  redirect: 'follow'
};
// console.log(requestOptions) 
fetch(`${API_BASE_URL}/api/fileUpload/uploadFiles`, requestOptions)
  .then(response => response.json())
  .then(result => {
    // console.log('upload res',result.data)
    if(result && result.success == true){ 
      const urlArray = result.data.map(item => item.url);
      setImagArray(urlArray)
      // console.log(urlArray)
      alert(result.message)
      setLoading(false)
    }
    setLoading(false)
  })
  .catch(error => {
    console.log('error', error)
    setLoading(false)
  });
  }
  const filesUpload1 = async (ImgArray)=>{
    setLoading(true)
    const res = await getUserProfileInfo()
    setLoading(true)
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${res.accessToken}`);
    const formdata = new FormData();

    ImgArray.forEach((image, index) => {
      formdata.append('files', {
        uri: image.uri,
        type: image.type,
        name: image.fileName,
      });
    });

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: formdata,
  redirect: 'follow'
};
// console.log(requestOptions) 
fetch(`${API_BASE_URL}/api/fileUpload/uploadFiles`, requestOptions)
  .then(response => response.json())
  .then(result => {
    console.log('upload res',result.data)
    if(result && result.success == true){ 
      const urlArray = result.data.map(item => item.url);
      setVideoArray(urlArray)
      // console.log(urlArray)
      alert(result.message)
      setLoading(false)
    }
    setLoading(false)
  })
  .catch(error => {
    console.log('error', error)
    setLoading(false)
  });
  }
  const filesUpload2 = async (ImgArray)=>{
    setLoading(true)
    const res = await getUserProfileInfo()
    setLoading(true)
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${res.accessToken}`);
    const formdata = new FormData();

    ImgArray.forEach((image, index) => {
      formdata.append('files', {
        uri: image.uri,
        type: image.type,
        name: image.fileName,
      });
    });

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: formdata,
  redirect: 'follow'
};
// console.log(formdata) 
fetch(`${API_BASE_URL}/api/fileUpload/uploadFiles`, requestOptions)
  .then(response => response.json())
  .then(result => {
    // console.log('upload res',result.data)
    if(result && result.success == true){ 
      const urlArray = result.data.map(item => item.url);
      setAudioArray(urlArray)
      // console.log(urlArray)
      alert(result.message)
      setLoading(false)
    }
    setLoading(false)
  })
  .catch(error => {
    console.log('error', error)
    setLoading(false)
  });
  }

  console.log('audio res',audioArray)
  console.log('video res',videoArray)
  console.log('image res',imgArray)

 const onSubmit = async ()=>{
  const res= await getUserProfileInfo()
  console.log(res.accessToken)

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${res.accessToken}`);

  var raw = JSON.stringify({
    "emoji": `${item.name}`,
    "date":new Date(),
    "title": `${title}`,
    "description": `${description}`,
    "keywords": hashtags,
    "audioUrls": audioArray,
    "videoUrls": videoArray,
    "imageUrls": imgArray
  });
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  console.log(raw)
  fetch(`${API_BASE_URL}/api/private/moment`, requestOptions)
.then(response => response.json())
.then(result => {
// console.log('moment res',result)
if(result && result.success == true){
  console.log(result.data)
  Alert.alert(' ', result.message, [
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    {text: 'OK', onPress: () =>  navigation.goBack()},
  ]);

  setLoading(false)
}
setLoading(false)
})
.catch(error => {
alert(result.message)
console.log('error', error)
setLoading(false)
});
}


 


  return (
    <SafeAreaView style={{backgroundColor:item.color,flex:1}}>
      <Loader loading={loading}></Loader>
        <ScrollView>
       <View style={{marginTop:Metrics.rfv(10),margin:10,flex:1}}>
    
       <View>
        <Ionicons
            onPress={() => {
               navigation.goBack()
            }}
            style={{
              marginLeft:10,
            }}
            name={'arrow-back'}
            size={40}
            color={'white'}
          />
        </View>
      {/* <View style={{ alignSelf: 'flex-end',}}>
         <Entypo
           name="cross"
           size={30}
           color='black'
           onPress={()=>{navigation.goBack()}}
            />
      </View> */}

      <View style={{alignSelf: 'center',marginTop:Metrics.rfv(10),}}>
        <Text style={{fontSize:Metrics.rfv(30),color:'black',alignSelf: 'center',fontWeight:'bold'}}>{item.name}</Text>
      <Image
          style={{
             width:120,height:120,margin:10,borderRadius:10,marginTop:Metrics.rfv(30),
            }}
           source={item.image}
         />
      </View>
       <Text style={{color:'black',alignSelf: 'center',marginTop:Metrics.rfv(10),fontWeight:'bold'}}>Tell dec about your day</Text>
       <View style={{alignSelf:'center',width:'90%'}}>
        <TextInput
         value={title}
         placeholder={'Title'}
         placeholderTextColor={'black'}
         style={{padding:10,backgroundColor:'white',borderRadius:5,margin:10,fontWeight:'bold'}}
         onChangeText={text => {
            setTitle( text);
          }}
        />
        <TextInput
         value={description}
         placeholder={'Description'}
         placeholderTextColor={'black'}
         style={{padding:10,backgroundColor:'white',borderRadius:5,margin:10,height:100,fontWeight:'bold'}}
         multiline={true}
         onChangeText={text => {
            setDescription( text);
          }}
        />
        <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10}}>
           <TouchableOpacity style={{ borderRadius:20,padding:5,alignSelf:'center',backgroundColor:'white'}}
             onPress={()=>{recordingActive ? onStopRecord() :onStartRecord()}}>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            {recordingActive ? ( <FontAwesome
           name="microphone"
           size={20}
           color='red'
            />) :(
              <FontAwesome
           name="microphone"
           size={20}
           color='black'
           />
            )}
              <Text  style={{alignSelf:'center',color:'black'}}> Record</Text>
            </View>
          
           </TouchableOpacity>
           <TouchableOpacity style={{ borderRadius:20,padding:5,alignSelf:'center',backgroundColor:'white'}} onPress={()=>{launchNativeImageLibrary()}}>
           <View style={{flexDirection:'row',justifyContent:'space-between'}}>
           <Feather
           name="image"
           size={20}
           color='black'
            />
              <Text  style={{alignSelf:'center',color:'black'}}> Add Images</Text>
            </View>
           </TouchableOpacity>
           <TouchableOpacity style={{ borderRadius:20,padding:5,alignSelf:'center',backgroundColor:'white'}} onPress={()=>{launchNativeImageLibrary1()}}>
           <DateTimePickerModal
          date={selectedDate}
          isVisible={datePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
           <View style={{flexDirection:'row',justifyContent:'space-between'}}>
           <Ionicons
           name="videocam"
           size={20}
           color='black'
            />
              <Text  style={{alignSelf:'center',color:'black'}}> Add Video</Text>
            </View>
           </TouchableOpacity>
        </View>
        <View>
        {/* <Text> {fileUri != null ? fileUri : null}</Text>
            <Text> {fileUri1 != null ? fileUri1 : null}</Text>
           <Text>{audioPath != ''? audioPath : null}</Text> */}
        <Text style={{color:'black'}}>  {selectedDate && visible ? selectedDate.toLocaleDateString() : null}</Text>
        </View>
        {audioPath != '' ?( 
          <View>
           <View >
          {loadingAudio ? (
          <View style={{padding:5}}>
            <ActivityIndicator size="small" />
          </View>
        ) : currentPositionSec > 0 && !paused ? (
          <TouchableOpacity style={{alignSelf:'center'}} onPress={onPausePlay}>
              <FontAwesome
               name="pause"
               size={30}
               color='white'
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={{alignSelf:'center'}} onPress={onStartPlay}>
          <FontAwesome
           name="play"
           size={30}
           color='white'
        />
      </TouchableOpacity>
        )}
        <View style={styles.progressIndicatorContainer}>
          <View
            style={[
              styles.progressLine,
              {
                width: `${(currentPositionSec / currentDurationSec) * 100}%`,
              },
            ]}
          />
        </View>
          </View>
          <View style={styles.progressDetailsContainer}>
        <Text style={styles.progressDetailsText}>Progress: {playTime}</Text>
        <Text style={styles.progressDetailsText}>Duration: {duration}</Text>
      </View>
      </View>
      ):(null)}
        <TouchableOpacity style={{backgroundColor:'black',width:'40%',padding:10,
          alignSelf:'center',marginTop:20,borderRadius:15}}
           onPress={()=>{
            onSubmit()
            // navigation.navigate('Home')
            }}>
      <Text style={{alignSelf:'center',color:'white'}}>Submit</Text>
     </TouchableOpacity>
       </View>
      
    </View>
    </ScrollView>
    </SafeAreaView>
  
  )
}
const styles = StyleSheet.create({
 
  container: {
    padding: 5,
    width: 250,
  },
  audioPlayerContainer: {flexDirection: 'row', alignItems: 'center'},
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
    marginTop:10
  },
  progressLine: {
    borderWidth: 1,
    borderColor: 'black',
  },
});

export default Category