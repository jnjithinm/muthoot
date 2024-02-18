import {View, StyleSheet, Text,BackHandler} from 'react-native';
import LottieView from 'lottie-react-native';

import {APP_FONTS} from 'config/Fonts';
import Colors from 'config/Colors';
import useFontNormalise from 'hooks/useFontNormalise';
import { useEffect } from 'react';

interface LoadingProps {
  size?: number;
  isProcessingScreen?: boolean;
  timer?: number;
  isLoading:boolean
}

const Loading: React.FC<LoadingProps> = ({
  size = useFontNormalise(80),
  isProcessingScreen = false,
  timer,
  isLoading
}) => {

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      console.log("isLoading",isLoading);
      
      // Disable the back button when the loader is active
      if (isLoading) {
        console.log("preeee");
        return true; // Prevent default behavior (going back)
      }
      return false; // Allow default behavior (going back)
    });

    return () => {
      // Remove the event listener when the component is unmounted
      backHandler.remove();
    };
  }, [isProcessingScreen]);


  return (
    <View style={[styles.loadingContainer]}>
      <View
        style={[
          styles.loadingBackground,
          {
            backgroundColor: isProcessingScreen
              ? 'rgba(0, 0, 0, 0.5)'
              : 'rgba(0, 0, 0, 0.5)',
          },
        ]}
      />

      <View style={[styles.loading]}>
        {isProcessingScreen && (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              transform: [{translateY: -(size / 4)}],
            }}>
            <Text style={styles.timerText}>
              {timer !== 0 && String(timer).length === 1 ? `0${timer}` : timer}
            </Text>
          </View>
        )}
        <LottieView
          source={require('assets/json/Loader.json')}
          autoPlay
          loop
          style={{
            width: isProcessingScreen
              ? useFontNormalise(80)
              : useFontNormalise(180),
            height: isProcessingScreen
              ? useFontNormalise(80)
              : useFontNormalise(180),
          }}
        />

        {isProcessingScreen && (
          <View style={{alignItems: 'center', top: 20}}>
            <Text style={styles.ProcessingText}>{'Processing...'}</Text>
            <Text style={styles.ProcessingDetailText} numberOfLines={1}>
              {'Please wait, We are processing your loan application'}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};
export default Loading;
const styles = StyleSheet.create({
  loadingContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  loadingBackground: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  ProcessingDetailText: {
    fontSize: useFontNormalise(12),
    fontFamily: APP_FONTS.Regular,
    color: Colors.Black,
    marginTop: 10,
    textAlign: 'center',
  },
  ProcessingText: {
    fontSize: useFontNormalise(21),
    fontFamily: APP_FONTS.Bold,
    color: Colors.White,
    marginTop: 20,
  },
  timerText: {
    fontSize: useFontNormalise(24),
    fontFamily: APP_FONTS.Bold,
    fontWeight: '700',
    color: Colors.White,
  },
});
