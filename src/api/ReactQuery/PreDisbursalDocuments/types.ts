import { ApiResponse, BaseModule, applicantType } from '..';

export type docTypes =
  | 'Down Payment Receipt'
  | 'Proforma Invoice'
  | 'Insurance Copy'
  | 'KLI Form'
  | 'RC Book'
  | 'RTO Tax Receipt';

export interface PostDto {
  documentType: docTypes;
  isMandatory: 'Y' | 'N';
  section: string;
  filePath?: string;
  fileType?: 'jpg' | 'pdf';
  filePath2?: string;

}
type PostVehicleDetails = {
  appId: string;
  applicantType: string;
  id: number;
  vehicleChasisNumber: string;
  vehicleEngineNumber: string;
  vehicleRegistrationNumber: string;
};

export type UploadDocumentRequest = {
  base64: string;
  appId: string;
  documentType: docTypes | null;
  applicantType: applicantType;
  type: 'jpg' | 'pdf' | null;
} | null;

export type DeleteDocumentRequest = {
  appId: string;
  documentType: docTypes | null;
  applicantType: applicantType;
  isMandatory?: 'Y' | 'N';
} | '';

export type UploadDocumentResponse = {
  applicantId: string;
} | null | '';

export type GetPostDocumentsDetailResponse = {
  list_of_documents: PostDto[];
  post_vehicle_details: PostVehicleDetails;
  isMandatoryFileUploaded: boolean;
} | null;

export type SaveVehicleCollateralInfoRequest = {
  vehicleRegistrationNumber: string;
  vehicleEngineNumber: string;
  vehicleChasisNumber: string;
  applicantType: string;
  appId: string;

};

export type SaveVehicleCollateralInfoResponse = {
  vehicleRegistrationNumber: string;
  vehicleEngineNumber: string;
  applicantType: string;
  appId: string;
  id: number;
  vehicleChasisNumber: string;
} | null;
export type PostDocumentType = BaseModule & {
  UploadDocument: (
    request: UploadDocumentRequest,
  ) => Promise<ApiResponse<UploadDocumentResponse>>;
  DeleteDocument: (
    request: DeleteDocumentRequest,
  ) => Promise<ApiResponse<UploadDocumentResponse>>;
  GetPostDocumentsDetail: (
    appId: string,
    applicantType: applicantType
  ) => Promise<ApiResponse<GetPostDocumentsDetailResponse>>;
  SaveVehicleCollateralInfo: (
    request: SaveVehicleCollateralInfoRequest,
  ) => Promise<ApiResponse<SaveVehicleCollateralInfoResponse>>;
  
};
