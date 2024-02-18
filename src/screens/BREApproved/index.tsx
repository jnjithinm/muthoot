import React, {FC, useEffect, useState} from 'react';
import {View, Text, StyleSheet, Animated, TouchableOpacity} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

import Icon from 'components/Icon';
import Colors from 'config/Colors';
import {APP_FONTS, FONT_SIZE} from 'config/Fonts';
import useFontNormalise from 'hooks/useFontNormalise';
import {RootStackParamList} from 'navigation/HomeStack';
import MyStatusBar from 'components/StatusBar';
import {useApplicantDetails} from 'context/useApplicantDetails';
import LoanSummaryButton from 'components/LoanSummaryButton';
import {useCKYCData} from 'context/useCKYCData';
import {ConvertToPrefixedAadharNumber} from 'config/Functions/ConvertToPrefix';

type BREApprovedNavigationProp = StackNavigationProp<
  RootStackParamList,
  'BREApproved'
>;
type BREApprovedRouteProp = RouteProp<RootStackParamList, 'BREApproved'>;

interface BREApprovedScreenProps {
  navigation: BREApprovedNavigationProp;
  route: BREApprovedRouteProp;
}

const BREApproved: FC<BREApprovedScreenProps> = ({navigation, route}) => {
  const GetCriffResponse = route?.params?.GetCriffResponse;
  const [circleSize] = useState(new Animated.Value(50));
  const {applicantId} = useApplicantDetails();
  const {CKYCData} = useCKYCData();
  const isGuarantorMandatory = route?.params?.isGuarantorMandatory;

  const startAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(circleSize, {
          toValue: 200,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(circleSize, {
          toValue: 50,
          duration: 800,
          useNativeDriver: false, // Set to true if possible to use the native driver for performance
        }),
      ]),
    ).start();
  };

  useEffect(() => {
    startAnimation();
  }, []);

  type RenderLabelsValuesTypes = {
    label: string;
    value: string;
  };
  const RenderLabelsValues = ({label, value}: RenderLabelsValuesTypes) => (
    <View
      style={{
        paddingVertical: 7,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        width: 'auto',
      }}>
      <Text style={styles.leadLabel}>{label}</Text>
      <Text style={styles.labelText}>{value}</Text>
    </View>
  );
  return (
    // <WaveBackground PureScreen>
    <View style={{flex: 1, backgroundColor: Colors.Secondary}}>
      <MyStatusBar backgroundColor={Colors.Secondary} />
      <Animated.View
        style={[
          styles.BREApprovedContainer,
          {
            width: circleSize,
            height: circleSize,
            transform: [
              {
                translateY: circleSize.interpolate({
                  inputRange: [50, 250], // Input range for circle size (initial and maximum values)
                  outputRange: [0, -100], // Output range for vertical movement (to move it upwards)
                }),
              },
            ],
          },
        ]}>
        <Animated.View
          style={[styles.BREApproved, {width: circleSize, height: circleSize}]}>
          <Icon name="loan-approved" />
        </Animated.View>
      </Animated.View>
      <View
        style={{
          alignItems: 'center',
          position: 'absolute',
          top: '30%',
          height: '100%',
          width: '100%',
          paddingHorizontal: '8%',
        }}>
        <Text style={styles.BREApprovedText}>Eligible To Proceed</Text>
        <Text style={styles.MessageText}>
          Congratulations! Your profile seems to fit our requirements. Please
          share some additional details for us to be able to give you an offer!
        </Text>
        <View
          style={{
            backgroundColor: Colors.White,
            elevation: 4,
            paddingVertical: 5,
            paddingHorizontal: 10,
            marginVertical: '10%',
            // alignItems: 'center',
            // alignSelf: 'center',
            //marginHorizontal: 5,
            width: '85%',
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
                    GetCriffResponse?.docNumber.toString() || '',
                  ) || ''
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
        <View style={{width: '100%'}}>
          <TouchableOpacity
            style={{
              backgroundColor: Colors.Button,
              // paddingHorizontal:'55%',
              paddingVertical: 10,
              alignSelf: 'center',
              marginTop: '5%',
              marginVertical: 10,
              borderRadius: 7,
              width: '90%',
            }}
            onPress={() => {
              GetCriffResponse?.applicantType == 'guarantor' &&
              !isGuarantorMandatory
                ? navigation.navigate('DelarshipDetails')
                : navigation.navigate('ProductDetails');
            }}>
            <Text
              style={{
                color: Colors.White,
                fontFamily: APP_FONTS.Roboto_Medium,
                textAlign: 'center',
                fontSize: useFontNormalise(16),
                alignItems: 'center',
              }}>
              Next
            </Text>
          </TouchableOpacity>
          <LoanSummaryButton onPress={()=>navigation.replace('LoanSummary')} />
        </View>
      </View>
    </View>

    // </WaveBackground>
  );
};

export default BREApproved;

const styles = StyleSheet.create({
  BREApproved: {
    padding: 50,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  BREApprovedContainer: {
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
  },
  DescitptionText: {
    color: Colors.Black,
    fontFamily: APP_FONTS.Medium,
    fontSize: useFontNormalise(11),
  },
  BREApprovedText: {
    color: Colors.Black,
    fontFamily: APP_FONTS.Roboto_SemiBold,
    fontSize: useFontNormalise(18),
    marginVertical: '5%',
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
