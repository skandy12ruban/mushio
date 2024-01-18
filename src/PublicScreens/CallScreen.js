import React, { useState } from "react";
import {
  MeetingProvider,
  useMeeting,
  useParticipant,
  RTCView,
  MediaStream,
} from "@videosdk.live/react-native-sdk";
import { SafeAreaView, Text, TouchableOpacity, View, PermissionsAndroid } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useEffect } from "react";

function MeetingView() {
    return null
}
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

 return (
  <MeetingProvider
  config={{
    meetingId: "v1t7-n07b-bkcr",
    micEnabled: true,
    webcamEnabled: data.callType === 'audio' ? false : true,
    name: "Skandharuban's Org",
  }}
  token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiJjYTczY2I0My01MGYyLTRhODEtYmVkNC01MmMwODQxYTMzM2QiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTcwNTU5NDY4NywiZXhwIjoxNzA1NjgxMDg3fQ.9OwtTbfJCFKjpaa_oqfZ1Mg4uPFwo98p5hxXLXWdE0w"
>
  <MeetingView />
</MeetingProvider>
 )
};
export default CallScreen;