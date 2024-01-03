import { View, Text,SafeAreaView, TouchableOpacity,Image,ScrollView,useColorScheme } from 'react-native'
import React,{useState} from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { PermissionsAndroid } from 'react-native';
import DocumentPicker, { types } from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob';
import { AppOkAlert } from '../utils/AlertHelper';
import Metrics from '../Constants/Metrics';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { API_BASE_URL } from '../api/ApiClient';
import Loader from '../Components/Loader';
import { getUserProfileInfo } from '../utils/AsyncStorageHelper';
import Video from 'react-native-video';



const PublicCategories = () => {
  const navigation=useNavigation()
  const [fileUri, setFileUri] = useState(null);
   const[type,setType]=useState('')
  const[loading,setLoading]=useState(false)
   const[imgArray,setImagArray]=useState([])
   const theme = useColorScheme();
// console.log("imgArray res",imgArray)

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

  const filesUpload = async ()=>{
    setLoading(true)
    const res = await getUserProfileInfo()
    setLoading(true)
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${res.accessToken}`);
    const formdata = new FormData();

    imgArray.forEach((image, index) => {
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
    console.log(result.success)
    if(result && result.success == true){ 
      navigation.navigate('NewPost',{imgArray:result.data})
      setLoading(false)
    }
    setLoading(false)
  })
  .catch(error => {
    console.log('error', error)
    setLoading(false)
  });
  }
 
  // console.log('imgArray',imgArray)
  return (
    <SafeAreaView style={{alignSelf:'center',width:'100%',flex:1,backgroundColor:theme === 'dark' ? 'black':'white',}}>
      <Loader loading={loading}></Loader>
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
            color={theme === 'dark' ? 'white':'black'}
          />
     <Text style={{color:theme === 'dark' ? 'white':'black', marginLeft:20,marginTop:10,fontSize:20,fontWeight:'bold'}}> Add Post</Text>
      </View>
      <View style={{borderWidth:0.5,marginTop:10}}/>
    <View style={{backgroundColor:'lightgrey',alignItems:'center',padding:10,height:300}}>
    <ScrollView   horizontal style={{flexDirection:'row'}}>
       {/* {fileUri != null ?(*/}
    {imgArray.map((e)=>{
          // console.log('ee',e)
          return(
            < View style={{}}>
       { e.type == 'image/jpeg'  ? (
        < View style={{margin:10,}}>
           <Image
                source={{uri:e.uri}}
                style={{width:300,height:250}}
               />
         </View>
               ):(
        < View style={{margin:10,}}>
              <Video  
                source={{ uri: e.uri}}
                style={{width:250,height:150}}
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
    <TouchableOpacity onPress={()=>{
      launchNativeImageLibrary()
     
      }} style={{alignSelf:'center',}}>
      <Text style={{fontSize:20,alignSelf:'center',color:'#fefeff'}}>Add </Text>
      <Text style={{alignSelf:'center',color:'#00B0FF',}}>Image (or) Video</Text>
      </TouchableOpacity>  
      </View>
      {/* )} */}
 
      
    </View>
    <TouchableOpacity onPress={()=>{
      filesUpload()
      // navigation.navigate('NewPost',{imgArray:imgArray})
    }} 
    style={{backgroundColor:theme === 'dark' ? 'white':'black',padding:10,width:150,borderRadius:5,marginTop:Metrics.rfv(30),alignSelf:'center',}}>
      <Text style={{alignSelf:'center',color:theme === 'dark' ? 'black':'white'}}>Next</Text>
    </TouchableOpacity>
  </SafeAreaView>
  )
}

export default PublicCategories