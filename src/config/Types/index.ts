import {applicantType} from 'api/ReactQuery';

export interface ErrorObject {
  label: string;
  hasError: boolean;
}

export interface applicantTypeObect {
  applicantType: applicantType;
  applicantId: string;
}

export interface DropdownObject {
  label: string;
  value: string;
}

export enum ScreenNames {
  KYCVerification = 'KYCVerification',
  PANVerification = 'PANVerification',
  OVDVerification = 'OVDVerification',
  AddressDetails = 'AddressDetails',
  PhotoVerification = 'PhotoVerification',
  ProductDetails = 'ProductDetails',
  References = 'References',
  LoanDetails = 'LoanDetails',
  DelarshipDetails = 'DelarshipDetails',
  EmploymentDetails = 'EmploymentDetails',
  AccountAgregators = 'AccountAgregators',
  BREApproved = 'BREApproved',
  LoanRejected = 'LoanRejected',
  BureauSuccess = 'BureauSuccess',
  ManualUnderwriting = 'ManualUnderwriting',
  ManualUnderwriting1 = 'ManualUnderwriting1',
  LoanOffer = 'LoanOffer',
  BankDetails = 'BankDetails',
  SanctionLetter = 'SanctionLetter',
  RepaymentDetails = 'RepaymentDetails',
  DeferralDocuments = 'DeferralDocuments',
  NachRegistration = 'NachRegistration',
  PreDisbursalDocuments = 'PreDisbursalDocuments',
  LoanAgreement = 'LoanAgreement',
  PostDisbursalDocument = 'PostDisbursalDocument',
  PSDDocument = 'PSDDocument',

}
