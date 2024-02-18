import React, { FC, useEffect, useMemo, useState } from 'react';
import { View, Image, Text, Linking } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';
import StatusBar from 'components/StatusBar';
import { RootStackParamList } from 'navigation/HomeStack';
import { ScreenNavigationProp } from 'navigation/Types';
import { useAuthentication } from 'context/useAuthentication';
import { Card, Button } from 'react-native-paper';

import styles from './styles';
import { useVersionCheck } from 'api/ReactQuery/Auth';
import Colors from 'config/Colors';

type SplashNavigationProp = StackNavigationProp<RootStackParamList, 'Splash'>;
type SplashRouteProp = RouteProp<RootStackParamList, 'Splash'>;

interface SplashProps {
  navigation: SplashNavigationProp;
  route: SplashRouteProp;
}

const Splash: FC<SplashProps> = ({ route }) => {
  const navigation = useNavigation<ScreenNavigationProp>();
  const [deviceId, setDeviceId] = useState<string>('');
  const { ActivateLoggingIn } = useAuthentication();
  const [isUpdateAvailable, setIsUpdateAvailable] = useState<boolean>(false);




  interface DecodedToken {
    exp: number;
  }

  const getToken = async () => {
    const token: string = (await AsyncStorage.getItem('token')) || '';
    // console.log('token', token);

    const decoded: DecodedToken | string =
      token !== '' ? jwt_decode(token) : '';
    return decoded;
  };
  const appVersion = DeviceInfo.getVersion();
  console.log("appVersion", appVersion);

  const [VersionCheck, { data: VersionCheckData }] = useVersionCheck({
    supportativeVersion: String(appVersion),
  });

  const onPressUpdate = () => {
    Linking.openURL('https://drive.google.com/drive/folders/1NfdrmI5G7P-KXoWYhWXcOEXxAZDLAQ_9?usp=drive_link');
  }


  useEffect(() => {
    VersionCheck.mutateAsync();
  }, []);


  useEffect(()=>{    
    console.log("vvvvv",VersionCheckData);
    
    if( VersionCheckData?.appVersionflag == false){
      
      getToken().then(token => {
        setTimeout(() => {
          if (token == '') {
            navigation.replace('Login');
          } else if (
            typeof token !== 'string' &&
            new Date(token.exp * 1000) < new Date()
          ) {
            navigation.replace('Login');
          } else {
            
            ActivateLoggingIn();
          }
        }, 1500);
      });
    }

  },[VersionCheckData])


  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'white'} barStyle={false} />
      {VersionCheckData?.appVersionflag ?

        <Card style={styles.card}>
          <Image style={styles.img} source={require('../../assets/images/Logo.png')} />
          <Text style={styles.textCard}>An important update is available.</Text>
          <Text style={styles.textCard}>Please update your app to</Text>
          <Text style={styles.textCard}>continue using it.</Text>
          <Button
            contentStyle={styles.buttonContent}
            style={styles.button}
            labelStyle={styles.buttonLabel}
            mode="contained"
            uppercase
            // disabled={this.state.reqesting}
            // color={Colors.Primary}
            onPress={() => { onPressUpdate() }}
          >
            Update
          </Button>
        </Card>
        :
        < Image
          source={require('../../assets/images/Logo.png')}
          style={{ height: '50%', width: '50%' }}
          resizeMode="contain"
        />

      }
    </View>
  );
};
export default Splash;
