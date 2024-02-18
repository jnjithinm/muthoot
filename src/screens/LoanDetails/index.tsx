import React, { FC, useCallback, useEffect, useState } from 'react';
import { RouteProp, useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet, BackHandler } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import WaveBackground from 'components/WaveBackground';
import { useApplicantDetails } from 'context/useApplicantDetails';
import { RootStackParamList } from 'navigation/HomeStack';
import LabelDropdown from 'components/LabelDropdown ';
import Slider from '@react-native-community/slider';
import { ConvertToPrefixedAmount } from 'config/Functions/ConvertToPrefix';
import useShowFlashMessage from 'hooks/useShowFlashMessage';
import LabeledTextInput from 'components/LabeledTextInput';
import LabeledRadioButtonGroup from 'components/RadioButtonGroup';
import useActive from 'hooks/useActive';
import Button from 'components/Button';
import { ErrorObject } from 'config/Types';
import LoanSummaryButton from 'components/LoanSummaryButton';
import {
  useVehicalType,
  useGetManufacture,
  useGetModal,
  useGetSchemeDetails,
  useGetAllSchemeDetails,
  useGetRoadTax,
  useGetTenure,
  useGetEMIValue,
  useGetPLIValue,
  useGetLoanDetails,
  useSetLoanDetails,
  useInsuranceCap
} from '../../api/ReactQuery/LoanDetails';
import {
  getSchemeDetailsRequest,
  emiRequest,
  pliRequest,
  setLoanDetailsRequest,
  getAllSchemeDetailsRequest,
} from '../../api/ReactQuery/LoanDetails/types';
import { useGetBRE2Status } from '../../api/ReactQuery/RuleEngineApi';
import { APP_FONTS, FONT_SIZE } from 'config/Fonts';
import useFontNormalise from 'hooks/useFontNormalise';
import Colors from 'config/Colors';
import { useGetCriff, useGetSherlock } from 'api/ReactQuery/BureauApi';
import { GetSherlockRequest } from 'api/ReactQuery/BureauApi/types';
import Modal from 'components/Modal';
import { usedViewStatus } from 'context/useViewStatus';
import LabeledDropdown from 'components/LabeledDropdown';

type LoanDetailsNavigationProp = StackNavigationProp<
  RootStackParamList,
  'LoanDetails'
>;
type LoanDetailsRouteProp = RouteProp<RootStackParamList, 'LoanDetails'>;

interface LoanDetailsScreenProps {
  navigation: LoanDetailsNavigationProp;
  route: LoanDetailsRouteProp;
}

const LoanDetails: FC<LoanDetailsScreenProps> = ({ navigation }) => {
  const { applicantId, isMainApplicant, guarantorId } =
    useApplicantDetails();
  // var applicantId = "MU963817"
  const { useViewStatus } = usedViewStatus();
  const [isViewOnly, setIsViewOnly] = useState<boolean>(false);

  const [isError, setIsError] = useState<ErrorObject[]>([]);
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const [isRemarkChanged, setIsRemarkChanged] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(60);
  const [isVisibleModal, setIsVisibleModal] = useState<boolean>(false);
  const [stopBureauCalls, setStopBureauCalls] = useState<boolean>(false);
  const [vehicalType, setVehicalType] = useState<string>('');
  const [manufacturer, setManufacturer] = useState<string>('');
  const [vehicleModel, setVehicleModel] = useState<string>('');
  const [scheme, setScheme] = useState<string>('');
  const [schemeItem, setSchemeItem] = useState<any>('');
  const [exShoroomPrice, setExShoroomPrice] = useState<string>('');
  const [exShoroomPriceCaping, setExShoroomPriceCaping] = useState<string>('');
  const [dob, setDob] = useState<any>('');

  const [roadTax, setRoadTax] = useState<string>('');
  const [insuranceAmount, setInsuranceAmount] = useState<string>('');
  const [registrationCharges, setRegistrationCharges] = useState<string>('');
  const [accessories, setAccessories] = useState<string>('');
  const [registrationChargesCamping, setRegistrationChargesCamping] = useState<string>('');
  const [accessoriesCamping, setAccessoriesCamping] = useState<boolean>(false);
  const [maxCapAmnt, setmaxCapAmnt] = useState<string>('');

  const [onRoadPrice, setonRoadPrice] = useState<string>('');
  const [margin, setMargin] = useState<string>('0');
  const [LTV, setLTV] = useState<string>('');
  const [LTVPercentage, setLTVPercentage] = useState<string>('0');
  const [amtRequested, setAmtRequested] = useState<string>('');
  const [approvedLoanAmount, setApprovedLoanAmount] = useState<string>('');
  const [repaymentMode, setRepaymentMode] = useState<string>('');
  const [companyProofId, setCompanyProofId] = useState<string>('');
  const [vintageProof, setVintageProof] = useState<string>('');
  const [tenure, setTenure] = useState<string>('');
  const [tenureOpen, setTenureOpen] = useState<boolean>(false);
  const [ROI, setROI] = useState<any>('');
  const [maxValue, setMaxValue] = useState<string>('500000');
  const [addOnCharges, setAddOnCharges] = useState<string>('700');
  const [noOfAdvEmi, setNoOfAdvEmi] = useState<string>('0');
  const [CLI, setCLI] = useState<string>('');
  const [CLIAmount, setCLIAmount] = useState<string>('700');
  const [CLIAddInLoanAmount, setCLIAddInLoanAmount] = useState<string>('');
  const [PLI, setPLI] = useState<string>('');
  const [PLIAmount, setPLIAmount] = useState<string>('0');
  const [PLIAddInLoanAmount, setPLIAddInLoanAmount] = useState<string>('');

  const [finalLoanAmount, setFinalLoanAmount] = useState<string>('');
  const [EMIAmount, setEMIAmount] = useState<string>('');
  const [advEMIAmount, setAdvEMIAmount] = useState<string>('');
  const [remark, setRemark] = useState<string>('');
  const [downPayment, setDownPayment] = useState<string>('');
  const [serviceCharge, setServiceCharge] = useState<string>('');
  const [documentationCharge, setDocumentationCharge] = useState<string>('');
  const [saveEnable, setSaveEnable] = useState<boolean>(false);
  const [popupVisible, setPopUPVisible] = useState<boolean>(false);
  const [minMarginAmount, setMinMarginAmount] = useState<string>('');
  const [maxLoanAmount, setMaxLoanAmount] = useState<string>('');
  const [nextEnable, setNextEnable] = useState<boolean>(false);
  const [commonPopupVisible, setCommonPopUPVisible] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const getAge = (birthDate: string) => Math.floor((new Date().getTime() - new Date(birthDate).getTime()) / 3.15576e+10);

  const activeArray = [
    vehicalType,
    manufacturer,
    vehicleModel,
    scheme,
    exShoroomPrice,
    roadTax,
    insuranceAmount,
    registrationCharges,
    accessories,
    onRoadPrice,
    margin,
    LTV,
    tenure,
    ROI,
    addOnCharges,
    noOfAdvEmi,
    CLI,
    PLI,
    finalLoanAmount,
    EMIAmount,
    remark,
    amtRequested,
    CLI == 'Yes' ? CLIAddInLoanAmount : true,
    PLI == 'Yes' ? PLIAddInLoanAmount : true

  ];

  const activeEMIArray = [ROI, finalLoanAmount, tenure];

  let isActive: boolean = useActive(activeArray);
  let activeEMI: boolean = useActive(activeEMIArray);

  let hasError: boolean = isError.some(error => error.hasError === true);

  interface Item {
    label: string | number;
    value: string | number;
    schemeCode?: string;
    schemeName?: string;
    tenure?: string;
    roi?: number;
    pliAmount?: string;
  }

  const getSchemeDetailsRequest: getSchemeDetailsRequest = {
    schemeCode: schemeItem?.schemeCode,
    schemeName: scheme,
    appId: isMainApplicant ? applicantId : guarantorId,
  };

  const emiRequest: emiRequest = {
    flatRate: ROI.roi,
    loanAmount: parseFloat(finalLoanAmount),
    tenureInMonths: parseFloat(tenure),
    appId: applicantId,
    applicantType: isMainApplicant ? 'mainApplicant' : 'guarantor',
    schemeCode: schemeItem?.schemeCode,
    schemeName: scheme,
  };

  const pliRequest: pliRequest = {

    applicantId: applicantId,
    loanAmount: approvedLoanAmount,
    tenure: tenure,
  };

  const setLoanDetailsRequest: setLoanDetailsRequest = {
    appId: applicantId,
    applicantType: isMainApplicant ? 'mainApplicant' : 'guarantor',
    updatedBy: isMainApplicant ? applicantId : guarantorId,
    schemeName: scheme,
    schemeId: schemeItem?.schemeCode,
    loanAmountRequested: parseFloat(amtRequested?.replaceAll(',', '')),
    tenure: parseFloat(tenure),
    roi: ROI.roi,
    ltv: parseFloat(LTVPercentage),
    maxLoanAmount: parseFloat(maxValue),
    noOfAdvanceEmi: parseFloat(noOfAdvEmi),
    emiAmount: parseFloat(EMIAmount),
    minAndMaxTenure: 0,
    margin: parseFloat(margin),
    isCli: CLI == 'Yes' ? true : false,
    isCliAddLoan: CLIAddInLoanAmount == 'Yes' ? true : false,
    cliAmount:
    //  CLIAddInLoanAmount == 'Yes' ?  
     parseFloat(CLIAmount) ,
    //  : parseFloat('0'),
    isPli: PLI == 'Yes' ? true : false,
    isPliAddLoan: PLIAddInLoanAmount == 'Yes' ? true : false,
    pliAmount: 
    // PLIAddInLoanAmount == 'Yes' ? 
    parseFloat(PLIAmount), 
    // : parseFloat('0'),
    finalLoanAmount: parseFloat(finalLoanAmount),
    unsignedSanctionLetter: '',
    signSanctionLetter: '',
    remarks: remark,
    manufacturer: manufacturer,
    vehicleType: vehicalType,
    vehicleModel: vehicleModel,
    assetCode: '',
    exShowRoomPrice: parseFloat(exShoroomPrice?.replaceAll(',', '')),
    roadTax: parseFloat(roadTax),
    insurance: parseFloat(insuranceAmount?.replaceAll(',', '')),
    registrationCharges: parseFloat(registrationCharges),
    accessories: parseFloat(accessories),
    ltvAmount: parseFloat(LTV),
    approvedLoanAmount: parseFloat(approvedLoanAmount),
    on_road_price: parseFloat(onRoadPrice),
    downPayment: parseFloat(downPayment),
    addOnCharges: parseFloat(addOnCharges),
    companyProofId: companyProofId,
    repaymentMode: repaymentMode,
    vintageProof: vintageProof,
    serviceCharges: parseFloat(serviceCharge),
    documentationCharges: parseFloat(documentationCharge),
  };

  const GetSherlockRequest: GetSherlockRequest = {
    applicantId: isMainApplicant ? applicantId : guarantorId,
    applicantType: isMainApplicant ? 'mainApplicant' : 'guarantor',
  };

  const [
    GetSherlockResponse,
    { data: GetSherlockResponseData, isLoading: GetSherlockResponseIsLoading },
  ] = useGetSherlock(GetSherlockRequest);


  const [
    GetBRE2Status,
    { data: GetBRE2StatusData, isLoading: GetBRE2StatusIsLoading },
  ] = useGetBRE2Status(
    isMainApplicant ? applicantId : guarantorId,
    isMainApplicant ? 'mainApplicant' : 'guarantor',
  );

  const [
    SetLoanDetails,
    { data: setLoanDetailsData, isLoading: setLoanDetailsIsLoading },
  ] = useSetLoanDetails(setLoanDetailsRequest);

  const [
    GetLoanDetails,
    { data: getLoanDetailsData, isLoading: getLoanDetailsIsLoading },
  ] = useGetLoanDetails(`/${applicantId}/mainApplicant`);

  const [
    GetManufacture,
    { data: GetManufactureData },
  ] = useGetManufacture();

  const [
    VehicalType,
    { data: vechileTypeData },
  ] = useVehicalType(`?manufacturer=${manufacturer}`);

  const [
    GetInsuranceCap,
    { data: InsuranceCapData, isLoading: GetInsuranceCapIsLoading },
  ] = useInsuranceCap(`/${vehicalType}`);

  const [GetModal, { data: modalData }] =
    useGetModal(
      `?vechileType=${vehicalType}&vechileManufacturer=${manufacturer}&appId=${applicantId}`,
    );

  const getAllSchemeDetailsRequest: getAllSchemeDetailsRequest = {
    appId: isMainApplicant ? applicantId : guarantorId,
    applicantType: isMainApplicant ? 'mainApplicant' : 'guarantor',
    manufacturer: manufacturer,
    vechicleModel: vehicleModel,
    vechicleType: vehicalType,
  };

  const [
    GetAllSchemeDetails,
    { data: getAllSchemeDetailsData },
  ] = useGetAllSchemeDetails(getAllSchemeDetailsRequest);

  const [GetCriff, { data: GetCriffData }] =
    useGetCriff({
      applicant_uniqueid: isMainApplicant ? applicantId : guarantorId,
      applicantType: isMainApplicant ? 'mainApplicant' : 'guarantor',
    });

  const [
    GetSchemeDetails,
    { data: schemeDetailsData },
  ] = useGetSchemeDetails(getSchemeDetailsRequest);

  const [GetRoadTax, { data: RoadTaxData }] =
    useGetRoadTax(
      `?appId=${applicantId}&price=${exShoroomPrice?.replaceAll(
        ',',
        '',
      )}&type=${vehicalType}&applicantType=${'mainApplicant'}&manufacture=${manufacturer}&model=${vehicleModel}`,
    );

  const [
    GetTenureDetails,
    { data: getTenureDetailsData },
  ] = useGetTenure(`/${schemeItem?.schemeCode}`);

  // console.log("getTenureDetailsData", getTenureDetailsData);

  const [
    GetEmiValue,
    { data: GetEmiValueData, isLoading: GetEmiValueDataIsLoading },
  ] = useGetEMIValue(emiRequest);

  const [
    GetPLIValue,
    { data: GetPLIValueData, isLoading: GetPLIValueDataIsLoading },
  ] = useGetPLIValue(pliRequest);

  useEffect(() => {
    if (tenure && isChanged) {
      GetPLIValue.mutateAsync()
    }
  }, [tenure])

  useEffect(() => {
    if (GetPLIValueData) {
      console.log("GetPLIValueData,", GetPLIValueData);
      setPLIAmount(GetPLIValueData?.premium?.toString())
      // setRegistrationChargesCamping(InsuranceCapData?.insuranceAmnt?.toString());

    }
  }, [GetPLIValueData])

  useEffect(() => {
    if (vehicalType) {
      GetInsuranceCap.mutateAsync()
    }
  }, [vehicalType])

  useEffect(() => {
    if (InsuranceCapData) {
      setRegistrationChargesCamping(InsuranceCapData?.insuranceAmnt?.toString());
      setmaxCapAmnt(InsuranceCapData?.maxCapAmnt?.toString() || '0');
      setAccessoriesCamping(InsuranceCapData?.accessories);

    }
  }, [InsuranceCapData])

  useEffect(() => {
    if (GetBRE2StatusData) {
      console.log("GetBRE2StatusData", GetBRE2StatusData);
      GetCriff.mutateAsync();

      setStopBureauCalls(true);
      // if (GetBRE2StatusData.bre2status === 'Bre2_Approved') {
      //   navigation.navigate('LoanOffer');
      // } else if (
      //   GetBRE2StatusData.bre2status === 'Bre2_Manual' &&
      //   GetCriffData
      // ) {
      //   setTimer(60);
      //   setIsProcessing(false);
      //   navigation.navigate('ManualUnderwriting1', {
      //     GetCriffResponse: GetCriffData,
      //     isNavigateLoanOffer: true,
      //   });
      // } else if (GetBRE2StatusData.bre2status === 'Bre2_Rejected') {
      //   setTimer(60);
      //   setIsProcessing(false);
      //   navigation.navigate('LoanRejected');
      // }
    }
  }, [GetBRE2StatusData]);

  useEffect(() => {
    if (GetBRE2StatusData) {

      setStopBureauCalls(true);
      if (GetBRE2StatusData.bre2status === 'Bre2_Approved') {
        navigation.navigate('LoanOffer');
      } else if (
        GetBRE2StatusData.bre2status === 'Bre2_Manual' &&
        GetCriffData
      ) {
        setTimer(60);
        setIsProcessing(false);
        navigation.navigate('ManualUnderwriting1', {
          GetCriffResponse: GetCriffData,
          isNavigateLoanOffer: true,
        });
      } else if (GetBRE2StatusData.bre2status === 'Bre2_Rejected') {
        setTimer(60);
        setIsProcessing(false);
        navigation.navigate('LoanRejected');
      }
    }
  }, [GetCriffData]);

  useEffect(() => {
    if (setLoanDetailsData) {
      GetSherlockResponse.mutateAsync();
      setIsProcessing(true);
      setNextEnable(true)
    }
  }, [setLoanDetailsData]);

  useEffect(() => {
    if (timer > 0 && isProcessing) {
      if (timer % 20 === 0 && timer != 60 && !stopBureauCalls) {
        GetSherlockResponse.mutateAsync();
      }
      setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsVisibleModal(true);
      setTimer(60);
      setIsProcessing(false);

    }
  }, [timer, isProcessing]);

  useEffect(() => {
    if (GetSherlockResponseData) {
      // console.log("GetSherlockResponseData", GetSherlockResponseData);

      if (
        GetSherlockResponseData.sherlockStatus === 'APPROVED' ||
        GetSherlockResponseData.sherlockStatus === 'REFER' ||
        GetSherlockResponseData?.sherlockStatus === 'IN_PROCESS'
      ) {
        setIsProcessing(false);
        GetBRE2Status.mutateAsync();
        // GetCriff.mutateAsync();

      }
      else if (GetSherlockResponseData?.sherlockStatus === 'REJECT') {
        setIsProcessing(false);
        navigation.navigate('LoanRejected');
      }

    }
    else if (GetSherlockResponseData) {
      // console.log("GetSherlockResponseData fail");
      setIsProcessing(false);
      GetBRE2Status.mutateAsync();
      // GetCriff.mutateAsync();

    }
    //if sherlock fails - temporary
  }, [GetSherlockResponseData]);

  useEffect(() => {
    if (getLoanDetailsData) {
      // console.log('getLoanDetailsData', getLoanDetailsData);
      setDocumentationCharge(
        (Math.ceil(parseFloat(getLoanDetailsData?.documentationCharges)))?.toString() || '0',
      );
      setServiceCharge(getLoanDetailsData?.serviceCharges?.toString() || '0');
      setManufacturer(getLoanDetailsData?.manufacturer);
      setVehicalType(getLoanDetailsData?.vehicleType);
      setVehicleModel(getLoanDetailsData?.vehicleModel);
      setScheme(getLoanDetailsData?.schemeName);
      setSchemeItem({ schemeCode: getLoanDetailsData?.schemeId });
      setExShoroomPrice(getLoanDetailsData?.exShowRoomPrice?.toString());
      setRoadTax(getLoanDetailsData?.roadTax?.toString());
      setRegistrationCharges(
        getLoanDetailsData?.registrationCharges?.toString(),
      );
      setAccessories(getLoanDetailsData?.accessories?.toString());
      setInsuranceAmount(getLoanDetailsData?.insurance?.toString());
      setonRoadPrice(getLoanDetailsData?.on_road_price?.toString());
      setLTVPercentage(getLoanDetailsData?.ltv?.toString());
      setLTV(getLoanDetailsData?.ltvAmount?.toString());
      setMargin(getLoanDetailsData?.margin?.toString());
      setAmtRequested(getLoanDetailsData?.loanAmountRequested?.toString());
      setApprovedLoanAmount(
        getLoanDetailsData?.approvedLoanAmount?.toString() || '0',
      );
      setTenure(getLoanDetailsData?.tenure?.toString());
      setROI({ roi: getLoanDetailsData?.roi?.toString() });
      setAddOnCharges(getLoanDetailsData?.addOnCharges?.toString());
      setCLI(getLoanDetailsData?.isCli ? 'Yes' : 'No');
      setCLIAddInLoanAmount(getLoanDetailsData?.isCliAddLoan ? 'Yes' : 'No');
      // setCLIAmount(getLoanDetailsData?.cliAmount?.toString());
      setPLI(getLoanDetailsData?.isPli ? 'Yes' : 'No');
      setPLIAddInLoanAmount(getLoanDetailsData?.isPliAddLoan ? 'Yes' : 'No');
      setPLIAmount(getLoanDetailsData?.pliAmount?.toString());
      setFinalLoanAmount(getLoanDetailsData?.finalLoanAmount?.toString());
      setEMIAmount(getLoanDetailsData?.emiAmount?.toString());
      setNoOfAdvEmi(getLoanDetailsData?.noOfAdvanceEmi?.toString());
      setRemark(getLoanDetailsData?.remarks);
      setMaxValue(getLoanDetailsData?.maxLoanAmount?.toString());
      setMaxLoanAmount(getLoanDetailsData?.maxLoanAmount?.toString());
      setDownPayment(getLoanDetailsData?.downPayment?.toString());
      setAdvEMIAmount((getLoanDetailsData?.emiAmount * getLoanDetailsData?.noOfAdvanceEmi)?.toString());
      setSaveEnable(true);
      setNextEnable(true)

    }
  }, [getLoanDetailsData]);

  
  useEffect(() => {
    if (GetEmiValueData && GetEmiValueData.appId) {
      console.log('addd', GetEmiValueData?.emiWithBpi * parseFloat(noOfAdvEmi) +
        parseFloat(GetEmiValueData?.serviceCharges) +
        parseFloat(margin) +
        parseFloat(CLI == 'No' ? '0' : CLIAddInLoanAmount == 'Yes' ? '0' : CLIAmount) +
        parseFloat(PLI == 'No' ? '0' : PLIAddInLoanAmount == 'Yes' ? '0' : PLIAmount) +
        parseFloat(GetEmiValueData?.documentationCharges));

      console.log("mjjj",
        GetEmiValueData?.emiWithBpi * parseFloat(noOfAdvEmi),
        parseFloat(GetEmiValueData?.serviceCharges),
        parseFloat(margin),
        parseFloat(CLI == 'No' ? '0' : CLIAddInLoanAmount == 'Yes' ? '0' : CLIAmount),
        parseFloat(PLI == 'No' ? '0' : PLIAddInLoanAmount == 'Yes' ? '0' : PLIAmount),
        parseFloat(GetEmiValueData?.documentationCharges));

      setSaveEnable(true);
      setNextEnable(false)
      setIsChanged(false)
      setEMIAmount(GetEmiValueData?.emiWithBpi?.toString());
      setAdvEMIAmount(
        (GetEmiValueData?.emiWithBpi * parseFloat(noOfAdvEmi)).toString() ||
        '0',
      );
      setServiceCharge(Math.ceil(parseFloat(GetEmiValueData?.serviceCharges))?.toString() || '0');
      setDocumentationCharge(Math.ceil(parseFloat(GetEmiValueData?.documentationCharges))?.toString() || '0');
      setRepaymentMode(GetEmiValueData?.repaymentMode);
      setCompanyProofId(GetEmiValueData?.companyProofId);
      setVintageProof(GetEmiValueData?.vintageProof);

      setDownPayment(
        Math.ceil(
          GetEmiValueData?.emiWithBpi * parseFloat(noOfAdvEmi) +
          Math.ceil(parseFloat(GetEmiValueData?.serviceCharges)) +
          parseFloat(margin) +
          parseFloat(CLI == 'No' ? '0' : CLIAddInLoanAmount == 'Yes' ? '0' : CLIAmount) +
          parseFloat(PLI == 'No' ? '0' : PLIAddInLoanAmount == 'Yes' ? '0' : PLIAmount) +
          parseFloat(GetEmiValueData?.documentationCharges),
        ).toString() || '0',
      );

    }
    else if (GetEmiValueData) {
      setPopUPVisible(true),
        setIsChanged(true)
      setSaveEnable(false)
    }
  }, [GetEmiValueData]);

  useEffect(() => {
    if (exShoroomPrice && isChanged) {

      parseFloat(exShoroomPrice?.replaceAll(',', '')) > parseFloat(exShoroomPriceCaping) ?
        (setExShoroomPrice(exShoroomPriceCaping),
          useShowFlashMessage(
            'warning',
            `Please decrease the ex-showroom price as it exceeding the limit ₹ ${ConvertToPrefixedAmount(
              exShoroomPriceCaping,
            )}`,
          )
        )
        : null
    }
  }, [exShoroomPrice]);



  useEffect(() => {
    if (registrationCharges && isChanged) {

      setAccessories('')
      parseFloat(registrationCharges?.replaceAll(',', '')) > parseFloat(registrationChargesCamping) ?
        (setRegistrationCharges(registrationChargesCamping),
          useShowFlashMessage(
            'warning',
            `Please decrease the Registration Charges as it exceeding the limit ₹ ${ConvertToPrefixedAmount(
              registrationChargesCamping,
            )}`,
          )
        )
        : null
    }
  }, [registrationCharges]);

  useEffect(() => {
    if (accessories && isChanged) {

      var accessoriesCampingAmt: number = accessoriesCamping ? (parseFloat(maxCapAmnt) - parseFloat(registrationCharges ? (registrationCharges?.replaceAll(',', '')) : '0')) : 0
      // console.log("ffffff", accessoriesCamping, accessoriesCampingAmt);

      parseFloat(accessories?.replaceAll(',', '')) > (accessoriesCampingAmt) ?
        (setAccessories(accessoriesCampingAmt?.toString()),
          useShowFlashMessage(
            'warning',
            `Please decrease the Accessories price as it exceeding the limit ₹ ${ConvertToPrefixedAmount(
              accessoriesCampingAmt?.toString(),
            )}`,
          )
        )
        : null
    }
  }, [accessories]);

  const handleTenure = (item) => {

    // setPLIAmount(Math.ceil(parseFloat(item.pliAmount)).toString())

    var datearray = dob.split("-");
    var newdate = datearray[2] + '-' + datearray[1] + '-' + datearray[0];
    var age = getAge(newdate) + (parseFloat(item.tenure) / 12)
    // console.log("pppppppp", age, getAge(newdate), (parseFloat(item.tenure) / 12));

    Number(age) > Number(68) ? setTenure('') : null;
    Number(age) > Number(68) ? setROI('') : setROI(item);
    Number(age) > Number(68) ?
      useShowFlashMessage(
        'warning',
        `Please decrease the Tenure as it exceeding the limit`,
      ) : null
  };


  useEffect(() => {
    // console.log('exShowRoomPrice', RoadTaxData?.exShowRoomPrice);

    if (RoadTaxData && exShoroomPrice && isChanged) {
      // setRegistrationChargesCamping(RoadTaxData?.registration?.toString() || '0');
      // setAccessoriesCamping(RoadTaxData?.accessories?.toString() || '0');
      setRoadTax(RoadTaxData?.roadTaxCalculated?.toString() || '0');
      setExShoroomPriceCaping(RoadTaxData?.exShowRoomPrice?.toString() || '0');
      setDob(RoadTaxData.dob?.toString())

    }
  }, [RoadTaxData]);

  const manufactureList: Item[] = GetManufactureData
    ? GetManufactureData.map(item => ({
      label: item.manufacture,
      value: item.manufacture,
    }))
    : [];

  const vehicalTypeList: Item[] = vechileTypeData
    ? vechileTypeData.map(item => ({
      label: item.category,
      value: item.category,
    }))
    : [];

  const modalList: Item[] = modalData
    ? modalData.map(item => ({
      label: item.model,
      value: item.model,
    }))
    : [];

  const getAllSchemeDetails: Item[] = getAllSchemeDetailsData
    ? getAllSchemeDetailsData.map(item => ({
      label: item.schemeName,
      value: item.schemeName,
      schemeCode: item.schemeCode,
      schemeName: item.schemeName,
    }))
    : [];

  const getTenureDetails: Item[] = getTenureDetailsData
    ? getTenureDetailsData.map(item => ({
      label: item.tenure?.toString(),
      value: item.tenure?.toString(),
      roi: item.roi,
      tenure: item.tenure?.toString(),
      pliAmount: item?.pliAmount?.toString()
    }))
    : [];


  useEffect(() => {
    if (manufacturer && isChanged) {
      setVehicalType('')
      setVehicleModel('')
      setScheme('')
    }
  }, [manufacturer])

  useEffect(() => {
    if (vehicalType && isChanged) {
      setVehicleModel('')
      setScheme('')
    }
  }, [vehicalType])

  useEffect(() => {
    if (vehicleModel && isChanged) {
      setScheme('')
    }
  }, [vehicleModel])




  useEffect(() => {
    // console.log('eeeeeee', amtRequested, LTV, isChanged);

    if (amtRequested && LTV && isChanged) {
    

      parseFloat(amtRequested?.replaceAll(',', '')) > parseFloat(maxValue) ?
        (
          setAmtRequested(maxValue.toString()),
          useShowFlashMessage(
            'warning',
            `Please decrease the requested amount as it exceeding the limit ₹ ${ConvertToPrefixedAmount(
              maxValue.toString(),
            )}`,
          )
        )
        : null
      setApprovedLoanAmount(
        `${parseFloat(amtRequested?.replaceAll(',', '')) > parseFloat(maxValue)
          ? Math.ceil(parseFloat(maxValue)).toString()
          : Math.ceil(parseFloat(amtRequested?.replaceAll(',', ''))).toString()
        }`,
      );
    }
  }, [amtRequested, scheme, LTV, LTVPercentage, maxValue]);

  useEffect(() => {
    if (approvedLoanAmount && isChanged) {

      var loanAmount = `${parseFloat(approvedLoanAmount?.replaceAll(',', '')) +
        (CLIAddInLoanAmount == 'Yes'
          ? parseFloat(CLIAmount?.replaceAll(',', ''))
          : 0) +
        (PLIAddInLoanAmount == 'Yes'
          ? parseFloat(PLIAmount?.replaceAll(',', ''))
          : 0)
        // + parseFloat(addOnCharges?.replaceAll(',', ''))
        }`

      parseFloat(loanAmount) > parseFloat(maxValue) ?
        (
          setFinalLoanAmount(''),
          setCommonPopUPVisible(true),
          setErrorMsg(`Please decrease the requested amount as it exceeding the limit ₹ ${ConvertToPrefixedAmount(
            maxValue.toString()
          )}`),
          useShowFlashMessage(
            'warning',
            `Please decrease the requested amount as it exceeding the limit ₹ ${ConvertToPrefixedAmount(
              maxValue.toString()
            )}`,
          )
        )
        :
        setFinalLoanAmount(Math.ceil(parseFloat(loanAmount)).toString());
    }
  }, [approvedLoanAmount, CLIAddInLoanAmount, PLIAddInLoanAmount, scheme, LTVPercentage]);

  useEffect(() => {
    if (CLI && isChanged) {
      setCLIAddInLoanAmount('');
    }
  }, [CLI]);
  useEffect(() => {
    if (PLI && isChanged) {
      setPLIAddInLoanAmount('');
    }
  }, [PLI]);

  useEffect(() => {
    if (onRoadPrice && amtRequested && isChanged) {
      const marginValue: any =
        parseFloat(onRoadPrice) - parseFloat(approvedLoanAmount);
      console.log('ltvValue', minMarginAmount, marginValue, LTV);
      setMargin(
        parseFloat(minMarginAmount) > parseFloat(marginValue)
          ? Math.ceil(parseFloat(minMarginAmount)).toString()
          : Math.ceil(parseFloat(marginValue)).toString(),
      );
    }
  }, [onRoadPrice, amtRequested, scheme, LTVPercentage, approvedLoanAmount]);



  useEffect(() => {
    if ((exShoroomPrice || roadTax || insuranceAmount || registrationCharges || accessories) && isChanged) {

      const ltvValue: any =
        parseFloat(exShoroomPrice?.replaceAll(',', '')) +
        parseFloat(insuranceAmount?.replaceAll(',', '')) +
        parseFloat(registrationCharges) +
        parseFloat(roadTax) +
        parseFloat(accessories);
      const maxValue = (
        (parseFloat(LTVPercentage) / 100) *
        ltvValue
      )?.toString();
      // console.log('ltvValue', ltvValue, LTVPercentage, maxValue, maxLoanAmount);
      setonRoadPrice(ltvValue);
      setLTV(
        maxValue == '0'
          ? Math.ceil(parseFloat(maxLoanAmount)).toString()
          : ((parseFloat(LTVPercentage) / 100) * ltvValue)?.toString() || '0',
      );
      setMaxValue(
        (maxValue == '0'
          ? maxLoanAmount
          : parseFloat(maxValue) < parseFloat(maxLoanAmount)
            ? Math.ceil(parseFloat(maxValue)).toString()
            : Math.ceil(parseFloat(maxLoanAmount)).toString()) || '0',
      );
    }
  }, [
    exShoroomPrice,
    roadTax,
    insuranceAmount,
    registrationCharges,
    accessories,
    scheme,
    LTVPercentage,
  ]);

  useEffect(() => {
    if (exShoroomPrice && isChanged) {

      GetRoadTax.mutateAsync();
    }
    // else {
    //   // console.log("exxxxxxx", exShoroomPrice);
    //   setRoadTax('')
    // }
  }, [exShoroomPrice, vehicalType]);

  useEffect(() => {
    if (schemeDetailsData && isChanged) {

      setLTVPercentage(schemeDetailsData?.ltv?.toString() || '0');
      setNoOfAdvEmi(schemeDetailsData?.advanceEmi?.toString() || '0');
      setMinMarginAmount(schemeDetailsData.minMarginAmount?.toString() || '0');
      setMaxLoanAmount(schemeDetailsData?.maxLoanAmount?.toString() || '0');
    }
  }, [schemeDetailsData]);

  useEffect(() => {
    if (scheme && isChanged) {
      GetSchemeDetails.mutateAsync();
      GetTenureDetails.mutateAsync();
    }
  }, [scheme]);

  useEffect(() => {
    if (vehicalType&& isChanged) {
      GetModal.mutateAsync();
    }
  }, [vehicalType]);

  useEffect(() => {
    if (manufacturer && isChanged) {
      VehicalType.mutateAsync();
    }
  }, [manufacturer]);

  useEffect(() => {
    if (manufacturer && vehicalType && vehicleModel) {
      GetAllSchemeDetails.mutateAsync();
    }
  }, [manufacturer && vehicalType && vehicleModel]);

  useFocusEffect(
    useCallback(() => {
      if (applicantId) {
        GetManufacture.mutateAsync();
        GetLoanDetails.mutateAsync();
        setIsChanged(false);
      }
      // const onBackPress = () => {
      //   navigation.navigate('DelarshipDetails');
      //   return true;
      // };
      // BackHandler.addEventListener('hardwareBackPress', onBackPress);
      // return () =>
      //   BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  useEffect(() => {
    if (isChanged) {
      setSaveEnable(false);
    }
  }, [isChanged]);

  useEffect(() => {
    if (saveEnable && isChanged) {
      setNextEnable(false);
    }
  }, [remark]);


  useEffect(() => {
    if (useViewStatus) {
      console.log("useViewStatus",useViewStatus);
      setIsViewOnly(useViewStatus?.isSubmitToCreditFreeze ? true : false);
    }
  }, []);

  const handleSubmit = () => {
    if (saveEnable) {
      SetLoanDetails.mutateAsync();
    } else {
      setIsProcessing(true);
      GetSherlockResponse.mutateAsync();
      // navigation.navigate('LoanOffer');
    }
  };


  return (
    <WaveBackground
      loading={[
        GetEmiValueDataIsLoading,
        setLoanDetailsIsLoading,
        getLoanDetailsIsLoading,
        GetBRE2StatusIsLoading,
        GetSherlockResponseIsLoading,
        isProcessing,
        GetInsuranceCapIsLoading,
        GetPLIValueDataIsLoading
      ]}
      title={'Loan Details'}
      isProcessingScreen={isProcessing}
      timer={timer}>
      <Modal
        title="Sherlock Service Error"
        status="failure"
        onClose={() => {
          setIsVisibleModal(false);
          GetBRE2Status.mutateAsync();
          // GetCriff.mutateAsync();
        }}
        message={
          'Sherlock Services is facing an error disrupting its operations. Our team is swiftly resolving it for full functionality. Thank you for your patience'
        }
        visible={isVisibleModal}
        buttonTitle="Okay"
      />
      <Modal
        buttonTitle="Okay"
        title=""
        status="normal"
        message="Please decrease your loan amount beacuse it is exceeding as per our Policy restriction."
        visible={popupVisible}
        onClose={() => {
          setPopUPVisible(false);

        }}
      />

      <Modal
        buttonTitle="Okay"
        title=""
        status="normal"
        message={errorMsg}
        visible={commonPopupVisible}
        onClose={() => {
          setCommonPopUPVisible(false);

        }}
      />

      <LabeledDropdown
        label="Manufacturer"
        defaultValue={manufacturer}
        options={manufactureList}
        setSelectedOption={setManufacturer}
        bottom
        isChange={setIsChanged}
        mandatory
        disabled={isViewOnly}
      />

      <LabeledDropdown
        label="Vehicle Type"
        defaultValue={vehicalType}
        options={vehicalTypeList}
        setSelectedOption={setVehicalType}
        bottom
        isChange={setIsChanged}
        mandatory
        disabled={isViewOnly}
      />

      <LabeledDropdown
        label="Vehicle Model"
        defaultValue={vehicleModel}
        options={modalList}
        setSelectedOption={setVehicleModel}
        bottom
        isChange={setIsChanged}
        mandatory
        disabled={isViewOnly}
      />

      <LabeledDropdown
        label="Scheme"
        defaultValue={scheme}
        options={getAllSchemeDetails}
        setSelectedOption={setScheme}
        bottom
        setSelectedItem={item => {
          setSchemeItem(item);
        }}
        isChange={setIsChanged}
        mandatory
        disabled={isViewOnly}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <LabeledTextInput
          label="Ex-Showroom Price"
          onChange={setExShoroomPrice}
          autoCapitalize="characters"
          defaultValue={exShoroomPrice}
          // disabled={GetPANDetailsData?.documentVerifiedStatus}
          setErrorFlag={setIsError}
          IsErrorArray={isError}
          isChange={setIsChanged}
          mandatory
          halfSize
          NumberPad
          disabled={isViewOnly}
        />

        <LabeledTextInput
          label="Road Tax"
          onChange={setRoadTax}
          autoCapitalize="characters"
          defaultValue={roadTax}
          disabled
          setErrorFlag={setIsError}
          IsErrorArray={isError}
          isChange={setIsChanged}
          mandatory
          halfSize

        />
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <LabeledTextInput
          label="Registration Charge"
          onChange={setRegistrationCharges}
          autoCapitalize="characters"
          defaultValue={registrationCharges}
          disabled={isViewOnly}
          setErrorFlag={setIsError}
          IsErrorArray={isError}
          isChange={setIsChanged}
          mandatory
          halfSize
          NumberPad
        />

        <LabeledTextInput
          label="Accessories"
          onChange={setAccessories}
          autoCapitalize="characters"
          defaultValue={accessories}
          disabled={isViewOnly}
          setErrorFlag={setIsError}
          IsErrorArray={isError}
          isChange={setIsChanged}
          mandatory
          halfSize
          NumberPad
        />
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <LabeledTextInput
          label="Insurance Amount"
          onChange={setInsuranceAmount}
          autoCapitalize="characters"
          defaultValue={insuranceAmount}
          // disabled={GetPANDetailsData?.documentVerifiedStatus}
          setErrorFlag={setIsError}
          IsErrorArray={isError}
          isChange={setIsChanged}
          mandatory
          halfSize
          NumberPad
          disabled={isViewOnly}

        />

        <LabeledTextInput
          label="On Road Price"
          onChange={setonRoadPrice}
          autoCapitalize="characters"
          defaultValue={onRoadPrice}
          disabled
          setErrorFlag={setIsError}
          IsErrorArray={isError}
          isChange={setIsChanged}
          mandatory
          halfSize
        />
      </View>

      {/* <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <LabeledTextInput
          label="LTV (%)"
          onChange={setLTVPercentage}
          autoCapitalize="characters"
          defaultValue={LTVPercentage}
          disabled
          setErrorFlag={setIsError}
          IsErrorArray={isError}
          isChange={setIsChanged}
          mandatory
          halfSize
        />
        <LabeledTextInput
          label="LTV"
          onChange={setLTV}
          autoCapitalize="characters"
          defaultValue={LTV}
          disabled
          setErrorFlag={setIsError}
          IsErrorArray={isError}
          isChange={setIsChanged}
          mandatory
          halfSize
        />
      </View> */}

      <LabeledTextInput
        label="Loan Amount Requested"
        onChange={setAmtRequested}
        autoCapitalize="characters"
        defaultValue={amtRequested}
        // disabled={GetPANDetailsData?.documentVerifiedStatus}
        setErrorFlag={setIsError}
        IsErrorArray={isError}
        isChange={setIsChanged}
        mandatory
        NumberPad
        disabled={isViewOnly}

      />

      <Slider
        style={{ width: '100%', height: 40 }}
        disabled={isViewOnly}
        value={parseFloat(amtRequested?.replaceAll(',', '')) || 0}
        onValueChange={amount => {
          // console.log('kkkkk', amtRequested, amount);
          setIsChanged(true);
          setAmtRequested(amount.toString());
        }}
        minimumValue={10000}
        maximumValue={parseInt(maxValue)}
        minimumTrackTintColor={Colors.Primary}
        maximumTrackTintColor="#4a4a4a"
        thumbTintColor={Colors.Primary}
        step={300}
      />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: -10,
          paddingHorizontal: 15,
        }}>
        <Text style={{ color: Colors.Black }}>{'20K'}</Text>
        <Text style={{ color: Colors.Black }}>{`${ConvertToPrefixedAmount(
          maxValue,
        ).toString()}`}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          // marginTop: -10,
          paddingHorizontal: 15,
        }}>
        <Text style={{ color: Colors.Black }}>{'Min'}</Text>
        <Text style={{ color: Colors.Black }}>{`Max`}</Text>
      </View>

      <View style={[style.FinalLabel, { marginTop: 30 }]}>
        <Text style={style.Label}>{`Loan Amount Requested : `}</Text>
        <Text style={[style.StaticLabel]}>{`₹${ConvertToPrefixedAmount(
          amtRequested,
        )}`}</Text>
      </View>

      <View style={[style.FinalLabel, {}]}>
        <Text style={style.Label}>{`Loan Amount : `}</Text>
        <Text style={[style.StaticLabel]}>{`₹${ConvertToPrefixedAmount(
          approvedLoanAmount,
        )}`}</Text>
      </View>

      <View style={[style.FinalLabel, { marginBottom: 20 }]}>
        <Text style={style.Label}>{`Margin : `}</Text>
        <Text style={[style.StaticLabel]}>{`₹${ConvertToPrefixedAmount(
          margin,
        )}`}</Text>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <LabelDropdown
          label="Tenure"
          open={tenureOpen}
          setDropdownOpen={setTenureOpen}
          defaultValue={tenure}
          options={getTenureDetails}
          setSelectedOption={setTenure}
          setSelectedItem={item => {
            handleTenure(item)
          }}
          isChange={setIsChanged}
          mandatory
          zIndex={tenureOpen ? 1000 : 0}
          halfSize
          disabled={isViewOnly}
        />

        <LabeledTextInput
          label="ROI"
          onChange={setROI}
          autoCapitalize="characters"
          defaultValue={ROI.roi}
          setErrorFlag={setIsError}
          IsErrorArray={isError}
          isChange={setIsChanged}
          mandatory
          halfSize
          disabled
        />
      </View>

      <LabeledRadioButtonGroup
        heading="Do you want CLI?"
        options={['Yes', 'No']}
        onChange={setCLI}
        value={CLI}
        isChange={setIsChanged}
        inLine
        disabled={isViewOnly}
      />

      {CLI == 'Yes' && (
        <LabeledRadioButtonGroup
          heading="Do you want to add CLI amount in loan?"
          options={['Yes', 'No']}
          onChange={setCLIAddInLoanAmount}
          value={CLIAddInLoanAmount}
          isChange={setIsChanged}
          inLine
          disabled={isViewOnly}
        />
      )}

      <LabeledRadioButtonGroup
        heading="Do you want PLI?"
        options={['Yes', 'No']}
        onChange={setPLI}
        value={PLI}
        isChange={setIsChanged}
        inLine
        disabled={isViewOnly}
      />

      {PLI == 'Yes' && (
        <LabeledRadioButtonGroup
          heading="Do you want to add PLI amount in loan?"
          options={['Yes', 'No']}
          onChange={setPLIAddInLoanAmount}
          value={PLIAddInLoanAmount}
          isChange={setIsChanged}
          inLine
          disabled={isViewOnly}
        />
      )}

      {CLIAddInLoanAmount == 'Yes' && (
        <View style={style.FinalLabel}>
          <Text style={style.Label}>{`CLI Amount : `}</Text>
          <Text style={[style.StaticLabel]}>{`₹${ConvertToPrefixedAmount(
            CLIAmount,
          )}`}</Text>
        </View>
      )}

      {PLIAddInLoanAmount == 'Yes' && (
        <View style={style.FinalLabel}>
          <Text style={style.Label}>{`PLI Amount : `}</Text>
          <Text style={[style.StaticLabel]}>{`₹${ConvertToPrefixedAmount(
            PLIAmount,
          )}`}</Text>
        </View>
      )}
      {/* <View style={style.FinalLabel}>
        <Text style={style.Label}>{`Add On Charges : `}</Text>
        <Text style={[style.StaticLabel]}>{`₹${ConvertToPrefixedAmount(
          addOnCharges
        )}`}</Text>
      </View> */}
      <View style={style.FinalLabel}>
        <Text style={style.Label}>{`Final Loan Amount : `}</Text>
        <Text style={[style.StaticLabel]}>{`₹${ConvertToPrefixedAmount(
          finalLoanAmount,
        )}`}</Text>
      </View>

      <Button
        text={'Calculate EMI'}
        active={activeEMI}
        marginVertical={10}
        marginTop={30}
        onPress={() => {
          isViewOnly ? null :
            GetEmiValue.mutateAsync();
        }}
      />

      <View style={[style.FinalLabel, { marginTop: 10 }]}>
        <Text style={style.Label}>{`EMI Amount : `}</Text>
        <Text style={[style.StaticLabel]}>{`₹${ConvertToPrefixedAmount(
          EMIAmount,
        )}`}</Text>
      </View>
      <View style={style.FinalLabel}>
        <Text style={style.Label}>{`Advance EMI : `}</Text>
        <Text style={[style.StaticLabel]}>{`${ConvertToPrefixedAmount(
          noOfAdvEmi,
        )}`}</Text>
      </View>
      <View style={style.FinalLabel}>
        <Text style={style.Label}>{`Advance Emi Amount : `}</Text>
        <Text style={[style.StaticLabel]}>{`₹${ConvertToPrefixedAmount(
          advEMIAmount,
        )}`}</Text>
      </View>
      <View style={style.FinalLabel}>
        <Text style={style.Label}>{`Service Charge : `}</Text>
        <Text style={[style.StaticLabel]}>{`₹${ConvertToPrefixedAmount(
          serviceCharge,
        )}`}</Text>
      </View>
      <View style={style.FinalLabel}>
        <Text style={style.Label}>{`Documentation Charge : `}</Text>
        <Text style={[style.StaticLabel]}>{`₹${ConvertToPrefixedAmount(
          documentationCharge
        )}`}</Text>
      </View>

      {CLI == 'Yes' && CLIAddInLoanAmount == 'No' && (
        <View style={style.FinalLabel}>
          <Text style={style.Label}>{`CLI Amount : `}</Text>
          <Text style={[style.StaticLabel]}>{`₹${ConvertToPrefixedAmount(
            CLIAmount,
          )}`}</Text>
        </View>
      )}
      {PLI == 'Yes' && PLIAddInLoanAmount == 'No' && (
        <View style={style.FinalLabel}>
          <Text style={style.Label}>{`PLI Amount : `}</Text>
          <Text style={[style.StaticLabel]}>{`₹${ConvertToPrefixedAmount(
            PLIAmount,
          )}`}</Text>
        </View>
      )}
      <View style={style.FinalLabel}>
        <Text style={style.Label}>{`Downpayment : `}</Text>
        <Text style={[style.StaticLabel]}>{`₹${ConvertToPrefixedAmount(
          downPayment,
        )}`}</Text>
      </View>

      <LabeledTextInput
        label="Remark"
        onChange={setRemark}
        defaultValue={remark}
        setErrorFlag={setIsError}
        IsErrorArray={isError}
        isChange={setIsRemarkChanged}
        mandatory
        disabled={isViewOnly}
      />

      <Button
        text={nextEnable ? 'Next' : 'Save'}
        active={isChanged ? saveEnable && isActive && !hasError : isActive && !hasError}
        marginVertical={10}
        marginTop={30}
        onPress={() => { isViewOnly ? navigation.navigate('LoanOffer') : handleSubmit() }}
      />
      <LoanSummaryButton onPress={() => navigation.replace('LoanSummary')} />
    </WaveBackground>
  );

};
export default LoanDetails;
const style = StyleSheet.create({
  Label: {
    color: Colors.SubHeadingGrey,
    fontFamily: APP_FONTS.Roboto_Regular,
    fontSize: useFontNormalise(16),
  },
  StaticLabel: {
    fontSize: useFontNormalise(18),
    fontFamily: APP_FONTS.Roboto_SemiBold,
    color: Colors.Black,
  },
  FinalLabel: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
});
