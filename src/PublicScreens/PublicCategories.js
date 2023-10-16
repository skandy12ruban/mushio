import { View, Text,SafeAreaView, TouchableOpacity,Image,ScrollView } from 'react-native'
import React,{useState} from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { PermissionsAndroid } from 'react-native';
import DocumentPicker, { types } from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob';
import { AppOkAlert } from '../utils/AlertHelper';
import Metrics from '../Constants/Metrics';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Video from 'react-native-video';



const PublicCategories = () => {
  const navigation=useNavigation()
  const [fileUri, setFileUri] = useState(null);
   const[type,setType]=useState('')
  
   const[imgArray,setImagArray]=useState([])

console.log("imgArray res",imgArray)

  const launchNativeImageLibrary = () => {
    let options = {
      mediaType: 'any',
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
        setImagArray(response.assets)
        setType(response.assets[0].type)
        setFileUri(response.assets[0].uri)
      }
    });

  }

 
  console.log('imgArray',imgArray)
  return (
    <SafeAreaView style={{alignSelf:'center',width:'100%',flex:1,}}>
      <View style={{flexDirection:'row'}}>
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
     <Text style={{color:'black', marginLeft:20,marginTop:10,fontSize:20,fontWeight:'bold'}}> Add Post</Text>
      </View>
      <View style={{borderWidth:0.5,marginTop:10}}/>
    <View style={{backgroundColor:'lightgrey',alignItems:'center',padding:10,}}>
    <ScrollView   horizontal style={{flexDirection:'row'}}>
       {/* {fileUri != null ?(*/}
    {imgArray.map((e)=>{
          console.log('ee',e)
          return(
            < View style={{}}>
       { e.type == 'image/jpeg'  ? (
        < View style={{margin:10,}}>
           <Image
                source={{uri:e.uri}}
                style={{width:200,height:200}}
               />
         </View>
               ):(
        < View style={{margin:10,}}>
              <Video  
                source={{ uri: e.uri}}
                style={{width:200,height:200}}
                // paused={true}
                />
        </View>
             )}
             </View>
             ) } )
         }
         </ScrollView>
         {/* <>
        { (type == 'video/mp4') ? (
                <Video  
                source={{ uri: fileUri}}
                style={{width:200,height:200}}
                // paused={true}
                />
             ):(
              <Video
              source={''}
              style={{width:200,height:200}}
             />
             )}
         
         </> */}
               
             {/* ):(  */}
        <View style={{marginTop:Metrics.rfv(50),}}>
    <TouchableOpacity onPress={()=>{launchNativeImageLibrary()}} style={{alignSelf:'center',}}>
      <Text style={{fontSize:20,alignSelf:'center',}}>Add </Text>
      <Text style={{alignSelf:'center',color:'#00B0FF',}}>Image (or) Video</Text>
      </TouchableOpacity>  
      </View>
      {/* )} */}
 
      
    </View>
    <TouchableOpacity onPress={()=>{navigation.navigate('NewPost',{type:type,fileUri:fileUri})}} 
    style={{backgroundColor:'black',padding:10,width:150,borderRadius:5,marginTop:Metrics.rfv(30),alignSelf:'center',}}>
      <Text style={{alignSelf:'center',color:'white'}}>Next</Text>
    </TouchableOpacity>
  </SafeAreaView>
  )
}

export default PublicCategories