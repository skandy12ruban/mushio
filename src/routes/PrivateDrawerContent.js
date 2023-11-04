import { DrawerActions, useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity,Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { logout } from '../Redux/reducer/User';
import { saveUserProfileInfo, saveUserType } from '../utils/AsyncStorageHelper';
// import LinearGradient from 'react-native-linear-gradient';
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';
import Metrics from '../Constants/Metrics';


const PriavteDrawerContent = (props) => {

    const navigation = useNavigation();
    const dispatch = useDispatch()

    const onLogoutPress = async (props) => {
       await saveUserType({})
        await saveUserProfileInfo({})
        dispatch(logout());
        navigation.navigate('Login')
    };

    return (
        <View style={{ flex: 1, backgroundColor: 'white', }}>
               <DrawerContentScrollView {...props}>
                {/* <View>
                <Text style={{alignSelf:'center',fontWeight:'bold',color:'black',marginTop:20, fontSize: Metrics.rfv(25)}}>Settings</Text>
                </View> */}
              <View style={{marginTop:20}}>
               <DrawerItem
                    labelStyle={{ color: 'black', fontSize: Metrics.rfv(20), }}
                    // icon={() => (
                    //     <FontAwesome
                    //         name="user"
                    //         style={{ color: 'black', fontSize: Metrics.rfv(18) }}
                    //     />
                    // )}
                    label="Edit Profile"
                    onPress={() => { navigation.navigate('ProfileDetails'), navigation.dispatch(DrawerActions.closeDrawer()) }}

                />
                  <DrawerItem
                    labelStyle={{ color: 'black', fontSize: Metrics.rfv(20) }}
                    // icon={() => (
                    //     <FontAwesome
                    //         name="user"
                    //         style={{ color: 'black', fontSize: Metrics.rfv(18) }}
                    //     />
                    // )}
                    label="Help"
                    onPress={() => { navigation.navigate('Help'), navigation.dispatch(DrawerActions.closeDrawer()) }}

                />
                  <DrawerItem
                    labelStyle={{ color: 'black', fontSize: Metrics.rfv(20) }}
                    // icon={() => (
                    //     <FontAwesome
                    //         name="user"
                    //         style={{ color: 'black', fontSize: Metrics.rfv(18) }}
                    //     />
                    // )}
                    label="About"
                    onPress={() => { navigation.navigate('PrivateAbout'), navigation.dispatch(DrawerActions.closeDrawer()) }}

                />
         </View>
                 <View style={{alignSelf:'center',flex:1,marginTop: Metrics.rfv(300)}}>
                   <TouchableOpacity onPress={()=>{
                      Alert.alert("Logout", "Are you want Logout ?",
                      [
                        { text: "Cancel", onPress: () => { } },
                        { text: "Ok", onPress: () => onLogoutPress() }
                      ])
                   }}
                    style={{backgroundColor:'black',padding:10,borderRadius:5,width:150,}}>
                        <Text style={{alignSelf:'center',color:'white'}}>Logout</Text>
                   </TouchableOpacity>
                   </View>
            </DrawerContentScrollView>
        </View>
    )
}
export default PriavteDrawerContent;