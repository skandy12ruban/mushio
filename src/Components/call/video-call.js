import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { FaVideo, FaMicrophone, FaPhone, FaVolumeMute } from 'react-icons/fa'; // Example icons from react-icons
import { RTCView, RTCPeerConnection, RTCSessionDescription, RTCIceCandidate, mediaDevices } from 'react-native-webrtc';

const VideoCallComponent = () => {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const peerConnection = useRef(null);

  useEffect(() => {
    const initializeStream = async () => {
      try {
        const stream = await mediaDevices.getUserMedia({
          audio: true,
          video: true,
        });
        setLocalStream(stream);
      } catch (error) {
        console.error('Error accessing media devices:', error);
      }
    };

    initializeStream();
  }, []);

  useEffect(() => {
    if (localStream) {
      // Initialize peer connection
      const config = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };
      peerConnection.current = new RTCPeerConnection(config);

      // Add local stream to peer connection
      localStream.getTracks().forEach((track) => {
        peerConnection.current.addTrack(track, localStream);
      });

      // Listen for remote stream
      peerConnection.current.ontrack = (event) => {
        if (event.streams && event.streams[0]) {
          setRemoteStream(event.streams[0]);
        }
      };
    }
  }, [localStream]);

  const toggleVideo = () => {
    if (localStream) {
      localStream.getVideoTracks().forEach((track) => {
        track.enabled = !isVideoMuted;
      });
      setIsVideoMuted(!isVideoMuted);
    }
  };

  const toggleAudio = () => {
    if (localStream) {
      localStream.getAudioTracks().forEach((track) => {
        track.enabled = !isAudioMuted;
      });
      setIsAudioMuted(!isAudioMuted);
    }
  };

  const endCall = () => {
    // Close peer connection, stop streams, etc.
    if (peerConnection.current) {
      peerConnection.current.close();
    }
    setLocalStream(null);
    setRemoteStream(null);
  };

  return (
    <View>
      {localStream && <RTCView streamURL={localStream.toURL()} style={{ width: 200, height: 200 }} />}
      {remoteStream && <RTCView streamURL={remoteStream.toURL()} style={{ width: 200, height: 200 }} />}
      <TouchableOpacity onPress={toggleVideo}>
        <FaVideo />
      </TouchableOpacity>
      <TouchableOpacity onPress={toggleAudio}>
        <FaMicrophone />
      </TouchableOpacity>
      <TouchableOpacity onPress={endCall}>
        <FaPhone />
      </TouchableOpacity>
    </View>
  );
};

export default VideoCallComponent;
