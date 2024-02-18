import React, { FC, useEffect, useState, useRef } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { RouteProp, useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as Animatable from 'react-native-animatable';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

import {
  useGetApplicantDetailsByAadhar,
  useGetBranches,
  useGetCustomerProfile,
  useGetCustomerType,
  useGetLead,
} from 'api/ReactQuery/Lead';
import {
  GetApplicantDetailsByAadharRequest,
  SaveorUpdateLeadRequest,
} from 'api/ReactQuery/Lead/types';
import WaveBackground from 'components/WaveBackground';
import LabeledTextInput from 'components/LabeledTextInput';
import LabeledRadioButtonGroup from 'components/LabeledRadioButtonGroup';
import Button from 'components/Button';
import { DropdownObject, ErrorObject } from 'config/Types';
import Colors from 'config/Colors';
import { useApplicantDetails } from 'context/useApplicantDetails';
import Icon from 'components/Icon';
import {
  RemoveAadharPrefix,
  RemovePrefixes,
} from 'config/Functions/ConvertToPrefix';
import useActive from 'hooks/useActive';
import { RootStackParamList } from 'navigation/HomeStack';
import RadioButtonGroup from 'components/RadioButtonGroup';
import styles from './styles';
import setAllErrorsToFalse from 'config/Functions/SetAllErrorsToFalse';
import { useEmployeeDetails } from 'context/useEmployeeDetails';
import { useGetConstitution } from 'api/ReactQuery/Master';
import TextInput from 'components/TextInput';
import LabelDropdown from 'components/LabelDropdown ';
import LabeledDropdown from 'components/LabeledDropdown';

import useShowFlashMessage from 'hooks/useShowFlashMessage';
import FlashMessage from 'react-native-flash-message';

type LeadRegistrationNavigationProp = StackNavigationProp<
  RootStackParamList,
  'LeadRegistration'
>;
type LeadRegistrationRouteProp = RouteProp<
  RootStackParamList,
  'LeadRegistration'
>;

interface LeadRegistrationScreenProps {
  navigation: LeadRegistrationNavigationProp;
  route: LeadRegistrationRouteProp;
}

const LeadRegistration: FC<LeadRegistrationScreenProps> = ({
  navigation,
  route,
}) => {
  const {applicantId, guarantorId, isMainApplicant, SaveApplicantDetails } =
    useApplicantDetails();
  // var applicantId = "MU371767"
  const { employeeId } = useEmployeeDetails();
  const [isError, setIsError] = useState<ErrorObject[]>([]);
  const [selectedGender, setSelectedGender] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [middleName, setMiddleName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [mobileNumber, setMobileNumber] = useState<string>('');
  const [PANnumber, setPANnumber] = useState<string>('');
  const [aadharNumber, setAadharNumber] = useState<string>('');
  const [customerProfile, setCustomerProfile] = useState<string>('');
  const [customerProfileId, setCustomerProfileId] = useState<string>('');
  const [customerType, setCustomerType] = useState<string>('');
  const [customerTypeOpen, setCustomerTypeOpen] = useState<boolean>(false);
  const [constitutionType, setConstitutionType] = useState<string>('');
  const [isPAN, setIsPAN] = useState<string>('Yes');
  const [spouseName, setSpouseName] = useState<string>('');
  const [maritalStatus, setMaritalStatus] = useState<string>('');
  const [selectedBranch, setSelectedBranch] = useState<string>('');
  const [selectedExistingType, setSelectedExistingType] = useState<string>('');
  const [relationToMainApplicant, setRelationToMainApplicant] =
    useState<string>('');
  const [incomeStatus, setIncomeStatus] = useState<string>('Earning');
  const [fatherName, setFatherName] = useState<string>('');
  const [emailId, setEmailId] = useState<string>('');
  const [jobStability, setJobStability] = useState<string>('');
  const [jobStabilityYear, setJobStabilityYear] = useState<string>('');

  const [motherName, setMotherName] = useState<string>('');
  const [dateofbirth, setDateofBirth] = useState<string>('');
  const [monthlyIncome, setMonthlyIncome] = useState<string>('');
  const [employeeName, setEmployeeName] = useState<string>('');
  const [alternateContact, setAlternateContact] = useState<string>('');
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const [selectingCalendar, setSelectingCalendar] = useState<boolean>(false);
  const [dateOfBirthForCalendar, setDateofBirthForCalendar] = useState<any>('');
  const [tempdateOfBirth, setTempDateOfBirth] = useState<string>('');
  const [isOpenConstitution, setIsOpenConstitution] = useState<boolean>(false);
  const [isOpenCustomerProfile, setIsOpenCustomerProfile] =
    useState<boolean>(false);
  const [isOpenGender, setIsOpenGender] = useState<boolean>(false);
  const [isOpenMaritalStatus, setIsOpenMaritalStatus] =
    useState<boolean>(false);
  const [isOpenRelation, setIsOpenRelation] = useState<boolean>(false);
  const [isOpenBranch, setIsOpenBranch] = useState<boolean>(false);
  const [isOpenCustomerType, setIsOpenCustomerType] = useState<boolean>(false);

  const getAge = (birthDate: string) => Math.floor((new Date().getTime() - new Date(birthDate).getTime()) / 3.15576e+10);

  const [GetLead, { data: GetLeadData, isLoading: GetLeadIsLoading }] =
    useGetLead(`${applicantId}&applicantType=mainApplicant`,);

  const [
    GetLeadForGuarantor,
    { data: GetLeadDataGuarantor, isLoading: GetLeadIsGuarantorLoading },
  ] = useGetLead(`${applicantId}&applicantType=mainApplicant`,
  );

  useEffect(() => {
    if (GetLeadDataGuarantor) {

      GetLeadDataGuarantor.isMale === true && setSelectedGender('Male');
    }
  }, [GetLeadDataGuarantor]);

  useEffect(() => {
    if (jobStability || jobStabilityYear) {
      
      var datearray = dateofbirth.split("-");
      var newdate = datearray[2] + '-' + datearray[1] + '-' + datearray[0];
      var age = Number(getAge(newdate)) - Number(15)
      var year: Number = Math.ceil(Number(jobStability) / 12) + Math.ceil(Number(jobStabilityYear))
      
      console.log("yyyyyyyyyy",year);
      
      Number(year) > Number(age) ? setJobStability('') : null;
      Number(year) > Number(age) ? setJobStabilityYear('') : null;
      Number(year) <= Number(0) ? setJobStability('') : null;
      
      jobStability && Number(year) <= Number(0) ?
      useShowFlashMessage(
        'warning',
        `User cannot enter a duration of job stability less than 0 Month`,
      ) : null
      Number(year) > Number(age) ?
        useShowFlashMessage(
          'warning',
          `User can't enter higher job stability duration greater than age`,
        ) : null
    }
  }, [jobStability, jobStabilityYear]);

 
  const ResetValuesWithoutAadharNumber = () => {
    setFirstName('');
    setMiddleName('');
    setLastName('');
    setMobileNumber('');
    setSelectedGender('');
    setDateofBirth('');
    setCustomerProfile('');
    setTempDateOfBirth('');
    setIsPAN('Yes');
    setPANnumber('');
    setIncomeStatus('');
    setEmailId('');
    setMonthlyIncome('');
    setMaritalStatus('');
    setSpouseName('');
    setFatherName('');
    setMotherName('');
    setJobStability('');
    setJobStabilityYear('')
    setAlternateContact('');
    setSelectedExistingType('');
    setSelectedBranch('');
    setRelationToMainApplicant('');
  };

  useEffect(() => {
    if (applicantId) {
      if (!isMainApplicant) {
        ResetValuesWithoutAadharNumber();
        setAadharNumber('');
        GetLeadForGuarantor.mutateAsync();
        setIncomeStatus('Earning');
      } else {
        GetLead.mutateAsync();
      }
    }
  }, [applicantId]);

  const GetApplicantDetailsByAadharGuarantorRequest: GetApplicantDetailsByAadharRequest =
  {
    aadharNo: aadharNumber,
    appId: applicantId,
    applicantType: !isMainApplicant ? 'guarantor' : 'mainApplicant',
  };

  const GetApplicantDetailsByAadharRequest: GetApplicantDetailsByAadharRequest =
  {
    aadharNo: aadharNumber,
    applicantType: !isMainApplicant ? 'guarantor' : 'mainApplicant',
  };


  const [GetCustomerProfile, { data: GetCustomerProfileData }] =
    useGetCustomerProfile(`/${customerType}`);

  const [GetConstitution, { data: GetConstitutionData }] = useGetConstitution(`/${customerType}`);

  const [GetBranches, { data: GetBranchesData }] = useGetBranches(employeeId);
  const [GetCustomerType, { data: GetCustomerTypeData }] = useGetCustomerType();

  const [
    GetApplicantDetailsByAadhar,
    {
      data: GetApplicantDetailsByAadharData,
      isLoading: GetApplicantDetailsByAadharIsLoading,
    },
  ] = useGetApplicantDetailsByAadhar(
    !isMainApplicant
      ? GetApplicantDetailsByAadharGuarantorRequest
      : GetApplicantDetailsByAadharRequest,
  );

  useEffect(() => {
    GetBranches.mutateAsync();
    GetCustomerType.mutateAsync()
  }, []);



  useEffect(() => {
    if (constitutionType) {
      GetCustomerProfile.mutateAsync();
    }

  }, [constitutionType])

  useEffect(() => {
    if (customerType) {
      GetConstitution.mutateAsync();
    }

  }, [customerType])

  useEffect(() => {
    if (aadharNumber.length === 12) {
      GetApplicantDetailsByAadhar.reset();
      (!GetLeadData || !isMainApplicant) &&
        GetApplicantDetailsByAadhar.mutateAsync();
    } else {
      GetApplicantDetailsByAadharData && ResetValuesWithoutAadharNumber();
    }
  }, [aadharNumber]);

  useEffect(() => {
    if (
      GetApplicantDetailsByAadharData &&
      ((GetLeadDataGuarantor?.isMale === true &&
        (GetApplicantDetailsByAadharData?.gender === 'Male' ||
          !GetApplicantDetailsByAadharData?.gender)) ||
        GetLeadDataGuarantor?.isMale !== true ||
        !isMainApplicant)
    ) {
      console.log("GetApplicantDetailsByAadharData", GetApplicantDetailsByAadharData);

      setAllErrorsToFalse({ setIsError: setIsError, errorArray: isError });
      setFirstName(GetApplicantDetailsByAadharData.firstName || '');
      setMiddleName(GetApplicantDetailsByAadharData.middleName || '');
      setLastName(GetApplicantDetailsByAadharData.lastName || '');
      setMobileNumber(GetApplicantDetailsByAadharData.mobileNumber?.toString() || '');
      setSelectedGender(GetLeadDataGuarantor?.isMale === true ? 'Male' : GetApplicantDetailsByAadharData.gender || '');
      setTempDateOfBirth(GetApplicantDetailsByAadharData.dob || '');
      setDateofBirth(GetApplicantDetailsByAadharData.dob || '');
      setCustomerProfile(GetApplicantDetailsByAadharData.customerProfile || '');
      setConstitutionType(
        GetApplicantDetailsByAadharData.constitutionType || '',
      );
      setCustomerType(GetApplicantDetailsByAadharData.customerType || '');
      //  setIsPAN(GetApplicantDetailsByAadharData.isPanAvailable ? 'Yes' : 'No');
      setAlternateContact(
        GetApplicantDetailsByAadharData.alternateContact || '',
      );
      setEmployeeName(GetApplicantDetailsByAadharData.employeerName || '');
      setPANnumber(GetApplicantDetailsByAadharData.panNumber || '');
      setEmailId(GetApplicantDetailsByAadharData.emailId || '');
      setSelectedBranch(GetApplicantDetailsByAadharData.branch || '');
      setSelectedExistingType(
        GetApplicantDetailsByAadharData.existingCustomer || '',
      );
      // setAadharNumber(GetApplicantDetailsByAadharData.aadharNo || '');
      !isMainApplicant &&
        setRelationToMainApplicant(
          GetApplicantDetailsByAadharData.relationship || '',
        );
      setMonthlyIncome(GetApplicantDetailsByAadharData?.income || '');
      setMaritalStatus(GetApplicantDetailsByAadharData.maritalStatus || '');
      setSpouseName(GetApplicantDetailsByAadharData.spouseName || '');
      setFatherName(GetApplicantDetailsByAadharData.fatherName || '');
      setMotherName(GetApplicantDetailsByAadharData.motherName || '');
      setJobStability(GetApplicantDetailsByAadharData.jobStability || '');
      setJobStabilityYear(GetApplicantDetailsByAadharData.jobStabilityYear || '');
      setIncomeStatus(
        GetApplicantDetailsByAadharData.isEarning === 'Yes'
          ? 'Earning'
          : 'Not Earning',
      );
    }
    // else if (GetLeadDataGuarantor?.isMale === true && !isMainApplicant) {
    //   useShowFlashMessage(
    //     'warning',
    //     'Sorry, but we only accept male guarantors for this lead.',
    //   );
    // }
  }, [GetApplicantDetailsByAadharData]);

  const SaveorUpdateLeadRequest: SaveorUpdateLeadRequest = {
    firstName,
    middleName,
    lastName,
    name: middleName ? firstName + ' ' + middleName + ' ' + lastName : firstName + ' ' + lastName,
    mobileNumber: mobileNumber,
    customerProfile: customerProfileId,
    customerType:
    //  constitutionType == "Salaried Private" ? 'Salaried' : constitutionType == "Salaried Government" ? 'Salaried' : 
     constitutionType,
    jobStability,
    jobStabilityYear,
    alternateContact,
    employeerName: employeeName,
    isPanAvailable: isPAN === 'Yes' ? true : false,
    panNumber: PANnumber,
    aadharNo: RemoveAadharPrefix(aadharNumber),
    constitutionType,
    income: RemovePrefixes(monthlyIncome),
    applicationCoApplicantId: '',
    maritalStatus,
    fatherName,
    motherName,
    spouseName,
    emailId,
    dob: dateofbirth,
    gender: selectedGender,
    appId: applicantId || '',
    branch: selectedBranch,
    existingCustomer: selectedExistingType,
    applicantType: 'mainApplicant',
    isEarning: incomeStatus === 'Earning' ? 'Yes' : 'No',
    createdBy: employeeId,
  };

  const SaveorUpdateLeadRequestGuarantor: SaveorUpdateLeadRequest = {
    firstName,
    middleName,
    lastName,
    name: firstName + ' ' + middleName + ' ' + lastName,
    mobileNumber: mobileNumber,
    customerProfile: customerProfileId,
    customerType,
    jobStability,
    jobStabilityYear,
    alternateContact,
    employeerName: employeeName,
    isPanAvailable: isPAN === 'Yes' ? true : false,
    panNumber: PANnumber,
    aadharNo: RemoveAadharPrefix(aadharNumber),
    constitutionType,
    income: RemovePrefixes(monthlyIncome),
    applicationCoApplicantId: guarantorId || '',
    maritalStatus,
    fatherName,
    motherName,
    spouseName,
    emailId,
    dob: dateofbirth,
    gender: selectedGender,
    appId: applicantId || '',
    relationship: relationToMainApplicant,
    branch: selectedBranch,
    existingCustomer: selectedExistingType,
    applicantType: 'guarantor',
    isEarning: incomeStatus === 'Earning' ? 'Yes' : 'No',
    createdBy: employeeId,
  };

  const spouseNameRef = useRef<View & { fadeIn: Function; fadeOut: Function }>(
    null,
  );

  const PANnumberRef = useRef<View & { fadeIn: Function; fadeOut: Function }>(
    null,
  );

  const EmplyerNameRef = useRef<View & { fadeIn: Function; fadeOut: Function }>(
    null,
  );

  useEffect(() => {
    if (maritalStatus === 'Married') {
      spouseNameRef.current?.fadeIn(1000);
    } else {
      let filteredIsErrorArray = isError.filter(
        item => item.label !== 'Spouse Name',
      );
      setIsError(filteredIsErrorArray);
      spouseNameRef.current?.fadeOut(1000);
    }
  }, [maritalStatus]);

  useEffect(() => {
    if (isPAN === 'Yes') {
      PANnumberRef.current?.fadeIn(1000);
    } else {
      let filteredIsErrorArray = isError.filter(
        item => item.label !== 'PAN Number',
      );
      setIsError(filteredIsErrorArray);
      PANnumberRef.current?.fadeOut(1000);
    }
  }, [isPAN]);

  useEffect(() => {
    if (selectedExistingType === 'Existing Employee') {
      EmplyerNameRef.current?.fadeIn(1000);
    } else {
      let filteredIsErrorArray = isError.filter(
        item => item.label !== 'Employer Name',
      );
      setIsError(filteredIsErrorArray);
      EmplyerNameRef.current?.fadeOut(1000);
    }
  }, [selectedExistingType]);

  useEffect(() => {

    if (GetLeadData && isMainApplicant) {
      console.log("GetLeadData", JSON.stringify(GetLeadData, null, 4));

      setFirstName(GetLeadData.firstName || '');
      setMiddleName(GetLeadData.middleName || '');
      setLastName(GetLeadData.lastName || '');
      setMobileNumber(GetLeadData.mobileNumber || '');
      setSelectedGender(GetLeadData.gender || '');
      setTempDateOfBirth(GetLeadData.dob || '');
      setDateofBirth(GetLeadData.dob || '');
      setCustomerProfile(GetLeadData.customerProfile || '');
      setCustomerType(GetLeadData.customerType);
      setIsPAN(GetLeadData.isPanAvailable ? 'Yes' : 'No');
      setConstitutionType(GetLeadData.constitutionType || '');
      setPANnumber(GetLeadData.panNumber || '');
      setAadharNumber(GetLeadData.aadharNo || '');
      setEmailId(GetLeadData.emailId || '');
      setAlternateContact(GetLeadData.alternateContact || '');
      setEmployeeName(GetLeadData.employeerName || '');
      setMonthlyIncome(GetLeadData?.income || '');
      setMaritalStatus(GetLeadData.maritalStatus || '');
      setSpouseName(GetLeadData.spouseName || '');
      setFatherName(GetLeadData.fatherName || '');
      setMotherName(GetLeadData.motherName || '');
      setJobStability(GetLeadData.jobStability || '');
      setJobStabilityYear(GetLeadData.jobStabilityYear || '');
      setRelationToMainApplicant(GetLeadData.relationship || '');
      setSelectedExistingType(GetLeadData.existingCustomer || '');
      setSelectedBranch(GetLeadData.branch || '');
      setIncomeStatus(
        GetLeadData.isEarning === 'Yes' ? 'Earning' : 'Not Earning',
      );
    }
    else if (GetLeadData && !isMainApplicant) {
      console.log("GetLeadDataffffffffff", JSON.stringify(GetLeadData, null, 4));
      GetLeadData?.isMale === true && setSelectedGender('Male');
    }
    // }
  }, [GetLeadData,]);

  useEffect(() => {
    if (!isMainApplicant) {
      setIncomeStatus('Earning');
    }
  }, [isMainApplicant, incomeStatus]);

  useEffect(() => {
    if (!isMainApplicant) {
      setIncomeStatus('Earning');
    }
  }, [isMainApplicant, incomeStatus]);

  useEffect(() => {
    if (isOpenBranch) {
      setIsOpenConstitution(false);
      setIsOpenCustomerProfile(false);
      setIsOpenGender(false);
      setIsOpenCustomerType(false);
      setIsOpenRelation(false);
      setIsOpenMaritalStatus(false);
    }
  }, [isOpenBranch]);

  useEffect(() => {
    if (isOpenRelation) {
      setIsOpenConstitution(false);
      setIsOpenCustomerProfile(false);
      setIsOpenCustomerType(false);
      setIsOpenGender(false);
      setIsOpenBranch(false);
      setIsOpenMaritalStatus(false);
    }
  }, [isOpenRelation]);

  useEffect(() => {
    if (isOpenGender) {
      setIsOpenConstitution(false);
      setIsOpenCustomerProfile(false);
      setIsOpenRelation(false);
      setIsOpenCustomerType(false);
      setIsOpenBranch(false);
      setIsOpenMaritalStatus(false);
    }
  }, [isOpenGender]);

  useEffect(() => {
    if (isOpenConstitution) {
      setIsOpenGender(false);
      setIsOpenCustomerProfile(false);
      setIsOpenRelation(false);
      setIsOpenBranch(false);
      setIsOpenCustomerType(false);
      setIsOpenMaritalStatus(false);
    }
  }, [isOpenConstitution]);

  useEffect(() => {
    if (isOpenMaritalStatus) {
      setIsOpenGender(false);
      setIsOpenCustomerProfile(false);
      setIsOpenCustomerType(false);
      setIsOpenRelation(false);
      setIsOpenBranch(false);
      setIsOpenConstitution(false);
    }
  }, [isOpenMaritalStatus]);

  useEffect(() => {
    if (mobileNumber && aadharNumber) {
      SaveApplicantDetails(mobileNumber, aadharNumber);
    }
  }, [mobileNumber, aadharNumber]);

  useEffect(() => {
    if (customerProfile && GetCustomerProfileData) {
      // console.log("custtttttt");

      let profileidFinded = GetCustomerProfileData?.find(
        item => item.profile === customerProfile,
      )?.profileId;
      setCustomerProfileId(profileidFinded || '');
    }
  }, [customerProfile, GetCustomerProfileData]);

  const ondobChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || new Date();
    setSelectingCalendar(false);
    event.type == 'set' ? setTempDateOfBirth(event.type == 'set' ? moment(currentDate).format('DD-MM-YYYY') : '') : null
    event.type == 'set' ? setDateofBirth(event.type == 'set' ? moment(currentDate).format('DD-MM-YYYY') : '') : null
    event.type == 'set' ? setDateofBirthForCalendar(event.type == 'set' ? currentDate : '') : null
    setIsChanged(true);
  };

  const currentDate = new Date();
  const eighteenYearsAgo = moment(currentDate).subtract(18, 'years').toDate();
  const sixtenYearsAgo = moment(currentDate).subtract(67, 'years').toDate();

  const BranchesList: DropdownObject[] = GetBranchesData
    ? GetBranchesData.map(item => ({
      label: item.branch,
      value: item.branch,
    }))
    : [];

  const CustomerProfileList: DropdownObject[] = GetCustomerProfileData
    ? GetCustomerProfileData.map(item => ({
      label: item.profile,
      value: item.profile,
    }))
    : [];

  const ConstitutionList: DropdownObject[] = GetConstitutionData
    ? GetConstitutionData.constitutionMasterList.map(item => ({
      label: item.constitutionType,
      value: item.constitutionType,
    }))
    : [];

  const CustomerTypeList: DropdownObject[] = GetCustomerTypeData
    ? GetCustomerTypeData.map(item => ({
      label: item.customerType,
      value: item.customerType,
    }))
    : [];


  useEffect(() => {
    if (isOpenConstitution) {
      setIsOpenCustomerProfile(false);
      setIsOpenGender(false);
      setIsOpenCustomerType(false);
    }
  }, [isOpenConstitution]);

  useEffect(() => {
    if (isOpenCustomerProfile) {
      setIsOpenConstitution(false);
      setIsOpenCustomerType(false);
      setIsOpenGender(false);
    }
  }, [isOpenCustomerProfile]);

  useEffect(() => {
    const eighteenYearsAgoMoment = moment(currentDate)
      .subtract(18, 'years')
      .format('DD-MM-YYYY');
    if (
      dateofbirth !== '' &&
      moment(dateofbirth).isAfter(eighteenYearsAgoMoment) &&
      GetLeadData?.dob
    ) {
      setDateofBirth(tempdateOfBirth);
    }
  }, [dateofbirth]);

  useEffect(() => {
    if (isOpenGender) {
      setIsOpenConstitution(false);
      setIsOpenCustomerProfile(false);
    }
  }, [isOpenGender]);

  const activeArray = [
    firstName,
    // middleName,
    lastName,
    mobileNumber,
    constitutionType,
    selectedGender,
    maritalStatus,
    aadharNumber,
    incomeStatus !== 'Not Earning' ? monthlyIncome : 'njjjj',
    dateofbirth,
    customerProfile,
    customerType,
    // alternateContact,
    selectedExistingType === 'Existing Employee' ? employeeName : 'dfsd',
    maritalStatus === 'Married' ? spouseName : 'dfsd',
    isPAN === 'Yes' ? PANnumber : 'dfsd',
    fatherName,
    motherName,
    incomeStatus === 'Earning' ? jobStabilityYear : 'dfsd',
    incomeStatus === 'Earning' ? jobStability : 'dfsd',
    isMainApplicant ? 'dfsd' : relationToMainApplicant,
    isMainApplicant ? incomeStatus : 'dfsd',
    isMainApplicant ? selectedBranch : 'dfsd',
    isMainApplicant ? selectedExistingType : 'dfsd',
  ];

  let isActive: boolean = useActive(activeArray);
  let hasError: boolean = isError.some(error => error.hasError === true);
  // console.log("customerType",customerType, CustomerTypeList);

  return (
    <WaveBackground
      loading={[GetLeadIsLoading, GetApplicantDetailsByAadharIsLoading]}
      title={'Lead Registration'}>
      {selectingCalendar && (
        <DateTimePicker
          testID="date"
          value={dateOfBirthForCalendar || new Date()}
          maximumDate={eighteenYearsAgo}
          key={isMainApplicant ? 47 : 48}
          minimumDate={sixtenYearsAgo}
          mode="date"
          onChange={ondobChange}

        />
      )}


      <LabeledTextInput
        label="Aadhaar Number"
        onChange={setAadharNumber}
        defaultValue={aadharNumber}
        setErrorFlag={setIsError}
        IsErrorArray={isError}
        key={isMainApplicant ? 1 : 2}
        maxLength={12}
        disabled={GetApplicantDetailsByAadharData?.isBre1Approved}
        isChange={setIsChanged}
        mandatory
        NumberPad
      />

      <LabeledTextInput
        label="Name"
        autoCapitalize="sentences"
        onChange={setFirstName}
        defaultValue={firstName}
        key={isMainApplicant ? 3 : 4}
        setErrorFlag={setIsError}
        IsErrorArray={isError}
        isChange={setIsChanged}
        mandatory
        placeholder="First Name"
      />

      <View
        style={{
          flexDirection: 'row',
          width: '90%',
          justifyContent: 'space-between',
          alignSelf: 'center',
          bottom: 20,
        }}>
        <TextInput
          onChange={setMiddleName}
          defaultValue={middleName}
          key={isMainApplicant ? 5 : 6}
          placeholder="Middle Name"
          isChange={setIsChanged}
          IsErrorArray={isError}
          setErrorFlag={setIsError}
          halfSize
        />
        <TextInput
          onChange={setLastName}
          defaultValue={lastName}
          key={isMainApplicant ? 7 : 8}
          placeholder="Last Name"
          isChange={setIsChanged}
          IsErrorArray={isError}
          setErrorFlag={setIsError}
          halfSize
        />
      </View>

      <View style={styles.dobContainer}>
        <View style={{ flexDirection: 'row' }}>
          <Text
            style={[
              styles.labelText,
              { color: selectingCalendar ? Colors.Black : Colors.LabelGrey },
            ]}>
            Date Of Birth{' '}
          </Text>
          <Icon name="pointed-star" />
        </View>
        <TouchableOpacity
          style={[
            styles.inputbox,
            {
              marginTop: 10,
              borderColor: selectingCalendar ? Colors.Black : Colors.LightGrey,
            },
          ]}
          onPress={() => setSelectingCalendar(true)}>
          <Text
            style={{
              color: dateofbirth ? Colors.Black : Colors.LabelGrey,
            }}>
            {dateofbirth}
          </Text>
        </TouchableOpacity>
      </View>

      <LabeledTextInput
        label="Mobile Number"
        autoCapitalize="sentences"
        key={isMainApplicant ? 9 : 10}
        onChange={setMobileNumber}
        defaultValue={mobileNumber}
        setErrorFlag={setIsError}
        IsErrorArray={isError}
        isChange={setIsChanged}
        NumberPad
        mandatory
        maxLength={10}
      />

      <LabeledTextInput
        label="E-mail ID"
        autoCapitalize="none"
        onChange={setEmailId}
        defaultValue={emailId}
        key={isMainApplicant ? 11 : 12}
        setErrorFlag={setIsError}
        IsErrorArray={isError}
        isChange={setIsChanged}
      // mandatory
      />
      <LabelDropdown
        label="Gender"
        setSelectedOption={setSelectedGender}
        options={['Male', 'Female', 'Others']}
        defaultValue={selectedGender}
        zIndex={isOpenGender ? 1000 : 0}
        key={isMainApplicant ? 50 : 51}
        open={isOpenGender}
        disabled={GetLeadDataGuarantor?.isMale === true}
        setDropdownOpen={setIsOpenGender}
        setSelectedItem={() => { }}
        isChange={setIsChanged}
        mandatory
      />

      {!isMainApplicant ? (
        <LabelDropdown
          label="Relation"
          setSelectedOption={setRelationToMainApplicant}
          options={[
            'Father',
            'Mother',
            'Son',
            'Daughter',
            'Brother',
            'Sister',
            'Spouse',
            'Third Party',
          ]}
          defaultValue={relationToMainApplicant}
          key={isMainApplicant ? 45 : 46}
          zIndex={isOpenRelation ? 1000 : 0}
          open={isOpenRelation}
          setDropdownOpen={setIsOpenRelation}
          setSelectedItem={() => { }}
          isChange={setIsChanged}
          mandatory
        />
      ) : (
        <>
          <LabeledDropdown
            label="Branch"
            setSelectedOption={setSelectedBranch}
            options={BranchesList}
            defaultValue={selectedBranch}
            bottom
            isChange={setIsChanged}
            mandatory
          />
        </>
      )}

      {/* <LabeledDropdown
        label="Customer Type"
        setSelectedOption={setCustomerType}
        key={isMainApplicant ? 13 : 14}
        defaultValue={customerType}
        options={CustomerTypeList}
        isChange={setIsChanged}
        mandatory
        disabled
      /> */}
      <LabeledDropdown
        label="Customer Type"
        setSelectedOption={setCustomerType}
        options={isMainApplicant ? CustomerTypeList : CustomerTypeList.filter(
          el => el.value !== 'Unemployed',
        )}
        defaultValue={customerType}
        bottom
        isChange={setIsChanged}
        mandatory
      />

      <LabeledDropdown
        label="Constitution Type"
        setSelectedOption={setConstitutionType}
        options={ConstitutionList}
        defaultValue={constitutionType}
        bottom
        isChange={setIsChanged}
        mandatory
      />
      <LabeledDropdown
        label="Customer Profile"
        setSelectedOption={setCustomerProfile}
        options={CustomerProfileList}
        defaultValue={customerProfile}
        bottom
        isChange={setIsChanged}
        mandatory
      />

      <LabeledRadioButtonGroup
        heading="Is PAN Available ?"
        options={['Yes', 'No']}
        onChange={setIsPAN}
        key={isMainApplicant ? 39 : 40}
        value={isPAN}
        isChange={setIsChanged}
        inLine
      />

      {isPAN === 'Yes' && (
        <Animatable.View ref={PANnumberRef}>
          <LabeledTextInput
            label="PAN Number"
            onChange={setPANnumber}
            autoCapitalize="characters"
            defaultValue={PANnumber}
            setErrorFlag={setIsError}
            key={isMainApplicant ? 37 : 38}
            IsErrorArray={isError}
            maxLength={10}
            isChange={setIsChanged}
            mandatory
          // NumberPad={PANnumber.length >= 5 && PANnumber.length <= 8 ? true : false}
          />
        </Animatable.View>
      )}
      <RadioButtonGroup
        heading="Existing Employee or Existing Customer"
        options={['Existing Employee', 'Existing Customer', 'None']}
        onChange={setSelectedExistingType}
        key={isMainApplicant ? 35 : 36}
        value={selectedExistingType}
        isChange={setIsChanged}
      />
      {selectedExistingType === 'Existing Employee' && (
        <Animatable.View ref={EmplyerNameRef}>
          <LabeledTextInput
            label="Employer Name"
            onChange={setEmployeeName}
            defaultValue={employeeName}
            setErrorFlag={setIsError}
            key={isMainApplicant ? 16 : 17}
            IsErrorArray={isError}
            isChange={setIsChanged}
            mandatory
          />
        </Animatable.View>
      )}
      <LabeledTextInput
        label="Alternate Contact"
        onChange={setAlternateContact}
        defaultValue={alternateContact}
        setErrorFlag={setIsError}
        key={isMainApplicant ? 18 : 19}
        NumberPad
        maxLength={10}
        IsErrorArray={isError}
        isChange={setIsChanged}
      />


      <RadioButtonGroup
        heading="Income Status"
        options={isMainApplicant ?
          ['Earning', 'Not Earning'] : ['Earning']}
        key={isMainApplicant ? 33 : 34}
        onChange={setIncomeStatus}
        value={incomeStatus}
        isChange={setIsChanged}
      />

      {
        // incomeStatus !== 'Unemployed' && 
        <LabeledTextInput
          label="Income (Monthly)"
          onChange={setMonthlyIncome}
          defaultValue={monthlyIncome}
          setErrorFlag={setIsError}
          key={isMainApplicant ? 20 : 21}
          maxLength={12}
          NumberPad
          IsErrorArray={isError}
          isChange={setIsChanged}
          mandatory={incomeStatus !== 'Not Earning'}
        />}

    

      <View style={{ marginHorizontal: 10, marginTop: 20 }}>
        <Text style={styles.SameAsText}>
          Job Stability
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        
        <LabeledTextInput
          label={incomeStatus !== 'Not Earning' ? "Year" : "Year "}
          onChange={setJobStabilityYear}
          defaultValue={jobStabilityYear}
          setErrorFlag={setIsError}
          key={isMainApplicant ? 16 : 17}
          IsErrorArray={isError}
          isChange={setIsChanged}
          mandatory={incomeStatus !== 'Not Earning'}
          maxLength={2}
          NumberPad
          halfSize
        />

        <LabeledDropdown
          label="Month"
          setSelectedOption={setJobStability}
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
          defaultValue={jobStability}
          bottom
          halfSize
          mandatory={incomeStatus !== 'Not Earning'}
        />
      </View>

      <LabeledDropdown
        label="Marital Status"
        setSelectedOption={setMaritalStatus}
        options={['Single', 'Married', 'Divorced', 'Widowed']}
        defaultValue={maritalStatus}
        bottom
        isChange={setIsChanged}
        mandatory
      />

      {maritalStatus === 'Married' && (
        <Animatable.View ref={spouseNameRef}>
          <LabeledTextInput
            label="Spouse's Name"
            onChange={setSpouseName}
            defaultValue={spouseName}
            setErrorFlag={setIsError}
            key={isMainApplicant ? 24 : 25}
            IsErrorArray={isError}
            isChange={setIsChanged}
            mandatory
          />
        </Animatable.View>
      )}

      <LabeledTextInput
        label="Father's Name"
        onChange={setFatherName}
        defaultValue={fatherName}
        setErrorFlag={setIsError}
        IsErrorArray={isError}
        key={isMainApplicant ? 27 : 28}
        isChange={setIsChanged}
        disabled={GetApplicantDetailsByAadharData?.isBre1Approved}
        mandatory
      />

      <LabeledTextInput
        label="Mother's Name"
        onChange={setMotherName}
        defaultValue={motherName}
        setErrorFlag={setIsError}
        key={isMainApplicant ? 29 : 30}
        IsErrorArray={isError}
        isChange={setIsChanged}
        disabled={GetApplicantDetailsByAadharData?.isBre1Approved}
        mandatory
      />

      <Button
        text={isChanged ? 'Proceed' : 'Next'}
        active={isActive && !hasError}
        marginVertical={10}
        marginTop={30}
        onPress={() => {
          console.log("SaveorUpdateLeadRequest", SaveorUpdateLeadRequest);

          if (mobileNumber != alternateContact) {
            GetLead.reset();
            GetApplicantDetailsByAadhar.reset();

            if (isMainApplicant) {
              navigation.navigate('PreviewLead', {
                initial: 'mainApplicant',
                LeadRegistration: {
                  edited: isChanged,
                  customerProfileValue: customerProfile,
                  SaveorUpdateLeadRequest,
                },
              });
            } else {
              navigation.navigate('PreviewLead', {
                initial: 'guarantor',
                LeadRegistration: {
                  edited: isChanged,
                  customerProfileValue: customerProfile,
                  SaveorUpdateLeadRequest: SaveorUpdateLeadRequestGuarantor,
                },
              });
            }
          }
          else {
            useShowFlashMessage(
              'warning',
              "Mobile Number and Alternate Contact Number can't be same ",
            )
          }
        }}
      />
    </WaveBackground>
  );
};
export default LeadRegistration;
