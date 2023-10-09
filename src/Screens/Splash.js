import React, { useEffect } from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LOGIN,  MAIN_ROUTE, SIGNIN } from '../routes/RouteConst';
import { STANDARD_SCREEN_HEIGHT } from '../utils/AppConst';
import { RFValue } from 'react-native-responsive-fontsize';
import { getUserProfileInfo } from '../utils/AsyncStorageHelper';
import { isObject } from 'util';
import { isNullOrUndefined } from 'util';
import { BackgroundImage } from 'react-native-elements/dist/config';


const { width, height } = Dimensions.get('window');

const SplashPage = () => {
    const navigation = useNavigation()

    const navigationStep = async () => {
        const userObject = await getUserProfileInfo();
        console.log("userObject",userObject)
        setTimeout(() => {
                if (isObject(userObject)  && !isNullOrUndefined(userObject.userId)) {
                    navigation.navigate(MAIN_ROUTE)
                }
            else {
                // console.log('splash page ')
                navigation.navigate(LOGIN)
                // navigation.navigate(SIGNIN)
            }
        }, 3000);

    }

    useEffect(() => {
        navigationStep();
    }, [])

    return (
        <View style={{ }}>
          
             <BackgroundImage
                style={{
                    width:"100%",height:"100%",
                }}
                source={require('../assets/images/splashImg.jpg')}
            >
            </BackgroundImage>
                    
              
        
        </View>
    )
}

export default SplashPage;
