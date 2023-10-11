import { View, Text,SafeAreaView,Image,TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import {  Switch } from 'react-native-paper';
import { MAIN_ROUTE } from '../routes/RouteConst';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { clearusertype } from '../Redux/reducer/userType';
import { useDispatch } from 'react-redux';
import { saveUserType } from '../utils/AsyncStorageHelper';
import Entypo from 'react-native-vector-icons/Entypo';
import Loader from '../Components/Loader';
import Metrics from '../Constants/Metrics';
import TopTabs from '../routes/TopTabs';

const PublicProfile = () => {
const navigation= useNavigation()
const dispatch=useDispatch()
const [isSwitchOn, setIsSwitchOn] = useState(false);
const[loading,setLoading]=useState(false)
const [profileimg,setProfileImg]=useState(require('../assets/images/image3.jpg'))

    const onToggleSwitch = () => {
        setIsSwitchOn(!isSwitchOn);
        if(!isSwitchOn){
             saveUserType({})
             dispatch(clearusertype());
          navigation.reset({
            index: 0,
            routes: [{name: MAIN_ROUTE}],
          });
        }
     }

  return (
    <SafeAreaView style={{alignSelf:'center',width:'100%',flex:1}}>
         <Loader loading={loading}></Loader>
         
         <View style={{flexDirection:'row',justifyContent:'space-between'}}>
          <View>
        <TouchableOpacity style={{backgroundColor:'white', width:Metrics.rfv(60),height:Metrics.rfv(60),borderRadius:Metrics.rfv(10),}}
        onPress={()=>{
        //   setProfileImg()
          }}>
          <Image
          style={{
             width:Metrics.rfv(60),height:Metrics.rfv(60),margin:Metrics.rfv(10),borderRadius:Metrics.rfv(10),
            }}
           source={require('../assets/images/image3.jpg')}
         />
         </TouchableOpacity>
      </View>
          <View style={{marginTop:Metrics.rfv(10)}}>
          <Switch
              style={{
                marginRight: Metrics.rfv(10),
              }}
              color='#00B0FF'
              value={!isSwitchOn}
              onValueChange={onToggleSwitch}
            />
               <Entypo
                  name="menu"
                   size={40}
                   style={{color:'black'}}
                //  onPress={()=>{ navigation.navigate('AppDrawer')}} 
                  onPress={()=>{ navigation.dispatch(DrawerActions.openDrawer());}}
                 /> 
      </View>
      </View>
      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
      <View style={{marginLeft:Metrics.rfv(20)}}>
      <TouchableOpacity style={{backgroundColor:'white', width:Metrics.rfv(50),height:Metrics.rfv(50),borderRadius:30,}}
        onPress={()=>{
        //   setProfileImg()
          }}>
          <Image
          style={{
             width:Metrics.rfv(40),height:Metrics.rfv(40),margin:5,borderRadius:30,
            }}
           source={require('../assets/images/profileImg.png')}
         />
         </TouchableOpacity>
         <Text style={{color:'black',fontWeight:'bold'}}>Satish</Text>
         <Text style={{color:'black'}}>@tagline</Text>
      </View>
        <View style={{marginTop:10}}>
            <Text style={{color:'black',fontWeight:'bold',fontSize:20}}>70</Text>
            <Text style={{color:'black',fontWeight:'bold'}}>Posts</Text>
        </View>
        <View style={{marginTop:10}}>
            <Text style={{color:'black',fontWeight:'bold',fontSize:20}}>70</Text>
            <Text style={{color:'black',fontWeight:'bold'}}>Friends</Text>
        </View>
        <View style={{marginRight:Metrics.rfv(20),marginTop:10}}>
            <Text style={{color:'black',fontWeight:'bold',fontSize:20}}>70</Text>
            <Text style={{color:'black',fontWeight:'bold'}}>Cards</Text>
        </View>
      </View>
    <View style={{marginTop:10,flex:1}}>
    <TopTabs/>
    </View>
    

    </SafeAreaView>
  )
}

export default PublicProfile