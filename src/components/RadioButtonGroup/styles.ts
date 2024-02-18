
import {StyleSheet} from 'react-native';
import Colors from 'config/Colors';
import { APP_FONTS, FONT_SIZE } from 'config/Fonts';
import useFontNormalise from "hooks/useFontNormalise";

const styles = StyleSheet.create({

  container: {
   marginTop:15,
   alignItems:'flex-start',
   justifyContent:'center',
  //  backgroundColor: 'red'
  //  alignSelf:'center',
  //  textAlign:'center',

  },
  RadioButton:{
    width: 16,
    height: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.LabelGrey,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  RadioButtonSelected:{
    width: 8,
    height: 8,
    borderRadius: 8,
    backgroundColor: Colors.Primary,
  },
  labeltext:{
    color:Colors.LabelGrey,
    fontFamily:APP_FONTS.Medium,
    fontSize:useFontNormalise(14)
  },
  label:{
    fontFamily:APP_FONTS.Regular,
    fontSize:useFontNormalise(14),
    fontWeight:'400',
    bottom:3
  }
});
export default styles;