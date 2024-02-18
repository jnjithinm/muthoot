import React, { FC, useEffect, useState } from 'react';
import { RouteProp } from '@react-navigation/native';
import { TouchableOpacity, StyleSheet, TextInput, View, Text, Keyboard, PermissionsAndroid, DeviceEventEmitter } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import WaveBackground from 'components/WaveBackground';
import Button from 'components/Button';
import { RootStackParamList } from 'navigation/HomeStack';
import styles from './styles';
import Colors from 'config/Colors';
import { useGenerateOTP, useValidateOTP } from 'api/ReactQuery/MobileOTP';
import {
  GenerateOTPRequest,
  ValidateOTPRequest,
} from 'api/ReactQuery/MobileOTP/types';
import { useApplicantDetails } from 'context/useApplicantDetails';
import useShowFlashMessage from 'hooks/useShowFlashMessage';
import { useGetCKYCStatus } from 'api/ReactQuery/CKYC';
import { GetCKYCStatusRequest } from 'api/ReactQuery/CKYC/types';
import { useEmployeeDetails } from 'context/useEmployeeDetails';
import { useGetTermsAndConditions } from 'api/ReactQuery/Master';

type OTPVerificationNavigationProp = StackNavigationProp<
  RootStackParamList,
  'OTPVerification'
>;
type OTPVerificationRouteProp = RouteProp<
  RootStackParamList,
  'OTPVerification'
>;

interface OTPVerificationScreenProps {
  navigation: OTPVerificationNavigationProp;
  route: OTPVerificationRouteProp;
}

const OTPVerification: FC<OTPVerificationScreenProps> = ({
  navigation,
  route,
}) => {
  const { applicantId, mobileNumber, guarantorId, isMainApplicant } =
    useApplicantDetails();
  const { employeeId } = useEmployeeDetails();
  const [enteredOTP, setEnteredOTP] = useState<string>('');
  const [isResendOTP, setIsResendOTP] = useState<boolean>(false);
  const [isResendOTPPressed, setIsResendOTPPressed] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(45);
  const [receiveSmsPermission, setReceiveSmsPermission] = useState('');



  const GetCKYCStatusRequest: GetCKYCStatusRequest = {
    appId: guarantorId ? guarantorId : applicantId,
    applicantType: guarantorId ? 'guarantor' : 'mainApplicant',
    ckycNumber: 5,
    employeeId,
  };
  const [CkycStatus, { data: ckycdata, isLoading: cKycIsLoading }] =
    useGetCKYCStatus(GetCKYCStatusRequest);

  const GenerateOTPRequest: GenerateOTPRequest = {
    appId: !isMainApplicant ? guarantorId : applicantId,
    applicantType: guarantorId ? 'guarantor' : 'mainApplicant',
    mobile: mobileNumber,
    employeeId,
    otpmode: isResendOTPPressed ? 'R' : 'F',
  };



  const [
    GenerateOTP,
    { data: GenerateOTPData, isLoading: GenerateOTPIsLoading },
  ] = useGenerateOTP(GenerateOTPRequest);

  const ValidateOTPRequest: ValidateOTPRequest = {
    appId: !isMainApplicant ? guarantorId : applicantId,
    applicantType: guarantorId ? 'guarantor' : 'mainApplicant',
    mobile: mobileNumber,
    otp: enteredOTP,
    employeeId,
    otpmode: isResendOTPPressed ? 'R' : 'F',
  };

  useEffect(() => {
    if (GenerateOTPData) {
      requestSmsPermission();
    }
  }, [GenerateOTPData]);

  const [
    ValidateOTP,
    { data: ValidateOTPData, isLoading: ValidateOTPIsLoading },
  ] = useValidateOTP(ValidateOTPRequest);

  useEffect(() => {
    if (ValidateOTPData != undefined) {
      const isEmpty = Object.keys(ValidateOTPData).length === 0;

      if (isEmpty) {
        useShowFlashMessage('success', 'OTP Verified Successfully !');
      }
    }
  }, [ValidateOTPData]);


  // useEffect(() => {
  //   console.log("lllllllll",receiveSmsPermission,  PermissionsAndroid.RESULTS.GRANTED);

  //   if (
  //     receiveSmsPermission == PermissionsAndroid.RESULTS.GRANTED 
  //     // && enteredOTP.length < 4
  //   ) {
  //     console.log("mmmmm");

  //     let subscriber = DeviceEventEmitter.addListener(
  //       'onSMSReceived',
  //       message => {
  //         console.log("message");

  //         console.log("message",message);

  //         const {messageBody, senderPhoneNumber} = JSON.parse(message);
  //         const otpRegex = /\b\d+\b/;
  //         const match = messageBody.match(otpRegex);
  //         console.log('message body', messageBody);
  //         if (match) {
  //           const otp = match[0];
  //           console.log('OTP:', otp);
  //           setEnteredOTP(otp);
  //         } else {
  //           console.log('No OTP found in the message.');
  //         }
  //       },
  //     );

  //     return () => {
  //       subscriber.remove();
  //     };
  //   }
  // }, [receiveSmsPermission]);
  useEffect(() => {
    console.log("Permission status:", receiveSmsPermission);

    if (receiveSmsPermission === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("Registering SMS listener...");


      let subscriber = DeviceEventEmitter.addListener(
        'onSMSReceived',
        message => {
          console.log("SMS received:", message);

          const { messageBody, senderPhoneNumber } = JSON.parse(message);
          const otpRegex = /\b\d+\b/;
          const match = messageBody.match(otpRegex);

          console.log('Message body:', messageBody);

          if (match) {
            const otp = match[0];
            console.log('OTP:', otp);
            setEnteredOTP(otp);
          } else {
            console.log('No OTP found in the message.');
          }
        },
      );

      return () => {
        console.log("Removing SMS listener...");
        subscriber.remove();
      };
    }
  }, [receiveSmsPermission]);


  const requestSmsPermission = async () => {
    console.log("requestSmsPermission", requestSmsPermission);

    try {
      const permission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
      );
      console.log("Permission result:", permission);
      setReceiveSmsPermission(permission);


    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (isResendOTPPressed) {
      GenerateOTP.mutateAsync();
    }
  }, [isResendOTPPressed]);

  useEffect(() => {
    if (applicantId) {
      GenerateOTP.mutateAsync();

    }
  }, []);

  useEffect(() => {
    if (timer > 0) {
      setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
    } else {
      setIsResendOTP(true);
    }
  }, [timer]);

  useEffect(() => {
    if (enteredOTP.length === 6) {
      Keyboard.dismiss();
    }
  }, [enteredOTP]);

  useEffect(() => {
    if (ckycdata) {
      // ckycdata.panStatus?
      // navigation.navigate('PANVerification'):
      navigation.replace('LoanSummary');
    }
  }, [ckycdata]);

  useEffect(() => {
    if (ValidateOTPData) {
      if (ValidateOTPData.isOtpValidated) {
        CkycStatus.mutateAsync();
      } else {
        useShowFlashMessage(
          'warning',
          'The entered OTP is incorrect. Please double-check and try again.',
        );
      }
    }
  }, [ValidateOTPData]);

  return (
    <WaveBackground
      loading={[GenerateOTPIsLoading, ValidateOTPIsLoading, cKycIsLoading]}
      title={'OTP Verification'}>
      <Text style={[styles.OTPText, { marginTop: '10%' }]}>
        We will send you a one time password on this Mobile Number
      </Text>
      <Text style={[styles.BoldText, { marginTop: '1%' }]}>{mobileNumber}</Text>
      <View style={{ marginTop: 20, alignItems: 'center' }}>
        {/*<NumberField onOTPChange={setEnteredOTP} />*/}
        <TextInput
          autoComplete="one-time-code"
          maxLength={6}
          value={enteredOTP}
          // underlineColorAndroid={Colors.LightGrey}
          textContentType='oneTimeCode'
          style={{
            paddingVertical: 5,
            paddingHorizontal: 10,
            textAlign: 'center',
            borderWidth: 1,
            borderColor: Colors.LightGrey,
            width: '30%',
            backgroundColor: Colors.White,
            height: 40,
            borderRadius: 5,
            borderBottomWidth: 1,

            color: Colors.Black,
          }}
          onChangeText={text => setEnteredOTP(text)}
          keyboardType="numeric"
        />
      </View>
      <View style={{ alignItems: 'center' }}>
        <Text style={[styles.OTPText, { marginTop: '5%' }]}>
          Didn't received OTP ?
        </Text>
        {timer !== 0 && <Text style={styles.TimerText}>{timer}</Text>}

        <TouchableOpacity
          onPress={() => {
            setIsResendOTP(false);
            setIsResendOTPPressed(true);
            setTimer(45);
          }}
          disabled={!isResendOTP}>
          <Text
            style={[
              styles.OTPText,
              { color: isResendOTP ? Colors.Blue : Colors.LabelGrey },
            ]}>
            Resend OTP
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: '10%' }}>
        <Button
          text="Verify"
          active
          onPress={() => {

            ValidateOTP.mutateAsync();
          }}
          marginVertical={50}
          marginTop={20}
          backgroundColor={Colors.Blue}
          textColor={Colors.White}
        />
      </View>

    </WaveBackground>
  );
};
export default OTPVerification;
