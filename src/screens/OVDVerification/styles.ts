import { StyleSheet } from "react-native";
import Colors from "config/Colors";
import { APP_FONTS, FONT_SIZE } from "config/Fonts";
import useFontNormalise from "hooks/useFontNormalise";


const styles = StyleSheet.create({
    dobContainer: {
      marginVertical: 15,
      width: '90%',
      alignSelf:'center'
    },
    inputbox: {
      borderRadius: 15,
      borderWidth: 1,
      fontSize: useFontNormalise(14),
      width: '100%',
      paddingLeft: 10,
      justifyContent: 'center',
      paddingVertical:10
    },
    ButtonText: {
      color: Colors.Black,
      fontFamily: APP_FONTS.Regular,
      fontSize: useFontNormalise(12),
      flexWrap: 'wrap'
      // marginHorizontal: 20
    },
    labelText: {
      color: Colors.LabelGrey,
      fontFamily: APP_FONTS.Medium,
      fontSize: FONT_SIZE.s,
    },
    labelStyle:{
      color:Colors.LabelGrey,
      fontFamily:APP_FONTS.Medium,
      fontSize:FONT_SIZE.s
  },

  });
  
  export default styles;