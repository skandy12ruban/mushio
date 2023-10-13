import { View, Text,SafeAreaView, TouchableOpacity,Image } from 'react-native'
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
import ImagePicker from 'react-native-image-crop-picker';

const PublicCategories = () => {
  const navigation=useNavigation()
  const [fileUri, setFileUri] = useState(null);
   const[type,setType]=useState('')
   const [imgRes,setImgRes]=useState()
   const[imgArray,setImageArray]=useState([])
 console.log('uri', fileUri)
console.log('type',type)
console.log("img res",imgRes)

  const launchNativeImageLibrary = () => {
    let options = {
      mediaType: 'any',
      // includeBase64: true,
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

  const  takePics = () => {
    ImagePicker.openPicker({
      mediaType: 'any',
      width: 200,
      height: 200, compressImageMaxHeight: 400,
      compressImageMaxWidth: 400, cropping: true, multiple: true,  
    })
      .then(response => {
        let tempArray = []
        console.log("responseimage-------" + response)
        setImgRes( response )
        console.log("responseimagearray" + imgRes)
        response.forEach((item) => {
          let image = {
            uri: item.path,
            // width: item.width,
            // height: item.height,
          }
          console.log("imagpath==========" + image)
          tempArray.push(image)
          setImageArray( tempArray )
          // console.log('savedimageuri====='+item.path);

          console.log("imagpath==========" + image)
        })

      })

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
    
       {/* {fileUri != null ?(*/}
         <> 
       {type == 'image/jpeg'  ? (
             <Image
                source={{uri:fileUri }}
                style={{width:200,height:200}}
               />
               ):(type == 'video/mp4') ? (
                <Video  
                source={{ uri: fileUri}}
                style={{width:200,height:200}}
                // paused={true}
                />
             ):(
              <Image
              source={''}
              style={{width:200,height:200}}
             />
             )}
         </>
               
             {/* ):(  */}
        <View style={{marginTop:Metrics.rfv(50),}}>
    <TouchableOpacity onPress={()=>{takePics()}} style={{alignSelf:'center',}}>
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