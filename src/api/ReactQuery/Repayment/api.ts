import api from 'api/Axios';
import serviceUrls from 'api/EndPoints';

import { ApiResponse } from '..';
import {
    RepaymentType,
  SaveRepaymentDetailsResponse,
  GetApplicationDetailsResponse,
  GetRepaymentDetailsResponse,
  GetCamspayEnachResponse,
  getCashResponse,
  saveCashResponse,
  GetPhysicalNachResponse,
  UploadNachResponse,
  deleteNachResponse
} from './types';

export const Repayment: RepaymentType = {
  name: 'Repayment',
  SaveRepaymentDetails: async (
    payload,
  ): Promise<ApiResponse<SaveRepaymentDetailsResponse>> => {
    try {
      const response = await api.post(serviceUrls.SAVE_REPAYMENT_DETAILS, payload);
      // console.log('[API] Success:', JSON.stringify(response.data));
      return response.data;
    } catch (error) {
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

  SaveCashDetails: async (
    payload,
  ): Promise<ApiResponse<saveCashResponse>> => {
    try {
      const response = await api.post(serviceUrls.SAVE_CASH_DETAILS, payload);
      // console.log('[API] Success:', JSON.stringify(response.data));
      return response.data;
    } catch (error) {
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

  GetCashDetails: async (
    id,
  ): Promise<ApiResponse<getCashResponse>> => {
    try {
      const response = await api.get(`${serviceUrls.GET_CASH_DETAILS}/${id}`);

      // console.log('[API] Success:', JSON.stringify(response.data));
      
      return response.data;
    } catch (error) {
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

  GetApplicationDetails: async (
    payload,
  ): Promise<ApiResponse<GetApplicationDetailsResponse>> => {
    try {

      const response = await api.get(`${serviceUrls.GET_APPLICATION_DETAILS}?applicantUniqueId=${payload.applicantUniqueId}`);
      // console.log('[API] Success:', JSON.stringify(response.data));
      
      return response.data;
    } catch (error) {
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
  GetRepaymentDetails: async (
    id,
  ): Promise<ApiResponse<GetRepaymentDetailsResponse>> => {
    try {
      const response = await api.get(serviceUrls.GET_REPAYMENT_DETAILS + id);
      // console.log('[API] Success:', JSON.stringify(response.data));
      
      return response.data;
    } catch (error) {
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
  GetCamspayEnachResponse: async (
    payload,
  ): Promise<ApiResponse<GetCamspayEnachResponse>> => {
    try {
      const response = await api.post(serviceUrls.GET_CAMSPAY_ENACH_RESPONSE,payload);
      // console.log('[API] Success:', JSON.stringify(response.data));
      return response.data;
    } catch (error) {
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
  GetPhysicalNach: async (
    payload,
  ): Promise<ApiResponse<GetPhysicalNachResponse>> => {
    try {
      const response = await api.post(serviceUrls.GET_PHYSICAL_NACH, payload);
      // console.log('[API] Success:', JSON.stringify(response.data));
      return response.data;
    } catch (error) {
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
  
  UploadNach: async (payload): Promise<ApiResponse<UploadNachResponse>> => {
    try {
      const response = await api.post(serviceUrls.UPLOAD_PHYSICAL_NACH, payload);
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

  DeleteNach: async (payload): Promise<ApiResponse<deleteNachResponse>> => {
    try {
      const response = await api.post(serviceUrls.DELETE_PHYSICAL_NACH, payload);
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
}