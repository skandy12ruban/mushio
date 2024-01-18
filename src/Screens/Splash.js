import React, { useEffect } from 'react';
import { View, Text, Image, Dimensions, useColorScheme } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LOGIN, MAIN_ROUTE, SIGNIN } from '../routes/RouteConst';
import { STANDARD_SCREEN_HEIGHT } from '../utils/AppConst';
import { RFValue } from 'react-native-responsive-fontsize';
import { getUserProfileInfo, getUserType } from '../utils/AsyncStorageHelper';
import { isObject, isNullOrUndefined } from '../utils/Commen';
import { BackgroundImage } from 'react-native-elements/dist/config';
import { PUBLIC_MAIN_ROUTE } from '../routes/PublicRouteConts';


const { width, height } = Dimensions.get('window');

const SplashPage = () => {
    const navigation = useNavigation()
    const theme = useColorScheme();

    const navigationStep = async () => {
        const userObject = await getUserProfileInfo();
        const usertype = await getUserType()



        setTimeout(() => {
            console.log(userObject)
            if (isObject(userObject) && userObject && userObject._id) {
                if (isObject(usertype) && (usertype.userType == 'Public')) {
                    navigation.navigate(PUBLIC_MAIN_ROUTE)
                } else {
                    navigation.navigate(MAIN_ROUTE)
                }
            }
            else {
                // 
                navigation.navigate(LOGIN)
                // navigation.navigate(SIGNIN)
            }
        }, 3000);

    }

    useEffect(() => {
        navigationStep();
    }, [])

    return (
        <View style={{ backgroundColor: 'black' }}>

            <BackgroundImage
                style={{
                    width: "100%", height: "101%",
                }}
                source={theme === 'dark' ? require('../assets/images/splashImage.png') : require('../assets/images/splashImage1.png')}
            >
            </BackgroundImage>



        </View>
    )
}

export default SplashPage;
