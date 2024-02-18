
import {StyleSheet} from 'react-native';
import Colors from 'config/Colors';
const styles = StyleSheet.create({
  InputBox: {
    aspectRatio: 1,
    borderWidth: 1,
    borderRadius: 25,
    textAlign: 'center',
    backgroundColor:Colors.LightGrey,
    borderColor:Colors.Blue,
    color:Colors.Black,
    minHeight:50,
    fontSize:14,
    height:'auto',
    width:'auto',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical:'5%',
    width:'90%',
    alignSelf:'center'
  },
});
export default styles;
