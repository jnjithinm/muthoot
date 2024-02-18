import api from 'api/Axios';
import serviceUrls from 'api/EndPoints';

import {ApiResponse} from '..';
import {AuthType, LoginResponse, VersionCheckResponse} from './types';

export const Auth: AuthType = {
  name: 'Auth',
  VersionCheck: async (payload): Promise<ApiResponse<VersionCheckResponse>> => {
    try {
      const response = await api.post(serviceUrls.VERSION_CHECK, payload);
      console.log('[API] Success:', JSON.stringify(response.data));
      return response.data;
    } catch (error: unknown) {
      
      const errorMessage =
        (error as any)?.response?.data?.message  || (error as Error).message;
        console.log("mjjjjjjjeeee",(error as any)?.response?.data);

      return {
        data: (error as any)?.response?.data?.data,
        message: errorMessage,
        afxToken: null,
        status: (error as any)?.response?.status || 500,
        error: true,
      };
    }
  },
  Login: async (payload): Promise<ApiResponse<LoginResponse>> => {
    try {
      const response = await api.post(serviceUrls.LOGIN, payload);
      // console.log('API Success:', JSON.stringify(response.data));
      return response.data;
    } catch (error: unknown) {
      const errorMessage =
        (error as any)?.response?.data?.message || (error as Error).message;
      return {
        data: null,
        message: errorMessage,
        afxToken: null,
        status: (error as any)?.response?.status || 500,
        error: true,
      };
    }
  },
};
