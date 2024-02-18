import React, { FC, useState, useEffect } from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import WaveBackground from 'components/WaveBackground';
import LabeledTextInput from 'components/LabeledTextInput';
import Button from 'components/Button';
import { ErrorObject } from 'config/Types';
import { useApplicantDetails } from 'context/useApplicantDetails';
import Colors from 'config/Colors';
import useActive from 'hooks/useActive';
import { RootStackParamList } from 'navigation/HomeStack';
import styles from './styles';
import Icon from 'components/Icon';
import { APP_FONTS, FONT_SIZE } from 'config/Fonts';
import { ImagePickerResponse, launchCamera } from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import useSelectImage from 'hooks/useSelectImage';
import {
  useGetPANDetails,
  useGetPANOCR,
  useSavePANDetails,
  useVerifyPan
} from 'api/ReactQuery/OCR';
import {
  GetPANDetailsRequest,
  GetPANOCRRequest,
  SavePANDetailsRequest,
  VerifyPanRequest
} from 'api/ReactQuery/OCR/types';
import convertImageFileToBase64 from 'config/Functions/ConvertImageToBase64';
import { useCKYCData } from 'context/useCKYCData';
import { usedViewStatus } from 'context/useViewStatus';
import { useDelete } from 'api/ReactQuery/Lead';
import LoanSummaryButton from 'components/LoanSummaryButton';
import moment from 'moment';
import useFontNormalise from 'hooks/useFontNormalise';

type PANVerificationNavigationProp = StackNavigationProp<
  RootStackParamList,
  'PANVerification'
>;
type PANVerificationRouteProp = RouteProp<
  RootStackParamList,
  'PANVerification'
>;

interface PANVerificationScreenProps {
  navigation: PANVerificationNavigationProp;
  route: PANVerificationRouteProp;
}

const PANVerification: FC<PANVerificationScreenProps> = ({
  navigation,
  route,
}) => {
  const { applicantId, isMainApplicant, guarantorId } = useApplicantDetails();
  // var applicantId = "MU031341"
  const { CKYCData } = useCKYCData();
  const { useViewStatus } = usedViewStatus();
  const [documentDataSource, setDocumentDataSource] = useState<string>('');
  const [isError, setIsError] = useState<ErrorObject[]>([]);
  const [name, setName] = useState<string>('');
  const [PANnumber, setPANnumber] = useState<string>('');
  const [dateofbirth, setDateofBirth] = useState<string>('');
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const [selectingCalendar, setSelectingCalendar] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [imageBase64, setImageBase64] = useState<string>('');
  const [isViewOnly, setIsViewOnly] = useState<boolean>(false);
  const [selectNull, setSelectedNull] = useState<'upload' | 'capture' | null>(
    null,
  );
  const [dateOfBirthForCalendar, setDateofBirthForCalendar] = useState<any>('');
  const [tempdateOfBirth, setTempDateOfBirth] = useState<string>('');
  const [isPanVerify, setIsPanVerify] = useState<boolean>(false);

  const moment = require('moment');

  function convertDateFormat(inputDate) {
    // Use Moment.js to parse the input date
    const parsedDate = moment(inputDate, ['DD-MM-YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD', 'YYYY/MM/DD'], true);

    // Check if the parsed date is valid
    if (parsedDate.isValid()) {
      // Format the date as "dd-mm-yyyy"
      const formattedDate = parsedDate.format('DD-MM-YYYY');
      return formattedDate;
    } else {
      // Handle invalid date formats
      console.error('Invalid date format');
      return null;
    }
  }
  useEffect(() => {

    // if (CKYCData) {
    console.log("CKYCData", CKYCData);

    setIsViewOnly(
      isPanVerify ? true :
        CKYCData?.panStatus ? true :
          useViewStatus?.isSubmitToCreditFreeze ? true :
            useViewStatus?.isFreeze ? true : false,
    );
    // }
  }, [CKYCData, isPanVerify]);



  const GetPANOCRRequest: GetPANOCRRequest = {
    base64value: imageBase64,
    doctype: 'pan',
    appId: isMainApplicant ? applicantId : guarantorId,
    applicantType: isMainApplicant ? 'mainApplicant' : 'guarantor',

  };

  const VerifyPanRequest: VerifyPanRequest = {
    applicationId: isMainApplicant ? applicantId : guarantorId,
    type: isMainApplicant ? 'mainApplicant' : 'guarantor',
    panNumber: PANnumber

  };

  const SavePANDetailsRequest: SavePANDetailsRequest = {
    appId: isMainApplicant ? applicantId : guarantorId,
    documentType: 'Pan',
    documentName: name,
    documentNumber: PANnumber,
    // documentDataSource: '',
    verifyBy: 'OCR',
    documentDob: dateofbirth,
    panVerifiedStatus: 'true',
    applicantType: isMainApplicant ? 'mainApplicant' : 'guarantor',
  };

  const GetPANDetailsRequest: GetPANDetailsRequest = {
    applicationId: isMainApplicant ? applicantId : guarantorId,
    type: isMainApplicant ? 'mainApplicant' : 'guarantor',
  };
  const [GetPANOCR, { data: GetPANOCRData, isLoading: GetPANOCRIsLoading }] =
    useGetPANOCR(GetPANOCRRequest);

  const [VerifyPan, { data: VerifyPanData, isLoading: VerifyPanIsLoading }] =
    useVerifyPan(VerifyPanRequest);

  const [
    SavePANDetails,
    { data: SavePANDetailsData, isLoading: SavePANDetailsIsLoading },
  ] = useSavePANDetails(SavePANDetailsRequest);

  const [Delete, { data: DeleteData, isLoading: DeleteIsLoading }] = useDelete(
    `appId=${isMainApplicant ? applicantId : guarantorId
    }&type=PAN&applicantType=${isMainApplicant ? 'mainApplicant' : 'guarantor'
    }`,
  );

  const [
    GetPANDetails,
    { data: GetPANDetailsData, isLoading: GetPANDetailsIsLoading },
  ] = useGetPANDetails(GetPANDetailsRequest);

  const handleLaunchCamera = () => {
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
      if (image) {
        setImageUrl(image.path);
        convertImageFileToBase64(image.path)
          .then(base64Data => {
            if (base64Data) {
              setImageBase64(base64Data);
            }
          })
          .catch(error => {
            console.error('Error converting image file to base64:', error);
          });
      }
    }).catch(e => {
      console.log(e);
    })
    // launchCamera(
    //   {
    //     mediaType: 'photo',
    //     includeBase64: false,
    //     saveToPhotos: true,
    //   },
    //   (response: ImagePickerResponse) => {
    //     if (response.didCancel) {
    //       void 0;
    //     } else if (response.errorCode) {
    //       void 0;
    //     } else if (response.assets && response.assets.length > 0) {
    //       const capturedImageUri = response.assets[0].uri;

    // if (capturedImageUri) {
    //   setImageUrl(capturedImageUri);
    //   convertImageFileToBase64(capturedImageUri)
    //     .then(base64Data => {
    //       if (base64Data) {
    //         setImageBase64(base64Data);
    //       }
    //     })
    //     .catch(error => {
    //       console.error('Error converting image file to base64:', error);
    //     });
    // }
    // }
    //   },
    // );
  };

  const ResetPANDetails = () => {
    setPANnumber('');
    setName('');
  };

  useEffect(() => {
    DeleteData && ResetPANDetails();
  }, [DeleteData]);

  useEffect(() => {
    if (imageBase64) {
      GetPANOCR.mutateAsync();
    }
  }, [imageBase64]);

  useEffect(() => {
    if (SavePANDetailsData) {

      setIsChanged(false);
      navigation.navigate('KYCVerification');
    }
  }, [SavePANDetailsData]);

  useEffect(() => {
    if (GetPANOCRData) {
      var dateComponents = GetPANOCRData?.dateOfbirth.split('/');
      var outputDate = dateComponents[0] + '-' + dateComponents[1] + '-' + dateComponents[2];

      

      GetPANOCRData.panNo && setIsChanged(true);

      setPANnumber(GetPANOCRData.panNo || '');
      setName(GetPANOCRData?.panName || '');
      setDateofBirth(convertDateFormat(outputDate) || '');
      setTempDateOfBirth(convertDateFormat(outputDate) || '');
    }
  }, [GetPANOCRData]);

  const handleOnPress = () => {
    const callback = (response: any, path: any, name: string) => {
      if (response) {
        setImageUrl(response[0]?.fileCopyUri);
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
    useSelectImage(callback, 'onlypickimage', setSelectedNull);
  };

  useEffect(() => {
    GetPANDetails.mutateAsync();
  }, []);

  useEffect(() => {
    if (GetPANDetailsData) {
      console.log("mjjjjj", GetPANDetailsData);
      setDocumentDataSource(GetPANDetailsData.documentDataSource || '')
      setPANnumber(GetPANDetailsData.documentNumber || '');
      setTempDateOfBirth(convertDateFormat(GetPANDetailsData.documentDob) || '');
      setDateofBirth(convertDateFormat(GetPANDetailsData.documentDob) || '');
      setName(GetPANDetailsData.documentName || '');
      setImageUrl(GetPANDetailsData.documentFilePath || '');
      setIsPanVerify(GetPANDetailsData.isPanVerified)
    }
  }, [GetPANDetailsData]);

  useEffect(() => {
    if (VerifyPanData) {
      //   console.log("mjjjcccccjj", VerifyPanData);
      // setDocumentDataSource(GetPANDetailsData.documentDataSource || '')
      var dateComponents = VerifyPanData?.result?.dob.split('/');
      var outputDate = dateComponents[0] + '-' + dateComponents[1] + '-' + dateComponents[2];

      setPANnumber(VerifyPanData?.result?.pan || '');
      setTempDateOfBirth(convertDateFormat(outputDate) || '');
      setDateofBirth(convertDateFormat(outputDate) || '');
      setName(VerifyPanData?.result?.name || '');
      // setImageUrl(GetPANDetailsData.documentFilePath || '');
      setIsPanVerify(true);
    }
  }, [VerifyPanData]);



  const handleCloseImage = () => {
    setName('');
    setPANnumber('');
    setDateofBirth('');
    setTempDateOfBirth('');
    setImageBase64('');
    setImageUrl('');
    Delete.mutateAsync();
  };

  const ondobChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || new Date();
    console.log("pannnn", event, currentDate,);
    setSelectingCalendar(false);
    event.type == 'set' ? setTempDateOfBirth(event.type == 'set' ? convertDateFormat(currentDate) : '') : null
    event.type == 'set' ? setDateofBirth(event.type == 'set' ? convertDateFormat(currentDate) : '') : null
    event.type == 'set' ? setDateofBirthForCalendar(event.type == 'set' ? currentDate : '') : null
    setIsChanged(true);
  };

  const currentDate = new Date();
  const eighteenYearsAgo = moment(currentDate).subtract(18, 'years').toDate();
  const sixtenYearsAgo = moment(currentDate).subtract(67, 'years').toDate();

  useEffect(() => {
    const eighteenYearsAgoMoment = moment(currentDate).subtract(18, 'years').format('DD-MM-YYYY')
    if (
      dateofbirth !== '' &&
      moment(dateofbirth).isAfter(eighteenYearsAgoMoment)
    ) {
      setDateofBirth(convertDateFormat(tempdateOfBirth));
    }
  }, [dateofbirth]);

  const handleSubmit = () => {
    isChanged
      ? SavePANDetails.mutateAsync()
      : navigation.navigate('KYCVerification');
  };

  const activeArray = [name, dateofbirth, PANnumber];

  let isActive: boolean = useActive(activeArray);
  let hasError: boolean = isError.some(error => error.hasError === true);



  return (
    <WaveBackground
      loading={[
        GetPANOCRIsLoading,
        SavePANDetailsIsLoading,
        GetPANDetailsIsLoading,
        DeleteIsLoading,
        VerifyPanIsLoading
      ]}
      title={'PAN Verification'}>
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
          marginVertical: 15,
          width: '90%',
          marginTop: 25,
        }}>
        {!GetPANDetailsData?.documentVerifiedStatus && imageUrl === '' && (
          <>
            <View style={{ flexDirection: 'row', paddingHorizontal: 20 }}>
              <Text
                style={{
                  color: Colors.LabelGrey,
                  fontFamily: APP_FONTS.Medium,
                  fontSize: FONT_SIZE.s,
                }}>
                Capture or Select Photos of Your PAN Card{' '}
              </Text>
              <Icon name="pointed-star" />
            </View>
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
                onPress={handleOnPress}>
                <Icon name="upload" />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: Colors.Capture,
                  paddingVertical: 10,
                  paddingHorizontal: 50,
                  borderRadius: 10,
                }}
                onPress={handleLaunchCamera}>
                <Icon name="capture" />
              </TouchableOpacity>
            </View>
          </>
        )}

        {imageUrl !== '' && (
          <View
            style={{
              width: '110%',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
            }}>
            <View style={{
              width: 250, justifyContent: 'center',
              alignItems: 'center',
              height: 180,
            }}>
              <Image
                source={{ uri: imageUrl }}
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center'
                  // alignSelf: 'center',
                }}
                resizeMode='stretch'
              />
            </View>
            {
              !GetPANDetailsData?.documentVerifiedStatus && !isViewOnly &&
              (
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    top: -6,
                    //left: 10,
                    backgroundColor: 'transparent',
                    alignSelf: 'flex-end',
                    // padding:10,
                    paddingHorizontal: '8%',
                  }}
                  onPress={handleCloseImage}>
                  <Icon name="close" />
                </TouchableOpacity>
              )}
          </View>
        )}
      </View>

      <LabeledTextInput
        label="Name"
        autoCapitalize="sentences"
        onChange={setName}
        defaultValue={name}
        setErrorFlag={setIsError}
        disabled={isViewOnly}
        IsErrorArray={isError}
        isChange={setIsChanged}
        mandatory
      />

      <LabeledTextInput
        label="PAN Number"
        onChange={setPANnumber}
        autoCapitalize="characters"
        defaultValue={PANnumber}
        disabled={isViewOnly}
        setErrorFlag={setIsError}
        IsErrorArray={isError}
        maxLength={10}
        isChange={setIsChanged}
        // NumberPad={PANnumber.length >= 5 && PANnumber.length <= 8 ? true : false}
        mandatory
      />

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
              borderColor: selectingCalendar ? Colors.Black : Colors.LightGrey,
            },
          ]}
          onPress={() => setSelectingCalendar(true)}
          disabled={isViewOnly}>
          <Text
            style={{
              color: dateofbirth ? Colors.Black : Colors.LabelGrey,
            }}>
            {dateofbirth?.toString()}
          </Text>
        </TouchableOpacity>
      </View>


      {/* <LabeledDropdown
        label="Gender"
        setSelectedOption={setSelectedGender}
        options={['Male', 'Female', 'Transgender']}
        defaultValue={selectedGender}
        bottom
        isChange={setIsChanged}
        mandatory
      /> */}



      {isPanVerify ?
        <View
          style={{
            flexDirection: 'row',
            marginVertical: '5%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontFamily: APP_FONTS.SemiBold,
              fontSize: useFontNormalise(15),
              marginRight: 8,
              top: 3,
              fontWeight: '700',
              color: Colors.Black,
            }}>
            Pan Number Verified{'\t'}
          </Text>
          <Icon name="completed" />
        </View> :
        <Button
          text={'Verify'}
          active={PANnumber != ''}
          marginTop={20}
          // marginVertical={10}
          onPress={() => { VerifyPan.mutateAsync() }}
        />
      }

      {isChanged && <Button
        text={isChanged ? 'Save' : 'Next'}
        active={isViewOnly && !isChanged ? true : isActive && !hasError && isPanVerify}
        // marginVertical={10}
        marginTop={20}
        onPress={handleSubmit}
      />}

      {!isChanged && <Button
        text={isChanged ? 'Save' : 'Next'}
        active={isPanVerify}
        // {isViewOnly && !isChanged ? true : isActive && !hasError}
        // marginVertical={10}
        marginTop={20}
        onPress={handleSubmit}
      />}
      <View style={{ marginTop: 10, }}>
        <LoanSummaryButton onPress={() => navigation.replace('LoanSummary')} />

      </View>
    </WaveBackground>
  );
};
export default PANVerification;
