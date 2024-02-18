import api from 'api/Axios';
import serviceUrls from 'api/EndPoints';
import {ApiResponse} from '..';
import {
  GetLeadResponse,
  LeadType,
  SaveorUpdateLeadResponse,
  ViewLeadsResponse,
  SaveImageResponse,
  ViewProspectResponse,
  GetCustomerProfileResponse,
  GetPincodeResponse,
  GetSanctionLetterDetailsResponse,
  ViewStatusResponse,
  GetApplicantDetailsByAadharResponse,
  GetBranchesResponse,
} from './types';

export const Lead: LeadType = {
  name: 'Lead',

  SaveImage: async (payload): Promise<ApiResponse<SaveImageResponse>> => {
    try {
      const response = await api.post(serviceUrls.SAVE_IMAGE, payload);
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

  ViewLeads: async (
    employeeId,
    search,
  ): Promise<ApiResponse<ViewLeadsResponse>> => {
    try {
      const response = await api.get(
        serviceUrls.VIEW_LEADS + `empId=${employeeId}&search=${search}`,
      );
      //console.log('API Success:', JSON.stringify(response.data));
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
  ViewProspects: async (
    employeeId,
    search,
  ): Promise<ApiResponse<ViewProspectResponse>> => {
    try {
      const response = await api.get(
        serviceUrls.VIEW_PROSPECT + `empId=${employeeId}&search=${search}`,
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
  SaveorUpdateLead: async (
    payload,
  ): Promise<ApiResponse<SaveorUpdateLeadResponse>> => {
    try {
      const response = await api.post(serviceUrls.SAVE_OR_UPDATE_LEAD, payload);
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
  GetLead: async (id): Promise<ApiResponse<GetLeadResponse>> => {
    try {
      const response = await api.get(serviceUrls.GET_LEAD + id);
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
  GetCustomerProfile: async (id): Promise<
    ApiResponse<GetCustomerProfileResponse>
  > => {
    try {
      const response = await api.get(serviceUrls.GET_CUSTOMER_PROFILE + id);
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
  GetPincode: async (pincode): Promise<ApiResponse<GetPincodeResponse>> => {
    try {
      const response = await api.get(serviceUrls.GET_PINCODE + pincode);
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
  Delete: async (removeString): Promise<ApiResponse<GetPincodeResponse>> => {
    try {
      const response = await api.post(serviceUrls.REMOVE + removeString);
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
  GetSanctionLetterDetails: async (
    id,
  ): Promise<ApiResponse<GetSanctionLetterDetailsResponse>> => {
    try {
      const response = await api.get(
        serviceUrls.GET_SANCTION_LETTER_DETAILS + id,
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
  ViewStatus: async (id): Promise<ApiResponse<ViewStatusResponse>> => {
    try {
      const response = await api.post(serviceUrls.VIEW_STATUS + id);
      //    console.log('API Success:', JSON.stringify(response.data));
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
  GetApplicantDetailsByAadhar: async (
    payload,
  ): Promise<ApiResponse<GetApplicantDetailsByAadharResponse>> => {
    try {
      const response = await api.post(
        serviceUrls.GET_APPLICANT_DETAILS_BY_AADHAR,
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
  GetBranches: async (
    employeeId,
  ): Promise<ApiResponse<GetBranchesResponse>> => {
    try {
      const response = await api.get(
        serviceUrls.GET_BRANCHES + `?employeeId=${employeeId}`,
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
};
