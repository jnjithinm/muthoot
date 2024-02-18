import DocumentPicker from 'react-native-document-picker';
import useShowFlashMessage from 'hooks/useShowFlashMessage';
import { Dispatch, SetStateAction } from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import Colors from 'config/Colors';

type SelectImageType = (
  callback: any,
  flow: string,
  setDeselected: Dispatch<SetStateAction<'upload' | 'capture' | null>>,
  ResetImage?: () => void,
) => Promise<void>;

const useSelectImage: SelectImageType = async (
  callback: any,
  flow: string,
  setDeselected: Dispatch<SetStateAction<'upload' | 'capture' | null>>,
  ResetImage,
) => {

  const bytesToMegaBytes = (bytesData: any) => {
    const sizeInMB = (bytesData ? bytesData / (1024 * 1024) : 0).toFixed(2);
    return sizeInMB;
  };

  const CreateZipFile = (results: any, frontPath: any) => {
    console.log("CreateZipFile", results);

    let imgname = results[0].name.split('.');

    return callback(results, imgname);
  };
  console.log("pdffffff", flow);

  try {
    const results = await DocumentPicker.pick({
      copyTo: 'documentDirectory',
      type: [
        flow === 'onlypickimage'
          ? DocumentPicker.types.images
          : flow === 'pdf' ?
            DocumentPicker.types.pdf
            : (DocumentPicker.types.pdf,
              DocumentPicker.types.images)
      ],
      allowMultiSelection: false,
    });
    const ImageSize: number = parseInt(bytesToMegaBytes(results[0]?.size));



    if (results[0]?.type?.split('/')?.pop() == 'pdf' && ImageSize >= 10) {

      useShowFlashMessage(
        'warning',
        `File size should be a maximum of 10 MB`, 1500
      );
      if (ResetImage) {
        ResetImage();
      }
    }
    else if (results[0]?.type?.split('/')?.pop() !== 'pdf' && ImageSize > 3) {
      console.log("ImageSize");
      useShowFlashMessage(
        'warning',
        `File size should be a maximum of 3 MB`,
        1500,
      );
      if (ResetImage) {
        ResetImage();
      }
    }
    else {
      if (flow === 'onlypickimage' || flow === 'allDocument' || flow === 'pdf') {

        if (results[0]?.type?.split('/')?.pop() == 'pdf') {
          CreateZipFile(results, results[0].fileCopyUri)
        }
        else {
          ImagePicker.openCropper({
            path: results[0].fileCopyUri || '',
            // width: 100,
            // height: 200,
            freeStyleCropEnabled: true,
            cropperStatusBarColor: Colors.Primary,
            cropperToolbarColor: Colors.Primary,
            cropperToolbarWidgetColor: Colors.White,
            cropperActiveWidgetColor: Colors.Primary,
            hideBottomControls: true,
            mediaType: 'photo'
          }).then(image => {

            console.log("iiiiiii", image);

            var temp = [image]
            image['fileCopyUri'] = image.path,
              image['type'] = results[0].type,
              image['name'] = results[0].name,

              CreateZipFile(temp, results[0].fileCopyUri);

          });
        }
      }
    }
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      setDeselected(null);
      console.log("kkkkkk", err);
    } else {
      throw err;
    }
  }
};
export default useSelectImage;
