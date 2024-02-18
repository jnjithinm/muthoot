import React, {FC, ReactNode} from 'react';
import AuthenticationProvider from './useAuthentication';
import {ApplicantDetialsProvider} from './useApplicantDetails';
import ViewStatusProvider from './useViewStatus';
import CKYCDataProvider from './useCKYCData';
import {EmployeeDetialsProvider} from './useEmployeeDetails';

interface ProviderProps {
  children: ReactNode;
}

const CombinedProvider: FC<ProviderProps> = ({children}: ProviderProps) => {
  return (
    <AuthenticationProvider>
      <EmployeeDetialsProvider>
        <ApplicantDetialsProvider>
          <ViewStatusProvider>
            <CKYCDataProvider>{children}</CKYCDataProvider>
          </ViewStatusProvider>
        </ApplicantDetialsProvider>
      </EmployeeDetialsProvider>
    </AuthenticationProvider>
  );
};

export default CombinedProvider;
