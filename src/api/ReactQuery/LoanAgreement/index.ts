import {useMutation} from 'react-query';
import {LoanAgreement} from './api';
import {
  LoanAgreementTypes,
  GetAgreementDetailsResponse,
  eSignRequest,
  eSignResponse
} from './types';
import useShowFlashMessage from 'hooks/useShowFlashMessage';

export const useGetAgreementDetails = (appId: string) => {
  const mutation = useMutation<GetAgreementDetailsResponse>(
    ['LoanAgreement', appId],
    async () => {
      const response = await LoanAgreement.GetAgreementDetails(appId);
      if (response.error) {
        useShowFlashMessage('warning', response.message);
      }
      return response.data;
    },
  );

  const {isLoading, isError, data, error} = mutation;

  return [mutation, {isLoading, isError, data, error}] as const;
};

export const useeSignAgreement = (
  payload: eSignRequest,
) => {
  const mutation = useMutation<eSignResponse>(
    ['LoanAgreement', payload],
    async () => {
      const response = await LoanAgreement.eSign(payload);
      if (response.error) {
        useShowFlashMessage('warning', response.message);
      }
      return response.data;
    },
  );

  const {isLoading, isError, data, error} = mutation;

  return [mutation, {isLoading, isError, data, error}] as const;
};


