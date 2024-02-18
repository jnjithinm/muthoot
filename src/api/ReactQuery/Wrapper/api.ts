import api from 'api/Axios';
import serviceUrls from 'api/EndPoints';
import { ApiResponse } from '..';
import {
  RegisterRepaymentDetailsResponse,
  ValidateVpaResponse,
  CreateMandateVpaResponse,
  WrapperType,
} from './types';

export const Wrapper: WrapperType = {
  name: 'Wrapper',
  
  RegisterRepaymentDetails: async (
    payload,
  ): Promise<ApiResponse<RegisterRepaymentDetailsResponse>> => {
    try {
 
      const response = await api.get(`${serviceUrls.REGISTER_REPAYMENT_DETAILS}?emi=${payload.emi}&tenure=${payload.tenure}&emailId=${payload.emailId}&mobileNumber=${payload.mobileNumber}&applicantUniqueId=${payload.applicantUniqueId}&debitStartDate=${payload.debitStartDate}&accountHolderName=${payload.accountHolderName}&bankCode=${payload.bankCode}&ifsc=${payload.ifsc}&accountNumber=${payload.accountNumber}&aadharNo=${payload.aadharNo}&service=${payload.service}&authenticationMode=${payload.authenticationMode}`);
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


  ValidateVpa: async (
    payload,
  ): Promise<ApiResponse<ValidateVpaResponse>> => {
    try {
 
      const response = await api.post(serviceUrls.VALIDATE_VPA, payload);
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


  CreateMandateVpa: async (
    payload,
  ): Promise<ApiResponse<CreateMandateVpaResponse>> => {
    try {
  
      const response = await api.post(serviceUrls.CREATE_MANDATE_VPA, payload);
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


}