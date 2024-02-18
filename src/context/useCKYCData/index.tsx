import React, {createContext, useState, FC, ReactNode, useContext} from 'react';
import {GetCKYCStatusResponse} from 'api/ReactQuery/CKYC/types';

interface CKYCDataTypes {
  CKYCData: GetCKYCStatusResponse;
  isCKYCDataSaved: boolean;
  SaveCKYCData: (CKYCData: GetCKYCStatusResponse) => void;
  ResetCKYCData: () => void;
}

export const CKYCDataContext = createContext<CKYCDataTypes>({
  CKYCData: {
    isotpSuccess: false,
    panStatus: false,
    adharStatus: false,
    ovdStatus: false,
    isPanAvailable: false,
    message: null,
  },
  isCKYCDataSaved: false,
  SaveCKYCData: () => {},
  ResetCKYCData: () => {},
});

interface CKYCDataProviderProps {
  children: ReactNode;
}

const CKYCDataProvider: FC<CKYCDataProviderProps> = ({children}) => {
  const [CKYCData, setCKYCData] = useState<GetCKYCStatusResponse>({
    isotpSuccess: false,
    panStatus: false,
    adharStatus: false,
    ovdStatus: false,
    isPanAvailable: false,
    message: null,
  });
  const [isCKYCDataSaved, setIsCKYCDataSaved] = useState<boolean>(false);

  const SaveCKYCData = (CKYCData: GetCKYCStatusResponse) => {
    
    setIsCKYCDataSaved(true);
    setCKYCData(CKYCData);
  };

  const ResetCKYCData = async () => {
    setCKYCData({
      isotpSuccess: false,
      panStatus: false,
      adharStatus: false,
      ovdStatus: false,
      isPanAvailable: false,
      message: null,
    });
    setIsCKYCDataSaved(false);
  };

  return (
    <CKYCDataContext.Provider
      value={{
        CKYCData,
        isCKYCDataSaved,
        SaveCKYCData,
        ResetCKYCData,
      }}>
      {children}
    </CKYCDataContext.Provider>
  );
};

export default CKYCDataProvider;
export const useCKYCData = (): CKYCDataTypes => useContext(CKYCDataContext);
