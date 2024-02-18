import {ApiResponse, BaseModule, applicantType} from '..';

export type AddEmploymentDetailsRequest = {
  appId: string;
  companyName: string;
  applicantType: applicantType;
  stabilityYears: string;
  stabilityMonths: string;
  address: string;
  phoneNo: string;
  pincode: string;
  postoffice: string;
  landmark: string;
  district: string;
  city: string;
  cityId: number;
  state: string;
  stateId: number;
} | null;

export type AddEmploymentDetailsResponse = {
  appId: string;
  applicantType: string;
  companyName: string;
  constitution: string;
  address: string;
  pincode: string;
  postoffice: string;
  stabilityYears: string;
  stabilityMonths: string;
  phoneNo: string;
  landmark: string;
  district: string;
  city: string;
  cityId: number;
  state: string;
  stateId: number;
  isGuarantorPresent: boolean;
  isEmpStatus: boolean;
  isSubmitToCreditFreeze: boolean;
  isNextEnable: boolean;
  isPopUpVisible: boolean;
  isRejected: boolean;
} | null;

export type GetEmploymentDetaisResponse = {
  appId: string;
  companyName: string;
  applicantType: string;
  stabilityYears: string;
  stabilityMonths: string;
  address: string;
  dob: string;
  pincode: string;
  phoneNo: string;
  postoffice: string;
  landmark: string;
  district: string;
  city: string;
  cityId: number;
  state: string;
  stateId: number;
  isGuarantorPresent: boolean;
  isEmpStatus: boolean;
  isSubmitToCreditFreeze: boolean;
  isNextEnable: boolean;
  isPopUpVisible: boolean;
  isRejected: boolean;
  isEmployed: boolean;
} | null;

export type CreditToSubmitResponse = {
  isSubmitToCreditFreeze: boolean;
  mesaage: string;
  isNextEnable: boolean;
  isPopUpVisible: boolean;
  isRejected: boolean;
} | null;

export type EmploymentType = BaseModule & {
  AddEmploymentDetails: (
    request: AddEmploymentDetailsRequest,
  ) => Promise<ApiResponse<AddEmploymentDetailsResponse>>;
  GetEmploymentDetails: (
    appId: string,
    applicantType: applicantType,
  ) => Promise<ApiResponse<GetEmploymentDetaisResponse>>;
  GetCreditToSubmitDetails: (
    id: string,
  ) => Promise<ApiResponse<CreditToSubmitResponse>>;
};
