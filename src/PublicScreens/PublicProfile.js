import { View, Text,SafeAreaView } from 'react-native'
import React,{useState} from 'react'
import {  Switch } from 'react-native-paper';
import { MAIN_ROUTE } from '../routes/RouteConst';
import { useNavigation } from '@react-navigation/native';
import { clearusertype } from '../Redux/reducer/userType';
import { useDispatch } from 'react-redux';
import { saveUserType } from '../utils/AsyncStorageHelper';


const PublicProfile = () => {
const navigation= useNavigation()
const dispatch=useDispatch()
const [isSwitchOn, setIsSwitchOn] = useState(false);

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
    <SafeAreaView>
          <View style={{marginTop:10}}>
          <Switch
              style={{
                marginRight: 10,
              }}
              color='#00B0FF'
              value={!isSwitchOn}
              onValueChange={onToggleSwitch}
            />
      </View>
      <Text>PublicProfile</Text>
    </SafeAreaView>
  )
}

export default PublicProfile