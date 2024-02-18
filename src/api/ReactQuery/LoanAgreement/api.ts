import api from 'api/Axios';
import serviceUrls from 'api/EndPoints';
import {ApiResponse} from '..';
import {
  LoanAgreementTypes,
  GetAgreementDetailsResponse,
  eSignRequest,
  eSignResponse
} from './types';

export const LoanAgreement: LoanAgreementTypes = {
  name: 'LoanAgreement',

  eSign: async (
    payload,
  ): Promise<ApiResponse<eSignResponse>> => {
    try {
      const response = await api.post(
        serviceUrls.ESIGN_LOAN_AGREEMENT,
        payload,
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

  GetAgreementDetails: async (
    appId,
  ): Promise<ApiResponse<GetAgreementDetailsResponse>> => {
    try {
      const response = await api.get(serviceUrls.GET_LOAN_AGREEMENT_DETAILS + appId);
      //  console.log('API Successjjjjjj:', JSON.stringify(response.data));
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
