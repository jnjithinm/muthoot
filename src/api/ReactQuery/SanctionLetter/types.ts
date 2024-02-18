import {ApiResponse, BaseModule} from '..';

export type GenerateSanctionLetterResponse = {
  sanction_letter: string;
} | null;

export type SendOTPForSanctionLetterResponse = {

} | null;

export type GetSanctionLetterResponse = {
  unsigned_sanction_letter: string;
  sanction_letter: string;
  signed_sanction_letter?: string;
} | null;

export type VerifyOTPSanctionLetterRequest = {
  applicantId: string;

  otp: string;
  employeeId: string;
  otpmode:  'F' | 'R',
};
export type VerifyOTPSanctionLetterResponse = {
  sanction_letter: string;
} | null;

export type SanctionLetterTypes = BaseModule & {
  GenerateSanctionLetter: (
    appid: string,
  ) => Promise<ApiResponse<GenerateSanctionLetterResponse>>;
  SendOTPForSanctionLetter: (
    applicantId: string,
    employeeId: string,
    otpmode: 'F' | 'R',
  ) => Promise<ApiResponse<SendOTPForSanctionLetterResponse>>;
  VerifyOTPSanctionLetter: (
    request: VerifyOTPSanctionLetterRequest,
  ) => Promise<ApiResponse<VerifyOTPSanctionLetterResponse>>;
  GetSanctionLetter: (
    appid: string,
  ) => Promise<ApiResponse<GetSanctionLetterResponse>>;
};
