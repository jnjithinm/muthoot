import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { RouteProp, useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { View, Text, TouchableOpacity } from 'react-native';

import {
  useAddEmploymentDetails,
  useGetEmploymentDetails,
  useGetCreditToSubmitDetails,
} from 'api/ReactQuery/Employment';
import { AddEmploymentDetailsRequest } from 'api/ReactQuery/Employment/types';
import { useGetBRE3Status } from 'api/ReactQuery/RuleEngineApi';
import { GetBRE3StatusRequest } from 'api/ReactQuery/RuleEngineApi/types';
import { useGetPincode } from 'api/ReactQuery/Lead';
import WaveBackground from 'components/WaveBackground';
import Button from 'components/Button';
import LabeledTextInput from 'components/LabeledTextInput';
import { ErrorObject, applicantTypeObect } from 'config/Types';
import { RootStackParamList } from 'navigation/HomeStack';
import { useApplicantDetails } from 'context/useApplicantDetails';
import useActive from 'hooks/useActive';
import styles from './styles';
import LoanSummaryButton from 'components/LoanSummaryButton';
import LabelDropdown from 'components/LabelDropdown ';
import { applicantType } from 'api/ReactQuery';
import { usedViewStatus } from 'context/useViewStatus';
import Modal from 'components/Modal';
import useShowFlashMessage from 'hooks/useShowFlashMessage';
import {APP_FONTS, FONT_SIZE} from 'config/Fonts';

type EmploymentDetailsNavigationProp = StackNavigationProp<
  RootStackParamList,
  'EmploymentDetails'
>;

type EmploymentDetailsRouteProp = RouteProp<
  RootStackParamList,
  'EmploymentDetails'
>;

interface EmploymentDetailsScreenProps {
  navigation: EmploymentDetailsNavigationProp;
  route: EmploymentDetailsRouteProp;
}

const EmploymentDetails: FC<EmploymentDetailsScreenProps> = ({
  navigation,
  route,
}) => {
  // const [AddLead, {data: AddLeadData, isLoading: AddLeadIsLoading}] =
  //   useAddLead(requestAdd);

  const { applicantId, guarantorId, isGuarantor } = useApplicantDetails();
  // var applicantId = 'MU111695'
  const { useViewStatus, SaveViewStatus, } = usedViewStatus();
  const GetCriffResponse = route?.params?.GetCriffResponse;

  const [isError, setIsError] = useState<ErrorObject[]>([]);
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const [isErrorGuarantor, setIsErrorGuarantor] = useState<ErrorObject[]>([]);
  const [isChangedGuarantor, setIsChangedGuarantor] = useState<boolean>(false);
  const [selectedApplicantId, setSelectedApplicantId] =
    useState<string>(applicantId);
  const [selectedApplicantType, setSelectedApplicantType] =
    useState<applicantType>('mainApplicant');
  const [applicantTypes, setApplicantTypes] = useState<applicantTypeObect[]>([
    { applicantId, applicantType: 'mainApplicant' },
  ]);
  const [companyName, setCompanyName] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [pincode, setPincode] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedState, setSelectedState] = useState<string>('');
  const [stabilityYears, setStabilityYears] = useState<string>('');
  const [stabilityMonths, setStabilityMonths] = useState<string>('');
  const [isOpenStabilityMonths, setIsOpenStabilityMonths] =
    useState<boolean>(false);
  const [stateCode, setStateCode] = useState<string>('');
  const [cityCode, setCityCode] = useState<string>('');
  const [landmark, setLandmark] = useState<string>('');
  const [district, setDistrict] = useState<string>('');
  const [postOffice, setPostOffice] = useState<string>('');
  const [postOfficeOpen, setpostOfficeOpen] = useState<boolean>(false);
  const [postOfficeId, setPostOfficeId] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [isOpenPostOffice, setIsOpenPostOffice] = useState<boolean>(false);
  const [companyNameGuarantor, setCompanyNameGuarantor] = useState<string>('');
  const [addressGuarantor, setAddressGuarantor] = useState<string>('');
  const [pincodeGuarantor, setPincodeGuarantor] = useState<string>('');
  const [selectedCityGuarantor, setSelectedCityGuarantor] =
    useState<string>('');
  const [selectedStateGuarantor, setSelectedStateGuarantor] =
    useState<string>('');
  const [stabilityYearsGuarantor, setStabilityYearsGuarantor] =
    useState<string>('');
  const [stabilityMonthsGuarantor, setStabilityMonthsGuarantor] =
    useState<string>('');
  const [isOpenStabilityMonthsGuarantor, setIsOpenStabilityMonthsGuarantor] =
    useState<boolean>(false);
  const [stateCodeGuarantor, setStateCodeGuarantor] = useState<string>('');
  const [cityCodeGuarantor, setCityCodeGuarantor] = useState<string>('');
  const [landmarkGuarantor, setLandmarkGuarantor] = useState<string>('');
  const [districtGuarantor, setDistrictGuarantor] = useState<string>('');
  const [postOfficeGuarantor, setPostOfficeGuarantor] = useState<string>('');
  const [postOfficeOpenGuarantor, setpostOfficeOpenGuarantor] =
    useState<boolean>(false);
  const [postOfficeIdGuarantor, setPostOfficeIdGuarantor] =
    useState<string>('');
  const [phoneNumberGuarantor, setPhoneNumberGuarantor] = useState<string>('');
  const [isOpenPostOfficeGuarantor, setIsOpenPostOfficeGuarantor] =
    useState<boolean>(false);
  const [popupVisible, setPopUPVisible] = useState<boolean>(false);
  const [popupMsg, setPopUPMsg] = useState<string>('');
  const [isNextEnable, setIsNextEnable] = useState<boolean>(false);
  const [isRejected, setIsRejected] = useState<boolean>(false);
  const [isViewOnly, setIsViewOnly] = useState<boolean>(false);
  const [dob, setDob] = useState<any>('');
  const [dobForGuranter, setDobForGuranter] = useState<any>('');
  const [popupMsgVisible, setPopUPMsgVisible] = useState<boolean>(false);
  const [isMainApplicantFreez, setIsMainApplicantFreez] = useState<boolean>(false);

  const getAge = (birthDate: string) => Math.floor((new Date().getTime() - new Date(birthDate).getTime()) / 3.15576e+10);

  const AddEmploymentDetailsRequest: AddEmploymentDetailsRequest = {
    appId: applicantId,
    companyName,
    // constitution,
    stabilityMonths,
    stabilityYears,
    pincode,
    phoneNo: phoneNumber,
    landmark,
    district,
    state: selectedState,
    city: selectedCity,
    stateId: Number(stateCode),
    cityId: Number(cityCode),
    address,
    postoffice: postOffice,
    applicantType: 'mainApplicant',
  };

  const AddEmploymentDetailsGuarantorRequest: AddEmploymentDetailsRequest = {
    appId: guarantorId,
    companyName: companyNameGuarantor,
    // constitution,
    stabilityMonths: stabilityMonthsGuarantor,
    stabilityYears: stabilityYearsGuarantor,
    pincode: pincodeGuarantor,
    phoneNo: phoneNumberGuarantor,
    landmark: landmarkGuarantor,
    district: districtGuarantor,
    state: selectedStateGuarantor,
    city: selectedCityGuarantor,
    stateId: Number(stateCodeGuarantor),
    cityId: Number(cityCodeGuarantor),
    address: addressGuarantor,
    postoffice: postOfficeGuarantor,
    applicantType: 'guarantor',
  };

  const [
    AddEmploymentDetails,
    { data: AddEmploymentDetailsData, isLoading: AddEmploymentDetailsIsLoading },
  ] = useAddEmploymentDetails(
    selectedApplicantType === 'mainApplicant'
      ? AddEmploymentDetailsRequest
      : AddEmploymentDetailsGuarantorRequest,
  );

  const [
    GetEmploymentDetailsMainApplicant,
    {
      data: GetEmploymentDetailsDataMainApplicant,
      isLoading: GetEmploymentDetailsIsLoadingMainApplicant,
    },
  ] = useGetEmploymentDetails(applicantId, 'mainApplicant');

  const [
    GetEmploymentDetailsGuarantor,
    {
      data: GetEmploymentDetailsDataGuarantor,
      isLoading: GetEmploymentDetailsIsLoadingGuarantor,
    },
  ] = useGetEmploymentDetails(guarantorId, 'guarantor');

  const [
    GetCreditToSubmitDetails,
    {
      data: GetCreditToSubmitDetailsData,
      isLoading: GetCreditToSubmitDetailsIsLoading,
    },
  ] = useGetCreditToSubmitDetails(`${applicantId}/mainApplicant`);

  const GetBRE3StatusRequest: GetBRE3StatusRequest = {
    appId: applicantId,
    guarantorId: guarantorId,
  };

  const [
    GetBRE3Status,
    { data: GetBRE3StatusData, isLoading: GetBRE3StatusIsLoading },
  ] = useGetBRE3Status(GetBRE3StatusRequest);

  const [GetPincode, { data: GetPincodeData, isLoading: GetPincodeIsLoading }] =
    useGetPincode(pincode);

  const [
    GetPincodeGuarantor,
    { data: GetPincodeDataGuarantor, isLoading: GetPincodeIsLoadingGuarantor },
  ] = useGetPincode(pincodeGuarantor);

  useEffect(() => {
    GetEmploymentDetailsMainApplicant.mutateAsync();
    GetEmploymentDetailsGuarantor.mutateAsync();
    GetCreditToSubmitDetails.mutateAsync();
  }, []);

  useEffect(() => {

    if (
      guarantorId &&
      applicantTypes.length < 2 &&
      GetEmploymentDetailsDataMainApplicant?.isGuarantorPresent === true
    ) {
      let finalApplicantTypes: applicantTypeObect[] = [
        ...applicantTypes,
        {
          applicantId: guarantorId,
          applicantType: 'guarantor',
        },
      ];
      setApplicantTypes(finalApplicantTypes);
    }
  }, [guarantorId, GetEmploymentDetailsDataMainApplicant]);

  useEffect(() => {
    if (GetCreditToSubmitDetailsData) {
      console.log(",kkkkkkkkk", GetCreditToSubmitDetailsData);

      setPopUPVisible(GetCreditToSubmitDetailsData.isPopUpVisible);
      setPopUPMsg(GetCreditToSubmitDetailsData.mesaage || '');
      setIsNextEnable(GetCreditToSubmitDetailsData.isNextEnable);
      setIsRejected(GetCreditToSubmitDetailsData.isRejected);
      SaveViewStatus({
        isSubmitToCreditFreeze:
          GetCreditToSubmitDetailsData.isSubmitToCreditFreeze,
      });
    }
  }, [GetCreditToSubmitDetailsData]);

  useEffect(() => {
console.log("emppppppp",GetEmploymentDetailsDataMainApplicant);

    if (
      GetEmploymentDetailsDataMainApplicant &&
      GetEmploymentDetailsDataMainApplicant
      // selectedApplicantType == 'mainApplicant'
    ) {
      console.log("GetEmploymentDetailsDataMainApplicant", GetEmploymentDetailsDataMainApplicant);

      setAddress(GetEmploymentDetailsDataMainApplicant.address || '');
      setCompanyName(GetEmploymentDetailsDataMainApplicant.companyName || '');
      setDistrict(GetEmploymentDetailsDataMainApplicant.district || '');
      // setConsistution(GetEmploymentDetailsData.constitution || '');
      setLandmark(GetEmploymentDetailsDataMainApplicant.landmark || '');
      setPhoneNumber(GetEmploymentDetailsDataMainApplicant.phoneNo || '');
      setPincode(GetEmploymentDetailsDataMainApplicant.pincode || '');
      setPostOffice(GetEmploymentDetailsDataMainApplicant.postoffice || '');
      setStabilityMonths(
        GetEmploymentDetailsDataMainApplicant.stabilityMonths || '',
      );
      setStabilityYears(
        GetEmploymentDetailsDataMainApplicant.stabilityYears || '',
      );
      setDob(GetEmploymentDetailsDataMainApplicant.dob || '',)
      setIsMainApplicantFreez(!GetEmploymentDetailsDataMainApplicant.isEmployed)
      // GetEmploymentDetailsDataMainApplicant.isNextEnable &&
    } else if (
      GetEmploymentDetailsDataGuarantor &&
      GetEmploymentDetailsDataGuarantor
      // selectedApplicantType === 'guarantor'
    ) {
      console.log("guranterrrr", GetEmploymentDetailsDataGuarantor);

      setAddressGuarantor(GetEmploymentDetailsDataGuarantor.address || '');
      setCompanyNameGuarantor(
        GetEmploymentDetailsDataGuarantor.companyName || '',
      );
      setDistrictGuarantor(GetEmploymentDetailsDataGuarantor.district || '');
      setLandmarkGuarantor(GetEmploymentDetailsDataGuarantor.landmark || '');
      setPhoneNumberGuarantor(GetEmploymentDetailsDataGuarantor.phoneNo || '');
      setPincodeGuarantor(GetEmploymentDetailsDataGuarantor.pincode || '');
      setPostOfficeGuarantor(
        GetEmploymentDetailsDataGuarantor.postoffice || '',
      );
      setDobForGuranter(GetEmploymentDetailsDataGuarantor.dob || '',)

      setStabilityMonthsGuarantor(
        GetEmploymentDetailsDataGuarantor.stabilityMonths || '',
      );
      setStabilityYearsGuarantor(
        GetEmploymentDetailsDataGuarantor.stabilityYears || '',
      );
    }

  }, [
    selectedApplicantType,
    GetEmploymentDetailsDataMainApplicant,
    GetEmploymentDetailsDataGuarantor,
  ]);

  useEffect(() => {
    if (GetBRE3StatusData && GetCreditToSubmitDetailsData) {

      if (
        GetBRE3StatusData.bre3status === 'Bre3_Approved' ||
        GetBRE3StatusData.bre3status === 'Bre3_Manual'
      ) {
        GetCreditToSubmitDetailsData.isNextEnable &&
          navigation.navigate('SanctionLetter');
      } else if (GetBRE3StatusData.bre3status === 'Bre3_Rejected') {
        if (GetCriffResponse)
          GetCreditToSubmitDetailsData.isNextEnable &&
            navigation.navigate('LoanRejected', {
              GetCriffResponse,
            });
      } else {
        GetCreditToSubmitDetailsData.isNextEnable &&
          navigation.navigate('SanctionLetter');
      }
    }
  }, [GetCreditToSubmitDetailsData]);

  useEffect(() => {
    if (GetBRE3StatusData && isNextEnable) {
      if (
        GetBRE3StatusData.bre3status === 'Bre3_Approved' ||
        GetBRE3StatusData.bre3status === 'Bre3_Manual'
      ) {
        navigation.navigate('SanctionLetter');
      } else if (GetBRE3StatusData.bre3status === 'Bre3_Rejected') {
        if (GetCriffResponse)
          navigation.navigate('LoanRejected', {
            GetCriffResponse,
          });
      } else {
        navigation.navigate('SanctionLetter');
      }
    } else if (!isNextEnable) {
      GetCreditToSubmitDetails.mutateAsync();
    }
  }, [GetBRE3StatusData, GetCriffResponse]);

  useEffect(() => {
    if (useViewStatus) {
      // console.log("hhhhhhh",JSON.stringify(useViewStatus, null, 4));

      setIsViewOnly(useViewStatus?.isSubmitToCreditFreeze ? true : false);
    }
  }, [useViewStatus]);

  useEffect(() => {
    if (AddEmploymentDetailsData) {
      console.log("mjjjjj", companyNameGuarantor, AddEmploymentDetailsData, isGuarantor);
      selectedApplicantType == 'guarantor' ?
        setIsChangedGuarantor(false) :
        setIsChanged(false)
      isGuarantor ? selectedApplicantType == 'guarantor' ?
        GetBRE3Status.mutateAsync() :
        (companyNameGuarantor ? null : setPopUPMsgVisible(true))
        : GetBRE3Status.mutateAsync()
    }
  }, [AddEmploymentDetailsData]);

  useEffect(() => {
    if (pincode) {
      if (pincode.length === 6) {
        GetPincode.mutateAsync();
      } else {
        setSelectedCity('');
        setCityCode('');
        setDistrict('');
        setSelectedState('');
        setStateCode('');
      }
    }
  }, [pincode]);

  useEffect(() => {
    if (pincodeGuarantor) {
      if (pincodeGuarantor.length === 6) {
        GetPincodeGuarantor.mutateAsync();
      } else {
        setSelectedCityGuarantor('');
        setCityCodeGuarantor('');
        setDistrictGuarantor('');
        setSelectedStateGuarantor('');
        setStateCodeGuarantor('');
      }
    }
  }, [pincodeGuarantor]);

  useEffect(() => {
    if (GetPincodeData) {
      setSelectedCity(GetPincodeData.city || '');
      setCityCode(GetPincodeData.cityCode || '');
      setDistrict(GetPincodeData.city || '');
      setSelectedState(GetPincodeData.state || '');
      setStateCode(GetPincodeData.stateCode || '');
    }
  }, [GetPincodeData]);
  useEffect(() => {
    if (GetPincodeDataGuarantor) {
      setSelectedCityGuarantor(GetPincodeDataGuarantor.city || '');
      setCityCodeGuarantor(GetPincodeDataGuarantor.cityCode || '');
      setDistrictGuarantor(GetPincodeDataGuarantor.city || '');
      setSelectedStateGuarantor(GetPincodeDataGuarantor.state || '');
      setStateCodeGuarantor(GetPincodeDataGuarantor.stateCode || '');
    }
  }, [GetPincodeDataGuarantor]);

  const PostOffceList: string[] = GetPincodeData
    ? GetPincodeData.postOfficeList.map(item => item.postOffice)
    : [];

  const PostOffceListGuarantor: string[] = GetPincodeDataGuarantor
    ? GetPincodeDataGuarantor.postOfficeList.map(item => item.postOffice)
    : [];

  const handleSubmit = () => {
    isChanged || isChangedGuarantor
      ? AddEmploymentDetails.mutateAsync()
      : navigation.navigate('SanctionLetter');
  };

  useEffect(() => {
    if (postOfficeOpen) {
      setIsOpenStabilityMonths(false);
    }
  }, [postOfficeOpen]);

  useEffect(() => {
    if (isOpenStabilityMonths) {
      setpostOfficeOpen(false);
    }
  }, [isOpenStabilityMonths]);

  useEffect(() => {
    if (stabilityYears) {
      var datearray = dob.split("-");
      var newdate = datearray[2] + '-' + datearray[1] + '-' + datearray[0];
      var age = getAge(newdate)
      var months: Number = (Number(stabilityYears) * 12) + Number(stabilityMonths)
      var year: Number = Math.ceil(Number(months) / 12)
      // console.log("mmmmmm", age, stabilityYears, year);


      Number(year) > Number(age) ? setStabilityMonths('') : null;
      //  Number(year)> Number(age) ? setYearSincePermanent('') : null;
      Number(year) > Number(age) ?
        useShowFlashMessage(
          'warning',
          `User can't enter higher residing stability duration greater than age`,
        ) : null
    }
  }, [stabilityYears, stabilityMonths]);

  useEffect(() => {
    if (stabilityYearsGuarantor) {
      var datearray = dobForGuranter.split("-");
      var newdate = datearray[2] + '-' + datearray[1] + '-' + datearray[0];
      var age = getAge(newdate)
      var months: Number = (Number(stabilityYearsGuarantor) * 12) + Number(stabilityMonthsGuarantor)
      var year: Number = Math.ceil(Number(months) / 12)
      // console.log("mmmmmm", age, stabilityYearsGuarantor, monthSincePermanent, year);


      Number(year) > Number(age) ? setStabilityMonthsGuarantor('') : null;
      //  Number(year)> Number(age) ? setYearSincePermanent('') : null;
      Number(year) > Number(age) ?
        useShowFlashMessage(
          'warning',
          `User can't enter higher residing stability duration greater than age`,
        ) : null
    }
  }, [stabilityYearsGuarantor, stabilityMonthsGuarantor]);

  const activeArray = [
    companyName,
    address,
    pincode,
    phoneNumber,
    postOffice,
    selectedCity,
    selectedState,
    district,
    // stabilityMonths,
    // stabilityYears,
  ];

  const activeArrayGuarantor = [
    companyNameGuarantor,
    addressGuarantor,
    pincodeGuarantor,
    phoneNumberGuarantor,
    postOfficeGuarantor,
    selectedCityGuarantor,
    selectedStateGuarantor,
    districtGuarantor,
    // stabilityMonthsGuarantor,
    // stabilityYearsGuarantor,
  ];

  let isActive: boolean = useActive(activeArray);
  let hasError: boolean = isError.some(error => error.hasError === true);

  let isActiveGurantor: boolean = useActive(activeArrayGuarantor);
  let hasErrorGuarantor: boolean = isErrorGuarantor.some(
    error => error.hasError === true,
  );

  // console.log('valuess', isMainApplicantFreez);

  return (
    <WaveBackground
      loading={[
        AddEmploymentDetailsIsLoading,
        GetEmploymentDetailsIsLoadingGuarantor,
        GetEmploymentDetailsIsLoadingMainApplicant,
        GetBRE3StatusIsLoading,
        GetCreditToSubmitDetailsIsLoading
      ]}
      title={'Employment Details'}>
      <Modal
        buttonTitle="Okay"
        title=""
        status="normal"
        message={popupMsg}
        visible={popupVisible}
        onClose={() => {
          setPopUPVisible(false);
          navigation.replace('LoanSummary')
        }}
        credit
        isRejected={isRejected}
      />
      <Modal
        buttonTitle="Okay"
        title=""
        status="normal"
        message={'To proceed, kindly fill out the Guarantor Employment details'}
        visible={popupMsgVisible}
        onClose={() => {
          setPopUPMsgVisible(false);
        }}

      />
      <View style={[styles.containerApplicantTypes]}>
        {applicantTypes.length > 1 &&
          applicantTypes.map((item, index: number) => (
            <TouchableOpacity
              onPress={() => {
                setSelectedApplicantType(item.applicantType);
                setSelectedApplicantId(item.applicantId);
              }}
              key={index}
              style={[
                styles.cardContainer,
                [selectedApplicantId === item?.applicantId && styles.selected],
              ]}
              disabled={selectedApplicantId === item.applicantId}>
              <Text style={styles.applicantText}>
                {item.applicantType === 'mainApplicant'
                  ? 'Main-Applicant'
                  : 'Guarantor'}
              </Text>
              <Text style={styles.appIdText}>{item.applicantId}</Text>
            </TouchableOpacity>
          ))}
      </View>
      {selectedApplicantType === 'mainApplicant' && isMainApplicantFreez ? 
      <Text style={{color: 'red', fontSize: FONT_SIZE.m, fontFamily: APP_FONTS.Medium}}>
        {'Since the Main-Applicant is unemployed, the fields below are disabled. Please proceed to filling Guarantor employment details mandatorily'}
        </Text>: null}
      {selectedApplicantType === 'mainApplicant' ? (
        <LabeledTextInput
          label="Company Name"
          defaultValue={companyName}
          setErrorFlag={setIsError}
          IsErrorArray={isError}
          key={1}
          autoCapitalize="words"
          onChange={setCompanyName}
          isChange={setIsChanged}
          disabled={
            isMainApplicantFreez ? isMainApplicantFreez :
            isViewOnly &&
            GetEmploymentDetailsDataMainApplicant?.companyName != undefined
          }
          mandatory
        />
      ) : (
        <LabeledTextInput
          label="Company Name"
          defaultValue={companyNameGuarantor}
          setErrorFlag={setIsErrorGuarantor}
          key={2}
          IsErrorArray={isErrorGuarantor}
          autoCapitalize="words"
          onChange={setCompanyNameGuarantor}
          isChange={setIsChangedGuarantor}
          disabled={
            isViewOnly &&
            GetEmploymentDetailsDataGuarantor?.companyName != undefined
          }
          mandatory
        />
      )}
      {selectedApplicantType === 'mainApplicant' ? (
        <LabeledTextInput
          label="Address"
          defaultValue={address}
          key={3}
          setErrorFlag={setIsError}
          IsErrorArray={isError}
          autoCapitalize="words"
          onChange={setAddress}
          isChange={setIsChanged}
          applicantType={selectedApplicantType}
          disabled={
            isMainApplicantFreez ? isMainApplicantFreez :
            isViewOnly &&
            GetEmploymentDetailsDataMainApplicant?.address != undefined
          }
          mandatory
        />
      ) : (
        <LabeledTextInput
          label="Address"
          defaultValue={addressGuarantor}
          key={4}
          setErrorFlag={setIsErrorGuarantor}
          IsErrorArray={isErrorGuarantor}
          autoCapitalize="words"
          onChange={setAddressGuarantor}
          isChange={setIsChangedGuarantor}
          disabled={
            isViewOnly &&
            GetEmploymentDetailsDataGuarantor?.address != undefined
          }
          mandatory
        />
      )}
      {selectedApplicantType === 'mainApplicant' ? (
        <LabeledTextInput
          label="Phone Number"
          defaultValue={phoneNumber}
          key={5}
          setErrorFlag={setIsError}
          IsErrorArray={isError}
          onChange={setPhoneNumber}
          isChange={setIsChanged}
          maxLength={10}
          disabled={
            isMainApplicantFreez ? isMainApplicantFreez :
            isViewOnly &&
            GetEmploymentDetailsDataMainApplicant?.phoneNo != undefined
          }
          mandatory
          NumberPad
        />
      ) : (
        <LabeledTextInput
          label="Phone Number"
          defaultValue={phoneNumberGuarantor}
          key={6}
          setErrorFlag={setIsErrorGuarantor}
          IsErrorArray={isErrorGuarantor}
          onChange={setPhoneNumberGuarantor}
          isChange={setIsChangedGuarantor}
          maxLength={10}
          disabled={
            isViewOnly &&
            GetEmploymentDetailsDataGuarantor?.phoneNo != undefined
          }
          mandatory
          NumberPad
        />
      )}
      {selectedApplicantType === 'mainApplicant' ? (
        <LabeledTextInput
          label="Pincode"
          defaultValue={pincode}
          key={7}
          setErrorFlag={setIsError}
          IsErrorArray={isError}
          onChange={setPincode}
          maxLength={6}
          isChange={setIsChanged}
          disabled={
            isMainApplicantFreez ? isMainApplicantFreez :
            isViewOnly &&
            GetEmploymentDetailsDataMainApplicant?.pincode != undefined
          }
          NumberPad
          mandatory
        />
      ) : (
        <LabeledTextInput
          label="Pincode"
          defaultValue={pincodeGuarantor}
          key={8}
          setErrorFlag={setIsErrorGuarantor}
          IsErrorArray={isErrorGuarantor}
          onChange={setPincodeGuarantor}
          maxLength={6}
          isChange={setIsChangedGuarantor}
          disabled={
            isViewOnly &&
            GetEmploymentDetailsDataGuarantor?.pincode != undefined
          }
          NumberPad
          mandatory
        />
      )}
      {selectedApplicantType === 'mainApplicant' ? (
        <LabelDropdown
          label="Post Office"
          setSelectedOption={setPostOffice}
          key={9}
          setSelectedItem={() => { }}
          open={isOpenPostOffice}
          setDropdownOpen={setIsOpenPostOffice}
          defaultValue={postOffice}
          options={PostOffceList}
          isChange={setIsChanged}
          // applicantType={selectedApplicantType}
          zIndex={isOpenPostOffice ? 1000 : 0}
          disabled={
            isMainApplicantFreez ? isMainApplicantFreez :
            isViewOnly &&
            GetEmploymentDetailsDataMainApplicant?.postoffice != undefined
          }
          mandatory
        />
      ) : (
        <LabelDropdown
          label="Post Office"
          setSelectedOption={setPostOfficeGuarantor}
          key={10}
          setSelectedItem={() => { }}
          open={isOpenPostOfficeGuarantor}
          setDropdownOpen={setIsOpenPostOfficeGuarantor}
          defaultValue={postOfficeGuarantor}
          options={PostOffceListGuarantor}
          isChange={setIsChangedGuarantor}
          // applicantType={selectedApplicantType}
          zIndex={isOpenPostOfficeGuarantor ? 1000 : 0}
          disabled={
            isViewOnly &&
            GetEmploymentDetailsDataGuarantor?.postoffice != undefined
          }
          mandatory
        />
      )}
      {selectedApplicantType === 'mainApplicant' ? (
        <LabeledTextInput
          label="City"
          autoCapitalize="sentences"
          onChange={setSelectedCity}
          key={11}
          defaultValue={selectedCity}
          setErrorFlag={setIsError}
          IsErrorArray={isError}
          isChange={setIsChanged}
          applicantType={selectedApplicantType}
          disabled={
            isMainApplicantFreez ? isMainApplicantFreez :
            GetPincodeData?.city ? true : false ||
              isViewOnly &&
              GetEmploymentDetailsDataMainApplicant?.city != undefined
          }
          mandatory
        />
      ) : (
        <LabeledTextInput
          label="City"
          autoCapitalize="sentences"
          onChange={setSelectedCityGuarantor}
          key={12}
          defaultValue={selectedCityGuarantor}
          setErrorFlag={setIsErrorGuarantor}
          IsErrorArray={isErrorGuarantor}
          isChange={setIsChangedGuarantor}
          disabled={
            GetPincodeDataGuarantor?.city ? true : false ||
              isViewOnly && GetEmploymentDetailsDataGuarantor?.city != undefined
          }
          mandatory
        />
      )}
      {selectedApplicantType === 'mainApplicant' ? (
        <LabeledTextInput
          label="District"
          autoCapitalize="sentences"
          key={13}
          onChange={setDistrict}
          defaultValue={district}
          setErrorFlag={setIsError}
          IsErrorArray={isError}
          isChange={setIsChanged}
          disabled={
            isMainApplicantFreez ? isMainApplicantFreez :
            GetPincodeData?.city ? true : false ||
              isViewOnly &&
              GetEmploymentDetailsDataMainApplicant?.district != undefined
          }
          mandatory
        />
      ) : (
        <LabeledTextInput
          label="District"
          autoCapitalize="sentences"
          onChange={setDistrictGuarantor}
          defaultValue={districtGuarantor}
          setErrorFlag={setIsErrorGuarantor}
          IsErrorArray={isErrorGuarantor}
          isChange={setIsChangedGuarantor}
          key={14}
          disabled={
            GetPincodeDataGuarantor?.city ? true : false ||
              isViewOnly &&
              GetEmploymentDetailsDataGuarantor?.district != undefined
          }
          mandatory
        />
      )}
      {selectedApplicantType === 'mainApplicant' ? (
        <LabeledTextInput
          label="State"
          autoCapitalize="sentences"
          onChange={setSelectedState}
          key={15}
          defaultValue={selectedState}
          setErrorFlag={setIsError}
          IsErrorArray={isError}
          isChange={setIsChanged}
          disabled={
            isMainApplicantFreez ? isMainApplicantFreez :
            GetPincodeData?.city ? true : false ||
              isViewOnly &&
              GetEmploymentDetailsDataMainApplicant?.state != undefined
          }
          mandatory
        />
      ) : (
        <LabeledTextInput
          label="State"
          autoCapitalize="sentences"
          onChange={setSelectedStateGuarantor}
          key={16}
          defaultValue={selectedStateGuarantor}
          setErrorFlag={setIsErrorGuarantor}
          IsErrorArray={isErrorGuarantor}
          isChange={setIsChangedGuarantor}
          disabled={
            GetPincodeDataGuarantor?.city ? true : false ||
              isViewOnly && GetEmploymentDetailsDataGuarantor?.state != undefined
          }
          mandatory
        />
      )}

      {/* <View>
        <View style={{ marginHorizontal: 10, marginTop: 20 }}>
          <Text style={styles.SameAsText}>Stability</Text>
        </View>
        {selectedApplicantType === 'mainApplicant' ? (
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <LabeledTextInput
              label="Year"
              onChange={setStabilityYears}
              defaultValue={stabilityYears}
              key={17}
              setErrorFlag={setIsError}
              IsErrorArray={isError}
              isChange={setIsChanged}
              maxLength={2}
              disabled={
                isViewOnly &&
                GetEmploymentDetailsDataMainApplicant?.stabilityYears !=
                undefined
              }
              NumberPad
              halfSize
              mandatory
            />

            <LabelDropdown
              label="Month"
              key={18}
              setSelectedOption={setStabilityMonths}
              halfSize
              options={[
                '0',
                '1',
                '2',
                '3',
                '4',
                '5',
                '6',
                '7',
                '8',
                '9',
                '10',
                '11',
              ]}
              defaultValue={stabilityMonths}
              open={isOpenStabilityMonths}
              setDropdownOpen={setIsOpenStabilityMonths}
              setSelectedItem={() => { }}
              isChange={setIsChanged}
              mandatory
              disabled={
                isViewOnly &&
                GetEmploymentDetailsDataMainApplicant?.stabilityMonths !=
                undefined
              }
              dropDownDirection="TOP"
              zIndex={isOpenStabilityMonths ? 1000 : 0}
            />
          </View>
        ) : (
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <LabeledTextInput
              label="Year"
              onChange={setStabilityYearsGuarantor}
              defaultValue={stabilityYearsGuarantor}
              setErrorFlag={setIsErrorGuarantor}
              key={19}
              IsErrorArray={isErrorGuarantor}
              isChange={setIsChangedGuarantor}
              maxLength={2}
              disabled={
                isViewOnly &&
                GetEmploymentDetailsDataGuarantor?.stabilityYears != undefined
              }
              NumberPad
              halfSize
              mandatory
            />

            <LabelDropdown
              label="Month"
              setSelectedOption={setStabilityMonthsGuarantor}
              halfSize
              options={[
                '0',
                '1',
                '2',
                '3',
                '4',
                '5',
                '6',
                '7',
                '8',
                '9',
                '10',
                '11',
              ]}
              defaultValue={stabilityMonthsGuarantor}
              key={20}
              open={isOpenStabilityMonthsGuarantor}
              setDropdownOpen={setIsOpenStabilityMonthsGuarantor}
              setSelectedItem={() => { }}
              isChange={setIsChangedGuarantor}
              mandatory
              disabled={
                isViewOnly &&
                GetEmploymentDetailsDataGuarantor?.stabilityMonths != undefined
              }
              dropDownDirection="TOP"
              zIndex={isOpenStabilityMonthsGuarantor ? 1000 : 0}
            />
          </View>
        )}
      </View> */}

      <Button
        text={
          (selectedApplicantType === 'mainApplicant' && isChanged) ||
            (selectedApplicantType === 'guarantor' && isChangedGuarantor)
            ? 'Save'
            : 'Next'
        }
        active={
          (isChanged && isActive && !hasError) ||
          (isChangedGuarantor && isActiveGurantor && !hasErrorGuarantor) ||
          isNextEnable
        }
        onPress={handleSubmit}
        marginTop={20}
        marginVertical={10}
      />
      <LoanSummaryButton onPress={() => navigation.replace('LoanSummary')} />
    </WaveBackground>
  );
};
export default EmploymentDetails;
