import { ApiResponse, BaseModule, applicantType } from '..';

export type GetBRE1StatusResponse = {
  bre1status: 'Bre1_Approved' | 'Bre1_Manual' | 'Bre1_Rejected';
  isGuarantorMandatory: boolean;
  message?: string;
  popup?: boolean;
  isSherlockRun: boolean
} | null;

export type GetBRE2StatusResponse = {
  bre2status: 'Bre2_Approved' | 'Bre2_Rejected' | 'Bre2_Manual';
  isGuarantorMandatory: boolean;
  message?: string;
  popup?: boolean;
} | null;

export type GetBRE3StatusResponse = {
  bre3status: 'Bre3_Approved' | 'Bre3_Rejected' | 'Bre3_Manual';
  isGuarantorMandatory: boolean;
  message?: string;
  popup?: boolean;
} | null;

export type GetBRE3StatusRequest = {
  guarantorId?: string | null,
  appId: string

};
export type RuleEngineApiType = BaseModule & {
  GetBRE1Status: (
    applicantId: string,
    applicantType: applicantType,
  ) => Promise<ApiResponse<GetBRE1StatusResponse>>;
  GetBRE2Status: (
    applicantId: string,
    applicantType: applicantType,
  ) => Promise<ApiResponse<GetBRE2StatusResponse>>;

  GetBRE3Status: (
    request: GetBRE3StatusRequest,
  ) => Promise<ApiResponse<GetBRE3StatusResponse>>;
};
