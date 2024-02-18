import React, {FC, useCallback, useEffect, useState} from 'react';
import {RouteProp, useFocusEffect} from '@react-navigation/native';
import {StyleSheet, View, Text} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import Modal from 'components/Modal';
import {useGetSanctionLetterDetails} from 'api/ReactQuery/Lead';
import WaveBackground from 'components/WaveBackground';
import Button from 'components/Button';
import {APP_FONTS} from 'config/Fonts';
import Colors from 'config/Colors';
import Icon from 'components/Icon';
import {useApplicantDetails} from 'context/useApplicantDetails';
import useFontNormalise from 'hooks/useFontNormalise';
import {ConvertToPrefixedAmountWithRupee} from 'config/Functions/ConvertToPrefix';
import LoanSummaryButton from 'components/LoanSummaryButton';
import {RootStackParamList} from 'navigation/HomeStack';

type LoanOfferNavigationProp = StackNavigationProp<
  RootStackParamList,
  'LoanOffer'
>;

type LoanOfferRouteProp = RouteProp<RootStackParamList, 'LoanOffer'>;

interface LoanOfferScreenProps {
  navigation: LoanOfferNavigationProp;
  route: LoanOfferRouteProp;
}

const LoanOffer: FC<LoanOfferScreenProps> = ({navigation, route}) => {
  const {applicantId, SetMainApplicant} = useApplicantDetails();

  const [loanAmount, setLoanAmount] = useState<string>();
  const [tenure, setTenure] = useState<string>('');
  const [RateofInterest, setRateofInterest] = useState<string>('');
  const [EMIAmount, setEMIAmount] = useState<string>();
  const [customerName, setCustomerName] = useState<string>('');
  const [popupVisible, setPopUPVisible] = useState<boolean>(false);
  const [popupMsg, setPopUPMsg] = useState<string>('');
  const [isGuarantorMandatory, setIsGuarantorMandatory] =
    useState<boolean>(false);
  const [isNextEnable, setIsNextEnable] = useState<boolean>(false);
  const [addGuarantorVisible, setAddGuarantorVisible] =
    useState<boolean>(false);

  const [
    GetSanctionLetterDetails,
    {
      data: GetSanctionLetterDetailsData,
      isLoading: GetSanctionLetterDetailsIsLoading,
    },
  ] = useGetSanctionLetterDetails(applicantId);

  useEffect(() => {
    if (GetSanctionLetterDetailsData) {
      console.log("GetSanctionLetterDetailsData",GetSanctionLetterDetailsData);
      
      setLoanAmount(GetSanctionLetterDetailsData.loanAmount?.toString() || '');
      setRateofInterest(GetSanctionLetterDetailsData.roi?.toString() || '');
      setEMIAmount(GetSanctionLetterDetailsData.emiAmount?.toString() || '');
      setCustomerName(GetSanctionLetterDetailsData.customerName || '');
      setTenure(GetSanctionLetterDetailsData.tenure?.toString() || '');
      setIsGuarantorMandatory(
        GetSanctionLetterDetailsData.isGuarantorMandatory || false,
      );
      setPopUPVisible(GetSanctionLetterDetailsData.nipRule ?  true : GetSanctionLetterDetailsData.incomeRule  );
      setPopUPMsg(GetSanctionLetterDetailsData.nipRule ? GetSanctionLetterDetailsData.nipMessage : GetSanctionLetterDetailsData.incomeMessage  );
      setIsNextEnable(GetSanctionLetterDetailsData.isNextEnable || false);
      setAddGuarantorVisible(GetSanctionLetterDetailsData.addGuarantorVisible);
    }
  }, [GetSanctionLetterDetailsData]);



  useFocusEffect(
    useCallback(() => {
      GetSanctionLetterDetails.mutateAsync();

    }, []),
  );

  type RenderDetailingTypes = {
    label:
      | 'Loan Amount'
      | 'Tenure'
      | 'Rate of Interest'
      | 'EMI Amount'
      | 'Customer Name'
      | 'Applicant ID';
    value: string | number | undefined;
  };

  const RenderDetailing = ({label, value}: RenderDetailingTypes) => (
    <View
      style={{
        marginBottom: 10,
        width: '48%',
        alignItems:
          label === 'Applicant ID' ||
          label === 'Rate of Interest' ||
          label === 'EMI Amount'
            ? 'flex-end'
            : 'flex-start',
      }}>
      <Text style={styles.labelStyle}>{label}</Text>
      <Text style={styles.valueStyle}>
        {(label === 'EMI Amount' || label === 'Loan Amount') && value
          ? ConvertToPrefixedAmountWithRupee(String(Number(value).toFixed(0)))
          : value && label === 'Rate of Interest'
          ? `${value}%`
          : value === 'Tenure' && value
          ? `${value} Months`
          : value}
      </Text>
    </View>
  );

  return (
    <WaveBackground loading={[GetSanctionLetterDetailsIsLoading]} PureScreen>
      <View style={{marginTop: '7%', paddingHorizontal: '5%'}}>
        <Modal
          buttonTitle="Okay"
          title=""
          status="normal"
          message={popupMsg}
          visible={popupVisible && !isNextEnable}
          onClose={() => {
            setPopUPVisible(false);
          }}
        />
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '8%',
          }}>
          <Icon name="congrats" />
          <Text style={styles.LoanApprovedText}>Congratulations!</Text>
          {GetSanctionLetterDetailsData?.isNextEnable && (
            <Text style={styles.MessageText}>
              Your loan has been approved. You're one step closer to achieving
              your goals. Access the funds you need quickly and conveniently.
              Start turning your dreams into reality with our trusted loan
              approval process.
            </Text>
          )}
          {GetSanctionLetterDetailsData?.addGuarantorVisible &&
            !GetSanctionLetterDetailsData.isNextEnable && (
              <Text style={styles.MessageText}>
                Congratulations on your approved loan! To proceed and access
                your funds, we kindly request you to add a guarantor. Adding a
                guarantor will help expedite the final steps and ensure a
                successful loan offer. Thank you for choosing us to make your
                aspirations come true.
              </Text>
            )}
        </View>
        <View
          style={{
            justifyContent: 'space-between',
            paddingHorizontal: '7%',
            width: '85%',
            marginVertical: '7%',
            paddingVertical: 10,
            borderWidth: 1.5,
            borderColor: Colors.LightGrey,
            backgroundColor: Colors.White,
            borderRadius: 15,
            alignSelf: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <RenderDetailing label="Customer Name" value={customerName} />
            <RenderDetailing label="Applicant ID" value={applicantId} />
          </View>
          {GetSanctionLetterDetailsData?.isNextEnable && (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                }}>
                <RenderDetailing label="Tenure" value={tenure} />
                <RenderDetailing
                  label="Rate of Interest"
                  value={RateofInterest}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                }}>
                <RenderDetailing label="Loan Amount" value={loanAmount} />
                <RenderDetailing label="EMI Amount" value={EMIAmount} />
              </View>
            </>
          )}
        </View>

        {
        addGuarantorVisible && 
        (
          <Button
            text="Add Guarantor"
            onPress={() => {
              SetMainApplicant(false);
              navigation.replace('LeadRegistration');
            }}
            active
            marginVertical={10}
          />
        )}
        
        {isNextEnable && (
          <Button
            text="Next"
            active
            onPress={() => {
              navigation.navigate('References');
            }}
            // marginTop={15}
            marginVertical={10}
          />
        )}
        <View style={{marginBottom: '5%'}}>
          <LoanSummaryButton
            onPress={() => navigation.replace('LoanSummary')}
          />
        </View>
      </View>
    </WaveBackground>
  );
};
export default LoanOffer;
const styles = StyleSheet.create({
  LoanApprovedText: {
    color: Colors.UpdateTexDarkBlue,
    fontFamily: APP_FONTS.Roboto_Black,
    fontSize: useFontNormalise(18),
    marginVertical: '5%',
  },
  MessageText: {
    color: Colors.Black,
    fontFamily: APP_FONTS.Medium,
    fontSize: useFontNormalise(13),
    textAlign: 'center',
    width: '95%',
  },
  labelStyle: {
    color: Colors.LabelGrey,
    fontFamily: APP_FONTS.Regular,
    fontSize: 14,
    marginTop: 2,
  },
  valueStyle: {
    fontSize: useFontNormalise(14),
    fontFamily: APP_FONTS.Roboto_Medium,
    color: Colors.Black,
  },
  RejectButton: {
    color: Colors.Red,
    fontSize: 17,
    fontFamily: APP_FONTS.Regular,
    textAlign: 'center',
  },
});
