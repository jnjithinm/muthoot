import useFontNormalise from 'hooks/useFontNormalise';
import {StyleSheet} from 'react-native';
import Colors from '../../config/Colors';
import {APP_FONTS, FONT_SIZE} from '../../config/Fonts';

const styles = StyleSheet.create({
  OTPText: {
    color: Colors.Black,
    fontFamily: APP_FONTS.Regular,
    fontSize: FONT_SIZE.s,
    marginVertical: '1%',
    alignSelf:'center',
    width:'80%',
    textAlign:'center'
  },
  BoldText:{
    color: Colors.Black,
    fontFamily: APP_FONTS.Regular,
    fontSize: FONT_SIZE.s,
    alignSelf:'center',
    fontWeight:'700'
  },
  Number: {
    fontFamily: APP_FONTS.Medium,
    fontSize: FONT_SIZE.s,
    color: Colors.Black,
    alignSelf: 'center',
  },
  TimerText:{
    fontFamily: APP_FONTS.Roboto_Black,
    fontSize: useFontNormalise(18),
    color: Colors.TimerGreen,
    marginVertical:5
  },
  ResendOTP:{
    fontFamily: APP_FONTS.SemiBold,
    fontSize: FONT_SIZE.s,
  }
});
export default styles;
