import { StyleSheet } from "react-native"
import Colors from "config/Colors"
import { APP_FONTS, FONT_SIZE } from "config/Fonts"
import useFontNormalise from "hooks/useFontNormalise";


const styles=StyleSheet.create({
    containerbox:{
        width:'100%',
        // marginVertical:12,
    },
    inputbox:{
        borderRadius:15,
        borderColor:Colors.LightGrey,
        borderWidth:1,
        marginTop:30,
        paddingLeft:10,
        color:Colors.Black,
        fontSize:useFontNormalise(14),
        paddingVertical:8,
        
    },
    errorMessagge:{
        marginTop:useFontNormalise(2),
        fontSize: useFontNormalise(11),
        color: Colors.Red,
        fontFamily: APP_FONTS.Medium,
    }
})
export default styles;