import {createContext, useState, useContext, FC, ReactNode} from 'react';

interface ApplicantDetailsContextTypes {
  applicantId: string;
  guarantorId: string;
  mobileNumber: string;
  aadharNumber: string;
  isMainApplicant: boolean;
  isGuarantor: boolean;

  SaveApplicantDetails: (mobileNumber: string, aadharNumber: string) => void;
  SaveApplicantId: (applicantId: string) => void;
  SaveGuarantorId: (guarantorId: string) => void;
  ResetApplcantDetails: () => void;
  SetMainApplicant: (value: boolean) => void;
  SetGuarantor: (value: boolean) => void;

}

const ApplicantDetailsContext = createContext<ApplicantDetailsContextTypes>({
  applicantId: '',
  guarantorId: '',
  mobileNumber: '',
  aadharNumber: '',
  isMainApplicant: true,
  isGuarantor: false,


  SaveApplicantId: () => {},
  SaveGuarantorId: () => {},
  SaveApplicantDetails: () => {},
  ResetApplcantDetails: () => {},
  SetMainApplicant: () => {},
  SetGuarantor: () => {},

});

interface ApplicantDetialsProviderProps {
  children: ReactNode;
}

export const ApplicantDetialsProvider: FC<ApplicantDetialsProviderProps> = ({
  children,
}) => {
  const [applicantId, setApplicantId] = useState<string>('');
  const [guarantorId, setGuarantorId] = useState<string>('');
  const [mobileNumber, setMobileNumber] = useState<string>('');
  const [aadharNumber, setAadharNumber] = useState<string>('');
  const [isMainApplicant, setIsMainApplicant] = useState<boolean>(true);
  const [isGuarantor, setIsGuarantor] = useState<boolean>(true);


  const SaveApplicantId = (applicantId: string) => {
    setApplicantId(applicantId);
  };

  const SaveGuarantorId = (guarantorId: string) => {
    setGuarantorId(guarantorId);
  };

  const SetMainApplicant = (value: boolean) => {
    setIsMainApplicant(value);
  };
  const SetGuarantor = (value: boolean) => {
    setIsGuarantor(value);
  };

  const ResetApplcantDetails = () => {
    setAadharNumber('');
    setMobileNumber('');
    setApplicantId('');
    setGuarantorId('');
    setIsMainApplicant(true);
    setIsGuarantor(false);

  };

  const SaveApplicantDetails = (mobileNumber: string, aadharNumber: string) => {
    setMobileNumber(mobileNumber);
    setAadharNumber(aadharNumber);
  };

  return (
    <ApplicantDetailsContext.Provider
      value={{
        applicantId,
        mobileNumber,
        aadharNumber,
        isMainApplicant,
        guarantorId,
        isGuarantor,
        SaveApplicantId,
        SaveGuarantorId,
        ResetApplcantDetails,
        SaveApplicantDetails,
        SetMainApplicant,
        SetGuarantor
      }}>
      {children}
    </ApplicantDetailsContext.Provider>
  );
};

export const useApplicantDetails = (): ApplicantDetailsContextTypes =>
  useContext(ApplicantDetailsContext);
