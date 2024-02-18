import React, { FC, useCallback, useEffect, useState, useRef } from 'react';
import { RouteProp, useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import WaveBackground from 'components/WaveBackground';
import { ErrorObject } from 'config/Types';
import { useApplicantDetails } from 'context/useApplicantDetails';
import { RootStackParamList } from 'navigation/HomeStack';
import { APP_FONTS, FONT_SIZE } from 'config/Fonts';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import Icon from 'components/Icon';
import useFontNormalise from 'hooks/useFontNormalise';
import Modal from 'components/Modal';
import Button from 'components/Button';

import Colors from 'config/Colors';
type AccountAgregatorsNavigationProp = StackNavigationProp<
  RootStackParamList,
  'AccountAgregators'
>;
type AccountAgregatorsRouteProp = RouteProp<RootStackParamList, 'AccountAgregators'>;

interface AccountAgregatorsScreenProps {
  navigation: AccountAgregatorsNavigationProp;
  route: AccountAgregatorsRouteProp;
}



const AccountAgregators: FC<AccountAgregatorsScreenProps> = ({ navigation, route }) => {
  const { applicantId } = useApplicantDetails();

  const [isConsent, setIsConsent] = useState<boolean>(false);
  const [TCPopup, setTCPopup] = useState<boolean>(false);





  return (
    <WaveBackground loading={[]} title={'Account Aggregator'}>
      <Modal
        onClose={() => {
          setTCPopup(false);
        }}
        visible={TCPopup}
        status={'normal'}
        buttonTitle="I agree"
        tc
      />
      <View style={{ flex: 1, backgroundColor: 'transparent' }}>

        <Text style={{ fontFamily: APP_FONTS.Roboto_Regular, fontSize: FONT_SIZE.m, marginTop: 20, color: Colors.Black }}>
          Now allow us to fetch your latest Bank
          Statement securely for faster approval
          through account aggregators (AA),
          RBI Licensed activity.
        </Text>

        <Text style={{ fontFamily: APP_FONTS.Roboto_Regular, fontSize: FONT_SIZE.m, marginTop: 30, color: Colors.Black }}>
          Kindly note that the loan monitoring
          consent will only be used post loan
          disbursal.
        </Text>

        <Image
          source={require('../../assets/images/AA.png')}
          style={{ alignSelf: 'center', marginTop: 60, marginBottom: 60 }}
        />

        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 10,
            marginTop: 30,
            marginBottom: 25,
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: 'red',
            width: '100%'
          }}>
          <TouchableOpacity style={{ width: '10%' }} onPress={() => setIsConsent(!isConsent)}>
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
          <Text style={{
            color: Colors.Black,
            fontSize: FONT_SIZE.m,
            width: '90%',
            marginLeft: 5,
            fontFamily: APP_FONTS.Roboto_Regular,
          }}>
            {`Consent to Fetch Data & Agree to the  `}
            <Text style={{ color: 'blue' }}
              onPress={() => {
                setTCPopup(true)
              }}
            //  Linking.openURL('https://creditwisecapital.com/terms-conditions-for-using-account-aggregators/')}
            >
              Terms & Conditions
            </Text>
          </Text>
        </View>
        <Button
          text={'Submit'}
          active={isConsent}
          onPress={() => {
            // handleSubmit();
            navigation.navigate("OneMoney")

          }}
        />

      </View>


    </WaveBackground>
  );
};
export default AccountAgregators;
