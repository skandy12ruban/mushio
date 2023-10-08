
import React from 'react';
import { View, StyleSheet, ActivityIndicator, Modal, Text, Dimensions } from "react-native";
import { THEME_COLOR, STANDARD_SCREEN_HEIGHT, FONT_MEDIUM, NORMAL_FONT_SIZE } from '../utils/AppConst';
import { RFValue } from 'react-native-responsive-fontsize';

const { width, height } = Dimensions.get('window');

const Loader = props => {
  const {
    loading,
    info,
    ...attributes
  } = props;

  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={loading}
      onRequestClose={() => { console.log('close modal') }}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator
            size={props.size || "large"}
            color={props.color || THEME_COLOR}
            animating={loading} />
          {/* <LottieView
            resizeMode={'cover'}
            style={{
              width: width * 0.3,
              height: height * 0.1,
            }}
            source={require('../assets/animations/loading.json')}
            autoPlay
            loop
          /> */}
          {info && <Text style={{
            fontSize: RFValue(NORMAL_FONT_SIZE, STANDARD_SCREEN_HEIGHT),
            color: THEME_COLOR,
            fontFamily: FONT_MEDIUM
          }}>{info}</Text>}
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040'
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
});

export default Loader;