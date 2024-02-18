import { ImagePickerResponse, launchCamera } from "react-native-image-picker";
import ImagePicker from 'react-native-image-crop-picker';
import Colors from 'config/Colors';

const CaptureImage = (): Promise<string | undefined> => {
  return new Promise((resolve, reject) => {
    // launchCamera(
    //   {
    //     mediaType: 'photo',
    //     includeBase64: false,
    //     saveToPhotos: true,
    //     cameraType:'back' 
    //   },
    //   (response: ImagePickerResponse) => {
    //     if (response.didCancel) {
    //       reject(undefined);
    //     } else if (response.errorCode) {
    //       reject(response.errorMessage);
    //     } else if (response.assets && response.assets.length > 0) {
    //       const capturedImageUri = response.assets[0].uri;
    //       resolve(capturedImageUri);
    //     } else {
    //       reject(undefined);
    //     }
    //   }
    // );
    ImagePicker.openCamera({
      // width: 300,
      // height: 400,
      cropping: true,
      cropperStatusBarColor: Colors.Primary,
      cropperToolbarColor: Colors.Primary,
      cropperToolbarWidgetColor: Colors.White,
      cropperActiveWidgetColor: Colors.Primary,
      hideBottomControls: true,
      freeStyleCropEnabled: true,

    }).then(image => {
      console.log(image.path);
      if (image) {
        resolve(image.path);
        // convertImageFileToBase64(image.path)
        //   .then(base64Data => {
        //     if (base64Data) {
        //       setImageBase64(base64Data);
        //     }
        //   })
        //   .catch(error => {
        //     console.error('Error converting image file to base64:', error);
        //   });
      }
    }).catch(e => {
      console.log("mjjjjjjj");
      
      console.log(e);
    })
  });
};


export default CaptureImage;