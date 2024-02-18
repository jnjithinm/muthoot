import Colors from 'config/Colors';
import {APP_FONTS} from 'config/Fonts';
import useFontNormalise from 'hooks/useFontNormalise';
import {StyleSheet, Platform} from 'react-native';

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: '4%',
    alignItems: 'center',

    shadowColor: '#000',
    elevation: Platform.OS == 'ios' ? 0 : 5,
    shadowOffset: {
      width: 0,
      height: 1,
    },

    paddingHorizontal: '6%',
    shadowOpacity: 2,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  Button: {
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '45%',
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  CloseText: {
    color: 'white',
    fontSize: useFontNormalise(13),
    fontFamily: APP_FONTS.Bold,
    fontWeight: '700',
  },
  messageText: {
    fontSize: useFontNormalise(13),
    fontFamily: APP_FONTS.Medium,
    color: 'black',
    marginVertical: 20,
    textAlign: 'center',
  },
  TitleText: {
    alignSelf: 'center',
    fontSize: useFontNormalise(19),
    fontFamily: APP_FONTS.Bold,
    fontWeight: '700',
    color: Colors.Black,
    textTransform: 'capitalize',
  },
  tc: {
    fontSize: useFontNormalise(12),
    fontFamily: APP_FONTS.Regular,
    color: 'black',
    textAlign: 'left',
  },
  text: {
    fontSize: useFontNormalise(12),
    fontFamily: APP_FONTS.Regular,
    color: 'black',
    // paddingLeft: 10,
    flexWrap: 'wrap',
    // textAlign: 'left',
  },
  agreeText:{
    fontSize: useFontNormalise(12),
    fontFamily: APP_FONTS.Regular,
    color: 'black',
    // paddingLeft:10
  }
});
export default styles;
