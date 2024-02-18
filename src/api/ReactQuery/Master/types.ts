import {ApiResponse, BaseModule, applicantType} from '..';
import {docTypes} from '../Document/types';


export interface filePathDto {
  
  filePath?: string;
  index?: string

}

export interface PrePosDto {
  documentType: docTypes;
  isMandatory: 'Y' | 'N';
  section: string;
  filePath?: filePathDto[];
  fileType?:'jpg' | 'pdf';
  filePath2?:string;
  isMultiple?: boolean,
  count?: number

}

interface ConstitutionType {
  constitutionType: string;
  isDelete: boolean;
  id: number;
}

export type GetConstitutionResponse ={
  constitutionMasterList: ConstitutionType[];

}|null;


export type GetPreDocumentsDetailResponse = {
  prePosDtoList: PrePosDto[];
  isMandatoryFileUploaded:boolean;
  isAadhaarUpdate:boolean;
  isPanUpdate:boolean;
} | null;

export type GetTermsAndConditionsResponse={
  id:number;
  termsAndCondition:string;
}|null;

export type MasterType = BaseModule & {
  GetPreDocumentsDetail: (
    appId: string,
    applicantType:applicantType
  ) => Promise<ApiResponse<GetPreDocumentsDetailResponse>>;
  GetConstitution: (id: string) => Promise<ApiResponse<GetConstitutionResponse>>;
GetTermsAndConditions:()=>Promise<ApiResponse<GetTermsAndConditionsResponse>>;
};
