import api from 'api/Axios';
import serviceUrls from 'api/EndPoints';
import { ApiResponse } from '..';

import { DocumentType, GetDeferalDocumentResponse, UploadDocumentResponse } from './types';
export const Document: DocumentType = {
  name: 'Document',

  UploadDocument: async (payload): Promise<ApiResponse<UploadDocumentResponse>> => {
    try {
      console.log("paaaaaa", payload?.doctype == 'PAN');

      const response = await api.post(payload?.doctype == 'PAN' ? serviceUrls.UPLOAD_POST_DISBURSAL_PAN_OCR :
        payload?.doctype == 'Aadhaar' ? serviceUrls.UPLOAD_POST_DISBURSAL_AADHAR_OCR :
          serviceUrls.UPLOAD_DOCUMENTS, payload);
      console.log('MJJJJJ Success:', JSON.stringify(response.data, null, 4));
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
  DeleteDocument: async (payload): Promise<ApiResponse<UploadDocumentResponse>> => {
    try {
      const response = await api.post(serviceUrls.DELETE_DOCUMENT, payload);
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
  UploadDeferralDocument: async (payload): Promise<ApiResponse<UploadDocumentResponse>> => {
    try {
      const response = await api.post(serviceUrls.UPLOAD_DEFERAL_DOCUMENT, payload);
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
  GetDeferralDocuments: async (appId: string): Promise<ApiResponse<GetDeferalDocumentResponse>> => {
    try {
      const response = await api.get(serviceUrls.GET_DEFERAL_DOCUMENTS + appId);
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
  DeleteDeferralDocument: async (payload): Promise<ApiResponse<UploadDocumentResponse>> => {
    try {
      const response = await api.post(serviceUrls.DELETE_DEFERAL_DOCUMENT, payload);
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
