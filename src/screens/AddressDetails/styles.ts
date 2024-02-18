import {StyleSheet} from 'react-native';
import Colors from 'config/Colors';
import {APP_FONTS, FONT_SIZE} from 'config/Fonts';
import useFontNormalise from 'hooks/useFontNormalise';

const styles = StyleSheet.create({
  container: {
    height: 'auto',
    // paddingHorizontal: 15,
   // backgroundColor: Colors.White,
    borderRadius: 8,
    // paddingVertical: 5,
    marginVertical: 10,
   // elevation: 3,
  },
  SameAsText: {
    color: Colors.LabelGrey,
    fontSize: useFontNormalise(13) ,
    fontFamily: APP_FONTS.Medium,
  },
  circle: {
    backgroundColor: Colors.White,
    height: useFontNormalise(13),
    width: useFontNormalise(13),
    borderRadius: 15,
  },
  Label: {
    color: Colors.SubHeadingGrey,
    fontFamily: APP_FONTS.Medium,
    fontSize:  useFontNormalise(18),
    marginTop: 15,
    marginBottom:7,
    paddingHorizontal: 10,
  },
  Divider: {
    height: 1,
    backgroundColor: Colors.LightGrey,
    marginTop: 15,
    marginBottom:7,
    paddingHorizontal: 10,
  },
  toggled: {
    height: useFontNormalise(20),
    width: useFontNormalise(37),
    borderRadius: 15,
    padding: 3,
    justifyContent: 'center',
    marginLeft:15,
    top:2
  },
  inputbox: {
    borderRadius: 15,
    borderColor: Colors.PlaceHolder,
    borderWidth: 1,
    color: Colors.Black,
    fontSize: useFontNormalise(14),
    width: '100%',
    paddingLeft: 10,
    justifyContent: 'center',
    paddingVertical: 10,
  },
  ButtonText: {
    color: Colors.Black,
    fontFamily: APP_FONTS.Regular,
    fontSize: useFontNormalise(12),
  },
  labelStyle: {
    color: Colors.LabelGrey,
    fontFamily: APP_FONTS.Medium,
    fontSize: FONT_SIZE.s,
  },
  labelText: {
    color: Colors.LabelGrey,
    fontFamily: APP_FONTS.Medium,
    fontSize: FONT_SIZE.s,
  },
});

export default styles;
