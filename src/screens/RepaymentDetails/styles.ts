import {StyleSheet} from 'react-native';

import Colors from 'config/Colors';
import {APP_FONTS, FONT_SIZE} from 'config/Fonts';
import useFontNormalise from 'hooks/useFontNormalise';

const styles = StyleSheet.create({
  UploadButton: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: Colors.White,
    color: Colors.Blue,
    borderColor: Colors.TextInputBorderColor,
    borderWidth: 1,
    borderRadius: 7,
    justifyContent: 'center',
  },
  UploadButtonText: {
    color: Colors.Blue,
    fontFamily: APP_FONTS.Roboto_Regular,
    fontSize: 12,
    textAlign: 'center',
    justifyContent: 'center',
  },
  UploadText: {
    color: Colors.Blue,
    fontSize: 12,
    fontFamily: APP_FONTS.Roboto_Regular,
  },
  eNachTypeText: {
    color: Colors.Black,
    fontFamily: APP_FONTS.Medium,
    fontSize: FONT_SIZE.s,
    marginVertical: 10,
  },
  RadioButton: {
    width: 16,
    height: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.Primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  RadioButtonSelected: {
    width: 8,
    height: 8,
    borderRadius: 6,
    backgroundColor: Colors.Primary,
  },
  labelText: {
    color: Colors.LabelGrey,
    fontFamily: APP_FONTS.Medium,
    fontSize: FONT_SIZE.s,
  },
  label: {
    color: Colors.TextInputColor,
    fontFamily: APP_FONTS.Roboto_Regular,
    fontSize: FONT_SIZE.s,
    fontWeight: '400',
  },
  title: {
    color: Colors.Black,
    fontFamily: APP_FONTS.Roboto_Regular,
    fontSize: FONT_SIZE.l,
    fontWeight: '400',
    marginBottom: 20
  },
  dobContainer: {
    margin: 15,
    marginBottom: 30
  },
  inputbox: {
    borderRadius: 10,
    borderColor: Colors.TextInputBorderColor,
    borderWidth: 1,
    color: Colors.Black,
    fontSize: 14,
    height: 50,
    width: '100%',
    top: 10,
    paddingLeft: 10,
    justifyContent: 'center',
  },
  inputBoxAadhar: {
    borderRadius: 10,
    borderColor: Colors.TextInputBorderColor,
    borderWidth: 1,
    paddingLeft: 10,
    marginTop: 10,
    color: Colors.Black,
    fontSize: useFontNormalise(14),
  },
  labelStyle: {
    color: Colors.TextInputColor,
    fontFamily: APP_FONTS.Medium,
    fontSize: FONT_SIZE.s,
  },
});

export default styles;
