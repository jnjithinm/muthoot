import {ApiResponse, BaseModule} from '..';

export type AARequest={
  appId: string;
  applicantType: string;

}

export type AAResponse={
  appId: string;
  webRedirectionUrl: any;
  status: string;
  success: boolean
} | null;


export type AAType = BaseModule & {
 
  GetAccountAggregator: (
    request: AARequest,
  ) => Promise<ApiResponse<AAResponse>>;
 
};
