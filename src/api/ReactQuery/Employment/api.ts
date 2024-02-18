import api from 'api/Axios';
import serviceUrls from 'api/EndPoints';
import {ApiResponse, applicantType} from '..';
import {AddEmploymentDetailsResponse, CreditToSubmitResponse, EmploymentType, GetEmploymentDetaisResponse, } from './types';

export const Employment: EmploymentType = {
  name: 'Employment',

  AddEmploymentDetails: async (payload): Promise<ApiResponse<AddEmploymentDetailsResponse>> => {
    try {
      const response = await api.post(serviceUrls.SAVE_EMPLOYMENT_DETAILS,payload);
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
  GetEmploymentDetails: async (appId:string,applicantType:applicantType): Promise<ApiResponse<GetEmploymentDetaisResponse>> => {
    try {
      const response = await api.get(serviceUrls.GET_EMPLOYMENT_DETAILS+appId+'/'+applicantType);
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
  GetCreditToSubmitDetails: async (id:string): Promise<ApiResponse<CreditToSubmitResponse>> => {
    try {
      const response = await api.get(serviceUrls.GET_CREDI_TO_SUBMIT_DETAILS+id);
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
