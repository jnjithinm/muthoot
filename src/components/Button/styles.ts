import {StyleSheet, Dimensions} from 'react-native';
import Colors from 'config/Colors';
import useFontNormalise from 'hooks/useFontNormalise';
import {APP_FONTS} from 'config/Fonts';

const {height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  ButtonContainer: {
    height: (height * 5.5) / 100,
    width: '100%',
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  ButtonText: {
    color: Colors.White,
    fontFamily: APP_FONTS.Roboto_Medium,
    textAlign:'center',
    fontSize: useFontNormalise(16),
    alignItems:'center'
  },
});
export default styles;
