import React, {FC, useCallback, useEffect, useState, useRef} from 'react';
import {RouteProp, useFocusEffect} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import WaveBackground from 'components/WaveBackground';
import {ErrorObject} from 'config/Types';
import {useApplicantDetails} from 'context/useApplicantDetails';
import {RootStackParamList} from 'navigation/HomeStack';
import {TouchableOpacity, View, Text, Image, Linking} from 'react-native';
import Icon from 'components/Icon';
import {APP_FONTS, FONT_SIZE} from 'config/Fonts';
import Colors from 'config/Colors';
import convertImageFileToBase64 from 'config/Functions/ConvertImageToBase64';
import useSelectImage from 'hooks/useSelectImage';
import Button from 'components/Button';
import useActive from 'hooks/useActive';
import LabeledRadioButtonGroup from 'components/RadioButtonGroup';
import LabelDropdown from 'components/LabelDropdown ';
import DownloadFile from 'config/Functions/DownloadFile';
import {
  useGetAssetMaster,
  useGetIPMaster,
  SaveProduct,
  UploadProduct,
  GetProductDetails,
  useGetRelationMaster,
} from 'api/ReactQuery/Product';
import {
  addProductRequest,
  UploadProductRequest,
  getProductRequest,
} from 'api/ReactQuery/Product/types';
import LoanSummaryButton from 'components/LoanSummaryButton';
import {usedViewStatus} from 'context/useViewStatus';

type ProductDetailsNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ProductDetails'
>;
type ProductDetailsRouteProp = RouteProp<RootStackParamList, 'ProductDetails'>;

interface ProductDetailsScreenProps {
  navigation: ProductDetailsNavigationProp;
  route: ProductDetailsRouteProp;
}

const ProductDetails: FC<ProductDetailsScreenProps> = ({navigation, route}) => {
  const {applicantId, isMainApplicant, guarantorId} = useApplicantDetails();
  const [isError, setIsError] = useState<ErrorObject[]>([]);
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const {useViewStatus} = usedViewStatus();
  const [isViewOnly, setIsViewOnly] = useState<boolean>(false);
  const [productType, setProductType] = useState<string>('');
  const [productTypeOpen, setProductTypeOpen] = useState<boolean>(false);
  const [documentType, setDocumentType] = useState<string>('');
  const [documentTypeOpen, setdocumentTypeOpen] = useState<boolean>(false);
  const [applicantIncomeType, setApplicantIncomeType] = useState<string>('');
  const [assetRelation, setAssetRelation] = useState<string>('');
  const [assetRelationOpen, setAssetRelationOpen] = useState<boolean>(false);

  const [imageUrl, setImageUrl] = useState<string>('');
  const [imageBase64, setImageBase64] = useState<string>('');
  const [selectNull, setSelectedNull] = useState<'upload' | 'capture' | null>(
    null,
  );
  const [type, setType] = useState<string>('');
  const [isGuarantorMandatory, setIsGuarantorMandatory] =
    useState<boolean>(false);
  const [AAStatus, setAAStatus] = useState<boolean>(false);

  const handleOnPress = () => {
    const callback = (response: any, path: any, name: string) => {
      if (response) {
        setImageUrl(response[0]?.fileCopyUri);
        setType(response[0]?.type.split('/').pop() == 'pdf' ? 'pdf' : 'jpg');
        convertImageFileToBase64(response[0]?.fileCopyUri)
          .then(base64Data => {
            if (base64Data) {
              setImageBase64(base64Data);
            }
          })
          .catch(error => {
            console.error('Error converting image file to base64:', error);
          });
      }
    };
    useSelectImage(callback, 'allDocument', setSelectedNull);
  };

  const handleCloseImage = () => {
    setImageBase64('');
    setImageUrl('');
  };

  const handleProductUpdate = value => {
    setProductType(value);
    setDocumentType('');
    setImageBase64('');
    setImageUrl('');
  };

  const handleDocumentUpdate = value => {
    setDocumentType(value);
    setImageBase64('');
    setImageUrl('');
  };

  const [
    GetIpMasterDetails,
    {data: GetIPData, isLoading: GetIPMasterIsLoading},
  ] = useGetIPMaster();

  const [
    GetAssetMasterDetails,
    {data: GetAssetData, isLoading: GetAssetMasterIsLoading},
  ] = useGetAssetMaster();

  const [
    GetRelationMasterDetails,
    {data: GetRelationData, isLoading: GetRelationMasterIsLoading},
  ] = useGetRelationMaster();

  const getProductRequest: getProductRequest = {
    appId: isMainApplicant ? applicantId : guarantorId,
    applicantType: isMainApplicant ? 'mainApplicant' : 'guarantor',
  };

  const addProductRequest: addProductRequest = {
    appId: isMainApplicant ? applicantId : guarantorId,
    applicantType: isMainApplicant ? 'mainApplicant' : 'guarantor',
    documentType: documentType,
    productType: productType,
    applicantIncomeType: applicantIncomeType,
    assetRelation: assetRelation,
  };

  const UploadProductRequest: UploadProductRequest = {
    appId: isMainApplicant ? applicantId : guarantorId,
    applicantType: isMainApplicant ? 'mainApplicant' : 'guarantor',
    base64: imageBase64,
    documentType: documentType,
    type: type,
  };

  const [
    uploadProductDocument,
    {
      data: uploadProductDocumentData,
      isLoading: SetUploadProductDocumentIsLoading,
    },
  ] = UploadProduct(UploadProductRequest);

  const [
    SaveProductetails,
    {data: SaveProductDetailsData, isLoading: SetProductDetailsIsLoading},
  ] = SaveProduct(addProductRequest);

  const [
    GetProductetails,
    {data: GetProductDetailsData, isLoading: GetProductDetailsIsLoading},
  ] = GetProductDetails(getProductRequest);

  useEffect(() => {
    if (GetProductDetailsData) {
      console.log("mjjjjjjj", GetProductDetailsData);
      setProductType(GetProductDetailsData?.productType || '');
      setDocumentType(GetProductDetailsData?.documentType || '');
      setImageUrl(GetProductDetailsData?.documentFilePath || '');
      setType(GetProductDetailsData?.type || '');
      setAssetRelation(GetProductDetailsData?.assetRelation || '');
      setApplicantIncomeType(
        !isMainApplicant
          ? 'Guarantor Income'
          : GetProductDetailsData?.applicantIncomeType || '',
      );
      setIsGuarantorMandatory(GetProductDetailsData.isGuarantorMandatory);
      setAAStatus(GetProductDetailsData.aaStatus || false);
    }
  }, [GetProductDetailsData]);

  useEffect(() => {
    if (applicantIncomeType && isChanged) {
      setImageUrl('');
      setType('');
      setDocumentType('');
      setIsGuarantorMandatory(false);
    }
  }, [applicantIncomeType]);

  useEffect(() => {
    if (productType && isChanged) {
      setDocumentType('');
      setImageUrl('');
      setType('');
      setIsGuarantorMandatory(false);
      !isMainApplicant ? '' : setApplicantIncomeType('');
    }
  }, [productType]);

  useEffect(() => {
    if (SaveProductDetailsData) {
      documentType == 'AA' && !AAStatus
        ? navigation.navigate('AccountAgregators')
        : !isMainApplicant && (productType == 'NIP' || productType == 'Asset')
        ? navigation.navigate('LoanOffer')
        : navigation.navigate('DelarshipDetails');
    }
  }, [SaveProductDetailsData]);

  useEffect(() => {
    if (imageBase64) {
      uploadProductDocument.mutateAsync();
    }
  }, [imageBase64]);

  type RenderPDFTypes = {
    url: string;
    docType: string;
  };

  useFocusEffect(
    useCallback(() => {
      if (applicantId) {
        GetIpMasterDetails.mutateAsync();
        GetAssetMasterDetails.mutateAsync();
        GetProductetails.mutateAsync();
        GetRelationMasterDetails.mutateAsync();
        setIsChanged(false);
      }
    }, []),
  );
  useEffect(() => {
    if (useViewStatus) {
      setIsViewOnly(useViewStatus?.isSubmitToCreditFreeze ? true : false);
    }
  }, []);

  const IPMasterList: string[] = GetIPData
    ? GetIPData.map(item => item.ipType)
    : [];

  const AssetMasterList: string[] = GetAssetData
    ? GetAssetData?.assetDocumentMasterList?.map(item => item.assetDocumentType)
    : [];

  const RelationMasterList: string[] = GetRelationData
    ? GetRelationData.map(item => item.assetRelation)
    : [];

  const activeArray = [productType];
  const activeIPArray = [productType, documentType, applicantIncomeType];
  const activeIPGuarantorArray = [productType, applicantIncomeType];
  const activeAssetArray = [productType, documentType];

  let isActive: boolean = useActive(
    productType == 'IP'
      ? isMainApplicant && applicantIncomeType == 'Guarantor Income'
        ? activeIPGuarantorArray
        : activeIPArray
      : productType == 'Asset'
      ? activeAssetArray
      : activeArray,
  );
  let hasError: boolean = isError.some(error => error.hasError === true);

  useEffect(() => {
    if (productTypeOpen) {
      setdocumentTypeOpen(false);
      setAssetRelationOpen(false);
    }
  }, [productTypeOpen]);

  useEffect(() => {
    if (documentTypeOpen) {
      setProductTypeOpen(false);
      setAssetRelationOpen(false);
    }
  }, [documentTypeOpen]);

  useEffect(() => {
    if (assetRelationOpen) {
      setdocumentTypeOpen(false);
      setProductTypeOpen(false);
    }
  }, [assetRelationOpen]);

  return (
    <WaveBackground
      loading={[
        GetIPMasterIsLoading,
        GetAssetMasterIsLoading,
        GetProductDetailsIsLoading,
        SetProductDetailsIsLoading,
        GetRelationMasterIsLoading,
        SetUploadProductDocumentIsLoading,
      ]}
      title={'Product Details'}>
      <LabelDropdown
        label="Product type"
        open={productTypeOpen}
        setDropdownOpen={setProductTypeOpen}
        defaultValue={productType}
        options={['IP', 'NIP', 'Asset']}
        setSelectedOption={value => {
          handleProductUpdate(value);
        }}
        setSelectedItem={item => {}}
        isChange={setIsChanged}
        mandatory
        zIndex={productTypeOpen ? 1000 : 0}
        disabled={
          isViewOnly || !isMainApplicant
          // && isGuarantorMandatory
        }
      />

      {productType == 'IP' && (
        <>
          <View style={{marginBottom: 10}}>
            <LabeledRadioButtonGroup
              heading={`Income Details`}
              options={['Self Income', 'Guarantor Income']}
              onChange={setApplicantIncomeType}
              value={applicantIncomeType}
              isChange={setIsChanged}
              mandatory
              inLine
              disabled={isViewOnly || !isMainApplicant}
            />
          </View>

          {((isMainApplicant && applicantIncomeType == 'Self Income') ||
            !isMainApplicant) && (
            <LabelDropdown
              label="IP Proof document"
              open={documentTypeOpen}
              setDropdownOpen={setdocumentTypeOpen}
              defaultValue={documentType}
              options={IPMasterList}
              setSelectedOption={value => {
                handleDocumentUpdate(value);
              }}
              setSelectedItem={item => {}}
              isChange={setIsChanged}
              mandatory
              disabled={isViewOnly}

              zIndex={documentTypeOpen ? 1000 : 0}
            />
          )}
        </>
      )}

      {productType == 'Asset' && (
        <>
          <LabelDropdown
            label="Asset Proof document"
            open={documentTypeOpen}
            setDropdownOpen={setdocumentTypeOpen}
            defaultValue={documentType}
            options={AssetMasterList}
            setSelectedOption={value => {
              handleDocumentUpdate(value);
            }}
            setSelectedItem={item => {}}
            isChange={setIsChanged}
            mandatory
            zIndex={documentTypeOpen ? 1000 : 0}
            disabled={isViewOnly}
          />
          <LabelDropdown
            label="Asset Owned By"
            open={assetRelationOpen}
            setDropdownOpen={setAssetRelationOpen}
            defaultValue={assetRelation}
            options={RelationMasterList}
            setSelectedOption={value => {
              setAssetRelation(value);
            }}
            setSelectedItem={item => {}}
            isChange={setIsChanged}
            mandatory
            zIndex={assetRelationOpen ? 1000 : 0}
            disabled={isViewOnly}
          />
        </>
      )}

      {documentType !== 'AA' &&
        ((isMainApplicant &&
          ((productType == 'IP' && applicantIncomeType == 'Self Income') ||
            productType == 'Asset')) ||
          !isMainApplicant) && (
          <View style={{marginTop: 20}}>
            {imageUrl === '' && (
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
                  onPress={() => {
                    handleOnPress();
                  }}>
                  <Icon name="upload" />
                </TouchableOpacity>
              </View>
            )}

            {imageUrl !== '' && type == 'jpg' && (
              <View style={{width: '100%', marginTop: '10%',}}>
                <Image
                  source={{uri: imageUrl}}
                  style={{
                    width: 250,
                    height: 180,
                    borderRadius: 10,
                    alignSelf: 'center',
                  }}
                  resizeMode="stretch"
                />
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    top: -10,
                    backgroundColor: 'transparent',
                    alignSelf: 'flex-end',
                    paddingHorizontal: '5%',
                  }}
                  disabled={isViewOnly}
                  onPress={() => {
                    handleCloseImage();
                  }}>
                  <Icon name="close" />
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}

      {imageUrl !== '' && type == 'pdf' && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: 20,
          }}>
          <View style={{flexDirection: 'row'}}>
            <Icon name="pdf" />
            <Text
              style={{
                color: 'LightBlue',
                fontFamily: APP_FONTS.Roboto_Regular,
                fontSize: FONT_SIZE.l,
                marginLeft: 10,
              }}
              onPress={() => {
                // DownloadFile(imageUrl, applicantId + '_' + documentType);
                // Linking.openURL(imageUrl);
                // console.log('mjjjj', imageUrl.split('/').pop());
              }}>
              {`${documentType || productType}.pdf`}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: 'transparent',
              alignSelf: 'flex-end',
              paddingHorizontal: '16%',
            }}
            disabled={isViewOnly}
            onPress={() => {
              handleCloseImage();
            }}>
            <Icon name="close" />
          </TouchableOpacity>
        </View>
      )}

      <Button
        text={isChanged ? 'Save' : 'Next'}
        active={isActive && !hasError}
        marginVertical={10}
        marginTop={100}
        onPress={() => {
          isChanged
            ? SaveProductetails.mutateAsync()
            : documentType == 'AA' && !AAStatus
            ? navigation.navigate('AccountAgregators')
            : !isMainApplicant && productType == 'NIP'
            ? SaveProductetails.mutateAsync()
            : navigation.navigate('DelarshipDetails');
        }}
      />
      <LoanSummaryButton onPress={() => navigation.replace('LoanSummary')} />
    </WaveBackground>
  );
};
export default ProductDetails;
