import {ApiResponse, BaseModule, applicantType} from '..';

export type AddPermanentAddressRequest = {
  appId: string;
  applicantType:applicantType;
  permanentAddressLine1: string;
  permanentAddressLine2: string;
  permanentLandmark: string;
  permanentPinCode: string;
  permanentPostOffice:string;
  permanentDistrict: string;
  permanentCity: string;
  permanentState: string;
  permanentResidenceType: string;
  isPermanentSameasKYC: boolean;
  residingAtPermanentAddressSinceYears: number;
  residingAtPermanentAddressSinceMonths: number;
  
};

export type AddPermanentAddressResponse = {
  appId: string;
  applicantType:applicantType;
  permanentAddressLine1: string;
  permanentAddressLine2: string;
  permanentLandmark: string;
  permanentPinCode: string;
  permanentDistrict: string;
  permanentCity: string;
  permanentState: string;
  permanentResidenceType: string;
  isPermanentSameasKYC: boolean;
  residingAtPermanentAddressSinceYears: number;
  residingAtPermanentAddressSinceMonths: number;
} | null;

export type GetAddressDetailsRequest = {
  appId: string;
  applicantType:applicantType

};

export type GetAddressDetailsResponse = {
  appId:string
  applicantType:applicantType;
  currentAddressLine1: string;
  currentAddressLine2: string;
  currentPinCode:string;
  currentDistrict:string;
  postOffice:string;
  currentLandmark: string;
  currentCity: string;
  currentState: string;
  residingAtCurrentAddressSinceYears: number;
  residingAtCurrentAddressSinceMonths: number;
  permanentAddressLine1:string;
  permanentAddressLine2: string;
  permanentLandmark: string;
  permanentPinCode: string;
  permanentDistrict: string;
  permanentCity: string;
  permanentState: string;
  permanentPostOffice:string;
  permanentResidenceType:string;
  currentResidenceType: string;
  residingAtPermanentAddressSinceYears: number;
  residingAtPermanentAddressSinceMonths: number;
  isPermanentSameasKYC: boolean;
  isCurrentSameasKYC: boolean;
  isAddressSave:boolean;
  dob: string;
  message: string,
  status: string,
  isPopUpVisible: boolean
} | null;

export type AddCurrentAddressRequest = {
  appId: string;
  applicantType:applicantType;
  currentAddressLine1: string;
  currentAddressLine2: string;
  currentLandmark: string;
  currentPinCode: string;
  postOffice:string;
  currentDistrict: string;
  currentCity: string;
  currentState: string;
  residingAtCurrentAddress: string;
  currentResidenceType: string;
  isCurrentSameasKYC: boolean;
  residingAtCurrentAddressSinceYears: number;
  residingAtCurrentAddressSinceMonths: number;
};

export type AddCurrentAddressResponse = {
  appId: string;
  applicantType:applicantType;
  currentAddressLine1: string;
  currentAddressLine2: string;
  currentLandmark: string;
  currentPinCode: string;
  currentDistrict: string;
  currentCity: string;
  currentState: string;
  residingAtCurrentAddress: string;
  currentResidenceType: string;
  isCurrentSameasKYC: boolean;
  residingAtCurrentAddressSinceYears: number;
  residingAtCurrentAddressSinceMonths: number;
} | null;

export type GetDedupeDetailsRequest = {
  appId: string;
  applicantType:applicantType

};

export type GetDedupeDetailsResponse = {
  message: string,
  status: string,
  isPopUpVisible: boolean
} |null

export type AddressType = BaseModule & {
  AddPermanentAddress: (
    request: AddPermanentAddressRequest,
  ) => Promise<ApiResponse<AddPermanentAddressResponse>>;
  AddCurrentAddress: (
    request: AddCurrentAddressRequest,
  ) => Promise<ApiResponse<AddCurrentAddressResponse>>;
  GetAddressDetails: (
    request: GetAddressDetailsRequest,
  ) => Promise<ApiResponse<GetAddressDetailsResponse>>;
  GetDedupeDetails: (
    request: GetDedupeDetailsRequest,
  ) => Promise<ApiResponse<GetDedupeDetailsResponse>>;
};
