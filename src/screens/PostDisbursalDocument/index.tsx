import React, {FC, useEffect, useState} from 'react';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {View, Text, Image, Linking, TouchableOpacity} from 'react-native';
import LabeledTextInput from 'components/LabeledTextInput';
import useActive from 'hooks/useActive';
import {
  DeleteDocumentRequest,
  UploadDocumentRequest,
  SaveVehicleCollateralInfoRequest,
  docTypes,
} from 'api/ReactQuery/PreDisbursalDocuments/types';
import {
  useDeleteDocument,
  useUploadDocument,
  useGetPreDocumentsDetail,
  useSaveVehicleCollateralInfo,
} from 'api/ReactQuery/PreDisbursalDocuments';
import WaveBackground from 'components/WaveBackground';
import Button from 'components/Button';
import {RootStackParamList} from 'navigation/HomeStack';
import LoanSummaryButton from 'components/LoanSummaryButton';
import LabeledUploadButton from 'components/LabeledUploadButton';
import {useApplicantDetails} from 'context/useApplicantDetails';
import DownloadFile from 'config/Functions/DownloadFile';
import Colors from 'config/Colors';
import Icon from 'components/Icon';
import {APP_FONTS, FONT_SIZE} from 'config/Fonts';
import useFontNormalise from 'hooks/useFontNormalise';
import {ErrorObject} from 'config/Types';

interface PosDto {
  documentType: docTypes;
  isMandatory: 'Y' | 'N';
  section: string;
  documentFilePath?: string;
  type?: 'jpg' | 'pdf';
}
type PostDisbursalDocumentNavigationProp = StackNavigationProp<
  RootStackParamList,
  'PostDisbursalDocument'
>;

type DocumentsUploadRouteProp = RouteProp<
  RootStackParamList,
  'PostDisbursalDocument'
>;

interface DocumentsUploadScreenProps {
  navigation: PostDisbursalDocumentNavigationProp;
  route: DocumentsUploadRouteProp;
}

const PostDisbursalDocument: FC<DocumentsUploadScreenProps> = ({
  navigation,
  route,
}) => {
  const {applicantId, isMainApplicant, guarantorId} = useApplicantDetails();

  const [postDocumentsDetails, setpostDocumentsDetails] = useState<PosDto[]>([
    {
      documentType: 'Down Payment Receipt',
      isMandatory: 'Y',
      section: 'post_Disbursal',
    },
    {
      documentType: 'Proforma Invoice',
      isMandatory: 'Y',
      section: 'post_Disbursal',
    },
    {
      documentType: 'Insurance Copy',
      isMandatory: 'Y',
      section: 'post_Disbursal',
    },
    {
      documentType: 'KLI Form',
      isMandatory: 'Y',
      section: 'post_Disbursal',
    },
    {
      documentType: 'RC Book',
      isMandatory: 'Y',
      section: 'post_Disbursal',
    },
    {
      documentType: 'RTO Tax Receipt',
      isMandatory: 'Y',
      section: 'post_Disbursal',
    },
  ]);
  const [downPayment, setDownPayment] = useState<string>('');
  const [insuranceCopy, setInsuranceCopy] = useState<string>('');
  const [proformaInvoice, setProformaInvoice] = useState<string>('');
  const [KLIForm, setKLIForm] = useState<string>('');
  const [RCBook, setRCBook] = useState<string>('');
  const [rtoTaxReceipt, setRtoTaxReceipt] = useState<string>('');
  const [engineNumber, setEngineNumber] = useState<string>('');
  const [chassisNumber, setChassisNumber] = useState<string>('');
  const [type, setType] = useState<'Registered' | 'Unregistered' | string>('');
  const [vehicleRegistrationNumber, setVehicleRegistrationNumber] =
    useState<string>('');

  const [uploadingDocumentType, setUploadingDocumentType] =
    useState<docTypes | null>(null);
  const [base64value, setBase64Value] = useState<string>('');
  const [deletingDocumentType, setDeletingDocumentType] =
    useState<docTypes | null>(null);
  const [docType, setDocType] = useState<'pdf' | 'jpg' | null>(null);
  const [isError, setIsError] = useState<ErrorObject[]>([]);
  const [isChanged, setIsChanged] = useState<boolean>(false);
  let isActiveRegistered: boolean = useActive([
    engineNumber,
    chassisNumber,
    vehicleRegistrationNumber,
  ]);
  let hasErrorRegistered: boolean = isError.some(
    error => error.hasError === true,
  );

  const [
    GetpostDocumentsDetail,
    {
      data: GetpostDocumentsDetailData,
      isLoading: GetpostDocumentsDetailIsLoading,
    },
  ] = useGetPreDocumentsDetail(
    isMainApplicant ?applicantId: guarantorId  ,
    isMainApplicant ? 'mainApplicant':'guarantor'  ,
  );

  const UploadDocumentRequest: UploadDocumentRequest = {
    appId: isMainApplicant ? applicantId:guarantorId  ,
    base64: base64value,
    documentType: uploadingDocumentType,
    applicantType: isMainApplicant ? 'mainApplicant':'guarantor' ,
    type: docType,
  };

  const [
    UploadDocuments,
    {data: UploadDocumentData, isLoading: UploadDocumentsIsLoading},
  ] = useUploadDocument(UploadDocumentRequest);

  const DeleteDocumentRequest: DeleteDocumentRequest = {
    appId: isMainApplicant ?applicantId: guarantorId  ,
    documentType: deletingDocumentType,
    applicantType: isMainApplicant ? 'mainApplicant':'guarantor'  ,
    isMandatory: 'N',
  };

  const [
    DeleteDocument,
    {data: DeleteDocumentData, isLoading: DeleteDocumentDataIsLoading},
  ] = useDeleteDocument(DeleteDocumentRequest);

  const SaveVehicleCollateralInfoRequest: SaveVehicleCollateralInfoRequest = {
    appId: applicantId,
    applicantType: isMainApplicant ?'mainApplicant': 'guarantor'  ,
    vehicleEngineNumber: engineNumber,
    vehicleChasisNumber: chassisNumber,
    vehicleRegistrationNumber: vehicleRegistrationNumber,
  };

  const [
    SaveVehicleCollateralInfo,
    {
      data: SaveVehicleCollateralInfoData,
      isLoading: SaveVehicleCollateralInfoIsLoading,
    },
  ] = useSaveVehicleCollateralInfo(SaveVehicleCollateralInfoRequest);

  useEffect(() => {
    GetpostDocumentsDetail.mutateAsync();
  }, []);

  useEffect(() => {
    if (UploadDocumentData) {
      GetpostDocumentsDetail.mutateAsync();
      setBase64Value('');
      setUploadingDocumentType(null);
      setDocType(null);
      setDeletingDocumentType(null);
    }
  }, [UploadDocumentData]);

  useEffect(() => {
    if (DeleteDocumentData == '') {
      GetpostDocumentsDetail.mutateAsync();
      setBase64Value('');
      setUploadingDocumentType(null);
      setDeletingDocumentType(null);
    }
  }, [DeleteDocumentData]);

  useEffect(() => {
    if (GetpostDocumentsDetailData) {
      // console.log("kkkkkkggggggggkkk",GetpostDocumentsDetailData);
      GetpostDocumentsDetailData.list_of_documents &&
        setpostDocumentsDetails(
          postDocumentsDetails.map(
            obj =>
              GetpostDocumentsDetailData?.list_of_documents.find(
                o => o.documentType === obj.documentType,
              ) || obj,
          ),
        );
      GetpostDocumentsDetailData.post_vehicle_details &&
        (setEngineNumber(
          GetpostDocumentsDetailData.post_vehicle_details.vehicleEngineNumber,
        ),
        setChassisNumber(
          GetpostDocumentsDetailData.post_vehicle_details.vehicleChasisNumber,
        ),
        setVehicleRegistrationNumber(
          GetpostDocumentsDetailData.post_vehicle_details
            .vehicleRegistrationNumber,
        ));
    }
  }, [GetpostDocumentsDetailData]);

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
    index: number;
  };

  const RenderImage = ({
    url,
    docType,
    isNonDeletable,
    index,
  }: RenderImageTypes) => (
    <View style={{marginTop: 10, width: '45%', height: 'auto'}}>
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
          onPress={() => {
            setDeletingDocumentType(docType);
            postDocumentsDetails[index].documentFilePath = '';
          }}>
          <Icon name="close" />
        </TouchableOpacity>
      )}
    </View>
  );

  type RenderPDFTypes = {
    url: string;
    docType: docTypes;
    index: number;
  };

  const RenderPDF = ({url, docType, index}: RenderPDFTypes) => (
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
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: -9,
          right: -5,
          backgroundColor: 'transparent',
          alignSelf: 'flex-end',
        }}
        onPress={() => {
          setDeletingDocumentType(docType);
          postDocumentsDetails[index].documentFilePath = '';
        }}>
        <Icon name="close" />
      </TouchableOpacity>
      <Icon name="pdf" />
    </TouchableOpacity>
  );

  const handleSwitch = (documentType: docTypes) => {
    let value, setValue;
    switch (documentType) {
      case 'Down Payment Receipt':
        value = downPayment;
        setValue = setDownPayment;
        break;

      case 'Proforma Invoice':
        value = proformaInvoice;
        setValue = setProformaInvoice;
        break;

      case 'Insurance Copy':
        value = insuranceCopy;
        setValue = setInsuranceCopy;
        break;

      case 'KLI Form':
        value = KLIForm;
        setValue = setKLIForm;

      case 'RC Book':
        value = RCBook;
        setValue = setRCBook;
        break;

      case 'RTO Tax Receipt':
        value = rtoTaxReceipt;
        setValue = setRtoTaxReceipt;

      default:
        break;
    }
    return {value, setValue};
  };

  return (
    <WaveBackground
      loading={[
        UploadDocumentsIsLoading,
        GetpostDocumentsDetailIsLoading,
        SaveVehicleCollateralInfoIsLoading,
        DeleteDocumentDataIsLoading,
      ]}
      title={'Post Disbursal Documents'}>
      {postDocumentsDetails.map((item, index) => {
        const {value, setValue} = handleSwitch(item.documentType);
        if (item.documentFilePath) {
          return (
            <View style={{margin: 15}}>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    color: Colors.LabelGrey,
                    fontFamily: APP_FONTS.Medium,
                    fontSize: FONT_SIZE.s,
                  }}>
                  {item.documentType}{' '}
                </Text>
                { <Icon name="pointed-star" />}
              </View>
              {item.type === 'jpg' ? (
                <RenderImage
                  url={item.documentFilePath || value}
                  docType={item.documentType}
                  isNonDeletable={item.isMandatory === 'Y'}
                  index={index}
                />
              ) : (
                <RenderPDF
                  url={item.documentFilePath || value}
                  docType={item.documentType}
                  index={index}
                />
              )}
            </View>
          );
        } else {
          return (
            <LabeledUploadButton
              label={item.documentType || ''}
              onPress={() => {
                setUploadingDocumentType(item.documentType);
              }}
              mandatory
              key={item.documentFilePath}
              setBase64={setBase64Value}
              setUrl={setValue}
              setDocType={setDocType}
            />
          );
        }
      })}

      <LabeledTextInput
        label="Engine Number"
        onChange={setEngineNumber}
        defaultValue={engineNumber}
        setErrorFlag={setIsError}
        IsErrorArray={isError}
        autoCapitalize="characters"
        isChange={setIsChanged}
        mandatory
        // disabled={GetVehicleCollateralInfoData?.isCollateralSaved}
      />
      <LabeledTextInput
        label="Chassis Number"
        onChange={setChassisNumber}
        defaultValue={chassisNumber}
        setErrorFlag={setIsError}
        IsErrorArray={isError}
        autoCapitalize="characters"
        maxLength={17}
        isChange={setIsChanged}
        mandatory
        // disabled={GetVehicleCollateralInfoData?.isCollateralSaved}
      />
      <LabeledTextInput
        label="Vehicle Registration Number"
        onChange={setVehicleRegistrationNumber}
        defaultValue={vehicleRegistrationNumber}
        setErrorFlag={setIsError}
        autoCapitalize="characters"
        IsErrorArray={isError}
        // disabled={
        //   type === 'Unregistered' ||
        //   GetVehicleCollateralInfoData?.isCollateralSaved
        // }
        mandatory
        isChange={setIsChanged}
        type={type}
      />

      <Button
        text="Save"
        active={isChanged && isActiveRegistered }
        onPress={() => {
          !hasErrorRegistered && 
          SaveVehicleCollateralInfo.mutateAsync();
        }}
      />

      <View style={{marginTop: 20}}>
        {/* <Button
          text="Next"
          onPress={() => {
            navigation.navigate('LoanAgreement');
          }}
          marginVertical={10}
          active
        // active={GetpostDocumentsDetailData?.isMandatoryFileUploaded || false}
        /> */}
             <LoanSummaryButton onPress={()=>navigation.replace('LoanSummary')} />
      </View>
    </WaveBackground>
  );
};
export default PostDisbursalDocument;
