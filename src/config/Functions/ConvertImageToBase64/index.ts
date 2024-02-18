import RNFS from 'react-native-fs';


const convertImageFileToBase64 = async (filePath: string) => {
  try {
    const imageFileData = await RNFS.readFile(filePath, 'base64');
    return imageFileData;
  } catch (error) {
    console.error('Error converting image file to base64:', error);
    return null;
  }
};

export default convertImageFileToBase64;