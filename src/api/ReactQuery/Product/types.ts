import { ApiResponse, BaseModule } from '../PennyDrop/..';

export type addProductRequest = {
  appId: string;
  productType: string;
  documentType: string;
  applicantIncomeType: string;
  applicantType?: string;
  assetRelation: string;
}

export type addProductResponse = {
  appId: string;
  productType: string;
  documentType: string;
  applicantIncomeType: string;
  applicantType?: string;
  assetRelation: string;
} | null;


type IPType = {
  id: number;
  ipType: string;
  applicantType?: string;
};
export type getIPMasterResponse = IPType[] | null;

type assetType = {
  id: number;
  assetDocumentType: string;
  isDelete: boolean;
  applicantType?: string;
};
export type GetAssetresponse = {
  assetDocumentMasterList: assetType[]
} | null;


type relationType = {
  id: number;
  assetRelation: string;
  applicantType?: string;
};
export type getRelationMasterResponse = relationType[] | null;

export type UploadProductRequest = {
  base64: string;
  type: string;
  appId: string;
  documentType: string;
  applicantType?: string;
}

export type UploadProductResponse = {
  id: string;
  appId: string;
  documentType: string;
  documentFilePath: string;
  applicantType?: string;
} | null;


export type getProductRequest = {
  appId: string;
  applicantType?: string;
}

export type getProductResponse = {
  id: string;
  appId: string;
  productType: string;
  documentType: string;
  documentFilePath: string;
  type: string;
  applicantIncomeType: string;
  applicantType?: string;
  isGuarantorMandatory: boolean;
  aaStatus: boolean;
  assetRelation: string;
} | null;


export type ProductType = BaseModule & {
  GetIPMaster: () => Promise<ApiResponse<getIPMasterResponse>>;
  GetAssetMaster: () => Promise<ApiResponse<GetAssetresponse>>;
  GetRelationMaster: () => Promise<ApiResponse<getRelationMasterResponse>>;
  SaveProduct: (
    request: addProductRequest,
  ) => Promise<ApiResponse<addProductResponse>>;
  UploadProduct: (
    request: UploadProductRequest,
  ) => Promise<ApiResponse<UploadProductResponse>>;
  GetProductDetails: (
    request: getProductRequest,
  ) => Promise<ApiResponse<getProductResponse>>;
};
