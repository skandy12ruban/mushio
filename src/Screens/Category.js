import { View, Text,SafeAreaView,FlatList,Image,ScrollView,TouchableOpacity,TextInput } from 'react-native'
import React,{useState} from 'react'
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

const Category = () => {
    const route =useRoute()
    const {item}=route.params;
    const navigation=useNavigation()
    const[title,setTitle]=useState('')
    const[description,setDescription]=useState('')
    const [selectedDate, setSelectedDate] = useState(new Date());
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [visible,setVisible]=useState(false)
  const [fileUri, setFileUri] = useState(null);
  const [fileUri1, setFileUri1] = useState(null);
   const[type,setType]=useState('')

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

  
  const launchNativeImageLibrary = () => {
    let options = {
      mediaType: 'photo',
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
        setFileUri(response.assets[0].uri)
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
        setFileUri(response.assets[0].uri)
      }
    });

  }
  return (
    <SafeAreaView style={{backgroundColor:item.color,flex:1}}>
        <ScrollView>
       <View style={{marginTop:Metrics.rfv(30),margin:10,flex:1}}>
    
      <View style={{ alignSelf: 'flex-end',}}>
         <Entypo
           name="cross"
           size={30}
           color='black'
            />
      </View>
      <View style={{alignSelf: 'center',marginTop:Metrics.rfv(30),}}>
        <Text style={{fontSize:Metrics.rfv(30),color:'black',alignSelf: 'center',fontWeight:'bold'}}>{item.name}</Text>
      <Image
          style={{
             width:120,height:120,margin:10,borderRadius:10,marginTop:Metrics.rfv(30),
            }}
           source={item.image}
         />
      </View>
       <Text style={{color:'black',alignSelf: 'center',marginTop:Metrics.rfv(10),}}>Tell mushio about your day</Text>
       <View style={{alignSelf:'center',width:'90%'}}>
        <TextInput
         value={title}
         placeholder={'Title'}
         style={{padding:10,backgroundColor:'white',borderRadius:5,margin:10,}}
         onChangeText={text => {
            setTitle( text);
          }}
        />
        <TextInput
         value={description}
         placeholder={'Description'}
         style={{padding:10,backgroundColor:'white',borderRadius:5,margin:10,height:100}}
         multiline={true}
         onChangeText={text => {
            setDescription( text);
          }}
        />
        <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10}}>
           <TouchableOpacity style={{ borderRadius:20,padding:5,alignSelf:'center',backgroundColor:'white'}}>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <FontAwesome
           name="microphone"
           size={20}
           color='black'
            />
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
        <Text> {fileUri != null ? fileUri : null}</Text>
        <Text> {fileUri1 != null ? fileUri1 : null}</Text>
        <Text style={{color:'black'}}>  {selectedDate && visible ? selectedDate.toLocaleDateString() : null}</Text>
        </View>
       
        <TouchableOpacity style={{backgroundColor:'black',width:'60%',padding:10,
          alignSelf:'center',marginTop:20,borderRadius:5}}
           onPress={()=>{navigation.navigate('Home')}}>
      <Text style={{alignSelf:'center',color:'white'}}>Submit</Text>
     </TouchableOpacity>
       </View>
      
    </View>
    </ScrollView>
    </SafeAreaView>
  
  )
}

export default Category