import React, { FC, useCallback, useEffect, useState, useRef } from 'react';
import { RouteProp, useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import WaveBackground from 'components/WaveBackground';
import { ErrorObject } from 'config/Types';
import { useApplicantDetails } from 'context/useApplicantDetails';
import { RootStackParamList } from 'navigation/HomeStack';
import WebView from 'react-native-webview';
import { BackHandler, Dimensions, View } from 'react-native';
import LoanSummaryButton from 'components/LoanSummaryButton';
import Button from 'components/Button';

type AgreementNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Agreement'
>;
type AgreementRouteProp = RouteProp<RootStackParamList, 'Agreement'>;

interface AgreementScreenProps {
  navigation: AgreementNavigationProp;
  route: AgreementRouteProp;
}



const Agreement: FC<AgreementScreenProps> = ({ navigation, route }) => {
  // const { applicantId, isMainApplicant, guarantorId } = useApplicantDetails();

  const { height } = Dimensions.get('screen');
  const [webRedirectionUrl, setWebRedirectionUr] = useState<string>('');

  

  useEffect(() => {
console.log("mfff",route.params?.webRedirectionUrl);


  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate('LoanAgreement');
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );
  return (
    <WaveBackground loading={[]} title={'Loan Agreement'}>

      <WebView
        source={{ uri: route.params?.webRedirectionUrl }}
        style={{ width: '100%', height: 580 }}
      // onShouldStartLoadWithRequest={(event) => {
      //   console.log("onShouldStartLoadWithRequest", event);
      //   return true;
      // }}
      // onLoadStart={(event) => {
      //   console.log("onLoadStart", event.nativeEvent);
      // }}
      />
      {/* <Button
        text={'Next'}
        active
        marginVertical={10}
        marginTop={30}

        onPress={() => {GetProductetails.mutateAsync();}}
      />
      <View style={{ marginBottom: 30 }}>
      <LoanSummaryButton onPress={() => navigation.replace('LoanSummary')} />
      </View> */}
    </WaveBackground>
  );
};
export default Agreement;
