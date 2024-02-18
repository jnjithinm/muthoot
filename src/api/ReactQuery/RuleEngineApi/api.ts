import api from 'api/Axios';
import serviceUrls from 'api/EndPoints';
import {ApiResponse} from '..';
import {
  GetBRE1StatusResponse,
  GetBRE2StatusResponse,
  GetBRE3StatusResponse,
  RuleEngineApiType,
} from './types';

export const RuleEngineApi: RuleEngineApiType = {
  name: 'RuleEngineApi',

  GetBRE1Status: async (
    applicantId,
    applicantType,
  ): Promise<ApiResponse<GetBRE1StatusResponse>> => {
    try {
      const response = await api.get(
        serviceUrls.GET_BRE1_STATUS +
          `applicantId=${applicantId}&applicantType=${applicantType}`,
      );
      //  console.log('API Success:', JSON.stringify(response.data));
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

  GetBRE2Status: async (
    applicantId,
    applicantType,
  ): Promise<ApiResponse<GetBRE2StatusResponse>> => {
    try {
      const response = await api.get(
        serviceUrls.GET_BRE2_STATUS +
          `applicantId=${applicantId}&applicantType=${applicantType}`,
      );
      console.log('API Success:', JSON.stringify(response.data));
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
  GetBRE3Status: async (payload
  ): Promise<ApiResponse<GetBRE3StatusResponse>> => {
    try {
      const response = await api.post( serviceUrls.GET_BRE3_STATUS , payload);
 
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
