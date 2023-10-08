import {FONTS, FONT_SIZE} from '../Constants/fonts';
import Metrics from '../Constants/Metrics';

export const textPresets = {
  HEADING_B_48: {
    fontFamily: FONTS.primaryBoldFont,
    fontSize: FONT_SIZE.extra_large, // 48
    fontWeight: 'bold',
    lineHeight: Metrics.rfv(57),
    letterSpacing: Metrics.rfv(0.270833),
  },

  HEADING_B_14: {
    fontFamily: FONTS.primaryBoldFont,
    fontSize: FONT_SIZE.small_medium, // 48
    fontWeight: 'bold',
    // lineHeight: Metrics.rfv(30),
    letterSpacing: Metrics.rfv(0.270833),
  },

  HEADING_B_16: {
    fontFamily: FONTS.primaryBoldFont,
    fontSize: FONT_SIZE.medium, // 48
    fontWeight: 'bold',
    lineHeight: Metrics.rfv(40),
    letterSpacing: Metrics.rfv(0.270833),
  },

  HEADING_1M_24: {
    fontFamily: FONTS.primaryMediumFont,
    fontSize: FONT_SIZE.large, // 24
    fontWeight: '500',
    lineHeight: Metrics.rfv(40),
    letterSpacing: Metrics.rfv(0.3),
  },

  HEADING_1R_24: {
    fontFamily: FONTS.primaryFont,
    fontSize: FONT_SIZE.large, // 24
    fontWeight: '400',
    lineHeight: Metrics.rfv(40),
    letterSpacing: Metrics.rfv(0.3),
  },

  HEADING_2M_20: {
    fontFamily: FONTS.primaryMediumFont,
    fontSize: FONT_SIZE.regular, // 20
    fontWeight: '500',
    lineHeight: Metrics.rfv(36),
    letterSpacing: Metrics.rfv(0.270833),
  },

  HEADING_2R_20: {
    fontFamily: FONTS.primaryFont,
    fontSize: FONT_SIZE.regular, // 20
    fontWeight: '400',
    lineHeight: Metrics.rfv(28),
    letterSpacing: Metrics.rfv(0.270833),
  },

  HEADING_3M_18: {
    fontFamily: FONTS.primaryMediumFont,
    fontSize: FONT_SIZE.medium_extra, // 18
    fontWeight: '500',
    lineHeight: Metrics.rfv(25),
  },

  HEADING_3R_18: {
    fontFamily: FONTS.primaryFont,
    fontSize: FONT_SIZE.medium_extra, // 18
    fontWeight: '400',
    lineHeight: Metrics.rfv(21),
  },

  LINK_R_18: {
    fontFamily: FONTS.primaryFont,
    fontSize: FONT_SIZE.medium_extra, // 18
    fontWeight: '400',
    lineHeight: Metrics.rfv(21),
    textDecorationLine: 'underline',
  },

  PARAGRAPH_1M_16: {
    fontFamily: FONTS.primaryMediumFont,
    fontSize: FONT_SIZE.medium, // 16
    fontWeight: '500',
    lineHeight: Metrics.rfv(22),
    letterSpacing: Metrics.rfv(0.4),
  },

  PARAGRAPH_1R_16: {
    fontFamily: FONTS.primaryFont,
    fontSize: FONT_SIZE.medium, // 16
    fontWeight: '400',
    lineHeight: Metrics.rfv(24),
    letterSpacing: Metrics.rfv(0.4),
  },

  PARAGRAPH_2M_14: {
    fontFamily: FONTS.primaryMediumFont,
    fontSize: FONT_SIZE.small_medium, // 14
    fontWeight: '500',
    lineHeight: Metrics.rfv(18),
    letterSpacing: Metrics.rfv(0.4),
  },

  PARAGRAPH_2R_14: {
    fontFamily: FONTS.primaryFont,
    fontSize: FONT_SIZE.small_medium, // 14
    fontWeight: '400',
    lineHeight: Metrics.rfv(18),
    letterSpacing: Metrics.rfv(0.1),
  },

  PARAGRAPH_2M_12: {
    fontFamily: FONTS.primaryMediumFont,
    fontSize: FONT_SIZE.small, // 12
    fontWeight: '500',
    lineHeight: Metrics.rfv(18),
    letterSpacing: Metrics.rfv(0.4),
  },

  PARAGRAPH_2R_12: {
    fontFamily: FONTS.primaryFont,
    fontSize: FONT_SIZE.small, // 12
    fontWeight: '400',
    lineHeight: Metrics.rfv(18),
    letterSpacing: Metrics.rfv(0.1),
  },

  PARAGRAPH_2L_12: {
    fontFamily: FONTS.primaryLightFont,
    fontSize: FONT_SIZE.small, // 12
    fontWeight: '300',
    lineHeight: Metrics.rfv(18),
    letterSpacing: Metrics.rfv(0.1),
  },

  PARAGRAPH_3R_10: {
    fontFamily: FONTS.primaryFont,
    fontSize: FONT_SIZE.small_tiny, // 10
    fontWeight: '400',
    lineHeight: Metrics.rfv(18),
    letterSpacing: Metrics.rfv(0.1),
  },

  PARAGRAPH_4R_6: {
    fontFamily: FONTS.primaryFont,
    fontSize: FONT_SIZE.very_tiny, // 6
    fontWeight: '400',
    lineHeight: Metrics.rfv(7),
    textTransform: 'uppercase',
  },
};
