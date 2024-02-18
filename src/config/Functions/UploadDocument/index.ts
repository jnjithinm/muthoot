import useSelectImage from 'hooks/useSelectImage';
import convertImageFileToBase64 from '../ConvertImageToBase64';
import {Dispatch, SetStateAction} from 'react';

type UploadDocumentTypes = {
  setUrl: Dispatch<SetStateAction<string>>;
  setBase64: Dispatch<SetStateAction<string>>;
  setDocType: Dispatch<SetStateAction<'pdf' | 'jpg' | null>>;
  imageOnly?: boolean;
};

const UploadDocument = ({
  setUrl,
  setBase64,
  setDocType,
  imageOnly,
}: UploadDocumentTypes) => {
  const callback = (response: any, path: any, name: string) => {
    if (response) {
      setUrl(response[0]?.fileCopyUri);
      if (String(response[0].type).includes('pdf')) {
        setDocType('pdf');
      } else {
        setDocType('jpg');
      }

      convertImageFileToBase64(response[0]?.fileCopyUri)
        .then(base64Data => {
          if (base64Data) {
            setBase64(base64Data);
          }
        })
        .catch(error => {
          setBase64('');
          setDocType(null);
          console.error('Error converting image file to base64:', error);
        });
    }
  };
  // console.log('imageeee', imageOnly);
  useSelectImage(
    callback,
    imageOnly ? 'onlypickimage' : 'allDocument',
    setNull,
  );
};
function setNull(value: SetStateAction<'upload' | 'capture' | null>): void {
  throw new Error('Function not implemented.');
}

export default UploadDocument;
