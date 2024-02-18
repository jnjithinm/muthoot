import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { RouteProp, useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as Animatable from 'react-native-animatable';
import { StyleSheet } from 'react-native';
import WaveBackground from 'components/WaveBackground';
import Button from 'components/Button';
import { RootStackParamList } from 'navigation/HomeStack';
import { TouchableOpacity, View, Text } from 'react-native';
import { APP_FONTS, FONT_SIZE } from 'config/Fonts';
import Colors from 'config/Colors';
import useFontNormalise from 'hooks/useFontNormalise';
import Icon from 'components/Icon';
import { useApplicantDetails } from 'context/useApplicantDetails';
import { ErrorObject } from 'config/Types';
import LabeledTextInput from 'components/LabeledTextInput';
import {
  useGenerateSanctionLetter,
  useGetSanctionLetter,
  useSendOTPSanctionLetter,
  useVerifyOTPSanctionLetter,
} from 'api/ReactQuery/SanctionLetter';
import { VerifyOTPSanctionLetterRequest } from 'api/ReactQuery/SanctionLetter/types';
import DownloadFile from 'config/Functions/DownloadFile';
import Modal from 'components/Modal';
import LoanSummaryButton from 'components/LoanSummaryButton';

type SanctionLetterNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SanctionLetter'
>;

type SanctionLetterRouteProp = RouteProp<RootStackParamList, 'SanctionLetter'>;

interface SanctionLetterScreenProps {
  navigation: SanctionLetterNavigationProp;
  route: SanctionLetterRouteProp;
}

const SanctionLetter: FC<SanctionLetterScreenProps> = ({ navigation, route }) => {
  const { applicantId } = useApplicantDetails();
  // var applicantId = "MU706380"
  const [isError, setIsError] = useState<ErrorObject[]>([]);
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const [enteredOTP, setEnteredOTP] = useState<string>('');
  const [requestId, setRequestId] = useState<any>('');
  const [TCPopup, setTCPopup] = useState<boolean>(false);
  const [isConsent, setIsConsent] = useState<boolean>(false);
  const [isResendOTP, setIsResendOTP] = useState<boolean>(false);
  const [isResendOTPPressed, setIsResendOTPPressed] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(0);


  const VerifyOTPSanctionLetterRequest: VerifyOTPSanctionLetterRequest = {
    applicantId,
    otp: enteredOTP,
    employeeId: 'MCSL104091',
    otpmode: 'F',
  };

  const [
    GenerateSanctionLetter,
    {
      data: GenerateSanctionLetterData,
      isLoading: GenerateSanctionLetterIsLoading,
    },
  ] = useGenerateSanctionLetter(applicantId);



  const [
    SendOTPForSanctionLetter,
    {
      data: SendOTPForSanctionLetterData,
      isLoading: SendOTPForSanctionLetterIsLoading,
    },
  ] = useSendOTPSanctionLetter(applicantId, 'MCSL104091', 'F');

  const [
    VerifyOTPSanctionLetter,
    {
      data: VerifyOTPSanctionLetterData,
      isLoading: VerifyOTPSanctionLetterIsLoading,
    },
  ] = useVerifyOTPSanctionLetter(VerifyOTPSanctionLetterRequest);

  const [
    GetSanctionLetter,
    { data: GetSanctionLetterData, isLoading: GetSanctionLetterIsLoading },
  ] = useGetSanctionLetter(applicantId);

  useEffect(() => {
    console.log('GetSanctionLetterData', GetSanctionLetterData);

  }, [GetSanctionLetterData])
  const EnterOTPSanctionLetterContainer = useRef<
    View & { fadeIn: Function; fadeOut: Function }
  >(null);


  useEffect(() => {
    if (timer > 0) {

      const timeoutId = setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);

      return () => {
        // setIsResendOTPPressed(false), setIsResendOTP(false), 
        clearTimeout(timeoutId) };
    } else {
      setIsResendOTP(isResendOTPPressed ? true : false);
    }
  }, [timer]);


  useEffect(() => {
    if (VerifyOTPSanctionLetterData) {
      setTimer(0)
      GetSanctionLetter.mutateAsync();
    }
  }, [VerifyOTPSanctionLetterData]);

  useEffect(() => {
    GetSanctionLetter.mutateAsync();
    GenerateSanctionLetter.mutateAsync();
  }, []);

  useEffect(() => {
    if (VerifyOTPSanctionLetterData) {
      if (VerifyOTPSanctionLetterData.sanction_letter) {
        EnterOTPSanctionLetterContainer.current?.fadeIn(1000);
      }
    } else {
      setEnteredOTP('');
    }
  }, [VerifyOTPSanctionLetterData]);

  return (
    <WaveBackground
      loading={[
        GenerateSanctionLetterIsLoading,
        VerifyOTPSanctionLetterIsLoading,
        SendOTPForSanctionLetterIsLoading,
        GetSanctionLetterIsLoading,
      ]}
      title={'Sanction Letter'}>
      <Modal
        onClose={() => {
          setTCPopup(false);
        }}
        visible={TCPopup}
        status={'normal'}
        buttonTitle="I agree"
        tc
      />
      <Text style={styles.MessageText}>
        We are pleased to inform you that your sanction letter is now available
        for download. Below, you can find the sample sanction letter:
      </Text>
      <Icon name="sanction-letter-image" />
      <Text style={styles.MessageText}>
        For security, an OTP has been sent to your registered mobile number.
        Please enter it below to proceed with the download.
      </Text>

      {!GetSanctionLetterData?.signed_sanction_letter &&
        !SendOTPForSanctionLetterData && !isResendOTPPressed && (
          <>
            <View
              style={{
                marginTop: '5%',
                width: '70%',
                alignSelf: 'center',
                marginBottom: '5%',
              }}>
              <Button
                text="Sanction Letter"
                onPress={() => {
                  GenerateSanctionLetterData?.sanction_letter &&
                    DownloadFile(
                      GenerateSanctionLetterData?.sanction_letter,
                      applicantId + '_SanctionLetter',
                    );
                }}
                marginVertical={20}
                active
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: 10,
                marginTop: 10,
                marginBottom: 15,
              }}>
              <TouchableOpacity onPress={() => setIsConsent(!isConsent)}>
                {isConsent ? (
                  <Icon name="checkbox" />
                ) : (
                  <View
                    style={{
                      width: useFontNormalise(20),
                      height: useFontNormalise(20),
                      backgroundColor: Colors.LabelGrey,
                      borderRadius: 2,
                    }}
                  />
                )}
              </TouchableOpacity>
              <View style={{ flexDirection: 'row', left: 15 }}>
                <Text
                  style={{
                    color: Colors.Black,
                    fontSize: 13,
                    fontFamily: APP_FONTS.Medium,
                  }}>
                  I agree to have read & understood the{'\b'}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setTCPopup(true);
                  }}>
                  <Text
                    style={{
                      color: Colors.Blue,
                      fontSize: 13,
                      fontFamily: APP_FONTS.Medium,
                    }}>
                    T&C
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <Button
              text="Generate OTP"
              active={isConsent}
              marginVertical={10}
              marginTop={20}
              onPress={() => {
                setTimer(45)
                setIsResendOTPPressed(true);
                SendOTPForSanctionLetter.mutateAsync();
              }}
            />
          </>
        )}

      {!GetSanctionLetterData?.signed_sanction_letter && <View style={{ alignItems: 'center', marginVertical: '5%' }}>
        <Text style={[styles.OTPText, {}]}>
          Didn't received OTP ?
        </Text>
        {timer !== 0 && <Text style={styles.TimerText}>{timer}</Text>}

        <TouchableOpacity
          onPress={() => {
            setIsResendOTP(false);
            setIsResendOTPPressed(true);
            SendOTPForSanctionLetter.mutateAsync();
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
      </View>}
      {SendOTPForSanctionLetterData &&
        !GetSanctionLetterData?.signed_sanction_letter && (
          <Animatable.View ref={EnterOTPSanctionLetterContainer}>
            <LabeledTextInput
              label="Enter OTP"
              onChange={setEnteredOTP}
              defaultValue={enteredOTP}
              setErrorFlag={setIsError}
              IsErrorArray={isError}
              maxLength={6}
              isChange={setIsChanged}
              NumberPad
              mandatory
            />
            <Button
              text="Submit"
              active
              marginVertical={10}
              marginTop={20}
              onPress={() => {
                VerifyOTPSanctionLetter.mutateAsync();
              }}
            />
          </Animatable.View>
        )}
      {GetSanctionLetterData?.signed_sanction_letter && (
        <>
          <View
            style={{
              marginTop: '5%',
              width: '70%',
              alignSelf: 'center',
              marginBottom: '10%',
            }}>
            <Button
              text="Sanction Letter"
              onPress={() =>
                GetSanctionLetterData?.signed_sanction_letter &&
                DownloadFile(
                  GetSanctionLetterData?.signed_sanction_letter,
                  applicantId + '_SanctionLetter',
                )
              }
              marginVertical={20}
              active
            />
          </View>
          <Button
            text={'Next'}
            active
            marginVertical={10}
            onPress={() => {
              navigation.navigate('BankDetails');
            }}
          />
        </>
      )}
      <LoanSummaryButton onPress={() => navigation.replace('LoanSummary')} />
    </WaveBackground>
  );
};
export default SanctionLetter;
const styles = StyleSheet.create({
  LoanApproved: {
    padding: 50,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  LoanApprovedContainer: {
    backgroundColor: 'rgba(106,175,100,0.18)',
    // padding: 10,
    borderRadius: 150,
    // marginHorizontal:'20%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: '30%',
  },
  MessageText: {
    color: Colors.Black,
    fontFamily: APP_FONTS.Medium,
    fontSize: useFontNormalise(13),
    textAlign: 'center',
    paddingHorizontal: 15,
    // marginVertical: '3%',
  },
  TimerText: {
    fontFamily: APP_FONTS.Roboto_Black,
    fontSize: useFontNormalise(18),
    color: Colors.TimerGreen,
    marginVertical: 5
  },
  OTPText: {
    color: Colors.Black,
    fontFamily: APP_FONTS.Regular,
    fontSize: FONT_SIZE.s,
    marginVertical: '1%',
    alignSelf: 'center',
    width: '80%',
    textAlign: 'center'
  },
});
