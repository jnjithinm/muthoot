import React, {FC, useCallback, useEffect, useState, useRef} from 'react';
import {TouchableOpacity, View, Image} from 'react-native';
import {RouteProp, useFocusEffect} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import * as Animatable from 'react-native-animatable';

import WaveBackground from 'components/WaveBackground';
import {useApplicantDetails} from 'context/useApplicantDetails';
import {RootStackParamList} from 'navigation/HomeStack';
import Icon from 'components/Icon';
import Colors from 'config/Colors';
import useSelectImage from 'hooks/useSelectImage';
import convertImageFileToBase64 from 'config/Functions/ConvertImageToBase64';
import CaptureImage from 'config/Functions/CaptureImage';
import useFontNormalise from 'hooks/useFontNormalise';
import Button from 'components/Button';
import {useSaveImage, useGetLead, useDelete} from 'api/ReactQuery/Lead';
import {SaveImageRequest} from 'api/ReactQuery/Lead/types';
import LoanSummaryButton from 'components/LoanSummaryButton';
import {usedViewStatus} from 'context/useViewStatus';

type PhotoVerificationNavigationProp = StackNavigationProp<
  RootStackParamList,
  'PhotoVerification'
>;
type PhotoVerificationRouteProp = RouteProp<
  RootStackParamList,
  'PhotoVerification'
>;

interface PhotoVerificationScreenProps {
  navigation: PhotoVerificationNavigationProp;
  route: PhotoVerificationRouteProp;
}

const PhotoVerification: FC<PhotoVerificationScreenProps> = ({
  navigation,
  route,
}) => {
  const {applicantId, isMainApplicant, guarantorId} =
    useApplicantDetails();
  const {useViewStatus} = usedViewStatus();
  const [selectedImageSelection, setSelectedImageSelection] = useState<
    'upload' | 'capture' | null
  >(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [imageBase64, setImageBase64] = useState<string>('');
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [isViewOnly, setIsViewOnly] = useState<boolean>(false);

  const SaveImageRequest: SaveImageRequest = {
    base64value: imageBase64,
    appId: isMainApplicant ? applicantId : guarantorId,
    applicantType: isMainApplicant ? 'mainApplicant' : 'guarantor',
  };
  const [SaveImage, {data: SaveImageData, isLoading: SaveImageIsLoading}] =
    useSaveImage(SaveImageRequest);

  const [Delete, {data: DeleteData, isLoading: DeleteIsLoading}] = useDelete(
    `appId=${
      isMainApplicant ? applicantId : guarantorId
    }&type=Profile&applicantType=${
      isMainApplicant ? 'mainApplicant' : 'guarantor'
    }`,
  );

  const ResetImage = () => {
    setImageUrl('');
    setImageBase64('');
    setSelectedImageSelection(null);
  };

  const handleOnPress = () => {
    const callback = (response: any, path: any, name: string) => {
      if (response) {
        setImageUrl(response[0]?.fileCopyUri);
        convertImageFileToBase64(response[0]?.fileCopyUri)
          .then(base64Data => {
            if (base64Data) {
              setIsSubmit(true);
              setImageBase64(base64Data);
            }
          })
          .catch(error => {
            console.error('Error converting image file to base64:', error);
          });
      }
      else{
        console.log("hhyuyuuuu");
        
      }
    };
    useSelectImage(
      callback,
      'onlypickimage',
      setSelectedImageSelection,
      ResetImage,
    );
  };

  useEffect(() => {
    if (SaveImageData) {
      SaveImageData.applicantId && navigation.navigate('AddressDetails');
    }
  }, [SaveImageData]);

  useEffect(() => {
    if (useViewStatus) {
      setIsViewOnly( useViewStatus?.isSubmitToCreditFreeze ? true : useViewStatus?.isFreeze ? true : false);
    }
  }, []);

  const handleCapture = async () => {
    try {
      const capturedImageUri = await CaptureImage();
      if (capturedImageUri) {
        setImageUrl(capturedImageUri);
        convertImageFileToBase64(capturedImageUri)
          .then(base64Data => {
            if (base64Data) {
              setIsSubmit(true);
              setImageBase64(base64Data);
            }
          })
          .catch(error => {
            console.error('Error converting image file to base64:', error);
          });
      }
    } catch (error) {
      setSelectedImageSelection(null);
      console.error('Error capturing image:', error);
    }
  };

  const ImageRef = useRef<View & {fadeIn: Function; fadeOut: Function}>(null);

  useEffect(() => {
    if (imageUrl !== '') {
      ImageRef.current?.fadeIn(1000);
    }
  }, [imageUrl]);

  // useEffect(() => {
  //   if (selectedImageSelection != null) {
  //     if (selectedImageSelection === 'capture') {
  //       handleCapture();
  //     } else {
  //       handleOnPress();
  //     }
  //   }
  // }, [selectedImageSelection]);

  const [GetLead, {data: GetLeadData, isLoading: GetLeadDataIsLoading}] =
    useGetLead(
      `${isMainApplicant ? applicantId : guarantorId}&applicantType=${
        isMainApplicant ? 'mainApplicant' : 'guarantor'
      }`,
    );

  useFocusEffect(
    useCallback(() => {
      if (applicantId) {
        GetLead.mutateAsync();
      }
    }, []),
  );

  useEffect(() => {
    if (GetLeadData) {
      setIsSubmit(false);
      setImageUrl(GetLeadData.userImagePath || '');
    }
  }, [GetLeadData]);

  return (
    <WaveBackground
      loading={[SaveImageIsLoading, GetLeadDataIsLoading, DeleteIsLoading]}
      title={'Photo Verification'}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '20%',
        }}>
        {imageUrl !== '' ? (
          <Animatable.View ref={ImageRef}>
            <View style={{width: '100%'}}>
              <Image
                source={{uri: imageUrl}}
                style={{
                  padding: useFontNormalise(100),
                  borderRadius: 150,
                  alignSelf: 'center',
                }}
              />

              <TouchableOpacity
                style={{
                  position: 'absolute',

                  backgroundColor: 'transparent',
                  alignSelf: 'flex-end',
                  paddingHorizontal: 1,
                  paddingVertical: 2,
                }}
                disabled={isViewOnly}
                onPress={() => {
                  setImageUrl('');
                  setSelectedImageSelection(null);
                  Delete.mutateAsync();
                }}>
                <Icon name="close-black" />
              </TouchableOpacity>
            </View>
          </Animatable.View>
        ) : (
          <Icon name="profile-picture" />
        )}
        {imageUrl === '' && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              width: '100%',
              marginVertical: '10%',
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
                setSelectedImageSelection('upload');
                handleOnPress();

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
              disabled={isViewOnly}
              onPress={() => {
                setSelectedImageSelection('capture');
                handleCapture();

              }}>
              <Icon name="capture" />
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={{marginTop: '7%'}}>
        <Button
          text={isSubmit ? 'Save' : 'Next'}
          active={imageUrl !== ''}
          marginVertical={10}
          marginTop={30}
          onPress={() => {
            isSubmit
              ? SaveImage.mutateAsync()
              : navigation.navigate('AddressDetails');
          }}
        />
         <LoanSummaryButton onPress={()=>navigation.replace('LoanSummary')} />
      </View>
    </WaveBackground>
  );
};
export default PhotoVerification;
