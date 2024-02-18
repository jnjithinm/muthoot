import React, { FC, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import Modal from 'components/Modal';
import Icon from 'components/Icon';
import Colors from 'config/Colors';
import { APP_FONTS, FONT_SIZE } from 'config/Fonts';
import useFontNormalise from 'hooks/useFontNormalise';
import { RootStackParamList } from 'navigation/HomeStack';
import MyStatusBar from 'components/StatusBar';
import { useApplicantDetails } from 'context/useApplicantDetails';
import { useCKYCData } from 'context/useCKYCData';
import { ConvertToPrefixedAadharNumber } from 'config/Functions/ConvertToPrefix';

type LoanRejectedNavigationProp = StackNavigationProp<
  RootStackParamList,
  'LoanRejected'
>;
type LoanRejectedRouteProp = RouteProp<RootStackParamList, 'LoanRejected'>;

interface LoanRejectedScreenProps {
  navigation: LoanRejectedNavigationProp;
  route: LoanRejectedRouteProp;
}

const LoanRejected: FC<LoanRejectedScreenProps> = ({ navigation, route }) => {
  const GetCriffResponse = route?.params?.GetCriffResponse;
  const message = route?.params?.message || '';
  const popup = route?.params?.popup;

  const { applicantId } = useApplicantDetails();
  const [circleSize] = useState(new Animated.Value(50));
  const { CKYCData } = useCKYCData();
  const [popupVisible, setPopUPVisible] = useState<boolean>(false);
  const [popupMsg, setPopUPMsg] = useState<string>('');

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        return true;
      },
    );
    return () => {
      backHandler.remove();
    };
  }, []);

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
    if (popup) {
      console.log("lll", popup);
      setPopUPMsg(message)
      setPopUPVisible(popup)
    }
  }, [popup]);

  useEffect(() => {
    startAnimation();
  }, []);

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
        paddingHorizontal: 10,
        width: 'auto',
      }}>
      <Text style={styles.leadLabel}>{label}</Text>
      <Text style={styles.labelText}>{value}</Text>
    </View>
  );
  return (
    // <WaveBackground PureScreen>
    <View style={{ flex: 1, backgroundColor: Colors.Secondary }}>
      <MyStatusBar backgroundColor={Colors.Secondary} />
      <Modal
        buttonTitle="Okay"
        title="Loan Rejected"
        status="normal"
        message={popupMsg}
        visible={popupVisible}
        isLoanRejected
        onClose={() => {
          setPopUPVisible(false);
        }}
      />
      <Animated.View
        style={[
          styles.LoanRejectedContainer,
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
            styles.LoanRejected,
            { width: circleSize, height: circleSize },
          ]}>
          <Icon name="loan-rejected" />
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
        <Text style={styles.LoanRejectedText}>Loan Rejected</Text>
        <Text style={styles.MessageText}>
          Sorry! We will not be able to proceed with your profile at this point!
          However you could still apply 3 months later to get an offer.
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
            <RenderLabelsValues
              label="Applicant Name"
              value={GetCriffResponse?.applicantName || ''}
            />
          )}
          {GetCriffResponse && (
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
          )}
          {GetCriffResponse && (
            <RenderLabelsValues
              label="Applicant Type"
              value={
                GetCriffResponse?.applicantType == 'mainApplicant'
                  ? 'Main-Applicant'
                  : 'Guarantor' || ''
              }
            />
          )}
        </View>

        <View style={{ width: '110%',}}>
          <TouchableOpacity
            style={{
              backgroundColor: Colors.LightGrey,
              paddingVertical: 10,
              alignSelf: 'center',
              // marginTop: '10%',
              borderRadius: 7,
              width: '90%',
              marginVertical: 10,
            }}
            onPress={() => {
              setPopUPVisible(true)
            }}>
            <Text
              style={{
                color: Colors.Button,
                fontFamily: APP_FONTS.Roboto_Medium,
                textAlign: 'center',
                fontSize: useFontNormalise(16),
                alignItems: 'center',
              }}>
              Reason
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: Colors.LightGrey,
              paddingVertical: 10,
              alignSelf: 'center',
              // marginTop: '10%',
              borderRadius: 7,
              width: '90%',
              marginVertical: 10,
            }}
            onPress={() => {
              navigation.navigate('LeadManagement');
            }}>
            <Text
              style={{
                color: Colors.Button,
                fontFamily: APP_FONTS.Roboto_Medium,
                textAlign: 'center',
                fontSize: useFontNormalise(16),
                alignItems: 'center',
              }}>
              Back To Dashboard
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>

    // </WaveBackground>
  );
};

export default LoanRejected;

const styles = StyleSheet.create({
  LoanRejected: {
    padding: 50,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  LoanRejectedContainer: {
    backgroundColor: 'rgba(233, 34, 21, 0.08)',
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
  LoanRejectedText: {
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
