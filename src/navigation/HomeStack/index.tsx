import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {useAuthentication} from 'context/useAuthentication';
import Login from 'screens/Login';
import ResetPassword from 'screens/Login/ResetPassword';
import Splash from 'screens/Splash';
import Dashboard from 'screens/Dashboard/index';
import LeadRegistration from 'screens/LeadRegistration';
import LeadManagement from 'screens/LeadManagement/indexes';
import OTPVerification from 'screens/OTPVerification';
import LoanSummary from 'screens/LoanSummary';
import KYCVerification from 'screens/KYCVerification';
import AddressDetails from 'screens/AddressDetails';
import PANVerification from 'screens/PANVerification';
import PhotoVerification from 'screens/PhotoVerification';
import ProductDetails from 'screens/ProductDetails';
import LoanDetails from 'screens/LoanDetails';
import DelarshipDetails from 'screens/DelarshipDetails';
import References from 'screens/References/index';
import {VersionCheckResponse} from 'api/ReactQuery/Auth/types';
import EmploymentDetails from 'screens/EmploymentDetails';
import PreviewLead from 'screens/PreviewLead';
import {SaveorUpdateLeadRequest} from 'api/ReactQuery/Lead/types';
import LoanRejected from 'screens/LoanRejected';
import AccountAgregators from 'screens/AccountAgregators';
import OneMoney from 'screens/AccountAgregators/oneMoney';
import BureauSuccess from 'screens/BureauSuccess';
import BureauReport from 'screens/BureauSuccess/BureauReport';
import {GetCriffResponse} from 'api/ReactQuery/BureauApi/types';
import BREApproved from 'screens/BREApproved';
import ManualUnderwriting from 'screens/ManualUnderwriting';
import LoanOffer from 'screens/LoanOffer';
import BankDetails from 'screens/BankDetails';
import OVDVerification from 'screens/OVDVerification';
import SanctionLetter from 'screens/SanctionLetter';
import RepaymentDetails from 'screens/RepaymentDetails';
import NachRegistration from 'screens/RepaymentDetails/nachRegistration';
import LoanAgreement from 'screens/LoanAgreement';
import Agreement from 'screens/LoanAgreement/Agreement';

import PostDisbursalDocument from 'screens/PostDisbursalDocument';
import PSDDocument from 'screens/PSDDocument';
import PreDisbursalDocuments from 'screens/PreDisbursalDocuments';
import DeferralDocuments from 'screens/DeferralDocuments';
import ManualUnderwriting1 from 'screens/ManualUnderwriting1';

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined | {VersionCheckResponse: VersionCheckResponse};
  ResetPassword: undefined;
  LeadRegistration: undefined | {isNavigatedFromPreviewLead: boolean};
  LeadManagement: undefined;
  Dashboard: undefined;
  PreviewLead:
    | {
        initial: 'mainApplicant';
        LeadRegistration: {
          edited: boolean;
          customerProfileValue: string;
          SaveorUpdateLeadRequest: SaveorUpdateLeadRequest;
        };
      }
    | {
        initial: 'guarantor';
        LeadRegistration: {
          edited: boolean;
          customerProfileValue: string;
          SaveorUpdateLeadRequest: SaveorUpdateLeadRequest;
        };
      };
  OTPVerification: undefined;
  LoanSummary: undefined;
  KYCVerification: undefined;
  PANVerification: undefined;
  OVDVerification: undefined;
  AddressDetails: undefined;
  PhotoVerification: undefined;
  ProductDetails: undefined;
  References: undefined;
  LoanDetails: {isNavigateEmploymentDetails: boolean} | undefined;
  DelarshipDetails: undefined | {isNavigateEmploymentDetails: boolean};
  EmploymentDetails: {GetCriffResponse: GetCriffResponse} | undefined;
  AccountAgregators: undefined;
  OneMoney: undefined;
  BREApproved: {
    GetCriffResponse: GetCriffResponse;
    isGuarantorMandatory?: boolean;
  };
  LoanRejected:
    | {GetCriffResponse: GetCriffResponse; isGuarantorMandatory?: boolean, message?: string, popup?: boolean}
    | undefined;
  BureauSuccess: {GetCriffResponse: GetCriffResponse};
  BureauReport: {webRedirectionUrl: any} | undefined;
  ManualUnderwriting: {
    GetCriffResponse: GetCriffResponse;
    isNavigateLoanOffer?: boolean;
    isGuarantorMandatory?: boolean;
  };
  ManualUnderwriting1: {
    GetCriffResponse: GetCriffResponse;
    isNavigateLoanOffer?: boolean;
    isGuarantorMandatory?: boolean;
  };
  LoanOffer: undefined;
  BankDetails: undefined;
  SanctionLetter: undefined;
  RepaymentDetails: undefined;
  DeferralDocuments: undefined;
  NachRegistration: {webRedirectionUrl: any} | undefined;
  PreDisbursalDocuments: undefined;
  LoanAgreement: undefined;
  Agreement: {webRedirectionUrl?: any} | undefined;
  PSDDocument: undefined;
  PostDisbursalDocument: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const HomeStack = () => {
  const {isLoggedIn, isLoggedOut} = useAuthentication();

  if (isLoggedIn) {
    return (
      <Stack.Navigator
        screenOptions={() => ({
          headerShown: false,
          animation: 'fade',
        })}>
        {/* <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="LeadManagement" component={LeadManagement} />
        <Stack.Screen name="LeadRegistration" component={LeadRegistration} />
        <Stack.Screen name="PreviewLead" component={PreviewLead} />
        <Stack.Screen name="OTPVerification" component={OTPVerification} />
        <Stack.Screen name="LoanSummary" component={LoanSummary} />
        <Stack.Screen name="PANVerification" component={PANVerification} />
                <Stack.Screen name="OVDVerification" component={OVDVerification} />
        <Stack.Screen name="KYCVerification" component={KYCVerification} />
        <Stack.Screen name="AddressDetails" component={AddressDetails} />
        <Stack.Screen name="PhotoVerification" component={PhotoVerification} />
        <Stack.Screen name="ProductDetails" component={ProductDetails} />
        <Stack.Screen name="DelarshipDetails" component={DelarshipDetails} />
        <Stack.Screen name="LoanDetails" component={LoanDetails} />
        <Stack.Screen name="AccountAgregators" component={AccountAgregators} />
        <Stack.Screen name="OneMoney" component={OneMoney} />
        <Stack.Screen name="BureauSuccess" component={BureauSuccess} />
        <Stack.Screen name="BureauReport" component={BureauReport} />
        <Stack.Screen name="BREApproved" component={BREApproved} />
        <Stack.Screen name="LoanRejected" component={LoanRejected} />
        <Stack.Screen
          name="ManualUnderwriting"
          component={ManualUnderwriting}
        />
        <Stack.Screen
          name="ManualUnderwriting1"
          component={ManualUnderwriting1}
        />
        <Stack.Screen name="References" component={References} />
        <Stack.Screen name="EmploymentDetails" component={EmploymentDetails} />
        <Stack.Screen name="LoanOffer" component={LoanOffer} />
        <Stack.Screen name="BankDetails" component={BankDetails} />
        <Stack.Screen name="SanctionLetter" component={SanctionLetter} />
        <Stack.Screen name="RepaymentDetails" component={RepaymentDetails} />
        <Stack.Screen name="NachRegistration" component={NachRegistration} />
        <Stack.Screen name="PSDDocument" component={PSDDocument} /> */}
        <Stack.Screen
          name="PreDisbursalDocuments"
          component={PreDisbursalDocuments}
        />
        <Stack.Screen name="DeferralDocuments" component={DeferralDocuments} />
        <Stack.Screen name="LoanAgreement" component={LoanAgreement} />
        <Stack.Screen name="Agreement" component={Agreement} />

        <Stack.Screen
          name="PostDisbursalDocument"
          component={PostDisbursalDocument}
        />
      </Stack.Navigator>
    );
  } else {
    return (
      <Stack.Navigator
        screenOptions={({route}) => ({
          headerShown: false,
          animation: 'fade',
        })}>
        {!isLoggedOut && <Stack.Screen name="Splash" component={Splash} />}
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />

      </Stack.Navigator>
    );
  }
};
export default HomeStack;
