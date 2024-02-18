import React, { FC, useEffect, useState } from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { View, Text, Image, Linking, TouchableOpacity } from 'react-native';
import {
  DeferralDocument,
  DeferralDocumentTypes,
  DeleteDeferralDocumentRequest,
  UploadDeferralDocumentRequest,
} from 'api/ReactQuery/Document/types';
import {
  useDeleteDeferralDocument,
  useGetDeferralDocuments,
  useUploadDeferralDocument,
} from 'api/ReactQuery/Document';
import {
  useGetSubmitToDisbursment
} from 'api/ReactQuery/PSDDocument';
import {
  GetSubmitToDisbursmentRequest
} from 'api/ReactQuery/PSDDocument/types';
import WaveBackground from 'components/WaveBackground';
import Button from 'components/Button';
import { RootStackParamList } from 'navigation/HomeStack';
import LoanSummaryButton from 'components/LoanSummaryButton';
import LabeledUploadButton from 'components/LabeledUploadButton';
import { useApplicantDetails } from 'context/useApplicantDetails';
import DownloadFile from 'config/Functions/DownloadFile';
import Colors from 'config/Colors';
import Icon from 'components/Icon';
import { APP_FONTS, FONT_SIZE } from 'config/Fonts';
import useFontNormalise from 'hooks/useFontNormalise';
import useShowFlashMessage from 'hooks/useShowFlashMessage';
import Modal from 'components/Modal';
import { usedViewStatus } from 'context/useViewStatus';

type DeferralDocumentsNavigationProp = StackNavigationProp<
  RootStackParamList,
  'DeferralDocuments'
>;

type DeferralDocumentsRouteProp = RouteProp<
  RootStackParamList,
  'DeferralDocuments'
>;

interface DeferralDocumentsScreenProps {
  navigation: DeferralDocumentsNavigationProp;
  route: DeferralDocumentsRouteProp;
}

const DeferralDocuments: FC<DeferralDocumentsScreenProps> = ({
  navigation,
  route,
}) => {
  const { applicantId } = useApplicantDetails();
  // var applicantId = 'MU019954'
  const { useViewStatus } = usedViewStatus();

  const [uploadingDocumentType, setUploadingDocumentType] =
    useState<DeferralDocumentTypes | null>(null);
  const [base64value, setBase64Value] = useState<string>('');
  const [deletingDocumentType, setDeletingDocumentType] =
    useState<DeferralDocumentTypes | null>(null);
  const [docType, setDocType] = useState<'pdf' | 'jpg' | null>(null);
  const [value, setValue] = useState<string>('');
  const [popupVisible, setPopUPVisible] = useState<boolean>(false);
  const [isViewOnly, setIsViewOnly] = useState<boolean>(false);
  const [deferralDocumentsDetails, setDeferralDocumentsDetails] = useState<
    DeferralDocument[]
  >(
    [
      {
        "id": 1,
        "documentType": "Invoice",
        "documentFilePath": "",
        "type": "jpg",
        "mandatory": false
      },
      {
        "id": 2,
        "documentType": "Insurance",
        "documentFilePath": "",
        "type": "jpg",
        "mandatory": false
      },
      {
        "id": 3,
        "documentType": "ENach",
        "documentFilePath": "",
        "type": "jpg",
        "mandatory": false
      },
      {
        "id": 4,
        "documentType": "PDC",
        "documentFilePath": "",
        "type": "jpg",
        "mandatory": false
      },
      {
        "id": 5,
        "documentType": "IDV Deferal",
        "documentFilePath": "",
        "type": "jpg",
        "mandatory": false
      }
    ]
  );

  const [
    GetDeferralDocuments,
    { data: GetDeferralDocumentsData, isLoading: GetDeferralDocumentsIsLoading },
  ] = useGetDeferralDocuments(`${applicantId}`);

  const UploadDeferralDocumentRequest: UploadDeferralDocumentRequest = {
    appId: applicantId,
    base64: base64value,
    documentType: uploadingDocumentType,
    applicantType: 'mainApplicant',
    type: docType,
    uploadFrom: 'deferal'
  };

  const GetSubmitToDisbursmentRequest: GetSubmitToDisbursmentRequest = {
    appId: applicantId,
  };

  const [
    SubmitToDisbursment,
    { data: SubmitToDisbursmentData, isLoading: SubmitToDisbursmentIsLoading },
  ] = useGetSubmitToDisbursment(GetSubmitToDisbursmentRequest);

  const [
    UploadDocuments,
    { data: UploadDocumentData, isLoading: UploadDocumentsIsLoading },
  ] = useUploadDeferralDocument(UploadDeferralDocumentRequest);

  const DeleteDocumentRequest: DeleteDeferralDocumentRequest = {
    appId: applicantId,
    documentType: deletingDocumentType,
    applicantType: 'mainApplicant',
  };

  const [DeleteDocument, { data: DeleteDocumentData }] =
    useDeleteDeferralDocument(DeleteDocumentRequest);


  useEffect(() => {
    if (useViewStatus) {
      setIsViewOnly(useViewStatus?.isSubmitToDisbursement ? true : false);
    }
  }, []);

  useEffect(() => {
    GetDeferralDocuments.mutateAsync();
  }, []);

  useEffect(() => {
    if (UploadDocumentData) {
      GetDeferralDocuments.mutateAsync();
      setBase64Value('');
      setUploadingDocumentType(null);
      setDocType(null);
      setDeletingDocumentType(null);
    }
  }, [UploadDocumentData]);

  useEffect(() => {
    if (SubmitToDisbursmentData) {
      setPopUPVisible(true)
    }
  }, [SubmitToDisbursmentData]);



  const checkMandatoryDocuments = (documents: DeferralDocument[]): boolean => {
    for (const document of documents) {
      if (document.mandatory && !document.documentFilePath) {
        return false;
      }
    }
    return true;
  }

  type RenderImageTypes = {
    url: string;
    docType: DeferralDocumentTypes;
  };

  const RenderImage = ({ url, docType }: RenderImageTypes) => (
    <View style={{ marginTop: 10, width: '45%', height: 'auto' }}>
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
          setDeletingDocumentType(docType);
        }}>
        <Icon name="close" />
      </TouchableOpacity>
    </View>
  );

  type RenderPDFTypes = {
    url: string;
    docType: DeferralDocumentTypes;
  };

  const RenderPDF = ({ url, docType }: RenderPDFTypes) => (
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
      }}>
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
          setDeletingDocumentType(docType);
        }}>
        <Icon name="close" />
      </TouchableOpacity>

      <Icon name="pdf" />
    </TouchableOpacity>
  );

  const handleCreditToSubmit = () => {
    const mandatoryDocumentsFilled = checkMandatoryDocuments(deferralDocumentsDetails);
    if (mandatoryDocumentsFilled) {
      SubmitToDisbursment.mutateAsync()
    } else {
      useShowFlashMessage('warning', 'Kindly upload all mandatory documents');
    }

  }

  useEffect(() => {
    console.log("GetDeferralDocumentsDatausssss", JSON.stringify(GetDeferralDocumentsData, null, 4));
    setDeferralDocumentsDetails(GetDeferralDocumentsData?.documentDtsDtoList || []);

  }, [GetDeferralDocumentsData]);

  useEffect(() => {
    if (uploadingDocumentType && base64value) {
      UploadDocuments.mutateAsync();
    }
  }, [base64value, docType]);

  useEffect(() => {
    if (deletingDocumentType) {
      DeleteDocument.mutateAsync();
    }
  }, [deletingDocumentType]);

  useEffect(() => {
    if (DeleteDocumentData) {
      setDocType(null);
      setUploadingDocumentType(null);
      setDeletingDocumentType(null);
      GetDeferralDocuments.mutateAsync();
    }
  }, [DeleteDocumentData]);

  return (
    <WaveBackground
      loading={[UploadDocumentsIsLoading, SubmitToDisbursmentIsLoading, GetDeferralDocumentsIsLoading]}
      title={'Deferral Documents'}>
      <Modal
        buttonTitle="Okay"
        title=""
        status="normal"
        message={"Congratulation your case has been moved forward to disbursement...!!"}
        visible={popupVisible}
        onClose={() => {
          setPopUPVisible(false);
          navigation.replace('LoanSummary')
        }}
        credit
        isRejected={false}
      />
      {deferralDocumentsDetails.map(item => {
        if (item.documentFilePath) {
          return (
            <View style={{ margin: 15 }} key={item.documentType}>
              <View style={{ flexDirection: 'row' }}>
                <Text
                  style={{
                    color: Colors.LabelGrey,
                    fontFamily: APP_FONTS.Medium,
                    fontSize: FONT_SIZE.s,
                  }}>
                  {item.documentType}{' '}
                </Text>

                {item.mandatory && <Icon name="pointed-star" />}
              </View>
              {item.type === 'jpg' ? (
                <RenderImage
                  url={item.documentFilePath}
                  docType={item.documentType}
                  key={item.documentType}
                />
              ) : (
                <RenderPDF
                  url={item.documentFilePath}
                  docType={item.documentType}
                  key={item.documentType}
                />
              )}
            </View>
          );
        } else {
          return (
            <LabeledUploadButton
              label={item.documentType || ''}
              onPress={() => {
                // console.log('doc type', uploadingDocumentType);
                setUploadingDocumentType(item.documentType);
              }}
              key={item.documentType}
              setBase64={setBase64Value}
              setUrl={setValue}
              setDocType={setDocType}
              mandatory={item.mandatory}
              disabled={isViewOnly}

            />
          );
        }
      })}

      <View style={{ marginTop: 20 }}>
        {/* <Button
          text="Next"
          onPress={() => {
            SubmitToDisbursment.mutateAsync()
          }}
          marginVertical={10}
          active
        // active={GetDeferralDocumentsData?.length === 4}
        />  */}
        <Button
          text="Submit To Disbursment"
          onPress={() => {
            handleCreditToSubmit()
          }}
          marginVertical={10}
          active={GetDeferralDocumentsData?.isDisbursement ? false : checkMandatoryDocuments(deferralDocumentsDetails)}
        />
        <LoanSummaryButton onPress={() => navigation.replace('LoanSummary')} />
      </View>
    </WaveBackground>
  );
};
export default DeferralDocuments;
