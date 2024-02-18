import React, { FC, useEffect, useState } from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { View, Text, Image, FlatList, TouchableOpacity, ScrollView } from 'react-native';

import { PrePosDto } from 'api/ReactQuery/Master/types';
import { useGetPreDocumentsDetail } from 'api/ReactQuery/Master';
import {
  DeleteDocumentRequest,
  UploadDocumentRequest,
  docTypes,
} from 'api/ReactQuery/Document/types';
import { useDeleteDocument, useUploadDocument } from 'api/ReactQuery/Document';
import WaveBackground from 'components/WaveBackground';
import Button from 'components/Button';
import { RootStackParamList } from 'navigation/HomeStack';
import LoanSummaryButton from 'components/LoanSummaryButton';
import LabeledUploadMultiDocument from 'components/LabeledUploadMultiDocument';
import { useApplicantDetails } from 'context/useApplicantDetails';
import DownloadFile from 'config/Functions/DownloadFile';
import Colors from 'config/Colors';
import Icon from 'components/Icon';
import { APP_FONTS, FONT_SIZE } from 'config/Fonts';
import useFontNormalise from 'hooks/useFontNormalise';
import styles from './styles';
import { applicantType } from 'api/ReactQuery';
import { applicantTypeObect } from 'config/Types';
import useShowFlashMessage from 'hooks/useShowFlashMessage';
import { usedViewStatus } from 'context/useViewStatus';

type PreDisbursalDocumentsNavigationProp = StackNavigationProp<
  RootStackParamList,
  'PreDisbursalDocuments'
>;

type PreDisbursalDocumentsRouteProp = RouteProp<
  RootStackParamList,
  'PreDisbursalDocuments'
>;

interface PreDisbursalDocumentsScreenProps {
  navigation: PreDisbursalDocumentsNavigationProp;
  route: PreDisbursalDocumentsRouteProp;
}

const PreDisbursalDocuments: FC<PreDisbursalDocumentsScreenProps> = ({
  navigation,
  route,
}) => {
  const { applicantId, guarantorId } = useApplicantDetails();
  const { useViewStatus } = usedViewStatus();
  // var applicantId = 'MU375344'

  const [isViewOnly, setIsViewOnly] = useState<boolean>(false);
  const [preDocumentsDetails, setPreDocumentsDetails] = useState<PrePosDto[]>(
    [
      {
        "documentType": "Invoice Insurance",
        "isMandatory": "N",
        "section": "Pre_Disbursal",
        "filePath": [
        ],
        "fileType": "jpg",
        "isMultiple": true,
        "count": 1

      },
      {
        "documentType": "Dual DOB Declaration",
        "isMandatory": "N",
        "section": "Pre_Disbursal",
        "fileType": "jpg",
        "filePath": [
          { filePath: "http://146.56.55.170:7070/project/documents/S3_bucket/MU734939_20231220135305_ohf_proof", index: '0' },
          { filePath: "http://146.56.55.170:7070/project/documents/S3_bucket/MU734939_20231220135305_ohf_proof", index: '1' },
          { filePath: "http://146.56.55.170:7070/project/documents/S3_bucket/MU734939_20231220135305_ohf_proof", index: '2' },
          { filePath: "http://146.56.55.170:7070/project/documents/S3_bucket/MU734939_20231220135305_ohf_proof", index: '3' }
      
        ],
        "isMultiple": true,
        "count": 2
      },
      {
        "documentType": "OHF PROOF",
        "isMandatory": "N",
        "section": "Pre_Disbursal",
        "filePath": [
          { filePath: "http://146.56.55.170:7070/project/documents/S3_bucket/MU734939_20231220135305_ohf_proof", index: '0' }
        ],
        "fileType": "jpg",
        "isMultiple": true,
        "count": 3
      },

    ]
  );
  const [selectedApplicantId, setSelectedApplicantId] =
    useState<string>(applicantId);
  const [selectedApplicantType, setSelectedApplicantType] =
    useState<applicantType>('mainApplicant');
  const [applicantTypes, setApplicantTypes] = useState<applicantTypeObect[]>([
    { applicantId, applicantType: 'mainApplicant' },
  ]);
  const [kycUrl, setKYCUrl] = useState<string>('');
  const [bankStatementUrl, setBankStatementUrl] = useState<string>('');
  const [invoiceInsuranceUrl, setInvoiceInsuranceUrl] = useState<string>('');
  const [salarySlipUrl, setSalarySlipUrl] = useState<string>('');
  const [panUrl, setPANUrl] = useState<string>('');
  const [ovdUrl, setOvdUrl] = useState<string>('');
  const [cliUrl, setCliUrl] = useState<string>('');
  const [pliUrl, setPliUrl] = useState<string>('');
  const [itrUrl, setITRUrl] = useState<string>('');
  const [ocrUrl, setOCRUrl] = useState<string>('');
  const [form60, setform60] = useState<string>('');
  const [physicalNach, setPhysicalNach] = useState<string>('');

  const [salaryCertificateUrl, setSalaryCertificateUrl] = useState<string>('');
  const [profileImageUrl, setProfileImageUrl] = useState<string>('');
  const [pensionProofUrl, setPensionProofUrl] = useState<string>('');
  const [ohfProofUrl, setOHFProofUrl] = useState<string>('');
  const [dualDBDeclarationUrl, setDualDBDeclarationUrl] = useState<string>('');
  const [aaUrl, setAAUrl] = useState<string>('');
  const [ownershipByUrl, setOwnershipByUrl] = useState<string>('');
  const [houseTaxReceipt, setHouseTaxReceipt] = useState<string>('');
  const [latestWaterBillsWithin3Months, setLatestWaterBillsWithin3Monts] =
    useState<string>('');
  const [
    latestElectricityBillsWithin3Months,
    setLatestElectricityBillsWithin3Months,
  ] = useState<string>('');
  const [buildingTaxReceipt, setBuildingTaxReceipt] = useState<string>('');
  const [landTaxReceipt, setLandTaxReceipt] = useState<string>('');
  const [uploadingDocumentType, setUploadingDocumentType] =
    useState<docTypes | null>(null);
  const [base64value, setBase64Value] = useState<string>('');
  const [deletingDocumentType, setDeletingDocumentType] =
    useState<docTypes | null>(null);
  const [docType, setDocType] = useState<'pdf' | 'jpg' | null>(null);
  const [isMandatory, setIsMandatory] = useState<'Y' | 'N'>('N');

  type ImageTypes = 'PAN' | 'Aadhaar' | 'OVD' | 'Profile Image';

  const isImageType = (label: docTypes): label is ImageTypes =>
    ['PAN', 'OVD', 'Profile Image', 'Aadhaar'].includes(label);

  const [
    GetPreDocumentsDetailMainApplicant,
    {
      data: GetPreDocumentsDetailMainApplicantData,
      isLoading: GetPreDocumentsDetailMainApplicantIsLoading,
    },
  ] = useGetPreDocumentsDetail(applicantId, 'mainApplicant');

  const [
    GetPreDocumentsDetailGuarantor,
    {
      data: GetPreDocumentsDetailGuarantorData,
      isLoading: GetPreDocumentsDetailGuarantorIsLoading,
    },
  ] = useGetPreDocumentsDetail(guarantorId, 'guarantor');

  const UploadDocumentRequest: UploadDocumentRequest = {
    appId: selectedApplicantId,
    base64value: base64value,
    doctype: uploadingDocumentType,
    applicantType: selectedApplicantType,
    type: docType,
    isMandatory,

  };

  const [
    UploadDocuments,
    { data: UploadDocumentData, isLoading: UploadDocumentsIsLoading },
  ] = useUploadDocument(UploadDocumentRequest);

  const DeleteDocumentRequest: DeleteDocumentRequest = {
    appId: selectedApplicantId,
    doctype: deletingDocumentType,
    applicantType: selectedApplicantType,
    isMandatory,
  };

  const [DeleteDocument, { data: DeleteDocumentData }] = useDeleteDocument(
    DeleteDocumentRequest,
  );


  useEffect(() => {
    if (useViewStatus) {
      setIsViewOnly(useViewStatus?.isSubmitToDisbursement ? true : false);
    }
  }, []);

  useEffect(() => {
    // GetPreDocumentsDetailMainApplicant.mutateAsync();
    // guarantorId && GetPreDocumentsDetailGuarantor.mutateAsync();
  }, []);

  useEffect(() => {
    if (guarantorId && applicantTypes.length < 2) {
      let finalApplicantTypes: applicantTypeObect[] = [
        ...applicantTypes,
        {
          applicantId: guarantorId,
          applicantType: 'guarantor',
        },
      ];
      setApplicantTypes(finalApplicantTypes);
    }
  }, [guarantorId]);

  useEffect(() => {
    if (UploadDocumentData) {
      console.log("mjjjjjjjj", JSON.stringify(UploadDocumentData, null, 4));
      if (UploadDocumentData?.detailsCheck == false) {
        useShowFlashMessage('warning', UploadDocumentData?.detailsCheckMessage || '');
      }
      selectedApplicantType === 'mainApplicant'
        ? GetPreDocumentsDetailMainApplicant.mutateAsync()
        : GetPreDocumentsDetailGuarantor.mutateAsync();
      setBase64Value('');
      setUploadingDocumentType(null);
      setIsMandatory('N');
      setDocType(null);
      setDeletingDocumentType(null);
    }
  }, [UploadDocumentData]);

  // useEffect(() => {
  //   GetPreDocumentsDetailMainApplicant.reset();
  //   GetPreDocumentsDetailMainApplicant.mutateAsync();
  // }, [selectedApplicantId]);

  useEffect(() => {
    if (DeleteDocumentData) {
      selectedApplicantType === 'mainApplicant'
        ? GetPreDocumentsDetailMainApplicant.mutateAsync()
        : GetPreDocumentsDetailGuarantor.mutateAsync();
      setBase64Value('');
      setUploadingDocumentType(null);
      setDeletingDocumentType(null);
    }
  }, [DeleteDocumentData]);

  useEffect(() => {
    console.log('GetPreDocumentsDetailMainApplicantData', (GetPreDocumentsDetailMainApplicantData?.prePosDtoList));

    selectedApplicantType === 'mainApplicant' &&
      GetPreDocumentsDetailMainApplicantData
      ? setPreDocumentsDetails(
        GetPreDocumentsDetailMainApplicantData.prePosDtoList,
      )
      : GetPreDocumentsDetailGuarantorData
        ? setPreDocumentsDetails(GetPreDocumentsDetailGuarantorData.prePosDtoList)
        : null;
  }, [
    selectedApplicantId,
    GetPreDocumentsDetailGuarantorData,
    GetPreDocumentsDetailMainApplicantData,
  ]);

  useEffect(() => {
    if (uploadingDocumentType && base64value) {
      UploadDocuments.mutateAsync();
    }
  }, [base64value]);

  useEffect(() => {
    if (deletingDocumentType) {
      DeleteDocument.mutateAsync();
    }
  }, [deletingDocumentType]);

  type RenderImageTypes = {
    url: string;
    docType: docTypes;
    isNonDeletable: boolean;
    isMandatory: 'Y' | 'N';
    index: number
  };
  const RenderImage = ({
    url,
    docType,
    isNonDeletable,
    isMandatory,
    index
  }: RenderImageTypes) => (
    <View style={{ flex:1, justifyContent: 'center', alignItems: 'center', margin: 15, width: '50%', height: 'auto',  }}>
      <Image
        source={{
          uri: url,
        }}
        style={{
          width: useFontNormalise(120),
          height: useFontNormalise(120),
          borderRadius: 10,
        }}
      />
      {!isNonDeletable && (
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: -9,
            right: -5,
            backgroundColor: 'transparent',
            alignSelf: 'flex-end',
          }}
          disabled={isViewOnly}
          onPress={() => {
            setIsMandatory(isMandatory || 'N');
            setDeletingDocumentType(docType);
          }}>
          <Icon name="close" />
        </TouchableOpacity>
      )}
    </View>
  );

  type RenderPDFTypes = {
    url: string;
    docType: docTypes;
    isNonDeletable: boolean;
    isMandatory?: 'Y' | 'N';
  };

  const RenderPDF = ({
    url,
    docType,
    isNonDeletable,
    isMandatory,
  }: RenderPDFTypes) => (
    <TouchableOpacity
      style={{
        backgroundColor: Colors.LightGrey,
        paddingHorizontal: 25,
        paddingVertical: '5%',
        borderRadius: 10,
        width: '50%',
        marginTop: 10,
        alignItems: 'center',
      }}
      onPress={() => {
        DownloadFile(url, applicantId + '_' + docType);
        // Linking.openURL(url);
      }}>
      {!isNonDeletable && (
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: -9,
            right: -5,
            backgroundColor: 'transparent',
            alignSelf: 'flex-end',
          }}
          disabled={isViewOnly}
          onPress={() => {
            setIsMandatory(isMandatory || 'N');
            setDeletingDocumentType(docType);
          }}>
          <Icon name="close" />
        </TouchableOpacity>
      )}
      <Icon name="pdf" />
    </TouchableOpacity>
  );

  const handleSwitch = (documentType: docTypes) => {
    let value, setValue;
    switch (documentType) {
      case 'Invoice Insurance':
        value = invoiceInsuranceUrl;
        setValue = setInvoiceInsuranceUrl;
        break;

      case 'Dual DOB Declaration':
        value = dualDBDeclarationUrl;
        setValue = setDualDBDeclarationUrl;
        break;

      case 'OHF PROOF':
        value = ohfProofUrl;
        setValue = setOHFProofUrl;
        break;

      case 'Salary Slip':
        value = salarySlipUrl;
        setValue = setSalarySlipUrl;
        break;

      case 'Aadhaar':
        value = kycUrl;
        setValue = setKYCUrl;
        break;

      case 'OCR':
        value = ocrUrl;
        setValue = setOCRUrl;
        break;

      case 'PAN':
        value = panUrl;
        setValue = setPANUrl;
        break;

      case 'Form 60':
        value = form60;
        setValue = setform60;
        break;

      case 'PHYSICAL NACH':
        value = physicalNach;
        setValue = setPhysicalNach;
        break;

      case 'OVD':
        value = ovdUrl;
        setValue = setOvdUrl;
        break;

      case 'Bank Statement':
        value = bankStatementUrl;
        setValue = setBankStatementUrl;
        break;

      case 'ITR':
        value = itrUrl;
        setValue = setITRUrl;
        break;

      case 'Pension Proof':
        value = pensionProofUrl;
        setValue = setPensionProofUrl;
        break;

      case 'Salary Certificate':
        value = salaryCertificateUrl;
        setValue = setSalaryCertificateUrl;
        break;

      case 'Profile Image':
        value = profileImageUrl;
        setValue = setProfileImageUrl;
        break;

      case 'AA':
        value = aaUrl;
        setValue = setAAUrl;
        break;

      case 'Ownership By':
        value = ownershipByUrl;
        setValue = setOwnershipByUrl;
        break;

      case 'Land Tax Receipt':
        value = landTaxReceipt;
        setValue = setLandTaxReceipt;
        break;

      case 'Building Tax Receipt':
        value = buildingTaxReceipt;
        setValue = setBuildingTaxReceipt;
        break;

      case 'House Tax Receipt':
        value = houseTaxReceipt;
        setValue = setHouseTaxReceipt;
        break;

      case 'Latest Electricity Bill within 3 months':
        value = latestElectricityBillsWithin3Months;
        setValue = setLatestElectricityBillsWithin3Months;
        break;

      case 'Latest Water Bill within 3 months':
        value = latestWaterBillsWithin3Months;
        setValue = setLatestWaterBillsWithin3Monts;
        break;

      case 'CLI Document':
        value = cliUrl;
        setValue = setCliUrl;
        break;

      case 'PLI Document':
        value = pliUrl;
        setValue = setPliUrl;
        break;

      default:
        break;
    }

    return { value, setValue };
  };

  return (
    <WaveBackground
      loading={[
        UploadDocumentsIsLoading,
        GetPreDocumentsDetailGuarantorIsLoading,
        GetPreDocumentsDetailMainApplicantIsLoading,
      ]}
      title={'Pre Disbursal Documents'}>
      {applicantTypes.length > 1 && <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}>
        <View style={[styles.container]}>
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
                  [
                    selectedApplicantId === item?.applicantId &&
                    styles.selected,
                  ],
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
      </ScrollView>}
      {preDocumentsDetails.map(values => {

        const { value, setValue } = handleSwitch(values.documentType);
        if (values.filePath) {
          return (
            <View style={{  }}>
              {
                <LabeledUploadMultiDocument
                  label={values.documentType || ''}
                  onPress={() => {
                    setUploadingDocumentType(values.documentType);
                    setIsMandatory(values.isMandatory);
                  }}
                  imageOnly={isImageType(values.documentType)}
                  mandatory={values.isMandatory === 'Y'}
                  key={values.documentType}
                  setBase64={setBase64Value}
                  setUrl={setValue}
                  setDocType={setDocType}
                  disabled={isViewOnly}
                  buttonDisable={values.filePath.length == values.count ? true : false}
                />}
              <View style={{ marginVertical: 15,}} key={values.documentType}>
                {/* <View style={{ flexDirection: 'row' }}>
                  <Text
                    style={{
                      color: Colors.LabelGrey,
                      fontFamily: APP_FONTS.Medium,
                      fontSize: FONT_SIZE.s,
                    }}>
                    {values.documentType}{' '}
                  </Text>
                  {values.isMandatory === 'Y' && <Icon name="pointed-star" />}
                </View> */}
                {
                  values.fileType === 'jpg' ?
                    // (
                    // (values.documentType === 'OCR' ||
                    //   values.documentType === 'OVD' ||
                    //   values.documentType === 'Aadhaar') &&
                    //   values.filePath &&
                    //   values.filePath2 ? (
                    //   <View
                    //     style={{
                    //       flexDirection: 'row',
                    //       width: '100%',
                    //       justifyContent: 'space-between',
                    //     }}>
                    //     <RenderImage
                    //       url={values.filePath}
                    //       docType={values.documentType}
                    //       isNonDeletable={
                    //         values.documentType === 'Aadhaar' &&
                    //         (selectedApplicantType === 'guarantor'
                    //           ? GetPreDocumentsDetailGuarantorData?.isAadhaarUpdate ===
                    //           false
                    //           : GetPreDocumentsDetailMainApplicantData?.isAadhaarUpdate ===
                    //           false) &&
                    //         values.isMandatory === 'Y'
                    //       }
                    //       isMandatory={values.isMandatory}
                    //     />
                    //     <RenderImage
                    //       url={values.filePath2}
                    //       docType={values.documentType}
                    //       isNonDeletable={
                    //         values.documentType === 'Aadhaar' &&
                    //         (selectedApplicantType === 'guarantor'
                    //           ? GetPreDocumentsDetailGuarantorData?.isPanUpdate ===
                    //           false
                    //           : GetPreDocumentsDetailMainApplicantData?.isPanUpdate ===
                    //           false) &&
                    //         values.isMandatory === 'Y'
                    //       }
                    //       isMandatory={values.isMandatory}
                    //     />
                    //   </View>
                    // ) : 
                    (<View style={{justifyContent: 'space-between',  width: '100%', }}>

                      <FlatList
                        data={values.filePath}
                        extraData={values.filePath}
                        numColumns={2}
                        style={{}}
                        renderItem={({ item, index }) =>
                          <RenderImage
                            url={item.filePath || value}
                            docType={values.documentType}
                            index={index}
                            isNonDeletable={
                              (values.documentType === 'Aadhaar' &&
                                (selectedApplicantType === 'guarantor'
                                  ? GetPreDocumentsDetailGuarantorData?.isAadhaarUpdate ===
                                  false
                                  : GetPreDocumentsDetailMainApplicantData?.isAadhaarUpdate ===
                                  false) &&
                                values.isMandatory === 'Y') ||
                              (values.documentType === 'PAN' &&
                                (selectedApplicantType === 'guarantor'
                                  ? GetPreDocumentsDetailGuarantorData?.isPanUpdate ===
                                  false
                                  : GetPreDocumentsDetailMainApplicantData?.isPanUpdate ===
                                  false) &&
                                values.isMandatory === 'Y') ||
                              values.documentType === 'Profile Image'
                            }
                            isMandatory={values.isMandatory}
                            key={values.documentType}
                          />
                        }
                      />
                    </View>


                    ) : (
                      <RenderPDF
                        url={values.filePath || value}
                        docType={values.documentType}
                        isNonDeletable={
                          (values.documentType === 'Aadhaar' &&
                            (selectedApplicantType === 'guarantor'
                              ? GetPreDocumentsDetailGuarantorData?.isAadhaarUpdate ===
                              false
                              : GetPreDocumentsDetailMainApplicantData?.isAadhaarUpdate ===
                              false) &&
                            values.isMandatory === 'Y') ||
                          (values.documentType === 'PAN' &&
                            (selectedApplicantType === 'guarantor'
                              ? GetPreDocumentsDetailGuarantorData?.isPanUpdate ===
                              false
                              : GetPreDocumentsDetailMainApplicantData?.isPanUpdate ===
                              false) &&
                            values.isMandatory === 'Y')
                        }
                        key={values.documentType}
                      />
                    )}
              </View>
            </View>
          );
        }
      })}

      <View style={{ marginTop: 20 }}>
        <Button
          text="Next"
          onPress={() => {
            navigation.navigate('PSDDocument');
          }}
          marginVertical={10}
          active={
            guarantorId
              ? GetPreDocumentsDetailMainApplicantData?.isMandatoryFileUploaded ===
              true &&
              GetPreDocumentsDetailGuarantorData?.isMandatoryFileUploaded ===
              true
              : GetPreDocumentsDetailMainApplicantData?.isMandatoryFileUploaded ===
              true
          }
        />
        <LoanSummaryButton onPress={() => navigation.replace('LoanSummary')} />
      </View>
    </WaveBackground>
  );
};
export default PreDisbursalDocuments;
