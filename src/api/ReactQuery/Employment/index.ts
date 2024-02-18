import {useMutation} from 'react-query';
import useShowFlashMessage from 'hooks/useShowFlashMessage';

import {

  AddEmploymentDetailsRequest,
  AddEmploymentDetailsResponse,
  GetEmploymentDetaisResponse,
CreditToSubmitResponse
} from './types';
import { Employment} from './api';
import { applicantType } from '..';

export const useAddEmploymentDetails = (payload: AddEmploymentDetailsRequest) => {
  const mutation = useMutation<AddEmploymentDetailsResponse>(
    ['Employment', payload],
    async () => {
      const response = await Employment.AddEmploymentDetails(payload);
      if (response.error) {
        useShowFlashMessage('warning', response.message);
      }else{
        useShowFlashMessage('success', response.message);
      }

      return response.data;
    },
  );
  const {isLoading, isError, data, error} = mutation;
  return [mutation, {isLoading, isError, data, error}] as const;
};

export const useGetEmploymentDetails = (appId:string,applicantType:applicantType) => {
  const mutation = useMutation<GetEmploymentDetaisResponse>(
    ['Employment', appId,applicantType],
    async () => {
      const response = await Employment.GetEmploymentDetails(appId,applicantType);
      return response.data;
    },
  );

  const {isLoading, isError, data, error} = mutation;
  return [mutation, {isLoading, isError, data, error}] as const;
};

export const useGetCreditToSubmitDetails = (id:string) => {
  const mutation = useMutation<CreditToSubmitResponse>(
    ['Employment', id],
    async () => {
      const response = await Employment.GetCreditToSubmitDetails(id);
      return response.data;
    },
  );

  const {isLoading, isError, data, error} = mutation;
  return [mutation, {isLoading, isError, data, error}] as const;
};
