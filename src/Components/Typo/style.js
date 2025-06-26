import { StyleSheet } from 'react-native';
import { ColorPalatte } from '../../Themes';

export const FONT_SIZES = {
  h1: 32,
  h2: 28,
  h3: 24,
  h4: 20,
  h5: 18,
  h6: 16,
  p: 16,
  caption: 12,
};

const baseText = {
  color: ColorPalatte.primartTxt,
  fontFamily: 'Outfit-Regular',
  lineHeight: '150%',
};

export const styles = StyleSheet.create({
  h1: {
    ...baseText,
    fontSize: FONT_SIZES.h1,
    fontFamily: 'Outfit-Bold',
  },
  h2: {
    ...baseText,
    fontSize: FONT_SIZES.h2,
    fontFamily: 'Outfit-SemiBold',
  },
  h3: {
    ...baseText,
    fontSize: FONT_SIZES.h3,
    fontFamily: 'Outfit-SemiBold',
  },
  h4: {
    ...baseText,
    fontSize: FONT_SIZES.h4,
    fontFamily: 'Outfit-Medium',
  },
  h5: {
    ...baseText,
    fontSize: FONT_SIZES.h5,
    fontFamily: 'Outfit-Medium',
  },
  h6: {
    ...baseText,
    fontSize: FONT_SIZES.h6,
    
  },
  p: {
    ...baseText,
    fontSize: FONT_SIZES.p,
  },
  caption: {
    ...baseText,
    fontSize: FONT_SIZES.caption,
  },
  link: {
    ...baseText,
    fontSize: FONT_SIZES.p,
    textDecorationLine: 'underline',
    color: ColorPalatte.primaryClr,
  },
  disabled: {
    ...baseText,
    color: '#999',
    fontSize: FONT_SIZES.p,
  },
  label: {
    ...baseText,
    fontSize: FONT_SIZES.caption,
  },
});
