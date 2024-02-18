import {ApiResponse, BaseModule} from '..';

export type SaveOVDDetailsRequest={
  base64:string;
  ovdBackFilepath: string;
  appId: string;
  documentNumber: string;
  documentDob: string;
  documentType: string;
  applicantType:'mainApplicant'|'guarantor';
}

export type GetOVDDetailsResponse={
  appId: string;
  documentType: string;
  documentNumber: string;
  documentName: string;
  documentDob: string;
  documentPincode: string;
  documentFilePath: string;
  documentFilePathBack: string;
  documentGender: string;
  documentVerifiedStatus: string;
  apiStatus: boolean;
  passportNumber: string;
  applicantType:'mainApplicant'|'guarantor';
}| null;

export type SaveOVDDetailsResponse = {} | null;

export type GetOVDDetailsRequest = {
  applicationId: string;
};

export type SaveManualOVDDetailsRequest = {
  appId: string;
  documentType: string;
  documentNumber: string;
  documentName: string;
  documentDob: string;
  documentPincode: string;
  passportNumber: string;
  documentGender: string;
  applicantType:'mainApplicant'|'guarantor';
  isVerified: boolean;
};

export type SaveManualOVDDetailsResponse = {
  appId: string;
  documentType: string;
  documentNumber: string;
  documentName: string;
  documentDob: string;
  documentPincode: string;
  passportNumber: string;
  documentGender: string;
}|null;

export type OVDType = BaseModule & {
  SaveOVDDetails: (
    request: SaveOVDDetailsRequest,
  ) => Promise<ApiResponse<SaveOVDDetailsResponse>>;
  GetOVDDetails: (
    id: string,
  ) => Promise<ApiResponse<GetOVDDetailsResponse>>;
  SaveManualOVDDetails: (
    request: SaveManualOVDDetailsRequest,
  ) => Promise<ApiResponse<SaveManualOVDDetailsResponse>>;
};
