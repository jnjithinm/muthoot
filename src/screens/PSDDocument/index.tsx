import React, { FC, useEffect, useState } from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import LabeledTextInput from 'components/LabeledTextInput';
import useActive from 'hooks/useActive';

import {
  PSDDocumentTypes,
  DeleteDeferralDocumentRequest,
  UploadDeferralDocumentRequest,
} from 'api/ReactQuery/Document/types';
import {
  useDeleteDeferralDocument,
  useUploadDeferralDocument,
} from 'api/ReactQuery/Document';
import {
  docTypes,
  SavePSDRequest,
  getInvoiceDetailsWithIPBranchRequest
} from 'api/ReactQuery/PSDDocument/types';

import {
  useGetPSD,
  useSavePSD,
  useGetInsuranceCompanyMaster,
  useGetInvoiceDetailsWithIPBranch
} from 'api/ReactQuery/PSDDocument';
import WaveBackground from 'components/WaveBackground';
import Button from 'components/Button';
import { RootStackParamList } from 'navigation/HomeStack';
import LoanSummaryButton from 'components/LoanSummaryButton';
import { useApplicantDetails } from 'context/useApplicantDetails';
import Colors from 'config/Colors';
import Icon from 'components/Icon';
import { APP_FONTS, FONT_SIZE } from 'config/Fonts';
import useFontNormalise from 'hooks/useFontNormalise';
import { ErrorObject } from 'config/Types';
import { ConvertToPrefixedAmount } from 'config/Functions/ConvertToPrefix';
import LabeledRadioButtonGroup from 'components/RadioButtonGroup';
import moment from 'moment';
import LabelDropdown from 'components/LabelDropdown ';
import convertImageFileToBase64 from 'config/Functions/ConvertImageToBase64';
import useSelectImage from 'hooks/useSelectImage';
import { ImagePickerResponse, launchCamera } from 'react-native-image-picker';
import DateTimePickerComponent from 'components/DateTimePickerComponent';
import { usedViewStatus } from 'context/useViewStatus';
import Modal from 'components/Modal';
import useShowFlashMessage from 'hooks/useShowFlashMessage';

interface PosDto {
  documentType: docTypes;
  isMandatory: 'Y' | 'N';
  section: string;
  documentFilePath?: string;
  type?: 'jpg' | 'pdf';
}
type PSDDocumentNavigationProp = StackNavigationProp<
  RootStackParamList,
  'PSDDocument'
>;

type PSDDocumentRouteProp = RouteProp<
  RootStackParamList,
  'PSDDocument'
>;

interface PSDDocumentScreenProps {
  navigation: PSDDocumentNavigationProp;
  route: PSDDocumentRouteProp;
}

const PSDDocument: FC<PSDDocumentScreenProps> = ({
  navigation,
  route,
}) => {
  const { applicantId, isMainApplicant, guarantorId } = useApplicantDetails();
  // var applicantId = 'mu962789'
  const { useViewStatus } = usedViewStatus();

  const [originalInvoice, setOriginalInvoice] = useState<string>('Yes');
  const [advEMIAmount, setAdvEMIAmount] = useState<number>(0);
  const [margin, setMargin] = useState<string>('0');
  const [consolidatedChareges, setConsolidatedChareges] = useState<string>('0');
  const [totalIP, setTotalIP] = useState<string>('0');
  const [IPPaidBranch, setIPPaidBranch] = useState<string>('');
  const [IPPaidAtDelar, setIPPaidAtDelar] = useState<string>('');
  const [IPPaidAtBranch, setIPPaidAtBranch] = useState<string>('');
  const [delar, setDelar] = useState<string>('');
  const [subDelar, setSubDelar] = useState<string>('');
  const [downPayment, setDownPayment] = useState<number>(0);
  const [ipUrl, setIpUrl] = useState<string>('');
  const [iPBase64, setIPBase64] = useState<string>('');

  const [retailInvoiceUrl, setRetailInvoiceUrl] = useState<string>('');
  const [retailInvoiceBase64, setRetailInvoiceBase64] = useState<string>('');
  const [retailInvoiceNumber, setRetailInvoiceNumber] = useState<string>('');
  const [InvoicedBy, setInvoicedBy] = useState<string>('');
  const [InvoicedByOpen, setInvoicedByOpen] = useState<boolean>(false);

  const [invoiceCalendarOpen, setInvoiceCalendarOpen] = useState<boolean>(false);
  const [PerformCalendarOpen, setPerformCalendarOpen] = useState<boolean>(false);
  const [insuranceFromCalendarOpen, setInsuranceFromCalendarOpen] = useState<boolean>(false);
  const [insuranceTocalendarOpen, setInsuranceToCalendarOpen] = useState<boolean>(false);

  const [invoiceDate, setInvoiceDate] = useState<any>('')
  const [exShoroomPrice, setExShoroomPrice] = useState<string>('');
  const [engineNumber, setEngineNumber] = useState<string>('');
  const [chassisNumber, setChassisNumber] = useState<string>('');
  const [performaInvoiceUrl, setPerformaInvoiceUrl] = useState<string>('');
  const [performaInvoiceBase64, setPerformaInvoiceBase64] = useState<string>('');
  const [performaDate, setPerformaDate] = useState<any>('');
  const [performaInvoiceNumber, setPerformaInvoiceNumber] = useState<string>('');
  const [exShowroomPriceAsPerPerforma, setExShowroomPriceAsPerPerforma] = useState<string>('');
  const [performaInvoicedBy, setPerformaInvoicedBy] = useState<string>('');

  const [insuranceUrl, setInsuranceUrl] = useState<string>('');
  const [insuranceBase64, setInsuranceBase64] = useState<string>('');
  const [insurancePolicyNumber, setInsurancePolicyNumber] = useState<string>('');
  const [insuranceCompany, setInsuranceCompany] = useState<string>('');
  const [insuranceCompanyOpen, setInsuranceCompanyOpen] = useState<boolean>(false);
  const [insuranceFromDate, setinsuranceFromDate] = useState<any>('');
  const [insuranceToDate, setinsuranceToDate] = useState<any>('');
  const [sumInsured, setSumInsured] = useState<string>('');
  const [insurenceCaping, setInsurenceCaping] = useState<string>('');
  const [premiumAmount, setPremiumAmount] = useState<string>('');
  const [isViewOnly, setIsViewOnly] = useState<boolean>(false);


  const [selectNull, setSelectedNull] = useState<'upload' | 'capture' | null>(null);
  const [uploadingDocumentType, setUploadingDocumentType] =
    useState<PSDDocumentTypes | null>(null);
  const [base64value, setBase64Value] = useState<string>('');
  const [deletingDocumentType, setDeletingDocumentType] =
    useState<PSDDocumentTypes | null>(null);
  const [docType, setDocType] = useState<'pdf' | 'jpg' | null>(null);
  const [isError, setIsError] = useState<ErrorObject[]>([]);
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const [commonPopupVisible, setCommonPopUPVisible] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');


  const isOrignalInvoice = [
    originalInvoice,
    delar,
    invoiceDate,
    exShoroomPrice,
    retailInvoiceNumber,
    engineNumber,
    chassisNumber,
    advEMIAmount,
    margin,
    consolidatedChareges,
    totalIP,
    IPPaidBranch,
    IPPaidBranch == 'IP Paid at Branch' ? IPPaidAtBranch : IPPaidAtDelar
  ]

  let isActivePerforma = [
    originalInvoice,
    delar,
    performaInvoiceNumber,
    performaDate,
    exShowroomPriceAsPerPerforma,
    advEMIAmount,
    margin,
    consolidatedChareges,
    totalIP,
    IPPaidBranch,
    IPPaidBranch == 'IP Paid at Branch' ? IPPaidAtBranch : IPPaidAtDelar,
  ];

  const isOrignalInvoiceWithInsurance = [
    originalInvoice,
    delar,
    invoiceDate,
    exShoroomPrice,
    retailInvoiceNumber,
    engineNumber,
    chassisNumber,
    advEMIAmount,
    margin,
    consolidatedChareges,
    totalIP,
    IPPaidBranch,
    insurancePolicyNumber,
    insuranceCompany,
    insuranceFromDate,
    sumInsured,
    insuranceToDate,
    premiumAmount,
    IPPaidBranch == 'IP Paid at Branch' ? IPPaidAtBranch : IPPaidAtDelar
  ]

  let isActivePerformaWithInsurance = [
    originalInvoice,
    delar,
    performaInvoiceNumber,
    performaDate,
    exShowroomPriceAsPerPerforma,
    advEMIAmount,
    margin,
    consolidatedChareges,
    totalIP,
    IPPaidBranch,
    insurancePolicyNumber,
    insuranceCompany,
    insuranceFromDate,
    sumInsured,
    insuranceToDate,
    premiumAmount,
    IPPaidBranch == 'IP Paid at Branch' ? IPPaidAtBranch : IPPaidAtDelar,
  ];

  let hasErrorRegistered: boolean = isError.some(
    error => error.hasError === true,
  );


  let isActive: boolean = useActive(
    originalInvoice == 'Yes' && insuranceUrl ? isOrignalInvoiceWithInsurance :
      originalInvoice == 'No' && insuranceUrl ? isActivePerformaWithInsurance :
        originalInvoice == 'Yes' ? isOrignalInvoice : isActivePerforma)

  const UploadDeferralDocumentRequest: UploadDeferralDocumentRequest = {
    appId: applicantId,
    base64: base64value,
    documentType: uploadingDocumentType,
    applicantType: 'mainApplicant',
    type: docType,
    uploadFrom: 'psd'
  };


  const [
    UploadDocuments,
    { data: UploadDocumentData, isLoading: UploadDocumentsIsLoading },
  ] = useUploadDeferralDocument(UploadDeferralDocumentRequest);

  const DeleteDocumentRequest: DeleteDeferralDocumentRequest = {
    appId: applicantId,
    documentType: deletingDocumentType,
    applicantType: 'mainApplicant',

  };

  const [DeleteDocument, { data: DeleteDocumentData, isLoading: DeleteDocumentIsLoading }] =
    useDeleteDeferralDocument(DeleteDocumentRequest);


  const getInvoiceDetailsWithIPBranchRequest: getInvoiceDetailsWithIPBranchRequest = {
    appId: applicantId,
    ipBranch: IPPaidBranch
  };

  const [
    GetInsuranceCompanyMasterDetails,
    { data: GetInsuranceCompanyData, isLoading: GetInsuranceCompanyMasterIsLoading },
  ] = useGetInsuranceCompanyMaster();

  const InsuranceCompanyMasterList: string[] = GetInsuranceCompanyData
    ? GetInsuranceCompanyData?.InsuranceMasterList?.map(item => item.insuranceCompanyName)
    : [];


  const [
    GetInvoiceDetailsWithIPBranch,
    { data: GetInvoiceDetailsWithIPBranchData, isLoading: GetInvoiceDetailsWithIPBranchIsLoading },
  ] = useGetInvoiceDetailsWithIPBranch(getInvoiceDetailsWithIPBranchRequest);


  useEffect(() => {
    console.log("mmmmmmm", IPPaidAtDelar, isChanged, IPPaidBranch, Number(IPPaidAtDelar), downPayment, Number(IPPaidAtDelar) > downPayment);

    if (IPPaidAtDelar && isChanged) {
      console.log("mjjjjjjj");

      if (IPPaidBranch == 'IP Paid at Dealer') {
        Number(IPPaidAtDelar) > downPayment ? (
          setErrorMsg(
            `Please decrease the IP Paid amount as it exceeding the limit `),
          setCommonPopUPVisible(true)
          // setIPPaidAtDelar(downPayment?.toString())
        ) : null
      } else if (IPPaidBranch == 'IP Paid at Both') {
        var temp = Number(IPPaidAtBranch) + Number(IPPaidAtDelar)
        var temp1 = Number(downPayment) - Number(IPPaidAtBranch)

        Number(temp) > downPayment ? (
          setErrorMsg(
            `Please decrease the IP Paid amount as it exceeding the downpayment limit `),
          setCommonPopUPVisible(true),
          setIPPaidAtDelar(temp1?.toString())
        ) : null

      }

    }
  }, [IPPaidAtDelar]);

  useEffect(() => {
    if (useViewStatus) {
      setIsViewOnly(useViewStatus?.isSubmitToDisbursement ? true : false);
    }
  }, []);

  useEffect(() => {
    if (UploadDocumentData) {
      // GetPSDDetail.mutateAsync();
      setBase64Value('');
      setUploadingDocumentType(null);
      // setDocType(null);
      // setDeletingDocumentType(null);
    }
  }, [UploadDocumentData]);

  useEffect(() => {
    if (DeleteDocumentData) {
      // GetPSDDetail.mutateAsync();
      deletingDocumentType == 'Insurance' ?
        setInsuranceUrl('') :
        deletingDocumentType == 'Invoice' ?
          setRetailInvoiceUrl('') :
          deletingDocumentType == 'Proforma Invoice' ?
            setPerformaInvoiceUrl('') : null

      setBase64Value('');
      setUploadingDocumentType(null);
      setDeletingDocumentType(null);
    }
  }, [DeleteDocumentData]);


  useEffect(() => {
    console.log("after", uploadingDocumentType, base64value);

    if (uploadingDocumentType && base64value) {
      console.log("uploadingDocumentTypebase64value", uploadingDocumentType, base64value);

      UploadDocuments.mutateAsync();
    }
  }, [base64value, uploadingDocumentType]);

  useEffect(() => {
    if (deletingDocumentType) {
      DeleteDocument.mutateAsync();
    }
  }, [deletingDocumentType]);


  const handleLaunchCamera = (type) => {
    launchCamera(
      {
        mediaType: 'photo',
        includeBase64: false,
        saveToPhotos: true,
      },
      (response: ImagePickerResponse) => {
        if (response.didCancel) {
          void 0;
        } else if (response.errorCode) {
          void 0;
        } else if (response.assets && response.assets.length > 0) {
          const capturedImageUri = response.assets[0].uri;

          if (capturedImageUri) {
            type == 'Invoice' ?
              setRetailInvoiceUrl(capturedImageUri)
              : type == 'Proforma Invoice' ?
                setPerformaInvoiceUrl(capturedImageUri)
                : type == 'Insurance' ?
                  setInsuranceUrl(capturedImageUri)
                  : type == 'IP' ?
                    setIpUrl(capturedImageUri)
                    : null
            convertImageFileToBase64(capturedImageUri)
              .then(base64Data => {
                if (base64Data) {
                  type == 'Invoice' ?
                    setRetailInvoiceBase64(base64Data)
                    : type == 'Proforma Invoice' ?
                      setPerformaInvoiceBase64(base64Data)
                      : type == 'Insurance' ?
                        setInsuranceBase64(base64Data)
                        : type == 'IP' ?
                          setIpUrl(base64Data)
                          : null
                  setDocType('jpg')
                  setBase64Value(base64Data)
                  setUploadingDocumentType(type)

                }
              })
              .catch(error => {
                console.error('Error converting image file to base64:', error);
              });
          }
        }
      },
    );
  };

  const handleOnPress = (type) => {
    const callback = (response: any, path: any, name: string) => {
      if (response) {

        type == 'Invoice' ?
          setRetailInvoiceUrl(response[0]?.fileCopyUri)
          : type == 'Proforma Invoice' ?
            setPerformaInvoiceUrl(response[0]?.fileCopyUri)
            : type == 'Insurance' ?
              setInsuranceUrl(response[0]?.fileCopyUri)
              : type == 'IP' ?
                setIpUrl(response[0]?.fileCopyUri)
                : null
        convertImageFileToBase64(response[0]?.fileCopyUri)
          .then(base64Data => {
            if (base64Data) {
              type == 'Invoice' ?
                setRetailInvoiceBase64(base64Data)
                : type == 'Proforma Invoice' ?
                  setPerformaInvoiceBase64(base64Data)
                  : type == 'Insurance' ?
                    setInsuranceBase64(base64Data)
                    : type == 'IP' ?
                      setIPBase64(base64Data)
                      : null
              setDocType('jpg')

              setBase64Value(base64Data)
              setUploadingDocumentType(type)
            }
          })
          .catch(error => {
            console.error('Error converting image file to base64:', error);
          });
      }
    };
    useSelectImage(callback, 'onlypickimage', setSelectedNull);
  };

  const handleInvoiceDate = (date: Date) => {
    console.log("handleInvoiceDate", date, moment(date).format('DD-MM-YYYY'));
    setInvoiceCalendarOpen(!invoiceCalendarOpen)
    setInvoiceDate(date);
  };
  const handlePerformDate = (date: Date) => {
    setPerformCalendarOpen(!PerformCalendarOpen)
    setPerformaDate(date);
  };
  const handleInsuranceFromDate = (date: Date) => {
    setInsuranceFromCalendarOpen(!insuranceFromCalendarOpen)
    setinsuranceFromDate(date);
  };
  const handleInsuranceToDate = (date: Date) => {
    setInsuranceToCalendarOpen(!insuranceTocalendarOpen)
    setinsuranceToDate(date);
  };

  const SavePSDRequest: SavePSDRequest = {
    appId: applicantId,
    applicantType: isMainApplicant ? 'mainApplicant' : 'guarantor',
    isOriginalInvoice: originalInvoice == 'Yes',
    invoiceBy: originalInvoice == 'Yes' ? InvoicedBy : performaInvoicedBy,
    retailInvoiceDate: invoiceDate?.toString(),
    retailInvoiceNumber: retailInvoiceNumber,
    exShoroomPriceAsPerInvoice: parseFloat(exShoroomPrice),
    chasisNumber: chassisNumber,
    engineNumber: engineNumber,
    performaInvoiceDate: performaDate?.toString(),
    performaInvoiceNumber: performaInvoiceNumber,
    exShowroomPriceAsPerPerforma: parseFloat(exShowroomPriceAsPerPerforma) || 0,
    insurancePolicyNumber: insurancePolicyNumber,
    insuranceCompany: insuranceCompany,
    insuranceFromDate: insuranceFromDate?.toString(),
    insuranceToDate: insuranceToDate?.toString(),
    sumInsured: parseFloat(sumInsured) ? parseFloat(sumInsured) : null,
    isInsurancePremiumAmount: (premiumAmount),
    advEmi: advEMIAmount,
    marginAmount: parseFloat(margin),
    consolidatedNumberOfCharges: parseFloat(consolidatedChareges),
    totalIp: totalIP,
    ipPaidAtBranch: IPPaidBranch == 'Yes' ? true : false,
    ipPaidAtDealer: IPPaidAtDelar,
    ipPaidAtBranchAmount: IPPaidAtBranch,
    ipPaidAtDealerAndBranch: IPPaidBranch
  };
  const [
    GetPSDDetail,
    { data: GetPSDDetailData, isLoading: GetPSDDetailIsLoading, },
  ] = useGetPSD(applicantId);

  useEffect(() => {
    if (GetPSDDetailData) {
      console.log("mjjjjjjjj", GetPSDDetailData?.isOriginalInvoice == true, JSON.stringify(GetPSDDetailData, null, 4));
      setAdvEMIAmount(GetPSDDetailData?.advEmi || 0)
      setDownPayment(GetPSDDetailData?.downPayment)
      setMargin(GetPSDDetailData?.marginAmount?.toString() || '')
      setConsolidatedChareges(GetPSDDetailData?.consolidatedNumberOfCharges?.toString() || '')
      setTotalIP(GetPSDDetailData?.totalIp || '')
      setIPPaidBranch(GetPSDDetailData?.ipPaidAtDealerAndBranch)
      setIPPaidAtDelar(GetPSDDetailData?.ipPaidAtDealer || ''),
        setIPPaidAtBranch(GetPSDDetailData?.ipPaidAtBranchAmount || ''?.toString())
      setOriginalInvoice((GetPSDDetailData?.isOriginalInvoice || GetPSDDetailData?.isOriginalInvoice == null) ? 'Yes' : 'No')
      setInvoicedBy((GetPSDDetailData?.isOriginalInvoice || GetPSDDetailData?.isOriginalInvoice == null) ? GetPSDDetailData?.invoiceBy : '')
      setPerformaInvoicedBy((GetPSDDetailData?.isOriginalInvoice || GetPSDDetailData?.isOriginalInvoice == null) ? "" : GetPSDDetailData?.invoiceBy)
      setRetailInvoiceNumber(GetPSDDetailData?.retailInvoiceNumber || '')
      setInvoiceDate(GetPSDDetailData?.retailInvoiceDate ? new Date(GetPSDDetailData?.retailInvoiceDate) : '')
      setExShoroomPrice(GetPSDDetailData?.exShoroomPriceAsPerInvoice?.toString() || '')
      setEngineNumber(GetPSDDetailData?.engineNumber || '')
      setChassisNumber(GetPSDDetailData?.chasisNumber || '')
      setPerformaDate(GetPSDDetailData?.performaInvoiceDate ? new Date(GetPSDDetailData?.performaInvoiceDate) : '')
      setPerformaInvoiceNumber(GetPSDDetailData?.performaInvoiceNumber || '')
      setExShowroomPriceAsPerPerforma(GetPSDDetailData?.exShowroomPriceAsPerPerforma?.toString() || '')
      setInsurancePolicyNumber(GetPSDDetailData?.insurancePolicyNumber || '')
      setinsuranceFromDate(GetPSDDetailData?.insuranceFromDate ? new Date(GetPSDDetailData?.insuranceFromDate) : '')
      setinsuranceToDate(GetPSDDetailData?.insuranceToDate ? new Date(GetPSDDetailData?.insuranceToDate) : '')
      setInsuranceCompany(GetPSDDetailData?.insuranceCompany?.toString() || '')
      setSumInsured(GetPSDDetailData?.sumInsured || '')
      setPremiumAmount(GetPSDDetailData?.isInsurancePremiumAmount?.toString() || '')
      setDelar(GetPSDDetailData?.dealerName || '')
      setSubDelar(GetPSDDetailData?.subDealerName || '')
      setInsurenceCaping(GetPSDDetailData?.insuranceAmount?.toString())
      setIpUrl(GetPSDDetailData?.ipfilePth == null ? '' : GetPSDDetailData?.ipfilePth )
      setRetailInvoiceUrl(GetPSDDetailData?.retailInvoiceFilePth == null ? '' : GetPSDDetailData?.retailInvoiceFilePth || '')
      setPerformaInvoiceUrl(GetPSDDetailData?.proformaInvoiceFilePth == null ? '' : GetPSDDetailData?.proformaInvoiceFilePth || '')
      setInsuranceUrl(GetPSDDetailData?.insuranceFilePath == null ? '' : GetPSDDetailData?.insuranceFilePath || '')
    }
  }, [GetPSDDetailData]);

  useEffect(() => {
    if (originalInvoice == 'Yes' && GetPSDDetailData) {
      setInvoicedBy((GetPSDDetailData?.isOriginalInvoice || GetPSDDetailData?.isOriginalInvoice == null) ? GetPSDDetailData?.invoiceBy : '')
      setRetailInvoiceNumber(GetPSDDetailData?.retailInvoiceNumber || '')
      setInvoiceDate(GetPSDDetailData?.retailInvoiceDate ? new Date(GetPSDDetailData?.retailInvoiceDate) : '')
      setExShoroomPrice(GetPSDDetailData?.exShoroomPriceAsPerInvoice?.toString() || '')
      setEngineNumber(GetPSDDetailData?.engineNumber || '')
      setChassisNumber(GetPSDDetailData?.chasisNumber || '')
      setRetailInvoiceUrl(GetPSDDetailData?.retailInvoiceFilePth == null ? '' : GetPSDDetailData?.retailInvoiceFilePth || '')
      setPerformaDate('')
      setPerformaInvoicedBy('')
      setPerformaInvoiceNumber('')
      setExShowroomPriceAsPerPerforma('')
      setPerformaInvoiceUrl('')
    } else {
      setPerformaInvoicedBy((GetPSDDetailData?.isOriginalInvoice || GetPSDDetailData?.isOriginalInvoice == null) ? "" : GetPSDDetailData?.invoiceBy)
      setPerformaInvoiceUrl(GetPSDDetailData?.proformaInvoiceFilePth == null ? '' : GetPSDDetailData?.proformaInvoiceFilePth || '')
      setPerformaDate(GetPSDDetailData?.performaInvoiceDate ? new Date(GetPSDDetailData?.performaInvoiceDate) : '')
      setPerformaInvoiceNumber(GetPSDDetailData?.performaInvoiceNumber || '')
      setExShowroomPriceAsPerPerforma(GetPSDDetailData?.exShowroomPriceAsPerPerforma?.toString() || '')
      setRetailInvoiceUrl('')
      setInvoicedBy('')
      setRetailInvoiceNumber('')
      setInvoiceDate('')
      setExShoroomPrice('')
      setEngineNumber('')
      setChassisNumber('')
    }
  }, [originalInvoice])

  useEffect(() => {
    if (insuranceUrl == '') {
      setInsurancePolicyNumber('')
      setinsuranceFromDate('')
      setinsuranceToDate('')
      setInsuranceCompany('')
      setSumInsured('')
      setPremiumAmount('')
    }
  }, [insuranceUrl])

  const [
    SavePSDInfo,
    {
      data: SavePSDData,
      isLoading: SavePSDInfoIsLoading,
    },
  ] = useSavePSD(SavePSDRequest);




  useEffect(() => {
    if (SavePSDData) {
      setIsChanged(false)
      navigation.navigate('DeferralDocuments')
    }
  }, [SavePSDData]);

  useEffect(() => {
    if (GetInvoiceDetailsWithIPBranchData) {
      setIPPaidAtBranch(GetInvoiceDetailsWithIPBranchData?.ipPaidAtBranchAmount?.toString())
    }
  }, [GetInvoiceDetailsWithIPBranchData]);

  useEffect(() => {
    console.log("oooooo", IPPaidAtDelar);

    if (IPPaidBranch == 'IP Paid at Branch' || IPPaidBranch == 'IP Paid at Both' && isChanged) {
      setIPPaidAtDelar('')
      GetInvoiceDetailsWithIPBranch.mutateAsync();
    }
    // else {
    //   isChanged ? setIPPaidAtDelar('') : null
    // }
  }, [IPPaidBranch]);

  useEffect(() => {
    GetPSDDetail.mutateAsync();
    GetInsuranceCompanyMasterDetails.mutateAsync();
  }, []);

  console.log("jkkkkipUrlk",ipUrl);

  return (
    <WaveBackground
      loading={[
        UploadDocumentsIsLoading,
        GetPSDDetailIsLoading,
        SavePSDInfoIsLoading,
        DeleteDocumentIsLoading,
        GetInsuranceCompanyMasterIsLoading,
        UploadDocumentsIsLoading,
        GetInvoiceDetailsWithIPBranchIsLoading
      ]}
      title={'PSD'}>

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

      <DateTimePickerComponent
        selectedDate={invoiceDate}
        onDateChange={handleInvoiceDate}
        showPicker={invoiceCalendarOpen}
      />

      <DateTimePickerComponent
        selectedDate={performaDate}
        onDateChange={handlePerformDate}
        showPicker={PerformCalendarOpen}
      />

      <DateTimePickerComponent
        selectedDate={insuranceFromDate}
        onDateChange={handleInsuranceFromDate}
        showPicker={insuranceFromCalendarOpen}
      />

      <DateTimePickerComponent
        selectedDate={insuranceToDate}
        onDateChange={handleInsuranceToDate}
        showPicker={insuranceTocalendarOpen}
      />

      <LabeledRadioButtonGroup
        heading="Do you have Original Invoice details?"
        options={['Yes', 'No']}
        onChange={setOriginalInvoice}
        value={originalInvoice}
        isChange={setIsChanged}
        inLine
        disabled={isViewOnly}
      />

      <View style={{ marginVertical: '5%', }} />

      {originalInvoice == 'Yes' ?
        <>
          <Text style={style.heading}>Original Invoice details  <Icon name="pointed-star" /></Text>

          <View style={style.container}>
            {retailInvoiceUrl == '' && <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginTop: 10,
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={{
                  backgroundColor: Colors.Upload,
                  paddingVertical: 10,
                  paddingHorizontal: 50,
                  borderRadius: 10,
                }}
                disabled={isViewOnly}
                onPress={() => { handleOnPress('Invoice') }}>
                <Icon name="upload" />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: Colors.Capture,
                  paddingVertical: 10,
                  paddingHorizontal: 50,
                  borderRadius: 10,
                }}
                disabled={isViewOnly}
                onPress={() => { handleLaunchCamera('Invoice') }}>
                <Icon name="capture" />
              </TouchableOpacity>
            </View>}
            {retailInvoiceUrl !== '' && (
              <View
                style={{
                  width: '110%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 1,
                }}>
                <Image
                  source={{ uri: retailInvoiceUrl }}
                  style={{
                    width: 250,
                    height: 180,
                    borderRadius: 10,
                    alignSelf: 'center',
                  }}
                />
                {/* {!GetPANDetailsData?.documentVerifiedStatus  && ( */}
                <TouchableOpacity
                  style={style.deleteButton}
                  disabled={isViewOnly}
                  onPress={() => {
                    setDeletingDocumentType('Invoice');
                  }}>
                  <Icon name="close" />
                </TouchableOpacity>
                {/* )} */}
              </View>
            )}
          </View>


          <View style={[style.FinalLabel, { paddingHorizontal: 20 }]}>
            <Text style={[style.Label, { color: 'black' }]}>{`Invoiced By `}<Icon name="pointed-star" /></Text>
          </View>
          <View style={[style.FinalLabel, { paddingHorizontal: 20 }]}>
            <View style={{ width: '40%' }}>
              <Text style={style.Label}>{`Dealer : `}</Text>
            </View>
            <View style={{ width: '60%' }}>
              <Text style={[style.StaticLabel, { flexWrap: 'wrap' }]}>{delar}</Text>
            </View>
          </View>
          <View style={[style.FinalLabel, { paddingHorizontal: 20 }]}>
            <View style={{ width: '40%' }}>
              <Text style={style.Label}>{`Sub Dealer : `}</Text>
            </View>
            <View style={{ width: '60%' }}>
              <Text style={[style.StaticLabel, { flexWrap: 'wrap' }]}>{subDelar}</Text>
            </View>
          </View>

          <LabeledTextInput
            label="Retail Invoice Number"
            onChange={setRetailInvoiceNumber}
            defaultValue={retailInvoiceNumber}
            setErrorFlag={setIsError}
            IsErrorArray={isError}
            autoCapitalize="characters"
            isChange={setIsChanged}
            mandatory
            disabled={isViewOnly}
          />
          <View style={style.dobContainer}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={[style.labelText, { color: invoiceCalendarOpen ? Colors.Black : Colors.LabelGrey }]}>
                {'Retail Invoice Date'}
              </Text>
              <Icon name="pointed-star" />
            </View>
            <TouchableOpacity style={[style.inputbox, { borderColor: invoiceCalendarOpen ? Colors.Black : Colors.LightGrey }]}
              disabled={isViewOnly}
              onPress={() => { setInvoiceCalendarOpen(!invoiceCalendarOpen) }}
            >
              <Text style={{ color: invoiceDate ? Colors.Black : Colors.LabelGrey }}>
                {invoiceDate ? moment(invoiceDate).format('DD-MM-YYYY').toString() : null}
              </Text>
            </TouchableOpacity>
          </View>

          <LabeledTextInput
            label='Ex-Showroom Price as Per Invoice'
            onChange={setExShoroomPrice}
            autoCapitalize="characters"
            defaultValue={exShoroomPrice}
            disabled={isViewOnly}
            setErrorFlag={setIsError}
            IsErrorArray={isError}
            isChange={setIsChanged}
            mandatory
            NumberPad
          />

          <LabeledTextInput
            label="Engine Number"
            onChange={setEngineNumber}
            defaultValue={engineNumber}
            setErrorFlag={setIsError}
            IsErrorArray={isError}
            autoCapitalize="characters"
            isChange={setIsChanged}
            mandatory
            disabled={isViewOnly}
          />

          <LabeledTextInput
            label="Chassis Number"
            onChange={setChassisNumber}
            defaultValue={chassisNumber}
            setErrorFlag={setIsError}
            IsErrorArray={isError}
            autoCapitalize="characters"
            isChange={setIsChanged}
            mandatory
            disabled={isViewOnly}
          />

        </>
        :
        <>
          <Text style={style.heading}>Performa Invoice details <Icon name="pointed-star" /></Text>

          <View style={style.container}>

            {performaInvoiceUrl == '' && <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginTop: 10,
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={{
                  backgroundColor: Colors.Upload,
                  paddingVertical: 10,
                  paddingHorizontal: 50,
                  borderRadius: 10,
                }}
                disabled={isViewOnly}
                onPress={() => { handleOnPress('Proforma Invoice') }}>
                <Icon name="upload" />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: Colors.Capture,
                  paddingVertical: 10,
                  paddingHorizontal: 50,
                  borderRadius: 10,
                }}
                disabled={isViewOnly}
                onPress={() => { handleLaunchCamera('Proforma Invoice') }}>
                <Icon name="capture" />
              </TouchableOpacity>
            </View>}

            {performaInvoiceUrl !== '' && (
              <View
                style={{
                  width: '110%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 1,
                }}>
                <Image
                  source={{ uri: performaInvoiceUrl }}
                  style={{
                    width: 250,
                    height: 180,
                    borderRadius: 10,
                    alignSelf: 'center',
                  }}
                />

                <TouchableOpacity
                  style={style.deleteButton}
                  disabled={isViewOnly}
                  onPress={() => {
                    setDeletingDocumentType('Proforma Invoice');
                  }}>
                  <Icon name="close" />
                </TouchableOpacity>
                {/* )} */}
              </View>
            )}
          </View>

          <View style={[style.FinalLabel, { paddingHorizontal: 20 }]}>
            <Text style={[style.Label, { color: 'black' }]}>{`Invoiced By `}<Icon name="pointed-star" /></Text>
          </View>
          <View style={[style.FinalLabel, { paddingHorizontal: 20 }]}>
            <View style={{ width: '40%' }}>
              <Text style={style.Label}>{`Dealer : `}</Text>
            </View>
            <View style={{ width: '60%' }}>
              <Text style={[style.StaticLabel, { flexWrap: 'wrap' }]}>{delar}</Text>
            </View>
          </View>
          <View style={[style.FinalLabel, { paddingHorizontal: 20 }]}>
            <View style={{ width: '40%' }}>
              <Text style={style.Label}>{`Sub Dealer : `}</Text>
            </View>
            <View style={{ width: '60%' }}>
              <Text style={[style.StaticLabel, { flexWrap: 'wrap' }]}>{subDelar}</Text>
            </View>
          </View>

          <LabeledTextInput
            label="Performa Invoice Number"
            onChange={setPerformaInvoiceNumber}
            defaultValue={performaInvoiceNumber}
            setErrorFlag={setIsError}
            IsErrorArray={isError}
            autoCapitalize="characters"
            isChange={setIsChanged}
            mandatory
            disabled={isViewOnly}
          />

          <View style={style.dobContainer}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={[style.labelText, { color: PerformCalendarOpen ? Colors.Black : Colors.LabelGrey }]}>
                {'Performa Invoice Date'}
              </Text>
              <Icon name="pointed-star" />
            </View>
            <TouchableOpacity style={[style.inputbox, { borderColor: PerformCalendarOpen ? Colors.Black : Colors.LightGrey }]}
              disabled={isViewOnly}
              onPress={() => { setPerformCalendarOpen(!PerformCalendarOpen) }}
            >
              <Text style={{ color: performaDate ? Colors.Black : Colors.LabelGrey }}>
                {performaDate ? moment(performaDate).format('DD-MM-YYYY').toString() : null}
              </Text>
            </TouchableOpacity>
          </View>

          <LabeledTextInput
            label='Ex-Showroom Price as Per Invoice'
            onChange={setExShowroomPriceAsPerPerforma}
            autoCapitalize="characters"
            defaultValue={exShowroomPriceAsPerPerforma}
            setErrorFlag={setIsError}
            IsErrorArray={isError}
            isChange={setIsChanged}
            mandatory
            NumberPad
            disabled={isViewOnly}
          />

        </>}
      <View style={{ marginVertical: '5%', }} />

      <>
        <Text style={style.heading}>Insurance details</Text>

        <View style={style.container}>

          {insuranceUrl == '' &&
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginTop: 10,
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={{
                  backgroundColor: Colors.Upload,
                  paddingVertical: 10,
                  paddingHorizontal: 50,
                  borderRadius: 10,
                }}
                disabled={isViewOnly}
                onPress={() => { handleOnPress('Insurance') }}>
                <Icon name="upload" />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: Colors.Capture,
                  paddingVertical: 10,
                  paddingHorizontal: 50,
                  borderRadius: 10,
                }}
                disabled={isViewOnly}
                onPress={() => { handleLaunchCamera('Insurance') }}>
                <Icon name="capture" />
              </TouchableOpacity>
            </View>}

          {insuranceUrl !== '' && (
            <View
              style={{
                width: '110%',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
              }}>
              <Image
                source={{ uri: insuranceUrl }}
                style={{
                  width: 250,
                  height: 180,
                  borderRadius: 10,
                  alignSelf: 'center',
                }}
              />

              <TouchableOpacity
                style={style.deleteButton}
                disabled={isViewOnly}
                onPress={() => {
                  setDeletingDocumentType('Insurance');
                }}>
                <Icon name="close" />
              </TouchableOpacity>
            </View>
          )}
        </View>

        {insuranceUrl !== '' &&
          <>
            <LabeledTextInput
              label="Insurance Policy Number"
              onChange={setInsurancePolicyNumber}
              defaultValue={insurancePolicyNumber}
              setErrorFlag={setIsError}
              IsErrorArray={isError}
              autoCapitalize="characters"
              isChange={setIsChanged}
              mandatory
              disabled={isViewOnly}
            />

            <LabelDropdown
              label="Insurance Company"
              open={insuranceCompanyOpen}
              setDropdownOpen={setInsuranceCompanyOpen}
              defaultValue={insuranceCompany}
              options={InsuranceCompanyMasterList}
              setSelectedOption={setInsuranceCompany}
              setSelectedItem={item => { }}
              isChange={setIsChanged}
              mandatory
              zIndex={insuranceCompanyOpen ? 1000 : 0}
              disabled={isViewOnly}
            />

            <View style={style.dobContainer}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={[style.labelText, { color: insuranceFromCalendarOpen ? Colors.Black : Colors.LabelGrey }]}>
                  {'Insurance From Date'}
                </Text>
                <Icon name="pointed-star" />
              </View>
              <TouchableOpacity style={[style.inputbox, { borderColor: insuranceFromCalendarOpen ? Colors.Black : Colors.LightGrey }]}
                disabled={isViewOnly}
                onPress={() => { setInsuranceFromCalendarOpen(!insuranceFromCalendarOpen) }}
              >
                <Text style={{ color: insuranceFromDate ? Colors.Black : Colors.LabelGrey }}>
                  {insuranceFromDate ? moment(insuranceFromDate).format('DD-MM-YYYY').toString() : null}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={style.dobContainer}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={[style.labelText, { color: insuranceTocalendarOpen ? Colors.Black : Colors.LabelGrey }]}>
                  {'Insurance To Date'}
                </Text>
                <Icon name="pointed-star" />
              </View>
              <TouchableOpacity style={[style.inputbox, { borderColor: insuranceTocalendarOpen ? Colors.Black : Colors.LightGrey }]}
                disabled={isViewOnly}
                onPress={() => { setInsuranceToCalendarOpen(!insuranceTocalendarOpen) }}
              >
                <Text style={{ color: insuranceToDate ? Colors.Black : Colors.LabelGrey }}>
                  {insuranceToDate ? moment(insuranceToDate).format('DD-MM-YYYY').toString() : null}
                </Text>
              </TouchableOpacity>
            </View>

            <LabeledTextInput
              label='Sum Insured'
              onChange={setSumInsured}
              autoCapitalize="characters"
              defaultValue={sumInsured}
              setErrorFlag={setIsError}
              IsErrorArray={isError}
              isChange={setIsChanged}
              mandatory
              NumberPad
              disabled={isViewOnly}
            />

            <LabeledTextInput
              label=' Premium Amount'
              onChange={setPremiumAmount}
              autoCapitalize="characters"
              defaultValue={premiumAmount}
              setErrorFlag={setIsError}
              IsErrorArray={isError}
              isChange={setIsChanged}
              mandatory
              NumberPad
              disabled={isViewOnly}
            />
          </>
        }
      </>

      <View style={{ marginVertical: '8%', }} />

      <Text style={style.heading}>IP details</Text>

      <View style={[style.container, { marginBottom: 20 }]}>

        {ipUrl == '' &&
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 10,
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: Colors.Upload,
                paddingVertical: 10,
                paddingHorizontal: 50,
                borderRadius: 10,
              }}
              disabled={isViewOnly}
              onPress={() => { handleOnPress('IP') }}>
              <Icon name="upload" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: Colors.Capture,
                paddingVertical: 10,
                paddingHorizontal: 50,
                borderRadius: 10,
              }}
              disabled={isViewOnly}
              onPress={() => { handleLaunchCamera('IP') }}>
              <Icon name="capture" />
            </TouchableOpacity>
          </View>}

        {ipUrl !== '' && (
          <View
            style={{
              width: '110%',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
            }}>
            <Image
              source={{ uri: ipUrl }}
              style={{
                width: 250,
                height: 180,
                borderRadius: 10,
                alignSelf: 'center',
              }}
            />

            <TouchableOpacity
              style={style.deleteButton}
              disabled={isViewOnly}
              onPress={() => {
                setDeletingDocumentType('IP');
              }}>
              <Icon name="close" />
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={{}}>
        <View style={style.FinalLabel}>
          <Text style={style.Label}>{`Advance Emi Amount : `}</Text>
          <Text style={[style.StaticLabel]}>{`₹${ConvertToPrefixedAmount(
            advEMIAmount?.toString()
          )}`}</Text>
        </View>
        <View style={style.FinalLabel}>
          <Text style={style.Label}>{`Margin Amount : `}</Text>
          <Text style={[style.StaticLabel]}>{`₹${ConvertToPrefixedAmount(
            margin
          )}`}</Text>
        </View>
        <View style={style.FinalLabel}>
          <Text style={style.Label}>{`Consolidated number of charges : `}</Text>
          <Text style={[style.StaticLabel]}>{`₹${ConvertToPrefixedAmount(
            consolidatedChareges
          )}`}</Text>
        </View>
        <View style={style.FinalLabel}>
          <Text style={style.Label}>{`Total IP : `}</Text>
          <Text style={[style.StaticLabel]}>{`₹${ConvertToPrefixedAmount(
            totalIP
          )}`}</Text>
        </View>

        <LabeledRadioButtonGroup
          heading="IP Paid at?"
          options={['IP Paid at Dealer', 'IP Paid at Branch', 'IP Paid at Both']}
          onChange={setIPPaidBranch}
          value={IPPaidBranch}
          isChange={setIsChanged}
          // inLine
          disabled={isViewOnly}
        />
        {
          IPPaidBranch == 'IP Paid at Branch' ?
            <View style={style.FinalLabel}>
              <Text style={style.Label}>{`IP Paid at Branch (Amount): `}</Text>
              <Text style={[style.StaticLabel]}>{`₹${ConvertToPrefixedAmount(
                IPPaidAtBranch
              )}`}</Text>
            </View>
            :
            IPPaidBranch == 'IP Paid at Dealer' ?
              <LabeledTextInput
                label="IP Paid at Dealer"
                onChange={setIPPaidAtDelar}
                defaultValue={IPPaidAtDelar}
                setErrorFlag={setIsError}
                IsErrorArray={isError}
                autoCapitalize="characters"
                isChange={setIsChanged}
                mandatory
                NumberPad
                disabled={isViewOnly}
              /> :
              IPPaidBranch == 'IP Paid at Both' ?
                <>
                  <View style={style.FinalLabel}>
                    <Text style={style.Label}>{`IP Paid at Branch (Amount): `}</Text>
                    <Text style={[style.StaticLabel]}>{`₹${ConvertToPrefixedAmount(
                      IPPaidAtBranch
                    )}`}</Text>
                  </View>
                  <LabeledTextInput
                    label="IP Paid at Dealer"
                    onChange={setIPPaidAtDelar}
                    defaultValue={IPPaidAtDelar}
                    setErrorFlag={setIsError}
                    IsErrorArray={isError}
                    autoCapitalize="characters"
                    isChange={setIsChanged}
                    mandatory
                    NumberPad
                    disabled={isViewOnly}
                  />
                </>
                : null

        }
      </View>

      <View style={{ marginVertical: '5%', }} />

      <Button
        text={isChanged ? 'Save' : 'Next'}
        active={isActive && !hasErrorRegistered}
        onPress={() => {
          console.log("kkkkk",Number(premiumAmount?.replaceAll(',', '')) , Number(insurenceCaping));
          
          isChanged ?
            Number(premiumAmount?.replaceAll(',', '')) < Number(insurenceCaping) ? (
              setErrorMsg(`Please increase the Premium amount as it subceeding the limit `),
              setCommonPopUPVisible(true)
            ) :
            Number(IPPaidAtDelar) < downPayment ? (
              setErrorMsg(`Please increase the IP Paid amount as it subceeding the limit `),
              setCommonPopUPVisible(true)
            ) :
              SavePSDInfo.mutateAsync()

            :
            navigation.navigate('DeferralDocuments');
        }}
      />

      <View style={{ marginTop: 20 }}>

        <LoanSummaryButton onPress={() => navigation.replace('LoanSummary')} />
      </View>
    </WaveBackground>
  );
};
export default PSDDocument;
const style = StyleSheet.create({
  Label: {
    color: Colors.SubHeadingGrey,
    fontFamily: APP_FONTS.Roboto_Regular,
    fontSize: useFontNormalise(14),
    fontWeight: '400',

  },
  container: {
    marginVertical: 15,
    width: '90%',
    marginTop: 30,
  },
  StaticLabel: {
    fontSize: useFontNormalise(16),
    fontFamily: APP_FONTS.Roboto_SemiBold,
    color: Colors.Black,
  },
  FinalLabel: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  heading: {
    color: Colors.Black,
    fontFamily: APP_FONTS.Roboto_SemiBold,
    fontSize: useFontNormalise(18),
    // marginVertical: '3%',
    // marginTop: "8%"
  },
  dobContainer: {
    marginVertical: 15,
    width: '90%',
    alignSelf: 'center'
  },
  inputbox: {
    borderRadius: 15,
    borderColor: Colors.PlaceHolder,
    borderWidth: 1,
    color: Colors.Black,
    fontSize: useFontNormalise(14),
    width: '100%',
    paddingLeft: 10,
    justifyContent: 'center',
    marginTop: 10,
    paddingVertical: 10
  },
  labelText: {
    color: Colors.LabelGrey,
    fontFamily: APP_FONTS.Medium,
    fontSize: FONT_SIZE.s,
  },
  deleteButton: {
    position: 'absolute',
    top: -6,
    backgroundColor: 'transparent',
    alignSelf: 'flex-end',
    paddingHorizontal: '8%',
  }
});