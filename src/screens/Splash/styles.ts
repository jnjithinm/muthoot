import { StyleSheet } from "react-native";
import Colors from "config/Colors";
import { APP_FONTS, FONT_SIZE } from "config/Fonts";

const styles=StyleSheet.create({
container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
},
AppNameText:{
    color:Colors.White,
    fontFamily:APP_FONTS.Medium,
    fontSize:FONT_SIZE.xxl,
    fontWeight:'500'
},
AutoLoan:{
    color:Colors.White,
    fontFamily:APP_FONTS.ThinItalic,
    fontSize:FONT_SIZE.s,
    lineHeight:17,
    fontWeight:'300'
},
appVersion:{
    color:Colors.White,
    fontSize:12,
    lineHeight:17,


},
img: {
    width: 150,
    height: 100,
    margin: 10,
    alignSelf: 'center',
    marginBottom: 20
},
card: {
    height: 350,
    elevation: 3,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
    backgroundColor: Colors.White
},
textCard: {
    fontSize: 15,
    // fontFamily: APP_FONTS.NunitoRegular,
    textAlign: 'center'

},
button: {
    height: 45,
    borderRadius: 12,
    marginTop: 40,
    backgroundColor: Colors.Primary
},
buttonLabel: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center'
},
buttonContent: { height: 45 ,},

})
export default styles;