import React, { FC } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Divider } from 'react-native-paper';
import Icon from 'components/Icon';
import { useApplicantDetails } from 'context/useApplicantDetails';
import Button from 'components/Button';
import { GetCKYCStatusResponse } from 'api/ReactQuery/CKYC/types';
import { LoanSummaryNavigationProp } from 'screens/LoanSummary';
import { GetCriffResponse } from 'api/ReactQuery/BureauApi/types';
import styles from './styles';
import { ScreenNames } from 'config/Types';

export type qdeSectionsType = {
  screenName: string;
  navigation: ScreenNames;
  isActive: boolean | undefined;
};

interface SummaryCardType {
  section: qdeSectionsType[];
  CKYCData: GetCKYCStatusResponse;
  title: string;
  criffReportPath: string;
  navigation: LoanSummaryNavigationProp;
  docNumber: string;
  applicantType: string;
  applicantName: string;
  appId: string;
  continueDisable: boolean;
  bureauScore: string;
  isGuarantorMandatory: boolean;
  loanOffer?: boolean
  creditNextEnable?: boolean
  SactionNextEnable?: boolean
  empStatus?: boolean
  isSubmitToDisbursementFreeze?: boolean | null
  loanPopup?: boolean,
  rejectMessage?: string
}

const SummaryCard: FC<SummaryCardType> = ({
  section,
  title,
  CKYCData,
  navigation,
  criffReportPath,
  docNumber,
  applicantType,
  applicantName,
  appId,
  continueDisable,
  bureauScore,
  isGuarantorMandatory,
  loanOffer,
  creditNextEnable,
  SactionNextEnable,
  empStatus,
  isSubmitToDisbursementFreeze,
  loanPopup,
  rejectMessage
}) => {
  const { applicantId, isMainApplicant, guarantorId } = useApplicantDetails();

  const CriffResponse: GetCriffResponse = {
    applicantName,
    applicantId,
    criffReportPath,
    applicantType,
    docNumber,
    criffCreatedDate: '',
    bureauScore,
    bureauPull: true,
  };

  const handleNavigation = (screen: ScreenNames) => {
    console.log("cccccccccc", screen);

    if (screen === 'BureauSuccess') {
      navigation.navigate(screen, { GetCriffResponse: CriffResponse });
    } else if (
      screen === 'BREApproved' ||
      screen === 'ManualUnderwriting'
    ) {
      navigation.navigate(screen, {
        GetCriffResponse: CriffResponse,
        isGuarantorMandatory,
      });
    } else if (
      screen === 'LoanRejected'
    ) {
      navigation.navigate(screen, {
        GetCriffResponse: CriffResponse,
        isGuarantorMandatory,
        popup: loanPopup,
        message: rejectMessage
      });
    }
    else {
      // console.log("fffffff", screen);

      navigation.navigate(screen);
    }
    return;
  };

  let filteredSections = CKYCData?.isPanAvailable
    ? section.filter(item => item.screenName !== 'OVD Verification')
    : section.filter(item => item.screenName !== 'PAN Verification');
  // console.log("mjjjjjjjrrr==js", isSubmitToDisbursementFreeze, isSubmitToDisbursementFreeze == null, isSubmitToDisbursementFreeze != null );

  return (
    <View style={[styles.container]}>
      <View style={styles.cardContainer}>
        <Text style={styles.activeCardHeaderStyle}>{title}</Text>
        <View
          style={[
            styles.flexRowStyle,
            { justifyContent: 'space-between', marginTop: 15 },
          ]}>
          <Text style={styles.cifIDText}>{`App ID : ${isMainApplicant ? appId : guarantorId
            }`}</Text>
          <TouchableOpacity
            style={styles.flexRowStyle}
            onPress={() => {
              handleNavigation(
                CKYCData?.isPanAvailable
                  ? ScreenNames.PANVerification
                  : ScreenNames.OVDVerification,
              );
            }}>
            <Text style={styles.cifIDText}>{`Edit `}</Text>
            <Icon name="edit" />
          </TouchableOpacity>
        </View>
        <Divider style={{ marginVertical: 10 }} />
        {section
          .filter(item => item.screenName !== '')
          .map(item => (

            <View key={item.screenName}>
              {
              // !CKYCData?.isPanAvailable && item.screenName =='PAN Verification' ? null : 
              //   CKYCData?.isPanAvailable && item.screenName == 'OVD Verification' ? null : 
                (
                <>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      width: '100%',
                      alignItems: 'center',
                    }}
                    onPress={() => {

                      item.isActive ? handleNavigation(item.navigation) : null;
                    }}>
                    <Text style={styles.pendingTextLabels}>
                      {item.screenName}
                    </Text>
                    {item.isActive && <Icon name="completed" />}
                  </TouchableOpacity>
                </>
              )}
            </View>
          ))}
        <View
          style={{
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            width: '75%',
          }}>
          {!continueDisable && (
            <Button
              text={'Continue'}
              active={filteredSections.some(section => !section.isActive)}
              position
              marginTop={30}
              onPress={() => {
                const navigationArray = section.filter(item =>
                  !loanOffer ?
                    navigation.navigate('LoanOffer') :
                    // !isSubmitToDisbursementFreeze || 
                    (isSubmitToDisbursementFreeze == null ?
                      isSubmitToDisbursementFreeze != null :
                      !isSubmitToDisbursementFreeze) ?
                      navigation.navigate('DeferralDocuments') :
                      empStatus && !SactionNextEnable ?
                        navigation.navigate('EmploymentDetails') :
                        CKYCData?.isPanAvailable
                          ? item?.screenName !== 'OVD Verification'
                          : item.screenName !== 'PAN Verification',
                );
                var item;
                for (item of navigationArray) {
                  if (item.navigation == 'LoanRejected') {
                    navigation.navigate('LoanRejected')
                    break;
                  }
                  else if (!item.isActive) {
                    handleNavigation(item.navigation);
                    break;
                  }
                  else {
                    console.log("eeeeeeee", item);
                  }
                }
              }}
            />
          )}
        </View>
      </View>
    </View>
  );
};
export default SummaryCard;
