import Colors from 'config/Colors';
import {APP_FONTS, FONT_SIZE} from 'config/Fonts';
import useFontNormalise from 'hooks/useFontNormalise';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatarContainer: {
    height: 40,
    width: 40,
    borderRadius: 30,
    backgroundColor: Colors.LightGrey,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title:{
    color: Colors.Primary,
    fontSize: useFontNormalise( useFontNormalise(16) ),
    fontFamily: APP_FONTS.Roboto_Medium,
    textTransform: 'capitalize' ,
    marginVertical: 10,    
},
  phNostyle: {
    fontSize: FONT_SIZE.xs,
    fontFamily: APP_FONTS.Regular,
    color: Colors.Blue,
  },
  text: {
    fontSize: 17,
    color: 'black',
    padding: 10
  },

  btnText: {
    textAlign: 'left',
    color: 'black',
  },

  btnTextHolder: {
    borderBottomWidth: 2.5,
    elevation: 5,
    marginBottom: 15,
  },

  Btn: {
    padding: 10,
    backgroundColor: '#ffff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  circles: {
      width: '100%',
      marginBottom: 20,
      flexDirection: "row",
      justifyContent: 'space-evenly',
      // backgroundColor: 'white'
  },
  circleContainer: {
    marginTop: 20,
      // justifyContent: 'space-evenly',
      alignItems: 'center'
      // alignSelf: 'center'
      // backgroundColor: 'red'
  },
  leftCircle: {
      // marginHorizontal: 5
  },
  rightCircle: {
      // marginHorizontal: 5,
      // marginTop: 30
  },
  outerCircle: {
      width: "45%",
      height: 150,
      borderColor: Colors.LightGrey,
      backgroundColor:Colors.White,
      borderRadius: 20,
      elevation:3,
      alignItems: "center",
      justifyContent: "space-around",
      paddingVertical:25
  },
  circleTitleStyle: {
      fontSize: useFontNormalise(15),
      fontFamily: APP_FONTS.Medium,
      textAlign: "center",
      color: Colors.Black,
  },
  circleCountStyle: {
      fontSize: FONT_SIZE.xxl,
      fontFamily: APP_FONTS.SemiBold,
      color: Colors.Primary,
      textAlign: "center"
  },
  bikeImageStyle: { width: '100%', height: 200, position: 'absolute', bottom: -12 },
  nameStlye: {
      fontSize: FONT_SIZE.l,
      fontFamily: APP_FONTS.SemiBold,
      color:Colors.Primary,
      textAlign: 'center',
      marginTop: 25,
      marginBottom: 30
  },
  rightArrowIcon: {
      alignSelf: "center"
  },
  headerStlye: {
      fontSize: FONT_SIZE.xl,
      fontFamily: APP_FONTS.SemiBold,
      color: Colors.Primary,
      textAlign: 'center',
      fontWeight: 'bold'
  },
});
export default styles;
