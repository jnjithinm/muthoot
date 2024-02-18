import axios, {AxiosInstance} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import BaseUrls from 'api/BaseUrls';

export const selectedBaseUrl = BaseUrls.MUTHOOT_UAT;

const api: AxiosInstance = axios.create({
  baseURL: selectedBaseUrl.BaseUrl,
  timeout: 5000,
});

api.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('token');
    //const {url} = config;

    if (token) {
      config.headers['authentication-token'] = token;
    }
    
    config.headers['Content-Type'] = 'application/json';
    if (config.method?.toUpperCase() === 'POST') {
      console.log(
        `API Request: ${config.method?.toUpperCase()} ${
          config.baseURL + '/' + config.url
        }`,
          config.data

      );
    } else {
      console.log(
        `API Request: ${config.method?.toUpperCase()} ${
          config.baseURL + '/' + config.url
        }`,
      );
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);
export default api;
