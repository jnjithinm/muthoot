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
import {
  AARequest
} from 'api/ReactQuery/AccountAgregators/types';
import {
  GetAccountAggregator
} from 'api/ReactQuery/AccountAgregators';
import { useViewStatus } from 'api/ReactQuery/Lead';
import useShowFlashMessage from 'hooks/useShowFlashMessage';
import {GetProductDetails } from 'api/ReactQuery/Product';
import { getProductRequest } from 'api/ReactQuery/Product/types';

type OneMoneyNavigationProp = StackNavigationProp<
  RootStackParamList,
  'OneMoney'
>;
type OneMoneyRouteProp = RouteProp<RootStackParamList, 'OneMoney'>;

interface OneMoneyScreenProps {
  navigation: OneMoneyNavigationProp;
  route: OneMoneyRouteProp;
}



const OneMoney: FC<OneMoneyScreenProps> = ({ navigation, route }) => {
  const { applicantId, isMainApplicant, guarantorId } = useApplicantDetails();

  const { height } = Dimensions.get('screen');
  const [webRedirectionUrl, setWebRedirectionUr] = useState<string>('');


  const AARequest: AARequest = {
    appId: isMainApplicant ? applicantId : guarantorId,
    applicantType: isMainApplicant ? "mainApplicant" : 'guarantor',
  };

  const [ViewStatus, { data: ViewStatusData, isLoading: ViewStatusIsLoading }] =
  useViewStatus(applicantId);

  const getProductRequest: getProductRequest = {
    appId: isMainApplicant ? applicantId : guarantorId,
    applicantType: isMainApplicant ? "mainApplicant" : 'guarantor'
  };
  const [
    GetProductetails,
    { data: GetProductDetailsData, isLoading: GetProductDetailsIsLoading },
  ] = GetProductDetails(getProductRequest);


  const [
    GetAADetails,
    { data: GetAadharDetailsData, isLoading: GetAADetailsIsLoading },
  ] = GetAccountAggregator(AARequest);

  useEffect(() => {

    if (GetProductDetailsData) {

      GetProductDetailsData.aaStatus ? 
      navigation.navigate('DelarshipDetails') :
      useShowFlashMessage('warning', "Please complete verification process");

    }

  }, [GetProductDetailsData])


  useEffect(() => {

    if (GetAadharDetailsData) {

      setWebRedirectionUr(GetAadharDetailsData?.webRedirectionUrl || '')
      
    }

  }, [GetAadharDetailsData])

  useEffect(() => {
    GetAADetails.mutateAsync();


  }, []);
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate('ProductDetails');
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );
  return (
    <WaveBackground loading={[GetAADetailsIsLoading, ViewStatusIsLoading]} title={'Account Aggregator '}>

      <WebView
        source={{ uri: webRedirectionUrl }}
        style={{ flex: 1, width: '100%', height: height }}
      // onShouldStartLoadWithRequest={(event) => {
      //   console.log("onShouldStartLoadWithRequest", event);
      //   return true;
      // }}
      // onLoadStart={(event) => {
      //   console.log("onLoadStart", event.nativeEvent);
      // }}
      />
      <Button
        text={'Next'}
        active
        marginVertical={10}
        marginTop={30}

        onPress={() => {GetProductetails.mutateAsync();}}
      />
      <View style={{ marginBottom: 30 }}>
      <LoanSummaryButton onPress={() => navigation.replace('LoanSummary')} />
      </View>
    </WaveBackground>
  );
};
export default OneMoney;
