import React, { FC, useCallback, useEffect, useState, useRef } from 'react';
import { RouteProp, useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import WaveBackground from 'components/WaveBackground';
import { ErrorObject } from 'config/Types';
import { useApplicantDetails } from 'context/useApplicantDetails';
import { RootStackParamList } from 'navigation/HomeStack';
import WebView from 'react-native-webview';
import {ScrollView, StyleSheet, View, Dimensions} from 'react-native';
import LoanSummaryButton from 'components/LoanSummaryButton';
import Button from 'components/Button';


type ResetPasswordNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ResetPassword'
>;
type ResetPasswordRouteProp = RouteProp<RootStackParamList, 'ResetPassword'>;

interface ResetPasswordScreenProps {
  navigation: ResetPasswordNavigationProp;
  route: ResetPasswordRouteProp;
}



const ResetPassword: FC<ResetPasswordScreenProps> = ({ navigation, route }) => {
  const { applicantId } = useApplicantDetails();
  const webRedirectionUrl = route.params?.webRedirectionUrl;

  const {height} = Dimensions.get('screen');
  // const [webRedirectionUrl, setWebRedirectionUr] = useState<string>('');


  return (
    <WaveBackground loading={[]} title={''}>
     
     <WebView
          source={{ uri: 'https://securesign.muthootcap.com/' }}
          style={{flex: 1, width: '100%', height: height}}
          // onShouldStartLoadWithRequest={(event) => {
          //   console.log("onShouldStartLoadWithRequest", event);
          //   return true;
          // }}
          // onLoadStart={(event) => {
          //   console.log("onLoadStart", event.nativeEvent);
          // }}
        />
          {/* <Button
          text={ 'Next'}
          active
          marginVertical={10}
          marginTop={30}
          onPress={()=>{}}
        />
      <LoanSummaryButton/> */}
    </WaveBackground>
  );
};
export default ResetPassword;
