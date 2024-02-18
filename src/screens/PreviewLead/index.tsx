import React, { FC, useEffect, useState } from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { TouchableOpacity, View, Text } from 'react-native';

import { useSaveorUpdateLead } from 'api/ReactQuery/Lead';
import WaveBackground from 'components/WaveBackground';
import Button from 'components/Button';

import DetailTile from 'components/DetailTile';
import Modal from 'components/Modal';
import Icon from 'components/Icon';
import { APP_FONTS } from 'config/Fonts';
import Colors from 'config/Colors';
import {
  ConvertToPrefixedAadharNumber,
  ConvertToPrefixedAmountWithRupee,
} from 'config/Functions/ConvertToPrefix';
import { useApplicantDetails } from 'context/useApplicantDetails';
import useFontNormalise from 'hooks/useFontNormalise';
import { RootStackParamList } from 'navigation/HomeStack';


type PreviewLeadNavigationProp = StackNavigationProp<
  RootStackParamList,
  'PreviewLead'
>;

type PreviewLeadRouteProp = RouteProp<RootStackParamList, 'PreviewLead'>;

interface PreviewLeadScreenProps {
  navigation: PreviewLeadNavigationProp;
  route: PreviewLeadRouteProp;
}

const PreviewLead: FC<PreviewLeadScreenProps> = ({ navigation, route }) => {
  // const [AddLead, {data: AddLeadData, isLoading: AddLeadIsLoading}] =
  //   useAddLead(requestAdd);
  const { isMainApplicant, SaveGuarantorId, SaveApplicantId, SetMainApplicant } =
    useApplicantDetails();
  const [isConsent, setIsConsent] = useState<boolean>(false);
  const [TCPopup, setTCPopup] = useState<boolean>(false);

  const isEdited = route?.params?.LeadRegistration.edited;
  const customerProfileValue = route?.params?.LeadRegistration.customerProfileValue;
  const SaveorUpdateLeadRequest = route?.params?.LeadRegistration.SaveorUpdateLeadRequest;

  // const [GetLead, { data: GetLeadData, isLoading: GetLeadDataIsLoading }] =
  //   useGetLead(applicantId);

  // console.log("previeewwwwww", JSON.stringify(SaveorUpdateLeadRequest, null, 4));
  
  const [SaveLead, { data: SaveLeadData, isLoading: SaveLeadIsLoading }] =
    useSaveorUpdateLead(SaveorUpdateLeadRequest);

  useEffect(() => {
    if (SaveLeadData && SaveLeadData?.appId) {
      setIsConsent(false);
      SaveApplicantId(SaveLeadData.appId);


      if (SaveLeadData.applicationCoApplicantId) {
        SaveGuarantorId(SaveLeadData.applicationCoApplicantId || '');
        SetMainApplicant(false);
      }

      navigation.navigate('OTPVerification');
    }
  }, [SaveLeadData]);

  useEffect(() => {
    if (customerProfileValue) {
      setIsConsent(false);
    }
  }, [customerProfileValue]);

  useEffect(() => {
    setIsConsent(false);
  }, []);

  const handleSubmit = () => {
    isEdited ? SaveLead.mutateAsync() : navigation.navigate('OTPVerification');
  };

  return (
    <WaveBackground loading={[SaveLeadIsLoading]} title={'Preview Lead'}>
      <Modal
        onClose={() => {
          setTCPopup(false);
        }}
        visible={TCPopup}
        status={'normal'}
        buttonTitle="I agree"
        tc
      />
      <View style={{ marginTop: '3%' }}>
        <View
          style={{
            elevation: 5,
            backgroundColor: Colors.White,
            borderRadius: 10,
            marginHorizontal: 12,
          }}>
          <View style={{ marginVertical: 15 }}>
            <DetailTile
              label="Name"
              value={SaveorUpdateLeadRequest?.name || ''}
            />
            <DetailTile
              label="Mobile Number"
              value={SaveorUpdateLeadRequest?.mobileNumber || ''}
            />
            <DetailTile
              label="E-mail ID"
              value={SaveorUpdateLeadRequest?.emailId || ''}
            />
            <DetailTile
              label="Gender"
              value={SaveorUpdateLeadRequest?.gender || ''}
            />
            <DetailTile
              label="Date Of Birth"
              value={SaveorUpdateLeadRequest?.dob || ''}
            />
            <DetailTile
              label="Customer Type"
              value={SaveorUpdateLeadRequest?.customerType}
            />
            <DetailTile
              label="Constitution Type"
              value={SaveorUpdateLeadRequest?.constitutionType || ''}
            />

            <DetailTile
              label="Customer Profile"
              value={customerProfileValue || ''}
            />

            <DetailTile
              label="Existing Type"
              value={SaveorUpdateLeadRequest?.existingCustomer}
            />
            {SaveorUpdateLeadRequest?.existingCustomer === 'Existing Employee' && (
              <DetailTile
                label="Employer Name"
                value={SaveorUpdateLeadRequest?.employeerName}
              />
            )}
            <DetailTile
              label="Alternate Contact"
              value={SaveorUpdateLeadRequest?.alternateContact}
            />

            <DetailTile
              label="Income Status"
              value={
                SaveorUpdateLeadRequest?.isEarning === 'Yes'
                  ? 'Earning'
                  : 'Not Earning'
              }
            />

            {!isMainApplicant ? (
              <DetailTile
                label="Relation"
                value={SaveorUpdateLeadRequest?.relationship || ''}
              />
            ) : (
              <>
                <DetailTile
                  label="Branch"
                  value={SaveorUpdateLeadRequest?.branch}
                />
              </>
            )}
            {SaveorUpdateLeadRequest?.isPanAvailable && (
              <DetailTile
                label="PAN"
                value={SaveorUpdateLeadRequest?.panNumber}
              />
            )}
            <DetailTile
              label="Aadhaar Number"
              value={ConvertToPrefixedAadharNumber(
                SaveorUpdateLeadRequest?.aadharNo || '',
              )}
            />
            {
              // SaveorUpdateLeadRequest?.isEarning === 'Yes' && 
              (
                <>
                  <DetailTile
                    label="Income (Monthly)"
                    value={ConvertToPrefixedAmountWithRupee(
                      SaveorUpdateLeadRequest?.income || '',
                    )}
                  />
                  <DetailTile
                    label="Job Stability (In Year)"
                    value={SaveorUpdateLeadRequest?.jobStabilityYear}
                  />
                    <DetailTile
                    label="Job Stability (In Month)"
                    value={SaveorUpdateLeadRequest?.jobStability}
                  />
                   
                </>
              )}
            <DetailTile
              label="Marital Status"
              value={SaveorUpdateLeadRequest?.maritalStatus}
            />
            {SaveorUpdateLeadRequest?.maritalStatus === 'Married' && (
              <DetailTile
                label="Spouse's Name"
                value={SaveorUpdateLeadRequest.spouseName}
              />
            )}
            <DetailTile
              label="Father's Name"
              value={SaveorUpdateLeadRequest?.fatherName}
            />
            <DetailTile
              label="Mother's Name"
              value={SaveorUpdateLeadRequest?.motherName}
            />
          </View>
        </View>
        {/* <View
          style={{
            width: '100%',
            backgroundColor: Colors.LightGrey,

            paddingVertical: 15,
            flexDirection: 'row',
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            paddingHorizontal: 15,
            justifyContent: 'flex-end',
          }}>
          <Text
            style={{
              fontSize: useFontNormalise(14),
              fontFamily: APP_FONTS.Roboto_SemiBold,
              color: Colors.BlueCore,
              marginRight: 15,
            }}>
            Edit needed ?
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('LeadRegistration');
            }}>
            <Icon name="edit-icon" />
          </TouchableOpacity>
        </View> */}
      </View>
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 10,
          marginTop: 35,
          marginBottom: 25,
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
        text={isEdited ? 'Submit' : 'Next'}
        active={isConsent}
        onPress={handleSubmit}
      />
    </WaveBackground>
  );
};
export default PreviewLead;
