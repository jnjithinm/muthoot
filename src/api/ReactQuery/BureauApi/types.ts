import {ApiResponse, BaseModule, applicantType} from '..';

export type GetCriffRequest = {
  applicant_uniqueid: string;
  applicantType: applicantType;
} | null;

export type GetCriffResponse = {
  applicantId: string;
  bureauScore: string;
  criffReportPath: string;
  applicantName: string;
  docNumber: string;
  applicantType: string;
  bureauPull: boolean;
  criffCreatedDate: string;
} | null;

export type GetSherlockRequest = {
  applicantId: string;
  applicantType: applicantType;
} | null;

export type GetSherlockResponse = {
  sherlockStatus: 'APPROVED' | 'IN_PROCESS' |'REFER'| 'REJECT';
  sherlockReportPath: string;
  sherlockScore: string;
  applicantId: string;
}|null;

export type BureauType = BaseModule & {
  GetCriff: (
    request: GetCriffRequest,
  ) => Promise<ApiResponse<GetCriffResponse>>;
  GetSherlockResponse: (
    request: GetSherlockRequest
  ) => Promise<ApiResponse<GetSherlockResponse>>;
};
