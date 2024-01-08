import { useRoute } from '@react-navigation/native';
import React,{useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { View, Text,Image,TouchableOpacity,FlatList,StyleSheet,ActivityIndicator } from 'react-native';
import Video from 'react-native-video';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import { SafeAreaView,useColorScheme } from 'react-native';

const audioRecorderPlayer = new AudioRecorderPlayer();

const MyMoment = () => {
  const route=useRoute()
  const {item}=route.params;
  
  const [recordTime, setRecordTime] = useState(0);
  const [paused, setPaused] = useState(false);
  const [currentPositionSec, setCurrentPositionSec] = useState(0);
 const [loadingAudio, setLoadingAudio] = useState(false);
  const [currentDurationSec, setCurrentDurationSec] = useState(recordTime);
  const [playTime, setPlayTime] = useState(0);
  const [duration, setDuration] = useState(recordTime);
  const theme = useColorScheme();

 const data=["http://res.cloudinary.com/mydatabase2413/image/upload/v1701524110/wcykrncliohmdlabeqiw.webp"]
 

 const onStartPlay = async (audioPath) => {
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

 const Item= ({item,index})=>{
    
    return(
      <View style={{margin:10,alignSelf:'center',}}>
          
        <Image
           key={index}
           source={{uri:item}}
           style={{width:110,height:200,alignSelf:'center',flex:1}}
          />
      </View>
    )
  }
  const Item1= ({item,index})=>{
    
    return(
      <View style={{margin:10,alignSelf:'center',}}>
         <Video
            source={{ uri:item }}
            //   videoWidth={3000}
            //  videoHeight={2000}
            //  thumbnail={{ uri: 'https://i.picsum.photos/id/866/1600/900.jpg' }}
            style={{width:350,height:200,alignSelf:'center',backgroundColor:theme === 'dark' ? 'white':'black'}}
         />
      </View>
    )
  }
  const Item2= ({item,index})=>{
    
    return(
      <View style={{margin:10,alignSelf:'center',marginTop:30}}>
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
               color={theme === 'dark' ? 'white':'black'}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={{alignSelf:'center'}} onPress={()=>{onStartPlay(item)}}>
          <FontAwesome
           name="play"
           size={30}
           color={theme === 'dark' ? 'white':'black'}
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
        <Text style={{paddingHorizontal: 5,
    color:theme === 'dark' ? 'white': 'black',}}>Progress: {playTime}</Text>
        <Text style={{paddingHorizontal: 5,
    color:theme === 'dark' ? 'white': 'black',}}>Duration: {duration}</Text>
      </View>
     
     
      </View>
    )
  }

  return (
    <SafeAreaView style={{backgroundColor:theme === 'dark' ? 'black':'white',flex:1}}>
    <View>
     {item && item.imageUrls.length > 0 ? (
       <FlatList
       data={item.imageUrls || []}
       renderItem={Item}
       keyExtractor={item => item}
      />
     ):(<Text style={{color:theme === 'dark' ? 'black':'white',alignSelf:'center'}}>No Data</Text>)} 
      {item && item.videoUrls.length > 0 ? (
       <FlatList
       data={item.videoUrls || []}
       renderItem={Item1}
       keyExtractor={item => item}
      />
     ):(null)} 
      {item && item.audioUrls.length > 0 ? (
       <FlatList
       data={item.audioUrls || []}
       renderItem={Item2}
       keyExtractor={item => item}
      />
     ):(null)} 
     
    </View>
    </SafeAreaView>
  );
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
    // flex: 1,
    backgroundColor: '#e2e2e2',
    marginTop:10
  },
  progressLine: {
    borderWidth: 1,
    borderColor: 'black',
  },
});
export default MyMoment;
