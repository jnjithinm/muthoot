type UrlTypes = {
  BaseUrl: string;
  Url: string
};

type BaseUrlsType = {
  UAT: UrlTypes;
  SIT: UrlTypes;
  MUTHOOT_UAT: UrlTypes;
  MUTHOOT_PROD: UrlTypes;
};

const SIT: UrlTypes = {
  BaseUrl: 'http://13.126.17.80:9061',
  Url: 'http://13.126.17.80',
};

const UAT: UrlTypes = {
  BaseUrl: 'http://15.206.141.156:9061',
  Url: 'http://15.206.141.156',
};


const MUTHOOT_UAT: UrlTypes = {
  BaseUrl: 'http://146.56.55.170:9061',
  Url: 'http://146.56.55.170:7070',
};

const MUTHOOT_PROD: UrlTypes = {
  BaseUrl: 'https://api-rise.muthootcap.com:9061',
  Url: 'https://api-rise.muthootcap.com:7070',
};

const BaseUrls: BaseUrlsType = {
  UAT,
  SIT,
  MUTHOOT_UAT,
  MUTHOOT_PROD
};

export default BaseUrls;
