import {ApiResponse, BaseModule} from '..';

export type VerifyBankAccountRequest = {
  applicantId: string;
  ifsc: string;
  accountNumber: string;
  applicantType: string;
  guarantorId: string;
} | null;

export type VerifyBankAccountResponse = {
  appId: string;
  accountHolderName: string;
  bankName: string;
  ifscCode: string;
  isValid: boolean;
  bankRRN: string;
  accountNumber: string;
  nameMatch: 'Y' | 'N';
  applicantType: string;
  guarantorId: string;
} | null;

export type GetBankAccountDetailsRequest = {
  appId: string;
} | null;

export type GetBankAccountDetailsResponse = {
  appId: string;
  accountHolderName: string;
  bankName: string;
  ifscCode: string;
  isValid: boolean;
  nameMatch: 'Y' | 'N';
  accountNumber: string;
  applicantType: string;
  guarantorId: string;
} | null;

export type PennyDropTypes = BaseModule & {
  VerifyBankAccount: (
    request: VerifyBankAccountRequest,
  ) => Promise<ApiResponse<VerifyBankAccountResponse>>;
  GetBankAccountDetails: (
    request: GetBankAccountDetailsRequest,
  ) => Promise<ApiResponse<GetBankAccountDetailsResponse>>;
};
