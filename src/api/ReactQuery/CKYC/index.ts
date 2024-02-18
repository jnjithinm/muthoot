import {useMutation} from 'react-query';
import useShowFlashMessage from 'hooks/useShowFlashMessage';

import {
  GetCKYCStatusRequest,
  GetCKYCStatusResponse
} from './types';
import {CKYC} from './api';


export const useGetCKYCStatus = (payload: GetCKYCStatusRequest) => {
  const mutation = useMutation<GetCKYCStatusResponse>(
    ['CKYC', payload],
    async () => {
      const response = await CKYC.GetCKYCStatus(payload);
        if (response.error) {
        useShowFlashMessage('warning', response.message);
      }
      return response.data;
    },
  );

  const {isLoading, isError, data, error} = mutation;

  return [mutation, {isLoading, isError, data, error}] as const;
};

