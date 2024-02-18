import Colors from "config/Colors";
import { APP_FONTS, FONT_SIZE } from "config/Fonts";
import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    height: 'auto',
    paddingHorizontal: 15,
    backgroundColor: Colors.White,
    borderRadius: 8,
    paddingVertical: 5,
    marginVertical: 10,
    elevation: 3,
  },
  verifiedTickStyle: {
    height: 20,
    width: 20,
    marginTop: 12,
  },
  childContainer: {
    position: 'relative',
  },
  flexRowStyle: {
    flexDirection: 'row',
  },
  cifIDText: {
    fontFamily: APP_FONTS.Roboto_Regular,
    color: Colors.Black,
    fontSize: FONT_SIZE.l,
    alignSelf: 'center',
  },
  pendingTextLabels: {
    fontFamily: APP_FONTS.Roboto_Regular,
    color: Colors.Black,
    fontSize: FONT_SIZE.l,
    marginTop: 10,
  },
  border: {
    position: 'absolute',
    left: -15,
    right: -15,
    bottom: 0,
    height: 0.5,
    backgroundColor: Colors.LabelGrey,
  },
  cardContainer: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 15,
    marginBottom: 20,
  },
  activeCardHeaderStyle: {
    color: Colors.Primary,
    fontFamily: APP_FONTS.Roboto_SemiBold,
    fontSize: FONT_SIZE.xl,
  },
});

export default styles;