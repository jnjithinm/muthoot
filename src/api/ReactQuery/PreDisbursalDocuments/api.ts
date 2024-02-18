import api from 'api/Axios';
import serviceUrls from 'api/EndPoints';
import {ApiResponse} from '..';

import { PostDocumentType, UploadDocumentResponse , SaveVehicleCollateralInfoResponse, GetPostDocumentsDetailResponse} from './types';
export const Document: PostDocumentType = {
  name: 'Document',

  UploadDocument: async (payload): Promise<ApiResponse<UploadDocumentResponse>> => {
    try {
      const response = await api.post(serviceUrls.UPLOAD_POST_DISBURSAL_DOCUMENTS, payload);
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
  DeleteDocument: async (payload): Promise<ApiResponse<UploadDocumentResponse>> => {
    try {
      const response = await api.post(serviceUrls.DELETE_POST_DISBURSAL_DOCUMENT, payload);
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
  GetPostDocumentsDetail: async (
    applicantId,
    applicantType,
  ): Promise<ApiResponse<GetPostDocumentsDetailResponse>> => {
    try {
      const response = await api.get(
        `${serviceUrls.GET_POST_DOCUMENT_DETAIL}?appId=${applicantId}&applicantType=${applicantType}` ,
      );
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
  SaveVehicleCollateralInfo: async (
    payload,
  ): Promise<ApiResponse<SaveVehicleCollateralInfoResponse>> => {
    try {
      const response = await api.post(serviceUrls.SAVE_VEHICLE_COLLATERAL_INFO, payload);
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
};
