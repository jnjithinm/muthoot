import {ApiResponse, BaseModule} from '..';

export type GetAgreementDetailsResponse = {
  filepath: string;
} | null;


export type eSignRequest = {
  appId: string;
 
};
export type eSignResponse = {
  disbursedAmt: string;
  mainAppSignUrl: string;
  message: string;
  status: string;
  guarantorSignUrl: string;
  muthootSignUrl: string;
} | null;

export type LoanAgreementTypes = BaseModule & {
  GetAgreementDetails: (
    appid: string,
  ) => Promise<ApiResponse<GetAgreementDetailsResponse>>;
  
  eSign: (
    request: eSignRequest,
  ) => Promise<ApiResponse<eSignResponse>>;
 
};
