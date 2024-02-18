import api from 'api/Axios';
import  serviceUrls from 'api/EndPoints';
import {ApiResponse} from '..';
import {
  
  GetAadharBackOCRResponse,
  GetAadharDetailsRespose,
  GetAadharFrontOCRResponse,
  GetPANDetailsResponse,
  GetPANOCRResponse,
  OCRType,
  SaveAadharDetailsResponse,
  SavePANDetailsResponse,
  VerifyPanResponse
} from './types';

export const OCR: OCRType = {

  name: 'OCR',
  
  GetPANOCR: async (payload): Promise<ApiResponse<GetPANOCRResponse>> => {
    try {
      const response = await api.post(serviceUrls.GET_PAN_OCR, payload);
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

  GetAadharFrontOCR: async (payload): Promise<ApiResponse<GetAadharFrontOCRResponse>> => {
    try {
      const response = await api.post(serviceUrls.GET_AADHAR_OCR, payload);
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
  GetAadharBackOCR: async (payload): Promise<ApiResponse<GetAadharBackOCRResponse>> => {
    try {
      const response = await api.post(serviceUrls.GET_AADHAR_OCR, payload);
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
  SavePANDetails: async (payload): Promise<ApiResponse<SavePANDetailsResponse>> => {
    try {
      const response = await api.post(serviceUrls.SAVE_PAN_DETAILS, payload);

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

  SaveAadharDetails: async (payload): Promise<ApiResponse<SaveAadharDetailsResponse>> => {
    try {
      const response = await api.post(serviceUrls.SAVE_AADHAR_DETAILS, payload);

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
  GetAadharDetails: async (payload): Promise<ApiResponse<GetAadharDetailsRespose>> => {
    try {
      const response = await api.post(serviceUrls.GET_AADHAR_DETAILS, payload);
    //  console.log('API Success adadhaaar:', JSON.stringify(response.data));
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
  GetPANDetails: async (payload): Promise<ApiResponse<GetPANDetailsResponse>> => {
    try {
      const response = await api.post(serviceUrls.GET_PAN_DETAILS, payload);
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
  VerifyPan: async (payload): Promise<ApiResponse<VerifyPanResponse>> => {
    try {
      const response = await api.post(serviceUrls.VERIFY_PAN, payload);
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
};
