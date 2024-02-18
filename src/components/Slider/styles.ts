import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    sliderContainer: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      height: 50,
      borderRadius: 10,
    },
    sliderTrack: {
      height: 15,
  
      position: 'absolute',
  
      borderRadius: 10,
    },
    sliderTrackFilled: {
      height: 15,
      borderRadius: 10,
      position: 'absolute',
      right: 0,
    },
    sliderThumb: {
      width: 35,
      height: 35,
      borderRadius: 20,
      backgroundColor: '#0E64D1',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
    },
    sliderThumbInnerCircle: {
      width: 24,
      height: 24,
      borderRadius: 20,
      backgroundColor: 'white',
      position: 'absolute',
    },
  
    sliderValue: {
      marginLeft: 10,
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
  
export default styles;
  