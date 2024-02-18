import React, { FC, useCallback, useEffect, useState, useRef } from 'react';
import { RouteProp, useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import WaveBackground from 'components/WaveBackground';
import { ErrorObject } from 'config/Types';
import { useApplicantDetails } from 'context/useApplicantDetails';
import { RootStackParamList } from 'navigation/HomeStack';
import WebView from 'react-native-webview';
import { ScrollView, StyleSheet, View, Dimensions } from 'react-native';
import Pdf from 'react-native-pdf';

type BureauReportNavigationProp = StackNavigationProp<
  RootStackParamList,
  'BureauReport'
>;
type BureauReportRouteProp = RouteProp<RootStackParamList, 'BureauReport'>;

interface BureauReportScreenProps {
  navigation: BureauReportNavigationProp;
  route: BureauReportRouteProp;
}



const BureauReport: FC<BureauReportScreenProps> = ({ navigation, route }) => {
  const { applicantId } = useApplicantDetails();
  const webRedirectionUrl = route.params?.webRedirectionUrl;

  const { height } = Dimensions.get('screen');

  console.log("ggggggggg", webRedirectionUrl);
  const source = { uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf', cache: true };


  return (
    <WaveBackground loading={[]}
      // title={'Bureau Report'}
    >

      <Pdf
        trustAllCerts={false}
        source={{
          uri: webRedirectionUrl,
          cache: true,
        }}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`Number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`Current page: ${page}`,numberOfPages);
        }}
        onError={error => {
          console.log(error);
        }}
        onPressLink={uri => {
          console.log(`Link pressed: ${uri}`);
        }}
        style={{ flex: 1}}

      />

      {/* <WebView
          source={{ uri: webRedirectionUrl }}
          style={{ width: '100%', height: 580 }}
          // onShouldStartLoadWithRequest={(event) => {
          //   console.log("onShouldStartLoadWithRequest", event);
          //   return true;
          // }}
          // onLoadStart={(event) => {
          //   console.log("onLoadStart", event.nativeEvent);
          // }}
        /> */}
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
export default BureauReport;
