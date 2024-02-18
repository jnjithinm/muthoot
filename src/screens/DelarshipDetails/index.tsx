import React, { FC, useCallback, useEffect, useState } from 'react';
import { RouteProp, useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import WaveBackground from 'components/WaveBackground';
import { useApplicantDetails } from 'context/useApplicantDetails';
import { RootStackParamList } from 'navigation/HomeStack';
import LabeledTextInput from 'components/LabeledTextInput';
import LabeledRadioButtonGroup from 'components/RadioButtonGroup';
import useActive from 'hooks/useActive';
import Button from 'components/Button';
import { ErrorObject } from 'config/Types';
import LabelDropdown from 'components/LabelDropdown ';
import LabeledDropdown from 'components/LabeledDropdown';
import LoanSummaryButton from 'components/LoanSummaryButton';
import {
  useGetDelar,
  useGetSubDelar,
  useGetBranch,
  useGetFranchise,
  useSetDearshipDetails,
  useGetDearshipDetails,
} from 'api/ReactQuery/LoanDetails';
import { setDearshipDetailsRequest } from 'api/ReactQuery/LoanDetails/types';
import { usedViewStatus } from 'context/useViewStatus';

type DelarshipDetailsNavigationProp = StackNavigationProp<
  RootStackParamList,
  'DelarshipDetails'
>;
type DelarshipDetailsRouteProp = RouteProp<
  RootStackParamList,
  'DelarshipDetails'
>;

interface DelarshipDetailsScreenProps {
  navigation: DelarshipDetailsNavigationProp;
  route: DelarshipDetailsRouteProp;
}

const DelarshipDetails: FC<DelarshipDetailsScreenProps> = ({
  navigation,
  route,
}) => {
  interface Item {
    label: string;
    value: string;
    branchName?: string;
    branchCode?: string;
    branchId?: number;
    dealerName?: string;
    dealerCode?: string;
    subDealername?: string;
    subDealerCode?: string;
  }

  const { applicantId, isMainApplicant, guarantorId } = useApplicantDetails();
  const { useViewStatus } = usedViewStatus();
  const [isViewOnly, setIsViewOnly] = useState<boolean>(false);
  const [isError, setIsError] = useState<ErrorObject[]>([]);
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const isNavigate = route.params?.isNavigateEmploymentDetails;
  const [sourcedBy, setSourcedBy] = useState<string>('');
  const [dealer, setDealer] = useState<string>('');
  const [dealerOpen, setDealerOpen] = useState<boolean>(false);
  const [dealerItem, setDealerItem] = useState<any>('');
  const [subDealer, setSubDealer] = useState<string>('');
  const [subDealerOpen, setSubDealerOpen] = useState<boolean>(false);
  const [subDealerItem, setSubDealerItem] = useState<any>('');
  const [franchise, setFranchise] = useState<string>('');
  const [franchiseOpen, setFranchiseOpen] = useState<boolean>(false);
  const [branch, setBranch] = useState<string>('');
  const [branchOpen, setBranchOpen] = useState<boolean>(false);
  const [branchItem, setBranchItem] = useState<any>('');
  const [employeeCode, setEmployeeCode] = useState<string>('');
  const [existingCustomer, setExistingCustomer] = useState<string>('');
  const [satisfactory, setSatisfactory] = useState<string>('');
  const [satisfactoryOpen, setSatisfactoryOpen] = useState<boolean>(false);

  const activeDealerArray = [
    sourcedBy,
    dealer,
    existingCustomer,
    existingCustomer == 'Yes' ? satisfactory : existingCustomer,
  ];
  const activeFranchiseArray = [
    sourcedBy,
    dealer,
    franchise,
    branch,
    employeeCode,
    existingCustomer,
    existingCustomer == 'Yes' ? satisfactory : existingCustomer,
  ];

  let isActive: boolean = useActive(
    sourcedBy == 'Dealer' ? activeDealerArray : activeFranchiseArray,
  );
  let hasError: boolean = isError.some(error => error.hasError === true);

  const setDearshipDetailsRequest: setDearshipDetailsRequest = {
    appId: applicantId,
    isUpdatedBy: isMainApplicant ? applicantId : guarantorId,
    applicantType: isMainApplicant ? 'mainApplicant' : 'guarantor',
    sourcedBy: sourcedBy,
    dealerAndBranch: dealer,
    dealerName: dealerItem?.dealerName,
    dealerCode: dealerItem?.dealerCode || '',
    subDealerName: subDealer,
    subDealerCode: subDealerItem?.subDealerCode || '',
    franchiseSourcedBy: franchise,
    branchName: branch,
    branchCode: branchItem?.branchCode || '',
    employeeCode: employeeCode,
    accountConductsSatisfatcory: satisfactory,
    isExistingCustomerFranchise: existingCustomer == 'Yes' ? true : false,
  };

  const [
    SetDearshipDetails,
    { data: SetDearshipDetailsData, isLoading: SetDearshipDetailsIsLoading },
  ] = useSetDearshipDetails(setDearshipDetailsRequest);

  const [
    getDearshipDetails,
    { data: GetDearshipDetailsData, isLoading: GetDearshipDetailsIsLoading },
  ] = useGetDearshipDetails(`/${'mainApplicant'}/${applicantId}`);

  const [GetDelar, { data: GetDelarData, isLoading: GetDelarDataIsLoading }] =
    useGetDelar(`?applicantType=${'mainApplicant'}&appId=${applicantId}`);

  const [
    GetSubDelar,
    { data: GetSubDelarData, isLoading: GetSubDelarDataIsLoading },
  ] = useGetSubDelar(`?dealerCode=${dealerItem?.dealerCode}`);

  const [
    GetFranchise,
    { data: GetFranchiseData, isLoading: GetFranchiseDataIsLoading },
  ] = useGetFranchise();

  const [GetBranch, { data: GetBranchData, isLoading: GetBranchDataIsLoading }] =
    useGetBranch(`/${franchise}/${applicantId}`);

  useEffect(() => {
    if (GetDearshipDetailsData) {
      console.log("GetDearshipDetailsData", GetDearshipDetailsData);

      setSourcedBy(GetDearshipDetailsData.sourcedBy);
      setDealer(GetDearshipDetailsData.dealerAndBranch);
      setDealerItem({ "dealerCode": GetDearshipDetailsData.dealerCode, 'dealerName': GetDearshipDetailsData.dealerName })
      setSubDealer(GetDearshipDetailsData.subDealerName);
      setBranch(GetDearshipDetailsData.branchName);
      setFranchise(GetDearshipDetailsData.franchiseSourcedBy);
      setEmployeeCode(GetDearshipDetailsData.employeeCode);
      setExistingCustomer(
        GetDearshipDetailsData.isExistingCustomerFranchise ? 'Yes' : 'No',
      );
      setSatisfactory(GetDearshipDetailsData?.accountConductsSatisfatcory);
    }
  }, [GetDearshipDetailsData]);

  useEffect(() => {
    if (SetDearshipDetailsData) {
      navigation.navigate('LoanDetails');
    }
  }, [SetDearshipDetailsData]);

  const FranchiseList: string[] = GetFranchiseData
    ? GetFranchiseData?.map(item => item.code)
    : [];

  const satisfactoryList: Item[] = [
    { label: 'Satisfactory', value: 'Satisfactory' },
    { label: 'Not Satisfactory', value: 'Not Satisfactory' },
  ];

  const DelarList: Item[] = GetDelarData
    ? GetDelarData?.dealerTypeDto?.map(item => ({
      label: item.dealerAndBranch,
      value: item.dealerAndBranch,
      dealerCode: item.dealerCode,
      dealerName: item.dealerName,
    }))
    : [];

  useEffect(() => {
    if (GetBranchData) {
      console.log("GetBranchData", GetBranchData);

    }
  }, [GetBranchData])

  const subDelarList: Item[] = GetSubDelarData
    ? GetSubDelarData?.subDealerTypeDto?.map(item => ({

      label: item.subDealername,
      value: item.subDealername,
      subDealerCode: item.subDealerCode,
      subDealername: item.subDealername,
    }))
    : [];
  // console.log("yyyyyyy", subDelarList)

  const branchDataList: Item[] = GetBranchData
    ? GetBranchData.map(item => ({
      label: item.brnachNameCode,
      value: item.brnachNameCode,
      branchName: item.branchName,
      branchCode: item.branchCode,
    }))
    : [];

  useEffect(() => {
    if (dealer) {
      GetSubDelar.mutateAsync();
    }
  }, [dealer]);

  useEffect(() => {
    if (existingCustomer && isChanged) {
      setSatisfactory('');
    }
  }, [existingCustomer]);

  useEffect(() => {
    if (sourcedBy && isChanged) {
      setFranchise('');
      setEmployeeCode('');
      setBranch('');
    }
  }, [sourcedBy]);

  useEffect(() => {
    if (dealerOpen) {
      setSubDealerOpen(false)
    }
  }, [dealerOpen]);

  useEffect(() => {
    if (subDealerOpen) {
      setDealerOpen(false)
    }
  }, [subDealerOpen]);

  useEffect(() => {
    if (useViewStatus) {
      setIsViewOnly(useViewStatus?.isSubmitToCreditFreeze ? true : false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (applicantId) {
        GetDelar.mutateAsync();
        GetFranchise.mutateAsync();
        getDearshipDetails.mutateAsync();
        setIsChanged(false);
      }
    }, []),
  );
  useEffect(() => {
    if (franchise) {
      GetBranch.mutateAsync();
    }
  }, [franchise]);

  const handleSubmit = () => {
    if (isChanged) {
      SetDearshipDetails.mutateAsync();
    }
    isNavigate
      ? navigation.navigate('LoanDetails', { isNavigateEmploymentDetails: true })
      : navigation.navigate('LoanDetails');
  };

  return (
    <WaveBackground
      loading={[SetDearshipDetailsIsLoading, GetDearshipDetailsIsLoading]}
      title={'Dealership Details'}>
      <LabeledRadioButtonGroup
        heading="Sourced By "
        options={['Dealer', 'Franchise']}
        onChange={setSourcedBy}
        value={sourcedBy}
        isChange={setIsChanged}
        inLine
        disabled={isViewOnly}

      />

      {
        // sourcedBy == 'Dealer' && 
        (
          <>

            <LabeledDropdown
              label="Dealer"
              defaultValue={dealer}
              options={DelarList}
              setSelectedOption={setDealer}
              setSelectedItem={item => {
                setDealerItem(item);
              }}
              bottom
              isChange={setIsChanged}
              mandatory
              disabled={isViewOnly}
            />


            <LabeledDropdown
              label="Sub Dealer"
              defaultValue={subDealer}
              options={subDelarList}
              setSelectedOption={setSubDealer}
              setSelectedItem={item => {
                setSubDealerItem(item);
              }}
              bottom
              isChange={setIsChanged}
              // mandatory
              disabled={isViewOnly}
            />
          </>
        )}

      {sourcedBy == 'Franchise' && (
        // <LabeledRadioButtonGroup
        //   heading="Franchise sourced by"
        //   options={FranchiseList}
        //   onChange={setFranchise}
        //   value={franchise}
        //   isChange={setIsChanged}
        //   inLine
        //   disabled={isViewOnly}

        // />
        <LabeledDropdown
          label="Franchise sourced by"
          defaultValue={franchise}
          options={FranchiseList}
          setSelectedOption={setFranchise}
          isChange={setIsChanged}
          mandatory
          bottom
          disabled={isViewOnly}
        />
      )}

      {sourcedBy == 'Franchise' && (
        <LabeledDropdown
          label="Branch"
          defaultValue={branch}
          options={branchDataList}
          setSelectedOption={setBranch}
          setSelectedItem={item => {
            setBranchItem(item);
          }}
          isChange={setIsChanged}
          mandatory
          bottom
          disabled={isViewOnly}

        />
      )}

      {sourcedBy == 'Franchise' && (
        <LabeledTextInput
          label="Employee Code"
          onChange={setEmployeeCode}
          autoCapitalize="characters"
          defaultValue={employeeCode}
          // disabled={GetPANDetailsData?.documentVerifiedStatus}
          setErrorFlag={setIsError}
          IsErrorArray={isError}
          isChange={setIsChanged}
          mandatory
          disabled={isViewOnly}

        />
      )}

      <LabeledRadioButtonGroup
        heading={`Whether existing customer of ${sourcedBy == 'Franchise' ? franchise : 'MCSL'}?`}
        options={['Yes', 'No']}
        onChange={setExistingCustomer}
        value={existingCustomer}
        isChange={setIsChanged}
        inLine
        disabled={isViewOnly}
      />

      {existingCustomer == 'Yes' && (
        <LabeledDropdown
          label="Account conducts satisfactory?"
          bottom
          defaultValue={satisfactory}
          options={satisfactoryList}
          setSelectedOption={setSatisfactory}
          isChange={setIsChanged}
          disabled={isViewOnly}
        />
      )}

      <Button
        text={isChanged ? 'Save' : 'Next'}
        active={isActive && !hasError}
        marginVertical={10}
        marginTop={30}
        onPress={handleSubmit}
      />
      <LoanSummaryButton onPress={() => navigation.replace('LoanSummary')} />
    </WaveBackground>
  );
};
export default DelarshipDetails;
