import { ApiResponse, BaseModule } from '..';

interface RegisterRepaymentData {
    nameMatched: boolean;
    enachResponseUrl: string;
  }

  interface ValidateVpaData {
    nameMatched: boolean,
    payerName: string,
    payerVpa: string,
    accountHolderName: string,
    status: string
  }
  
  
  interface CreateMandateVpaData {
    nameMatched: boolean,
    message: string,
    desc: string,
    status: string
  
  }
export type RegisterRepaymentDetailsRequest = {
    emi: string | undefined,
    tenure: string | undefined,
    emailId: string | undefined,
    mobileNumber: string | undefined,
    applicantUniqueId: string | undefined
    debitStartDate: string | undefined,
    accountHolderName: string | undefined,
    bankCode: string | undefined,
    ifsc: string | undefined,
    accountNumber: string | undefined,
    aadharNo: string | undefined,
    service: string | undefined,
    authenticationMode: 'A' | 'D' | 'N' | 'V' | 'C' | undefined
  
  };
  export type RegisterRepaymentDetailsResponse = {
    data: RegisterRepaymentData,
    error: boolean,
    message: string,
    statusCode: string
  } | null;

  export type ValidateVpaRequest = {
    vpa: string,
    applicantUniqueId: string,
    service: string,
    accountHolderName: string
  };
  
  
  export type ValidateVpaResponse = {
    data: ValidateVpaData,
    error: boolean,
    message: string,
    statusCode: string
  } | null;
  
  export type CreateMandateVpaRequest = {
    applicantUniqueId: string,
    emi: string,
    payerName: string,
    payerVpa: string,
    authenticationMode: string,
    debitStartDate: string,
    service: string
  
  };
  export type CreateMandateVpaResponse = {
    data: CreateMandateVpaData,
    error: boolean,
    message: string,
    statusCode: string
  } | null;
export type WrapperType = BaseModule & {
    RegisterRepaymentDetails: (
        request: RegisterRepaymentDetailsRequest,
      ) => Promise<ApiResponse<RegisterRepaymentDetailsResponse>>;
      ValidateVpa: (
        request: ValidateVpaRequest,
      ) => Promise<ApiResponse<ValidateVpaResponse>>;
      CreateMandateVpa: (
        request: CreateMandateVpaRequest,
      ) => Promise<ApiResponse<CreateMandateVpaResponse>>;
}