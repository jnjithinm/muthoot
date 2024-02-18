import React, { FC, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import {
  useVerifyBankAccount,
  useGetBankAccountDetails,
} from 'api/ReactQuery/PennyDrop';
import {
  VerifyBankAccountRequest,
  GetBankAccountDetailsRequest,
} from 'api/ReactQuery/PennyDrop/types';
import Modal from 'components/Modal';
import WaveBackground from 'components/WaveBackground';
import Button from 'components/Button';
import { RootStackParamList } from 'navigation/HomeStack';
import { useApplicantDetails } from 'context/useApplicantDetails';
import { ErrorObject } from 'config/Types';
import LabeledTextInput from 'components/LabeledTextInput';
import useActive from 'hooks/useActive';
import LoanSummaryButton from 'components/LoanSummaryButton';
import Icon from 'components/Icon';
import { APP_FONTS } from 'config/Fonts';
import useFontNormalise from 'hooks/useFontNormalise';
import Colors from 'config/Colors';
import LabelDropdown from 'components/LabelDropdown ';
import { usedViewStatus } from 'context/useViewStatus';

type BankDetailsNavigationProp = StackNavigationProp<
  RootStackParamList,
  'BankDetails'
>;

type BankDetailsRouteProp = RouteProp<RootStackParamList, 'BankDetails'>;

interface BankDetailsScreenProps {
  navigation: BankDetailsNavigationProp;
  route: BankDetailsRouteProp;
}

const BankDetails: FC<BankDetailsScreenProps> = ({ navigation, route }) => {
  // const [AddLead, {data: AddLeadData, isLoading: AddLeadIsLoading}] =
  //   useAddLead(requestAdd);
  const { applicantId, guarantorId, } = useApplicantDetails();
  const { useViewStatus } = usedViewStatus();

  console.log("ccccccc", useViewStatus?.isSubmitToDisbursement);

  const [isError, setIsError] = useState<ErrorObject[]>([]);
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const [accountNumber, setAccountNumber] = useState<string>('');
  const [ifscCode, setIfscCode] = useState<string>('');
  const [accountHolderName, setAccountHolderName] = useState<string>('');
  const [bankName, setBankName] = useState<string>('');
  const [isVisibleModal, setIsVisibleModal] = useState<boolean>(false);
  const [applicantType, setApplicantType] = useState<string>('Main Applicant');
  const [applicantTypeOpen, setApplicantTypeOpen] = useState<boolean>(false);
  const [isViewOnly, setIsViewOnly] = useState<boolean>(false);


  const VerifyBankAccountRequest: VerifyBankAccountRequest = {
    applicantId,
    accountNumber,
    ifsc: ifscCode,
    applicantType: applicantType == "Main Applicant" ? "mainApplicant" : "guarantor",
    guarantorId: guarantorId
  };

  const GetBankAccountDetailsRequest: GetBankAccountDetailsRequest = {
    appId: applicantId,
  };

  const [
    VerifyBankAccount,
    { data: VerifyBankAccountData, isLoading: VerifyBankAccountIsLoading },
  ] = useVerifyBankAccount(VerifyBankAccountRequest);

  const [
    GetBankAccount,
    {
      data: GetBankAccountDetailsData,
      isLoading: GetBankAccountDetailsIsLoading,
    },
  ] = useGetBankAccountDetails(GetBankAccountDetailsRequest);

  const ResetBankDetails = () => {
    setAccountHolderName('');
    setBankName('');
  };

  
  useEffect(() => {
    if (useViewStatus) {
      setIsViewOnly( useViewStatus?.isDisbursementFreeze ? true  : false);
    }
  }, []);

  useEffect(() => {
    if (VerifyBankAccountData) {
      if (VerifyBankAccountData.nameMatch === 'Y') {
        setBankName(VerifyBankAccountData?.bankName);
        setAccountHolderName(VerifyBankAccountData.accountHolderName || '');
      } else {
        setIsVisibleModal(true);
      }
      setIsChanged(false);
    }
  }, [VerifyBankAccountData]);

  useEffect(() => {
    isChanged && ResetBankDetails();
  }, [accountNumber, ifscCode, isChanged]);

  useEffect(() => {
    if (GetBankAccountDetailsData) {
      // console.log("GetBankAccountDetailsData", GetBankAccountDetailsData);

      setIfscCode(GetBankAccountDetailsData.ifscCode || '');
      setAccountNumber(GetBankAccountDetailsData.accountNumber || '');
      setBankName(GetBankAccountDetailsData.bankName || '');
      setAccountHolderName(GetBankAccountDetailsData.accountHolderName || '');
      setApplicantType(GetBankAccountDetailsData.applicantType == 'mainApplicant' ? 'Main Applicant' : 'Guarantor');

      setIsChanged(false);
    }
  }, [GetBankAccountDetailsData]);

  useEffect(() => {
    GetBankAccount.mutateAsync();
  }, []);

  const handleSubmit = () => {
    VerifyBankAccount.mutateAsync();
  };

  const ActiveArray = [accountNumber, ifscCode];
  let isActive = useActive(ActiveArray);
  let hasError = isError.some(error => error.hasError === true);

  return (
    <WaveBackground
      loading={[VerifyBankAccountIsLoading, GetBankAccountDetailsIsLoading]}
      title={'Bank Details'}>
      <Modal
        title="Account Verification FAILED"
        status="failure"
        onClose={() => {
          setAccountNumber('');
          setAccountHolderName('');
          setBankName('');
          setIfscCode('');
          setIsVisibleModal(false);
        }}
        message={
          "The account number & IFSC Code you entered does not match the applicant's name. Please review the account number and ensure it matches the applicant's information."
        }
        visible={isVisibleModal}
        buttonTitle="Okay"
      />

      <LabelDropdown
        label="Applicant Type"
        open={applicantTypeOpen}
        setDropdownOpen={setApplicantTypeOpen}
        defaultValue={applicantType}
        options={guarantorId == '' ? ['Main Applicant'] : ['Main Applicant', 'Guarantor']}
        setSelectedOption={setApplicantType}
        setSelectedItem={item => { }}
        isChange={setIsChanged}
        mandatory
        zIndex={applicantTypeOpen ? 1000 : 0}
        disabled={isViewOnly}
      />

      <LabeledTextInput
        label="Account Number"
        setErrorFlag={setIsError}
        isChange={setIsChanged}
        onChange={setAccountNumber}
        defaultValue={accountNumber}
        IsErrorArray={isError}
        maxLength={16}
        NumberPad
        mandatory
        disabled={isViewOnly}
      />
      <LabeledTextInput
        label="IFSC Code"
        onChange={setIfscCode}
        isChange={setIsChanged}
        defaultValue={ifscCode}
        setErrorFlag={setIsError}
        autoCapitalize="characters"
        maxLength={11}
        IsErrorArray={isError}
        mandatory
        disabled={isViewOnly}
      />

      {bankName && (
        <LabeledTextInput
          label="Bank Name"
          onChange={setBankName}
          isChange={setIsChanged}
          IsErrorArray={isError}
          setErrorFlag={setIsError}
          defaultValue={bankName}
          disabled
          mandatory
        />
      )}
      {accountHolderName && (
        <LabeledTextInput
          label="Account Holder Name"
          onChange={setAccountHolderName}
          isChange={setIsChanged}
          IsErrorArray={isError}
          setErrorFlag={setIsError}
          defaultValue={accountHolderName}
          disabled
          mandatory
        />
      )}
      {(VerifyBankAccountData?.nameMatch === 'Y' ||
        GetBankAccountDetailsData?.nameMatch === 'Y') && !isChanged && (
          <View
            style={{
              flexDirection: 'row',
              marginVertical: '5%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontFamily: APP_FONTS.SemiBold,
                fontSize: useFontNormalise(15),
                marginRight: 8,
                top: 3,
                fontWeight: '700',
                color: Colors.Black,
              }}>
              Account Number Verified{'\t'}
            </Text>
            <Icon name="completed" />
          </View>
        )}

      <View style={{ marginVertical: '10%' }}>
        <Button
          text={isChanged ? 'Verify' : 'Next'}
          active={isActive && !hasError}
          marginVertical={10}
          onPress={() => {
            isChanged
              ? handleSubmit()
              : navigation.navigate('RepaymentDetails');
          }}
        />
        <LoanSummaryButton onPress={() => navigation.replace('LoanSummary')} />
      </View>
    </WaveBackground>
  );
};
export default BankDetails;
