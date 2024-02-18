import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
import {RouteProp, useFocusEffect} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import WaveBackground from 'components/WaveBackground';
import Button from 'components/Button';
import {RootStackParamList} from 'navigation/HomeStack';
import {
  TouchableOpacity,
  View,
  Text,
  Animated,
  LayoutAnimation,
  Easing,
} from 'react-native';
import Colors from 'config/Colors';
import useFontNormalise from 'hooks/useFontNormalise';
import Icon from 'components/Icon';
import {useApplicantDetails} from 'context/useApplicantDetails';
//import LabeledDropdown from 'components/LabelDropdown ';
import LabeledTextInput from 'components/LabeledTextInput';
import {ErrorObject} from 'config/Types';
import LoanSummaryButton from 'components/LoanSummaryButton';
import {
  useGetFamilyNonFamilyDetails,
  useGetRelationshipMaster,
  useSaveFamilyNonFamilyDetails,
} from 'api/ReactQuery/Relationship';
import {
  GetRelationshipMasterRequest,
  SaveFamilyNonFamilyDetailsRequest,
} from 'api/ReactQuery/Relationship/types';
import useActive from 'hooks/useActive';
import LabelDropdown from 'components/LabelDropdown ';
import { usedViewStatus } from 'context/useViewStatus';

type ReferencesNavigationProp = StackNavigationProp<
  RootStackParamList,
  'References'
>;

type ReferencesRouteProp = RouteProp<RootStackParamList, 'References'>;

interface ReferencesScreenProps {
  navigation: ReferencesNavigationProp;
  route: ReferencesRouteProp;
}

const References: FC<ReferencesScreenProps> = ({navigation, route}) => {
  // const [AddLead, {data: AddLeadData, isLoading: AddLeadIsLoading}] =
  //   useAddLead(requestAdd);

  const {applicantId,isMainApplicant, SetMainApplicant} = useApplicantDetails();
    const {useViewStatus} = usedViewStatus();
    const [isViewOnly, setIsViewOnly] = useState<boolean>(false);
    
  const [isErrorFamily, setIsErrorFamily] = useState<ErrorObject[]>([]);
  const [isErrorNonFamily, setIsErrorNonFamily] = useState<ErrorObject[]>([]);
  const [isChangedFamily, setIsChangedFamily] = useState<boolean>(false);
  const [isChangedNonFamily, setIsChangedNonFamily] = useState<boolean>(false);
  const [relationshipFamily, setRelationshipFamily] = useState<string>('');
  const [nameFamily, setNameFamily] = useState<string>('');
  const [mobileNumberFamily, setMobileNumberFamily] = useState<string>('');
  const [relationshipNonFamily, setRelationshipNonFamily] =
    useState<string>('');
  const [nameNonFamily, setNameNonFamily] = useState<string>('');
  const [mobileNumberNonFamily, setMobileNumberNonFamily] =
    useState<string>('');
  const [isExpandedFamilyReference, setIsExpandedFamilyReference] =
    useState<boolean>(false);
  const [isExpandedNonFamilyReference, setIsExpandedNonFamilyReference] =
    useState<boolean>(false);
  const [isRenderFamilySubmit, setIsRenderFamilySubmit] =
    useState<boolean>(true);
  const [isRenderNonFamilyReference, setIsRenderNonFamilyReference] =
    useState<boolean>(false);
  const [isOpenRelationshipFamily,setIsOpenRelationshipFamily]=useState<boolean>(false);
  const [isOpenRelationshipNonFamily,setIsOpenRelationshipNonFamily]=useState<boolean>(false);
  const GetFamilyRelationshipMasterRequest: GetRelationshipMasterRequest = {
    relationType: 'family',
    isDelete: false,
  };

  const GetNonFamilyRelationshipMasterRequest: GetRelationshipMasterRequest = {
    relationType: 'non_family',
    isDelete: false,
  };

  const [
    GetFamilyRelationshipMaster,
    {
      data: GetFamilyRelationshipMasterData,
      isLoading: GetFamilyRelationshipMasterIsLoading,
    },
  ] = useGetRelationshipMaster(GetFamilyRelationshipMasterRequest);

  const [
    GetNonFamilyRelationshipMaster,
    {
      data: GetNonFamilyRelationshipMasterData,
      isLoading: GetNonFamilyRelationshipMasterIsLoading,
    },
  ] = useGetRelationshipMaster(GetNonFamilyRelationshipMasterRequest);

  const [
    GetFamilyNonFamilyReferences,
    {
      data: GetFamilyNonFamilyReferencesData,
      isLoading: GetFamilyNonFamilyReferencesIsLoading,
    },
  ] = useGetFamilyNonFamilyDetails({appId: applicantId});

  useEffect(() => {
    GetFamilyRelationshipMaster.mutateAsync();
    GetNonFamilyRelationshipMaster.mutateAsync();
    GetFamilyNonFamilyReferences.mutateAsync();
  }, []);

  const SaveFamilyReferencesRequest: SaveFamilyNonFamilyDetailsRequest = {
    appId: applicantId,
    familyMobileNumber: mobileNumberFamily,
    familyRelationName: relationshipFamily,
    familyRelationType: 'family',
    familyNameOfRelative: nameFamily,
  };

  const SaveNonFamilyReferencesRequest: SaveFamilyNonFamilyDetailsRequest = {
    appId: applicantId,

    nonFamilyMobileNumber: mobileNumberNonFamily,
    nonFamilyNameOfRelative: nameNonFamily,
    nonFamilyRelationName: relationshipNonFamily,
    nonFamilyRelationType: 'non_family',
  };

  const [
    SaveFamilyReferences,
    {data: SaveFamilyReferencesData, isLoading: SaveFamilyReferencesIsLoading},
  ] = useSaveFamilyNonFamilyDetails(SaveFamilyReferencesRequest);

  const [
    SaveNonFamilyReferences,
    {
      data: SaveNonFamilyReferencesData,
      isLoading: SaveNonFamilyReferencesIsLoading,
    },
  ] = useSaveFamilyNonFamilyDetails(SaveNonFamilyReferencesRequest);

  useEffect(() => {
    if (SaveFamilyReferencesData) {
      if (SaveFamilyReferencesData.appId) {
        setIsExpandedFamilyReference(false);
        setIsRenderNonFamilyReference(true);
        setIsRenderFamilySubmit(false);
        setIsExpandedNonFamilyReference(true);
      }
    }
  }, [SaveFamilyReferencesData]);

  useEffect(() => {
    if (SaveNonFamilyReferencesData) {
      SaveNonFamilyReferencesData.appId &&
        navigation.navigate('EmploymentDetails');
    }
  }, [SaveNonFamilyReferencesData]);

  useEffect(() => {
    if (GetFamilyNonFamilyReferencesData) {
      setRelationshipFamily(
        GetFamilyNonFamilyReferencesData.familyRelationName || '',
      );
      setMobileNumberFamily(
        GetFamilyNonFamilyReferencesData.familyMobileNumber || '',
      );
      setNameFamily(GetFamilyNonFamilyReferencesData.familyRelativeName || '');
      setRelationshipNonFamily(
        GetFamilyNonFamilyReferencesData.nonFamilyRelationName || '',
      );
      setMobileNumberNonFamily(
        GetFamilyNonFamilyReferencesData.nonFamilyMobileNumber || '',
      );
      setNameNonFamily(
        GetFamilyNonFamilyReferencesData.nonFamilyRelativeName || '',
      );
      if (
        GetFamilyNonFamilyReferencesData.familyRelativeName &&
        GetFamilyNonFamilyReferencesData.nonFamilyRelativeName &&
        GetFamilyNonFamilyReferencesData.familyRelationName
      ) {
        setIsExpandedFamilyReference(true);
        setIsRenderFamilySubmit(false);
        setIsRenderNonFamilyReference(true);
        setIsExpandedNonFamilyReference(true);
        setIsChangedFamily(false);
        setIsChangedNonFamily(false);
      }
    }
  }, [GetFamilyNonFamilyReferencesData]);

  const RelationshipFamilyOptions = GetFamilyRelationshipMasterData
    ? GetFamilyRelationshipMasterData.map(item => item.relationName)
    : [];

  const RelationshipNonFamilyOptions = GetNonFamilyRelationshipMasterData
    ? GetNonFamilyRelationshipMasterData.map(item => item.relationName)
    : [];

  const slideAnimationFamilyRef = useRef(new Animated.Value(0)).current;
  const slideAnimationNonFamilyRef = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    !isExpandedFamilyReference &&
      !isExpandedNonFamilyReference &&
      setIsExpandedFamilyReference(true);
  }, [
    isExpandedFamilyReference,
    isExpandedNonFamilyReference,
    GetFamilyRelationshipMasterIsLoading,
    GetFamilyNonFamilyReferencesIsLoading,
  ]);

  useEffect(() => {
    if (useViewStatus) {
      setIsViewOnly( useViewStatus?.isSubmitToCreditFreeze ? true : false);
    }
  }, []);

  useEffect(() => {
    if (isExpandedFamilyReference) {
      Animated.timing(slideAnimationFamilyRef, {
        toValue: 1,
        duration: 300, // Adjust the duration as needed
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnimationFamilyRef, {
        toValue: 0,
        duration: 500, // Adjust the duration as needed
        useNativeDriver: true,
      }).start();
    }
  }, [isExpandedFamilyReference]);

  const containerHeight = useState(new Animated.Value(0))[0];

  type ReferenceBundleTypes = {
    referenceType: 'Family Reference' | 'Non-Family Reference';
  };

  const targetHeight =
    isExpandedFamilyReference || isExpandedNonFamilyReference ? 330 : 0;

  // Animate the container height when the expanded state changes
  Animated.timing(containerHeight, {
    toValue: targetHeight,
    duration: 800,
    easing: Easing.linear,
    useNativeDriver: false,
  }).start();

  const animationConfig = {
    duration: 700, // You can adjust the animation duration as needed
    create: {
      type: LayoutAnimation.Types.linear,
      property: LayoutAnimation.Properties.opacity,
    },
    update: {
      type: LayoutAnimation.Types.spring,
      springDamping: 0.7,
    },
  };

  const handleContainerPress = () => {
    LayoutAnimation.configureNext(animationConfig);
    isExpandedFamilyReference &&
      setIsExpandedFamilyReference(!isExpandedFamilyReference);
    setIsExpandedNonFamilyReference(!isExpandedNonFamilyReference);
  };

  useEffect(() => {
    if (isChangedFamily) {
      setIsRenderFamilySubmit(true);
      setIsRenderNonFamilyReference(false);
      setIsExpandedNonFamilyReference(false);
    }
  }, [isChangedFamily]);

  const handleFinalSubmit = () => {
    if (!isMainApplicant) {

      SetMainApplicant(true);
    }
    isChangedNonFamily
      ? SaveNonFamilyReferences.mutateAsync()
      : navigation.navigate('EmploymentDetails');
  };

  const handleSubmitFamily = () => {
    SaveFamilyReferences.mutateAsync();
  };
  const activeArrayFamily = [
    nameFamily,
    relationshipFamily,
    mobileNumberFamily,
  ];
  const activeArrayNonFamily = [
    nameNonFamily,
    relationshipNonFamily,
    mobileNumberNonFamily,
  ];

  let isActiveFamily: boolean = useActive(activeArrayFamily);
  let isActiveNonFamily: boolean = useActive(activeArrayNonFamily);
  let hasErrorFamily: boolean = isErrorFamily.some(
    error => error.hasError === true,
  );
  let hasErrorNonFamily: boolean = isErrorNonFamily.some(
    error => error.hasError === true,
  );
  return (
    <WaveBackground
      loading={[
        GetFamilyNonFamilyReferencesIsLoading,
        SaveNonFamilyReferencesIsLoading,
        SaveFamilyReferencesIsLoading,
        GetFamilyNonFamilyReferencesIsLoading,
        GetNonFamilyRelationshipMasterIsLoading,
        GetFamilyRelationshipMasterIsLoading,
      ]}
      title={'References'}>
      <View style={{marginTop: '5%'}}>
        <>
          <TouchableOpacity
            style={{
              marginTop: 15,
              borderRadius: 8,
              overflow: 'hidden',
              justifyContent: 'center',
              height: 'auto',
              paddingVertical: 12,
              backgroundColor: Colors.White,
            }}
            
            onPress={() => {
              setIsExpandedFamilyReference(!isExpandedFamilyReference);
              setIsExpandedNonFamilyReference(false);
            }}
            disabled={isViewOnly || !isActiveFamily || hasErrorFamily}>
            <View
              style={{
                paddingHorizontal: 30,
                paddingVertical: 7,
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    color: Colors.UpdateTexDarkBlue,
                    fontSize: useFontNormalise(15),
                  }}>
                  {'Family Reference'}{' '}
                </Text>
                <Icon name="pointed-star" />
              </View>
              {isExpandedFamilyReference ? (
                <Icon name="minus" />
              ) : (
                <Icon name="add" />
              )}
            </View>
            {isExpandedFamilyReference && (
              <Animated.View style={{height: containerHeight}}>
                <LabelDropdown
                  label={'Relationship'}
                  options={RelationshipFamilyOptions}
                  isChange={setIsChangedFamily}
                  setSelectedOption={setRelationshipFamily}
                  defaultValue={relationshipFamily}
                  open={isOpenRelationshipFamily}
                  setDropdownOpen={setIsOpenRelationshipFamily}
                  setSelectedItem={()=>{}}
                  zIndex={isOpenRelationshipFamily?1000:0}
                  disabled={isViewOnly}
                />
                <LabeledTextInput
                  label="Name"
                  setErrorFlag={setIsErrorFamily}
                  IsErrorArray={isErrorFamily}
                  onChange={setNameFamily}
                  defaultValue={nameFamily}
                  isChange={setIsChangedFamily}
                  mandatory
                  disabled={isViewOnly}

                />

                <LabeledTextInput
                  label="Mobile Number"
                  setErrorFlag={setIsErrorFamily}
                  IsErrorArray={isErrorFamily}
                  onChange={setMobileNumberFamily}
                  defaultValue={mobileNumberFamily}
                  isChange={setIsChangedFamily}
                  mandatory
                  NumberPad
                  maxLength={10}
                  disabled={isViewOnly}

                />
              </Animated.View>
            )}
          </TouchableOpacity>
          {isRenderFamilySubmit && (
            <Button
              text={isChangedFamily ? 'Save' : 'Next'}
              active={isActiveFamily && !hasErrorFamily}
              onPress={handleSubmitFamily}
              marginTop={60}
            />
          )}
        </>

        {isRenderNonFamilyReference && (
          <>
            <TouchableOpacity
              style={{
                borderRadius: 8,
                overflow: 'hidden',
                justifyContent: 'center',
                height: 'auto',
                marginTop: 15,
                backgroundColor: Colors.White,
              }}
              disabled={isViewOnly}
              onPress={() => {
                setIsExpandedNonFamilyReference(!isExpandedNonFamilyReference);
                setIsExpandedFamilyReference(false);
              }}>
              <View
                style={{
                  paddingHorizontal: 30,
                  paddingVertical: 20,
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      color: Colors.UpdateTexDarkBlue,
                      fontSize: useFontNormalise(15),
                    }}>
                    {'Non-Family Reference'}{' '}
                  </Text>
                  <Icon name="pointed-star" />
                </View>
                {isExpandedNonFamilyReference ? (
                  <Icon name="minus" />
                ) : (
                  <Icon name="add" />
                )}
              </View>
              {isExpandedNonFamilyReference && (
                <Animated.View style={{height: containerHeight}}>
                  <LabelDropdown
                    label={'Relationship'}
                    options={RelationshipNonFamilyOptions}
                    setSelectedOption={setRelationshipNonFamily}
                    isChange={setIsChangedNonFamily}
                    defaultValue={relationshipNonFamily}
                    open={isOpenRelationshipNonFamily}
                    setDropdownOpen={setIsOpenRelationshipNonFamily}
                    setSelectedItem={()=>{}}
                    zIndex={isOpenRelationshipNonFamily?1000:0}
                    mandatory
                    disabled={isViewOnly}

                  />

                  <LabeledTextInput
                    label="Name"
                    setErrorFlag={setIsErrorNonFamily}
                    IsErrorArray={isErrorNonFamily}
                    onChange={setNameNonFamily}
                    defaultValue={nameNonFamily}
                    isChange={setIsChangedNonFamily}
                    mandatory
                    disabled={isViewOnly}

                  />
                  <LabeledTextInput
                    label="Mobile Number"
                    setErrorFlag={setIsErrorNonFamily}
                    IsErrorArray={isErrorNonFamily}
                    onChange={setMobileNumberNonFamily}
                    defaultValue={mobileNumberNonFamily}
                    isChange={setIsChangedNonFamily}
                    NumberPad
                    mandatory
                    maxLength={10}
                    disabled={isViewOnly}

                  />
                </Animated.View>
              )}
            </TouchableOpacity>
            <Button
              text={isChangedNonFamily ? 'Save' : 'Next'}
              active={
                isActiveFamily &&
                isActiveNonFamily &&
                !hasErrorFamily &&
                !hasErrorNonFamily
              }
              onPress={handleFinalSubmit}
              marginTop={30}
              marginVertical={10}
            />
          </>
        )}
      </View>

      <LoanSummaryButton onPress={()=>navigation.replace('LoanSummary')} />
    </WaveBackground>
  );
};
export default References;
