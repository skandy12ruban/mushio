import 'react-native-gesture-handler';
import { useEffect, useState } from 'react';
import { Image, Platform, SafeAreaView, StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';
import AuthRoute from './src/routes/AuthRoute';
import { FormattedProvider, GlobalizeProvider } from 'react-native-globalize';
// import VersionCheck from 'react-native-version-check';
import metadata from './src/locales';
import { getUserProfileInfo, getUserType } from './src/utils/AsyncStorageHelper';
import { setuser } from './src/Redux/reducer/User';
import { useDispatch } from 'react-redux';
import { setusertype } from './src/Redux/reducer/userType';
import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import { Button, Overlay, Icon } from 'react-native-elements';
import NotificationSounds, { playSampleSound, stopSampleSound } from  'react-native-notification-sounds';
const AppStatusBar = ({ backgroundColor, ...props }) => {
  if (Platform.OS == "ios") {
    return (
      <View style={[styles.statusBar, backgroundColor]}>
        <StatusBar backgroundColor={backgroundColor} {...props} />
      </View>
    );
  } else {
    return <StatusBar backgroundColor={backgroundColor}  {...props} />
  }

};

const Timer = ({ seconds, onComplete }) => {
  // initialize timeLeft with the seconds prop
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    // exit early when we reach 0
    if (!timeLeft) {
      onComplete && onComplete();
      return;
    };

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [timeLeft]);

  return (
    <>{timeLeft}</>
  );
};


const App = () => {
  const isDarkMode = useColorScheme();
  const dispatch = useDispatch()
  const [locale, setLocale] = useState();
  const [visible, setVisible] = useState(false);
  const [callNotificationData, setCallNotificationData] = useState({ android: { "imageUrl": "https://dummyimage.com/300" }, "body": "Audio call", "title": "Sehalo" });

  const toggleOverlay = () => {
    if(visible){
      stopSampleSound()
    }
    setVisible(!visible);

  };
  const setUpLocale = async () => {
    const locale = await metadata.locale();
    setLocale(locale)
  }

  const checkUser = async () => {
    let account = await getUserProfileInfo()
    let user = await getUserType()
    //  
    if (account) {
      // 
      dispatch(setuser(account))
      dispatch(setusertype(user))
    } else {
      // 
    }
  }

  const receivePushNotification = () => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
      // if(remoteMessage.data['notification_type'] === 'call')
      // setCallNotificationData(remoteMessage.data)
      setVisible(true);
      NotificationSounds.getNotifications('ringtone').then(soundsList  => {
        /*
        Play the notification sound.
        pass the complete sound object.
        This function can be used for playing the sample sound
        */
        playSampleSound(soundsList[1]);
        // if you want to stop any playing sound just call:
        // stopSampleSound();
      });
    });
    return unsubscribe;
  }

  // const checkVersion = async () => {
  //   const update = await VersionCheck.needUpdate();
  //   
  //   try {
  //     if (update.isNeeded) {
  //       Alert.alert(
  //         'Update Available',
  //         'A new version of the app is available. Please update to continue using the app.',
  //         [
  //           {
  //             text: 'Update Now',
  //             onPress: () => {
  //               // Open Play Store for the user to update the app
  //               Linking.openURL(update.storeUrl);
  //             },
  //           },
  //         ],
  //         { cancelable: false }
  //       );
  //     }
  //   }
  //   catch (error) {
  //     console.error('Error checking for updates:', error);
  //   }
  // }
  // useEffect(() => {
  //   checkVersion()
  // }, [])
  useEffect(() => {
    checkUser();
    setUpLocale();
    receivePushNotification();
  }, [])

  // useEffect(() => {
  //   const unsubscribe = NetInfo.addEventListener(state => {
  //     setIsConnected(state.isConnected);
  //   });

  //   // Clean up the subscription when the component unmounts
  //   return () => unsubscribe();
  // }, []);


  return (
    <>
      <SafeAreaView style={styles.topSafeArea} />
      <SafeAreaView style={[{ flex: 1 }, { ...styles.bottomSafeArea }]}>
        <AppStatusBar backgroundColor={isDarkMode === 'dark' ? "black" : 'black'} barStyle="light-content" />
        <FormattedProvider
          locale={locale}
          currency={metadata.currency()}
          messages={metadata.messages()}
          skeleton={metadata.dateformat}>
          <GlobalizeProvider locale={locale} currency={metadata.currency()}>
            {/* <View style={{flex:1}}>
                {!isConnected && <NoInternet visible={!isConnected} /> } */}
            <AuthRoute />
            <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={styles.callNotificationModal}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5 }}>
                <View style={{}}>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 18, fontWeight: '300' }}>
                      Incoming Call
                    </Text>
                  </View>
                  <Text style={{ fontSize: 18, fontWeight: 'bold', marginVertical: 5 }}>
                    {callNotificationData.title}
                  </Text>
                  <Text style={{ fontSize: 14, fontWeight: 300 }}>
                    Auto decline in <Timer seconds={30} onComplete={() => toggleOverlay()} />
                  </Text>
                </View>
                <View style={{}}>
                  <Image source={{ uri: callNotificationData.android.imageUrl }} height={75} width={75}
                    style={{ borderRadius: 20 }}
                  />
                </View>

              </View>
              <View style={{ flexBasis: 'auto', flexDirection: 'row', justifyContent: 'center', marginVertical: 10 }}>
                <Button type='solid' title={'Decline'} buttonStyle={{ borderRadius: 10, marginHorizontal: 5, width: 140, height: 60, backgroundColor: '#ed506c' }}
                  iconPosition='left'
                >
                </Button>
                <Button type='solid' title={'Accept'} buttonStyle={{ borderRadius: 10, marginHorizontal: 5, width: 140, height: 60, backgroundColor: '#1ae397' }}
                >
                </Button>
              </View>
            </Overlay>
            {/* </View> */}
          </GlobalizeProvider>
        </FormattedProvider>
      </SafeAreaView>
    </>
  );
};

const BAR_HEIGHT = StatusBar.currentHeight;
const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  topSafeArea: {
    flex: 0,
    backgroundColor: '#000000'
  },
  bottomSafeArea: {
    flex: 1,
    backgroundColor: 'white'
  },
  statusBar: {
    height: BAR_HEIGHT
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  callNotificationModal: {
    height: 200,
    width: '80%',
    zIndex: 1000,
    padding: 20,
    borderRadius: 20
  }
});

export default App;
