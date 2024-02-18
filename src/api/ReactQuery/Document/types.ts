import { ApiResponse, BaseModule, applicantType } from '..';

export type docTypes =
  | 'PAN'
  | 'Invoice Insurance'
  | 'Dual DOB Declaration'
  | 'OHF PROOF'
  | 'Salary Slip'
  | 'Aadhaar'
  | 'PAN'
  | 'OVD'
  | 'Bank Statement'
  | 'ITR'
  | 'Pension Proof'
  | 'Salary Certificate'
  | 'Profile Image'
  | 'Ownership By'
  | 'Profile Image'
  | 'AA'
  | 'Form 60'
  | 'PHYSICAL NACH'
  | 'Aadhaar'
  | 'OCR'
  | 'Land Tax Receipt'
  | 'Building Tax Receipt'
  | 'Latest Electricity Bill within 3 months'
  | 'Latest Water Bill within 3 months'
  | "PLI Document"
  | "CLI Document"
  | 'House Tax Receipt';

export type DeferralDocumentTypes = 'Invoice' | 'Insurance' | 'ENach' | 'PDC' | 'Proforma Invoice' | "IDV Deferal" | 'IP';
export type PSDDocumentTypes = 'Invoice' | 'Insurance' | 'Proforma Invoice' | 'IP';

export type UploadDocumentRequest = {
  base64value: string;
  appId: string;
  doctype: docTypes | null;
  applicantType: applicantType;
  type: 'jpg' | 'pdf' | null;
  isMandatory: 'Y' | 'N';
} | null;

export type DeleteDocumentRequest = {
  appId: string;
  doctype: docTypes | null;
  applicantType: applicantType;
  isMandatory: 'Y' | 'N';
};

export type UploadDocumentResponse = {
  applicantId: string;
  detailsCheck?: boolean;
  detailsCheckMessage?: string;
} | null;

export type UploadDeferralDocumentRequest = {
  appId: string;
  applicantType: applicantType;
  type: 'jpg' | 'pdf' | null;
  documentType: DeferralDocumentTypes | null;
  base64: string;
  uploadFrom: string;
};

export type DeferralDocument = {
  id: number;
  documentType: DeferralDocumentTypes;
  documentFilePath: string;
  mandatory?: boolean;
  type: 'jpg' | 'pdf' | null
}

export type GetDeferalDocumentResponse = {
  documentDtsDtoList: DeferralDocument[],
  isDisbursement?: boolean
} | null;

export type DeleteDeferralDocumentRequest = {
  appId: string;
  documentType: DeferralDocumentTypes | null;
  applicantType: applicantType;

};

export type DocumentType = BaseModule & {
  UploadDocument: (
    request: UploadDocumentRequest,
  ) => Promise<ApiResponse<UploadDocumentResponse>>;
  DeleteDocument: (
    request: DeleteDocumentRequest,
  ) => Promise<ApiResponse<UploadDocumentResponse>>;
  UploadDeferralDocument: (
    request: UploadDeferralDocumentRequest,
  ) => Promise<ApiResponse<UploadDocumentResponse>>;
  GetDeferralDocuments: (
    appId: string,
  ) => Promise<ApiResponse<GetDeferalDocumentResponse>>;
  DeleteDeferralDocument: (
    request: DeleteDeferralDocumentRequest,
  ) => Promise<ApiResponse<UploadDocumentResponse>>;
};
