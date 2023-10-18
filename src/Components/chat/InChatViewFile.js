import React from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Text,ActivityIndicator
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Video from 'react-native-video';
import Pdf from 'react-native-pdf';

function InChatViewFile({props, visible, onClose,loadingAudio,currentPositionSec,paused,onPausePlay,onStartPlay,currentDurationSec,playTime,duration}) {
  const {currentMessage} = props;
  // console.log("currentMessage",currentMessage)
  var fileType = '';
  if ((currentMessage.file && currentMessage.file.url) !== undefined) {
    fileType= currentMessage.file && currentMessage.file.url.split('.').pop();
  }

  return (
    <Modal
      visible={visible}
      onRequestClose={onClose}
      animationType="slide"
      style={{height: 600}}
    >
      <View style={{padding: 20}}>
        {fileType === 'pdf' ? (
           <Pdf source={{uri: currentMessage.file.url}} style={{height: '100%', width: '100%'}} />
           )
           :fileType === 'mp3' ? (
            <View style={{marginTop:100}}>
            {loadingAudio ? (
              <View style={{padding:5}}>
                <ActivityIndicator size="small" />
              </View>
            ) : currentPositionSec > 0 && !paused ? (
              <TouchableOpacity style={{alignSelf:'center'}} onPress={onPausePlay}>
                  <FontAwesome
                   name="pause"
                   size={30}
                   color='#00B0FF'
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={{alignSelf:'center'}} onPress={onStartPlay}>
              <FontAwesome
               name="play"
               size={30}
               color='#00B0FF'
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
            <View style={{flexDirection: 'row', justifyContent: 'space-between',}}>
        <Text style={{ paddingHorizontal: 5,  color: 'black',}}>Progress: {playTime}</Text>
        <Text style={{ paddingHorizontal: 5, color: 'black',}}>Duration: {duration}</Text>
      </View>
            </View>
            ): fileType === 'mp4' ? (
              < View style={{margin:10,alignSelf:'center',marginTop:100,}}>
              <Video  
                source={{ uri: currentMessage.file.url}}
                style={{width:200,height:200}}
                // paused={true}
                />
             </View>
              ) :(null)}
       
        <TouchableOpacity onPress={onClose} style={styles.buttonCancel}>
          <Text style={styles.textBtn}>X</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

export default InChatViewFile;

const styles = StyleSheet.create({
  buttonCancel: {
    width: 35,
    height: 35,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    borderColor: 'black',
    left: 13,
    top: 20,
  },
  textBtn: {
    fontSize: 18,
    fontWeight: 'bold',
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
