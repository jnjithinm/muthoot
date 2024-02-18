import {useMutation} from 'react-query';
import useShowFlashMessage from 'hooks/useShowFlashMessage';

import {GetConstitutionResponse, GetPreDocumentsDetailResponse, GetTermsAndConditionsResponse} from './types';
import {Master} from './api';
import {applicantType} from '..';

export const useGetPreDocumentsDetail = (
  applicantId: string,
  applicantType: applicantType,
) => {
  const mutation = useMutation<GetPreDocumentsDetailResponse>(
    ['Master', applicantId, applicantType],
    async () => {
      const response = await Master.GetPreDocumentsDetail(
        applicantId,
        applicantType,
      );
      if (response.error) {
        useShowFlashMessage('warning', response.message);
      }

      return response.data;
    },
  );

  const {isLoading, isError, data, error} = mutation;

  return [mutation, {isLoading, isError, data, error}] as const;
};

export const useGetConstitution = (id: string) => {
  const mutation = useMutation<GetConstitutionResponse>(
    ['Master'],
    async () => {
      const response = await Master.GetConstitution(id);
      if (response.error) {
        useShowFlashMessage('warning', response.message);
      }

      return response.data;
    },
  );

  const {isLoading, isError, data, error} = mutation;

  return [mutation, {isLoading, isError, data, error}] as const;
};

export const useGetTermsAndConditions = () => {
  const mutation = useMutation<GetTermsAndConditionsResponse>(
    ['Master'],
    async () => {
      const response = await Master.GetTermsAndConditions();
      if (response.error) {
        useShowFlashMessage('warning', response.message);
      }

      return response.data;
    },
  );

  const {isLoading, isError, data, error} = mutation;

  return [mutation, {isLoading, isError, data, error}] as const;
};
