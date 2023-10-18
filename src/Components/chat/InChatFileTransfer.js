import React, { useState } from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const InChatFileTransfer = ({filePath}) => {
  const [date,setDate]=useState(new Date())
  var fileType = '';
  var name = '';
  if (filePath !== undefined) {
    name = filePath.split('/').pop();
    fileType= filePath.split('.').pop();
  }
console.log(date)
  return (
    <View style={styles.container}>
      <View
        style={styles.frame}
      >
         <Image
            source={
              fileType === 'pdf'
                ? require('../../assets/images/chat_file.png')
                :(fileType === 'mp4') ? require('../../assets/images/video.png')
                : (fileType === 'mp3') ? require('../../assets/images/audio.jpg')
                 : require('../../assets/images/unknowFile.png')
            }
            style={{height: 30, width: 30}}
          />
        <View>
          <Text style={styles.text}>
            {name.replace('%20', '').replace(' ', '')}
          </Text>
          <Text style={styles.textType}>{fileType.toUpperCase()}</Text>
        </View>
        {/* <Text>{date}</Text> */}
      </View>
    </View>
  );
};
export default InChatFileTransfer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
    borderRadius: 15,
    padding: 5,
  },
  text: {
    color: 'black',
    marginTop: 10,
    fontSize: 10,
    lineHeight: 20,
    marginLeft: 5,
    marginRight: 5,
  },
  textType: {
    color: 'black',
    marginTop: 5,
    fontSize: 10,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  frame: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderRadius: 10,
    padding: 5,
    marginTop: -4,
  },
});