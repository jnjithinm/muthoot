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
    SameAsText: {
      color: Colors.LabelGrey,
      fontSize: useFontNormalise(13) ,
      fontFamily: APP_FONTS.Medium,
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
      paddingVertical:10
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