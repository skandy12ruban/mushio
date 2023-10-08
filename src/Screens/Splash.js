import React, { useEffect } from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LOGIN,  MAIN_ROUTE, SIGNIN } from '../routes/RouteConst';
import { STANDARD_SCREEN_HEIGHT } from '../utils/AppConst';
import { RFValue } from 'react-native-responsive-fontsize';
import { getUserProfileInfo } from '../utils/AsyncStorageHelper';
import { isObject } from 'util';
import { isNullOrUndefined } from 'util';


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
                // navigation.navigate(LOGIN)
                navigation.navigate(SIGNIN)
            }
        }, 3000);

    }

    useEffect(() => {
        navigationStep();
    }, [])

    return (
        <View style={{
            margin:10
        }}>
            <View style={{
                    flexDirection: 'row', 
                    alignSelf: 'center',
                    marginTop: RFValue(250, STANDARD_SCREEN_HEIGHT),
                }}>
                    <Text style={{
                        color: 'green',
                        paddingVertical: 10,
                        fontSize: 50,
                        fontWeight: 'bold'
                    }}>
                        ᗰᑌᔕᕼIO
                    </Text>
                    
                </View>
            {/* <Image
                style={{
                    borderRadius: 120,
                    alignSelf: 'center'
                }}
                source={SplashImg}
            >
            </Image> */}
        </View>
    )
}

export default SplashPage;
