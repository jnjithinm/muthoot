import {Platform, PixelRatio, Dimensions} from 'react-native';
const {width} = Dimensions.get('window');
const scale = width / 320;

const useFontNormalise = (size: number) => {
  const newSize = size * scale;
  if (Platform.OS === 'android') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  }
};
export default useFontNormalise;
