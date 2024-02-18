
import Colors from 'config/Colors';
import { APP_FONTS } from 'config/Fonts';
import useFontNormalise from 'hooks/useFontNormalise';
import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    label: {
      //color: Colors.DetailLabel,
      fontSize: useFontNormalise(14),
      fontFamily: APP_FONTS.Medium,
    },
    NotificationIcon: {
      //backgroundColor: Colors.AvatarContainer,
      height: useFontNormalise(40),
      width: useFontNormalise(40),
      borderRadius: useFontNormalise(40),
      alignItems: 'center',
      justifyContent: 'center',
    },
    MessageText: {
      color: Colors.Black,
      fontFamily: APP_FONTS.Medium,
      fontWeight: '700',
      fontSize: useFontNormalise(12),
    },
    DescitptionText: {
      color: Colors.Black,
      fontFamily: APP_FONTS.Medium,
      fontSize: useFontNormalise(11),
    },
    Button: {
     // backgroundColor: Colors.LoanAcceptButton,
      borderRadius: 5,
      flexDirection: 'row',
      paddingHorizontal: 20,
      paddingVertical: 15,
      alignItems: 'center',
      width:'100%'
    },
    ButtonText: {
     // color: Colors.LoanButtonText,
      fontSize: 15,
      left: 7,
    },
    RejectButton: {
     // color: Colors.ButtonRed,
      fontSize: 15,
      fontFamily: APP_FONTS.Regular,
      textAlign: 'center',
    },
    PreviewContainer: {
      width: '100%',
      borderColor: Colors.Blue,
      marginVertical: '5%',
      borderRadius: 20,
    },
    RadioButton: {
      width: 16,
      height: 16,
      borderRadius: 12,
      borderWidth: 1,
     // borderColor: Colors.RadioButtonColor,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 6,
    },
    RadioButtonSelected: {
      width: 8,
      height: 8,
      borderRadius: 6,
    //  backgroundColor: Colors.RadioButtonColor,
    },
  });
  
  export default styles;