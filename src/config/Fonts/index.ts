import useFontNormalise from 'hooks/useFontNormalise';

export const APP_FONTS = {
  Black: 'Catamaran-Black',
  Bold: 'Catamaran-BlackItalic',
  ExtraBold: 'Catamaran-ExtraBold',
  ExtraLight: 'Catamaran-ExtraLight',
  Light: 'Catamaran-Light',
  Medium: 'Catamaran-Medium',
  Regular: 'Catamaran-Regular',
  SemiBold: 'Catamaran-Semibold',
  Thin: 'Catamaran-Thin',
  ThinItalic: 'Catamaran-ThinItalic',
  Roboto_Black: 'Roboto-Black',
  Roboto_Bold: 'Roboto-BlackItalic',
  Roboto_ExtraBold: 'Roboto-ExtraBold',
  Roboto_ExtraLight: 'Roboto-ExtraLight',
  Roboto_Light: 'Roboto-Light',
  Roboto_Medium: 'Roboto-Medium',
  Roboto_Regular: 'Roboto-Regular',
  Roboto_SemiBold: 'Roboto-Semibold',
  Roboto_Thin: 'Roboto-Thin',
  Roboto_ThinItalic: 'Roboto-ThinItalic',
};

export const FONT_SIZE = {
  xs: useFontNormalise(10),
  s: useFontNormalise(12),
  m: useFontNormalise(14),
  l: useFontNormalise(16),
  xl: useFontNormalise(18),
  xxl: useFontNormalise(20),
  xxxl: useFontNormalise(25),
};
const Fonts = {
  APP_FONTS,
  FONT_SIZE,
};
export default Fonts;
