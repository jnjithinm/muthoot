import React, { FC, useState, useCallback, useEffect } from 'react';
import { View } from 'react-native';
import { RouteProp, useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import WaveBackground from 'components/WaveBackground';
import { useApplicantDetails } from 'context/useApplicantDetails';
import Icon from 'components/Icon';
import Button from 'components/Button';
import { RootStackParamList } from 'navigation/HomeStack';
import { selectedBaseUrl } from 'api/Axios';
import LoanSummaryButton from 'components/LoanSummaryButton';
import {
  useGetAgreementDetails,
  useeSignAgreement
} from 'api/ReactQuery/LoanAgreement';
import {
  eSignRequest,
} from 'api/ReactQuery/LoanAgreement/types';
import DownloadFile from 'config/Functions/DownloadFile';

type LoanAgreementNavigationProp = StackNavigationProp<
  RootStackParamList,
  'LoanAgreement'
>;
type LoanAgreementRouteProp = RouteProp<RootStackParamList, 'LoanAgreement'>;

interface LoanAgreementScreenProps {
  navigation: LoanAgreementNavigationProp;
  route: LoanAgreementRouteProp;
}

const LoanAgreement: FC<LoanAgreementScreenProps> = ({ navigation, route }) => {


  const [loanAgreementPath, setloanAgreementPath] = useState<string>('');
  const [isAgreementDone, setIsAgreementDone] = useState<boolean>(false);
  const { applicantId } = useApplicantDetails();

  // var applicantId = 'MU927063'

  const eSignRequest: eSignRequest =
  {
    appId: applicantId,
  };

  const [GetAgreementDetails, { data: GetAgreementDetailsData, isLoading: GetAgreementDetailsIsLoading }] =
    useGetAgreementDetails(`appId=${applicantId}`,);

  const [eSignAgreement, { data: eSignAgreementData, isLoading: eSignAgreementIsLoading }] =
    useeSignAgreement(eSignRequest);


  // useEffect(() => {
  //   if (eSignAgreementData) {
  //     console.log("eSignAgreementData", eSignAgreementData);

  //   }
  // }, [eSignAgreementData])


  useEffect(() => {
    if (GetAgreementDetailsData) {
      console.log("GetAgreementDetailsData",GetAgreementDetailsData, GetAgreementDetailsData?.filepath?.replace('/var/www/html', selectedBaseUrl?.Url));
      setloanAgreementPath(GetAgreementDetailsData?.filepath?.replace('/var/www/html', selectedBaseUrl?.Url))
      setIsAgreementDone(GetAgreementDetailsData?.filepath ? true : false)

    }
  }, [GetAgreementDetailsData])

  useFocusEffect(
    useCallback(() => {
      GetAgreementDetails.mutateAsync();
    }, []),
  );
console.log("mjjjjj",loanAgreementPath);

  return (
    <WaveBackground loading={[eSignAgreementIsLoading, GetAgreementDetailsIsLoading]} title="Loan Agreement">
      
      <Icon name="loan-agreement" />

      {isAgreementDone && (
        <View
          style={{
            marginTop: '5%',
            width: '70%',
            alignSelf: 'center',
            marginBottom: '10%',
          }}>
          <Button
            text="Loan Agreement"
            onPress={() => {
              loanAgreementPath &&
                DownloadFile(
                  loanAgreementPath,
                  applicantId + '_LoanAgreement',
                );
            }}
            marginVertical={20}
            active
          />
        </View>
      )}

      {!isAgreementDone && (
        <View style={{ marginTop: 50 }}>
          <Button
            text="Sign Agreement"
            active={!eSignAgreementData}
            onPress={() => { eSignAgreement.mutateAsync() }}
          />
        </View>
      )}

      {
       !isAgreementDone && eSignAgreementData &&
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
          {eSignAgreementData?.mainAppSignUrl && <Button
            text="Main Applicant"
            active
            halfSize
            onPress={() => {
              navigation.navigate("Agreement", { webRedirectionUrl: eSignAgreementData?.mainAppSignUrl })
            }}
          />}
          {eSignAgreementData?.guarantorSignUrl && <Button
            text="Guarantor"
            active
            halfSize
            onPress={() => {
              navigation.navigate("Agreement", { webRedirectionUrl: eSignAgreementData?.guarantorSignUrl })
            }}
          />}
        </View>}

      <View style={{ marginTop: 50, marginBottom: 10 }}>
        <Button
          text="Next"
          active={isAgreementDone}
          onPress={() => {
            navigation.navigate('PreDisbursalDocuments');
          }}
        />
      </View>

      <LoanSummaryButton onPress={() => navigation.replace('LoanSummary')} />
    </WaveBackground>
  );
};

export default LoanAgreement;
