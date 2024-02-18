import React, { FC } from 'react';
import {
  Modal as ReactNativeModal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import styles from './styles';
import Colors from 'config/Colors';
import { APP_FONTS } from 'config/Fonts';
import Icon from 'components/Icon';

interface ModalProps {
  onClose: () => void;
  title?: string;
  message?: string;
  Close?: string;
  status: 'failure' | 'success' | 'normal';
  visible?: boolean;
  buttonTitle?: string;
  tc?: boolean;
  isRejected?: boolean;
  appVersion?: boolean;
  credit?: boolean;
  isLoanRejected?: boolean;

}

const Modal: FC<ModalProps> = ({
  onClose,
  title,
  Close,
  message,
  status,
  visible,
  buttonTitle,
  tc,
  credit,
  isRejected,
  appVersion,
  isLoanRejected
}) => {
  const handleOnClose = () => {
    onClose();
  };

  return (
    <ReactNativeModal
      visible={visible}
      animationType="slide"
      style={{ marginLeft: -16 }}
      onRequestClose={handleOnClose}
      transparent>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={styles.modalOverlay} />
        <View
          style={{
            backgroundColor: '#fff',
            // paddingHorizontal: 20,
            paddingVertical: 15,
            elevation: 2,
            width: '85%',
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {tc ? (
            <Text style={[styles.TitleText]}>Terms and Conditions</Text>
          ) : status === 'failure' &&
            (buttonTitle === 'Try Again' ||
              buttonTitle === 'Back To Loan Summary' ||
              buttonTitle === 'Okay') ? (
            <Text style={[styles.TitleText]}>
              {title ? title : 'BureauError!'}
            </Text>
          ) :
            isLoanRejected ?
              <Text style={[styles.TitleText]}>{title}</Text>
              :
              credit ?
                (
                  <View
                    style={{
                      backgroundColor: '#F5F8FF',
                      width: 90,
                      height: 90,
                      borderRadius: 100,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>{
                      !isRejected ?
                        <Icon name="congrats" /> :
                        <Icon name="loan-rejected" />
                    }
                  </View>
                ) :
                (
                  <View
                    style={{
                      backgroundColor: '#F5F8FF',
                      width: 90,
                      height: 90,
                      borderRadius: 100,
                      alignItems: 'center',
                      justifyContent: 'center',

                    }}>
                    <Text
                      style={{ fontSize: 50, fontFamily: APP_FONTS.Roboto_ExtraBold }}>
                      !
                    </Text>
                  </View>
                )}
          <ScrollView style={{ maxHeight: '75%', }}>
            {tc ? (
              <View style={{ flex: 1, marginLeft: 10, marginRight: 35 }}>
                <View style={{ flexDirection: 'row', }}>
                  <Text style={[styles.tc]}>1. </Text>
                  <Text style={styles.text}>
                    By proceeding with sharing OTP (One Time Password) sent by
                    Muthoot Capital Services Limited (hereinafter referred to as
                    MCSL), I hereby agree and acknowledge that, I
                  </Text>
                </View>
                <View
                  style={{
                    marginLeft: 8,
                    marginHorizontal: 4,
                    marginVertical: 8,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginBottom: 3,
                    }}>
                    <Text style={styles.text}>a.</Text>
                    <Text style={styles.text}>I am major,</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginBottom: 3,
                    }}>
                    <Text style={styles.text}>b.</Text>
                    <Text style={styles.text}>
                      I can understand, read, and write in the English language,
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginBottom: 3,
                    }}>
                    <Text style={styles.text}>c.</Text>
                    <Text style={styles.text}>
                      I have read and understood Privacy Policy.
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.text}>d.</Text>
                    <Text style={styles.agreeText}>
                      I have read and understood the terms and conditions
                      contained below(“Terms”)
                    </Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', width: '100%' }}>
                  <Text style={[styles.tc]}>2. </Text>
                  <Text style={styles.text}>
                    I agree that my action of sharing the OTP sent by MCSL,
                    constitutes a valid acceptance by me of the Terms contained
                    herein and creates binding and enforceable agreement between
                    me and MCSL.
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', width: '100%' }}>
                  <Text style={styles.tc}>3. </Text>
                  <Text style={styles.text}>
                    {`I confirm that I have/had no insolvency proceedings against me, nor have I ever been adjudicated insolvent by any court or other authority and I further confirm that I have read the information on various loan products made available by MCSL on www.muthootcap.com`}
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', width: '100%' }}>
                  <Text style={styles.tc}>4.</Text>
                  <Text style={styles.text}>
                    I authorize MCSL to exchange, share all information and
                    details as provided by me and in relation to my existing
                    loans and/or repayment history to any third party including
                    but not limited to its group companies, service providers,
                    banks, financial institutions, credit bureaus,
                    telecommunication companies, statutory bodies, business
                    partners etc. for customer verification, personalization of
                    products or services, credit rating, data enrichment,
                    marketing or promotion of MCSL services or related products
                    or that of its associates/business partners and affiliates
                    or for enforcement of your obligations and I shall not hold
                    MCSL (or any of its group companies or its/their
                    employees/agents/representatives/ business partners) liable
                    for the use/sharing of the information as stated above.
                    Third Party service providers include Perfios / OneMoney for
                    bank statement analysis or fetching bank statement through
                    internet banking or fetch ITR statement, evoke for fetching
                    GST Statements, NSDL for PAN verification, NESL and Legality
                    for E-sign, CAMS / IDFC / HDFC for E-mandate setup, Account
                    aggregator for fetching consent-based account statements,
                    Payment gateway for any fee’s collections, UIDAI for aadhaar
                    authentication.
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', width: '100%' }}>
                  <Text style={styles.tc}>5.</Text>
                  <Text style={styles.text}>
                    I agree and affirm that MCSL may contact me and communicate
                    with me over telephonic calls, or SMS on the mobile number
                    mentioned herein, or through any other communication mode
                    (“Communication Modes”) to verify the details provided by
                    me. Further, I confirm that I would like to know through the
                    above-mentioned Communication Modes various MCSL loan offer
                    schemes or loan promotional schemes or any other promotional
                    schemes relating to various products/services offered by
                    MCSL/its group companies/business partners from time to time
                    and hereby authorize MCSL, its group companies, employees,
                    agents, associates, business partners to contact me from
                    time to time for the same.
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', width: '100%' }}>
                  <Text style={styles.tc}>6.</Text>
                  <Text style={styles.text}>
                    I hereby expressly consent and authorize MCSL/its employees/
                    representatives/agents/ its business partners/its group
                    companies/affiliates to send me any communication regarding
                    products/services offered by them using various
                    communication channels, such as telephone,
                    calls/SMS/bitly/bots/emails/post/WhatsApp, etc.
                  </Text>
                </View>

                <View style={{ flexDirection: 'row', width: '100%' }}>
                  <Text style={styles.tc}>7.</Text>
                  <Text style={styles.text}>
                    I undertake to keep MCSL updated of any change in the
                    information provided by me.
                  </Text>
                </View>

                <View style={{ flexDirection: 'row', width: '100%' }}>
                  <Text style={styles.tc}>8.</Text>
                  <Text style={styles.text}>
                    I understand and acknowledge that MCSL shall have the
                    absolute discretion, without assigning any reason to reject
                    my loan application and that MCSL shall not be
                    responsible/liable in any manner whatsoever for such
                    rejection.
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', width: '100%' }}>
                  <Text style={styles.tc}>9. </Text>
                  <Text style={styles.text}>
                    I further understand and agree that pursuant to my
                    application on the lending platform, I will be required to
                    upload/submit documents to the satisfaction of MCSL and
                    accept the loan terms and conditions for availing the loan
                    granted to me by MCSL from time to time.
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', width: '100%' }}>
                  <Text style={styles.tc}>10. </Text>
                  <Text style={styles.text}>
                    I hereby expressly consent and authorize MCSL/ its
                    representatives/ agents/ its business partners/ its group
                    companies/ affiliates to initiate CIBIL, PAN, Aadhar,
                    address, and employment check to evaluate and process my
                    loan application /requirement as expressed and submitted in
                    the digital lending platform. I, further agree and grant my
                    permission to MCSL, or any third agencies appointed by MCSL,
                    to extract and use my details from all such agencies (PAN,
                    CIBIL, AADHAR, CBS Etc.), which are required in the
                    evaluation and processing of my loan application
                    /requirement.
                  </Text>
                </View>
              </View>
            ) : (
              <View style={{ flex: 1, marginLeft: 10, marginRight: 14 }}>
                <Text
                  style={[
                    styles.messageText,
                    {
                      color: tc ? Colors.Button : Colors.Black,
                      fontFamily:
                        buttonTitle === 'Back To Loan Summary'
                          ? APP_FONTS.Regular
                          : APP_FONTS.Medium,
                      bottom: 0,
                    },
                  ]}>
                  {message}
                </Text>
              </View>
            )}
          </ScrollView>
          <TouchableOpacity
            onPress={handleOnClose}
            style={[
              styles.Button,

              {
                backgroundColor:
                  status === 'failure' &&
                    (buttonTitle === 'Back To Loan Summary' ||
                      buttonTitle === 'Try Again' ||
                      buttonTitle === 'Okay')
                    ? Colors.White
                    : tc
                      ? Colors.Button
                      : Colors.White,
                borderWidth:
                  (status === 'normal' && !tc) ||
                    (status === 'failure' &&
                      (buttonTitle === 'Back To Loan Summary' ||
                        buttonTitle === 'Try Again' ||
                        buttonTitle === 'Okay'))
                    ? 1
                    : 0,
                borderColor:
                  status === 'normal' ||
                    (status === 'failure' &&
                      (buttonTitle === 'Back To Loan Summary' ||
                        buttonTitle === 'Try Again' ||
                        buttonTitle === 'Okay'))
                    ? Colors.Blue
                    : Colors.White,
                borderRadius:
                  status === 'failure' &&
                    (buttonTitle === 'Back To Loan Summary' ||
                      buttonTitle === 'Try Again' ||
                      buttonTitle === 'Okay')
                    ? 10
                    : 5,
                top: tc ? 20 : 0,
              },
            ]}>
            <Text
              style={[
                styles.CloseText,
                {
                  color:
                    (status === 'normal' && !tc) ||
                      (status === 'failure' &&
                        (buttonTitle === 'Back To Loan Summary' ||
                          buttonTitle === 'Try Again'))
                      ? Colors.Blue
                      : tc
                        ? Colors.White
                        : Colors.Blue,
                },
              ]}>
              {buttonTitle
                ? buttonTitle
                : status === 'success'
                  ? 'Continue'
                  : 'Try again!'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ReactNativeModal>
  );
};

export default Modal;
