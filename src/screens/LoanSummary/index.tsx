import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, BackHandler } from 'react-native';
import { RouteProp, useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useGetCKYCStatus } from 'api/ReactQuery/CKYC';
import { GetCKYCStatusRequest } from 'api/ReactQuery/CKYC/types';
import { ApplicantStatus } from 'api/ReactQuery/Lead/types';
import { useViewStatus } from 'api/ReactQuery/Lead';
import WaveBackground from 'components/WaveBackground';
import SummaryCard, { qdeSectionsType } from 'components/SummaryCard';
import { useApplicantDetails } from 'context/useApplicantDetails';
import { useCKYCData } from 'context/useCKYCData';
import { usedViewStatus } from 'context/useViewStatus';
import { RootStackParamList } from 'navigation/HomeStack';
import { useEmployeeDetails } from 'context/useEmployeeDetails';
import { applicantType } from 'api/ReactQuery';
import { ScreenNames, applicantTypeObect } from 'config/Types';
import { useGetSanctionLetterDetails } from 'api/ReactQuery/Lead';
import {
  useGetCreditToSubmitDetails
} from 'api/ReactQuery/Employment';
import styles from './styles';

export type LoanSummaryNavigationProp = StackNavigationProp<
  RootStackParamList,
  'LoanSummary'
>;
type LoanSummaryRouteProp = RouteProp<RootStackParamList, 'LoanSummary'>;

interface LoanSummaryScreenProps {
  navigation: LoanSummaryNavigationProp;
  route: LoanSummaryRouteProp;
}

const LoanSummary: FC<LoanSummaryScreenProps> = ({ navigation, route }) => {
  const { applicantId, guarantorId, SetMainApplicant, SaveGuarantorId, SetGuarantor } = useApplicantDetails();
  const { employeeId } = useEmployeeDetails();
  const { SaveCKYCData } = useCKYCData();
  const { SaveViewStatus } = usedViewStatus();
  const [applicantTypes, setApplicantTypes] = useState<applicantTypeObect[]>([
    { applicantId, applicantType: 'mainApplicant' },
  ]);
  const [mainApplicantStatus, setMainApplicantStatus] =
    useState<ApplicantStatus>();
  const [guarantorStatus, setGuarantorStatus,] = useState<ApplicantStatus>();
  const [applicantType, setApplicantType] =
    useState<applicantType>('mainApplicant');
  const [isNextEnable, setIsNextEnable] = useState<boolean>(true);
  const [isCreditNextEnable, setCreditIsNextEnable] = useState<boolean>(false);

  const GetCKYCStatusRequest: GetCKYCStatusRequest = {
    appId: applicantType === 'mainApplicant' ? applicantId : guarantorId,
    applicantType:
      applicantType === 'mainApplicant' ? 'mainApplicant' : 'guarantor',
    type: 'kycStatus',
    employeeId,
  };

  const [
    GetSanctionLetterDetails,
    {
      data: GetSanctionLetterDetailsData,
      isLoading: GetSanctionLetterDetailsIsLoading,
    },
  ] = useGetSanctionLetterDetails(applicantId);


  useEffect(() => {
    if (GetSanctionLetterDetailsData) {
      console.log("GetSanctionLetterDetailsData", GetSanctionLetterDetailsData);
      setIsNextEnable(GetSanctionLetterDetailsData.isNextEnable || false);
    }
  }, [GetSanctionLetterDetailsData])


  const [GetCKYCStatus, { data: GetCKYCStatusData, isLoading: GetCKYCStatusDataIsLoading }] =
    useGetCKYCStatus(GetCKYCStatusRequest);

  const [ViewStatus, { data: ViewStatusData, isLoading: ViewStatusIsLoading }] =
    useViewStatus(applicantId);

  const memoizedViewStatusData = useMemo(
    () => ViewStatusData,
    [ViewStatusData],
  );
  const memoizedCKYCStatusData = useMemo(
    () => GetCKYCStatusData,

    [GetCKYCStatusData],
  );
  useEffect(() => {
    console.log("GetCKYCStatusData", GetCKYCStatusData);

  }, [GetCKYCStatusData])
  useEffect(() => {
    if (guarantorId && applicantTypes.length < 2) {
      let finalApplicantTypes: applicantTypeObect[] = [
        ...applicantTypes,
        {
          applicantId: guarantorId,
          applicantType: 'guarantor',
        },
      ];
      setApplicantTypes(finalApplicantTypes);
    }
  }, [guarantorId]);

  useEffect(() => {
    if (memoizedViewStatusData) {
      console.log("memoizedViewStatusData", memoizedViewStatusData.mainApplicant);

      if (
        memoizedViewStatusData.isGuarantor &&
        memoizedViewStatusData.guarantor[0]
      ) {
        setGuarantorStatus(memoizedViewStatusData.guarantor[0] || {});

        !guarantorId &&
          SaveGuarantorId(
            memoizedViewStatusData.guarantor[0].guarantorId || '',
          );
      }

      SetGuarantor(memoizedViewStatusData?.isGuarantor)
      setMainApplicantStatus(memoizedViewStatusData?.mainApplicant[0] || {});
    }
  }, [memoizedViewStatusData]);

  const qdeSections: qdeSectionsType[] = [
    {
      screenName: 'PAN Verification',
      navigation: ScreenNames.PANVerification,
      isActive:
        applicantType === 'mainApplicant'
          ? mainApplicantStatus?.panStatus
          : guarantorStatus?.panStatus,
    },
    {
      screenName: 'OVD Verification',
      navigation: ScreenNames.OVDVerification,
      isActive:
        applicantType === 'mainApplicant'
          ? mainApplicantStatus?.ovdStatus
          : guarantorStatus?.ovdStatus,
    },
    {
      screenName: 'KYC Verification',
      navigation: ScreenNames.KYCVerification,
      isActive:
        applicantType === 'mainApplicant'
          ? mainApplicantStatus?.kycStatus
          : guarantorStatus?.kycStatus,
    },
    {
      screenName: 'Photo Verification',
      navigation: ScreenNames.PhotoVerification,
      isActive:
        applicantType === 'mainApplicant'
          ? mainApplicantStatus?.photoVerification
          : guarantorStatus?.photoVerification,
    },
    {
      screenName: 'Address Details',
      navigation: ScreenNames.AddressDetails,
      isActive:
        applicantType === 'mainApplicant'
          ? mainApplicantStatus?.currentPermentAddressStatus
          : guarantorStatus?.currentPermentAddressStatus,
    },
    {
      screenName: 'Bureau Success',
      navigation: ScreenNames.BureauSuccess,
      isActive:
        applicantType === 'mainApplicant'
          ? mainApplicantStatus?.breSuccess
          : guarantorStatus?.breSuccess,
    },
    {
      screenName:
        applicantType === 'mainApplicant' && mainApplicantStatus
          ? mainApplicantStatus.bre1Status === 'Bre1_Approved'
            ? 'BRE 1 Approved'
            : mainApplicantStatus.bre1Status === 'Bre1_Rejected'
              ? 'Loan Rejected'
              : 'Manual Underwriting'
          : guarantorStatus?.bre1Status === 'Bre1_Approved'
            ? 'BRE 1 Approved'
            : guarantorStatus?.bre1Status === 'Bre1_Rejected'
              ? 'Loan Rejected'
              : 'Manual Underwriting',

      navigation:
        applicantType === 'mainApplicant'
          ? mainApplicantStatus?.bre1Status === 'Bre1_Approved'
            ? ScreenNames.BREApproved
            : mainApplicantStatus?.bre1Status === 'Bre1_Rejected'
              ? ScreenNames.LoanRejected
              : ScreenNames.ManualUnderwriting
          : guarantorStatus?.bre1Status === 'Bre1_Approved'
            ? ScreenNames.BREApproved
            : guarantorStatus?.bre1Status === 'Bre1_Rejected'
              ? ScreenNames.LoanRejected
              : ScreenNames.ManualUnderwriting,
      isActive:
        applicantType === 'mainApplicant'
          ? mainApplicantStatus?.breSuccess
          : guarantorStatus?.breSuccess,
    },
    {
      screenName: 'Product Details',
      navigation: ScreenNames.ProductDetails,
      isActive:
        applicantType === 'mainApplicant'
          ? mainApplicantStatus?.productStatus
          : guarantorStatus?.productStatus,
    },
    {
      screenName: 'Delarship Details',
      navigation: ScreenNames.DelarshipDetails,
      isActive:
        applicantType === 'mainApplicant'
          ? mainApplicantStatus?.dealaerShipDetailStatus
          : guarantorStatus?.dealaerShipDetailStatus,
    },
    {
      screenName: 'Loan Details',
      navigation: ScreenNames.LoanDetails,
      isActive:
        applicantType === 'mainApplicant'
          ? mainApplicantStatus?.loanDetailsStatus
          : guarantorStatus?.loanDetailsStatus,
    },
    {
      screenName: 'Loan Offer',
      navigation: ScreenNames.LoanOffer,
      isActive:
        applicantType === 'mainApplicant'
          ? mainApplicantStatus?.loanOfferStatus
          : guarantorStatus?.loanOfferStatus,
    },

    {
      screenName: 'References',
      navigation: ScreenNames.References,
      isActive:
        applicantType === 'mainApplicant'
          ? mainApplicantStatus?.referenceStatus
          : guarantorStatus?.referenceStatus,
    },
    {
      screenName: 'Employment Details',
      navigation: ScreenNames.EmploymentDetails,
      isActive:
        applicantType === 'mainApplicant'
          ? mainApplicantStatus?.empStatus
          : guarantorStatus?.empStatus,
    },
    {
      screenName: 'Sanction Letter',
      navigation: ScreenNames.SanctionLetter,
      isActive:
        applicantType === 'mainApplicant'
          ? mainApplicantStatus?.sanctionLetterStatus
          : guarantorStatus?.sanctionLetterStatus,
    },
    {
      screenName: 'Bank Details',
      navigation: ScreenNames.BankDetails,
      isActive:
        applicantType === 'mainApplicant'
          ? mainApplicantStatus?.bankDetailsStatus
          : guarantorStatus?.bankDetailsStatus,
    },
    {
      screenName: 'Repayment Details',
      navigation: ScreenNames.RepaymentDetails,
      isActive:
        applicantType === 'mainApplicant'
          ? mainApplicantStatus?.repaymentStatus
          : guarantorStatus?.repaymentStatus,
    },
    {
      screenName: 'Loan Agreement',
      navigation: ScreenNames.LoanAgreement,
      isActive: 
        applicantType === 'mainApplicant'
          ? mainApplicantStatus?.isLoanAgreement
          : guarantorStatus?.isLoanAgreement,
    },
    {
      screenName: 'Pre Disbursal Documents',
      navigation: ScreenNames.PreDisbursalDocuments,
      isActive: 
        applicantType === 'mainApplicant'
          ? mainApplicantStatus?.preDisbursalDocument
          : guarantorStatus?.preDisbursalDocument,
    },
    {
      screenName: 'PSD',
      navigation: ScreenNames.PSDDocument,
      isActive: 
        applicantType === 'mainApplicant'
          ? mainApplicantStatus?.isPsd
          : guarantorStatus?.isPsd,
    },
    {
      screenName: 'Deferral Documents',
      navigation: ScreenNames.DeferralDocuments,
      isActive:
        applicantType === 'mainApplicant'
          ? mainApplicantStatus?.isDeferral
          : guarantorStatus?.isDeferral,
    },
    {
      screenName: 'Post Disbursal Documents',
      navigation: ScreenNames.PostDisbursalDocument,
      isActive: 
        applicantType === 'mainApplicant'
          ? mainApplicantStatus?.postDisbursalDocument
          : guarantorStatus?.postDisbursalDocument,
    },
  ];

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate('LeadManagement');
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  useEffect(() => {
    if (memoizedCKYCStatusData) {
      SaveCKYCData(memoizedCKYCStatusData);
    }
  }, [memoizedCKYCStatusData]);

  useEffect(() => {
    GetCKYCStatus.reset();
    GetCKYCStatus.mutateAsync();
    SetMainApplicant(applicantType === 'mainApplicant');
  }, [applicantType]);

  useFocusEffect(
    useCallback(() => {
      ViewStatus.reset();
      GetCKYCStatus.reset();
      GetCKYCStatus.mutateAsync();
      ViewStatus.mutateAsync();
      GetSanctionLetterDetails.mutateAsync();
    }, []),
  );

  useEffect(() => {
    if (memoizedViewStatusData) {
      console.log("memoizedViewStatusData", JSON.stringify(memoizedViewStatusData, null, 4));

      SaveViewStatus({
        isFreeze:
          (applicantType === 'guarantor'
            ? guarantorStatus?.isFreeze
            : mainApplicantStatus?.isFreeze),
        isSubmitToCreditFreeze: memoizedViewStatusData?.isSubmitToCreditFreeze,
        isSubmitToDisbursement: memoizedViewStatusData?.isSubmitToDisbursementFreeze,
        isDisbursementFreeze: memoizedViewStatusData?.isDisbursementFreeze,
        mainApplicant: memoizedViewStatusData?.mainApplicant,
        guarantor: memoizedViewStatusData?.guarantor
      });
    }
  }, [memoizedViewStatusData, applicantType, guarantorStatus, mainApplicantStatus]);

  const filteredGuarantorSections = [
    ...qdeSections.slice(
      0,
      qdeSections.findIndex(section => section.screenName === 'Loan Offer') + 1,
    ),
  ];


  return (
    <WaveBackground loading={[ViewStatusIsLoading, GetCKYCStatusDataIsLoading, GetSanctionLetterDetailsIsLoading]} title={'Loan Summary'}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={[styles.container]}>
          {applicantTypes.map((item: applicantTypeObect, index: number) => (
            <TouchableOpacity
              onPress={() => {
                setApplicantType(item.applicantType);
              }}
              key={index}
              style={[
                styles.cardContainer,
                [item.applicantType === applicantType && styles.selected],
              ]}
              disabled={item.applicantType === applicantType}>
              <Text style={styles.applicantText}>
                {item.applicantType === 'guarantor'
                  ? 'Guarantor'
                  : 'Main-Applicant'}
              </Text>
              <Text style={styles.appIdText}>{item?.applicantId}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <SummaryCard
        section={
          applicantType == 'guarantor' ?
            !guarantorStatus?.isGuarantorMandatory ?
              GetCKYCStatusData?.isPanAvailable ?
                filteredGuarantorSections.filter(el => el.screenName !== 'OVD Verification' && el.screenName !== 'Product Details')
                : filteredGuarantorSections.filter(el => el.screenName !== 'PAN Verification' && el.screenName !== 'Product Details')
              :
              GetCKYCStatusData?.isPanAvailable ?
                filteredGuarantorSections.filter(el =>(memoizedViewStatusData?.productType == 'NIP' || memoizedViewStatusData?.productType == 'Asset')? el.screenName !== 'OVD Verification' && el.screenName !== 'Loan Details' && el.screenName !== 'Delarship Details' : el.screenName !== 'OVD Verification')
                : filteredGuarantorSections.filter(el =>(memoizedViewStatusData?.productType == 'NIP' || memoizedViewStatusData?.productType == 'Asset')? el.screenName !== 'PAN Verification' && el.screenName !== 'Loan Details' && el.screenName !== 'Delarship Details' : el.screenName !== 'PAN Verification')

                // filteredGuarantorSections.filter(el => el.screenName !== 'PAN Verification')
            : GetCKYCStatusData?.isPanAvailable ?
              qdeSections.filter(el => el.screenName !== 'OVD Verification')
              : qdeSections.filter(el => el.screenName !== 'PAN Verification')
        }
        CKYCData={GetCKYCStatusData || null}
        title={'Quick Data Entry'}
        criffReportPath={
          (applicantType === 'guarantor'
            ? guarantorStatus?.criffReportPath
            : mainApplicantStatus?.criffReportPath) || ''
        }
        navigation={navigation}
        docNumber={
          (applicantType === 'guarantor'
            ? guarantorStatus?.documentNumber
            : mainApplicantStatus?.documentNumber) || ''
        }
        appId={applicantType === 'guarantor' ? guarantorId : applicantId || ''}
        applicantType={applicantType || ''}
        applicantName={
          (applicantType === 'guarantor'
            ? guarantorStatus?.applicantName
            : mainApplicantStatus?.applicantName) || ''
        }
        bureauScore={
          (applicantType === 'guarantor'
            ? guarantorStatus?.bureauScore
            : mainApplicantStatus?.bureauScore) || ''
        }
        isGuarantorMandatory={
          (applicantType === 'guarantor'
            ? guarantorStatus?.isGuarantorMandatory
            : mainApplicantStatus?.isGuarantorMandatory) || false
        }
        key={applicantType}
        continueDisable={
          (applicantType === 'guarantor' ?
            guarantorStatus?.productStatus :
            mainApplicantStatus?.postDisbursalDocument) || false
        }
        loanOffer={applicantType === 'mainApplicant' ? isNextEnable : true}
        creditNextEnable={memoizedViewStatusData?.isSubmitToCreditFreeze}
        empStatus={mainApplicantStatus?.empStatus}
        SactionNextEnable={memoizedViewStatusData?.isCreditApproved}
        isSubmitToDisbursementFreeze={
          memoizedViewStatusData?.isSubmitToDisbursementFreeze
        }
        loanPopup={(applicantType === 'guarantor'
          ? guarantorStatus?.loanPopup
          : mainApplicantStatus?.loanPopup) || false}
        rejectMessage={(applicantType === 'guarantor'
          ? guarantorStatus?.rejectMessage
          : mainApplicantStatus?.rejectMessage) || ''}
      />
    </WaveBackground>
  );
};
export default LoanSummary;