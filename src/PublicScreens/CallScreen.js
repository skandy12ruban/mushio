import React, { useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, View, PermissionsAndroid } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useEffect } from "react";

const CallScreen = () => {
  const router = useRoute();
 const data = router.params.data
 console.log(data)

 const checkPermissions = async () => {
  if (Platform.OS === 'android') {
    try {
      const grants = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,  
      ]);
    } catch (err) {
      console.warn(err);
      return;
    }
  }
}

useEffect(()=>{
  checkPermissions()
},[])

 return (<></>)
};
export default CallScreen;