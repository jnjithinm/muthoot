import useShowFlashMessage from 'hooks/useShowFlashMessage';
import RNFetchBlob from 'rn-fetch-blob';

const DownloadFile = async (url: string, fileName: string) => {
  console.log("uuuuujjj",url);
  
  const { config, fs } = RNFetchBlob;
  let PictureDir = fs.dirs.PictureDir;
  const timestamp = new Date().getTime();
  const uniqueFileName = `${fileName}_${timestamp}`;
  let options = {
    fileCache: true,
    addAndroidDownloads: {
      useDownloadManager: true,
      mime: 'application/pdf',
      notification: true,
      path:
        PictureDir +
        '/' + uniqueFileName + '.pdf',
      description: 'File downloaded',
    },
  };
  config(options)
    .fetch('GET', url)
    .then(res => {
console.log("reeeee",res);

      useShowFlashMessage('success', 'File downloaded successfully.');
    });
        
  }

export default DownloadFile;
