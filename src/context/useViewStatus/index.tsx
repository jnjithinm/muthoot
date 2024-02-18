import React, { createContext, useState, FC, ReactNode, useContext } from 'react';

interface Applicant {
  appId: string;
  panStatus: boolean;
  kycStatus: boolean;
  ovdStatus: boolean;
  currentPermentAddressStatus: boolean;
  photoVerification: boolean;
  productStatus: boolean;
  loanDetailsStatus: boolean;
  applicantType: 'mainApplicant' | 'guarantor';
  bureauSuccess: boolean;
  bureauScore: string;
  applicantId: string;
  guarantorId: string;
  documentNumber: string;
  breSuccess: boolean;
  bre1Status: 'Bre1_Approved' | 'Bre1_Rejected' | 'Bre1_Manual';
  bre2Status: 'Bre2_Approved' | 'Bre2_Rejected' | 'Bre2_Manual';
  bre3Status: 'Bre3_Approved' | 'Bre3_Rejected' | 'Bre3_Manual';
  dealaerShipDetailStatus: boolean;
  empStatus: boolean;
  referenceStatus: boolean;
  criffReportPath: string;
  applicantName: string;
  loanOfferStatus: boolean;
  sanctionLetterStatus: boolean;
  bankDetailsStatus: boolean;
  error: boolean;
  aaStatus: boolean;
  repaymentStatus: boolean;
  preDisbursalDocument: boolean;
  deferralDocument: boolean;
  postDisbursalDocument: boolean;
  isFreeze: boolean;
  isGuarantorMandatory: boolean;
  applicationCoApplicantType: string;
  psd: boolean
}

type ViewStatusResponse = {
  isFreeze?: boolean;
  isSubmitToCreditFreeze?: boolean;
  isSubmitToDisbursement?: boolean;
  isDisbursementFreeze?:boolean;
  mainApplicant?: Applicant[];
  guarantor?: Applicant[];
} | null;

interface ViewStatusTypes {
  useViewStatus: ViewStatusResponse;
  SaveViewStatus: (useViewStatus: ViewStatusResponse) => void;
  ResetViewStatus: () => void;
}

export const ViewStatusContext = createContext<ViewStatusTypes>({
  useViewStatus: {
    isFreeze: false,
    isSubmitToCreditFreeze: false,
    isSubmitToDisbursement: false,
    isDisbursementFreeze: false,
    mainApplicant: [],
    guarantor: [],

  },
  SaveViewStatus: () => { },
  ResetViewStatus: () => { },
});

interface ViewStatusProviderProps {
  children: ReactNode;
}

const ViewStatusProvider: FC<ViewStatusProviderProps> = ({ children }) => {
  const [useViewStatus, setViewStatus] = useState<ViewStatusResponse>({
    isFreeze: false,
    isSubmitToCreditFreeze: false,
    isDisbursementFreeze: false,
    mainApplicant: [],
    guarantor: [],
  });
  //const [isLeadDetailsAvailable, setIsLeadAvailable] = useState(false);

  const SaveViewStatus = (useViewStatus: ViewStatusResponse) => {
    setViewStatus(useViewStatus);
  };

  const ResetViewStatus = async () => {
    setViewStatus({
      isFreeze: false,
      isSubmitToCreditFreeze: false,
      isSubmitToDisbursement: false,
      isDisbursementFreeze: false,
      mainApplicant: [],
      guarantor: [],
    });
  };

  return (
    <ViewStatusContext.Provider
      value={{
        useViewStatus,
        SaveViewStatus,
        ResetViewStatus,
      }}>
      {children}
    </ViewStatusContext.Provider>
  );
};

export default ViewStatusProvider;
export const usedViewStatus = (): ViewStatusTypes =>
  useContext(ViewStatusContext);
