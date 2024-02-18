import {ApiResponse, BaseModule, applicantType} from '..';

export type GetPANOCRRequest = {
  base64value: string;
  doctype: 'pan';
  appId: string;
  imageType?:'jpg'|'png';
  applicantType?: string;

};

export type GetPANOCRResponse = {
  panName: string;
  dateOfbirth: string;
  fatherName: string;
  panNo: string;
  imageType:'jpg'|'png';
  applicantType?: string;
} | null;

export type GetAadharFrontOCRRequest = {
  base64value: string;
  doctype: 'addhar front';
  appId: string;
  imageType:'jpg'|'png';
  applicantType?: string;

};

export type GetAadharBackOCRRequest = {
  base64value: string;
  doctype: 'addhar back';
  imageType:'jpg'|'png';
  appId: string;
  applicantType?: string;

};

export type GetAadharFrontOCRResponse = {
  filePath: string;
  addharNo: string;
  gender: string;
  dateOfBirth: string;
  addharName: string;
  addresdetails: object;
  applicantType?: string;

} | null;

export type GetAadharBackOCRResponse = {
  filePath: string;
  addharNo: string;
  addresdetails: {
    careOf: string;
    pin: string;
    city: string;
    district: string;
    locality: string;
    state: string;
    line2: string;
    line1: string;
    applicantType?: string;

  };
} | null;

export type SavePANDetailsRequest = {
  appId: string;
  documentType: 'Pan';
  documentNumber: string;
  documentName: string;
  documentDob: string;
  verifyBy: 'OCR'|'OTP' | 'CKYC';
  documentDataSource?: 'OCR'|'OTP' | 'CKYC' | '';
  panVerifiedStatus: 'false' | 'true';
  applicantType?: string;

};

export type SavePANDetailsResponse = {} | null;

export type SaveAadharDetailsRequest = {
  appId: string;
  verifyBy: 'OCR'|'OTP'| 'CKYC';
  aadhaarNumber: string;
  aadhaarName: string;
  aadhaarGender: string;
  landmark: string;
  aadhaarPincode: string;
  district: string;
  city: string;
  state: string;
  aadharPostOffice: string;
  aadhaarDob: string;
  aadhaarAddressLine1: string;
  aadhaarAddressLine2: string;
  applicantType?: string;

};

export type SaveAadharDetailsResponse = {} | null;

export type GetPANDetailsRequest = {
  applicationId: string;
  type?: string;
  
};

export type GetPANDetailsResponse = {
  id: number;
  appId: string;
  updtDt: string;
  documentType: 'Pan';
  verifyBy: 'OCR' | 'OTP';
  verifyDate: string;
  documentGender: string;
  documentFilePath: string;
  documentPincode: string;
  documentRequest: string;
  documentAddress: 'OCR' | 'OTP';
  documentNumber: string;
  documentVerifiedStatus: boolean;
  documentDob: string;
  documentName: string;
  applicantType?: string;
  documentDataSource: string;
  isPanVerified: boolean;
} | null;

export type GetAadharDetailsRequest = {
  applicationId: string;
  type: applicantType;
};

export type GetAadharDetailsRespose = {
  id: number;
  appId: String;
  updtDt: string;
  documentType: string;
  verifyBy: string;
  verifyDate: string;
  aadhaarNumber: string;
  aadhaarName: string;
  aadhaarDob: string;
  aadhaarAddressLine1: string;
  aadharPostOffice: string;
  aadhaarAddressLine2: string;
  landmark: string;
  district: string;
  city: string;
  state: string;
  aadhaarPincode: string;
  aadhaarVerifiedStatus: 'failed' | 'success' | 'true' | 'false' | true | false;
  aadhaarFilePath:string;
  aadhaarDataSource: string;
  aadhaarOcrFrontFilePath: string;
  aadhaarOcrBackFilePath: string;
  applicantType?: string;

} | null;

export type VerifyPanRequest = {
  applicationId: string;
  type: applicantType;
  panNumber: string;
};

interface Address {
  buildingName: string;
  country: string;
  streetName: string;
  city: string;
  pinCode: string;
  locality: string;
  state: string;
}

interface Result {
  firstName: string;
  lastName: string;
  profileMatch: any[]; // You may want to replace 'any' with a more specific type
  aadhaarMatch: null | any; // You may want to replace 'any' with a more specific type
  address: Address;
  gender: string;
  aadhaarLinked: boolean;
  dob: string;
  name: string;
  middleName: string;
  pan: string;
}

export type VerifyPanResponse = {
  result: Result;
  requestId: string;
  fullAddress: string;
  statusCode: number;

} | null;
export type OCRType = BaseModule & {
  GetPANOCR: (
    request: GetPANOCRRequest,
  ) => Promise<ApiResponse<GetPANOCRResponse>>;
  GetAadharFrontOCR: (
    request: GetAadharFrontOCRRequest,
  ) => Promise<ApiResponse<GetAadharFrontOCRResponse>>;
  GetAadharBackOCR: (
    request: GetAadharBackOCRRequest,
  ) => Promise<ApiResponse<GetAadharBackOCRResponse>>;
  SavePANDetails: (
    request: SavePANDetailsRequest,
  ) => Promise<ApiResponse<SavePANDetailsResponse>>;
  SaveAadharDetails: (
    request: SaveAadharDetailsRequest,
  ) => Promise<ApiResponse<SaveAadharDetailsResponse>>;
  GetPANDetails: (
    request: GetPANDetailsRequest,
  ) => Promise<ApiResponse<GetPANDetailsResponse>>;
  GetAadharDetails: (
    request: GetAadharDetailsRequest,
  ) => Promise<ApiResponse<GetAadharDetailsRespose>>;
  VerifyPan: (
    request: VerifyPanRequest,
  ) => Promise<ApiResponse<VerifyPanResponse>>;
};
