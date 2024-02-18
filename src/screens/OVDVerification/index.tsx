import React, { FC, useCallback, useState, useRef, useEffect } from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import { RouteProp, useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import LabelDropdown from 'components/LabelDropdown ';
import WaveBackground from 'components/WaveBackground';
import LabeledTextInput from 'components/LabeledTextInput';
import Button from 'components/Button';
import { ErrorObject } from 'config/Types';
import { useApplicantDetails } from 'context/useApplicantDetails';
import Colors from 'config/Colors';
import useActive from 'hooks/useActive';
import { RootStackParamList } from 'navigation/HomeStack';
import Icon from 'components/Icon';
import { APP_FONTS, FONT_SIZE } from 'config/Fonts';
import { launchCamera, ImagePickerResponse } from 'react-native-image-picker';
import useSelectImage from 'hooks/useSelectImage';
import {
  useSaveOVDDetails,
  useGetOVDDetails,
  useSaveManualOVDDetails,
} from 'api/ReactQuery/OVD';
import {
  SaveOVDDetailsRequest,
  GetOVDDetailsRequest,
  SaveManualOVDDetailsRequest,
} from 'api/ReactQuery/OVD/types';
import ImagePicker from 'react-native-image-crop-picker';
import convertImageFileToBase64 from 'config/Functions/ConvertImageToBase64';
import { useCKYCData } from 'context/useCKYCData';
import { useDelete } from 'api/ReactQuery/Lead';
import LoanSummaryButton from 'components/LoanSummaryButton';
import styles from './styles';
import { usedViewStatus } from 'context/useViewStatus';
import LabeledDropdown from 'components/LabeledDropdown';
import useFontNormalise from 'hooks/useFontNormalise';

type OVDNavigationProp = StackNavigationProp<
  RootStackParamList,
  'OVDVerification'
>;
type OVDRouteProp = RouteProp<RootStackParamList, 'OVDVerification'>;

interface OVDVerificationScreenProps {
  navigation: OVDNavigationProp;
  route: OVDRouteProp;
}

const OVDVerification: FC<OVDVerificationScreenProps> = ({
  navigation,
  route,
}) => {
  const { applicantId, isMainApplicant, guarantorId } = useApplicantDetails();
  const { useViewStatus } = usedViewStatus();

  // var applicantId = 'MU375344'
  const [isError, setIsError] = useState<ErrorObject[]>([]);
  const [selectedDocType, setSelectedDocType] = useState<string>('Document');
  const [documentTypeOpen, setdocumentTypeOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [docnumber, setDocnumber] = useState<string>('');
  const [dateofbirth, setDateofBirth] = useState<string>('');
  const [pincode, setPincode] = useState<string>('');
  const [verifiedStatus, setVerifiedStatus] = useState<string>('');
  const [dataVisible, setDataVisible] = useState<boolean>(false);
  const [passportNo, setPassportNo] = useState<string>('');
  const [selectedGender, setSelectedGender] = useState<string>('');
  const [genderOpen, setGenderOpen] = useState<boolean>(false);
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const [isValueChanged, setIsValueChanged] = useState<boolean>(false);

  const [selectingCalendar, setSelectingCalendar] = useState<boolean>(false);
  const [data, setData] = useState<any>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [imageBase64, setImageBase64] = useState<string>('');
  const [backImageUrl, setBackImageUrl] = useState<string>('');
  const [backImageBase64, setBackImageBase64] = useState<string>('');
  const [isViewOnly, setIsViewOnly] = useState<boolean>(false);
  const [selectNull, setSelectedNull] = useState<'upload' | 'capture' | null>(
    null,
  );

  const [selectedImageSelection, setSelectedImageSelection] = useState<
    'upload' | 'capture' | null
  >(null);

  const [dateOfBirthForCalendar, setDateofBirthForCalendar] = useState<any>('');
  const [tempdateOfBirth, setTempDateOfBirth] = useState<string>('');
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const { CKYCData } = useCKYCData();

  useFocusEffect(
    useCallback(() => {
      if (applicantId) {
        setIsChanged(false);
        setIsValueChanged(false);
      }
    }, []),
  );

  const [Deletefront, { data: DeleteFrontData, isLoading: DeleteIsLoading }] = useDelete(
    `appId=${isMainApplicant ? applicantId : guarantorId}&type=${'OVD Front'}&applicantType=${isMainApplicant ? 'mainApplicant' : 'guarantor'
    }`,
  );
  const [DeleteBack, { data: DeleteBackData, isLoading: DeleteBackIsLoading }] = useDelete(
    `appId=${isMainApplicant ? applicantId : guarantorId}&type=${'OVD Back'}&applicantType=${isMainApplicant ? 'mainApplicant' : 'guarantor'
    }`,
  );

  const handleOVDType = value => {
    setSelectedDocType(value);
    setDocnumber('');
    // setSelectedDocType('');
    setDateofBirth('');
    setTempDateOfBirth('');
    setImageUrl('');
    setName('');
    setPincode('');
    setVerifiedStatus('');
    setPassportNo('');
    setDataVisible(false);
  };

  useEffect(() => {
    if (docnumber && isValueChanged) {
      setTempDateOfBirth('');
      // setImageUrl('');
      setName('');
      setPincode('');
      setVerifiedStatus('');
      setPassportNo('');
      setDataVisible(false);
    }
  }, [docnumber])



  useEffect(() => {
    if (dateofbirth && isValueChanged) {
      setDataVisible(false);
      setName('');
      setPincode('');
      setVerifiedStatus('');
      setPassportNo('');
    }
  }, [dateofbirth, tempdateOfBirth, dateOfBirthForCalendar])

  useEffect(() => {
    if (CKYCData) {
      setIsViewOnly(
        CKYCData?.ovdStatus ? true :
          useViewStatus?.isSubmitToCreditFreeze ? true :
            useViewStatus?.isFreeze ? true : false,
      );
    }
  }, []);

  const handleLaunchCamera = (docType) => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      freeStyleCropEnabled: true,
      cropperStatusBarColor: Colors.Primary,
      cropperToolbarColor: Colors.Primary,
      cropperToolbarWidgetColor: Colors.White,
      cropperActiveWidgetColor: Colors.Primary,
      hideBottomControls: true
    }).then(image => {
      console.log(image.path);
      if (image && docType === 'front') {

        setImageUrl(image.path);
        convertImageFileToBase64(image.path)
          .then(base64Data => {
            if (base64Data) {
              setImageBase64(base64Data);
              setTempDateOfBirth('');
              setName('');
              setPincode('');
              setVerifiedStatus('');
              setPassportNo('');
              setDataVisible(false);
            }
          })
          .catch(error => {
            console.error('Error converting image file to base64:', error);
          });
      }
      else if (image && docType === 'back') {
        setBackImageUrl(image.path);
        convertImageFileToBase64(image.path)
          .then(base64Data => {
            if (base64Data) {
              setBackImageBase64(base64Data);
              setTempDateOfBirth('');
              setName('');
              setPincode('');
              setVerifiedStatus('');
              setPassportNo('');
              setDataVisible(false);
            }
          })
          .catch(error => {
            console.error('Error converting image file to base64:', error);
          });
      }
    }).catch(e => {
      console.log(e);
    })

  };

  const handleOnPress = (docType) => {

    const callback = (response: any, path: any, name: string) => {
      if (response) {
        if (docType === 'front') {
          setImageUrl(response[0]?.fileCopyUri);
          convertImageFileToBase64(response[0]?.fileCopyUri)
            .then(base64Data => {
              if (base64Data) {
                setImageBase64(base64Data);
                setTempDateOfBirth('');
                setName('');
                setPincode('');
                setVerifiedStatus('');
                setPassportNo('');
                setDataVisible(false);
              }
            })
            .catch(error => {
              console.error('Error converting image file to base64:', error);
            });
        }
        else if (docType === 'back') {
          setBackImageUrl(response[0]?.fileCopyUri);
          convertImageFileToBase64(response[0]?.fileCopyUri)
            .then(base64Data => {
              if (base64Data) {
                setBackImageBase64(base64Data);
                setTempDateOfBirth('');
                setName('');
                setPincode('');
                setVerifiedStatus('');
                setPassportNo('');
                setDataVisible(false);
              }
            })
            .catch(error => {
              console.error('Error converting image file to base64:', error);
            });
        }


      }
    };
    useSelectImage(callback, 'onlypickimage', setSelectedNull);
  };

  const SaveOVDDetailsRequest: SaveOVDDetailsRequest = {
    base64: imageBase64,
    ovdBackFilepath: backImageBase64,
    appId: isMainApplicant ? applicantId : guarantorId,
    documentNumber: docnumber,
    documentDob: dateofbirth,
    documentType: selectedDocType,
    applicantType: isMainApplicant ? 'mainApplicant' : 'guarantor',
  };

  // console.log("SaveOVDDetailsRequest",SaveOVDDetailsRequest);

  const SaveManualOVDDetailsRequest: SaveManualOVDDetailsRequest = {
    appId: isMainApplicant ? applicantId : guarantorId,
    documentNumber: docnumber,
    documentDob: dateofbirth,
    documentType: selectedDocType,
    documentName: name,
    documentPincode: pincode,
    passportNumber: passportNo,
    documentGender: selectedGender,
    applicantType: isMainApplicant ? 'mainApplicant' : 'guarantor',
    isVerified: isChanged ? false : true
  };

  const [
    SaveManualOVDDetails,
    { data: SaveManualOVDDetailsData, isLoading: SaveManualOVDDetailsIsLoading },
  ] = useSaveManualOVDDetails(SaveManualOVDDetailsRequest);

  const [getOTD, { data: GetOTDData, isLoading: GetOTDIsLoading }] =
    useSaveOVDDetails(SaveOVDDetailsRequest);

  const [
    GetOVDDetails,
    { data: getOVDDetailsData, isLoading: GetOVDDetailsIsLoading },
  ] = useGetOVDDetails(
    isMainApplicant ? `mainApplicant/${applicantId}` : `guarantor/${guarantorId}`,
  );

  useEffect(() => {
    GetOVDDetails.mutateAsync();
  }, []);

  useEffect(() => {
    if (GetOTDData) {
      setIsValueChanged(false);
      GetOVDDetails.mutateAsync();
    }
  }, [GetOTDData]);


  useEffect(() => {
    if (getOVDDetailsData && getOVDDetailsData?.documentType) {
      console.log("fffffff", JSON.stringify(getOVDDetailsData, null, 4));

      setDataVisible(true);
      setDocnumber(getOVDDetailsData.documentNumber);
      setPassportNo(getOVDDetailsData.passportNumber);
      setSelectedGender(
        getOVDDetailsData.documentGender == 'M' ||
          getOVDDetailsData.documentGender == 'Male'
          ? 'Male'
          : getOVDDetailsData.documentGender == 'F' ||
            getOVDDetailsData.documentGender == 'Female'
            ? 'Female'
            : 'Transgender',
      );
      setSelectedDocType(getOVDDetailsData.documentType);
      setTempDateOfBirth(getOVDDetailsData.documentDob || '')
      setDateofBirth(getOVDDetailsData.documentDob);
      setImageUrl(getOVDDetailsData.documentFilePath || '');
      setBackImageUrl(getOVDDetailsData.documentFilePathBack || '');
      setSelectedImageSelection((getOVDDetailsData.documentFilePath || getOVDDetailsData.documentFilePathBack) ? 'upload' : null)
      setName(getOVDDetailsData.documentName);
      setPincode(getOVDDetailsData.documentPincode);
      setVerifiedStatus(
        getOVDDetailsData.documentVerifiedStatus ? 'Verified' : 'Not-Verified',
      );
    }
  }, [getOVDDetailsData]);

  useEffect(() => {
    if (SaveManualOVDDetailsData) {
      SaveManualOVDDetailsData.appId && navigation.navigate('KYCVerification');
    }
  }, [SaveManualOVDDetailsData]);

  const handleCloseImage = (type) => {
    type == 'front' ? Deletefront.mutateAsync() : DeleteBack.mutateAsync()
    type == 'front' ? setImageBase64('') : setBackImageBase64('')
    type == 'front' ? setImageUrl('') : setBackImageUrl('')
    // setDocnumber('');
    // setPassportNo('');
    // setSelectedGender('');
    // // setSelectedDocType('');
    // // setDateofBirth('');
    // setName('');
    // setPincode('');
    // setVerifiedStatus('');
    // setDataVisible(false);
  };

  const ondobChange = (event: any, selectedDate: Date | undefined) => {
    // console.log("mjjjjjjj",selectedDate);
    setIsValueChanged(true);

    const currentDate = selectedDate || new Date();
    setSelectingCalendar(false);
    event.type == 'set' ? setTempDateOfBirth(event.type == 'set' ? moment(currentDate).format('DD-MM-YYYY') : '') : null
    event.type == 'set' ? setDateofBirth(event.type == 'set' ? moment(currentDate).format('DD-MM-YYYY') : '') : null
    event.type == 'set' ? setDateofBirthForCalendar(event.type == 'set' ? currentDate : '') : null
  };

  const currentDate = new Date();
  const eighteenYearsAgo = moment(currentDate).subtract(18, 'years').toDate();
  const sixtenYearsAgo = moment(currentDate).subtract(67, 'years').toDate();

  useEffect(() => {
    const eighteenYearsAgoMoment = moment(currentDate).subtract(18, 'years').format('DD-MM-YYYY')
    console.log("eighteenYearsAgoMoment", eighteenYearsAgoMoment);

    if (
      dateofbirth !== '' &&
      moment(dateofbirth).isAfter(eighteenYearsAgoMoment)
    ) {
      setDateofBirth(tempdateOfBirth);
    }
  }, [dateofbirth]);

  const activeArray = [dateofbirth, docnumber, selectedDocType];
  const activeArrayImg = [dateofbirth, docnumber, selectedDocType, imageUrl, backImageUrl];
  const activeArrayForVoter = [docnumber, selectedDocType];
  const activeArrayForVoterImg = [docnumber, selectedDocType, imageUrl, backImageUrl];

  const formActiveArray = [imageBase64, backImageBase64];

  let isActive: boolean = useActive(
    selectedDocType == 'Voter Id' ?
      // (imageUrl !== '' || backImageUrl !== '') ? activeArrayForVoterImg :
      activeArrayForVoter : selectedDocType == 'Form 60' ? formActiveArray : 
      // (imageUrl !== '' || backImageUrl !== '') ? activeArrayImg :
       activeArray,
  );
  let hasError: boolean = isError.some(error => error.hasError === true);
  // console.log("isValueChanged", dateofbirth, isValueChanged);
  // console.log("dataVisible", dataVisible);

  type RenderImageTypes = {
    docType: 'front' | 'back';
    url?: string;
  };

  const RenderImage = ({ docType, url }: RenderImageTypes) => (
    <View>
      <Image
        source={{
          uri: url
            ? url
            : docType === 'front'
              ? imageUrl
              : backImageUrl,
        }}
        style={{
          width: useFontNormalise(120),
          height: useFontNormalise(110),
          borderRadius: 10,
        }}
      />
      {!isViewOnly && url === undefined && (
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: -9,
            right: -5,
            backgroundColor: 'transparent',
            alignSelf: 'flex-end',
          }}
          onPress={() => {
            if (docType === 'front') {
              handleCloseImage('front');
            } else {
              handleCloseImage('back');
            }
          }}>
          <Icon name="close" />
        </TouchableOpacity>
      )}
    </View>
  );

  type ImageSelectionButtonsTypes = {
    buttonType: 'upload' | 'capture';
    docType?: 'front' | 'back';
  };

  const ImageSelectionButtons = ({
    buttonType,
    docType,
  }: ImageSelectionButtonsTypes) => (
    <View>
      <TouchableOpacity
        style={{
          backgroundColor:
            buttonType === 'capture' ? Colors.CaptureLight : Colors.UploadLight,
          paddingVertical: 40,
          paddingHorizontal: selectedDocType == "Driving License" ? 18 : 30,
          borderRadius: 7,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        disabled={isViewOnly}
        onPress={() => {
          if (buttonType === 'upload') {
            handleOnPress(docType);
          } else {
            handleLaunchCamera(docType);
          }
        }}>
        <Icon name={buttonType} />
        <Text style={styles.ButtonText}>
          {`${selectedDocType} ${docType}`}
        </Text>
      </TouchableOpacity>
    </View>
  );

  console.log("baffff",backImageUrl);

  return (
    <WaveBackground
      loading={[
        GetOVDDetailsIsLoading,
        GetOTDIsLoading,
        DeleteIsLoading,
        DeleteBackIsLoading,
        SaveManualOVDDetailsIsLoading,
      ]}
      title={'OVD Verification'}>
      {selectingCalendar && (
        <DateTimePicker
          testID="date"
          value={dateOfBirthForCalendar || new Date()}
          maximumDate={eighteenYearsAgo}
          minimumDate={sixtenYearsAgo}
          mode="date"
          onChange={ondobChange}

        />
      )}

      <View
        style={{
          marginVertical: 10,
          width: '100%',
        }}>

        <LabeledDropdown
          label="OVD Document"
          defaultValue={selectedDocType}
          options={['Voter Id', 'Driving License', 'Passport']}
          setSelectedOption={(value) => { handleOVDType(value) }}
          bottom
          isChange={setIsValueChanged}
          mandatory
          disabled={isViewOnly}
        />


        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 20,
            marginVertical: 10,
          }}>
          <Text
            style={{
              color: Colors.LabelGrey,
              fontFamily: APP_FONTS.Medium,
              fontSize: FONT_SIZE.s,
            }}>
            {`Capture or Select Photos of Your ${selectedDocType}`} {selectedDocType == 'Form 60' ? <Icon name="pointed-star" /> : null}
          </Text>
          {/* <Icon name="pointed-star" /> */}
        </View>
        
        {(backImageUrl === '' || imageUrl === '') && (
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
              onPress={() => {
                isViewOnly ? null :
                  setSelectedImageSelection('upload')
                // handleOnPress();
              }}>
              <Icon name="upload" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: Colors.Capture,
                paddingVertical: 10,
                paddingHorizontal: 50,
                borderRadius: 10,
              }}
              onPress={() => {
                isViewOnly ? null :
                  setSelectedImageSelection('capture');
                // handleLaunchCamera();
              }}>
              <Icon name="capture" />
            </TouchableOpacity>
          </View>
        )}


        {
          selectedImageSelection === 'capture' ? (
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-around',
                marginTop: 20,
                marginVertical: 10,
                paddingHorizontal: 5,
              }}>
              {imageUrl !== '' ? (
                <RenderImage docType={`front`} />
              ) : (
                <ImageSelectionButtons
                  buttonType="capture"
                  docType={`front`}
                />
              )}
              {backImageUrl !== '' ? (
                <RenderImage docType={`back`} />
              ) : (
                <ImageSelectionButtons buttonType="capture" docType={`back`} />
              )}
            </View>
          ) :
            selectedImageSelection === 'upload' ? (
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'space-around',
                  marginTop: 20,
                  marginVertical: 10,
                  paddingHorizontal: 5,
                }}>
                {imageUrl !== '' ? (
                  <RenderImage docType={`front`} />
                ) : (
                  <ImageSelectionButtons buttonType="upload" docType={`front`} />
                )}
                {backImageUrl !== '' ? (
                  <RenderImage docType={`back`} />
                ) : (
                  <ImageSelectionButtons buttonType="upload" docType={`back`} />
                )}
              </View>
            )
              : null
        }


      </View>

      {selectedDocType !== "Form 60" &&
        <LabeledTextInput
          label={
            selectedDocType == 'Voter Id'
              ? 'Epic Number'
              : selectedDocType == 'Driving License'
                ? 'Dl Number'
                : selectedDocType == 'Passport'
                  ? 'File Number'
                  : 'Document Number'
          }
          onChange={setDocnumber}
          autoCapitalize="characters"
          defaultValue={docnumber}
          setErrorFlag={setIsError}
          IsErrorArray={isError}
          // maxLength={10}
          isChange={setIsValueChanged}
          mandatory
          disabled={isViewOnly}
        />}

      {selectedDocType !== 'Voter Id' && selectedDocType !== "Form 60" && (
        <View style={styles.dobContainer}>
          <View style={{ flexDirection: 'row' }}>
            <Text
              style={[
                styles.labelText,
                { color: selectingCalendar ? Colors.Black : Colors.LabelGrey },
              ]}>
              DOB{' '}
            </Text>
            <Icon name="pointed-star" />
          </View>
          <TouchableOpacity
            style={[
              styles.inputbox,
              {
                marginTop: 10,
                borderColor: selectingCalendar
                  ? Colors.Black
                  : Colors.LightGrey,
              },
            ]}
            disabled={isViewOnly}
            onPress={() => setSelectingCalendar(true)}>
            <Text
              style={{
                color: dateofbirth ? Colors.Black : Colors.LabelGrey,
              }}>
              {dateofbirth || 'dd/mm/yyyy'}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {!dataVisible && (
        <Button
          text={selectedDocType == 'Form 60' ? "Save" : 'Get Details'}
          active={isActive && !hasError}
          marginVertical={10}
          marginTop={30}
          onPress={() => {
            getOTD.mutateAsync();
          }}
        />
      )}

      {dataVisible && selectedDocType !== "Form 60" && (
        <>
          {selectedDocType == 'Passport' && (
            <LabeledTextInput
              label="Passport Number"
              autoCapitalize="sentences"
              onChange={setPassportNo}
              defaultValue={passportNo}
              setErrorFlag={setIsError}
              IsErrorArray={isError}
              isChange={setIsChanged}
              mandatory
              disabled={isViewOnly}
            />
          )}

          <LabeledTextInput
            label="Verified Status"
            autoCapitalize="sentences"
            onChange={setVerifiedStatus}
            defaultValue={verifiedStatus ? 'Verified' : 'Not-Verified'}
            setErrorFlag={setIsError}
            IsErrorArray={isError}
            isChange={setIsChanged}
            mandatory
            disabled
          />

          <LabeledTextInput
            label="Name"
            autoCapitalize="sentences"
            onChange={setName}
            defaultValue={name}
            setErrorFlag={setIsError}
            IsErrorArray={isError}
            isChange={setIsChanged}
            mandatory
            disabled={isViewOnly}
          />
          {selectedDocType == 'Voter Id' && (
            <LabelDropdown
              label="Gender"
              open={genderOpen}
              setDropdownOpen={setGenderOpen}
              defaultValue={selectedGender}
              options={['Male', 'Female', 'Transgender']}
              setSelectedOption={setSelectedGender}
              setSelectedItem={item => { }}
              isChange={setIsChanged}
              mandatory
              disabled={isViewOnly}

              dropDownDirection='TOP'
              zIndex={documentTypeOpen ? 1000 : 0}
            />
          )}
          {selectedDocType == 'Driving License' && (
            <LabeledTextInput
              label="Pincode"
              autoCapitalize="sentences"
              onChange={setPincode}
              defaultValue={pincode}
              setErrorFlag={setIsError}
              IsErrorArray={isError}
              isChange={setIsChanged}
              mandatory
              disabled={isViewOnly}
            />
          )}
        </>
      )}


      {dataVisible && (
        <Button
          text={isChanged ? 'Save' : isValueChanged ? 'Save' : 'Next'}
          active={true}
          marginTop={50}
          marginVertical={10}
          onPress={() => {
            isChanged
              ? SaveManualOVDDetails.mutateAsync()
              : isValueChanged
                ? SaveManualOVDDetails.mutateAsync()
                :
                navigation.navigate('KYCVerification');
          }}
        />
      )}
      <LoanSummaryButton onPress={() => navigation.replace('LoanSummary')} />
    </WaveBackground>
  );
};
export default OVDVerification;
