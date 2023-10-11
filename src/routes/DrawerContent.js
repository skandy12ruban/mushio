import { DrawerActions, useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { logout } from '../Redux/reducer/User';
import { saveUserProfileInfo } from '../utils/AsyncStorageHelper';
// import LinearGradient from 'react-native-linear-gradient';
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';
import Metrics from '../Constants/Metrics';


const DrawerContent = (props) => {

    const navigation = useNavigation();
    const dispatch = useDispatch()

    const onLogoutPress = async (props) => {
        await saveUserProfileInfo({})
        dispatch(logout());
        navigation.navigate('Login')
    };

    return (
        <View style={{ flex: 1, backgroundColor: 'white', }}>
               <DrawerContentScrollView {...props}>
               <DrawerItem
                    labelStyle={{ color: 'black', fontSize: Metrics.rfv(20) }}
                    // icon={() => (
                    //     <FontAwesome
                    //         name="user"
                    //         style={{ color: 'black', fontSize: Metrics.rfv(18) }}
                    //     />
                    // )}
                    label="Edit Profile"
                    onPress={() => { navigation.navigate('EditProfile'), navigation.dispatch(DrawerActions.closeDrawer()) }}

                />

            </DrawerContentScrollView>
        </View>
    )
}
export default DrawerContent;