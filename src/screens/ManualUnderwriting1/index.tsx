import React, {FC, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp, useFocusEffect} from '@react-navigation/native';

import Icon from 'components/Icon';
import Colors from 'config/Colors';
import {APP_FONTS, FONT_SIZE} from 'config/Fonts';
import useFontNormalise from 'hooks/useFontNormalise';
import {RootStackParamList} from 'navigation/HomeStack';
import MyStatusBar from 'components/StatusBar';
import {useApplicantDetails} from 'context/useApplicantDetails';
import LoanSummaryButton from 'components/LoanSummaryButton';
import {useCKYCData} from 'context/useCKYCData';

type ManualUnderwritingNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ManualUnderwriting1'
>;
type ManualUnderwritingRouteProp = RouteProp<
  RootStackParamList,
  'ManualUnderwriting1'
>;

interface ManualUnderwritingScreenProps {
  navigation: ManualUnderwritingNavigationProp;
  route: ManualUnderwritingRouteProp;
}

const ManualUnderwriting: FC<ManualUnderwritingScreenProps> = ({
  navigation,
  route,
}) => {
  const GetCriffResponse = route?.params?.GetCriffResponse;
  const isNavigateLoanOffer = route?.params?.isNavigateLoanOffer;
  const isGuarantorMandatory = route?.params?.isGuarantorMandatory;
  // console.log("isGuarantorMandatory", isGuarantorMandatory);

  const [circleSize] = useState(new Animated.Value(50));
  const {applicantId} = useApplicantDetails();
  const {CKYCData} = useCKYCData();
  const startAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(circleSize, {
          toValue: 200, // Maximum circle size (adjust as needed)
          duration: 1000, // Duration of increasing animation in milliseconds
          useNativeDriver: false, // Set to true if possible to use the native driver for performance
        }),
        Animated.timing(circleSize, {
          toValue: 50, // Back to the initial circle size
          duration: 800, // Duration of decreasing animation in milliseconds
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
    <>
      <MyStatusBar backgroundColor={Colors.Secondary} />
      <Animated.View
        style={[
          styles.ManualUnderwritingContainer,
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
          style={[
            styles.ManualUnderwriting,
            {width: circleSize, height: circleSize},
          ]}>
          <Icon name="manual-underwriting" />
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
        <Text style={styles.ManualUnderwritingText}>Manual Underwriting</Text>
        <Text style={styles.MessageText}>
          Congratulations! Your profile seems to fit our requirements, however
          we would need to do some additional checks. Please share some
          additional details for us to be able to give you an offer!
        </Text>
        <View
          style={{
            backgroundColor: Colors.White,
            elevation: 4,
            paddingVertical: 5,
            paddingHorizontal: 10,
            marginVertical: '5%',
            // alignItems: 'center',
            // alignSelf: 'center',
            marginHorizontal: 5,
            width: '85%',
            borderRadius: 20,
            shadowColor: 'rgba(0, 0, 0, 0.3)',
          }}>
          <RenderLabelsValues
            label="Applicant ID"
            value={GetCriffResponse?.applicantId || applicantId}
          />
          {GetCriffResponse && (
            <>
              <RenderLabelsValues
                label={'Applicant Name'}
                value={GetCriffResponse?.applicantName || ''}
              />
              <RenderLabelsValues
                label={
                  CKYCData?.isPanAvailable
                    ? 'Applicant PAN'
                    : 'Applicant Aadhar'
                }
                value={GetCriffResponse?.docNumber || ''}
              />
              <RenderLabelsValues
                label="Applicant Type"
                value={
                  GetCriffResponse?.applicantType == 'mainApplicant'
                    ? 'Main-Applicant'
                    : 'Guarantor'
                }
              />
            </>
          )}
        </View>
        <View style={{width: '110%'}}>
          <TouchableOpacity
            style={{
              backgroundColor: Colors.Button,
              paddingVertical: 10,
              alignSelf: 'center',
              marginTop: '3%',
              borderRadius: 7,
              width: '90%',
              marginVertical: 10,
            }}
            onPress={() => {
              isNavigateLoanOffer
                ? navigation.navigate('LoanOffer')
                : GetCriffResponse?.applicantType == 'guarantor' &&
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
    </>

    // </WaveBackground>
  );
};

export default ManualUnderwriting;

const styles = StyleSheet.create({
  ManualUnderwriting: {
    padding: 50,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ManualUnderwritingContainer: {
    backgroundColor: 'rgba(239,139,51,0.08)',
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
  ManualUnderwritingText: {
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
