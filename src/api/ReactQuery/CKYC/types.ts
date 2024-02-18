import {ApiResponse, BaseModule} from '..';




export type GetCKYCStatusRequest = {
  appId: string;
  ckycNumber?: number;
  type?: string;
  employeeId: string;
  applicantType: string;
} | null;

export type GetCKYCStatusResponse =
  | {
    isotpSuccess: boolean;
    panStatus: boolean;
    adharStatus: boolean;
    ovdStatus: boolean;
    isPanAvailable: boolean;
    message: null;
    }
  | null
;





export type CKYCType = BaseModule & {
  
  GetCKYCStatus: (
    request: GetCKYCStatusRequest,
  ) => Promise<ApiResponse<GetCKYCStatusResponse>>;
  
};