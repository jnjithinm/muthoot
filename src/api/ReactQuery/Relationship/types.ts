import {ApiResponse, BaseModule} from '..';

export type GetRelationshipMasterRequest = {
  relationType : "non_family" | "family",
  isDelete : false 
} | null;

type FamilyNonFamilyRelation = {
  id: number;
  relationType: 'family' |'non_family';
  relationName: string;
  isDelete: boolean;
  updatedDate: string | null;
};

export type GetRelationshipMasterResponse = FamilyNonFamilyRelation[] |null;

export type SaveFamilyNonFamilyDetailsRequest = {

  appId: string;
  familyRelationType?: "family";
  familyRelationName?: string;
  familyNameOfRelative?:string
  familyMobileNumber?: string;
  nonFamilyRelationType?: "non_family";
  nonFamilyRelationName?: string ;
  nonFamilyMobileNumber?: string;
  nonFamilyNameOfRelative?:string;

} ;

export type SaveFamilyNonFamilyDetailsResponse = {

  appId: string;
  familyRelationType: string;
  familyRelationName:string;
  familyMobileNumber: string;
  nonFamilyRelationType: string ;
  nonFamilyRelationName:string;
  nonFamilyNameOfRelative:string;
  nonFamilyMobileNumber: string ;
} | null;

export type GetFamilyNonFamilyDetailsRequest={
  appId: string;
}

export type GetFamilyNonFamilyDetailsResponse = {
  id: number;
  appId: string;
  familyRelationType: string;
  familyRelationName: string;
  familyMobileNumber: string;
  familyRelativeName:string;
  nonFamilyRelationType: string | null;
  nonFamilyRelationName: string | null;
  nonFamilyMobileNumber: string | null;
  nonFamilyRelativeName:string;
  updateDate: string; 
}|null;


export type RelationshipType = BaseModule & {
  GetRelationshipMaster: (
    request: GetRelationshipMasterRequest,
  ) => Promise<ApiResponse<GetRelationshipMasterResponse>>;
  SaveFamilyNonDetails: (
    request: SaveFamilyNonFamilyDetailsRequest,
  ) => Promise<ApiResponse<SaveFamilyNonFamilyDetailsResponse>>;
  GetFamilyNonFamilyDetails:(
    request: GetFamilyNonFamilyDetailsRequest,
  ) => Promise<ApiResponse<GetFamilyNonFamilyDetailsResponse>>;
};
