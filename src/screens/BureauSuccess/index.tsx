import React, { FC, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { useCKYCData } from 'context/useCKYCData';
import WaveBackground from 'components/WaveBackground';
import Button from 'components/Button';
import Colors from 'config/Colors';
import { APP_FONTS, FONT_SIZE } from 'config/Fonts';
import useFontNormalise from 'hooks/useFontNormalise';
import { RootStackParamList } from 'navigation/HomeStack';
import { useApplicantDetails } from 'context/useApplicantDetails';
import DownloadFile from 'config/Functions/DownloadFile';
import { useGetBRE1Status, useGetBRE2Status } from 'api/ReactQuery/RuleEngineApi';
import LoanSummaryButton from 'components/LoanSummaryButton';
import { ConvertToPrefixedAadharNumber } from 'config/Functions/ConvertToPrefix';
import { usedViewStatus } from 'context/useViewStatus';
import { useGetSherlock } from 'api/ReactQuery/BureauApi';
import { GetSherlockRequest } from 'api/ReactQuery/BureauApi/types';

type BureauSuccessNavigationProp = StackNavigationProp<
  RootStackParamList,
  'BureauSuccess'
>;
type BureauSuccessRouteProp = RouteProp<RootStackParamList, 'BureauSuccess'>;

interface BureauSuccessScreenProps {
  navigation: BureauSuccessNavigationProp;
  route: BureauSuccessRouteProp;
}

const BureauSuccess: FC<BureauSuccessScreenProps> = ({ navigation, route }) => {
  const { CKYCData } = useCKYCData();
  const GetCriffResponse = route?.params?.GetCriffResponse;
  const [isViewOnly, setIsViewOnly] = useState<boolean>(false);
  const { useViewStatus } = usedViewStatus();
  const { applicantId, isMainApplicant, guarantorId, } = useApplicantDetails();


  const [
    GetBRE1Status,
    { data: GetBRE1StatusData, isLoading: GetBRE1StatusIsLoading },
  ] = useGetBRE1Status(
    isMainApplicant ? applicantId : guarantorId,
    isMainApplicant ? 'mainApplicant' : 'guarantor',
  );

  const GetSherlockRequest: GetSherlockRequest = {
    applicantId: isMainApplicant ? applicantId : guarantorId,
    applicantType: isMainApplicant ? 'mainApplicant' : 'guarantor',
  };

  const [
    GetSherlockResponse,
    { data: GetSherlockResponseData, isLoading: GetSherlockResponseIsLoading },
  ] = useGetSherlock(GetSherlockRequest);


  const [
    GetBRE2Status,
    { data: GetBRE2StatusData, isLoading: GetBRE2StatusIsLoading },
  ] = useGetBRE2Status(
    isMainApplicant ? applicantId : guarantorId,
    isMainApplicant ? 'mainApplicant' : 'guarantor',
  );


  type RenderLabelsValuesTypes = {
    label: string;
    value: string;
  };
  const RenderLabelsValues = ({ label, value }: RenderLabelsValuesTypes) => (
    <View
      style={{
        paddingVertical: 7,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 7,
      }}>
      <Text style={styles.leadLabel}>{label}</Text>
      <Text style={styles.labelText}>{value}</Text>
    </View>
  );

  useEffect(() => {
    if (GetBRE1StatusData && GetBRE1StatusData.isSherlockRun) {
      if (GetBRE1StatusData.bre1status === 'Bre1_Approved' || GetBRE1StatusData.bre1status === 'Bre1_Manual') {
        console.log("sssssssssherlock");
        GetSherlockResponse.mutateAsync();
      }
    }
  }, [GetBRE1StatusData])

  const handleProceed = () => {

    if (GetBRE1StatusData) {

      if (GetBRE1StatusData.bre1status === 'Bre1_Approved') {
        navigation.navigate('BREApproved', {
          GetCriffResponse,
          isGuarantorMandatory: GetBRE1StatusData.isGuarantorMandatory
        });
      } else if (GetBRE1StatusData.bre1status === 'Bre1_Rejected') {
        navigation.navigate('LoanRejected', {
          GetCriffResponse,
          isGuarantorMandatory: GetBRE1StatusData.isGuarantorMandatory,
          message: (GetBRE1StatusData?.message) ? GetBRE1StatusData?.message : '',
          popup: GetBRE1StatusData.popup ? true : false
        });
      } else if (GetBRE1StatusData.bre1status === 'Bre1_Manual') {
        navigation.navigate('ManualUnderwriting', {
          GetCriffResponse,
          isGuarantorMandatory: GetBRE1StatusData.isGuarantorMandatory

        });
      }
    }
    else {
      console.log("breeee elseeeee");

      if (isMainApplicant && useViewStatus?.mainApplicant) {
        if (useViewStatus?.mainApplicant[0].bre1Status === 'Bre1_Approved') {
          navigation.navigate('BREApproved', {
            GetCriffResponse,
            isGuarantorMandatory: useViewStatus?.mainApplicant[0].isGuarantorMandatory
          });
        } else if (useViewStatus?.mainApplicant[0].bre1Status === 'Bre1_Rejected') {
          navigation.navigate('LoanRejected', {
            GetCriffResponse,
            isGuarantorMandatory: useViewStatus?.mainApplicant[0].isGuarantorMandatory,
            message: '',
            // (GetBRE1StatusData?.message) ? GetBRE1StatusData?.message : '',
            popup: false
            // GetBRE1StatusData.popup ? true : false
          });
        } else if (useViewStatus?.mainApplicant[0].bre1Status === 'Bre1_Manual') {
          navigation.navigate('ManualUnderwriting', {
            GetCriffResponse,
            isGuarantorMandatory: useViewStatus?.mainApplicant[0].isGuarantorMandatory

          });
        }
      } else {
        if (useViewStatus?.guarantor) {
          if (useViewStatus?.guarantor[0].bre1Status === 'Bre1_Approved') {
            navigation.navigate('BREApproved', {
              GetCriffResponse,
              isGuarantorMandatory: useViewStatus?.guarantor[0].isGuarantorMandatory
            });
          } else if (useViewStatus?.guarantor[0].bre1Status === 'Bre1_Rejected') {
            navigation.navigate('LoanRejected', {
              GetCriffResponse,
              isGuarantorMandatory: useViewStatus?.guarantor[0].isGuarantorMandatory,
              message: '',
              // (GetBRE1StatusData?.message) ? GetBRE1StatusData?.message : '',
              popup: false
              // GetBRE1StatusData.popup ? true : false
            });
          } else if (useViewStatus?.guarantor[0].bre1Status === 'Bre1_Manual') {
            navigation.navigate('ManualUnderwriting', {
              GetCriffResponse,
              isGuarantorMandatory: useViewStatus?.guarantor[0].isGuarantorMandatory

            });
          }
        }
      }

    }
  };

  useEffect(() => {
    if (GetSherlockResponseData) {
      // console.log("GetSherlockResponseData", GetSherlockResponseData);

      if (
        GetSherlockResponseData.sherlockStatus === 'APPROVED' ||
        GetSherlockResponseData.sherlockStatus === 'REFER' ||
        GetSherlockResponseData?.sherlockStatus === 'IN_PROCESS'
      ) {
        GetBRE2Status.mutateAsync();
      }
      else if (GetSherlockResponseData?.sherlockStatus === 'REJECT') {
        navigation.navigate('LoanRejected');
      }

    }
    else if (GetSherlockResponseData) {
      GetBRE2Status.mutateAsync();
      // GetCriff.mutateAsync();

    }
    //if sherlock fails - temporary
  }, [GetSherlockResponseData]);

  useEffect(() => {
    if (useViewStatus) {
      console.log("vvvv",useViewStatus?.isFreeze);
      
      useViewStatus?.isFreeze ? null : 
        GetBRE1Status.mutateAsync();
      setIsViewOnly(useViewStatus?.isFreeze ? true : false);
    }
  }, []);


  return (
    <WaveBackground
      title="Bureau Success"
      backgroundColor={Colors.White}
      loading={[GetBRE1StatusIsLoading, GetBRE2StatusIsLoading, GetSherlockResponseIsLoading,]}>
      {/* <View style={{backgroundColor: Colors.White, height,padding:'10%',paddingVertical:'40%'}}> */}

      <View>
        <Text
          style={{
            alignSelf: 'center',
            fontFamily: APP_FONTS.Roboto_Medium,
            fontSize: useFontNormalise(25),
            marginTop: 10,
            color: Colors.BureauGreenDark,
          }}>
          Bureau Successfull !
        </Text>
        <View
          style={{
            backgroundColor: Colors.White,
            elevation: 4,
            paddingVertical: 5,
            paddingHorizontal: 10,
            marginVertical: 20,
            // alignItems: 'center',
            // alignSelf: 'center',
            marginHorizontal: 30,
            borderRadius: 20,
            shadowColor: 'rgba(0, 0, 0, 0.3)',
          }}>
          <RenderLabelsValues
            label="Applicant ID"
            value={GetCriffResponse?.applicantId || applicantId}
          />
          <RenderLabelsValues
            label="Applicant Name"
            value={GetCriffResponse?.applicantName || ''}
          />
          <RenderLabelsValues
            label={
              CKYCData?.isPanAvailable ? 'Applicant PAN' : 'Applicant Aadhar'
            }
            value={
              CKYCData?.isPanAvailable
                ? GetCriffResponse?.docNumber || ''
                : ConvertToPrefixedAadharNumber(
                  GetCriffResponse?.docNumber?.toString() || '',
                )
            }
          />
          <RenderLabelsValues
            label="Bureau Score"
            value={GetCriffResponse?.bureauScore || ''}
          />
          <RenderLabelsValues
            label="Applicant Type"
            value={
              GetCriffResponse?.applicantType == 'mainApplicant'
                ? 'Main-Applicant'
                : 'Guarantor' || ''
            }
          />
        </View>
        <Text style={styles.descriptive}>
          We're excited to share that your BUREAU verification process has been
          successfully completed. Download your report now to access your credit
          details. Tap 'Next' to discover your loan status as reported by the
          bureau!
        </Text>
        <View style={{ marginTop: '5%', width: '70%', alignSelf: 'center' }}>
          <Button
            text="Bureau Report"
            onPress={() =>
              navigation.navigate('BureauReport', { webRedirectionUrl: GetCriffResponse?.criffReportPath })
              // GetCriffResponse?.criffReportPath &&
              // DownloadFile(
              //   GetCriffResponse?.criffReportPath,
              //   String(applicantId + '_BureauReport'),
              // )
            }
            marginVertical={20}
            active
          />
        </View>
        <View style={{ marginVertical: '7%' }}>
          <Button
            text="Next"
            onPress={handleProceed}
            marginVertical={10}
            active
          />
          <LoanSummaryButton onPress={() => navigation.replace('LoanSummary')} />
        </View>
      </View>

      {/* </View> */}
    </WaveBackground>
  );
};

export default BureauSuccess;

const styles = StyleSheet.create({
  descriptive: {
    color: Colors.Black,
    fontFamily: APP_FONTS.Medium,
    fontSize: useFontNormalise(12),
    textAlign: 'center',
    paddingHorizontal: 12,
    marginVertical: 8
  },
  LoanRejectedContainer: {
    backgroundColor: 'rgba(233, 34, 21, 0.08)',
    padding: 10,
    borderRadius: 100,
  },
  leadLabel: {
    color: Colors.LabelGrey,
    fontFamily: APP_FONTS.Roboto_Regular,
    fontSize: useFontNormalise(12),
    width: '47%',
  },
  labelText: {
    color: Colors.Black,
    fontFamily: APP_FONTS.Roboto_SemiBold,
    fontWeight: '700',
    fontSize: FONT_SIZE.s,
    width: '47%',
  },
});
