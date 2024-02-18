import {ApiResponse, BaseModule} from '..';

export type GetExistingAadharDetailsRequest = {
  aadhaarNo: string;
  appId: string;
  applicantType?: string;
};

export type GetExistingAadharDetailsResponse = {
  aadhaarNo: string;
  aadhaarName: string;
  aadhaarDob: string;
  aadhaarGender: string;
  aadhaarFilePath: string;
  aadhaarPincode: string;
  aadhaarAddressLine2: string;
  aadhaarAddressLine1: string;
  state: string;
  city: string;
  district: string;
  landmark: string;
  aadhaarOcrFrontFilePath: string;
  aadhaarOcrBackFilePath: string;
  aadhaarDataSource: string;
  verifyBy: string;
  apiStatus: string;
  aadhaarVerifiedStatus: string;
  applicantType?: string;
  isAadhaarAlreadyExists:boolean;
} | null;

export type GetAadharOTPRequest = {
  appId: string;
  aadhaarNo: string;
  applicantType?: string;

};

export type GetAadharOTPResponse = {
  requestId: string;
  aadharNo: string;
  message: string;
  applicantType?: string;
} | null;

export type GetAadharDetailsByOTPRequest = {
  appId: string;
  aadhaarNo: string;
  otp: string;
  requestId: string;
  applicantType?: string
};

export type GetAadharDetailsByOTPResponse = {
  aadhaarNo: string;
  aadhaarName: string;
  aadhaarDob: string;
  aadhaarGender: string;
  aadhaarFilePath: string;
  aadhaarPincode: string;
  aadhaarAddressLine2: string;
  aadhaarAddressLine1: string;
  state: string;
  city: string;
  district: string;
  landmark: string;
  aadhaarOcrFrontFilePath: string;
  aadhaarOcrBackFilePath: string;
  aadhaarDataSource: string;
  verifyBy: string;
  apiStatus: string;
  aadhaarVerifiedStatus: string;
  applicantType?: string;

} | null;

export type AadharApiType = BaseModule & {
  GetExistingAadharDetails: (
    request: GetExistingAadharDetailsRequest,
  ) => Promise<ApiResponse<GetExistingAadharDetailsResponse>>;
  GetAadharOTP: (
    request: GetAadharOTPRequest,
  ) => Promise<ApiResponse<GetAadharOTPResponse>>;
  GetAadharDetailsByOTP: (
    request: GetAadharDetailsByOTPRequest,
  ) => Promise<ApiResponse<GetAadharDetailsByOTPResponse>>;
};
