import { useNavigation } from '@react-navigation/native';
import React, { memo, useState } from 'react';
import { View, Text, Dimensions, Pressable, TouchableOpacity, Alert, StyleSheet,FlatList } from 'react-native';
import { withGlobalize } from 'react-native-globalize';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  NavigationActions,
  DrawerActions,
  CommonActions,
} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/MaterialIcons';
import {Badge} from 'react-native-elements';
import {useDispatch} from 'react-redux';
// import LottieView from 'lottie-react-native';
import Metrics from '../Constants/Metrics';
import Popover from 'react-native-popover-view';
import {Image} from 'react-native';
import {logout} from '../Redux/reducer/User';
import {saveUserId, saveUserProfileInfo} from '../utils/AsyncStorageHelper';

const {width, height} = Dimensions.get('window');

const Header = withGlobalize(memo(props => {
  const { bellIcon, profile, backIcon, name } = props;
  const [showPopover, setShowPopover] = useState(false);
  
  const[item,setItem]=useState('')
  
    const navigation = useNavigation();
    const dispatch = useDispatch();

  const lang = [
    {
      value: 1,
      label: "Tel"
    },
    {
      value: 2,
      label: "Hin"
    }, {
      value: 3,
      label: "Eng"
    },
  ]
  const logoutUser = async () => {
    await saveUserId(undefined);
    await saveUserProfileInfo({});
    dispatch(logout());
  };
  
  return (
    <View style={{
      backgroundColor: '#00B0FF',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 15,
      alignItems: 'center',
      height: height * 0.07,
      width: width * 1,
    }}>
      {backIcon && (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons
            onPress={() => {
              props.back == false
                ? navigation.dispatch(DrawerActions.openDrawer())
                : navigation.goBack()
            }}
            style={{
              paddingRight: 5
            }}
            name={props.back == false ? 'menu' : 'arrow-back'}
            size={30}
            color={'white'}
          />
           <Text
            style={{
              color: 'white',
              fontFamily: 'Poppins-Medium',
              fontSize: 20,
              fontWeight: 'bold',marginLeft:10
            }}>
            {props.name1}
          </Text>
        </View>
      )}
      {name && (
        <View style={{ paddingLeft: 10, marginRight: 20 }}>
          <Text
            style={{
              color: 'white',
              fontFamily: 'Poppins-Medium',
              fontSize: 20,
              fontWeight: 'bold'
            }}>
            {props.name}
          </Text>
        </View>

      )}
     
        {/* <View style={{padding:5,width:50,backgroundColor:'#EFF1F3',flexDirection:'row',borderRadius:10,marginLeft:130 }}>
        <Text>{ '' || item}</Text>
            <Popover
            popoverStyle={{
              width: Metrics.rfp(20),
              height: Metrics.rfp(20),
              borderRadius: Metrics.rfv(10),
              alignItems: 'center',
              justifyContent: 'center',
            }}
            isVisible={showPopover}
            onRequestClose={() => setShowPopover(false)}
          >
        <FlatList
          data={lang}
          nestedScrollEnabled={true}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {setItem(item.label),setShowPopover(!showPopover)}}
              style={{padding:5,marginTop:10 }}>
              <Text style={{fontSize:15,fontWeight:'bold'}}>{item.label}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.value}
        />
        </Popover>
        <TouchableOpacity style={{}} onPress={{}}>
        <MaterialIcons
          name= { "keyboard-arrow-down" }
          color={'#333'}
          size={20}
          onPress={() => {
            setShowPopover(true);
          }}/>
      </TouchableOpacity>
        </View> */}
      
      {/* )} */}
      {bellIcon && (
        <View style={{ flexDirection: 'row', alignItems: 'center',  height: 30, width: 30, }}>
            <TouchableOpacity
              onPress={() => {
               
              }}>
            <FontAwesome
              name="bell" size={25} color={'white'} style={{ alignItems: 'center', alignSelf: 'center', }}
            />
          </TouchableOpacity>
          </View>
        )}
        {profile && (
          <View style={{}}>
            <TouchableOpacity
              onPress={() => {
                setShowPopover(true);
              }}>
             
            </TouchableOpacity>
            <Popover
              popoverStyle={{
                width: Metrics.rfp(30),
                height: Metrics.rfp(30),
                borderRadius: Metrics.rfv(10),
                alignItems: 'center',
                justifyContent: 'center',
              }}
              isVisible={showPopover}
              onRequestClose={() => setShowPopover(false)}
            >
              <TouchableOpacity
                style={{
                  margin: Metrics.rfv(10),
                }}
                onPress={() => {
                  navigation.navigate('Profile');
                  setShowPopover(false);
                }}>
                <Text
                  style={{
                    fontSize: Metrics.rfv(20),
                    fontWeight: 'bold',
                    color: '#3E48A0',
                  }}>
                  Profile
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  margin: Metrics.rfv(10),
                }}
                onPress={() => {
                  setShowPopover(false);
                }}>
                <Text
                  style={{
                    fontSize: Metrics.rfv(20),
                    fontWeight: 'bold',
                    color: '#3E48A0',
                  }}>
                  Change Password
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  margin: Metrics.rfv(10),
                }}
                onPress={() => {
                  Alert.alert('Logout', 'Are you want Logout ?', [
                    {text: 'Cancel', onPress: () => {}},
                    // { text: "Ok", onPress: () => { onLogoutPress() } }
                    {
                      text: 'Ok',
                      onPress: () => {
                        setShowPopover(false);
                        logoutUser();

                      }
                    }
                  ])
              }}>
              <Text style={{ fontSize: Metrics.rfv(20), fontWeight: 'bold', color: '#3E48A0' }}>
                Logout
              </Text>
            </TouchableOpacity>
          </Popover>
        </View>
      )}
    </View>
  );
}))
const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: 'gray',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    alignItems: 'center',
    height: height * 0.07,
    width: width * 1,
  },
  languageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropDownContainer: {
    padding: Metrics.rfv(10),
  },
  dropDownView: {
    borderRadius: Metrics.rfv(4),
  },
})
export default Header;
