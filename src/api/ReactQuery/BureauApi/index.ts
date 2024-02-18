import {useMutation} from 'react-query';
import useShowFlashMessage from 'hooks/useShowFlashMessage';

import {

  GetCriffRequest,
  GetCriffResponse,
  GetSherlockResponse,
GetSherlockRequest
} from './types';
import {BureauApi} from './api';
import { applicantType } from '..';

export const useGetCriff = (payload: GetCriffRequest) => {
  const mutation = useMutation<GetCriffResponse>(
    ['BureauApi', payload],
    async () => {
      const response = await BureauApi.GetCriff(payload);
      if (response.error) {
        useShowFlashMessage('warning', response.message);
      }

      return response.data;
    },
  );

  const {isLoading, isError, data, error} = mutation;

  return [mutation, {isLoading, isError, data, error}] as const;
};

export const useGetSherlock = (payload: GetSherlockRequest) => {
  const mutation = useMutation<GetSherlockResponse>(
    ['BureauApi', payload],
    async () => {
      const response = await BureauApi.GetSherlockResponse(payload);
      if (response.error) {
        useShowFlashMessage('warning', response.message);
      }

      return response.data;
    },
  );

  const {isLoading, isError, data, error} = mutation;

  return [mutation, {isLoading, isError, data, error}] as const;
};
