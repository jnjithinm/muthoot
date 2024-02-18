import React from 'react';
import RootNavigator from 'navigation';
import { QueryClientProvider } from 'react-query';
import { queryClient } from 'api/ReactQuery';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        {/* <CombinedProvider> */}
          <RootNavigator />
        {/* </CombinedProvider> */}
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
export default App;

// import React, { useState, useEffect } from 'react';
// import { StyleSheet, Text, View, TouchableOpacity, Alert, Image, TextInput } from 'react-native';

// const App: React.FC = () => {
//   const [textInputHolder, setTextInputHolder] = useState<string | number>(0);
//   const [captchaHolder, setCaptchaHolder] = useState<string | number>(0);
//   const [randomNumberOne, setRandomNumberOne] = useState<string | number>(0);

//   useEffect(() => {
//     generateCaptcha();
//   }, []);

//   // const generateCaptcha = () => {
//   //   const numberOne = Math.floor(Math.random() * 1000000) + 1;
//   //   const captchaCode = numberOne;
//   //   setRandomNumberOne(numberOne);
//   //   setCaptchaHolder(captchaCode);
//   // };

//   const generateCaptcha = () => {
//     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
//     let captchaCode = '';
  
//     for (let i = 0; i < 6; i++) {
//       const randomIndex = Math.floor(Math.random() * characters.length);
//       captchaCode += characters.charAt(randomIndex);
//     }
  
//     setRandomNumberOne(captchaCode);
//     setCaptchaHolder(captchaCode);
//   };
  
  
//   const validateCaptchaCode = () => {
//     if (parseInt(String(textInputHolder), 10) === randomNumberOne) {
//       // Captcha match
//       Alert.alert('Captcha Matched');
//     } else {
//       // Captcha not match
//       Alert.alert('Captcha NOT Matched');
//     }
//     // Calling captcha function, to generate captcha code
//     generateCaptcha();
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.captchaContainerView}>
//         <View style={styles.captchaChildContainer}>
//           <Image
//             style={{ width: 180, height: 60, resizeMode: 'contain' }}
//             source={{ uri: `https://dummyimage.com/150x40/0091ea/fafafa.png&text=${randomNumberOne}` }}
//           />
//           <TouchableOpacity onPress={generateCaptcha}>
//             {/* <Image
//               source={require('./path/to/refresh.png')}
//               style={{ width: 40, height: 35, resizeMode: 'contain', margin: 20 }}
//             /> */}
//           </TouchableOpacity>
//         </View>
//         <View style={styles.horizontalLine} />

//         <View style={styles.captchaChildContainer}>
//           <TextInput
//             placeholder="Enter Captcha"
//             onChangeText={(data) => setTextInputHolder(data)}
//             style={styles.textInputStyle}
//             keyboardType="numeric"
//             underlineColorAndroid="transparent"
//           />
//         </View>
//       </View>

//       <TouchableOpacity style={styles.button} onPress={validateCaptchaCode}>
//         <Text style={styles.text}>Submit</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   text: {
//     color: '#FFF',
//     fontSize: 24,
//     textAlign: 'center',
//     padding: 5,
//   },
//   captchaContainerView: {
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'center',
//     margin: 5,
//     borderColor: '#01579b',
//     width: '90%',
//     height: 200,
//     borderWidth: 1,
//     padding: 5,
//     backgroundColor: '#e1f5fe',
//   },
//   captchaChildContainer: {
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   textInputStyle: {
//     textAlign: 'center',
//     height: 40,
//     width: '80%',
//     borderWidth: 1,
//     borderColor: '#4CAF50',
//     borderRadius: 7,
//   },
//   button: {
//     width: '80%',
//     paddingTop: 2,
//     paddingBottom: 2,
//     backgroundColor: '#ec407a',
//     borderRadius: 3,
//     marginTop: 20,
//   },
//   horizontalLine: {
//     borderBottomColor: 'black',
//     borderBottomWidth: 1,
//     width: '80%',
//     marginBottom: 10,
//   },
// });

// export default App;
