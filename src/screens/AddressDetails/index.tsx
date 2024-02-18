import React, { FC, useCallback, useEffect, useState } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { RouteProp, useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import LabelDropdown from 'components/LabelDropdown ';
import LabeledDropdown from 'components/LabeledDropdown';
import WaveBackground from 'components/WaveBackground';
import LabeledTextInput from 'components/LabeledTextInput';
import Button from 'components/Button';
import { ErrorObject } from 'config/Types';
import Colors from 'config/Colors';
import { useApplicantDetails } from 'context/useApplicantDetails';
import useActive from 'hooks/useActive';
import { RootStackParamList } from 'navigation/HomeStack';
import styles from './styles';
import {
  useAddCurrentAddress,
  useAddPermanentAddress,
  useGetAddressDetails,
  useGetDedupeDetails
} from 'api/ReactQuery/Address';
import {
  AddCurrentAddressRequest,
  AddPermanentAddressRequest,
  GetDedupeDetailsRequest
} from 'api/ReactQuery/Address/types';
import { useGetAadharDetails } from 'api/ReactQuery/OCR';
import { useGetPincode } from 'api/ReactQuery/Lead';
import { useGetCriff } from 'api/ReactQuery/BureauApi';
import setAllErrorsToFalse from 'config/Functions/SetAllErrorsToFalse';
import Modal from 'components/Modal';
import LoanSummaryButton from 'components/LoanSummaryButton';
import { usedViewStatus } from 'context/useViewStatus';
import useShowFlashMessage from 'hooks/useShowFlashMessage';

type AddressDetailsNavigationProp = StackNavigationProp<
  RootStackParamList,
  'AddressDetails'
>;
type AddressDetailsRouteProp = RouteProp<RootStackParamList, 'AddressDetails'>;

interface AddressDetailsScreenProps {
  navigation: AddressDetailsNavigationProp;
  route: AddressDetailsRouteProp;
}

const AddressDetails: FC<AddressDetailsScreenProps> = ({ navigation, route }) => {
  const { applicantId, guarantorId, isMainApplicant } = useApplicantDetails();
  // var applicantId = 'MU048506'
  const { useViewStatus } = usedViewStatus();
  const [isViewOnly, setIsViewOnly] = useState<boolean>(false);
  const [isErrorCurrent, setIsErrorCurrent] = useState<ErrorObject[]>([]);
  const [isErrorPermanent, setIsErrorPermanent] = useState<ErrorObject[]>([]);
  const [isChangedPermanent, setIsChangedPermanent] = useState<boolean>(false);
  const [isChangedCurrent, setIsChangedCurrent] = useState<boolean>(false);
  const [currentAddressLine1, setCurrentAddressLine1] = useState<string>('');
  const [currentAddressLine2, setCurrentAddressLine2] = useState<string>('');
  const [currentLandMark, setCurrentLandMark] = useState<string>('');
  const [currentState, setCurrentState] = useState<string>('');
  const [currentStateCode, setCurrentStateCode] = useState<string>('');
  const [currentPostOffice, setCurrentPostOffie] = useState<string>('');
  const [currentPostOfficeOpen, setCurrentPostOfficeOpen] =
    useState<boolean>(false);
  const [dob, setDob] = useState<any>('');

  const [currentPostOfficeId, setCurrentPostOffieId] = useState<string>('');
  const [currentCity, setCurrentCity] = useState<string>('');
  const [currentCityCode, setCurrentCityCode] = useState<string>('');
  const [currentPinCode, setCurrentPinCode] = useState<string>('');
  const [residenceType, setresidenceType] = useState<string>('');
  const [currentDistrict, setCurrentDistrict] = useState<string>('');
  const [permanentAddressLine1, setPermanentAddressLine1] =
    useState<string>('');
  const [permanentAddressLine2, setPermanentAddressLine2] =
    useState<string>('');
  const [permanentLandMark, setPermanentLandMark] = useState<string>('');
  const [permanentState, setPermanentState] = useState<string>('');
  const [permanentStateCode, setPermanentStateCode] = useState<string>('');
  const [permanentPostOffice, setPermanentPostOffice] = useState<string>('');
  const [permanentPostOfficeOpen, setPermanentPostOfficeOpen] =
    useState<boolean>(false);

  const [permanentPostOfficeId, setPermanentPostOfficeId] =
    useState<string>('');
  const [permanentCity, setPermanentCity] = useState<string>('');
  const [permanentCityCode, setPermanentCityCode] = useState<string>('');
  const [permanentPinCode, setPermanentPinCode] = useState<string>('');

  const [permanentDistrict, setPermanentDistrict] = useState<string>('');
  const [permanentResidenceType, setPermanentResidenceType] =
    useState<string>('');
  const [isSameAsKYCCurrent, setisSameAsKYCCurrent] = useState<boolean>(false);
  const [isSameAsKYCPermanent, setisSameAsKYCPermanent] =
    useState<boolean>(false);
  const [yearSinceCurrent, setYearSinceCurrent] = useState<string>('');
  const [monthSinceCurrent, setMonthSinceCurrent] = useState<string>('');
  const [yearSincePermanent, setYearSincePermanent] = useState<string>('');
  const [monthSincePermanent, setMonthSincePermanent] = useState<string>('');
  const [isRenderPermenant, setIsRenderPermanent] = useState<boolean>(false);
  const [isRenderCurrentButton, setIsRenderCurrentButton] =
    useState<boolean>(true);
  const [isGetFetched, setIsGetFetched] = useState<boolean>(false);
  const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false);
  const [popMessage, setPopMessage] = useState<string>('');
  const [isBureauFailedVisible, setIsBureauFailedVisible] =
    useState<boolean>(false);
  const [isOpenCurrentResidence, setIsOpenCurrentResidence] =
    useState<boolean>(false);
  const [isOpenPermanentResidence, setIsOpenPermanentResidence] =
    useState<boolean>(false);
  const [isOpenMonthsCurrent, setIsOpenMonthsCurrent] =
    useState<boolean>(false);
  const [isOpenMonthsPermanent, setIsOpenMonthsPermanent] =
    useState<boolean>(false);
  const [isOpenPostOfficeCurrent, setIsOpenPostOfficeCurrent] =
    useState<boolean>(false);
  const [isOpenPostOfficePermanent, setIsOpenPostOfficePermanent] =
    useState<boolean>(false);
  const getAge = (birthDate: string) => Math.floor((new Date().getTime() - new Date(birthDate).getTime()) / 3.15576e+10);

  useFocusEffect(
    useCallback(() => {
      if (applicantId) {
        GetAadharDetails.reset();
        GetAddressDetails.reset();
        AddCurrentAddress.reset();
        AddPermanentAddress.reset();
        GetAddressDetails.mutateAsync();
        GetAadharDetails.mutateAsync();
      }
    }, []),
  );

  const [
    GetAddressDetails,
    { data: GetAddressDetailsData, isLoading: GetAddressDetailsIsLoading },
  ] = useGetAddressDetails({
    appId: isMainApplicant ? applicantId : guarantorId,
    applicantType: isMainApplicant ? 'mainApplicant' : 'guarantor',
  });

  const [
    GetDedupeDetails,
    { data: GetDedupeDetailsData, isLoading: GetDedupeDetailsIsLoading },
  ] = useGetDedupeDetails({
    appId: isMainApplicant ? applicantId : guarantorId,
    applicantType: isMainApplicant ? 'mainApplicant' : 'guarantor',
  });


  const [GetCriff, { data: GetCriffData, isLoading: GetCriffIsLoading }] =
    useGetCriff({
      applicant_uniqueid: isMainApplicant ? applicantId : guarantorId,
      applicantType: isMainApplicant ? 'mainApplicant' : 'guarantor',
    });

  const AddCurrentAddressRequest: AddCurrentAddressRequest = {
    appId: isMainApplicant ? applicantId : guarantorId,
    applicantType: isMainApplicant ? 'mainApplicant' : 'guarantor',
    currentAddressLine1,
    currentAddressLine2,
    currentCity: currentCityCode,
    currentDistrict: currentCityCode,
    currentLandmark: currentLandMark,
    currentPinCode,
    postOffice: currentPostOfficeId,
    currentState: currentStateCode,
    isCurrentSameasKYC: isSameAsKYCCurrent,
    currentResidenceType: residenceType,
    residingAtCurrentAddress: 'Yes',
    residingAtCurrentAddressSinceMonths: Number(monthSinceCurrent),
    residingAtCurrentAddressSinceYears: Number(yearSinceCurrent),
  };

  const AddPermanentAddressRequest: AddPermanentAddressRequest = {
    appId: isMainApplicant ? applicantId : guarantorId,
    applicantType: isMainApplicant ? 'mainApplicant' : 'guarantor',
    permanentAddressLine1,
    permanentAddressLine2,
    permanentCity: permanentCityCode,
    permanentDistrict: permanentCityCode,
    permanentLandmark: permanentLandMark,
    permanentResidenceType: permanentResidenceType,
    permanentPinCode,
    permanentPostOffice: permanentPostOfficeId,
    permanentState: permanentStateCode,
    isPermanentSameasKYC: isSameAsKYCPermanent,
    residingAtPermanentAddressSinceMonths: Number(monthSincePermanent),
    residingAtPermanentAddressSinceYears: Number(yearSincePermanent),
  };

  const [
    AddCurrentAddress,
    { data: AddCurrentAddressData, isLoading: AddCurrentAddressIsLoading },
  ] = useAddCurrentAddress(AddCurrentAddressRequest);

  const [
    AddPermanentAddress,
    { data: AddPermanentAddressData, isLoading: AddPermanentAddressIsLoading },
  ] = useAddPermanentAddress(AddPermanentAddressRequest);

  const [
    GetPincodeCurrent,
    { data: GetPincodeCurrentData, isLoading: GetPincodeCurrentIsLoading },
  ] = useGetPincode(currentPinCode);

  const [
    GetPincodePermanent,
    { data: GetPincodePermanentData, isLoading: GetPincodePermanentIsLoading },
  ] = useGetPincode(permanentPinCode);

  const ResetCurrentAddressDetails = () => {
    setCurrentAddressLine1('');
    setCurrentAddressLine2('');
    setCurrentLandMark('');
    setCurrentCityCode('');
    setCurrentStateCode('');
    setCurrentPostOffieId('');
    setCurrentPostOffie('');
    setCurrentPinCode('');
    setCurrentCity('');
    setCurrentDistrict('');
    setCurrentState('');
    setCurrentStateCode('');
    setMonthSinceCurrent('');
    setYearSinceCurrent('');
  };

  const ResetPermanentAddressDetails = () => {
    setPermanentAddressLine1('');
    setPermanentAddressLine2('');
    setPermanentLandMark('');
    setPermanentCityCode('');
    setPermanentStateCode('');
    setPermanentPostOfficeId('');
    setPermanentPostOffice('');
    setPermanentPinCode('');
    setPermanentCity('');
    setPermanentDistrict('');
    setPermanentState('');
    setPermanentStateCode('');
    setMonthSincePermanent('');
    setYearSincePermanent('');
  };

  useEffect(() => {
    if (!isSameAsKYCCurrent) {
      ResetCurrentAddressDetails();
    }
  }, [isSameAsKYCCurrent]);

  useEffect(() => {
    if (!isSameAsKYCPermanent) {
      ResetPermanentAddressDetails();
    }
  }, [isSameAsKYCPermanent]);

  useEffect(() => {
    isRenderPermenant && setIsRenderCurrentButton(false);
  }, [isRenderPermenant]);

  useEffect(() => {
    if (GetAddressDetailsData) {
      console.log("kkkkkkkkkk", GetAddressDetailsData);

      setCurrentAddressLine1(GetAddressDetailsData.currentAddressLine1 || '');
      setCurrentAddressLine2(GetAddressDetailsData.currentAddressLine2 || '');
      setCurrentLandMark(GetAddressDetailsData.currentLandmark || '');
      setCurrentPinCode(GetAddressDetailsData.currentPinCode || '');
      setCurrentCity(GetAddressDetailsData.currentCity || '');
      setCurrentDistrict(GetAddressDetailsData.currentDistrict || '');
      setCurrentPostOffieId(GetAddressDetailsData.postOffice || '');
      setCurrentState(GetAddressDetailsData.currentState || '');
      setDob(GetAddressDetailsData.dob || '');
      setYearSinceCurrent(
        GetAddressDetailsData?.residingAtCurrentAddressSinceYears?.toString() ||
        '',
      );
      setMonthSinceCurrent(
        GetAddressDetailsData?.residingAtCurrentAddressSinceMonths?.toString() ||
        '',
      );
      GetAddressDetailsData?.isAddressSave &&
        (setIsChangedCurrent(false), setIsChangedPermanent(false));
      if (
        GetAddressDetailsData?.isAddressSave &&
        GetAddressDetailsData?.currentAddressLine1
      ) {
        setIsRenderCurrentButton(false);
        setIsRenderPermanent(true);
      }
      setresidenceType(GetAddressDetailsData.currentResidenceType || '');
      setisSameAsKYCCurrent(GetAddressDetailsData.isCurrentSameasKYC || false);
      setisSameAsKYCPermanent(
        GetAddressDetailsData.isPermanentSameasKYC || false,
      );
      !GetAddressDetailsData.isPermanentSameasKYC && setIsGetFetched(true);
      setPermanentAddressLine1(
        GetAddressDetailsData.permanentAddressLine1 || '',
      );
      setPermanentAddressLine2(
        GetAddressDetailsData.permanentAddressLine2 || '',
      );
      setPermanentLandMark(GetAddressDetailsData.permanentLandmark || '');
      setPermanentPinCode(GetAddressDetailsData.permanentPinCode || '');
      setPermanentPostOfficeId(GetAddressDetailsData.permanentPostOffice || '');
      setPermanentCity(GetAddressDetailsData.permanentCity || '');
      setPermanentDistrict(GetAddressDetailsData.permanentDistrict || '');
      setPermanentResidenceType(
        GetAddressDetailsData.permanentResidenceType || '',
      );
      setPermanentState(GetAddressDetailsData.permanentState || '');
      setYearSincePermanent(
        GetAddressDetailsData.residingAtPermanentAddressSinceYears?.toString() ||
        '',
      );
      setMonthSincePermanent(
        GetAddressDetailsData.residingAtPermanentAddressSinceMonths?.toString() ||
        '',
      );
      setPopMessage(GetAddressDetailsData?.message)
      setIsPopupVisible(GetAddressDetailsData?.isPopUpVisible)
    }
  }, [GetAddressDetailsData]);

  useEffect(() => {
    if (useViewStatus) {
      setIsViewOnly(useViewStatus?.isSubmitToCreditFreeze ? true : useViewStatus?.isFreeze ? true : false);
    }
  }, []);

  type RenderToggleTypes = {
    toggleType: 'SameAsKYC' | 'isSameAsKYCPermanent';
  };

  const RenderToggle = ({ toggleType }: RenderToggleTypes) => (
    <View>
      <View>
        <Text style={styles.Label}>
          {toggleType === 'SameAsKYC' ? 'Current Address' : 'Permanent Address'}
        </Text>
      </View>
      {((toggleType === 'isSameAsKYCPermanent' && !isSameAsKYCCurrent) ||
        (toggleType === 'SameAsKYC' && !isSameAsKYCPermanent) ||
        (!isSameAsKYCCurrent && !isSameAsKYCPermanent)) && (
          <View
            style={{
              flexDirection: 'row',
              marginVertical: 5,
              paddingHorizontal: 15,
              paddingVertical: 5,
              alignSelf: 'flex-start',
            }}>
            <Text style={styles.SameAsText}>Same as KYC address ?</Text>
            <TouchableOpacity
              disabled={isViewOnly}
              onPress={() => {
                if (toggleType === 'SameAsKYC') {
                  setIsChangedCurrent(true);
                  setisSameAsKYCCurrent(!isSameAsKYCCurrent);
                } else {
                  setIsChangedPermanent(true);
                  setisSameAsKYCPermanent(!isSameAsKYCPermanent);
                }
              }}
              // disabled={
              //   toggleType === 'isSameAsKYCPermanent' &&
              //   (residenceType === 'Rented' ||
              //     residenceType === 'Quarter-Company' ||
              //     residenceType === 'Quarter-Government')
              // }
              style={[
                styles.toggled,
                {
                  backgroundColor:
                    toggleType === 'SameAsKYC'
                      ? isSameAsKYCCurrent
                        ? Colors.BlueCore
                        : Colors.LightGrey
                      : isSameAsKYCPermanent
                        ? Colors.BlueCore
                        : Colors.LightGrey,
                },
              ]}>
              <View
                style={[
                  styles.circle,
                  {
                    alignSelf:
                      toggleType === 'SameAsKYC'
                        ? isSameAsKYCCurrent
                          ? 'flex-end'
                          : 'flex-start'
                        : isSameAsKYCPermanent
                          ? 'flex-end'
                          : 'flex-start',
                  },
                ]}
              />
            </TouchableOpacity>
          </View>
        )}
    </View>
  );

  const [
    GetAadharDetails,
    { data: GetAadharDetailsData, isLoading: GetAadharDetailsIsLoading },
  ] = useGetAadharDetails({
    applicationId: isMainApplicant ? applicantId : guarantorId,
    type: isMainApplicant ? 'mainApplicant' : 'guarantor',
  });

  useEffect(() => {
    if (isChangedCurrent) {
      setIsRenderCurrentButton(true);
      setIsRenderPermanent(false);
      // ResetPermanentAddressDetails();
      // setisSameAsKYCPermanent(false);
    }
  }, [isChangedCurrent]);

  useEffect(() => {
    if (GetAadharDetailsData && isSameAsKYCCurrent) {
      setAllErrorsToFalse({
        errorArray: isErrorCurrent,
        setIsError: setIsErrorCurrent,
      });
      setCurrentAddressLine1(GetAadharDetailsData.aadhaarAddressLine1 || '');
      setCurrentAddressLine2(GetAadharDetailsData.aadhaarAddressLine2 || '');
      setCurrentLandMark(GetAadharDetailsData.landmark || '');
      setCurrentPinCode(GetAadharDetailsData.aadhaarPincode || '');
      setCurrentPostOffieId(GetAadharDetailsData.aadharPostOffice || '');
      setCurrentCityCode(GetAadharDetailsData.city || '');
      setCurrentStateCode(GetAadharDetailsData.district || '');
      setCurrentState(GetAadharDetailsData.state || '');
    }
  }, [isSameAsKYCCurrent]);



  useEffect(() => {
    if (GetPincodeCurrentData) {
      setCurrentCity(GetPincodeCurrentData.city || '');
      setCurrentCityCode(GetPincodeCurrentData.cityCode || '');
      setCurrentDistrict(GetPincodeCurrentData.city || '');
      setCurrentState(GetPincodeCurrentData.state || '');
      setCurrentStateCode(GetPincodeCurrentData.stateCode || '');
    }
  }, [GetPincodeCurrentData]);

  useEffect(() => {
    if (GetCriffData) {
      console.log("GetCriffData", GetCriffData);

      if (GetCriffData.bureauPull && GetCriffData.bureauScore) {
        setIsChangedCurrent(false);
        setIsChangedPermanent(false);
        navigation.navigate('BureauSuccess', { GetCriffResponse: GetCriffData });
      } else {
        setIsBureauFailedVisible(true);
      }
    }
  }, [GetCriffData]);

  useEffect(() => {
    if (GetPincodePermanentData) {
      setPermanentCity(GetPincodePermanentData.city || '');
      setPermanentCityCode(GetPincodePermanentData.cityCode || '');
      setPermanentDistrict(GetPincodePermanentData.city || '');
      setPermanentState(GetPincodePermanentData.state || '');
      setPermanentStateCode(GetPincodePermanentData.stateCode || '');
    }
  }, [GetPincodePermanentData]);

  useEffect(() => {
    if (currentPostOffice) {
      let findCurrentPostOffice = GetPincodeCurrentData?.postOfficeList.find(
        item => item.postOffice === currentPostOffice,
      )?.postOfficeId;
      findCurrentPostOffice && setCurrentPostOffieId(findCurrentPostOffice);
    }
  }, [currentPostOffice]);

  useEffect(() => {
    if (currentPostOfficeId && GetPincodeCurrentData) {
      let findCurrentPostOffice = GetPincodeCurrentData?.postOfficeList.find(
        item => item.postOfficeId === currentPostOfficeId,
      )?.postOffice;
      findCurrentPostOffice && setCurrentPostOffie(findCurrentPostOffice);
      !GetAddressDetailsData?.permanentAddressLine1 && setIsGetFetched(false);
    }
  }, [currentPostOfficeId, GetPincodeCurrentData, isSameAsKYCCurrent]);

  useEffect(() => {
    if (permanentPostOffice) {
      let findPermanentPostOffice =
        GetPincodePermanentData?.postOfficeList.find(
          item => item.postOffice === permanentPostOffice,
        )?.postOfficeId;
      findPermanentPostOffice &&
        setPermanentPostOfficeId(findPermanentPostOffice);
    }
  }, [permanentPostOffice]);

  useEffect(() => {
    if (
      permanentPostOfficeId &&
      GetPincodePermanentData &&
      (isSameAsKYCPermanent || isGetFetched)
    ) {
      let findPermanentPostOffice =
        GetPincodePermanentData?.postOfficeList.find(
          item => item.postOfficeId === permanentPostOfficeId,
        )?.postOffice;
      findPermanentPostOffice &&
        setPermanentPostOffice(findPermanentPostOffice);
    }
  }, [permanentPostOfficeId, GetPincodePermanentData, isSameAsKYCPermanent]);

  useEffect(() => {
    if(currentPinCode.length === 6) {
      GetPincodeCurrent.mutateAsync();
    } else{
      setCurrentCity('');
      setCurrentCityCode('');
      setCurrentDistrict('');
      setCurrentState('');
      setCurrentStateCode('');
    }
  }, [currentPinCode]);

  useEffect(() => {
    if(permanentPinCode.length === 6 ){
      GetPincodePermanent.mutateAsync();
    }{
      setPermanentCity('');
      setPermanentCityCode('');
      setPermanentDistrict('');
      setPermanentState('');
      setPermanentStateCode('');
    }
  }, [permanentPinCode]);

  const handleSaveCurrentAddress = () => {
    if (isChangedCurrent) {
      AddCurrentAddress.mutateAsync();
    } else {
      if (residenceType === 'Family-Owned' || residenceType === 'Self-Owned') {
        GetCriff.mutateAsync();
      } else {
        setIsRenderCurrentButton(false);
        setIsRenderPermanent(true);
      }
    }
  };

  useEffect(() => {
    if (GetDedupeDetailsData) {
      console.log("GetDedupeDetailsData", GetDedupeDetailsData?.message);

      if (GetDedupeDetailsData?.status == 'Rejected') {
        setPopMessage(GetDedupeDetailsData?.message);
        setIsPopupVisible(GetDedupeDetailsData?.isPopUpVisible)
      } else {
        GetCriff.mutateAsync();

      }
    }
  }, [GetDedupeDetailsData]);

  useEffect(() => {
    if (AddCurrentAddressData) {
      console.log("AddCurrentAddressData", AddCurrentAddressData);

      if (residenceType === 'Family-Owned' || residenceType === 'Self-Owned') {
        setIsChangedCurrent(false);
        GetCriff.mutateAsync();

        // need to change both liee comment
        // GetDedupeDetails.mutateAsync();
      } else {
        setIsRenderCurrentButton(false);
        setIsRenderPermanent(true);
      }
    }
  }, [AddCurrentAddressData]);


  const handleSavePermanentAddress = () => {
    if (isChangedPermanent) {
      setIsChangedPermanent(false);
      AddPermanentAddress.mutateAsync();
    } else {
      GetCriff.mutateAsync();
      //need to change
      // GetDedupeDetails.mutateAsync();
    }
  };

  useEffect(() => {
    if (AddPermanentAddressData) {
      AddPermanentAddressData.appId &&
        GetDedupeDetails.mutateAsync();
    }
  }, [AddPermanentAddressData]);


  useEffect(() => {
    if (residenceType === 'Family-Owned' || residenceType === 'Self-Owned') {
      setIsRenderCurrentButton(true);
      setIsRenderPermanent(false);
    }
    // else {
    //   setIsRenderCurrentButton(false);
    //   setIsRenderPermanent(true);
    // }
  }, [residenceType, GetAddressDetailsData]);


  useEffect(() => {
    if (isSameAsKYCPermanent && GetAadharDetailsData) {
      setAllErrorsToFalse({
        errorArray: isErrorPermanent,
        setIsError: setIsErrorPermanent,
      });

      setPermanentAddressLine1(GetAadharDetailsData.aadhaarAddressLine1 || '');
      setPermanentAddressLine2(GetAadharDetailsData.aadhaarAddressLine2 || '');
      setPermanentLandMark(GetAadharDetailsData.landmark || '');
      setPermanentPinCode(GetAadharDetailsData.aadhaarPincode || '');
      setPermanentPostOfficeId(GetAadharDetailsData.aadharPostOffice || '');
      setPermanentCity(GetAadharDetailsData.city || '');
      setPermanentState(GetAadharDetailsData.district || '');
      setPermanentState(GetAadharDetailsData.state || '');
    }
  }, [isSameAsKYCPermanent]);



  useEffect(() => {
    if (isOpenCurrentResidence) {
      setIsOpenMonthsCurrent(false);
    }
  }, [isOpenCurrentResidence]);

  useEffect(() => {
    if (isOpenMonthsCurrent) {
      setIsOpenCurrentResidence(false);
    }
  }, [isOpenMonthsCurrent]);

  useEffect(() => {
    if (isOpenPermanentResidence) {
      setIsOpenMonthsPermanent(false);
    }
  }, [isOpenPermanentResidence]);

  useEffect(() => {
    if (isOpenMonthsPermanent) {
      setIsOpenPermanentResidence(false);
    }
  }, [isOpenMonthsPermanent]);

  useEffect(() => {
    if (yearSinceCurrent) {
      var datearray = dob.split("-");
      var newdate = datearray[2] + '-' + datearray[1] + '-' + datearray[0];
      var age = getAge(newdate)
      var months: Number = (Number(yearSinceCurrent) * 12) + Number(monthSinceCurrent)
      var year: Number = Math.ceil(Number(months) / 12)
      // console.log("mmmmmm", months, Number(months) > Number(0));


      Number(year) > Number(age) ? setMonthSinceCurrent('') : null;
      Number(months) <= Number(0) ? setMonthSinceCurrent('') : null;

      //  Number(year)> Number(age) ? setYearSinceCurrent('') : null;
      Number(year) > Number(age) ?
        useShowFlashMessage(
          'warning',
          `User can't enter higher residing stability duration greater than age`,
        ) : null
    }
  }, [yearSinceCurrent, monthSinceCurrent]);

  useEffect(() => {
    if (yearSincePermanent) {
      var datearray = dob.split("-");
      var newdate = datearray[2] + '-' + datearray[1] + '-' + datearray[0];
      var age = getAge(newdate)
      var months: Number = (Number(yearSincePermanent) * 12) + Number(monthSincePermanent)
      var year: Number = Math.ceil(Number(months) / 12)
      // console.log("mmmmmm", age, yearSincePermanent, monthSincePermanent, year);


      Number(year) > Number(age) ? setMonthSincePermanent('') : null;
      Number(months) <= Number(0) ? setMonthSincePermanent('') : null;

      //  Number(year)> Number(age) ? setYearSincePermanent('') : null;

      Number(months) <= Number(0) ?
        useShowFlashMessage(
          'warning',
          `User cannot enter a duration of residence stability less than 0 Month`,
        ) : null
      Number(year) > Number(age) ?
        useShowFlashMessage(
          'warning',
          `User can't enter higher residing stability duration greater than age`,
        ) : null
    }
  }, [yearSincePermanent, monthSincePermanent]);

  const activeArrayCurrent = [
    currentAddressLine1,
    currentAddressLine2,
    currentLandMark,
    currentPinCode,
    currentDistrict,
    currentPostOffice,
    currentState,
    currentCity,
    yearSinceCurrent,
    monthSinceCurrent,
    residenceType,
  ];

  const activeArrayPermanent = [
    permanentAddressLine1,
    permanentAddressLine2,
    permanentPinCode,
    permanentPostOffice,
    permanentDistrict,
    permanentState,
    permanentCity,
    yearSincePermanent,
    monthSincePermanent,
    permanentResidenceType,
  ];

  const CurrentPostOffceList: string[] = GetPincodeCurrentData
    ? GetPincodeCurrentData.postOfficeList.map(item => item.postOffice)
    : [];

  const PermanenentPostOffileList: string[] = GetPincodePermanentData
    ? GetPincodePermanentData.postOfficeList.map(item => item.postOffice)
    : [];

  let isActiveCurrent: boolean = useActive(activeArrayCurrent);
  let hasErrorCurrent: boolean = isErrorCurrent.some(
    error => error.hasError === true,
  );
  let isActivePermanent: boolean = useActive(activeArrayPermanent);
  let hasErrorPermanent: boolean = isErrorPermanent.some(
    error => error.hasError === true,
  );

  return (
    <WaveBackground
      loading={[
        GetAddressDetailsIsLoading,
        AddPermanentAddressIsLoading,
        AddCurrentAddressIsLoading,
        GetAadharDetailsIsLoading,
        GetPincodeCurrentIsLoading,
        GetPincodePermanentIsLoading,
        GetCriffIsLoading,
        GetDedupeDetailsIsLoading
      ]}
      title={'Address Details'}>
      <Modal
        title="BUREAU FAILED"
        status="failure"
        onClose={() => {
          navigation.navigate('LoanSummary');
        }}
        message={
          'We apologize for the inconvenience, but it seems that the BUREAU verification process has failed for this transaction. Our team is actively investigating the matter to ensure a smooth experience for you.'
        }
        visible={isBureauFailedVisible}
        buttonTitle="Back To Loan Summary"
      />
      <Modal
        title="DEDUPE FOUND"
        status="failure"
        onClose={() => {
          navigation.navigate('LoanSummary');
        }}
        message={popMessage}
        visible={isPopupVisible}
        buttonTitle="Back To Loan Summary"
      />
      <RenderToggle toggleType="SameAsKYC" />

      <LabeledTextInput
        label="Address line 1"
        autoCapitalize="sentences"
        onChange={setCurrentAddressLine1}
        defaultValue={currentAddressLine1}
        setErrorFlag={setIsErrorCurrent}
        IsErrorArray={isErrorCurrent}
        isChange={setIsChangedCurrent}
        isSameAsKYCCurrent={isSameAsKYCCurrent}
        mandatory
        disabled={isSameAsKYCCurrent ? isSameAsKYCCurrent : isViewOnly}
      />

      <LabeledTextInput
        label="Address line 2"
        autoCapitalize="sentences"
        onChange={setCurrentAddressLine2}
        defaultValue={currentAddressLine2}
        setErrorFlag={setIsErrorCurrent}
        IsErrorArray={isErrorCurrent}
        isChange={setIsChangedCurrent}
        isSameAsKYCCurrent={isSameAsKYCCurrent}
        mandatory
        disabled={isSameAsKYCCurrent ? isSameAsKYCCurrent : isViewOnly}
      />

      <LabeledTextInput
        label="Landmark"
        autoCapitalize="sentences"
        onChange={setCurrentLandMark}
        defaultValue={currentLandMark}
        setErrorFlag={setIsErrorCurrent}
        IsErrorArray={isErrorCurrent}
        isChange={setIsChangedCurrent}
        isSameAsKYCCurrent={isSameAsKYCCurrent}
        mandatory
        disabled={isSameAsKYCCurrent ? isSameAsKYCCurrent : isViewOnly}
      />

      <LabeledTextInput
        label="Pincode"
        onChange={setCurrentPinCode}
        defaultValue={currentPinCode}
        setErrorFlag={setIsErrorCurrent}
        IsErrorArray={isErrorCurrent}
        isChange={setIsChangedCurrent}
        isSameAsKYCCurrent={isSameAsKYCCurrent}
        maxLength={6}
        NumberPad
        mandatory
        disabled={isSameAsKYCCurrent ? isSameAsKYCCurrent : isViewOnly}
      />



      <LabeledDropdown
        label="Post Office"
        defaultValue={currentPostOffice}
        options={CurrentPostOffceList}
        setSelectedOption={setCurrentPostOffie}
        bottom
        isChange={setIsChangedCurrent}
        mandatory
        disabled={isSameAsKYCCurrent ? isSameAsKYCCurrent : isViewOnly}
      />

      <LabeledTextInput
        label="City"
        autoCapitalize="sentences"
        onChange={setCurrentCity}
        defaultValue={currentCity}
        setErrorFlag={setIsErrorCurrent}
        IsErrorArray={isErrorCurrent}
        isSameAsKYCCurrent={isSameAsKYCCurrent}
        isChange={setIsChangedCurrent}
        mandatory
        disabled={GetPincodeCurrentData?.city ? true : false ||
          isSameAsKYCCurrent ? isSameAsKYCCurrent : isViewOnly
          
          }
      />

      <LabeledTextInput
        label="District"
        autoCapitalize="sentences"
        onChange={setCurrentDistrict}
        defaultValue={currentDistrict}
        setErrorFlag={setIsErrorCurrent}
        IsErrorArray={isErrorCurrent}
        isChange={setIsChangedCurrent}
        isSameAsKYCCurrent={isSameAsKYCCurrent}
        mandatory
        disabled={GetPincodeCurrentData?.city ? true : false ||
          isSameAsKYCCurrent ? isSameAsKYCCurrent : isViewOnly}
      />

      <LabeledTextInput
        label="State"
        autoCapitalize="sentences"
        onChange={setCurrentState}
        defaultValue={currentState}
        setErrorFlag={setIsErrorCurrent}
        IsErrorArray={isErrorCurrent}
        isSameAsKYCCurrent={isSameAsKYCCurrent}
        isChange={setIsChangedCurrent}
        mandatory
        disabled={GetPincodeCurrentData?.state ? true : false ||
          isSameAsKYCCurrent ? isSameAsKYCCurrent : isViewOnly}
      />
      <View style={{ marginHorizontal: 10, marginTop: 20 }}>
        <Text style={styles.SameAsText}>Residing at Current Address since</Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        <LabeledTextInput
          label="Year"
          onChange={setYearSinceCurrent}
          defaultValue={yearSinceCurrent}
          setErrorFlag={setIsErrorCurrent}
          IsErrorArray={isErrorCurrent}
          isSameAsKYCPermanent={isSameAsKYCPermanent}
          isChange={setIsChangedCurrent}
          halfSize
          maxLength={2}
          NumberPad
          mandatory
          disabled={isViewOnly}
        />

        <LabeledDropdown
          label="Month"
          defaultValue={monthSinceCurrent}
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
          ]} setSelectedOption={setMonthSinceCurrent}
          bottom
          isChange={setIsChangedCurrent}
          mandatory
          disabled={isViewOnly}
        />
      </View>



      <LabelDropdown
        label="Residential Type"
        setSelectedOption={setresidenceType}
        options={[
          'Rented',
          'Self-Owned',
          'Family-Owned',
          'Quarter-Company',
          'Quarter-Government',
        ]}
        defaultValue={residenceType}
        open={isOpenCurrentResidence}
        setDropdownOpen={setIsOpenCurrentResidence}
        setSelectedItem={() => { }}
        isChange={setIsChangedCurrent}
        zIndex={isOpenCurrentResidence ? 1000 : 0}
        mandatory
        dropDownDirection='TOP'
        disabled={isViewOnly}
      />


      <View>
        {isRenderCurrentButton && (
          <>
            <Button
              text={isChangedCurrent ? 'Save' : 'Next'}
              active={isActiveCurrent && !hasErrorCurrent}
              marginVertical={10}
              marginTop={30}
              onPress={handleSaveCurrentAddress}
            />
            <LoanSummaryButton onPress={() => navigation.replace('LoanSummary')} />
          </>
        )}

        {
          isRenderPermenant &&
          (
            <View>
              <RenderToggle toggleType="isSameAsKYCPermanent" />

              <View>
                <LabeledTextInput
                  label="Address line 1"
                  autoCapitalize="sentences"
                  onChange={setPermanentAddressLine1}
                  defaultValue={permanentAddressLine1}
                  setErrorFlag={setIsErrorPermanent}
                  IsErrorArray={isErrorPermanent}
                  isChange={setIsChangedPermanent}
                  isSameAsKYCPermanent={isSameAsKYCPermanent}
                  mandatory
                  disabled={isSameAsKYCPermanent ? isSameAsKYCPermanent : isViewOnly}
                />
                <LabeledTextInput
                  label="Address line 2"
                  autoCapitalize="sentences"
                  onChange={setPermanentAddressLine2}
                  defaultValue={permanentAddressLine2}
                  setErrorFlag={setIsErrorPermanent}
                  IsErrorArray={isErrorPermanent}
                  isSameAsKYCPermanent={isSameAsKYCPermanent}
                  mandatory
                  isChange={setIsChangedPermanent}
                  disabled={isSameAsKYCPermanent ? isSameAsKYCPermanent : isViewOnly}
                />
                <LabeledTextInput
                  label="Landmark"
                  autoCapitalize="sentences"
                  onChange={setPermanentLandMark}
                  defaultValue={permanentLandMark}
                  setErrorFlag={setIsErrorPermanent}
                  IsErrorArray={isErrorPermanent}
                  isChange={setIsChangedPermanent}
                  isSameAsKYCPermanent={isSameAsKYCPermanent}
                  mandatory
                  disabled={isSameAsKYCPermanent ? isSameAsKYCPermanent : isViewOnly}
                />
                
                <LabeledTextInput
                  label="Pincode"
                  onChange={setPermanentPinCode}
                  defaultValue={permanentPinCode}
                  setErrorFlag={setIsErrorPermanent}
                  IsErrorArray={isErrorPermanent}
                  isChange={setIsChangedPermanent}
                  isSameAsKYCPermanent={isSameAsKYCPermanent}
                  maxLength={6}
                  NumberPad
                  mandatory
                  disabled={isSameAsKYCPermanent ? isSameAsKYCPermanent : isViewOnly}

                />



                <LabeledDropdown
                  label="Post Office"
                  defaultValue={permanentPostOffice}
                  options={PermanenentPostOffileList}
                  setSelectedOption={setPermanentPostOffice}
                  isChange={setIsChangedPermanent}
                  bottom
                  mandatory
                  disabled={isSameAsKYCPermanent ? isSameAsKYCPermanent : isViewOnly}

                />

                <LabeledTextInput
                  label="City"
                  autoCapitalize="sentences"
                  onChange={setPermanentCity}
                  isSameAsKYCPermanent={isSameAsKYCPermanent}
                  defaultValue={permanentCity}
                  setErrorFlag={setIsErrorPermanent}
                  IsErrorArray={isErrorPermanent}
                  isChange={setIsChangedPermanent}
                  mandatory
                  disabled={GetPincodePermanentData?.city ? true : false ||
                    isSameAsKYCPermanent ? isSameAsKYCPermanent : isViewOnly}

                />
                <LabeledTextInput
                  label="District"
                  autoCapitalize="sentences"
                  onChange={setPermanentDistrict}
                  isSameAsKYCPermanent={isSameAsKYCPermanent}
                  defaultValue={permanentDistrict}
                  setErrorFlag={setIsErrorPermanent}
                  IsErrorArray={isErrorPermanent}
                  isChange={setIsChangedPermanent}
                  mandatory
                  disabled={GetPincodePermanentData?.city ? true : false ||
                    isSameAsKYCPermanent ? isSameAsKYCPermanent : isViewOnly}

                />

                <LabeledTextInput
                  label="State"
                  autoCapitalize="sentences"
                  onChange={setPermanentState}
                  isSameAsKYCPermanent={isSameAsKYCPermanent}
                  defaultValue={permanentState}
                  setErrorFlag={setIsErrorPermanent}
                  IsErrorArray={isErrorPermanent}
                  isChange={setIsChangedPermanent}
                  mandatory
                  disabled={GetPincodePermanentData?.state ? true : false ||
                    isSameAsKYCPermanent ? isSameAsKYCPermanent : isViewOnly}

                />
                
                <View style={{ marginHorizontal: 10, marginTop: 20 }}>
                  <Text style={styles.SameAsText}>
                    Residing at Permanent Address since
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
                    label="Year"
                    onChange={setYearSincePermanent}
                    defaultValue={yearSincePermanent}
                    setErrorFlag={setIsErrorPermanent}
                    isSameAsKYCPermanent={isSameAsKYCPermanent}
                    IsErrorArray={isErrorPermanent}
                    isChange={setIsChangedPermanent}
                    maxLength={2}
                    NumberPad
                    halfSize
                    mandatory
                    disabled={isViewOnly}
                  />

                  <LabeledDropdown
                    label="Month"
                    setSelectedOption={setMonthSincePermanent}
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
                    defaultValue={monthSincePermanent}
                    isChange={setIsChangedPermanent}
                    bottom
                    halfSize
                    mandatory
                    disabled={isViewOnly}
                  />
                </View>

                <LabelDropdown
                  label="Residential Type"
                  setSelectedOption={setPermanentResidenceType}
                  options={[
                    'Rented',
                    'Self-Owned',
                    'Family-Owned',
                    'Quarter-Company',
                    'Quarter-Government',
                  ]}
                  defaultValue={permanentResidenceType}
                  open={isOpenPermanentResidence}
                  setDropdownOpen={setIsOpenPermanentResidence}
                  setSelectedItem={() => { }}
                  isChange={setIsChangedPermanent}
                  zIndex={isOpenPermanentResidence ? 1000 : 0}
                  mandatory
                  dropDownDirection='TOP'
                  disabled={isViewOnly}
                />
              </View>

              <Button
                text={isChangedPermanent ? 'Save' : 'Next'}
                active={isActivePermanent && !hasErrorPermanent}
                marginVertical={10}
                marginTop={30}
                onPress={handleSavePermanentAddress}
              />
              <LoanSummaryButton onPress={() => navigation.replace('LoanSummary')} />
            </View>
          )}
      </View>
    </WaveBackground>
  );
};
export default AddressDetails;
