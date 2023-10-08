// import { StyleSheet  } from "react-native";
import {FONTS, FONT_SIZE} from './fonts';
import Metrics from './Metrics';
import {COLORS} from './colors';

const SCREEN_CONTAINER = {
  flex: 1,
  backgroundColor: COLORS.white,
};

const SCREEN_SUB_CONTAINER = {
  flex: 1,
  marginHorizontal: Metrics.rfv(20),
};

const SCREEN_SUB_CONTAINER_WITHOUT_TOP = {
  flex: 1,
  marginHorizontal: Metrics.rfv(20),
};

const FLEX_LAYOUT = {
  flex: 1,
};

const VIEW_TOP_CONTAINER = {
  flex: 1,
};

const VIEW_ABSOLUTE_LINE = {
  position: 'absolute',
  bottom: 0,
  width: '100%',
  height: 1,
  backgroundColor: COLORS.gray,
};

const VIEW_LINE = {
  width: '100%',
  height: 1,
  backgroundColor: COLORS.gray,
};

const SHADOW_EFFECT = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 1.84,
  elevation: 5,
};
const CARD = {
  backgroundColor: COLORS.white,
  alignSelf: 'center',
  zIndex: 100,
  borderRadius: 10,
};


const DEFAULT_CARD_STYLE = {
  width: '88%',
  //justifyContent:'center',
  //marginLeft: wp('5%'),
  alignSelf: 'center',
  paddingVertical: Metrics.rfv(20),
  borderRadius: Metrics.rfv(20),
  marginTop: Metrics.rfv(20),
};

const DEFAULT_CARD_STYLE2 = {
  width: '80%',
  //justifyContent:'center',
  //marginLeft: wp('5%'),
 // alignSelf: 'center',
  paddingVertical: Metrics.rfv(20),
  borderRadius: Metrics.rfv(20),
  marginTop: Metrics.rfv(220),
};

const DEFAULT_CARD_STYLE3 = {
  width: '80%',
  //justifyContent:'center',
  //marginLeft: wp('5%'),
 // alignSelf: 'center',
  paddingVertical: Metrics.rfv(20),
  borderRadius: Metrics.rfv(5),
  marginTop: Metrics.rfv(220),
};

const DEFAULT_IMAGE_BACKGROUND = {
  flex: 1,
  justifyContent: 'center',
  resizeMode: 'cover',
};
const ERROR_CLOSE_ICON = {};

export const APPLICATION_STYLES = {
  CARD,
  SHADOW_EFFECT,
  FLEX_LAYOUT,
  DEFAULT_CARD_STYLE,
  DEFAULT_CARD_STYLE2,
  DEFAULT_CARD_STYLE3,

  DEFAULT_IMAGE_BACKGROUND,
};
